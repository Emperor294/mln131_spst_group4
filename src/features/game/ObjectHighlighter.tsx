'use client';

import { useFrame, useThree } from '@react-three/fiber';
import { useRef, useEffect } from 'react';
import * as THREE from 'three';

type Props = {
  onDoorClick?: () => void;
  inputEnabled?: boolean;
  onObjectClick?: (objectName: string) => void;
};

type EmissiveMaterial = THREE.Material & {
  emissive: THREE.Color;
  emissiveIntensity: number;
};

type ColorMaterial = THREE.Material & {
  color: THREE.Color;
};

function hasEmissive(material: THREE.Material): material is EmissiveMaterial {
  return (
    'emissive' in material &&
    material.emissive instanceof THREE.Color &&
    'emissiveIntensity' in material &&
    typeof material.emissiveIntensity === 'number'
  );
}

function hasColor(material: THREE.Material): material is ColorMaterial {
  return 'color' in material && material.color instanceof THREE.Color;
}

export default function ObjectHighlighter({ onDoorClick, inputEnabled = true, onObjectClick }: Props) {
  const { camera, scene } = useThree();
  const raycaster = useRef(new THREE.Raycaster());
  const mouse = useRef(new THREE.Vector2(0, 0));
  const highlighted = useRef<THREE.Mesh | null>(null);
  const originalMaterial = useRef<THREE.Material | null>(null);


  // Door refs/state
  const doorObjectRef = useRef<THREE.Object3D | null>(null);
  const doorOpenProgress = useRef(0); 
  const doorOpenAngleRadians = Math.PI / 2;
  const targetOpenRef = useRef(0); // 0 closed, 1 open
  const isSelectedRef = useRef(false);
  const doorHighlightMeshRef = useRef<THREE.Mesh | null>(null);
  const wasHoveringRef = useRef(false);

  // Highlightable objects refs/state
  const highlightableObjects = ['bacho', 'aonau', 'tuyenngon', 'aodai', 'anh3', 'Cone', 'anh1', 'anh2', 'CoffeeTable'];
  const objectRefs = useRef<{ [key: string]: THREE.Object3D | null }>({});
  const objectHighlightMeshRefs = useRef<{ [key: string]: THREE.Mesh | null }>({});
  const objectOriginalMaterials = useRef<{ [key: string]: THREE.Material | null }>({});
  const objectHighlighted = useRef<{ [key: string]: THREE.Mesh | null }>({});
  const wasHoveringObjects = useRef<{ [key: string]: boolean }>({});

  useEffect(() => {
    const foundDoor = scene.getObjectByName('Cube_4') as THREE.Object3D | null;
    if (foundDoor) {
      doorObjectRef.current = foundDoor;

      // Resolve a stable mesh under the door for highlighting
      const findFirstMesh = (obj: THREE.Object3D): THREE.Mesh | null => {
        if ((obj as THREE.Mesh).isMesh) return obj as THREE.Mesh;
        for (const child of obj.children) {
          const m = findFirstMesh(child);
          if (m) return m;
        }
        return null;
      };
      doorHighlightMeshRef.current = findFirstMesh(foundDoor);
    } else {
      console.warn('Object with name Cube_4 not found in scene');
    }

    // Find all highlightable objects
    highlightableObjects.forEach(objectName => {
      const foundObject = scene.getObjectByName(objectName) as THREE.Object3D | null;
      if (foundObject) {
        objectRefs.current[objectName] = foundObject;

        // Resolve a stable mesh under the object for highlighting
        const findFirstMesh = (obj: THREE.Object3D): THREE.Mesh | null => {
          if ((obj as THREE.Mesh).isMesh) return obj as THREE.Mesh;
          for (const child of obj.children) {
            const m = findFirstMesh(child);
            if (m) return m;
          }
          return null;
        };
        objectHighlightMeshRefs.current[objectName] = findFirstMesh(foundObject);
      } else {
        console.warn(`Object with name ${objectName} not found in scene`);
      }
    });
  }, [scene]);

  // Click to toggle selection/open state using window-level listener
  useEffect(() => {
    const onPointerDown = () => {
      if (!inputEnabled) return;
      mouse.current.set(0, 0);
      raycaster.current.setFromCamera(mouse.current, camera);
      const intersects = raycaster.current.intersectObjects(scene.children, true);

      let clickedDoor = false;
      let clickedObject: string | null = null;
      
      for (const i of intersects) {
        let obj: THREE.Object3D | null = i.object as THREE.Object3D | null;
        while (obj) {
          if (obj === doorObjectRef.current || obj.name === 'Cube_4') {
            clickedDoor = true;
            break;
          }
          // Check if clicked on any highlightable object
          highlightableObjects.forEach(objectName => {
            if (obj === objectRefs.current[objectName] || obj!.name === objectName) {
              clickedObject = objectName;
            }
          });
          obj = obj.parent as THREE.Object3D | null;
        }
        if (clickedDoor || clickedObject) break;
      }

      if (clickedDoor) {
        isSelectedRef.current = !isSelectedRef.current;
        targetOpenRef.current = isSelectedRef.current ? 1 : 0;
        if (onDoorClick && isSelectedRef.current) onDoorClick();

        // Update highlight
        if (isSelectedRef.current && doorHighlightMeshRef.current) {
          const mesh = doorHighlightMeshRef.current;
          if (mesh.material) {
            if (highlighted.current && originalMaterial.current) {
              highlighted.current.material = originalMaterial.current;
            }
            const currentMat = Array.isArray(mesh.material) ? mesh.material[0] : mesh.material;
            originalMaterial.current = currentMat;
            const glowMat = currentMat.clone();
            if (hasEmissive(glowMat)) {
              glowMat.emissive.setHex(0x00ffff);
              glowMat.emissiveIntensity = 0.5;
            }
            mesh.material = glowMat;
            highlighted.current = mesh;
          }
        } else {
          if (highlighted.current && originalMaterial.current) {
            highlighted.current.material = originalMaterial.current;
          }
          highlighted.current = null;
          originalMaterial.current = null;
        }
      } else if (clickedObject) {
        // Handle click on highlightable object
        if (onObjectClick) {
          onObjectClick(clickedObject);
        }
      } else {
        // Click elsewhere: close and deselect
        if (isSelectedRef.current) {
          isSelectedRef.current = false;
          targetOpenRef.current = 0;
          if (highlighted.current && originalMaterial.current) {
            highlighted.current.material = originalMaterial.current;
          }
          highlighted.current = null;
          originalMaterial.current = null;
        }
      }
    };

    window.addEventListener('pointerdown', onPointerDown, { capture: true });
    return () => window.removeEventListener('pointerdown', onPointerDown, true);
  }, [camera, scene, inputEnabled, onDoorClick, onObjectClick]);

  useFrame((_, delta) => {
    if (!inputEnabled) return;
    // Animate towards target open state
    const damping = 8;
    const alpha = 1 - Math.exp(-damping * delta);
    doorOpenProgress.current += (targetOpenRef.current - doorOpenProgress.current) * alpha;
    if (doorObjectRef.current) {
      const angle = THREE.MathUtils.lerp(0, doorOpenAngleRadians, doorOpenProgress.current);
      doorObjectRef.current.rotation.z = angle;
    }

    // Raycast each frame to detect hover
    mouse.current.set(0, 0);
    raycaster.current.setFromCamera(mouse.current, camera);
    const intersects = raycaster.current.intersectObjects(scene.children, true);

    let isHoveringDoor = false;
    const hoveringObjects: { [key: string]: boolean } = {};
    
    // Initialize hovering state for all objects
    highlightableObjects.forEach(objectName => {
      hoveringObjects[objectName] = false;
    });

    for (const i of intersects) {
      let obj: THREE.Object3D | null = i.object as THREE.Object3D | null;
      while (obj) {
        if (obj === doorObjectRef.current || obj.name === 'Cube_4') {
          isHoveringDoor = true;
          break;
        }
        // Check if hovering over any highlightable object
        highlightableObjects.forEach(objectName => {
          if (obj === objectRefs.current[objectName] || obj!.name === objectName) {
            hoveringObjects[objectName] = true;
          }
        });
        obj = obj.parent as THREE.Object3D | null;
      }
      if (isHoveringDoor || Object.values(hoveringObjects).some(hovering => hovering)) break;
    }

    // Manage highlight: selection takes precedence; otherwise show hover highlight
    if (isSelectedRef.current) {
      if (doorHighlightMeshRef.current) {
        const mesh = doorHighlightMeshRef.current;
        if (mesh.material) {
          if (highlighted.current !== mesh) {
            if (highlighted.current && originalMaterial.current) {
              highlighted.current.material = originalMaterial.current;
            }
            const currentMat = Array.isArray(mesh.material) ? mesh.material[0] : mesh.material;
            originalMaterial.current = currentMat;
            const glowMat = currentMat.clone();
            if (hasEmissive(glowMat)) {
              glowMat.emissive.setHex(0x00ffff);
              glowMat.emissiveIntensity = 0.5;
            }
            mesh.material = glowMat;
            highlighted.current = mesh;
          }
        }
      }
      wasHoveringRef.current = isHoveringDoor;
      return;
    }

    if (isHoveringDoor !== wasHoveringRef.current) {
      // Hover state changed and not selected
      if (highlighted.current && originalMaterial.current) {
        highlighted.current.material = originalMaterial.current;
      }
      highlighted.current = null;
      originalMaterial.current = null;

      if (isHoveringDoor && doorHighlightMeshRef.current) {
        const mesh = doorHighlightMeshRef.current;
        if (mesh.material) {
          const currentMat = Array.isArray(mesh.material) ? mesh.material[0] : mesh.material;
          originalMaterial.current = currentMat;
          const glowMat = currentMat.clone();
          if (hasEmissive(glowMat)) {
            glowMat.emissive.setHex(0x00ffff);
            glowMat.emissiveIntensity = 0.25; // softer hover glow
          }
          mesh.material = glowMat;
          highlighted.current = mesh;
        }
      }
      wasHoveringRef.current = isHoveringDoor;
    }

    // Handle hover color changes for all highlightable objects
    highlightableObjects.forEach(objectName => {
      const isHovering = hoveringObjects[objectName];
      const wasHovering = wasHoveringObjects.current[objectName] || false;
      
      if (isHovering !== wasHovering) {
        // Restore original material if was highlighted
        if (objectHighlighted.current[objectName] && objectOriginalMaterials.current[objectName]) {
          objectHighlighted.current[objectName]!.material = objectOriginalMaterials.current[objectName]!;
        }
        objectHighlighted.current[objectName] = null;
        objectOriginalMaterials.current[objectName] = null;

        // Apply highlight if hovering
        if (isHovering && objectHighlightMeshRefs.current[objectName]) {
          const mesh = objectHighlightMeshRefs.current[objectName]!;
          if (mesh.material) {
            const currentMat = Array.isArray(mesh.material) ? mesh.material[0] : mesh.material;
            objectOriginalMaterials.current[objectName] = currentMat;
            const glowMat = currentMat.clone();
            if (hasColor(glowMat)) {
              glowMat.color.setHex(0xff6b6b); // Red color for all objects
            }
            mesh.material = glowMat;
            objectHighlighted.current[objectName] = mesh;
          }
        }
        wasHoveringObjects.current[objectName] = isHovering;
      }
    });
  });

  return null;
}
 

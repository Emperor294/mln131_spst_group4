'use client';

import { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { MUSEUM_INTERACTIVE_MESH_NAMES } from '@/data/course/artifact-bindings';
import type { MuseumMeshName } from '@/data/course/artifact-bindings';

type Props = {
  inputEnabled?: boolean;
  onObjectClick?: (objectName: MuseumMeshName) => void;
  onHoverChange?: (objectName: MuseumMeshName | null) => void;
};

type EmissiveMaterial = THREE.Material & {
  emissive: THREE.Color;
  emissiveIntensity: number;
};

type ColorMaterial = THREE.Material & {
  color: THREE.Color;
};

type InteractiveTarget = {
  meshName: MuseumMeshName;
  root: THREE.Object3D;
  highlightMesh: THREE.Mesh;
  originalMaterial: THREE.Material | THREE.Material[] | null;
  ownedHighlightMaterial: THREE.Material | THREE.Material[] | null;
};

/** Maximum distance at which a legacy museum artifact can be inspected. */
export const MUSEUM_INTERACTION_DISTANCE = 8;

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

function findFirstMesh(object: THREE.Object3D): THREE.Mesh | null {
  if ((object as THREE.Mesh).isMesh) return object as THREE.Mesh;

  for (const child of object.children) {
    const mesh = findFirstMesh(child);
    if (mesh) return mesh;
  }

  return null;
}

function createHighlightMaterial(material: THREE.Material | THREE.Material[]) {
  const highlight = (source: THREE.Material) => {
    const clone = source.clone();
    if (hasColor(clone)) clone.color.setHex(0xff6b6b);
    if (hasEmissive(clone)) {
      clone.emissive.setHex(0xff6b6b);
      clone.emissiveIntensity = Math.max(clone.emissiveIntensity, 0.15);
    }
    return clone;
  };

  return Array.isArray(material) ? material.map(highlight) : highlight(material);
}

function disposeOwnedMaterial(material: THREE.Material | THREE.Material[] | null) {
  if (!material) return;
  if (Array.isArray(material)) {
    material.forEach((entry) => entry.dispose());
  } else {
    material.dispose();
  }
}

export default function ObjectHighlighter({
  inputEnabled = true,
  onObjectClick,
  onHoverChange,
}: Props) {
  const { camera, scene } = useThree();
  const raycasterRef = useRef(new THREE.Raycaster());
  const targetRootsRef = useRef<THREE.Object3D[]>([]);
  const targetsByNameRef = useRef(new Map<MuseumMeshName, InteractiveTarget>());
  const namesByObjectRef = useRef(new Map<THREE.Object3D, MuseumMeshName>());
  const intersectionsRef = useRef<THREE.Intersection[]>([]);
  const hoveredTargetRef = useRef<InteractiveTarget | null>(null);
  const centerNdcRef = useRef(new THREE.Vector2(0, 0));

  useEffect(() => {
    const targetsByName = targetsByNameRef.current;
    const targetRoots = targetRootsRef.current;
    const namesByObject = namesByObjectRef.current;

    const restoreTarget = (target: InteractiveTarget) => {
      if (target.originalMaterial) target.highlightMesh.material = target.originalMaterial;
      disposeOwnedMaterial(target.ownedHighlightMaterial);
      target.originalMaterial = null;
      target.ownedHighlightMaterial = null;
    };

    targetsByName.forEach(restoreTarget);
    targetsByName.clear();
    targetRoots.length = 0;
    namesByObject.clear();
    hoveredTargetRef.current = null;

    for (const meshName of MUSEUM_INTERACTIVE_MESH_NAMES) {
      const root = scene.getObjectByName(meshName);
      if (!root) {
        if (process.env.NODE_ENV !== 'production') {
          console.warn(`[museum] Interactive mesh not found: ${meshName}`);
        }
        continue;
      }

      const highlightMesh = findFirstMesh(root);
      if (!highlightMesh) {
        if (process.env.NODE_ENV !== 'production') {
          console.warn(`[museum] Interactive binding has no mesh: ${meshName}`);
        }
        continue;
      }

      targetsByName.set(meshName, {
        meshName,
        root,
        highlightMesh,
        originalMaterial: null,
        ownedHighlightMaterial: null,
      });
      targetRoots.push(root);
      namesByObject.set(root, meshName);
    }

    return () => {
      targetsByName.forEach(restoreTarget);
      targetsByName.clear();
      targetRoots.length = 0;
      namesByObject.clear();
      hoveredTargetRef.current = null;
      onHoverChange?.(null);
    };
  }, [onHoverChange, scene]);

  const resolveTarget = (object: THREE.Object3D) => {
    let current: THREE.Object3D | null = object;
    while (current) {
      const meshName = namesByObjectRef.current.get(current);
      if (meshName) return targetsByNameRef.current.get(meshName) ?? null;
      current = current.parent;
    }
    return null;
  };

  const getCenterTarget = () => {
    if (targetRootsRef.current.length === 0) return null;

    raycasterRef.current.far = MUSEUM_INTERACTION_DISTANCE;
    raycasterRef.current.setFromCamera(centerNdcRef.current, camera);
    const intersections = intersectionsRef.current;
    intersections.length = 0;
    raycasterRef.current.intersectObjects(targetRootsRef.current, true, intersections);

    for (const intersection of intersections) {
      const target = resolveTarget(intersection.object);
      if (target) {
        intersections.length = 0;
        return target;
      }
    }

    intersections.length = 0;
    return null;
  };

  const setHighlight = (target: InteractiveTarget | null) => {
    const previousTarget = hoveredTargetRef.current;
    if (previousTarget === target) return;

    if (previousTarget) {
      if (previousTarget.originalMaterial) {
        previousTarget.highlightMesh.material = previousTarget.originalMaterial;
      }
      disposeOwnedMaterial(previousTarget.ownedHighlightMaterial);
      previousTarget.originalMaterial = null;
      previousTarget.ownedHighlightMaterial = null;
    }

    if (target && !target.originalMaterial) {
      target.originalMaterial = target.highlightMesh.material;
      target.ownedHighlightMaterial = createHighlightMaterial(target.highlightMesh.material);
      target.highlightMesh.material = target.ownedHighlightMaterial;
    }

    hoveredTargetRef.current = target;
    onHoverChange?.(target?.meshName ?? null);
  };

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!inputEnabled) return;
      if (!(event.target instanceof HTMLCanvasElement)) return;
      const target = hoveredTargetRef.current;
      if (target) onObjectClick?.(target.meshName);
    };

    window.addEventListener('pointerdown', handlePointerDown, { capture: true });
    return () => window.removeEventListener('pointerdown', handlePointerDown, true);
  }, [inputEnabled, onObjectClick]);

  useFrame(() => {
    if (!inputEnabled) {
      setHighlight(null);
      return;
    }

    setHighlight(getCenterTarget());
  });

  return null;
}

'use client';

import { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { MUSEUM_INTERACTIVE_MESH_NAMES } from '@/data/course/artifact-bindings';
import type { MuseumMeshName } from '@/data/course/artifact-bindings';
import type { MuseumInteractionRegistry, MuseumInteractionTarget } from '@/features/museum/runtime/interaction-registry';

type Props = {
  inputEnabled?: boolean;
  interactionRegistry: MuseumInteractionRegistry;
  onTargetClick?: (target: MuseumInteractionTarget) => void;
  onHoverChange?: (target: MuseumInteractionTarget | null) => void;
};

type EmissiveMaterial = THREE.Material & {
  emissive: THREE.Color;
  emissiveIntensity: number;
};

type ColorMaterial = THREE.Material & {
  color: THREE.Color;
};

/** Maximum distance at which a museum target can be inspected. */
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
  if (Array.isArray(material)) material.forEach((entry) => entry.dispose());
  else material.dispose();
}

interface HighlightState {
  target: MuseumInteractionTarget;
  originalMaterial: THREE.Material | THREE.Material[];
  ownedHighlightMaterial: THREE.Material | THREE.Material[];
}

export default function ObjectHighlighter({
  inputEnabled = true,
  interactionRegistry,
  onTargetClick,
  onHoverChange,
}: Props) {
  const { camera, scene } = useThree();
  const raycasterRef = useRef(new THREE.Raycaster());
  const intersectionsRef = useRef<THREE.Intersection[]>([]);
  const centerNdcRef = useRef(new THREE.Vector2(0, 0));
  const hoveredTargetRef = useRef<MuseumInteractionTarget | null>(null);
  const highlightStateRef = useRef<HighlightState | null>(null);

  const restoreHighlight = () => {
    const highlightState = highlightStateRef.current;
    if (!highlightState) return;

    highlightState.target.highlightMesh.material = highlightState.originalMaterial;
    disposeOwnedMaterial(highlightState.ownedHighlightMaterial);
    highlightStateRef.current = null;
  };

  const setHighlight = (target: MuseumInteractionTarget | null) => {
    const previousTarget = hoveredTargetRef.current;
    if (previousTarget === target) return;

    restoreHighlight();
    if (target) {
      const originalMaterial = target.highlightMesh.material;
      const ownedHighlightMaterial = createHighlightMaterial(originalMaterial);
      target.highlightMesh.material = ownedHighlightMaterial;
      highlightStateRef.current = { target, originalMaterial, ownedHighlightMaterial };
    }

    hoveredTargetRef.current = target;
    onHoverChange?.(target);
  };

  useEffect(() => {
    const artifactTargets: MuseumInteractionTarget[] = [];

    for (const meshName of MUSEUM_INTERACTIVE_MESH_NAMES) {
      const root = scene.getObjectByName(meshName);
      if (!root) {
        if (process.env.NODE_ENV !== 'production') console.warn(`[museum] Interactive mesh not found: ${meshName}`);
        continue;
      }

      const highlightMesh = findFirstMesh(root);
      if (!highlightMesh) {
        if (process.env.NODE_ENV !== 'production') console.warn(`[museum] Interactive binding has no mesh: ${meshName}`);
        continue;
      }

      const target: MuseumInteractionTarget = {
        kind: 'artifact',
        meshName: meshName as MuseumMeshName,
        root,
        highlightMesh,
      };
      artifactTargets.push(target);
      interactionRegistry.register(target);
    }

    return () => {
      restoreHighlight();
      for (const target of artifactTargets) interactionRegistry.unregister(target.root, target);
      hoveredTargetRef.current = null;
      onHoverChange?.(null);
    };
  }, [interactionRegistry, onHoverChange, scene]);

  const resolveTarget = (object: THREE.Object3D) => {
    let current: THREE.Object3D | null = object;
    while (current) {
      const target = interactionRegistry.targetsByRoot.get(current);
      if (target) return target;
      current = current.parent;
    }
    return null;
  };

  const getCenterTarget = () => {
    if (interactionRegistry.roots.length === 0) return null;

    raycasterRef.current.far = MUSEUM_INTERACTION_DISTANCE;
    raycasterRef.current.setFromCamera(centerNdcRef.current, camera);
    const intersections = intersectionsRef.current;
    intersections.length = 0;
    raycasterRef.current.intersectObjects(interactionRegistry.roots, true, intersections);

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

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!inputEnabled || !(event.target instanceof HTMLCanvasElement)) return;
      const target = hoveredTargetRef.current;
      if (target) onTargetClick?.(target);
    };

    window.addEventListener('pointerdown', handlePointerDown, { capture: true });
    return () => window.removeEventListener('pointerdown', handlePointerDown, true);
  }, [inputEnabled, onTargetClick]);

  useFrame(() => {
    if (!inputEnabled) {
      setHighlight(null);
      return;
    }

    setHighlight(getCenterTarget());
  });

  return null;
}

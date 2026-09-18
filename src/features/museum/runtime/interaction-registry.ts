import * as THREE from "three";
import type { MuseumMeshName } from "@/data/course/artifact-bindings";

export type MuseumInteractionTarget =
  | {
      kind: "artifact";
      meshName: MuseumMeshName;
      root: THREE.Object3D;
      highlightMesh: THREE.Mesh;
      maxInteractionDistance: number;
    }
  | {
      kind: "concept-station";
      stationId: string;
      root: THREE.Object3D;
      highlightMesh: THREE.Mesh;
      maxInteractionDistance: number;
    };

export interface MuseumInteractionRegistry {
  roots: THREE.Object3D[];
  targetsByRoot: Map<THREE.Object3D, MuseumInteractionTarget>;
  register(target: MuseumInteractionTarget): void;
  unregister(root: THREE.Object3D, target?: MuseumInteractionTarget): void;
}

export function createMuseumInteractionRegistry(): MuseumInteractionRegistry {
  const roots: THREE.Object3D[] = [];
  const targetsByRoot = new Map<THREE.Object3D, MuseumInteractionTarget>();

  return {
    roots,
    targetsByRoot,
    register(target) {
      if (!targetsByRoot.has(target.root)) roots.push(target.root);
      targetsByRoot.set(target.root, target);
    },
    unregister(root, expectedTarget) {
      const current = targetsByRoot.get(root);
      if (!current || (expectedTarget && current !== expectedTarget)) return;

      targetsByRoot.delete(root);
      const index = roots.indexOf(root);
      if (index >= 0) roots.splice(index, 1);
    },
  };
}

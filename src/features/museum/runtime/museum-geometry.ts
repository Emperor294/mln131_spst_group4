import * as THREE from "three";

/** Structural meshes used by both movement collision and interaction occlusion. */
export const MUSEUM_COLLISION_MESH_NAMES = [
  "Plane042_Material_0",
  "Plane057_Material_0",
  "Plane059_Material_0",
  "Plane058_Material_0",
] as const;

export const LEGACY_ARTIFACT_INTERACTION_DISTANCE = 8;
export const ACADEMIC_STATION_INTERACTION_DISTANCE = 5;

export function findMuseumCollisionMeshes(scene: THREE.Object3D): THREE.Mesh[] {
  const meshes: THREE.Mesh[] = [];

  for (const name of MUSEUM_COLLISION_MESH_NAMES) {
    const object = scene.getObjectByName(name);
    if (object instanceof THREE.Mesh) meshes.push(object);
  }

  return meshes;
}

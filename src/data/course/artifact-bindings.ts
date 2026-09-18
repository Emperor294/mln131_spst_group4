import { getArtifactById } from "./artifacts";
import type { ArtifactId } from "./types";

export const ARTIFACT_BINDINGS = {
  bacho: "artifact-ho-chi-minh-statue",
  aonau: "artifact-brown-khaki-shirt",
  tuyenngon: "artifact-declaration-of-independence",
  aodai: "artifact-ao-dai",
  anh3: "artifact-bronze-drum",
  Cone: "artifact-conical-hat",
  anh1: "artifact-propaganda-poster-1950",
  anh2: "artifact-subsidy-coupon-1981",
  CoffeeTable: "artifact-vietnamese-cuisine",
} as const satisfies Record<string, ArtifactId>;

export type MuseumMeshName = keyof typeof ARTIFACT_BINDINGS;

/** Canonical interactive mesh names used by the museum runtime. */
export const MUSEUM_INTERACTIVE_MESH_NAMES: readonly MuseumMeshName[] = Object.keys(
  ARTIFACT_BINDINGS,
) as MuseumMeshName[];

export interface ArtifactBinding {
  meshName: MuseumMeshName;
  artifactId: ArtifactId;
}

export function getArtifactIdByMeshName(meshName: string) {
  return ARTIFACT_BINDINGS[meshName as MuseumMeshName] as
    | ArtifactId
    | undefined;
}

export function getArtifactBinding(meshName: string): ArtifactBinding | undefined {
  const artifactId = getArtifactIdByMeshName(meshName);
  return artifactId
    ? { meshName: meshName as MuseumMeshName, artifactId }
    : undefined;
}

export function getArtifactByMeshName(meshName: string) {
  const binding = getArtifactBinding(meshName);
  return binding ? getArtifactById(binding.artifactId) : undefined;
}

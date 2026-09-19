import { MUSEUM_CONCEPTS } from "@/data/course/museum-concepts";
import { MUSEUM_ZONES } from "@/data/course/museum-zones";
import { MUSEUM_CONCEPT_STATIONS } from "./concept-stations";
import {
  ACADEMIC_EXHIBITS,
  type AcademicExhibitDefinition,
  type AcademicExhibitVariant,
} from "./academic-exhibits";
import { MUSEUM_PHYSICAL_COLLIDERS, MUSEUM_WALKABLE_BOUNDS, getMuseumStructureBounds } from "./museum-layout-v2";

export const ACADEMIC_EXHIBIT_FOOTPRINTS: Readonly<Record<AcademicExhibitVariant, { halfX: number; halfZ: number }>> = {
  timeline: { halfX: 0.48, halfZ: 0.28 },
  foundation: { halfX: 0.48, halfZ: 0.34 },
  cluster: { halfX: 0.44, halfZ: 0.42 },
  layers: { halfX: 0.5, halfZ: 0.34 },
  framework: { halfX: 0.42, halfZ: 0.34 },
  sequence: { halfX: 0.52, halfZ: 0.3 },
  comparison: { halfX: 0.48, halfZ: 0.32 },
  relationship: { halfX: 0.46, halfZ: 0.3 },
  bridge: { halfX: 0.46, halfZ: 0.32 },
  network: { halfX: 0.5, halfZ: 0.48 },
  parallel: { halfX: 0.52, halfZ: 0.34 },
};

const VALID_VISUALIZATIONS = new Set([
  "timeline",
  "network",
  "comparison",
  "sequence",
  "relationship",
  "concept-display",
  "artifact-story",
  "diagram",
  "environmental",
]);

export function getAcademicExhibitBounds(exhibit: AcademicExhibitDefinition) {
  const station = MUSEUM_CONCEPT_STATIONS.find((item) => item.id === exhibit.stationId);
  if (!station) return null;
  const footprint = ACADEMIC_EXHIBIT_FOOTPRINTS[exhibit.variant];
  return {
    minX: station.position[0] - footprint.halfX,
    maxX: station.position[0] + footprint.halfX,
    minZ: station.position[2] - footprint.halfZ,
    maxZ: station.position[2] + footprint.halfZ,
  };
}

function rectanglesOverlap(
  left: { minX: number; maxX: number; minZ: number; maxZ: number },
  right: { minX: number; maxX: number; minZ: number; maxZ: number },
) {
  return left.minX < right.maxX && left.maxX > right.minX && left.minZ < right.maxZ && left.maxZ > right.minZ;
}

export function getAcademicExhibitIssues(): string[] {
  const issues: string[] = [];
  const stationIds = new Set(MUSEUM_CONCEPT_STATIONS.map((station) => station.id));
  const zoneIds = new Set(MUSEUM_ZONES.map((zone) => zone.id));
  const conceptIds = new Set<string>(MUSEUM_CONCEPTS.map((concept) => concept.id));
  const exhibitIds = new Set<string>();
  const ownedStations = new Set<string>();
  const coveredConcepts = new Set<string>();

  if (ACADEMIC_EXHIBITS.length !== MUSEUM_CONCEPT_STATIONS.length) {
    issues.push(`Academic exhibit count ${ACADEMIC_EXHIBITS.length} không khớp ${MUSEUM_CONCEPT_STATIONS.length} station.`);
  }

  for (const exhibit of ACADEMIC_EXHIBITS) {
    if (exhibitIds.has(exhibit.id)) issues.push(`Academic exhibit ID bị trùng: ${exhibit.id}`);
    exhibitIds.add(exhibit.id);

    if (!stationIds.has(exhibit.stationId)) {
      issues.push(`Academic exhibit ${exhibit.id} tham chiếu station không tồn tại: ${exhibit.stationId}`);
      continue;
    }
    if (ownedStations.has(exhibit.stationId)) issues.push(`Station có nhiều academic exhibit: ${exhibit.stationId}`);
    ownedStations.add(exhibit.stationId);

    const station = MUSEUM_CONCEPT_STATIONS.find((item) => item.id === exhibit.stationId);
    if (station && station.zoneId !== exhibit.zoneId) issues.push(`Exhibit ${exhibit.id} thuộc sai zone so với station.`);
    if (!zoneIds.has(exhibit.zoneId)) issues.push(`Exhibit ${exhibit.id} tham chiếu zone không tồn tại: ${exhibit.zoneId}`);
    if (!VALID_VISUALIZATIONS.has(exhibit.visualization)) issues.push(`Exhibit ${exhibit.id} có visualization không hợp lệ.`);
    for (const label of [...(exhibit.worldLabels ?? []), ...(exhibit.secondaryLabels ?? [])]) {
      if (!label.trim() || label.length > 32 || label.includes("\n")) issues.push(`Exhibit ${exhibit.id} có world label không phù hợp.`);
    }

    const expectedConcepts = station ? new Set(station.conceptIds) : new Set<string>();
    const actualConcepts = new Set<string>();
    for (const conceptId of exhibit.conceptIds) {
      if (!conceptIds.has(conceptId)) issues.push(`Exhibit ${exhibit.id} tham chiếu concept không tồn tại: ${conceptId}`);
      if (actualConcepts.has(conceptId)) issues.push(`Exhibit ${exhibit.id} lặp concept: ${conceptId}`);
      actualConcepts.add(conceptId);
      if (coveredConcepts.has(conceptId)) issues.push(`Concept có nhiều exhibit: ${conceptId}`);
      coveredConcepts.add(conceptId);
    }
    if (expectedConcepts.size !== actualConcepts.size || [...expectedConcepts].some((id) => !actualConcepts.has(id))) {
      issues.push(`Exhibit ${exhibit.id} không khớp concept grouping của station.`);
    }

    const bounds = getAcademicExhibitBounds(exhibit);
    if (!bounds) continue;
    if (bounds.minX < MUSEUM_WALKABLE_BOUNDS.minX || bounds.maxX > MUSEUM_WALKABLE_BOUNDS.maxX
      || bounds.minZ < MUSEUM_WALKABLE_BOUNDS.minZ || bounds.maxZ > MUSEUM_WALKABLE_BOUNDS.maxZ) {
      issues.push(`Exhibit ${exhibit.id} vượt authored walkable bounds.`);
    }
    for (const collider of MUSEUM_PHYSICAL_COLLIDERS) {
      if (rectanglesOverlap(bounds, getMuseumStructureBounds(collider))) {
        issues.push(`Exhibit ${exhibit.id} chồng collider ${collider.id}.`);
      }
    }
  }

  for (const station of MUSEUM_CONCEPT_STATIONS) {
    if (!ownedStations.has(station.id)) issues.push(`Station chưa có academic exhibit: ${station.id}`);
  }
  for (const concept of MUSEUM_CONCEPTS) {
    if (!coveredConcepts.has(concept.id)) issues.push(`Concept chưa có academic exhibit path: ${concept.id}`);
  }

  return issues;
}

export function assertAcademicExhibitIntegrity(): void {
  const issues = getAcademicExhibitIssues();
  if (issues.length > 0) throw new Error(`Academic exhibit data không hợp lệ:\n${issues.join("\n")}`);
}

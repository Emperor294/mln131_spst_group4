import { MUSEUM_CONCEPTS } from "@/data/course/museum-concepts";
import { MUSEUM_ZONES } from "@/data/course/museum-zones";
import { MUSEUM_CONCEPT_STATIONS } from "./concept-stations";
import { MUSEUM_SPATIAL_ZONES } from "./spatial-zones";

const MUSEUM_BOUNDS = {
  minX: -4.05,
  maxX: 4.05,
  minZ: -5.55,
  maxZ: 4.1,
};

const finitePosition = (position: readonly number[]) => position.length === 3 && position.every(Number.isFinite);

export function getMuseumSpatialDataIssues(): string[] {
  const issues: string[] = [];
  const canonicalZoneIds = new Set<string>(MUSEUM_ZONES.map((zone) => zone.id));
  const canonicalConceptIds = new Set<string>(MUSEUM_CONCEPTS.map((concept) => concept.id));
  const spatialZoneIds = new Set<string>();
  const stationIds = new Set<string>();
  const referencedStationIds = new Set<string>();
  const reachableConceptIds = new Set<string>();

  if (MUSEUM_SPATIAL_ZONES.length !== 7) issues.push("Phải có đúng 7 spatial museum zones.");
  for (const zone of MUSEUM_SPATIAL_ZONES) {
    if (spatialZoneIds.has(zone.zoneId)) issues.push(`Spatial zone bị trùng: ${zone.zoneId}`);
    spatialZoneIds.add(zone.zoneId);
    if (!canonicalZoneIds.has(zone.zoneId)) issues.push(`Spatial zone tham chiếu canonical zone không tồn tại: ${zone.zoneId}`);
    if (!finitePosition(zone.center) || !finitePosition(zone.labelPosition)) issues.push(`Spatial zone ${zone.zoneId} có tọa độ không hợp lệ.`);
    if (!(zone.activationRadius > 0)) issues.push(`Spatial zone ${zone.zoneId} có activationRadius không hợp lệ.`);
    for (const stationId of zone.stationIds) {
      referencedStationIds.add(stationId);
      const station = MUSEUM_CONCEPT_STATIONS.find((item) => item.id === stationId);
      if (!station) issues.push(`Zone ${zone.zoneId} tham chiếu station không tồn tại: ${stationId}`);
      else if (station.zoneId !== zone.zoneId) issues.push(`Station ${stationId} thuộc sai zone.`);
    }
  }

  if (spatialZoneIds.size !== 7) issues.push("Spatial zone IDs phải duy nhất và đủ 7 zone.");

  for (const station of MUSEUM_CONCEPT_STATIONS) {
    if (stationIds.has(station.id)) issues.push(`Concept station ID bị trùng: ${station.id}`);
    stationIds.add(station.id);
    if (!spatialZoneIds.has(station.zoneId)) issues.push(`Station ${station.id} tham chiếu zone không tồn tại.`);
    if (!finitePosition(station.position)) issues.push(`Station ${station.id} có tọa độ không hợp lệ.`);
    if (!(station.interactionRadius > 0)) issues.push(`Station ${station.id} có interactionRadius không hợp lệ.`);
    if (station.position[0] < MUSEUM_BOUNDS.minX || station.position[0] > MUSEUM_BOUNDS.maxX
      || station.position[2] < MUSEUM_BOUNDS.minZ || station.position[2] > MUSEUM_BOUNDS.maxZ) {
      issues.push(`Station ${station.id} nằm ngoài bounds authoring gần đúng của museum.`);
    }
    const zone = MUSEUM_ZONES.find((item) => item.id === station.zoneId);
    for (const conceptId of station.conceptIds) {
      if (!canonicalConceptIds.has(conceptId)) {
        issues.push(`Station ${station.id} tham chiếu concept không tồn tại: ${conceptId}`);
        continue;
      }
      const concept = MUSEUM_CONCEPTS.find((item) => item.id === conceptId);
      if (zone && concept && concept.chapterId !== zone.chapterId) issues.push(`Concept ${conceptId} thuộc sai chapter trong station ${station.id}.`);
      if (reachableConceptIds.has(conceptId)) issues.push(`Concept ${conceptId} được gán cho nhiều station.`);
      reachableConceptIds.add(conceptId);
    }
  }

  for (const station of MUSEUM_CONCEPT_STATIONS) {
    if (!referencedStationIds.has(station.id)) issues.push(`Station không được zone nào tham chiếu: ${station.id}`);
  }

  for (const concept of MUSEUM_CONCEPTS) {
    if (!reachableConceptIds.has(concept.id)) issues.push(`Concept chưa có runtime access path: ${concept.id}`);
  }

  for (let index = 0; index < MUSEUM_CONCEPT_STATIONS.length; index += 1) {
    for (let next = index + 1; next < MUSEUM_CONCEPT_STATIONS.length; next += 1) {
      const left = MUSEUM_CONCEPT_STATIONS[index].position;
      const right = MUSEUM_CONCEPT_STATIONS[next].position;
      const distance = Math.hypot(left[0] - right[0], left[2] - right[2]);
      if (distance < 0.65) issues.push(`Station ${MUSEUM_CONCEPT_STATIONS[index].id} quá gần ${MUSEUM_CONCEPT_STATIONS[next].id}.`);
    }
  }

  return issues;
}

export function assertMuseumSpatialDataIntegrity(): void {
  const issues = getMuseumSpatialDataIssues();
  if (issues.length > 0) throw new Error(`Museum spatial data không hợp lệ:\n${issues.join("\n")}`);
}

export { MUSEUM_BOUNDS };

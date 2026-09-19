import { MUSEUM_CONCEPT_STATIONS } from "./concept-stations";
import {
  MUSEUM_LAYOUT_ZONES,
  MUSEUM_PHYSICAL_COLLIDERS,
  MUSEUM_PHYSICAL_STRUCTURES,
  MUSEUM_PLAYER_CLEARANCE,
  MUSEUM_WALKABLE_BOUNDS,
  getMuseumStructureBounds,
} from "./museum-layout-v2";

const GRID_STEP = 0.2;
const SPAWN_X = 0;
const SPAWN_Z = 3;

function pointInsideBounds(x: number, z: number, bounds: { minX: number; maxX: number; minZ: number; maxZ: number }, padding = 0) {
  return x >= bounds.minX + padding && x <= bounds.maxX - padding
    && z >= bounds.minZ + padding && z <= bounds.maxZ - padding;
}

function stationFootprintIntersects(station: readonly number[], structure: (typeof MUSEUM_PHYSICAL_COLLIDERS)[number]) {
  const bounds = getMuseumStructureBounds(structure);
  const padding = 0.42;
  return station[0] >= bounds.minX - padding && station[0] <= bounds.maxX + padding
    && station[2] >= bounds.minZ - padding && station[2] <= bounds.maxZ + padding;
}

function gridKey(x: number, z: number) {
  return `${x}:${z}`;
}

function toGrid(value: number, min: number) {
  return Math.round((value - min) / GRID_STEP);
}

function fromGrid(value: number, min: number) {
  return min + value * GRID_STEP;
}

function isBlocked(x: number, z: number) {
  return MUSEUM_PHYSICAL_COLLIDERS.some((structure) => {
    const bounds = getMuseumStructureBounds(structure);
    return x >= bounds.minX - MUSEUM_PLAYER_CLEARANCE
      && x <= bounds.maxX + MUSEUM_PLAYER_CLEARANCE
      && z >= bounds.minZ - MUSEUM_PLAYER_CLEARANCE
      && z <= bounds.maxZ + MUSEUM_PLAYER_CLEARANCE;
  });
}

function getReachableGrid() {
  const minX = MUSEUM_WALKABLE_BOUNDS.minX + MUSEUM_PLAYER_CLEARANCE;
  const maxX = MUSEUM_WALKABLE_BOUNDS.maxX - MUSEUM_PLAYER_CLEARANCE;
  const minZ = MUSEUM_WALKABLE_BOUNDS.minZ + MUSEUM_PLAYER_CLEARANCE;
  const maxZ = MUSEUM_WALKABLE_BOUNDS.maxZ - MUSEUM_PLAYER_CLEARANCE;
  const width = Math.round((maxX - minX) / GRID_STEP);
  const height = Math.round((maxZ - minZ) / GRID_STEP);
  const start = { x: toGrid(SPAWN_X, minX), z: toGrid(SPAWN_Z, minZ) };
  const reachable = new Set<string>();
  const queue = [start];
  while (queue.length > 0) {
    const current = queue.shift();
    if (!current) continue;
    const key = gridKey(current.x, current.z);
    if (reachable.has(key)) continue;
    const worldX = fromGrid(current.x, minX);
    const worldZ = fromGrid(current.z, minZ);
    if (current.x < 0 || current.x > width || current.z < 0 || current.z > height || isBlocked(worldX, worldZ)) continue;
    reachable.add(key);
    queue.push(
      { x: current.x + 1, z: current.z },
      { x: current.x - 1, z: current.z },
      { x: current.x, z: current.z + 1 },
      { x: current.x, z: current.z - 1 },
    );
  }
  return { reachable, minX, minZ };
}

function isGridReachable(target: readonly number[], grid: ReturnType<typeof getReachableGrid>) {
  const x = toGrid(target[0], grid.minX);
  const z = toGrid(target[2], grid.minZ);
  return grid.reachable.has(gridKey(x, z));
}

export function getMuseumPhysicalLayoutIssues(): string[] {
  const issues: string[] = [];
  const structureIds = new Set<string>();
  if (MUSEUM_LAYOUT_ZONES.length !== 7) issues.push("Physical layout phải có đúng 7 zone volumes.");
  if (MUSEUM_CONCEPT_STATIONS.length !== 17) issues.push("Physical layout phải giữ đúng 17 academic stations.");

  for (const zone of MUSEUM_LAYOUT_ZONES) {
    if (zone.volume.minX >= zone.volume.maxX || zone.volume.minZ >= zone.volume.maxZ) issues.push(`Zone ${zone.zoneId} có volume không hợp lệ.`);
    if (!pointInsideBounds(zone.center[0], zone.center[2], MUSEUM_WALKABLE_BOUNDS)) issues.push(`Zone ${zone.zoneId} nằm ngoài walkable bounds.`);
    if (!pointInsideBounds(zone.entry[0], zone.entry[2], MUSEUM_WALKABLE_BOUNDS, MUSEUM_PLAYER_CLEARANCE)) issues.push(`Entry ${zone.zoneId} nằm ngoài player clearance bounds.`);
  }

  for (const structure of MUSEUM_PHYSICAL_STRUCTURES) {
    if (structureIds.has(structure.id)) issues.push(`Structure ID bị trùng: ${structure.id}`);
    structureIds.add(structure.id);
  }

  for (const structure of MUSEUM_PHYSICAL_COLLIDERS) {
    if (structure.size.some((value) => !Number.isFinite(value) || value <= 0)) issues.push(`Structure ${structure.id} có kích thước không hợp lệ.`);
    const bounds = getMuseumStructureBounds(structure);
    if (bounds.minX < MUSEUM_WALKABLE_BOUNDS.minX || bounds.maxX > MUSEUM_WALKABLE_BOUNDS.maxX
      || bounds.minZ < MUSEUM_WALKABLE_BOUNDS.minZ || bounds.maxZ > MUSEUM_WALKABLE_BOUNDS.maxZ) {
      issues.push(`Structure ${structure.id} vượt walkable bounds.`);
    }
  }

  for (const structure of MUSEUM_PHYSICAL_COLLIDERS) {
    if (pointInsideBounds(SPAWN_X, SPAWN_Z, getMuseumStructureBounds(structure), MUSEUM_PLAYER_CLEARANCE)) {
      issues.push(`Spawn nằm trong structure collider ${structure.id}.`);
    }
  }

  for (const station of MUSEUM_CONCEPT_STATIONS) {
    if (!pointInsideBounds(station.position[0], station.position[2], MUSEUM_WALKABLE_BOUNDS, MUSEUM_PLAYER_CLEARANCE)) issues.push(`Station ${station.id} vượt player clearance bounds.`);
    if (MUSEUM_PHYSICAL_COLLIDERS.some((structure) => stationFootprintIntersects(station.position, structure))) issues.push(`Station ${station.id} giao với physical collider.`);
  }

  for (let index = 0; index < MUSEUM_CONCEPT_STATIONS.length; index += 1) {
    for (let next = index + 1; next < MUSEUM_CONCEPT_STATIONS.length; next += 1) {
      const left = MUSEUM_CONCEPT_STATIONS[index].position;
      const right = MUSEUM_CONCEPT_STATIONS[next].position;
      if (Math.hypot(left[0] - right[0], left[2] - right[2]) < 0.9) issues.push(`Physical station spacing quá gần: ${MUSEUM_CONCEPT_STATIONS[index].id} / ${MUSEUM_CONCEPT_STATIONS[next].id}.`);
    }
  }

  const grid = getReachableGrid();
  for (const zone of MUSEUM_LAYOUT_ZONES) if (!isGridReachable(zone.entry, grid)) issues.push(`Zone entry không reachable trong static grid: ${zone.zoneId}.`);
  for (const station of MUSEUM_CONCEPT_STATIONS) if (!isGridReachable(station.position, grid)) issues.push(`Station không reachable trong static grid: ${station.id}.`);
  return issues;
}

export function assertMuseumPhysicalLayoutIntegrity(): void {
  const issues = getMuseumPhysicalLayoutIssues();
  if (issues.length > 0) throw new Error(`Museum physical layout không hợp lệ:\n${issues.join("\n")}`);
}

export function getMuseumStaticReachability() {
  const grid = getReachableGrid();
  return {
    zonesReachable: MUSEUM_LAYOUT_ZONES.filter((zone) => isGridReachable(zone.entry, grid)).length,
    stationsReachable: MUSEUM_CONCEPT_STATIONS.filter((station) => isGridReachable(station.position, grid)).length,
    totalZones: MUSEUM_LAYOUT_ZONES.length,
    totalStations: MUSEUM_CONCEPT_STATIONS.length,
    gridStep: GRID_STEP,
    playerClearance: MUSEUM_PLAYER_CLEARANCE,
  };
}

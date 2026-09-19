import type { MuseumZoneId } from "@/data/course";
import type { MuseumWorldPosition } from "./spatial-zones";

export type MuseumStructureKind =
  | "floor-marker"
  | "partition"
  | "portal-post"
  | "portal-header"
  | "lobby-frame";

export interface MuseumLayoutVolume {
  minX: number;
  maxX: number;
  minZ: number;
  maxZ: number;
}

export interface MuseumLayoutZone {
  zoneId: MuseumZoneId;
  center: MuseumWorldPosition;
  entry: MuseumWorldPosition;
  labelPosition: MuseumWorldPosition;
  activationRadius: number;
  volume: MuseumLayoutVolume;
}

export interface MuseumLayoutStructure {
  id: string;
  zoneId?: MuseumZoneId;
  kind: MuseumStructureKind;
  position: MuseumWorldPosition;
  size: MuseumWorldPosition;
  collidable: boolean;
  occluder: boolean;
  accent?: "shell" | "zone" | "alliance";
}

export const MUSEUM_WALKABLE_BOUNDS = {
  minX: -4.05,
  maxX: 4.05,
  minZ: -5.55,
  maxZ: 4.1,
} as const;

export const MUSEUM_PLAYER_CLEARANCE = 0.42;

export const MUSEUM_LAYOUT_ZONES: readonly MuseumLayoutZone[] = [
  {
    zoneId: "museum-zone-01",
    center: [0, 0, 1.9],
    entry: [0, 0, 2.7],
    labelPosition: [0, 2.65, 2.72],
    activationRadius: 1.45,
    volume: { minX: -1.25, maxX: 1.25, minZ: 1.1, maxZ: 2.55 },
  },
  {
    zoneId: "museum-zone-02",
    center: [2.4, 0, 1.9],
    entry: [2.4, 0, 2.7],
    labelPosition: [2.4, 2.65, 2.72],
    activationRadius: 1.45,
    volume: { minX: 1.35, maxX: 3.85, minZ: 1.1, maxZ: 2.55 },
  },
  {
    zoneId: "museum-zone-03",
    center: [-2.4, 0, 1.9],
    entry: [-2.4, 0, 2.7],
    labelPosition: [-2.4, 2.65, 2.72],
    activationRadius: 1.45,
    volume: { minX: -3.85, maxX: -1.35, minZ: 1.1, maxZ: 2.55 },
  },
  {
    zoneId: "museum-zone-04",
    center: [-2.4, 0, -0.4],
    entry: [-2.4, 0, 0.65],
    labelPosition: [-2.4, 2.65, 0.66],
    activationRadius: 1.45,
    volume: { minX: -3.85, maxX: -1.35, minZ: -1.2, maxZ: 0.85 },
  },
  {
    zoneId: "museum-zone-05",
    center: [0, 0, -0.65],
    entry: [0, 0, -1.3],
    labelPosition: [0, 2.65, -1.3],
    activationRadius: 1.45,
    volume: { minX: -1.4, maxX: 1.4, minZ: -1.15, maxZ: 0.35 },
  },
  {
    zoneId: "museum-zone-06",
    center: [2.4, 0, -0.8],
    entry: [2.4, 0, -1.3],
    labelPosition: [2.4, 2.65, -1.3],
    activationRadius: 1.45,
    volume: { minX: 1.35, maxX: 3.85, minZ: -1.95, maxZ: 0.35 },
  },
  {
    zoneId: "museum-zone-07",
    center: [0, 0, -3.55],
    entry: [0, 0, -2.6],
    labelPosition: [0, 2.65, -2.62],
    activationRadius: 1.45,
    volume: { minX: -3.25, maxX: 3.25, minZ: -5.15, maxZ: -2.55 },
  },
] as const;

export const MUSEUM_LAYOUT_STATION_POSITIONS: Readonly<Record<string, MuseumWorldPosition>> = {
  "station-zone01-origins": [-0.75, 0, 1.9],
  "station-zone01-method": [0.75, 0, 1.9],
  "station-zone02-worker": [1.9, 0, 1.9],
  "station-zone02-conditions": [2.95, 0, 1.9],
  "station-zone03-socialism": [-2.95, 0, 1.9],
  "station-zone03-transition": [-2.0, 0, 1.9],
  "station-zone04-democracy": [-3.0, 0, -0.4],
  "station-zone04-relationship": [-1.9, 0, -0.4],
  "station-zone05-structure": [-0.9, 0, -0.5],
  "station-zone05-necessity": [0.9, 0, -0.5],
  "station-zone05-alliance": [0, 0, -1.25],
  "station-zone06-nation": [1.9, 0, -0.7],
  "station-zone06-religion": [2.95, 0, -0.7],
  "station-zone06-relations": [2.4, 0, -1.75],
  "station-zone07-position": [-2.0, 0, -3.6],
  "station-zone07-foundations": [0, 0, -3.9],
  "station-zone07-vietnam": [2.0, 0, -3.6],
};

function portalStructures(
  id: string,
  zoneId: MuseumZoneId,
  center: MuseumWorldPosition,
  width: number,
): MuseumLayoutStructure[] {
  const [x, , z] = center;
  const postSize: MuseumWorldPosition = [0.12, 2.1, 0.12];
  return [
    // Portal posts orient the visitor but leave the threshold open; only bay
    // partitions are movement blockers/occluders.
    { id: `${id}-left`, zoneId, kind: "portal-post", position: [x - width / 2, 1.05, z], size: postSize, collidable: false, occluder: false, accent: "zone" },
    { id: `${id}-right`, zoneId, kind: "portal-post", position: [x + width / 2, 1.05, z], size: postSize, collidable: false, occluder: false, accent: "zone" },
    { id: `${id}-header`, zoneId, kind: "portal-header", position: [x, 2.1, z], size: [width + 0.12, 0.12, 0.12], collidable: false, occluder: false, accent: "zone" },
  ];
}

export const MUSEUM_PHYSICAL_STRUCTURES: readonly MuseumLayoutStructure[] = [
  { id: "lobby-floor-marker", kind: "floor-marker", position: [0, -0.46, 3.25], size: [3.4, 0.025, 1.05], collidable: false, occluder: false, accent: "shell" },
  { id: "lobby-frame-left", kind: "lobby-frame", position: [-1.75, 1.05, 3.55], size: [0.12, 2.1, 0.12], collidable: true, occluder: true, accent: "shell" },
  { id: "lobby-frame-right", kind: "lobby-frame", position: [1.75, 1.05, 3.55], size: [0.12, 2.1, 0.12], collidable: true, occluder: true, accent: "shell" },
  { id: "lobby-frame-header", kind: "lobby-frame", position: [0, 2.1, 3.55], size: [3.62, 0.12, 0.12], collidable: false, occluder: false, accent: "shell" },

  ...portalStructures("zone01-portal", "museum-zone-01", [0, 0, 2.7], 2.2),
  ...portalStructures("zone02-portal", "museum-zone-02", [2.4, 0, 2.7], 1.35),
  ...portalStructures("zone03-portal", "museum-zone-03", [-2.4, 0, 2.7], 1.35),
  ...portalStructures("zone04-portal", "museum-zone-04", [-2.4, 0, 0.65], 1.35),
  ...portalStructures("zone05-portal", "museum-zone-05", [0, 0, -1.3], 1.95),
  ...portalStructures("zone06-portal", "museum-zone-06", [2.4, 0, -1.3], 1.35),
  ...portalStructures("zone07-portal", "museum-zone-07", [0, 0, -2.6], 5.0),

  { id: "zone01-partition-left", zoneId: "museum-zone-01", kind: "partition", position: [-1.35, 1.05, 2.0], size: [0.12, 2.1, 1.2], collidable: true, occluder: true, accent: "zone" },
  { id: "zone01-partition-right", zoneId: "museum-zone-01", kind: "partition", position: [1.35, 1.05, 2.0], size: [0.12, 2.1, 1.2], collidable: true, occluder: true, accent: "zone" },
  { id: "zone01-neutral-marker", zoneId: "museum-zone-01", kind: "floor-marker", position: [0, -0.46, 1.9], size: [2.2, 0.025, 1.1], collidable: false, occluder: false, accent: "zone" },
  { id: "zone02-neutral-marker", zoneId: "museum-zone-02", kind: "floor-marker", position: [2.4, -0.46, 1.9], size: [2.0, 0.025, 1.1], collidable: false, occluder: false, accent: "zone" },
  { id: "zone03-neutral-marker", zoneId: "museum-zone-03", kind: "floor-marker", position: [-2.4, -0.46, 1.9], size: [2.0, 0.025, 1.1], collidable: false, occluder: false, accent: "zone" },
  { id: "zone04-neutral-marker", zoneId: "museum-zone-04", kind: "floor-marker", position: [-2.4, -0.46, -0.4], size: [2.0, 0.025, 1.5], collidable: false, occluder: false, accent: "zone" },
  { id: "zone05-flagship-marker", zoneId: "museum-zone-05", kind: "floor-marker", position: [0, -0.46, -0.65], size: [2.9, 0.025, 1.7], collidable: false, occluder: false, accent: "alliance" },
  { id: "zone06-neutral-marker", zoneId: "museum-zone-06", kind: "floor-marker", position: [2.4, -0.46, -0.8], size: [2.15, 0.025, 1.85], collidable: false, occluder: false, accent: "zone" },
  { id: "zone07-neutral-marker", zoneId: "museum-zone-07", kind: "floor-marker", position: [0, -0.46, -3.7], size: [5.8, 0.025, 2.25], collidable: false, occluder: false, accent: "zone" },
] as const;

export const MUSEUM_PHYSICAL_COLLIDERS = MUSEUM_PHYSICAL_STRUCTURES.filter((structure) => structure.collidable);
export const MUSEUM_PHYSICAL_OCCLUDERS = MUSEUM_PHYSICAL_STRUCTURES.filter((structure) => structure.occluder);

export function getMuseumLayoutZone(zoneId: MuseumZoneId) {
  return MUSEUM_LAYOUT_ZONES.find((zone) => zone.zoneId === zoneId);
}

export function getMuseumStructureBounds(structure: MuseumLayoutStructure) {
  return {
    minX: structure.position[0] - structure.size[0] / 2,
    maxX: structure.position[0] + structure.size[0] / 2,
    minZ: structure.position[2] - structure.size[2] / 2,
    maxZ: structure.position[2] + structure.size[2] / 2,
  };
}

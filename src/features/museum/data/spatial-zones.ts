import type { MuseumZoneId } from "@/data/course";

export type MuseumWorldPosition = readonly [number, number, number];

export interface MuseumSpatialZone {
  zoneId: MuseumZoneId;
  center: MuseumWorldPosition;
  activationRadius: number;
  stationIds: readonly string[];
  labelPosition: MuseumWorldPosition;
}

/**
 * The GLB is a compact open gallery rather than seven authored rooms. These
 * centres are a logical learning layer inside its walkable rectangle.
 */
export const MUSEUM_SPATIAL_ZONES: readonly MuseumSpatialZone[] = [
  {
    zoneId: "museum-zone-01",
    center: [0, 0, 2.35],
    activationRadius: 1.45,
    stationIds: ["station-zone01-origins", "station-zone01-method"],
    labelPosition: [0, 2.65, 2.35],
  },
  {
    zoneId: "museum-zone-02",
    center: [2.6, 0, 2.35],
    activationRadius: 1.45,
    stationIds: ["station-zone02-worker", "station-zone02-conditions"],
    labelPosition: [2.6, 2.65, 2.35],
  },
  {
    zoneId: "museum-zone-03",
    center: [-2.6, 0, 2.35],
    activationRadius: 1.45,
    stationIds: ["station-zone03-socialism", "station-zone03-transition"],
    labelPosition: [-2.6, 2.65, 2.35],
  },
  {
    zoneId: "museum-zone-04",
    center: [-2.35, 0, -0.1],
    activationRadius: 1.45,
    stationIds: ["station-zone04-democracy", "station-zone04-relationship"],
    labelPosition: [-2.35, 2.65, -0.1],
  },
  {
    zoneId: "museum-zone-05",
    center: [0, 0, -0.55],
    activationRadius: 1.45,
    stationIds: ["station-zone05-structure", "station-zone05-necessity", "station-zone05-alliance"],
    labelPosition: [0, 2.65, -0.55],
  },
  {
    zoneId: "museum-zone-06",
    center: [2.6, 0, -0.55],
    activationRadius: 1.45,
    stationIds: ["station-zone06-nation", "station-zone06-religion", "station-zone06-relations"],
    labelPosition: [2.6, 2.65, -0.55],
  },
  {
    zoneId: "museum-zone-07",
    center: [0, 0, -3.35],
    activationRadius: 1.45,
    stationIds: ["station-zone07-position", "station-zone07-foundations", "station-zone07-vietnam"],
    labelPosition: [0, 2.65, -3.35],
  },
] as const;

export function getSpatialZoneById(zoneId: MuseumZoneId) {
  return MUSEUM_SPATIAL_ZONES.find((zone) => zone.zoneId === zoneId);
}

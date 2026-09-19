import type { MuseumZoneId } from "@/data/course";
import { MUSEUM_LAYOUT_ZONES } from "./museum-layout-v2";

export type MuseumWorldPosition = readonly [number, number, number];

export interface MuseumSpatialZone {
  zoneId: MuseumZoneId;
  center: MuseumWorldPosition;
  activationRadius: number;
  stationIds: readonly string[];
  labelPosition: MuseumWorldPosition;
  volume: {
    minX: number;
    maxX: number;
    minZ: number;
    maxZ: number;
  };
}

/** Muted wayfinding accents shared by signs, stations and future HUD styling. */
export const MUSEUM_ZONE_ACCENTS: Readonly<Record<MuseumZoneId, string>> = {
  "museum-zone-01": "#b89b69",
  "museum-zone-02": "#9da9bd",
  "museum-zone-03": "#a98678",
  "museum-zone-04": "#9d8cb0",
  "museum-zone-05": "#c76c53",
  "museum-zone-06": "#8eaa9b",
  "museum-zone-07": "#b49a7e",
};

const STATION_IDS_BY_ZONE: Readonly<Record<MuseumZoneId, readonly string[]>> = {
  "museum-zone-01": ["station-zone01-origins", "station-zone01-method"],
  "museum-zone-02": ["station-zone02-worker", "station-zone02-conditions"],
  "museum-zone-03": ["station-zone03-socialism", "station-zone03-transition"],
  "museum-zone-04": ["station-zone04-democracy", "station-zone04-relationship"],
  "museum-zone-05": ["station-zone05-structure", "station-zone05-necessity", "station-zone05-alliance"],
  "museum-zone-06": ["station-zone06-nation", "station-zone06-religion", "station-zone06-relations"],
  "museum-zone-07": ["station-zone07-position", "station-zone07-foundations", "station-zone07-vietnam"],
};

/** Physical zone volumes are authored in museum-layout-v2 and reused by HUD detection. */
export const MUSEUM_SPATIAL_ZONES: readonly MuseumSpatialZone[] = MUSEUM_LAYOUT_ZONES.map((zone) => ({
  ...zone,
  stationIds: STATION_IDS_BY_ZONE[zone.zoneId],
}));

export function getSpatialZoneById(zoneId: MuseumZoneId) {
  return MUSEUM_SPATIAL_ZONES.find((zone) => zone.zoneId === zoneId);
}

export function getMuseumZoneAccent(zoneId: MuseumZoneId) {
  return MUSEUM_ZONE_ACCENTS[zoneId];
}

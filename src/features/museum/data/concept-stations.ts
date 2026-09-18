import type { MuseumConceptId, MuseumZoneId } from "@/data/course";
import type { MuseumWorldPosition } from "./spatial-zones";

export type ConceptStationVariant = "standard" | "alliance";

export interface MuseumConceptStation {
  id: string;
  zoneId: MuseumZoneId;
  conceptIds: readonly MuseumConceptId[];
  position: MuseumWorldPosition;
  interactionRadius: number;
  label: string;
  variant?: ConceptStationVariant;
}

/**
 * Spatial presentation metadata only. Academic text is resolved from
 * MuseumConcept at runtime; it is intentionally not duplicated here.
 */
export const MUSEUM_CONCEPT_STATIONS: readonly MuseumConceptStation[] = [
  {
    id: "station-zone01-origins",
    zoneId: "museum-zone-01",
    conceptIds: ["museum-concept-ch01-origins", "museum-concept-ch01-development"],
    position: [-0.8, 0, 2.35],
    interactionRadius: 5,
    label: "KHỞI NGUỒN",
  },
  {
    id: "station-zone01-method",
    zoneId: "museum-zone-01",
    conceptIds: ["museum-concept-ch01-marx-engels", "museum-concept-ch01-research"],
    position: [0.8, 0, 2.35],
    interactionRadius: 5,
    label: "NỀN TẢNG",
  },
  {
    id: "station-zone02-worker",
    zoneId: "museum-zone-02",
    conceptIds: ["museum-concept-ch02-worker", "museum-concept-ch02-mission"],
    position: [2.0, 0, 2.35],
    interactionRadius: 5,
    label: "GIAI CẤP",
  },
  {
    id: "station-zone02-conditions",
    zoneId: "museum-zone-02",
    conceptIds: ["museum-concept-ch02-conditions", "museum-concept-ch02-vietnam"],
    position: [3.25, 0, 2.35],
    interactionRadius: 5,
    label: "THỰC HIỆN",
  },
  {
    id: "station-zone03-socialism",
    zoneId: "museum-zone-03",
    conceptIds: ["museum-concept-ch03-socialism"],
    position: [-3.25, 0, 2.35],
    interactionRadius: 5,
    label: "CHỦ NGHĨA XÃ HỘI",
  },
  {
    id: "station-zone03-transition",
    zoneId: "museum-zone-03",
    conceptIds: ["museum-concept-ch03-transition", "museum-concept-ch03-vietnam-path"],
    position: [-2.0, 0, 2.35],
    interactionRadius: 5,
    label: "CHUYỂN TIẾP",
  },
  {
    id: "station-zone04-democracy",
    zoneId: "museum-zone-04",
    conceptIds: ["museum-concept-ch04-democracy", "museum-concept-ch04-state"],
    position: [-2.8, 0, 0.2],
    interactionRadius: 5,
    label: "DÂN CHỦ & NHÀ NƯỚC",
  },
  {
    id: "station-zone04-relationship",
    zoneId: "museum-zone-04",
    conceptIds: ["museum-concept-ch04-democracy-state"],
    position: [-1.55, 0, 0.2],
    interactionRadius: 5,
    label: "MỐI QUAN HỆ",
  },
  {
    id: "station-zone05-structure",
    zoneId: "museum-zone-05",
    conceptIds: ["museum-concept-ch05-structure", "museum-concept-ch05-transformation"],
    position: [-0.8, 0, -0.55],
    interactionRadius: 5,
    label: "CƠ CẤU",
  },
  {
    id: "station-zone05-necessity",
    zoneId: "museum-zone-05",
    conceptIds: ["museum-concept-ch05-alliance-necessity"],
    position: [0.8, 0, -0.55],
    interactionRadius: 5,
    label: "TÍNH TẤT YẾU",
    variant: "alliance",
  },
  {
    id: "station-zone05-alliance",
    zoneId: "museum-zone-05",
    conceptIds: ["museum-concept-ch05-vietnam-alliance", "museum-concept-ch05-alliance-contents"],
    position: [0, 0, -1.85],
    interactionRadius: 5,
    label: "LIÊN MINH",
    variant: "alliance",
  },
  {
    id: "station-zone06-nation",
    zoneId: "museum-zone-06",
    conceptIds: ["museum-concept-ch06-nation-meanings", "museum-concept-ch06-national-relations"],
    position: [2.0, 0, -0.55],
    interactionRadius: 5,
    label: "DÂN TỘC",
  },
  {
    id: "station-zone06-religion",
    zoneId: "museum-zone-06",
    conceptIds: ["museum-concept-ch06-religion-framework", "museum-concept-ch06-religion-principles"],
    position: [3.25, 0, -0.55],
    interactionRadius: 5,
    label: "TÔN GIÁO",
  },
  {
    id: "station-zone06-relations",
    zoneId: "museum-zone-06",
    conceptIds: ["museum-concept-ch06-ethnic-religious-relations"],
    position: [2.6, 0, -1.85],
    interactionRadius: 5,
    label: "QUAN HỆ Ở VIỆT NAM",
  },
  {
    id: "station-zone07-position",
    zoneId: "museum-zone-07",
    conceptIds: ["museum-concept-ch07-family-position", "museum-concept-ch07-family-functions"],
    position: [-2.0, 0, -3.05],
    interactionRadius: 5,
    label: "VỊ TRÍ & CHỨC NĂNG",
  },
  {
    id: "station-zone07-foundations",
    zoneId: "museum-zone-07",
    conceptIds: ["museum-concept-ch07-family-foundations"],
    position: [0.15, 0, -2.8],
    interactionRadius: 5,
    label: "NỀN TẢNG",
  },
  {
    id: "station-zone07-vietnam",
    zoneId: "museum-zone-07",
    conceptIds: ["museum-concept-ch07-vietnamese-family"],
    position: [2.0, 0, -3.35],
    interactionRadius: 5,
    label: "GIA ĐÌNH VIỆT NAM",
  },
] as const;

const stationIndex = new Map(MUSEUM_CONCEPT_STATIONS.map((station) => [station.id, station]));

export function getConceptStationById(id: string) {
  return stationIndex.get(id);
}

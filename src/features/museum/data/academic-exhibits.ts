import type { MuseumConceptId, MuseumVisualizationType, MuseumZoneId } from "@/data/course";

export type AcademicExhibitVariant =
  | "timeline"
  | "foundation"
  | "cluster"
  | "layers"
  | "framework"
  | "sequence"
  | "comparison"
  | "relationship"
  | "bridge"
  | "network"
  | "parallel";

export interface AcademicExhibitDefinition {
  id: string;
  stationId: string;
  zoneId: MuseumZoneId;
  visualization: MuseumVisualizationType;
  variant: AcademicExhibitVariant;
  conceptIds: readonly MuseumConceptId[];
  /** Short, approved labels only; detailed academic text stays in ConceptDialog. */
  worldLabels?: readonly string[];
  /** Optional secondary labels used only for the small Zone 5 content ring. */
  secondaryLabels?: readonly string[];
}

/**
 * These labels are deliberately short paraphrases of existing station labels
 * and MuseumConcept titles. They are not a second academic content registry.
 */
export const ACADEMIC_EXHIBITS: readonly AcademicExhibitDefinition[] = [
  {
    id: "exhibit-zone01-origins",
    stationId: "station-zone01-origins",
    zoneId: "museum-zone-01",
    visualization: "timeline",
    variant: "timeline",
    conceptIds: ["museum-concept-ch01-origins", "museum-concept-ch01-development"],
    worldLabels: ["KHỞI NGUỒN", "PHÁT TRIỂN"],
  },
  {
    id: "exhibit-zone01-method",
    stationId: "station-zone01-method",
    zoneId: "museum-zone-01",
    visualization: "concept-display",
    variant: "foundation",
    conceptIds: ["museum-concept-ch01-marx-engels", "museum-concept-ch01-research"],
    worldLabels: ["C. MÁC", "PH. ĂNGGHEN", "NGHIÊN CỨU"],
  },
  {
    id: "exhibit-zone02-worker",
    stationId: "station-zone02-worker",
    zoneId: "museum-zone-02",
    visualization: "diagram",
    variant: "cluster",
    conceptIds: ["museum-concept-ch02-worker", "museum-concept-ch02-mission"],
    worldLabels: ["GIAI CẤP CÔNG NHÂN", "SỨ MỆNH"],
  },
  {
    id: "exhibit-zone02-conditions",
    stationId: "station-zone02-conditions",
    zoneId: "museum-zone-02",
    visualization: "comparison",
    variant: "layers",
    conceptIds: ["museum-concept-ch02-conditions", "museum-concept-ch02-vietnam"],
    worldLabels: ["ĐIỀU KIỆN", "VIỆT NAM"],
  },
  {
    id: "exhibit-zone03-socialism",
    stationId: "station-zone03-socialism",
    zoneId: "museum-zone-03",
    visualization: "concept-display",
    variant: "framework",
    conceptIds: ["museum-concept-ch03-socialism"],
    worldLabels: ["CHỦ NGHĨA XÃ HỘI"],
  },
  {
    id: "exhibit-zone03-transition",
    stationId: "station-zone03-transition",
    zoneId: "museum-zone-03",
    visualization: "sequence",
    variant: "sequence",
    conceptIds: ["museum-concept-ch03-transition", "museum-concept-ch03-vietnam-path"],
    worldLabels: ["QUÁ ĐỘ", "VIỆT NAM"],
  },
  {
    id: "exhibit-zone04-democracy",
    stationId: "station-zone04-democracy",
    zoneId: "museum-zone-04",
    visualization: "timeline",
    variant: "comparison",
    conceptIds: ["museum-concept-ch04-democracy", "museum-concept-ch04-state"],
    worldLabels: ["DÂN CHỦ", "NHÀ NƯỚC"],
  },
  {
    id: "exhibit-zone04-relationship",
    stationId: "station-zone04-relationship",
    zoneId: "museum-zone-04",
    visualization: "relationship",
    variant: "relationship",
    conceptIds: ["museum-concept-ch04-democracy-state"],
    worldLabels: ["DÂN CHỦ", "NHÀ NƯỚC"],
  },
  {
    id: "exhibit-zone05-structure",
    stationId: "station-zone05-structure",
    zoneId: "museum-zone-05",
    visualization: "comparison",
    variant: "comparison",
    conceptIds: ["museum-concept-ch05-structure", "museum-concept-ch05-transformation"],
    worldLabels: ["CƠ CẤU XÃ HỘI", "CƠ CẤU XÃ HỘI – GIAI CẤP"],
  },
  {
    id: "exhibit-zone05-necessity",
    stationId: "station-zone05-necessity",
    zoneId: "museum-zone-05",
    visualization: "relationship",
    variant: "bridge",
    conceptIds: ["museum-concept-ch05-alliance-necessity"],
    worldLabels: ["TÍNH TẤT YẾU"],
  },
  {
    id: "exhibit-zone05-alliance",
    stationId: "station-zone05-alliance",
    zoneId: "museum-zone-05",
    visualization: "network",
    variant: "network",
    conceptIds: ["museum-concept-ch05-vietnam-alliance", "museum-concept-ch05-alliance-contents"],
    worldLabels: ["CÔNG NHÂN", "NÔNG DÂN", "TRÍ THỨC"],
    secondaryLabels: ["KINH TẾ", "CHÍNH TRỊ", "VĂN HÓA – XÃ HỘI"],
  },
  {
    id: "exhibit-zone06-nation",
    stationId: "station-zone06-nation",
    zoneId: "museum-zone-06",
    visualization: "comparison",
    variant: "comparison",
    conceptIds: ["museum-concept-ch06-nation-meanings", "museum-concept-ch06-national-relations"],
    worldLabels: ["NGHĨA RỘNG", "NGHĨA HẸP"],
  },
  {
    id: "exhibit-zone06-religion",
    stationId: "station-zone06-religion",
    zoneId: "museum-zone-06",
    visualization: "concept-display",
    variant: "layers",
    conceptIds: ["museum-concept-ch06-religion-framework", "museum-concept-ch06-religion-principles"],
    worldLabels: ["KHÁI NIỆM", "NGUỒN GỐC", "TÍNH CHẤT"],
  },
  {
    id: "exhibit-zone06-relations",
    stationId: "station-zone06-relations",
    zoneId: "museum-zone-06",
    visualization: "relationship",
    variant: "network",
    conceptIds: ["museum-concept-ch06-ethnic-religious-relations"],
    worldLabels: ["DÂN TỘC", "TÔN GIÁO", "VIỆT NAM"],
  },
  {
    id: "exhibit-zone07-position",
    stationId: "station-zone07-position",
    zoneId: "museum-zone-07",
    visualization: "diagram",
    variant: "parallel",
    conceptIds: ["museum-concept-ch07-family-position", "museum-concept-ch07-family-functions"],
    worldLabels: ["VỊ TRÍ", "CHỨC NĂNG"],
  },
  {
    id: "exhibit-zone07-foundations",
    stationId: "station-zone07-foundations",
    zoneId: "museum-zone-07",
    visualization: "comparison",
    variant: "foundation",
    conceptIds: ["museum-concept-ch07-family-foundations"],
    worldLabels: ["KINH TẾ – XÃ HỘI", "CHÍNH TRỊ – XÃ HỘI", "VĂN HÓA"],
  },
  {
    id: "exhibit-zone07-vietnam",
    stationId: "station-zone07-vietnam",
    zoneId: "museum-zone-07",
    visualization: "sequence",
    variant: "sequence",
    conceptIds: ["museum-concept-ch07-vietnamese-family"],
    worldLabels: ["BIẾN ĐỔI", "XÂY DỰNG"],
  },
] as const;

const exhibitIndex = new Map(ACADEMIC_EXHIBITS.map((exhibit) => [exhibit.stationId, exhibit]));

export function getAcademicExhibitByStationId(stationId: string) {
  return exhibitIndex.get(stationId);
}

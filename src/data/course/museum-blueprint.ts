import { getChapterById } from "./chapters";
import { getMuseumConceptById } from "./museum-concepts";
import { MUSEUM_ZONES } from "./museum-zones";
import type { CourseChapter, MuseumConcept, MuseumZone, MuseumZoneId } from "./types";

export interface MuseumBlueprintEntry {
  zone: MuseumZone;
  chapter: CourseChapter;
  concepts: readonly MuseumConcept[];
}

export const MUSEUM_BLUEPRINT: readonly MuseumBlueprintEntry[] = MUSEUM_ZONES.flatMap((zone) => {
  const chapter = getChapterById(zone.chapterId);
  const concepts = zone.conceptIds.flatMap((conceptId) => {
    const concept = getMuseumConceptById(conceptId);
    return concept ? [concept] : [];
  });

  return chapter ? [{ zone, chapter, concepts }] : [];
});

export interface MuseumEntryBlueprint {
  id: "museum-entry";
  title: "SOCIALISM 360";
  subtitle: "Interactive Museum of Scientific Socialism";
  purpose: string;
  zoneIds: readonly MuseumZoneId[];
  implementationStatus: "planned";
}

export const MUSEUM_ENTRY_BLUEPRINT: MuseumEntryBlueprint = {
  id: "museum-entry",
  title: "SOCIALISM 360",
  subtitle: "Interactive Museum of Scientific Socialism",
  purpose: "Chọn hành trình học tập qua bảy không gian chủ đề.",
  zoneIds: MUSEUM_ZONES.map((zone) => zone.id),
  implementationStatus: "planned",
};

export function getMuseumBlueprintEntry(zoneId: MuseumZoneId) {
  return MUSEUM_BLUEPRINT.find((entry) => entry.zone.id === zoneId);
}

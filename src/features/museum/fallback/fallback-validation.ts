import { getChapterById, getMuseumConceptById, MUSEUM_CONCEPTS, MUSEUM_ZONES } from '@/data/course';

export function getMuseumFallbackDataIssues(): string[] {
  const issues: string[] = [];
  const exposedConceptIds = new Set<string>();

  if (MUSEUM_ZONES.length !== 7) issues.push(`Fallback phải hiển thị đúng 7 zone, hiện có ${MUSEUM_ZONES.length}.`);

  for (const zone of MUSEUM_ZONES) {
    for (const conceptId of zone.conceptIds) {
      if (exposedConceptIds.has(conceptId)) issues.push(`Concept bị lặp trong fallback: ${conceptId}`);
      exposedConceptIds.add(conceptId);
      if (!getMuseumConceptById(conceptId)) issues.push(`Fallback tham chiếu concept không tồn tại: ${conceptId}`);
    }
    if (!getChapterById(zone.chapterId)) issues.push(`Fallback tham chiếu chapter không tồn tại: ${zone.chapterId}`);
  }

  if (MUSEUM_CONCEPTS.length !== 28) issues.push(`Fallback kỳ vọng 28 concept, hiện có ${MUSEUM_CONCEPTS.length}.`);
  for (const concept of MUSEUM_CONCEPTS) {
    if (!exposedConceptIds.has(concept.id)) issues.push(`Concept chưa được fallback expose: ${concept.id}`);
    if (!getChapterById(concept.chapterId)) issues.push(`Concept tham chiếu chapter không tồn tại: ${concept.chapterId}`);
  }

  return issues;
}

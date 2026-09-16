import { ARTIFACTS } from "./artifacts";
import { COURSE_CHAPTERS } from "./chapters";
import { MUSEUM_ZONES } from "./museum-zones";
import type { ChapterId, LessonId } from "./types";

export function getCourseDataIntegrityIssues(): string[] {
  const issues: string[] = [];
  const chapterIds = new Set<ChapterId>();
  const lessonIds = new Set<LessonId>();

  for (const chapter of COURSE_CHAPTERS) {
    if (chapterIds.has(chapter.id)) issues.push(`Chapter ID bị trùng: ${chapter.id}`);
    chapterIds.add(chapter.id);
  }

  if (chapterIds.size !== 7) issues.push("COURSE_CHAPTERS phải có đúng 7 chapter ID duy nhất.");

  const orders = COURSE_CHAPTERS.map((chapter) => chapter.number).sort((a, b) => a - b);
  if (orders.some((order, index) => order !== index + 1)) {
    issues.push("Thứ tự chương phải liên tục từ 1 đến 7.");
  }

  for (const zone of MUSEUM_ZONES) {
    if (!chapterIds.has(zone.chapterId)) {
      issues.push(`Museum zone ${zone.id} tham chiếu chapter không tồn tại: ${zone.chapterId}`);
    }
  }

  for (const chapter of COURSE_CHAPTERS) {
    for (const lesson of chapter.lessons) {
      if (!chapterIds.has(lesson.chapterId) || lesson.chapterId !== chapter.id) {
        issues.push(`Lesson ${lesson.id} tham chiếu chapter không hợp lệ: ${lesson.chapterId}`);
      }
      if (lessonIds.has(lesson.id)) issues.push(`Lesson ID bị trùng: ${lesson.id}`);
      lessonIds.add(lesson.id);
    }
  }

  for (const artifact of ARTIFACTS) {
    if (artifact.chapterId && !chapterIds.has(artifact.chapterId)) {
      issues.push(`Artifact ${artifact.id} tham chiếu chapter không tồn tại: ${artifact.chapterId}`);
    }
  }

  return issues;
}

export function assertCourseDataIntegrity(): void {
  const issues = getCourseDataIntegrityIssues();
  if (issues.length > 0) {
    throw new Error(`Course data không hợp lệ:\n${issues.join("\n")}`);
  }
}

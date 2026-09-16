import { MLN131_TEXTBOOK_SOURCE_ID } from "./sources";
import type {
  ChapterId,
  ChapterReviewPageMapping,
  LessonId,
  LessonTextbookPageMapping,
  ScopedSourceReference,
} from "./types";

export const LESSON_TEXTBOOK_PAGE_MAP: readonly LessonTextbookPageMapping[] = [
  { lessonId: "ch01-lesson-01", chapterId: "chapter-01", sourceRef: { id: "ref-ch01-l01-range", sourceId: MLN131_TEXTBOOK_SOURCE_ID, bookPages: { start: 11, end: 21 }, pdfPages: { start: 8, end: 18 } }, status: "verified" },
  { lessonId: "ch01-lesson-02", chapterId: "chapter-01", sourceRef: { id: "ref-ch01-l02-range", sourceId: MLN131_TEXTBOOK_SOURCE_ID, bookPages: { start: 22, end: 38 }, pdfPages: { start: 19, end: 35 } }, status: "verified" },
  { lessonId: "ch01-lesson-03", chapterId: "chapter-01", sourceRef: { id: "ref-ch01-l03-range", sourceId: MLN131_TEXTBOOK_SOURCE_ID, bookPages: { start: 39, end: 48 }, pdfPages: { start: 36, end: 45 } }, status: "verified" },
  { lessonId: "ch02-lesson-01", chapterId: "chapter-02", sourceRef: { id: "ref-ch02-l01-range", sourceId: MLN131_TEXTBOOK_SOURCE_ID, bookPages: { start: 52, end: 64 }, pdfPages: { start: 49, end: 61 } }, status: "verified" },
  { lessonId: "ch02-lesson-02", chapterId: "chapter-02", sourceRef: { id: "ref-ch02-l02-range", sourceId: MLN131_TEXTBOOK_SOURCE_ID, bookPages: { start: 65, end: 71 }, pdfPages: { start: 62, end: 68 } }, status: "verified" },
  { lessonId: "ch02-lesson-03", chapterId: "chapter-02", sourceRef: { id: "ref-ch02-l03-range", sourceId: MLN131_TEXTBOOK_SOURCE_ID, bookPages: { start: 72, end: 83 }, pdfPages: { start: 69, end: 80 } }, status: "verified" },
] as const;

export const CHAPTER_REVIEW_PAGE_MAP: readonly ChapterReviewPageMapping[] = [
  {
    chapterId: "chapter-01",
    sourceRefs: [{ id: "ref-ch01-review-range", sourceId: MLN131_TEXTBOOK_SOURCE_ID, bookPages: { start: 49, end: 50 }, pdfPages: { start: 46, end: 47 } }],
    status: "verified",
  },
  {
    chapterId: "chapter-02",
    sourceRefs: [{ id: "ref-ch02-review-range", sourceId: MLN131_TEXTBOOK_SOURCE_ID, bookPages: { start: 84, end: 85 }, pdfPages: { start: 81, end: 82 } }],
    status: "verified",
  },
  {
    chapterId: "chapter-03",
    sourceRefs: [{ id: "ref-ch03-review-range", sourceId: MLN131_TEXTBOOK_SOURCE_ID, bookPages: { start: 124, end: 124 }, pdfPages: { start: 121, end: 121 } }],
    status: "verified",
  },
  {
    chapterId: "chapter-04",
    sourceRefs: [{ id: "ref-ch04-review-range", sourceId: MLN131_TEXTBOOK_SOURCE_ID, bookPages: { start: 163, end: 164 }, pdfPages: { start: 160, end: 161 } }],
    status: "verified",
  },
  {
    chapterId: "chapter-05",
    sourceRefs: [{ id: "ref-ch05-review-range", sourceId: MLN131_TEXTBOOK_SOURCE_ID, bookPages: { start: 193, end: 194 }, pdfPages: { start: 190, end: 191 } }],
    status: "verified",
  },
  {
    chapterId: "chapter-06",
    sourceRefs: [{ id: "ref-ch06-review-range", sourceId: MLN131_TEXTBOOK_SOURCE_ID, bookPages: { start: 237, end: 238 }, pdfPages: { start: 234, end: 235 } }],
    status: "verified",
  },
  {
    chapterId: "chapter-07",
    sourceRefs: [{ id: "ref-ch07-review-range", sourceId: MLN131_TEXTBOOK_SOURCE_ID, bookPages: { start: 269, end: 269 }, pdfPages: { start: 266, end: 266 } }],
    status: "verified",
  },
] as const;

export function getLessonTextbookPageMapping(lessonId: LessonId) {
  return LESSON_TEXTBOOK_PAGE_MAP.find((mapping) => mapping.lessonId === lessonId);
}

export function getLessonTextbookSourceRefs(lessonId: LessonId): readonly ScopedSourceReference[] {
  const mapping = getLessonTextbookPageMapping(lessonId);
  return mapping ? [mapping.sourceRef] : [];
}

export function getChapterReviewSourceRefs(chapterId: ChapterId): readonly ScopedSourceReference[] {
  return CHAPTER_REVIEW_PAGE_MAP.find((mapping) => mapping.chapterId === chapterId)?.sourceRefs ?? [];
}

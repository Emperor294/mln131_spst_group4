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
  { lessonId: "ch03-lesson-01", chapterId: "chapter-03", sourceRef: { id: "ref-ch03-l01-range", sourceId: MLN131_TEXTBOOK_SOURCE_ID, bookPages: { start: 86, end: 103 }, pdfPages: { start: 83, end: 100 } }, status: "verified" },
  { lessonId: "ch03-lesson-02", chapterId: "chapter-03", sourceRef: { id: "ref-ch03-l02-range", sourceId: MLN131_TEXTBOOK_SOURCE_ID, bookPages: { start: 104, end: 108 }, pdfPages: { start: 101, end: 105 } }, status: "verified" },
  { lessonId: "ch03-lesson-03", chapterId: "chapter-03", sourceRef: { id: "ref-ch03-l03-range", sourceId: MLN131_TEXTBOOK_SOURCE_ID, bookPages: { start: 109, end: 123 }, pdfPages: { start: 106, end: 120 } }, status: "verified" },
  { lessonId: "ch04-lesson-01", chapterId: "chapter-04", sourceRef: { id: "ref-ch04-l01-range", sourceId: MLN131_TEXTBOOK_SOURCE_ID, bookPages: { start: 125, end: 140 }, pdfPages: { start: 122, end: 137 } }, status: "verified" },
  { lessonId: "ch04-lesson-02", chapterId: "chapter-04", sourceRef: { id: "ref-ch04-l02-range", sourceId: MLN131_TEXTBOOK_SOURCE_ID, bookPages: { start: 141, end: 148 }, pdfPages: { start: 138, end: 145 } }, status: "verified" },
  { lessonId: "ch04-lesson-03", chapterId: "chapter-04", sourceRef: { id: "ref-ch04-l03-range", sourceId: MLN131_TEXTBOOK_SOURCE_ID, bookPages: { start: 149, end: 162 }, pdfPages: { start: 146, end: 159 } }, status: "verified" },
  { lessonId: "ch05-lesson-01", chapterId: "chapter-05", sourceRef: { id: "ref-ch05-l01-range", sourceId: MLN131_TEXTBOOK_SOURCE_ID, bookPages: { start: 165, end: 172 }, pdfPages: { start: 162, end: 169 } }, status: "verified" },
  { lessonId: "ch05-lesson-02", chapterId: "chapter-05", sourceRef: { id: "ref-ch05-l02-range", sourceId: MLN131_TEXTBOOK_SOURCE_ID, bookPages: { start: 173, end: 176 }, pdfPages: { start: 170, end: 173 } }, status: "verified" },
  { lessonId: "ch05-lesson-03", chapterId: "chapter-05", sourceRef: { id: "ref-ch05-l03-range", sourceId: MLN131_TEXTBOOK_SOURCE_ID, bookPages: { start: 177, end: 192 }, pdfPages: { start: 174, end: 189 } }, status: "verified" },
  { lessonId: "ch06-lesson-01", chapterId: "chapter-06", sourceRef: { id: "ref-ch06-l01-range", sourceId: MLN131_TEXTBOOK_SOURCE_ID, bookPages: { start: 196, end: 213 }, pdfPages: { start: 193, end: 210 } }, status: "verified" },
  { lessonId: "ch06-lesson-02", chapterId: "chapter-06", sourceRef: { id: "ref-ch06-l02-range", sourceId: MLN131_TEXTBOOK_SOURCE_ID, bookPages: { start: 214, end: 227 }, pdfPages: { start: 211, end: 224 } }, status: "verified" },
  { lessonId: "ch06-lesson-03", chapterId: "chapter-06", sourceRef: { id: "ref-ch06-l03-range", sourceId: MLN131_TEXTBOOK_SOURCE_ID, bookPages: { start: 228, end: 236 }, pdfPages: { start: 225, end: 233 } }, status: "verified" },
  { lessonId: "ch07-lesson-01", chapterId: "chapter-07", sourceRef: { id: "ref-ch07-l01-range", sourceId: MLN131_TEXTBOOK_SOURCE_ID, bookPages: { start: 239, end: 249 }, pdfPages: { start: 236, end: 246 } }, status: "verified" },
  { lessonId: "ch07-lesson-02", chapterId: "chapter-07", sourceRef: { id: "ref-ch07-l02-range", sourceId: MLN131_TEXTBOOK_SOURCE_ID, bookPages: { start: 250, end: 256 }, pdfPages: { start: 247, end: 253 } }, status: "verified" },
  { lessonId: "ch07-lesson-03", chapterId: "chapter-07", sourceRef: { id: "ref-ch07-l03-range", sourceId: MLN131_TEXTBOOK_SOURCE_ID, bookPages: { start: 257, end: 268 }, pdfPages: { start: 254, end: 265 } }, status: "verified" },
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

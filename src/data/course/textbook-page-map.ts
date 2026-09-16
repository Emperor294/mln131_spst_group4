import { MLN131_TEXTBOOK_SOURCE_ID } from "./sources";
import type { ChapterId, ChapterTextbookPageMapping, ScopedSourceReference } from "./types";

export const CHAPTER_TEXTBOOK_PAGE_MAP: readonly ChapterTextbookPageMapping[] = [
  {
    chapterId: "chapter-01",
    sourceRef: { id: "ref-ch01-textbook", sourceId: MLN131_TEXTBOOK_SOURCE_ID, bookPages: { start: 11, end: 50 }, pdfPages: { start: 8, end: 47 } },
    status: "verified",
  },
  {
    chapterId: "chapter-02",
    sourceRef: { id: "ref-ch02-textbook", sourceId: MLN131_TEXTBOOK_SOURCE_ID, bookPages: { start: 51, end: 85 }, pdfPages: { start: 48, end: 82 } },
    status: "verified",
  },
  {
    chapterId: "chapter-03",
    sourceRef: { id: "ref-ch03-textbook", sourceId: MLN131_TEXTBOOK_SOURCE_ID, bookPages: { start: 86, end: 124 }, pdfPages: { start: 83, end: 121 } },
    status: "verified",
  },
  {
    chapterId: "chapter-04",
    sourceRef: { id: "ref-ch04-textbook", sourceId: MLN131_TEXTBOOK_SOURCE_ID, bookPages: { start: 125, end: 164 }, pdfPages: { start: 122, end: 161 } },
    status: "verified",
  },
  {
    chapterId: "chapter-05",
    sourceRef: { id: "ref-ch05-textbook", sourceId: MLN131_TEXTBOOK_SOURCE_ID, bookPages: { start: 165, end: 194 }, pdfPages: { start: 162, end: 191 } },
    status: "verified",
  },
  {
    chapterId: "chapter-06",
    sourceRef: { id: "ref-ch06-textbook", sourceId: MLN131_TEXTBOOK_SOURCE_ID, bookPages: { start: 195, end: 238 }, pdfPages: { start: 192, end: 235 } },
    status: "verified",
  },
  {
    chapterId: "chapter-07",
    sourceRef: { id: "ref-ch07-textbook", sourceId: MLN131_TEXTBOOK_SOURCE_ID, bookPages: { start: 239, end: 269 }, pdfPages: { start: 236, end: 266 } },
    status: "verified",
  },
] as const;

export function getChapterTextbookPageMapping(chapterId: ChapterId) {
  return CHAPTER_TEXTBOOK_PAGE_MAP.find((mapping) => mapping.chapterId === chapterId);
}

export function getChapterTextbookSourceRefs(chapterId: ChapterId): readonly ScopedSourceReference[] {
  const mapping = getChapterTextbookPageMapping(chapterId);
  return mapping ? [mapping.sourceRef] : [];
}

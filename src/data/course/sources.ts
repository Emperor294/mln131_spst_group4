import type { AcademicSourceId, CanonicalSource } from "./types";

export const MLN131_TEXTBOOK_SOURCE_ID = "mln131-textbook-2021" as const;

export const ACADEMIC_SOURCES: readonly CanonicalSource[] = [
  {
    id: MLN131_TEXTBOOK_SOURCE_ID,
    title: "Giáo trình Chủ nghĩa xã hội khoa học",
    institution: "Bộ Giáo dục và Đào tạo",
    publisher: "Nhà xuất bản Chính trị quốc gia Sự thật",
    year: 2021,
    sourceType: "textbook",
    reference:
      "Bộ Giáo dục và Đào tạo, Giáo trình Chủ nghĩa xã hội khoa học, Nhà xuất bản Chính trị quốc gia Sự thật, 2021.",
  },
] as const;

const SOURCE_INDEX = new Map<AcademicSourceId, CanonicalSource>(
  ACADEMIC_SOURCES.map((source) => [source.id, source]),
);

export function getAcademicSourceById(id: AcademicSourceId) {
  return SOURCE_INDEX.get(id);
}

import type { ChapterId } from "@/data/course";

export interface ChapterVisualIdentity {
  label: string;
  indexLabel: string;
}

export const CHAPTER_VISUAL_IDENTITIES = {
  "chapter-01": { label: "Nền tảng", indexLabel: "Origins / Foundation" },
  "chapter-02": { label: "Giai cấp công nhân", indexLabel: "Working Class" },
  "chapter-03": { label: "Thời kỳ quá độ", indexLabel: "Transition" },
  "chapter-04": { label: "Dân chủ & Nhà nước", indexLabel: "Democracy & State" },
  "chapter-05": { label: "Liên minh xã hội", indexLabel: "Social Alliance" },
  "chapter-06": { label: "Dân tộc & Tôn giáo", indexLabel: "Nation & Religion" },
  "chapter-07": { label: "Gia đình", indexLabel: "Family" },
} as const satisfies Record<ChapterId, ChapterVisualIdentity>;

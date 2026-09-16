import type { MuseumZone } from "./types";

const PLACEHOLDER_DESCRIPTION = "[Nội dung giáo trình sẽ được bổ sung]";

export const MUSEUM_ZONES = [
  {
    id: "zone-01",
    chapterId: "chapter-01",
    order: 1,
    title: "Nhập môn Chủ nghĩa Xã hội Khoa học",
    description: PLACEHOLDER_DESCRIPTION,
    status: "placeholder",
  },
  {
    id: "zone-02",
    chapterId: "chapter-02",
    order: 2,
    title: "Sứ mệnh lịch sử của giai cấp công nhân",
    description: PLACEHOLDER_DESCRIPTION,
    status: "placeholder",
  },
  {
    id: "zone-03",
    chapterId: "chapter-03",
    order: 3,
    title: "Chủ nghĩa xã hội và thời kỳ quá độ lên chủ nghĩa xã hội",
    description: PLACEHOLDER_DESCRIPTION,
    status: "placeholder",
  },
  {
    id: "zone-04",
    chapterId: "chapter-04",
    order: 4,
    title: "Dân chủ xã hội chủ nghĩa và Nhà nước xã hội chủ nghĩa",
    description: PLACEHOLDER_DESCRIPTION,
    status: "placeholder",
  },
  {
    id: "zone-05",
    chapterId: "chapter-05",
    order: 5,
    title: "Cơ cấu xã hội – giai cấp và liên minh giai cấp, tầng lớp",
    description: PLACEHOLDER_DESCRIPTION,
    status: "placeholder",
  },
  {
    id: "zone-06",
    chapterId: "chapter-06",
    order: 6,
    title:
      "Vấn đề dân tộc và tôn giáo trong thời kỳ quá độ lên chủ nghĩa xã hội",
    description: PLACEHOLDER_DESCRIPTION,
    status: "placeholder",
  },
  {
    id: "zone-07",
    chapterId: "chapter-07",
    order: 7,
    title: "Vấn đề gia đình trong thời kỳ quá độ lên chủ nghĩa xã hội",
    description: PLACEHOLDER_DESCRIPTION,
    status: "placeholder",
  },
] as const satisfies readonly MuseumZone[];

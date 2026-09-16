import type { CourseChapter } from "./types";
import { getLessonsByChapterId } from "./lessons";
import { getChapterTextbookSourceRefs } from "./textbook-page-map";

const PLACEHOLDER_DESCRIPTION = "[Nội dung giáo trình sẽ được bổ sung]";

export const COURSE_CHAPTERS: readonly CourseChapter[] = [
  {
    id: "chapter-01",
    number: 1,
    title: "Nhập môn Chủ nghĩa Xã hội Khoa học",
    description: PLACEHOLDER_DESCRIPTION,
    status: "placeholder",
    museumZoneId: "zone-01",
    lessons: getLessonsByChapterId("chapter-01"),
    sourceRefs: getChapterTextbookSourceRefs("chapter-01"),
  },
  {
    id: "chapter-02",
    number: 2,
    title: "Sứ mệnh lịch sử của giai cấp công nhân",
    description: PLACEHOLDER_DESCRIPTION,
    status: "placeholder",
    museumZoneId: "zone-02",
    lessons: getLessonsByChapterId("chapter-02"),
    sourceRefs: getChapterTextbookSourceRefs("chapter-02"),
  },
  {
    id: "chapter-03",
    number: 3,
    title: "Chủ nghĩa xã hội và thời kỳ quá độ lên chủ nghĩa xã hội",
    description: PLACEHOLDER_DESCRIPTION,
    status: "placeholder",
    museumZoneId: "zone-03",
    lessons: getLessonsByChapterId("chapter-03"),
    sourceRefs: getChapterTextbookSourceRefs("chapter-03"),
  },
  {
    id: "chapter-04",
    number: 4,
    title: "Dân chủ xã hội chủ nghĩa và Nhà nước xã hội chủ nghĩa",
    description: PLACEHOLDER_DESCRIPTION,
    status: "placeholder",
    museumZoneId: "zone-04",
    lessons: getLessonsByChapterId("chapter-04"),
    sourceRefs: getChapterTextbookSourceRefs("chapter-04"),
  },
  {
    id: "chapter-05",
    number: 5,
    title: "Cơ cấu xã hội – giai cấp và liên minh giai cấp, tầng lớp trong thời kỳ quá độ lên chủ nghĩa xã hội",
    description: PLACEHOLDER_DESCRIPTION,
    status: "placeholder",
    museumZoneId: "zone-05",
    lessons: getLessonsByChapterId("chapter-05"),
    sourceRefs: getChapterTextbookSourceRefs("chapter-05"),
  },
  {
    id: "chapter-06",
    number: 6,
    title:
      "Vấn đề dân tộc và tôn giáo trong thời kỳ quá độ lên chủ nghĩa xã hội",
    description: PLACEHOLDER_DESCRIPTION,
    status: "placeholder",
    museumZoneId: "zone-06",
    lessons: getLessonsByChapterId("chapter-06"),
    sourceRefs: getChapterTextbookSourceRefs("chapter-06"),
  },
  {
    id: "chapter-07",
    number: 7,
    title: "Vấn đề gia đình trong thời kỳ quá độ lên chủ nghĩa xã hội",
    description: PLACEHOLDER_DESCRIPTION,
    status: "placeholder",
    museumZoneId: "zone-07",
    lessons: getLessonsByChapterId("chapter-07"),
    sourceRefs: getChapterTextbookSourceRefs("chapter-07"),
  },
] as const;

export function getChapterById(id: string) {
  return COURSE_CHAPTERS.find((chapter) => chapter.id === id);
}

export function getChapterNeighbors(id: CourseChapter["id"]) {
  const index = COURSE_CHAPTERS.findIndex((chapter) => chapter.id === id);

  return {
    previous: index > 0 ? COURSE_CHAPTERS[index - 1] : undefined,
    next: index >= 0 && index < COURSE_CHAPTERS.length - 1
      ? COURSE_CHAPTERS[index + 1]
      : undefined,
  };
}

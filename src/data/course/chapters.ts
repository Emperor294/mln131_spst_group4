import type { CourseChapter } from "./types";
import { getLessonsByChapterId } from "./lessons";
import { getChapterTextbookSourceRefs } from "./textbook-page-map";

export const COURSE_CHAPTERS: readonly CourseChapter[] = [
  {
    id: "chapter-01",
    number: 1,
    title: "Nhập môn Chủ nghĩa Xã hội Khoa học",
    description: "Chương giới thiệu sự ra đời, các giai đoạn phát triển, đối tượng, phương pháp và ý nghĩa nghiên cứu của Chủ nghĩa xã hội khoa học.",
    status: "verified",
    museumZoneId: "museum-zone-01",
    lessons: getLessonsByChapterId("chapter-01"),
    sourceRefs: getChapterTextbookSourceRefs("chapter-01"),
  },
  {
    id: "chapter-02",
    number: 2,
    title: "Sứ mệnh lịch sử của giai cấp công nhân",
    description: "Chương trình bày khái niệm, đặc điểm, nội dung và điều kiện thực hiện sứ mệnh lịch sử của giai cấp công nhân trong lý luận và thực tiễn hiện nay.",
    status: "verified",
    museumZoneId: "museum-zone-02",
    lessons: getLessonsByChapterId("chapter-02"),
    sourceRefs: getChapterTextbookSourceRefs("chapter-02"),
  },
  {
    id: "chapter-03",
    number: 3,
    title: "Chủ nghĩa xã hội và thời kỳ quá độ lên chủ nghĩa xã hội",
    description: "Chương trình bày các cách tiếp cận về chủ nghĩa xã hội, thời kỳ quá độ và con đường quá độ lên chủ nghĩa xã hội ở Việt Nam theo giáo trình.",
    status: "verified",
    museumZoneId: "museum-zone-03",
    lessons: getLessonsByChapterId("chapter-03"),
    sourceRefs: getChapterTextbookSourceRefs("chapter-03"),
  },
  {
    id: "chapter-04",
    number: 4,
    title: "Dân chủ xã hội chủ nghĩa và Nhà nước xã hội chủ nghĩa",
    description: "Chương trình bày khái niệm dân chủ, dân chủ xã hội chủ nghĩa, nhà nước xã hội chủ nghĩa và nhà nước pháp quyền xã hội chủ nghĩa ở Việt Nam theo giáo trình.",
    status: "verified",
    museumZoneId: "museum-zone-04",
    lessons: getLessonsByChapterId("chapter-04"),
    sourceRefs: getChapterTextbookSourceRefs("chapter-04"),
  },
  {
    id: "chapter-05",
    number: 5,
    title: "Cơ cấu xã hội – giai cấp và liên minh giai cấp, tầng lớp trong thời kỳ quá độ lên chủ nghĩa xã hội",
    description: "Chương trình bày cơ cấu xã hội – giai cấp, các quy luật biến đổi và nội dung liên minh giai cấp, tầng lớp trong thời kỳ quá độ lên chủ nghĩa xã hội, với trọng tâm vận dụng ở Việt Nam theo giáo trình.",
    status: "verified",
    museumZoneId: "museum-zone-05",
    lessons: getLessonsByChapterId("chapter-05"),
    sourceRefs: getChapterTextbookSourceRefs("chapter-05"),
  },
  {
    id: "chapter-06",
    number: 6,
    title:
      "Vấn đề dân tộc và tôn giáo trong thời kỳ quá độ lên chủ nghĩa xã hội",
    description: "Chương trình bày các khái niệm về dân tộc, tôn giáo, quan hệ dân tộc – tôn giáo và cách tiếp cận của giáo trình đối với những vấn đề này trong thời kỳ quá độ lên chủ nghĩa xã hội.",
    status: "verified",
    museumZoneId: "museum-zone-06",
    lessons: getLessonsByChapterId("chapter-06"),
    sourceRefs: getChapterTextbookSourceRefs("chapter-06"),
  },
  {
    id: "chapter-07",
    number: 7,
    title: "Vấn đề gia đình trong thời kỳ quá độ lên chủ nghĩa xã hội",
    description: "Chương trình bày khái niệm, vị trí, chức năng và những cơ sở xây dựng, phát triển gia đình Việt Nam trong thời kỳ quá độ lên chủ nghĩa xã hội theo giáo trình.",
    status: "verified",
    museumZoneId: "museum-zone-07",
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

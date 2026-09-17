import { CHAPTER_01_LESSON_CONTENT } from "./content/chapter-01";
import { CHAPTER_02_LESSON_CONTENT } from "./content/chapter-02";
import { CHAPTER_03_LESSON_CONTENT } from "./content/chapter-03";
import { CHAPTER_04_LESSON_CONTENT } from "./content/chapter-04";
import type { ChapterId, Lesson, LessonAcademicContent, LessonId } from "./types";

const PLACEHOLDER_SUMMARY = "Nội dung bài học đang được biên soạn từ giáo trình.";

const VERIFIED_LESSON_CONTENT = {
  ...CHAPTER_01_LESSON_CONTENT,
  ...CHAPTER_02_LESSON_CONTENT,
  ...CHAPTER_03_LESSON_CONTENT,
  ...CHAPTER_04_LESSON_CONTENT,
} satisfies Partial<Record<LessonId, LessonAcademicContent>>;

interface LessonStructure {
  id: LessonId;
  chapterId: ChapterId;
  order: number;
  title: string;
}

function createLesson(structure: LessonStructure): Lesson {
  const content = VERIFIED_LESSON_CONTENT[structure.id as keyof typeof VERIFIED_LESSON_CONTENT];
  return {
    ...structure,
    summary: content?.summary ?? PLACEHOLDER_SUMMARY,
    status: content?.status ?? "placeholder",
    sections: content?.sections ?? [],
    sourceRefs: content?.sourceRefs,
  };
}

export const COURSE_LESSONS: readonly Lesson[] = [
  createLesson({ id: "ch01-lesson-01", chapterId: "chapter-01", order: 1, title: "Sự ra đời của Chủ nghĩa xã hội khoa học" }),
  createLesson({ id: "ch01-lesson-02", chapterId: "chapter-01", order: 2, title: "Các giai đoạn phát triển cơ bản của Chủ nghĩa xã hội khoa học" }),
  createLesson({ id: "ch01-lesson-03", chapterId: "chapter-01", order: 3, title: "Đối tượng, phương pháp và ý nghĩa của việc nghiên cứu Chủ nghĩa xã hội khoa học" }),

  createLesson({ id: "ch02-lesson-01", chapterId: "chapter-02", order: 1, title: "Quan điểm cơ bản của chủ nghĩa Mác – Lênin về giai cấp công nhân và sứ mệnh lịch sử của giai cấp công nhân" }),
  createLesson({ id: "ch02-lesson-02", chapterId: "chapter-02", order: 2, title: "Giai cấp công nhân và việc thực hiện sứ mệnh lịch sử của giai cấp công nhân hiện nay" }),
  createLesson({ id: "ch02-lesson-03", chapterId: "chapter-02", order: 3, title: "Sứ mệnh lịch sử của giai cấp công nhân Việt Nam" }),

  createLesson({ id: "ch03-lesson-01", chapterId: "chapter-03", order: 1, title: "Chủ nghĩa xã hội" }),
  createLesson({ id: "ch03-lesson-02", chapterId: "chapter-03", order: 2, title: "Thời kỳ quá độ lên chủ nghĩa xã hội" }),
  createLesson({ id: "ch03-lesson-03", chapterId: "chapter-03", order: 3, title: "Quá độ lên chủ nghĩa xã hội ở Việt Nam" }),

  createLesson({ id: "ch04-lesson-01", chapterId: "chapter-04", order: 1, title: "Dân chủ và dân chủ xã hội chủ nghĩa" }),
  createLesson({ id: "ch04-lesson-02", chapterId: "chapter-04", order: 2, title: "Nhà nước xã hội chủ nghĩa" }),
  createLesson({ id: "ch04-lesson-03", chapterId: "chapter-04", order: 3, title: "Dân chủ xã hội chủ nghĩa và Nhà nước pháp quyền xã hội chủ nghĩa ở Việt Nam" }),

  createLesson({ id: "ch05-lesson-01", chapterId: "chapter-05", order: 1, title: "Cơ cấu xã hội – giai cấp trong thời kỳ quá độ lên chủ nghĩa xã hội" }),
  createLesson({ id: "ch05-lesson-02", chapterId: "chapter-05", order: 2, title: "Liên minh giai cấp, tầng lớp trong thời kỳ quá độ lên chủ nghĩa xã hội" }),
  createLesson({ id: "ch05-lesson-03", chapterId: "chapter-05", order: 3, title: "Cơ cấu xã hội – giai cấp và liên minh giai cấp, tầng lớp trong thời kỳ quá độ lên chủ nghĩa xã hội ở Việt Nam" }),

  createLesson({ id: "ch06-lesson-01", chapterId: "chapter-06", order: 1, title: "Dân tộc trong thời kỳ quá độ lên chủ nghĩa xã hội" }),
  createLesson({ id: "ch06-lesson-02", chapterId: "chapter-06", order: 2, title: "Tôn giáo trong thời kỳ quá độ lên chủ nghĩa xã hội" }),
  createLesson({ id: "ch06-lesson-03", chapterId: "chapter-06", order: 3, title: "Quan hệ dân tộc và tôn giáo ở Việt Nam" }),

  createLesson({ id: "ch07-lesson-01", chapterId: "chapter-07", order: 1, title: "Khái niệm, vị trí và chức năng của gia đình" }),
  createLesson({ id: "ch07-lesson-02", chapterId: "chapter-07", order: 2, title: "Cơ sở xây dựng gia đình trong thời kỳ quá độ lên chủ nghĩa xã hội" }),
  createLesson({ id: "ch07-lesson-03", chapterId: "chapter-07", order: 3, title: "Xây dựng gia đình Việt Nam trong thời kỳ quá độ lên chủ nghĩa xã hội" }),
] as const;

export function getLessonsByChapterId(chapterId: ChapterId) {
  return COURSE_LESSONS.filter((lesson) => lesson.chapterId === chapterId);
}

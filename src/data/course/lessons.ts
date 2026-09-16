import type { ChapterId, Lesson } from "./types";

const PLACEHOLDER_SUMMARY = "Nội dung bài học đang được biên soạn từ giáo trình.";

export const COURSE_LESSONS: readonly Lesson[] = [
  { id: "ch01-lesson-01", chapterId: "chapter-01", order: 1, title: "Sự ra đời của Chủ nghĩa xã hội khoa học", summary: PLACEHOLDER_SUMMARY, status: "placeholder", sections: [] },
  { id: "ch01-lesson-02", chapterId: "chapter-01", order: 2, title: "Các giai đoạn phát triển cơ bản của Chủ nghĩa xã hội khoa học", summary: PLACEHOLDER_SUMMARY, status: "placeholder", sections: [] },
  { id: "ch01-lesson-03", chapterId: "chapter-01", order: 3, title: "Đối tượng, phương pháp và ý nghĩa của việc nghiên cứu Chủ nghĩa xã hội khoa học", summary: PLACEHOLDER_SUMMARY, status: "placeholder", sections: [] },

  { id: "ch02-lesson-01", chapterId: "chapter-02", order: 1, title: "Quan điểm cơ bản của chủ nghĩa Mác – Lênin về giai cấp công nhân và sứ mệnh lịch sử của giai cấp công nhân", summary: PLACEHOLDER_SUMMARY, status: "placeholder", sections: [] },
  { id: "ch02-lesson-02", chapterId: "chapter-02", order: 2, title: "Giai cấp công nhân và việc thực hiện sứ mệnh lịch sử của giai cấp công nhân hiện nay", summary: PLACEHOLDER_SUMMARY, status: "placeholder", sections: [] },
  { id: "ch02-lesson-03", chapterId: "chapter-02", order: 3, title: "Sứ mệnh lịch sử của giai cấp công nhân Việt Nam", summary: PLACEHOLDER_SUMMARY, status: "placeholder", sections: [] },

  { id: "ch03-lesson-01", chapterId: "chapter-03", order: 1, title: "Chủ nghĩa xã hội", summary: PLACEHOLDER_SUMMARY, status: "placeholder", sections: [] },
  { id: "ch03-lesson-02", chapterId: "chapter-03", order: 2, title: "Thời kỳ quá độ lên chủ nghĩa xã hội", summary: PLACEHOLDER_SUMMARY, status: "placeholder", sections: [] },
  { id: "ch03-lesson-03", chapterId: "chapter-03", order: 3, title: "Quá độ lên chủ nghĩa xã hội ở Việt Nam", summary: PLACEHOLDER_SUMMARY, status: "placeholder", sections: [] },

  { id: "ch04-lesson-01", chapterId: "chapter-04", order: 1, title: "Dân chủ và dân chủ xã hội chủ nghĩa", summary: PLACEHOLDER_SUMMARY, status: "placeholder", sections: [] },
  { id: "ch04-lesson-02", chapterId: "chapter-04", order: 2, title: "Nhà nước xã hội chủ nghĩa", summary: PLACEHOLDER_SUMMARY, status: "placeholder", sections: [] },
  { id: "ch04-lesson-03", chapterId: "chapter-04", order: 3, title: "Dân chủ xã hội chủ nghĩa và Nhà nước pháp quyền xã hội chủ nghĩa ở Việt Nam", summary: PLACEHOLDER_SUMMARY, status: "placeholder", sections: [] },

  { id: "ch05-lesson-01", chapterId: "chapter-05", order: 1, title: "Cơ cấu xã hội – giai cấp trong thời kỳ quá độ lên chủ nghĩa xã hội", summary: PLACEHOLDER_SUMMARY, status: "placeholder", sections: [] },
  { id: "ch05-lesson-02", chapterId: "chapter-05", order: 2, title: "Liên minh giai cấp, tầng lớp trong thời kỳ quá độ lên chủ nghĩa xã hội", summary: PLACEHOLDER_SUMMARY, status: "placeholder", sections: [] },
  { id: "ch05-lesson-03", chapterId: "chapter-05", order: 3, title: "Cơ cấu xã hội – giai cấp và liên minh giai cấp, tầng lớp trong thời kỳ quá độ lên chủ nghĩa xã hội ở Việt Nam", summary: PLACEHOLDER_SUMMARY, status: "placeholder", sections: [] },

  { id: "ch06-lesson-01", chapterId: "chapter-06", order: 1, title: "Dân tộc trong thời kỳ quá độ lên chủ nghĩa xã hội", summary: PLACEHOLDER_SUMMARY, status: "placeholder", sections: [] },
  { id: "ch06-lesson-02", chapterId: "chapter-06", order: 2, title: "Tôn giáo trong thời kỳ quá độ lên chủ nghĩa xã hội", summary: PLACEHOLDER_SUMMARY, status: "placeholder", sections: [] },
  { id: "ch06-lesson-03", chapterId: "chapter-06", order: 3, title: "Quan hệ dân tộc và tôn giáo ở Việt Nam", summary: PLACEHOLDER_SUMMARY, status: "placeholder", sections: [] },

  { id: "ch07-lesson-01", chapterId: "chapter-07", order: 1, title: "Khái niệm, vị trí và chức năng của gia đình", summary: PLACEHOLDER_SUMMARY, status: "placeholder", sections: [] },
  { id: "ch07-lesson-02", chapterId: "chapter-07", order: 2, title: "Cơ sở xây dựng gia đình trong thời kỳ quá độ lên chủ nghĩa xã hội", summary: PLACEHOLDER_SUMMARY, status: "placeholder", sections: [] },
  { id: "ch07-lesson-03", chapterId: "chapter-07", order: 3, title: "Xây dựng gia đình Việt Nam trong thời kỳ quá độ lên chủ nghĩa xã hội", summary: PLACEHOLDER_SUMMARY, status: "placeholder", sections: [] },
] as const;

export function getLessonsByChapterId(chapterId: ChapterId) {
  return COURSE_LESSONS.filter((lesson) => lesson.chapterId === chapterId);
}

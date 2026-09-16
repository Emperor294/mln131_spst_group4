import { SITE_CONFIG } from "@/config/site";

export interface LearningStep {
  number: string;
  title: string;
  description: string;
}

export const HOMEPAGE_CONTENT = {
  hero: {
    eyebrow: `${SITE_CONFIG.courseCode} · CHỦ NGHĨA XÃ HỘI KHOA HỌC`,
    headline: [
      "Xã hội loài người",
      "đã đi đến đâu",
      "và đang hướng về đâu?",
    ],
    description:
      "Khám phá Chủ nghĩa Xã hội Khoa học qua hành trình trực quan, học liệu số và không gian bảo tàng 3D tương tác.",
  },
  introduction: {
    eyebrow: "Một trải nghiệm học tập khác",
    heading: ["Không chỉ đọc giáo trình.", "Hãy bước vào bên trong nó."],
    description:
      "SOCIALISM 360 kết nối bảy chủ đề của học phần với hình thức trình bày trực quan, học liệu số và một không gian bảo tàng có thể khám phá.",
  },
  chapters: {
    eyebrow: "Hành trình học tập",
    heading: "Bảy chương. Một mạch khám phá.",
    description:
      "Mỗi chương là một điểm dừng trong cấu trúc học phần MLN131. Nội dung chi tiết sẽ được bổ sung sau khi hoàn tất đối chiếu giáo trình.",
  },
  museum: {
    eyebrow: "Không gian tương tác",
    heading: "Bước vào không gian học tập.",
    description:
      "Di chuyển, quan sát và tương tác với các hiện vật trong bảo tàng số.",
  },
  resources: {
    eyebrow: "Học liệu số",
    heading: "Tiếp tục hành trình qua hình ảnh và video.",
    description:
      "Khám phá khu vực học liệu đang được rà soát và tổ chức lại cho cấu trúc MLN131.",
  },
  finalCta: {
    eyebrow: SITE_CONFIG.brand,
    heading: "Bạn đã sẵn sàng bước vào hành trình?",
  },
} as const;

export const LEARNING_STEPS = [
  {
    number: "01",
    title: "Khám phá",
    description: "Tiếp cận bảy chủ đề qua một hành trình trực quan, có định hướng.",
  },
  {
    number: "02",
    title: "Tương tác",
    description: "Quan sát và mở các lớp thông tin trong không gian bảo tàng số.",
  },
  {
    number: "03",
    title: "Hiểu",
    description: "Kết nối nội dung học tập với hình ảnh và trải nghiệm không gian.",
  },
] as const satisfies readonly LearningStep[];

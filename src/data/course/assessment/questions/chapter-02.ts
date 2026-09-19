import type { QuizQuestion } from "../types";
import { reference, singleChoiceQuestion } from "./factory";

export const CHAPTER_02_QUESTIONS: readonly QuizQuestion[] = [
  singleChoiceQuestion({
    id: "q-ch02-01", quizId: "quiz-ch02", chapterId: "chapter-02", lessonId: "ch02-lesson-01",
    prompt: "Theo giáo trình, đặc điểm nào thuộc phương diện kinh tế – xã hội của giai cấp công nhân?",
    options: [
      { id: "a", label: "Là chủ thể của sản xuất công nghiệp hiện đại, có tính xã hội hóa ngày càng cao" },
      { id: "b", label: "Là một cộng đồng chỉ được xác định bởi nơi cư trú" },
      { id: "c", label: "Là tầng lớp không liên quan đến phương thức sản xuất" },
      { id: "d", label: "Là nhóm chỉ hoạt động trong lĩnh vực văn hóa" },
    ],
    correctOptionId: "a",
    explanation: "Phương diện kinh tế – xã hội gắn giai cấp công nhân với nền công nghiệp hiện đại, phương thức lao động công nghiệp và quá trình sản xuất ngày càng xã hội hóa.",
    sourceRefs: [reference("ref-ch02-l01-worker-concept", 52, 55, 49, 52)],
  }),
  singleChoiceQuestion({
    id: "q-ch02-02", quizId: "quiz-ch02", chapterId: "chapter-02", lessonId: "ch02-lesson-01",
    prompt: "Ba nội dung của sứ mệnh lịch sử của giai cấp công nhân được giáo trình trình bày theo những phương diện nào?",
    options: [
      { id: "a", label: "Kinh tế; chính trị – xã hội; văn hóa, tư tưởng" },
      { id: "b", label: "Quân sự; thương mại; giải trí" },
      { id: "c", label: "Dân số; lãnh thổ; ngôn ngữ" },
      { id: "d", label: "Tâm lý; khí hậu; kỹ thuật" },
    ],
    correctOptionId: "a",
    explanation: "Giáo trình chia nội dung sứ mệnh lịch sử thành phương diện kinh tế, chính trị – xã hội và văn hóa, tư tưởng; ba phương diện có quan hệ thống nhất.",
    sourceRefs: [reference("ref-ch02-l01-mission-domains", 56, 59, 53, 56)],
  }),
  singleChoiceQuestion({
    id: "q-ch02-03", quizId: "quiz-ch02", chapterId: "chapter-02", lessonId: "ch02-lesson-01",
    prompt: "Đâu là một điều kiện khách quan của sứ mệnh lịch sử của giai cấp công nhân theo giáo trình?",
    options: [
      { id: "a", label: "Chỉ dựa vào lựa chọn cá nhân của từng người lao động" },
      { id: "b", label: "Tách giai cấp công nhân khỏi quá trình sản xuất hiện đại" },
      { id: "c", label: "Loại bỏ vai trò của tổ chức và kỷ luật trong sản xuất" },
      { id: "d", label: "Địa vị kinh tế và chính trị – xã hội do nền đại công nghiệp tạo ra" },
    ],
    correctOptionId: "d",
    explanation: "Điều kiện khách quan bắt nguồn từ địa vị kinh tế của công nhân trong nền đại công nghiệp và địa vị chính trị – xã hội, lợi ích, tính tổ chức của họ trong quan hệ sản xuất.",
    sourceRefs: [reference("ref-ch02-l01-objective-conditions", 60, 62, 57, 59)],
  }),
  singleChoiceQuestion({
    id: "q-ch02-04", quizId: "quiz-ch02", chapterId: "chapter-02", lessonId: "ch02-lesson-02",
    prompt: "Theo phần trình bày của giáo trình về giai cấp công nhân đương đại, nhận định nào phản ánh đúng sự kết hợp giữa điểm ổn định và biến đổi?",
    options: [
      { id: "a", label: "Giai cấp công nhân không còn liên quan đến sản xuất công nghiệp" },
      { id: "b", label: "Vai trò trong sản xuất công nghiệp tiếp tục tồn tại, đồng thời cơ cấu nghề nghiệp và yêu cầu tri thức biến đổi" },
      { id: "c", label: "Mọi khác biệt về nghề nghiệp và trình độ đều đã mất đi" },
      { id: "d", label: "Biến đổi công nghệ làm mất hoàn toàn phương thức lao động công nghiệp" },
    ],
    correctOptionId: "b",
    explanation: "Giáo trình vừa ghi nhận vai trò của lao động công nghiệp, vừa trình bày những biến đổi về cơ cấu nghề nghiệp, tri thức, kỹ năng và đào tạo lại trong bối cảnh mới.",
    sourceRefs: [
      reference("ref-ch02-l02-stable-characteristics", 65, 66, 62, 63),
      reference("ref-ch02-l02-contemporary-changes", 67, 69, 64, 66),
    ],
  }),
  singleChoiceQuestion({
    id: "q-ch02-05", quizId: "quiz-ch02", chapterId: "chapter-02", lessonId: "ch02-lesson-03",
    prompt: "Đặc điểm hình thành nào của giai cấp công nhân Việt Nam được giáo trình nhấn mạnh?",
    options: [
      { id: "a", label: "Chỉ hình thành sau khi mọi ngành dịch vụ phát triển" },
      { id: "b", label: "Không có quan hệ lịch sử với nông dân và các tầng lớp lao động" },
      { id: "c", label: "Ra đời trong xã hội thuộc địa, nửa phong kiến và sớm gắn với đấu tranh giải phóng dân tộc" },
      { id: "d", label: "Hình thành tách rời hoàn toàn khỏi lịch sử thuộc địa" },
    ],
    correctOptionId: "c",
    explanation: "Giáo trình đặt sự hình thành của giai cấp công nhân Việt Nam trong điều kiện thuộc địa, nửa phong kiến, gắn với khai thác thuộc địa và đấu tranh giải phóng dân tộc.",
    sourceRefs: [reference("ref-ch02-l03-vietnam-characteristics", 72, 76, 69, 73)],
  }),
  singleChoiceQuestion({
    id: "q-ch02-06", quizId: "quiz-ch02", chapterId: "chapter-02", lessonId: "ch02-lesson-01",
    prompt: "Trong các phương án sau, đâu là nhân tố chủ quan quan trọng được giáo trình nêu để tổ chức và lãnh đạo giai cấp công nhân thực hiện sứ mệnh lịch sử?",
    options: [
      { id: "a", label: "Sự phát triển tự phát của thị trường" },
      { id: "b", label: "Vai trò của Đảng Cộng sản với tư cách đội tiên phong" },
      { id: "c", label: "Việc loại bỏ liên minh với các tầng lớp lao động" },
      { id: "d", label: "Sự thay đổi khí hậu toàn cầu" },
    ],
    correctOptionId: "b",
    explanation: "Giáo trình xác định Đảng Cộng sản là đội tiên phong và nhân tố chủ quan quan trọng để tổ chức, lãnh đạo giai cấp công nhân thực hiện sứ mệnh lịch sử.",
    sourceRefs: [reference("ref-ch02-l01-subjective-conditions", 62, 64, 59, 61)],
  }),
  singleChoiceQuestion({
    id: "q-ch02-07", quizId: "quiz-ch02", chapterId: "chapter-02", lessonId: "ch02-lesson-02",
    prompt: "Trong phần trình bày của giáo trình về việc thực hiện sứ mệnh lịch sử, phương diện văn hóa, tư tưởng được gắn với nội dung nào?",
    options: [
      { id: "a", label: "Chỉ mở rộng sản xuất mà không quan tâm đến hệ giá trị xã hội" },
      { id: "b", label: "Tách văn hóa khỏi hoạt động lao động và sáng tạo" },
      { id: "c", label: "Bảo vệ nền tảng tư tưởng, củng cố niềm tin khoa học và theo đuổi các giá trị lao động, công bằng, dân chủ" },
      { id: "d", label: "Loại bỏ mọi yêu cầu về giáo dục và đào tạo lại" },
    ],
    correctOptionId: "c",
    explanation: "Giáo trình gắn phương diện văn hóa, tư tưởng với bảo vệ nền tảng tư tưởng, củng cố niềm tin khoa học và theo đuổi các giá trị lao động, sáng tạo, công bằng, dân chủ, bình đẳng, tự do.",
    sourceRefs: [reference("ref-ch02-l02-current-mission-domains", 69, 71, 66, 68)],
  }),
  singleChoiceQuestion({
    id: "q-ch02-08", quizId: "quiz-ch02", chapterId: "chapter-02", lessonId: "ch02-lesson-03",
    prompt: "Nội dung kinh tế của sứ mệnh lịch sử ở Việt Nam được giáo trình gắn trực tiếp với yêu cầu nào?",
    options: [
      { id: "a", label: "Thu hẹp đào tạo nghề và giảm ứng dụng khoa học – công nghệ" },
      { id: "b", label: "Tách công nghiệp hóa khỏi phát triển lực lượng sản xuất" },
      { id: "c", label: "Chỉ bảo tồn cơ cấu nghề nghiệp cũ" },
      { id: "d", label: "Đi đầu trong công nghiệp hóa, hiện đại hóa và phát triển lực lượng sản xuất trên nền tảng khoa học – công nghệ" },
    ],
    correctOptionId: "d",
    explanation: "Giáo trình trình bày nội dung kinh tế ở Việt Nam là đi đầu trong công nghiệp hóa, hiện đại hóa, phát triển lực lượng sản xuất và nâng cao năng suất trên nền tảng khoa học – công nghệ.",
    sourceRefs: [reference("ref-ch02-l03-vietnam-mission-domains", 76, 80, 73, 77)],
  }),
];

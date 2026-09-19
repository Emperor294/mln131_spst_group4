import type { QuizQuestion } from "../types";
import { reference, singleChoiceQuestion } from "./factory";

export const CHAPTER_01_QUESTIONS: readonly QuizQuestion[] = [
  singleChoiceQuestion({
    id: "q-ch01-01", quizId: "quiz-ch01", chapterId: "chapter-01", lessonId: "ch01-lesson-01",
    prompt: "Trong phạm vi môn học, Chủ nghĩa xã hội khoa học được xác định như thế nào trong cấu trúc chủ nghĩa Mác – Lênin?",
    options: [
      { id: "a", label: "Một phương pháp nghiên cứu riêng của kinh tế học" },
      { id: "b", label: "Một trong ba bộ phận hợp thành chủ nghĩa Mác – Lênin" },
      { id: "c", label: "Một mô hình quản trị không gắn với lý luận xã hội" },
      { id: "d", label: "Một bộ phận thay thế cho triết học Mác – Lênin" },
    ],
    correctOptionId: "b",
    explanation: "Giáo trình trình bày Chủ nghĩa xã hội khoa học theo nghĩa hẹp là một trong ba bộ phận hợp thành chủ nghĩa Mác – Lênin, cùng với triết học và kinh tế chính trị học.",
    sourceRefs: [reference("ref-ch01-l01-concept", 11, 12, 8, 9)],
  }),
  singleChoiceQuestion({
    id: "q-ch01-02", quizId: "quiz-ch01", chapterId: "chapter-01", lessonId: "ch01-lesson-01",
    prompt: "Bộ ba nào được giáo trình nêu là những phát minh tạo tiền đề khoa học tự nhiên cho sự hình thành thế giới quan và phương pháp luận mới?",
    options: [
      { id: "a", label: "Cơ học lượng tử, điện toán đám mây và di truyền học" },
      { id: "b", label: "Học thuyết địa tâm, luyện kim và cơ học cổ điển" },
      { id: "c", label: "Học thuyết tế bào, kinh tế chính trị học và xã hội học" },
      { id: "d", label: "Học thuyết tiến hóa, định luật bảo toàn và chuyển hóa năng lượng, học thuyết tế bào" },
    ],
    correctOptionId: "d",
    explanation: "Ba tiền đề khoa học tự nhiên được giáo trình nêu là học thuyết tiến hóa, định luật bảo toàn và chuyển hóa năng lượng, cùng học thuyết tế bào.",
    sourceRefs: [reference("ref-ch01-l01-natural-science", 14, 15, 11, 12)],
  }),
  singleChoiceQuestion({
    id: "q-ch01-03", quizId: "quiz-ch01", chapterId: "chapter-01", lessonId: "ch01-lesson-01",
    prompt: "Theo giáo trình, yếu tố nào là điều kiện quyết định để các tiền đề kinh tế – xã hội, khoa học và tư tưởng được phát triển thành học thuyết khoa học và cách mạng?",
    options: [
      { id: "a", label: "Hoạt động lý luận và thực tiễn của C. Mác và Ph. Ăngghen" },
      { id: "b", label: "Sự mở rộng của thị trường hàng hóa thế giới" },
      { id: "c", label: "Việc thay thế mọi nghiên cứu lịch sử bằng suy đoán" },
      { id: "d", label: "Việc tách lý luận khỏi phong trào công nhân" },
    ],
    correctOptionId: "a",
    explanation: "Giáo trình phân biệt các tiền đề là điều kiện cần với hoạt động lý luận và thực tiễn của C. Mác, Ph. Ăngghen là điều kiện quyết định cho sự hình thành học thuyết.",
    sourceRefs: [reference("ref-ch01-l01-marx-engels-role", 17, 19, 14, 16)],
  }),
  singleChoiceQuestion({
    id: "q-ch01-04", quizId: "quiz-ch01", chapterId: "chapter-01", lessonId: "ch01-lesson-02",
    prompt: "Trong giai đoạn trước Cách mạng Tháng Mười Nga, giáo trình nhấn mạnh V.I. Lênin đã phát triển lý luận nào sau đây?",
    options: [
      { id: "a", label: "Lý luận phủ nhận vai trò của chính đảng cách mạng" },
      { id: "b", label: "Lý luận tách vấn đề dân tộc khỏi cách mạng xã hội chủ nghĩa" },
      { id: "c", label: "Lý luận về đảng cách mạng kiểu mới và khả năng thắng lợi ở khâu yếu" },
      { id: "d", label: "Lý luận coi thời kỳ quá độ là không cần thiết" },
    ],
    correctOptionId: "c",
    explanation: "Phần về V.I. Lênin trước Cách mạng Tháng Mười nêu việc bảo vệ và phát triển các nguyên lý, trong đó có đảng cách mạng kiểu mới, cách mạng xã hội chủ nghĩa và khả năng thắng lợi ở khâu yếu.",
    sourceRefs: [reference("ref-ch01-l02-lenin-before-october", 25, 28, 22, 25)],
  }),
  singleChoiceQuestion({
    id: "q-ch01-05", quizId: "quiz-ch01", chapterId: "chapter-01", lessonId: "ch01-lesson-03",
    prompt: "Đối tượng nghiên cứu trực tiếp của Chủ nghĩa xã hội khoa học là nội dung nào?",
    options: [
      { id: "a", label: "Chỉ là lịch sử tư tưởng triết học cổ đại" },
      { id: "b", label: "Các quy luật, nguyên tắc, điều kiện và con đường của quá trình chuyển biến lên chủ nghĩa xã hội và chủ nghĩa cộng sản" },
      { id: "c", label: "Chỉ là kỹ thuật quản lý doanh nghiệp hiện đại" },
      { id: "d", label: "Chỉ là các hiện tượng tự nhiên không có quan hệ xã hội" },
    ],
    correctOptionId: "b",
    explanation: "Giáo trình xác định đối tượng là những quy luật và tính quy luật chính trị – xã hội của quá trình hình thành, phát triển hình thái kinh tế – xã hội cộng sản chủ nghĩa, cùng các điều kiện và phương pháp hiện thực hóa quá trình đó.",
    sourceRefs: [reference("ref-ch01-l03-research-object", 39, 42, 36, 39)],
  }),
  singleChoiceQuestion({
    id: "q-ch01-06", quizId: "quiz-ch01", chapterId: "chapter-01", lessonId: "ch01-lesson-03",
    prompt: "Phương pháp kết hợp lịch sử và lôgíc được sử dụng để làm gì trong nghiên cứu Chủ nghĩa xã hội khoa học?",
    options: [
      { id: "a", label: "Chỉ liệt kê sự kiện mà không khái quát quan hệ" },
      { id: "b", label: "Tách sự kiện khỏi điều kiện kinh tế – xã hội" },
      { id: "c", label: "Thay thế tư liệu lịch sử bằng một mô hình duy nhất" },
      { id: "d", label: "Xuất phát từ tư liệu lịch sử để khái quát cấu trúc, quan hệ và tính quy luật" },
    ],
    correctOptionId: "d",
    explanation: "Theo giáo trình, kết hợp lịch sử và lôgíc không dừng ở việc liệt kê sự kiện mà dùng sự kiện, tư liệu để khái quát cấu trúc, quan hệ và tính quy luật.",
    sourceRefs: [reference("ref-ch01-l03-methods", 43, 45, 40, 42)],
  }),
  singleChoiceQuestion({
    id: "q-ch01-07", quizId: "quiz-ch01", chapterId: "chapter-01", lessonId: "ch01-lesson-02",
    prompt: "Trong chặng phát triển từ 1848 đến 1871, giáo trình nêu hoạt động nào góp phần phát triển Chủ nghĩa xã hội khoa học?",
    options: [
      { id: "a", label: "Tổng kết cách mạng châu Âu, sự ra đời của Quốc tế I và bộ Tư bản" },
      { id: "b", label: "Tách lý luận khỏi mọi kinh nghiệm lịch sử" },
      { id: "c", label: "Chỉ nghiên cứu tự nhiên mà không nghiên cứu nhà nước" },
      { id: "d", label: "Loại bỏ vấn đề liên minh công nhân – nông dân khỏi lý luận" },
    ],
    correctOptionId: "a",
    explanation: "Trong chặng 1848–1871, giáo trình nêu việc tổng kết cách mạng châu Âu, sự ra đời của Quốc tế I và bộ Tư bản như những hoạt động góp phần phát triển lý luận.",
    sourceRefs: [reference("ref-ch01-l02-marx-engels", 22, 25, 19, 22)],
  }),
  singleChoiceQuestion({
    id: "q-ch01-08", quizId: "quiz-ch01", chapterId: "chapter-01",
    prompt: "Cặp nào phản ánh đúng hai ý nghĩa được giáo trình phân biệt khi nghiên cứu Chủ nghĩa xã hội khoa học?",
    options: [
      { id: "a", label: "Chỉ ghi nhớ thuật ngữ và loại bỏ hoạt động thực tiễn" },
      { id: "b", label: "Chỉ mô tả lịch sử và không cần phương pháp luận" },
      { id: "c", label: "Hình thành nhận thức, phương pháp luận khoa học và hỗ trợ phân tích, định hướng hoạt động thực tiễn" },
      { id: "d", label: "Thay thế mọi ngành khoa học xã hội bằng một môn học" },
    ],
    correctOptionId: "c",
    explanation: "Giáo trình trình bày ý nghĩa lý luận là hình thành nhận thức và phương pháp luận khoa học; ý nghĩa thực tiễn là hỗ trợ phân tích thực tiễn và gắn nhận thức với hoạt động tự giác, sáng tạo.",
    sourceRefs: [
      reference("ref-ch01-l03-theoretical-meaning", 46, 47, 43, 44),
      reference("ref-ch01-l03-practical-meaning", 47, 48, 44, 45),
    ],
  }),
];

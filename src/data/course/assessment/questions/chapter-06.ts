import type { QuizQuestion } from "../types";
import { reference, singleChoiceQuestion } from "./factory";

export const CHAPTER_06_QUESTIONS: readonly QuizQuestion[] = [
  singleChoiceQuestion({
    id: "q-ch06-01", quizId: "quiz-ch06", chapterId: "chapter-06", lessonId: "ch06-lesson-01",
    prompt: "Dân tộc theo nghĩa rộng được giáo trình hiểu là gì?",
    options: [
      { id: "a", label: "Một cộng đồng tộc người chỉ được xác định bởi huyết thống" },
      { id: "b", label: "Một nhóm tôn giáo không có lãnh thổ và đời sống kinh tế chung" },
      { id: "c", label: "Một cộng đồng người ổn định làm thành nhân dân một nước, có lãnh thổ, kinh tế, ngôn ngữ và ý thức thống nhất" },
      { id: "d", label: "Một tổ chức chính trị tách khỏi lịch sử và văn hóa" },
    ],
    correctOptionId: "c",
    explanation: "Theo nghĩa rộng, dân tộc là cộng đồng người ổn định làm thành nhân dân một nước, gắn với lãnh thổ, nền kinh tế, ngôn ngữ, ý thức thống nhất và các lợi ích lịch sử – văn hóa.",
    sourceRefs: [reference("ref-ch06-l01-concepts", 196, 199, 193, 196)],
  }),
  singleChoiceQuestion({
    id: "q-ch06-02", quizId: "quiz-ch06", chapterId: "chapter-06", lessonId: "ch06-lesson-01",
    prompt: "Đặc điểm nào giúp phân biệt dân tộc theo nghĩa hẹp với quốc gia – dân tộc?",
    options: [
      { id: "a", label: "Ý thức tự giác tộc người, cùng ngôn ngữ và văn hóa trong một cộng đồng hình thành lịch sử" },
      { id: "b", label: "Một nhà nước độc lập là điều kiện duy nhất và đầy đủ" },
      { id: "c", label: "Một nền kinh tế quốc gia thống nhất là đặc trưng duy nhất" },
      { id: "d", label: "Việc đồng nhất mọi tộc người với một tôn giáo" },
    ],
    correctOptionId: "a",
    explanation: "Theo nghĩa hẹp, dân tộc là cộng đồng tộc người có quan hệ gắn bó bền vững, ý thức tự giác tộc người, ngôn ngữ và văn hóa; cộng đồng này là bộ phận của quốc gia – dân tộc.",
    sourceRefs: [reference("ref-ch06-l01-concepts", 196, 199, 193, 196)],
  }),
  singleChoiceQuestion({
    id: "q-ch06-03", quizId: "quiz-ch06", chapterId: "chapter-06", lessonId: "ch06-lesson-01",
    prompt: "Hai xu hướng khách quan của quan hệ dân tộc được giáo trình trình bày như thế nào?",
    options: [
      { id: "a", label: "Chỉ có xu hướng tách ra, không có liên hệ với hợp tác" },
      { id: "b", label: "Tách ra để hình thành cộng đồng độc lập và liên hiệp, xích lại gần nhau" },
      { id: "c", label: "Một xu hướng thuộc kinh tế, một xu hướng thuộc tự nhiên" },
      { id: "d", label: "Hai xu hướng loại trừ tuyệt đối nhau trong mọi hoàn cảnh" },
    ],
    correctOptionId: "b",
    explanation: "Giáo trình nêu xu hướng các cộng đồng khẳng định quyền sống, hình thành cộng đồng độc lập và xu hướng các dân tộc liên hiệp, xích lại gần nhau; hai xu hướng tác động qua lại.",
    sourceRefs: [reference("ref-ch06-l01-trends", 201, 203, 198, 200)],
  }),
  singleChoiceQuestion({
    id: "q-ch06-04", quizId: "quiz-ch06", chapterId: "chapter-06", lessonId: "ch06-lesson-01",
    prompt: "Nội dung nào thuộc Cương lĩnh dân tộc của chủ nghĩa Mác – Lênin theo giáo trình?",
    options: [
      { id: "a", label: "Các dân tộc hoàn toàn bình đẳng" },
      { id: "b", label: "Một dân tộc được giữ đặc quyền đối với dân tộc khác" },
      { id: "c", label: "Tách giải phóng dân tộc khỏi giải phóng giai cấp" },
      { id: "d", label: "Phủ nhận quyền tự quyết của các dân tộc" },
    ],
    correctOptionId: "a",
    explanation: "Cương lĩnh được giáo trình khái quát gồm bình đẳng giữa các dân tộc, quyền tự quyết và liên hiệp công nhân tất cả các dân tộc; bình đẳng là một trong ba nội dung đó.",
    sourceRefs: [reference("ref-ch06-l01-programme", 203, 205, 200, 202)],
  }),
  singleChoiceQuestion({
    id: "q-ch06-05", quizId: "quiz-ch06", chapterId: "chapter-06", lessonId: "ch06-lesson-02",
    prompt: "Theo cách tiếp cận của giáo trình, tôn giáo được trình bày như thế nào?",
    options: [
      { id: "a", label: "Một hiện tượng chỉ thuộc đời sống cá nhân và không có mặt xã hội" },
      { id: "b", label: "Một hình thái ý thức xã hội và hiện tượng xã hội – văn hóa do con người sáng tạo ra" },
      { id: "c", label: "Một hiện tượng đồng nhất với mọi tín ngưỡng và mê tín" },
      { id: "d", label: "Một hệ thống không biến đổi theo điều kiện lịch sử" },
    ],
    correctOptionId: "b",
    explanation: "Giáo trình mô tả tôn giáo là hình thái ý thức xã hội phản ánh hư ảo hiện thực thông qua các lực lượng siêu nhiên, đồng thời là một hiện tượng xã hội – văn hóa.",
    sourceRefs: [reference("ref-ch06-l02-religion-concept", 214, 216, 211, 213)],
  }),
  singleChoiceQuestion({
    id: "q-ch06-06", quizId: "quiz-ch06", chapterId: "chapter-06", lessonId: "ch06-lesson-02",
    prompt: "Bộ ba nào là các nguồn gốc của tôn giáo được giáo trình phân loại?",
    options: [
      { id: "a", label: "Nguồn gốc tự nhiên, kinh tế – xã hội; nhận thức; tâm lý" },
      { id: "b", label: "Nguồn gốc lãnh thổ, khí hậu; ngôn ngữ" },
      { id: "c", label: "Nguồn gốc pháp lý; kỹ thuật; thể thao" },
      { id: "d", label: "Nguồn gốc di truyền; địa chất; quân sự" },
    ],
    correctOptionId: "a",
    explanation: "Giáo trình tách ba nhóm nguồn gốc: những điều kiện tự nhiên, kinh tế – xã hội; giới hạn và sự tuyệt đối hóa nhận thức; cùng các trạng thái, nhu cầu tâm lý.",
    sourceRefs: [reference("ref-ch06-l02-religion-origins", 216, 217, 213, 214)],
  }),
  singleChoiceQuestion({
    id: "q-ch06-07", quizId: "quiz-ch06", chapterId: "chapter-06", lessonId: "ch06-lesson-03",
    prompt: "Phân biệt nào phù hợp với nội dung giáo trình về tôn giáo, tín ngưỡng và mê tín?",
    options: [
      { id: "a", label: "Tín ngưỡng và tôn giáo luôn là một khái niệm hoàn toàn đồng nhất" },
      { id: "b", label: "Mê tín là một phương pháp khoa học để giải thích mọi hiện tượng" },
      { id: "c", label: "Tín ngưỡng là hệ thống niềm tin và cách thể hiện niềm tin; mê tín là niềm tin mê muội, viển vông" },
      { id: "d", label: "Tôn giáo không bao giờ có hình thức tổ chức hoặc đời sống cộng đồng" },
    ],
    correctOptionId: "c",
    explanation: "Giáo trình phân biệt tín ngưỡng như nhu cầu và hình thức thể hiện niềm tin của con người với mê tín – niềm tin mê muội, viển vông và có thể dẫn đến hành vi dị đoan.",
    sourceRefs: [
      reference("ref-ch06-l02-religion-concept", 214, 216, 211, 213),
      reference("ref-ch06-l03-relationship", 228, 230, 225, 227),
    ],
  }),
  singleChoiceQuestion({
    id: "q-ch06-08", quizId: "quiz-ch06", chapterId: "chapter-06", lessonId: "ch06-lesson-03",
    prompt: "Khi xem xét quan hệ dân tộc và tôn giáo ở Việt Nam, giáo trình nhấn mạnh cách tiếp cận nào?",
    options: [
      { id: "a", label: "Đồng nhất dân tộc với tôn giáo trong mọi trường hợp" },
      { id: "b", label: "Bỏ qua truyền thống tín ngưỡng và các khác biệt giữa cộng đồng" },
      { id: "c", label: "Chỉ xét một hiện tượng riêng lẻ mà không đặt trong cộng đồng quốc gia – dân tộc" },
      { id: "d", label: "Nhận diện sự tác động qua lại, tôn trọng khác biệt và đặt quan hệ trong cộng đồng quốc gia – dân tộc thống nhất" },
    ],
    correctOptionId: "d",
    explanation: "Giáo trình mô tả quan hệ dân tộc – tôn giáo là sự liên kết và tác động qua lại; cách tiếp cận phải tôn trọng khác biệt, không đồng nhất hai khái niệm và đặt trong cộng đồng quốc gia – dân tộc thống nhất.",
    sourceRefs: [reference("ref-ch06-l03-relationship", 228, 230, 225, 227)],
  }),
];

import type { QuizQuestion } from "../types";
import { reference, singleChoiceQuestion } from "./factory";

export const CHAPTER_03_QUESTIONS: readonly QuizQuestion[] = [
  singleChoiceQuestion({
    id: "q-ch03-01", quizId: "quiz-ch03", chapterId: "chapter-03", lessonId: "ch03-lesson-01",
    prompt: "Theo giáo trình, điều kiện kinh tế chủ yếu làm xuất hiện chủ nghĩa xã hội là gì?",
    options: [
      { id: "a", label: "Lực lượng sản xuất phát triển mâu thuẫn với quan hệ sản xuất tư bản chủ nghĩa" },
      { id: "b", label: "Sự biến mất của mọi hình thức phân công lao động" },
      { id: "c", label: "Việc tách sản xuất khỏi đời sống xã hội" },
      { id: "d", label: "Sự tồn tại của một nền kinh tế không có quan hệ sở hữu" },
    ],
    correctOptionId: "a",
    explanation: "Giáo trình gắn điều kiện kinh tế của sự ra đời chủ nghĩa xã hội với sự phát triển của lực lượng sản xuất và mâu thuẫn của nó với quan hệ sản xuất tư bản chủ nghĩa.",
    sourceRefs: [reference("ref-ch03-l01-conditions-economic", 90, 90, 87, 87)],
  }),
  singleChoiceQuestion({
    id: "q-ch03-02", quizId: "quiz-ch03", chapterId: "chapter-03", lessonId: "ch03-lesson-02",
    prompt: "Điểm phân biệt cơ bản giữa quá độ trực tiếp và quá độ gián tiếp theo giáo trình là gì?",
    options: [
      { id: "a", label: "Quá độ trực tiếp không có bất kỳ nhiệm vụ kinh tế nào" },
      { id: "b", label: "Quá độ gián tiếp chỉ diễn ra trong lĩnh vực văn hóa" },
      { id: "c", label: "Hai hình thức hoàn toàn giống nhau về điểm xuất phát" },
      { id: "d", label: "Quá độ trực tiếp xuất phát từ nước tư bản phát triển cao, còn quá độ gián tiếp xuất phát từ nước chưa phát triển đầy đủ chủ nghĩa tư bản" },
    ],
    correctOptionId: "d",
    explanation: "Bảng so sánh của giáo trình phân biệt điểm xuất phát: quá độ trực tiếp từ những nước tư bản phát triển cao, còn quá độ gián tiếp từ những nước chưa trải qua hoặc chưa phát triển đầy đủ chủ nghĩa tư bản.",
    sourceRefs: [reference("ref-ch03-l02-necessity", 104, 106, 101, 103)],
  }),
  singleChoiceQuestion({
    id: "q-ch03-03", quizId: "quiz-ch03", chapterId: "chapter-03", lessonId: "ch03-lesson-02",
    prompt: "Đặc điểm kinh tế nào được giáo trình nêu về thời kỳ quá độ lên chủ nghĩa xã hội?",
    options: [
      { id: "a", label: "Chỉ còn một thành phần kinh tế duy nhất ngay từ đầu" },
      { id: "b", label: "Tất yếu tồn tại nền kinh tế nhiều thành phần, trong đó có thể có những thành phần đối lập" },
      { id: "c", label: "Kinh tế không còn liên hệ với quan hệ xã hội" },
      { id: "d", label: "Mọi quan hệ sản xuất cũ tự động mất đi trong một thời điểm" },
    ],
    correctOptionId: "b",
    explanation: "Giáo trình trình bày sự tồn tại của nền kinh tế nhiều thành phần là một đặc điểm của thời kỳ quá độ, phản ánh sự đan xen giữa các yếu tố cũ và mới.",
    sourceRefs: [reference("ref-ch03-l02-economic", 107, 107, 104, 104)],
  }),
  singleChoiceQuestion({
    id: "q-ch03-04", quizId: "quiz-ch03", chapterId: "chapter-03", lessonId: "ch03-lesson-02",
    prompt: "Vì sao thời kỳ quá độ được giáo trình xem là một yêu cầu khách quan của quá trình chuyển biến lên chủ nghĩa xã hội?",
    options: [
      { id: "a", label: "Vì xã hội mới có thể hình thành mà không cần tổ chức quyền lực" },
      { id: "b", label: "Vì mọi nước đều có cùng một điểm xuất phát lịch sử" },
      { id: "c", label: "Vì cần một giai đoạn để giành, sử dụng quyền lực và tổ chức xây dựng xã hội mới" },
      { id: "d", label: "Vì thời kỳ quá độ chỉ là một thuật ngữ không có nhiệm vụ thực tiễn" },
    ],
    correctOptionId: "c",
    explanation: "Giáo trình đặt thời kỳ quá độ trong quá trình giai cấp công nhân và nhân dân lao động giành, sử dụng quyền lực nhà nước và tổ chức cải biến, xây dựng xã hội mới.",
    sourceRefs: [reference("ref-ch03-l02-necessity", 104, 106, 101, 103)],
  }),
  singleChoiceQuestion({
    id: "q-ch03-05", quizId: "quiz-ch03", chapterId: "chapter-03", lessonId: "ch03-lesson-03",
    prompt: "Cách hiểu nào đúng với nội dung giáo trình về “bỏ qua chế độ tư bản chủ nghĩa” ở Việt Nam?",
    options: [
      { id: "a", label: "Không xác lập sự thống trị của quan hệ sản xuất và kiến trúc thượng tầng tư bản chủ nghĩa, đồng thời tiếp thu thành tựu cần thiết của nhân loại" },
      { id: "b", label: "Phủ nhận mọi thành tựu khoa học – công nghệ đạt được dưới chủ nghĩa tư bản" },
      { id: "c", label: "Bỏ qua mọi quan hệ kinh tế và văn hóa đã từng tồn tại" },
      { id: "d", label: "Hoàn thành toàn bộ quá trình chuyển biến trong một bước ngắn" },
    ],
    correctOptionId: "a",
    explanation: "Giáo trình nhấn mạnh “bỏ qua” là không để quan hệ sản xuất và kiến trúc thượng tầng tư bản chủ nghĩa giữ vị trí thống trị; điều đó không đồng nghĩa với phủ nhận hoặc không tiếp thu thành tựu của nhân loại.",
    sourceRefs: [reference("ref-ch03-l03-bypassing-meaning", 110, 112, 107, 109)],
  }),
  singleChoiceQuestion({
    id: "q-ch03-06", quizId: "quiz-ch03", chapterId: "chapter-03", lessonId: "ch03-lesson-03",
    prompt: "Đặc điểm xuất phát nào của Việt Nam được giáo trình đặt trong bối cảnh con đường quá độ lên chủ nghĩa xã hội?",
    options: [
      { id: "a", label: "Đã hoàn thành đầy đủ nền đại công nghiệp trước khi quá độ" },
      { id: "b", label: "Không còn tàn dư lịch sử và không chịu tác động của thời đại" },
      { id: "c", label: "Có lực lượng sản xuất rất cao và không có nhiệm vụ tạo dựng tiền đề" },
      { id: "d", label: "Đi lên từ xã hội thuộc địa, nửa phong kiến, lực lượng sản xuất thấp và trải qua chiến tranh kéo dài" },
    ],
    correctOptionId: "d",
    explanation: "Giáo trình mô tả điểm xuất phát của Việt Nam là xã hội thuộc địa, nửa phong kiến, lực lượng sản xuất thấp, trải qua chiến tranh và còn nhiều tàn dư lịch sử.",
    sourceRefs: [reference("ref-ch03-l03-vietnam-context", 109, 110, 106, 107)],
  }),
  singleChoiceQuestion({
    id: "q-ch03-07", quizId: "quiz-ch03", chapterId: "chapter-03", lessonId: "ch03-lesson-01",
    prompt: "Đặc trưng nào của chủ nghĩa xã hội được giáo trình trình bày trong phần về bản chất của xã hội mới?",
    options: [
      { id: "a", label: "Nhân dân lao động làm chủ đời sống xã hội" },
      { id: "b", label: "Nền kinh tế phát triển nhưng không cần lực lượng sản xuất hiện đại" },
      { id: "c", label: "Văn hóa và con người không thuộc nội dung của xã hội mới" },
      { id: "d", label: "Mọi khác biệt xã hội được giả định mất đi ngay lập tức" },
    ],
    correctOptionId: "b",
    explanation: "Trong phần đặc trưng bản chất, giáo trình nêu nhân dân lao động làm chủ là một đặc trưng của xã hội chủ nghĩa.",
    sourceRefs: [reference("ref-ch03-l01-characteristics-mastery", 98, 99, 95, 96)],
  }),
  singleChoiceQuestion({
    id: "q-ch03-08", quizId: "quiz-ch03", chapterId: "chapter-03",
    prompt: "Theo các phương hướng được giáo trình trình bày, yêu cầu nào thể hiện việc gắn phát triển kinh tế với tiến bộ và công bằng xã hội?",
    options: [
      { id: "a", label: "Chỉ ưu tiên tăng trưởng kinh tế và loại bỏ các mục tiêu xã hội" },
      { id: "b", label: "Tách công nghiệp hóa khỏi phát triển văn hóa và con người" },
      { id: "c", label: "Kết hợp phát triển kinh tế với tiến bộ, công bằng xã hội và bảo vệ môi trường" },
      { id: "d", label: "Giữ nguyên mọi quan hệ cũ để tránh cải biến xã hội" },
    ],
    correctOptionId: "c",
    explanation: "Các phương hướng của giáo trình đặt phát triển kinh tế trong quan hệ với tiến bộ, công bằng xã hội và những yêu cầu xã hội – môi trường của quá trình xây dựng chủ nghĩa xã hội.",
    sourceRefs: [reference("ref-ch03-l03-directions-early", 114, 115, 111, 112)],
  }),
];

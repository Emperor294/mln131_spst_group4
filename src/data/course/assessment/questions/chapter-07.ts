import type { QuizQuestion } from "../types";
import { reference, singleChoiceQuestion } from "./factory";

export const CHAPTER_07_QUESTIONS: readonly QuizQuestion[] = [
  singleChoiceQuestion({
    id: "q-ch07-01", quizId: "quiz-ch07", chapterId: "chapter-07", lessonId: "ch07-lesson-01",
    prompt: "Theo giáo trình, gia đình được hình thành trên cơ sở những quan hệ nào?",
    options: [
      { id: "a", label: "Chỉ có quan hệ kinh tế giữa những người cùng nơi cư trú" },
      { id: "b", label: "Quan hệ hôn nhân, huyết thống, nuôi dưỡng và quyền, nghĩa vụ giữa các thành viên" },
      { id: "c", label: "Chỉ có quan hệ huyết thống và không có quan hệ xã hội" },
      { id: "d", label: "Một nhóm người không có ràng buộc và trách nhiệm chung" },
    ],
    correctOptionId: "b",
    explanation: "Khái niệm gia đình trong giáo trình gắn với các quan hệ hôn nhân, huyết thống, nuôi dưỡng và những quyền, nghĩa vụ giữa các thành viên.",
    sourceRefs: [reference("ref-ch07-l01-family-concept", 239, 241, 236, 238)],
  }),
  singleChoiceQuestion({
    id: "q-ch07-02", quizId: "quiz-ch07", chapterId: "chapter-07", lessonId: "ch07-lesson-01",
    prompt: "Vị trí nào của gia đình được giáo trình trình bày?",
    options: [
      { id: "a", label: "Gia đình chỉ có chức năng kinh tế và không ảnh hưởng đến cá nhân" },
      { id: "b", label: "Gia đình đứng ngoài quá trình tái sản xuất xã hội" },
      { id: "c", label: "Gia đình là tế bào của xã hội và là cầu nối giữa cá nhân với xã hội" },
      { id: "d", label: "Gia đình không phải là môi trường hình thành và phát triển nhân cách" },
    ],
    correctOptionId: "c",
    explanation: "Giáo trình trình bày ba vị trí nổi bật của gia đình: tế bào của xã hội, tổ ấm và môi trường phát triển cá nhân, đồng thời là cầu nối giữa cá nhân và xã hội.",
    sourceRefs: [reference("ref-ch07-l01-family-position", 242, 244, 239, 241)],
  }),
  singleChoiceQuestion({
    id: "q-ch07-03", quizId: "quiz-ch07", chapterId: "chapter-07", lessonId: "ch07-lesson-01",
    prompt: "Chức năng nào được giáo trình xem là chức năng đặc thù của gia đình, gắn với duy trì nòi giống và sự tồn tại của xã hội?",
    options: [
      { id: "a", label: "Tái sản xuất ra con người" },
      { id: "b", label: "Tổ chức hoạt động đối ngoại" },
      { id: "c", label: "Phân loại các giai cấp xã hội" },
      { id: "d", label: "Quản lý nhà nước" },
    ],
    correctOptionId: "a",
    explanation: "Trong bốn chức năng cơ bản, tái sản xuất ra con người được giáo trình trình bày là chức năng đặc thù, đáp ứng nhu cầu tâm – sinh lý, duy trì nòi giống và góp phần bảo đảm sự tồn tại xã hội.",
    sourceRefs: [reference("ref-ch07-l01-function-reproduction", 245, 246, 242, 243)],
  }),
  singleChoiceQuestion({
    id: "q-ch07-04", quizId: "quiz-ch07", chapterId: "chapter-07", lessonId: "ch07-lesson-02",
    prompt: "Nội dung nào là một trong các cơ sở xây dựng gia đình trong thời kỳ quá độ lên chủ nghĩa xã hội?",
    options: [
      { id: "a", label: "Cơ sở tách gia đình khỏi đời sống văn hóa" },
      { id: "b", label: "Cơ sở phủ nhận mọi quan hệ hôn nhân" },
      { id: "c", label: "Cơ sở chỉ dựa trên sở thích cá nhân, không có điều kiện xã hội" },
      { id: "d", label: "Cơ sở kinh tế – xã hội" },
    ],
    correctOptionId: "d",
    explanation: "Giáo trình trình bày bốn lĩnh vực cơ sở: kinh tế – xã hội, chính trị – xã hội, văn hóa và chế độ hôn nhân tiến bộ.",
    sourceRefs: [reference("ref-ch07-l02-economic-social", 250, 251, 247, 248)],
  }),
  singleChoiceQuestion({
    id: "q-ch07-05", quizId: "quiz-ch07", chapterId: "chapter-07", lessonId: "ch07-lesson-02",
    prompt: "Ba nguyên tắc nào tạo thành chế độ hôn nhân tiến bộ theo giáo trình?",
    options: [
      { id: "a", label: "Hôn nhân bắt buộc; phân biệt quyền; không cần pháp luật" },
      { id: "b", label: "Hôn nhân tự nguyện; một vợ một chồng và vợ chồng bình đẳng; hôn nhân được bảo đảm về pháp lý" },
      { id: "c", label: "Hôn nhân chỉ dựa trên kinh tế; không có bình đẳng; không có quyền chấm dứt" },
      { id: "d", label: "Hôn nhân tách khỏi tình yêu, quyền và nghĩa vụ giữa các thành viên" },
    ],
    correctOptionId: "b",
    explanation: "Phần chế độ hôn nhân tiến bộ được giáo trình cấu trúc thành ba nguyên tắc: tự nguyện; một vợ một chồng và bình đẳng; được bảo đảm về pháp lý.",
    sourceRefs: [reference("ref-ch07-l02-progressive-marriage", 253, 256, 250, 253)],
  }),
  singleChoiceQuestion({
    id: "q-ch07-06", quizId: "quiz-ch07", chapterId: "chapter-07", lessonId: "ch07-lesson-03",
    prompt: "Xu hướng nào được giáo trình trình bày khi mô tả sự biến đổi của gia đình Việt Nam?",
    options: [
      { id: "a", label: "Gia đình biến đổi về quy mô, cấu trúc và cách thực hiện chức năng trong điều kiện xã hội mới" },
      { id: "b", label: "Mọi gia đình đều giữ nguyên quy mô và cách tổ chức truyền thống" },
      { id: "c", label: "Các chức năng gia đình hoàn toàn mất đi" },
      { id: "d", label: "Sự biến đổi gia đình không liên quan đến kinh tế, văn hóa và xã hội" },
    ],
    correctOptionId: "a",
    explanation: "Giáo trình mô tả sự biến đổi về quy mô, cấu trúc, nơi cư trú và việc thực hiện các chức năng gia đình; đây là những xu hướng được đặt trong điều kiện xã hội thay đổi, không phải kết luận rằng mọi gia đình giống nhau.",
    sourceRefs: [reference("ref-ch07-l03-family-transformation", 257, 259, 254, 256)],
  }),
  singleChoiceQuestion({
    id: "q-ch07-07", quizId: "quiz-ch07", chapterId: "chapter-07", lessonId: "ch07-lesson-03",
    prompt: "Khi trình bày sự biến đổi các chức năng gia đình, giáo trình vẫn giữ khung chức năng nào?",
    options: [
      { id: "a", label: "Chỉ có chức năng sản xuất hàng hóa" },
      { id: "b", label: "Chỉ có chức năng giáo dục và không còn chức năng khác" },
      { id: "c", label: "Tái sản xuất; kinh tế và tổ chức tiêu dùng; nuôi dưỡng, giáo dục; tâm sinh lý và tình cảm" },
      { id: "d", label: "Bốn chức năng hoàn toàn tách khỏi biến đổi xã hội" },
    ],
    correctOptionId: "c",
    explanation: "Phần biến đổi chức năng tiếp tục sử dụng khung bốn chức năng cơ bản của gia đình và phân tích cách mỗi chức năng chịu tác động, điều chỉnh trong điều kiện xã hội mới.",
    sourceRefs: [reference("ref-ch07-l03-function-transformation", 259, 263, 256, 260)],
  }),
  singleChoiceQuestion({
    id: "q-ch07-08", quizId: "quiz-ch07", chapterId: "chapter-07",
    prompt: "Một định hướng xây dựng và phát triển gia đình Việt Nam được giáo trình nêu là gì?",
    options: [
      { id: "a", label: "Phủ nhận toàn bộ giá trị gia đình truyền thống" },
      { id: "b", label: "Giữ nguyên một mô hình gia đình duy nhất cho mọi hoàn cảnh" },
      { id: "c", label: "Tách xây dựng gia đình khỏi phát triển kinh tế – xã hội" },
      { id: "d", label: "Kế thừa giá trị truyền thống và tiếp thu những giá trị tiến bộ phù hợp với biến đổi xã hội" },
    ],
    correctOptionId: "d",
    explanation: "Trong các phương hướng cuối chương, giáo trình nhấn mạnh việc giữ gìn những giá trị tốt đẹp của gia đình truyền thống đồng thời tiếp thu giá trị tiến bộ để thích ứng với sự vận động của xã hội.",
    sourceRefs: [reference("ref-ch07-l03-directions", 266, 268, 263, 265)],
  }),
];

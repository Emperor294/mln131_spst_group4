import type { QuizQuestion } from "../types";
import { reference, singleChoiceQuestion } from "./factory";

export const CHAPTER_05_QUESTIONS: readonly QuizQuestion[] = [
  singleChoiceQuestion({
    id: "q-ch05-01", quizId: "quiz-ch05", chapterId: "chapter-05", lessonId: "ch05-lesson-01",
    prompt: "Điểm phân biệt nào đúng giữa cơ cấu xã hội và cơ cấu xã hội – giai cấp?",
    options: [
      { id: "a", label: "Hai khái niệm hoàn toàn đồng nhất trong mọi bối cảnh" },
      { id: "b", label: "Cơ cấu xã hội chỉ nói về dân số, còn cơ cấu xã hội – giai cấp không liên quan đến quan hệ sản xuất" },
      { id: "c", label: "Cơ cấu xã hội – giai cấp là một dạng cơ cấu xã hội tập trung vào các giai cấp, tầng lớp và quan hệ giữa họ" },
      { id: "d", label: "Cơ cấu xã hội – giai cấp chỉ là tên gọi khác của liên minh giai cấp, tầng lớp" },
    ],
    correctOptionId: "c",
    explanation: "Giáo trình phân biệt cơ cấu xã hội nói chung với cơ cấu xã hội – giai cấp, trong đó cơ cấu xã hội – giai cấp tập trung vào vị trí, quan hệ và biến đổi của các giai cấp, tầng lớp.",
    sourceRefs: [reference("ref-ch05-l01-definitions", 165, 166, 162, 163)],
  }),
  singleChoiceQuestion({
    id: "q-ch05-02", quizId: "quiz-ch05", chapterId: "chapter-05", lessonId: "ch05-lesson-01",
    prompt: "Xu hướng biến đổi thứ nhất của cơ cấu xã hội – giai cấp trong thời kỳ quá độ được giáo trình gắn với yếu tố nào?",
    options: [
      { id: "a", label: "Những thay đổi của cơ cấu kinh tế, phương thức sản xuất và cơ cấu ngành nghề" },
      { id: "b", label: "Sự tách rời hoàn toàn khỏi cơ cấu kinh tế" },
      { id: "c", label: "Việc giữ nguyên mọi nhóm xã hội cũ" },
      { id: "d", label: "Một quy luật chỉ thuộc lĩnh vực tâm lý cá nhân" },
    ],
    correctOptionId: "a",
    explanation: "Giáo trình trình bày cơ cấu xã hội – giai cấp thường xuyên biến đổi gắn liền với và bị quy định bởi những thay đổi của cơ cấu kinh tế, phương thức sản xuất và cơ cấu ngành nghề.",
    sourceRefs: [reference("ref-ch05-l01-trend-economic", 168, 170, 165, 167)],
  }),
  singleChoiceQuestion({
    id: "q-ch05-03", quizId: "quiz-ch05", chapterId: "chapter-05", lessonId: "ch05-lesson-02",
    prompt: "Về chính trị – xã hội, vì sao giáo trình cho rằng cần có liên minh giai cấp, tầng lớp trong thời kỳ quá độ?",
    options: [
      { id: "a", label: "Để loại bỏ mọi khác biệt lợi ích giữa các lực lượng" },
      { id: "b", label: "Để tập hợp lực lượng, tạo cơ sở xã hội và thực hiện chuyển biến xã hội" },
      { id: "c", label: "Để thay thế toàn bộ hoạt động kinh tế bằng hoạt động chính trị" },
      { id: "d", label: "Để giới hạn liên minh chỉ trong giai đoạn giành chính quyền" },
    ],
    correctOptionId: "b",
    explanation: "Giáo trình trình bày liên minh chính trị – xã hội giữa công nhân với nông dân và các tầng lớp lao động khác là cơ sở tập hợp sức mạnh, tổ chức lực lượng và cải biến xã hội trong cả quá trình xây dựng xã hội mới.",
    sourceRefs: [reference("ref-ch05-l02-political-necessity", 173, 175, 170, 172)],
  }),
  singleChoiceQuestion({
    id: "q-ch05-04", quizId: "quiz-ch05", chapterId: "chapter-05", lessonId: "ch05-lesson-02",
    prompt: "Nội dung kinh tế của tính tất yếu liên minh được giáo trình gắn với quan hệ nào?",
    options: [
      { id: "a", label: "Tách công nghiệp, nông nghiệp, dịch vụ và khoa học – công nghệ thành các lĩnh vực biệt lập" },
      { id: "b", label: "Chỉ ưu tiên lợi ích của một lực lượng và bỏ qua các lực lượng khác" },
      { id: "c", label: "Không cần nhận diện hoặc điều hòa lợi ích kinh tế" },
      { id: "d", label: "Gắn bó, hỗ trợ giữa các lĩnh vực và nhận diện, điều hòa lợi ích trong hợp tác" },
    ],
    correctOptionId: "d",
    explanation: "Ở phương diện kinh tế, giáo trình nhấn mạnh yêu cầu gắn công nghiệp, nông nghiệp, dịch vụ, khoa học – công nghệ và các thành phần kinh tế, đồng thời nhận diện và điều hòa lợi ích.",
    sourceRefs: [reference("ref-ch05-l02-economic-necessity", 175, 176, 172, 173)],
  }),
  singleChoiceQuestion({
    id: "q-ch05-05", quizId: "quiz-ch05", chapterId: "chapter-05", lessonId: "ch05-lesson-03",
    prompt: "Trong phạm vi sơ đồ liên minh được trình bày ở Chương 5, ba lực lượng Công nhân – Nông dân – Trí thức được xác định như thế nào?",
    options: [
      { id: "a", label: "Là toàn bộ cơ cấu xã hội – giai cấp của Việt Nam" },
      { id: "b", label: "Là ba lực lượng cốt lõi trong liên minh, không thay thế cho cơ cấu xã hội – giai cấp rộng hơn" },
      { id: "c", label: "Là ba nhóm không có quan hệ với các tầng lớp khác" },
      { id: "d", label: "Là ba chức năng của Nhà nước xã hội chủ nghĩa" },
    ],
    correctOptionId: "b",
    explanation: "Giáo trình và phần trình bày của chương xác định liên minh công nhân – nông dân – trí thức là trọng tâm cốt lõi; trọng tâm này không đồng nhất với toàn bộ cơ cấu xã hội – giai cấp rộng hơn.",
    sourceRefs: [
      reference("ref-ch05-l03-vietnam-structure", 177, 178, 174, 175),
      reference("ref-ch05-l03-alliance-intro", 182, 183, 179, 180),
    ],
  }),
  singleChoiceQuestion({
    id: "q-ch05-06", quizId: "quiz-ch05", chapterId: "chapter-05", lessonId: "ch05-lesson-03",
    prompt: "Nội dung kinh tế của liên minh ở Việt Nam tập trung vào yêu cầu nào?",
    options: [
      { id: "a", label: "Hợp tác giữa công nghiệp, nông nghiệp, khoa học – công nghệ, dịch vụ và hài hòa lợi ích" },
      { id: "b", label: "Chỉ phát triển một ngành kinh tế duy nhất" },
      { id: "c", label: "Tách ứng dụng khoa học – công nghệ khỏi sản xuất" },
      { id: "d", label: "Để lợi ích của các lực lượng tự vận động mà không cần hợp tác" },
    ],
    correctOptionId: "a",
    explanation: "Giáo trình coi nội dung kinh tế là cơ sở vật chất – kỹ thuật của liên minh, nhấn mạnh hợp tác giữa các lĩnh vực, ứng dụng khoa học – công nghệ và bảo đảm lợi ích các bên.",
    sourceRefs: [reference("ref-ch05-l03-alliance-economic", 183, 185, 180, 182)],
  }),
  singleChoiceQuestion({
    id: "q-ch05-07", quizId: "quiz-ch05", chapterId: "chapter-05",
    prompt: "Ba nội dung nào tạo thành các phương diện liên kết của liên minh giai cấp, tầng lớp ở Việt Nam theo giáo trình?",
    options: [
      { id: "a", label: "Kinh tế; chính trị; văn hóa – xã hội" },
      { id: "b", label: "Lãnh thổ; dân số; khí hậu" },
      { id: "c", label: "Tư pháp; ngoại giao; thể thao" },
      { id: "d", label: "Tâm lý; ngôn ngữ; địa chất" },
    ],
    correctOptionId: "a",
    explanation: "Giáo trình phân biệt ba nội dung có quan hệ thống nhất: kinh tế, chính trị và văn hóa – xã hội; mỗi nội dung có yêu cầu riêng nhưng cùng nằm trong khối liên minh.",
    sourceRefs: [
      reference("ref-ch05-l03-alliance-economic", 183, 185, 180, 182),
      reference("ref-ch05-l03-alliance-political", 185, 186, 182, 183),
      reference("ref-ch05-l03-alliance-cultural-social", 186, 187, 183, 184),
    ],
  }),
  singleChoiceQuestion({
    id: "q-ch05-08", quizId: "quiz-ch05", chapterId: "chapter-05",
    prompt: "Nhận định nào phù hợp với phương hướng tăng cường liên minh được giáo trình trình bày?",
    options: [
      { id: "a", label: "Chỉ chú trọng tăng trưởng và không cần chính sách xã hội" },
      { id: "b", label: "Tách đồng thuận xã hội khỏi việc giải quyết khác biệt và lợi ích" },
      { id: "c", label: "Hoàn thiện thể chế kinh tế, phát triển khoa học – công nghệ và đổi mới hoạt động của các thiết chế liên quan" },
      { id: "d", label: "Đồng nhất liên minh với một nhóm duy nhất trong cơ cấu xã hội" },
    ],
    correctOptionId: "c",
    explanation: "Các phương hướng cuối chương bao gồm hoàn thiện thể chế kinh tế và phát triển khoa học – công nghệ, đồng thời đổi mới hoạt động của các thiết chế liên quan để tăng cường liên minh.",
    sourceRefs: [
      reference("ref-ch05-l03-direction-two", 188, 190, 185, 187),
      reference("ref-ch05-l03-direction-three", 190, 191, 187, 188),
      reference("ref-ch05-l03-direction-four-five", 192, 192, 189, 189),
    ],
  }),
];

import type { QuizQuestion } from "../types";
import { reference, singleChoiceQuestion } from "./factory";

export const CHAPTER_04_QUESTIONS: readonly QuizQuestion[] = [
  singleChoiceQuestion({
    id: "q-ch04-01", quizId: "quiz-ch04", chapterId: "chapter-04", lessonId: "ch04-lesson-01",
    prompt: "Theo giáo trình, một phương diện cơ bản của dân chủ là gì?",
    options: [
      { id: "a", label: "Quyền lực chỉ thuộc về một cá nhân bất kể xã hội" },
      { id: "b", label: "Dân chủ chỉ là một hình thức sinh hoạt văn hóa" },
      { id: "c", label: "Nhân dân được đặt ở vị trí chủ thể của quyền lực nhà nước" },
      { id: "d", label: "Dân chủ loại bỏ mọi nguyên tắc tổ chức và quản lý" },
    ],
    correctOptionId: "c",
    explanation: "Phần quan niệm về dân chủ nêu nhân dân ở vị trí chủ thể của quyền lực nhà nước; dân chủ cũng được trình bày trên các phương diện chế độ, nguyên tắc và mục tiêu xã hội.",
    sourceRefs: [reference("ref-ch04-l01-democracy-concept", 125, 126, 122, 123)],
  }),
  singleChoiceQuestion({
    id: "q-ch04-02", quizId: "quiz-ch04", chapterId: "chapter-04", lessonId: "ch04-lesson-01",
    prompt: "Bản chất của nền dân chủ xã hội chủ nghĩa được giáo trình trình bày như thế nào?",
    options: [
      { id: "a", label: "Có bản chất giai cấp công nhân, đồng thời mang tính nhân dân rộng rãi và tính dân tộc sâu sắc" },
      { id: "b", label: "Chỉ là một cơ chế kinh tế không liên quan đến chính trị" },
      { id: "c", label: "Tách quyền làm chủ của nhân dân khỏi nhà nước và xã hội" },
      { id: "d", label: "Phủ nhận các giá trị văn hóa và quyền tham gia của nhân dân" },
    ],
    correctOptionId: "a",
    explanation: "Giáo trình trình bày nền dân chủ xã hội chủ nghĩa có bản chất giai cấp công nhân, tính nhân dân rộng rãi và tính dân tộc sâu sắc, cùng các cơ sở kinh tế và văn hóa tương ứng.",
    sourceRefs: [reference("ref-ch04-l01-socialist-democracy", 129, 132, 126, 129)],
  }),
  singleChoiceQuestion({
    id: "q-ch04-03", quizId: "quiz-ch04", chapterId: "chapter-04", lessonId: "ch04-lesson-02",
    prompt: "Theo giáo trình, Nhà nước xã hội chủ nghĩa ra đời trên cơ sở nào?",
    options: [
      { id: "a", label: "Một tiến trình không liên quan đến cách mạng và đấu tranh xã hội" },
      { id: "b", label: "Sự tự phát triển của thị trường mà không cần quyền lực nhà nước" },
      { id: "c", label: "Việc tách nhà nước khỏi nhân dân lao động" },
      { id: "d", label: "Cuộc cách mạng do giai cấp vô sản và nhân dân lao động tiến hành dưới sự lãnh đạo của Đảng Cộng sản" },
    ],
    correctOptionId: "d",
    explanation: "Giáo trình đặt sự ra đời của Nhà nước xã hội chủ nghĩa trong cuộc cách mạng của giai cấp vô sản và nhân dân lao động dưới sự lãnh đạo của Đảng Cộng sản.",
    sourceRefs: [reference("ref-ch04-l02-state-origin", 141, 142, 138, 139)],
  }),
  singleChoiceQuestion({
    id: "q-ch04-04", quizId: "quiz-ch04", chapterId: "chapter-04", lessonId: "ch04-lesson-02",
    prompt: "Cách phân loại nào thuộc cách tiếp cận theo phạm vi tác động của chức năng Nhà nước xã hội chủ nghĩa?",
    options: [
      { id: "a", label: "Chức năng triết học và chức năng tự nhiên" },
      { id: "b", label: "Chức năng đối nội và chức năng đối ngoại" },
      { id: "c", label: "Chức năng cá nhân và chức năng gia đình" },
      { id: "d", label: "Chức năng ngôn ngữ và chức năng lãnh thổ" },
    ],
    correctOptionId: "b",
    explanation: "Giáo trình phân loại theo phạm vi tác động thành chức năng đối nội và đối ngoại; một cách phân loại khác dựa vào tính chất quyền lực gồm chức năng giai cấp và chức năng xã hội.",
    sourceRefs: [reference("ref-ch04-l02-state-functions", 144, 145, 141, 142)],
  }),
  singleChoiceQuestion({
    id: "q-ch04-05", quizId: "quiz-ch04", chapterId: "chapter-04", lessonId: "ch04-lesson-03",
    prompt: "Trong khuôn khổ giáo trình, dân chủ ở Việt Nam được thể chế hóa và bảo đảm bằng cách nào?",
    options: [
      { id: "a", label: "Bằng pháp luật, đồng thời gắn với kỷ luật và kỷ cương" },
      { id: "b", label: "Bằng việc loại bỏ mọi hình thức pháp luật" },
      { id: "c", label: "Bằng cách chỉ thực hiện quyền làm chủ trong kinh tế" },
      { id: "d", label: "Bằng việc tách dân chủ khỏi đời sống thực tiễn" },
    ],
    correctOptionId: "a",
    explanation: "Phần Việt Nam nêu dân chủ được thể chế hóa bằng pháp luật, được pháp luật bảo đảm và được thực hiện gắn với kỷ luật, kỷ cương trong đời sống thực tiễn.",
    sourceRefs: [reference("ref-ch04-l03-vietnam-democracy-essence", 151, 153, 148, 150)],
  }),
  singleChoiceQuestion({
    id: "q-ch04-06", quizId: "quiz-ch04", chapterId: "chapter-04", lessonId: "ch04-lesson-02",
    prompt: "Điểm nào phản ánh đúng quan hệ giữa dân chủ xã hội chủ nghĩa và Nhà nước xã hội chủ nghĩa theo giáo trình?",
    options: [
      { id: "a", label: "Hai khái niệm hoàn toàn tách rời nhau" },
      { id: "b", label: "Nhà nước chỉ có vai trò kinh tế, không liên quan đến quyền làm chủ" },
      { id: "c", label: "Dân chủ là cơ sở, còn nhà nước tổ chức, thể chế hóa và bảo đảm quyền làm chủ của nhân dân" },
      { id: "d", label: "Dân chủ chỉ là kết quả phụ của hoạt động nhà nước" },
    ],
    correctOptionId: "c",
    explanation: "Sơ đồ của giáo trình diễn giải quan hệ hai chiều: nền dân chủ là cơ sở và phương thức để nhân dân làm chủ, còn Nhà nước tổ chức, thể chế hóa và bảo đảm quyền làm chủ đó.",
    sourceRefs: [reference("ref-ch04-l02-democracy-state-relation", 147, 148, 144, 145)],
  }),
  singleChoiceQuestion({
    id: "q-ch04-07", quizId: "quiz-ch04", chapterId: "chapter-04", lessonId: "ch04-lesson-03",
    prompt: "Hình thức nào được giáo trình nêu là một cách nhân dân thực hiện quyền làm chủ ở Việt Nam?",
    options: [
      { id: "a", label: "Dân chủ gián tiếp thông qua những người và tổ chức đại diện do nhân dân bầu" },
      { id: "b", label: "Chỉ ủy quyền mà không có bất kỳ hình thức tham gia nào khác" },
      { id: "c", label: "Tách quyền làm chủ khỏi pháp luật và kỷ cương" },
      { id: "d", label: "Chỉ thực hiện quyền làm chủ trong phạm vi gia đình" },
    ],
    correctOptionId: "a",
    explanation: "Giáo trình phân biệt dân chủ gián tiếp, trong đó nhân dân ủy quyền cho người và tổ chức đại diện do mình bầu, với dân chủ trực tiếp và các hình thức thực hiện khác.",
    sourceRefs: [reference("ref-ch04-l03-vietnam-democracy-essence", 151, 153, 148, 150)],
  }),
  singleChoiceQuestion({
    id: "q-ch04-08", quizId: "quiz-ch04", chapterId: "chapter-04", lessonId: "ch04-lesson-03",
    prompt: "Đặc điểm nào thuộc Nhà nước pháp quyền xã hội chủ nghĩa ở Việt Nam theo nội dung giáo trình?",
    options: [
      { id: "a", label: "Nhà nước đứng ngoài pháp luật và không chịu sự kiểm soát" },
      { id: "b", label: "Quyền lực nhà nước thuộc về nhân dân và được tổ chức, thực hiện trong khuôn khổ pháp luật" },
      { id: "c", label: "Pháp luật chỉ điều chỉnh quan hệ kinh tế, không điều chỉnh quyền lực" },
      { id: "d", label: "Nhà nước pháp quyền phủ nhận vai trò của nhân dân" },
    ],
    correctOptionId: "b",
    explanation: "Phần về Nhà nước pháp quyền xã hội chủ nghĩa Việt Nam gắn quyền lực nhà nước với nhân dân và yêu cầu tổ chức, hoạt động trong khuôn khổ pháp luật.",
    sourceRefs: [reference("ref-ch04-l03-rule-of-law-concept", 155, 156, 152, 153)],
  }),
];

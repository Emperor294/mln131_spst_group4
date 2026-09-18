import type { ChapterId } from "../types";
import type { Quiz, QuizId } from "./types";

const QUIZ_METADATA: readonly { id: QuizId; chapterId: ChapterId; title: string }[] = [
  { id: "quiz-ch01", chapterId: "chapter-01", title: "Ôn tập Chương 1" },
  { id: "quiz-ch02", chapterId: "chapter-02", title: "Ôn tập Chương 2" },
  { id: "quiz-ch03", chapterId: "chapter-03", title: "Ôn tập Chương 3" },
  { id: "quiz-ch04", chapterId: "chapter-04", title: "Ôn tập Chương 4" },
  { id: "quiz-ch05", chapterId: "chapter-05", title: "Ôn tập Chương 5" },
  { id: "quiz-ch06", chapterId: "chapter-06", title: "Ôn tập Chương 6" },
  { id: "quiz-ch07", chapterId: "chapter-07", title: "Ôn tập Chương 7" },
];

export const COURSE_QUIZZES: readonly Quiz[] = QUIZ_METADATA.map(({ id, chapterId, title }) => ({
  id,
  chapterId,
  title,
  description: "Bài luyện tập trắc nghiệm sẽ được mở sau khi ngân hàng câu hỏi được rà soát.",
  questionIds: [],
  status: "planned",
}));

export function getQuizById(quizId: string): Quiz | undefined {
  return COURSE_QUIZZES.find((quiz) => quiz.id === quizId);
}

export function getQuizByChapterId(chapterId: ChapterId): Quiz | undefined {
  return COURSE_QUIZZES.find((quiz) => quiz.chapterId === chapterId);
}

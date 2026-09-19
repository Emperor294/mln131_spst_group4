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

const QUIZ_QUESTION_IDS: Readonly<Record<QuizId, readonly `q-${string}`[]>> = {
  "quiz-ch01": ["q-ch01-01", "q-ch01-02", "q-ch01-03", "q-ch01-04", "q-ch01-05", "q-ch01-06", "q-ch01-07", "q-ch01-08"],
  "quiz-ch02": ["q-ch02-01", "q-ch02-02", "q-ch02-03", "q-ch02-04", "q-ch02-05", "q-ch02-06", "q-ch02-07", "q-ch02-08"],
  "quiz-ch03": ["q-ch03-01", "q-ch03-02", "q-ch03-03", "q-ch03-04", "q-ch03-05", "q-ch03-06", "q-ch03-07", "q-ch03-08"],
  "quiz-ch04": ["q-ch04-01", "q-ch04-02", "q-ch04-03", "q-ch04-04", "q-ch04-05", "q-ch04-06", "q-ch04-07", "q-ch04-08"],
  "quiz-ch05": ["q-ch05-01", "q-ch05-02", "q-ch05-03", "q-ch05-04", "q-ch05-05", "q-ch05-06", "q-ch05-07", "q-ch05-08"],
  "quiz-ch06": ["q-ch06-01", "q-ch06-02", "q-ch06-03", "q-ch06-04", "q-ch06-05", "q-ch06-06", "q-ch06-07", "q-ch06-08"],
  "quiz-ch07": ["q-ch07-01", "q-ch07-02", "q-ch07-03", "q-ch07-04", "q-ch07-05", "q-ch07-06", "q-ch07-07", "q-ch07-08"],
};

export const COURSE_QUIZZES: readonly Quiz[] = QUIZ_METADATA.map(({ id, chapterId, title }) => ({
  id,
  chapterId,
  title,
  description: "Tám câu hỏi trắc nghiệm giúp ôn tập các khái niệm và mối quan hệ trọng tâm của chương.",
  questionIds: QUIZ_QUESTION_IDS[id],
  status: "available",
}));

export function getQuizById(quizId: string): Quiz | undefined {
  return COURSE_QUIZZES.find((quiz) => quiz.id === quizId);
}

export function getQuizByChapterId(chapterId: ChapterId): Quiz | undefined {
  return COURSE_QUIZZES.find((quiz) => quiz.chapterId === chapterId);
}

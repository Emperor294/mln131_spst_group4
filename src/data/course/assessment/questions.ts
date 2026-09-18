import type { QuizQuestion } from "./types";

/**
 * Canonical quiz questions are intentionally empty in Phase 5A.
 * Textbook-grounded questions, answer keys, and explanations belong to Phase 5B.
 */
export const QUIZ_QUESTIONS: readonly QuizQuestion[] = [];

export function getQuizQuestionById(questionId: string): QuizQuestion | undefined {
  return QUIZ_QUESTIONS.find((question) => question.id === questionId);
}

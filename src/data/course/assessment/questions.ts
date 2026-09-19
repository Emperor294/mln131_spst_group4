import { CHAPTER_01_QUESTIONS } from "./questions/chapter-01";
import { CHAPTER_02_QUESTIONS } from "./questions/chapter-02";
import { CHAPTER_03_QUESTIONS } from "./questions/chapter-03";
import { CHAPTER_04_QUESTIONS } from "./questions/chapter-04";
import { CHAPTER_05_QUESTIONS } from "./questions/chapter-05";
import { CHAPTER_06_QUESTIONS } from "./questions/chapter-06";
import { CHAPTER_07_QUESTIONS } from "./questions/chapter-07";
import type { QuizQuestion } from "./types";

export const QUIZ_QUESTIONS: readonly QuizQuestion[] = [
  ...CHAPTER_01_QUESTIONS,
  ...CHAPTER_02_QUESTIONS,
  ...CHAPTER_03_QUESTIONS,
  ...CHAPTER_04_QUESTIONS,
  ...CHAPTER_05_QUESTIONS,
  ...CHAPTER_06_QUESTIONS,
  ...CHAPTER_07_QUESTIONS,
];

export function getQuizQuestionById(questionId: string): QuizQuestion | undefined {
  return QUIZ_QUESTIONS.find((question) => question.id === questionId);
}

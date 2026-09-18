import type { ChapterId, LessonId, ScopedSourceReference } from "../types";

export type QuizId = `quiz-ch${"01" | "02" | "03" | "04" | "05" | "06" | "07"}`;
export type QuizQuestionId = `quiz-question-${string}`;

export type QuizQuestionType = "single-choice" | "multiple-choice";
export type QuizQuestionStatus = "draft" | "verified";
export type QuizAvailability = "planned" | "draft" | "available";

export interface QuizOption {
  id: string;
  label: string;
}

interface QuizQuestionBase {
  id: QuizQuestionId;
  quizId: QuizId;
  chapterId: ChapterId;
  lessonId?: LessonId;
  prompt: string;
  options: readonly QuizOption[];
  explanation: string;
  sourceRefs: readonly ScopedSourceReference[];
  status: QuizQuestionStatus;
}

export interface SingleChoiceQuizQuestion extends QuizQuestionBase {
  type: "single-choice";
  correctOptionId: string;
}

export interface MultipleChoiceQuizQuestion extends QuizQuestionBase {
  type: "multiple-choice";
  correctOptionIds: readonly string[];
}

export type QuizQuestion = SingleChoiceQuizQuestion | MultipleChoiceQuizQuestion;

export interface Quiz {
  id: QuizId;
  chapterId: ChapterId;
  title: string;
  description: string;
  questionIds: readonly QuizQuestionId[];
  passingScore?: number;
  status: QuizAvailability;
}

export interface QuizAnswer {
  questionId: QuizQuestionId;
  selectedOptionIds: readonly string[];
}

export interface QuizAttempt {
  id: string;
  quizId: QuizId;
  startedAt: string;
  submittedAt?: string;
  answers: readonly QuizAnswer[];
  score?: number;
  correctCount?: number;
  totalQuestions?: number;
}

export interface QuizQuestionResult {
  questionId: QuizQuestionId;
  selectedOptionIds: readonly string[];
  correctOptionIds: readonly string[];
  isCorrect: boolean;
}

export interface QuizGradeResult {
  score: number;
  percentage: number;
  correctCount: number;
  totalQuestions: number;
  questionResults: readonly QuizQuestionResult[];
}

export type QuizProgressState = "not-attempted" | "attempted" | "passed";

export interface ChapterProgress {
  chapterId: ChapterId;
  state: QuizProgressState;
  latestAttemptId?: string;
  bestScore?: number;
}

export interface AssessmentProgressState {
  version: 1;
  attempts: readonly QuizAttempt[];
  chapterProgress: readonly ChapterProgress[];
}

import { COURSE_CHAPTERS } from "../chapters";
import { COURSE_LESSONS } from "../lessons";
import { ACADEMIC_SOURCES } from "../sources";
import type { ScopedSourceReference } from "../types";
import { QUIZ_QUESTIONS } from "./questions";
import { COURSE_QUIZZES } from "./quizzes";
import type { QuizQuestion } from "./types";

function hasText(value: string): boolean {
  return value.trim().length > 0;
}

function validateSourceRefs(
  references: readonly ScopedSourceReference[],
  sourceIds: ReadonlySet<string>,
  issues: string[],
  context: string,
): void {
  for (const reference of references) {
    if (!sourceIds.has(reference.sourceId)) {
      issues.push(`${context} tham chiếu source không tồn tại: ${reference.sourceId}`);
    }
    if (reference.bookPages && (!Number.isInteger(reference.bookPages.start)
      || !Number.isInteger(reference.bookPages.end)
      || reference.bookPages.start <= 0
      || reference.bookPages.end <= 0
      || reference.bookPages.start > reference.bookPages.end)) {
      issues.push(`${context} có khoảng trang sách không hợp lệ: ${reference.id}`);
    }
    if (reference.pdfPages && (!Number.isInteger(reference.pdfPages.start)
      || !Number.isInteger(reference.pdfPages.end)
      || reference.pdfPages.start <= 0
      || reference.pdfPages.end <= 0
      || reference.pdfPages.start > reference.pdfPages.end)) {
      issues.push(`${context} có khoảng trang PDF không hợp lệ: ${reference.id}`);
    }
  }
}

function getCorrectOptionIds(question: QuizQuestion): readonly string[] {
  return question.type === "single-choice" ? [question.correctOptionId] : question.correctOptionIds;
}

export function getAssessmentDataIssues(): string[] {
  const issues: string[] = [];
  const chapterIds = new Set(COURSE_CHAPTERS.map((chapter) => chapter.id));
  const lessonIds = new Set(COURSE_LESSONS.map((lesson) => lesson.id));
  const lessonChapters = new Map(COURSE_LESSONS.map((lesson) => [lesson.id, lesson.chapterId]));
  const sourceIds = new Set(ACADEMIC_SOURCES.map((source) => source.id));
  const quizIds = new Set<string>();
  const questionIds = new Set<string>();
  const questionOwners = new Map<string, string>();

  for (const quiz of COURSE_QUIZZES) {
    if (quizIds.has(quiz.id)) issues.push(`Quiz ID bị trùng: ${quiz.id}`);
    quizIds.add(quiz.id);

    if (!chapterIds.has(quiz.chapterId)) {
      issues.push(`Quiz ${quiz.id} tham chiếu chapter không tồn tại: ${quiz.chapterId}`);
    }
    if (!hasText(quiz.title) || !hasText(quiz.description)) {
      issues.push(`Quiz ${quiz.id} phải có title và description.`);
    }
    if (quiz.passingScore !== undefined && (quiz.passingScore < 0 || quiz.passingScore > 1)) {
      issues.push(`Quiz ${quiz.id} có passingScore ngoài khoảng 0–1.`);
    }
    if (quiz.status === "available" && quiz.questionIds.length === 0) {
      issues.push(`Quiz ${quiz.id} available phải có ít nhất một câu hỏi.`);
    }
    const quizQuestionIds = new Set<string>();
    for (const questionId of quiz.questionIds) {
      if (quizQuestionIds.has(questionId)) issues.push(`Quiz ${quiz.id} có question ID bị trùng: ${questionId}`);
      quizQuestionIds.add(questionId);

      const previousOwner = questionOwners.get(questionId);
      if (previousOwner && previousOwner !== quiz.id) {
        issues.push(`Quiz question ${questionId} thuộc nhiều quiz: ${previousOwner}, ${quiz.id}`);
      }
      questionOwners.set(questionId, quiz.id);

      const question = QUIZ_QUESTIONS.find((item) => item.id === questionId);
      if (!question) {
        issues.push(`Quiz ${quiz.id} tham chiếu question không tồn tại: ${questionId}`);
      } else if (question.quizId !== quiz.id) {
        issues.push(`Question ${question.id} khai báo quizId không khớp ${quiz.id}.`);
      } else if (quiz.status === "available" && question.status !== "verified") {
        issues.push(`Quiz ${quiz.id} available chỉ được chứa question verified: ${question.id}`);
      }
    }
  }

  for (const question of QUIZ_QUESTIONS) {
    if (questionIds.has(question.id)) issues.push(`Quiz question ID bị trùng: ${question.id}`);
    questionIds.add(question.id);

    const quiz = COURSE_QUIZZES.find((item) => item.id === question.quizId);
    if (!quiz) issues.push(`Question ${question.id} tham chiếu quiz không tồn tại: ${question.quizId}`);
    if (!chapterIds.has(question.chapterId)) {
      issues.push(`Question ${question.id} tham chiếu chapter không tồn tại: ${question.chapterId}`);
    }
    if (quiz && quiz.chapterId !== question.chapterId) {
      issues.push(`Question ${question.id} không cùng chapter với quiz ${quiz.id}.`);
    }
    if (quiz && !quiz.questionIds.includes(question.id)) {
      issues.push(`Question ${question.id} chưa được đăng ký trong quiz ${quiz.id}.`);
    }
    if (question.lessonId) {
      if (!lessonIds.has(question.lessonId)) {
        issues.push(`Question ${question.id} tham chiếu lesson không tồn tại: ${question.lessonId}`);
      } else if (lessonChapters.get(question.lessonId) !== question.chapterId) {
        issues.push(`Question ${question.id} tham chiếu lesson khác chapter.`);
      }
    }

    const optionIds = new Set<string>();
    for (const option of question.options) {
      if (!hasText(option.id) || !hasText(option.label)) issues.push(`Question ${question.id} có option rỗng.`);
      if (optionIds.has(option.id)) issues.push(`Question ${question.id} có option ID bị trùng: ${option.id}`);
      optionIds.add(option.id);
    }
    if (question.options.length < 2) issues.push(`Question ${question.id} phải có ít nhất 2 option.`);

    const correctOptionIds = getCorrectOptionIds(question);
    if (correctOptionIds.length === 0) issues.push(`Question ${question.id} phải có đáp án đúng.`);
    if (new Set(correctOptionIds).size !== correctOptionIds.length) {
      issues.push(`Question ${question.id} có đáp án đúng bị trùng.`);
    }
    for (const correctOptionId of correctOptionIds) {
      if (!optionIds.has(correctOptionId)) {
        issues.push(`Question ${question.id} tham chiếu đáp án không tồn tại: ${correctOptionId}`);
      }
    }
    if (question.type === "single-choice" && correctOptionIds.length !== 1) {
      issues.push(`Question ${question.id} single-choice phải có đúng một đáp án.`);
    }
    if (question.status === "verified") {
      if (!hasText(question.prompt) || !hasText(question.explanation)) {
        issues.push(`Question ${question.id} verified phải có prompt và explanation.`);
      }
      if (question.sourceRefs.length === 0) {
        issues.push(`Question ${question.id} verified phải có sourceRefs.`);
      }
    }
    validateSourceRefs(question.sourceRefs, sourceIds, issues, `Question ${question.id}`);
  }

  return issues;
}

export function assertAssessmentDataIntegrity(): void {
  const issues = getAssessmentDataIssues();
  if (issues.length > 0) throw new Error(`Assessment data không hợp lệ:\n${issues.join("\n")}`);
}

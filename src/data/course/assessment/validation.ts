import { COURSE_CHAPTERS } from "../chapters";
import { COURSE_LESSONS } from "../lessons";
import { ACADEMIC_SOURCES } from "../sources";
import { CHAPTER_TEXTBOOK_PAGE_MAP } from "../textbook-page-map";
import { LESSON_TEXTBOOK_PAGE_MAP } from "../lesson-page-map";
import type { ScopedSourceReference } from "../types";
import { QUIZ_QUESTIONS } from "./questions";
import { COURSE_QUIZZES } from "./quizzes";
import type { QuizQuestion } from "./types";
import { gradeQuiz } from "@/features/assessment/grading/grade-quiz";
import { getProgressSelectorFixtureIssues } from "@/features/assessment/progress/summaries";
import { getProgressRepositoryFixtureIssues } from "@/features/assessment/progress/storage";

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

function isContained(
  inner: { start: number; end: number } | undefined,
  outer: { start: number; end: number } | undefined,
): boolean {
  return Boolean(inner && outer && inner.start >= outer.start && inner.end <= outer.end);
}

function samePageRange(
  left: { start: number; end: number } | undefined,
  right: { start: number; end: number } | undefined,
): boolean {
  return left?.start === right?.start && left?.end === right?.end;
}

function getCanonicalScopedReferences(): ReadonlyMap<string, ScopedSourceReference> {
  const references = new Map<string, ScopedSourceReference>();
  const add = (reference: ScopedSourceReference) => {
    if (!references.has(reference.id)) references.set(reference.id, reference);
  };

  for (const chapter of COURSE_CHAPTERS) {
    for (const reference of chapter.sourceRefs ?? []) add(reference);
    for (const lesson of chapter.lessons) {
      for (const reference of lesson.sourceRefs ?? []) add(reference);
      for (const section of lesson.sections) {
        for (const reference of section.sourceRefs ?? []) add(reference);
        if (section.type === "review-question") {
          for (const question of section.questions) {
            for (const reference of question.sourceRefs) add(reference);
          }
        }
      }
    }
  }
  for (const mapping of CHAPTER_TEXTBOOK_PAGE_MAP) add(mapping.sourceRef);
  for (const mapping of LESSON_TEXTBOOK_PAGE_MAP) add(mapping.sourceRef);

  return references;
}

export function getAssessmentDataIssues(): string[] {
  const issues: string[] = [];
  const chapterIds = new Set(COURSE_CHAPTERS.map((chapter) => chapter.id));
  const lessonIds = new Set(COURSE_LESSONS.map((lesson) => lesson.id));
  const lessonChapters = new Map(COURSE_LESSONS.map((lesson) => [lesson.id, lesson.chapterId]));
  const sourceIds = new Set(ACADEMIC_SOURCES.map((source) => source.id));
  const canonicalReferences = getCanonicalScopedReferences();
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

  if (COURSE_QUIZZES.length !== 7) issues.push(`Assessment registry phải có đúng 7 quiz, hiện có ${COURSE_QUIZZES.length}.`);
  if (QUIZ_QUESTIONS.length !== 56) issues.push(`Assessment registry phải có đúng 56 question, hiện có ${QUIZ_QUESTIONS.length}.`);

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
    const optionLabels = new Set<string>();
    for (const option of question.options) {
      if (!hasText(option.id) || !hasText(option.label)) issues.push(`Question ${question.id} có option rỗng.`);
      if (optionIds.has(option.id)) issues.push(`Question ${question.id} có option ID bị trùng: ${option.id}`);
      optionIds.add(option.id);
      const normalizedLabel = option.label.trim().toLocaleLowerCase();
      if (optionLabels.has(normalizedLabel)) issues.push(`Question ${question.id} có option label bị trùng.`);
      optionLabels.add(normalizedLabel);
    }
    if (question.options.length !== 4) issues.push(`Question ${question.id} phải có đúng 4 option.`);
    if (question.type !== "single-choice") issues.push(`Question ${question.id} không thuộc loại single-choice của Phase 5B.`);

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
      if (question.explanation.trim() === question.prompt.trim()) {
        issues.push(`Question ${question.id} có explanation lặp lại prompt.`);
      }
    }
    validateSourceRefs(question.sourceRefs, sourceIds, issues, `Question ${question.id}`);
    for (const reference of question.sourceRefs) {
      const canonicalReference = canonicalReferences.get(reference.id);
      if (!canonicalReference) {
        issues.push(`Question ${question.id} tham chiếu scoped source chưa đăng ký: ${reference.id}`);
      } else if (
        canonicalReference.sourceId !== reference.sourceId
        || !samePageRange(canonicalReference.bookPages, reference.bookPages)
        || !samePageRange(canonicalReference.pdfPages, reference.pdfPages)
      ) {
        issues.push(`Question ${question.id} có scoped source không khớp bản ghi canonical: ${reference.id}`);
      }
    }

    const chapterMapping = CHAPTER_TEXTBOOK_PAGE_MAP.find((mapping) => mapping.chapterId === question.chapterId);
    const lessonMapping = question.lessonId
      ? LESSON_TEXTBOOK_PAGE_MAP.find((mapping) => mapping.lessonId === question.lessonId)
      : undefined;
    if (question.lessonId && !lessonMapping) {
      issues.push(`Question ${question.id} không tìm thấy page mapping cho lesson ${question.lessonId}.`);
    }
    if (question.sourceRefs.some((reference) => reference.bookPages && reference.bookPages.end - reference.bookPages.start + 1 > 5)) {
      issues.push(`Question ${question.id} có citation span trên 5 trang sách.`);
    }
    for (const reference of question.sourceRefs) {
      if (!isContained(reference.bookPages, chapterMapping?.sourceRef.bookPages)
        || !isContained(reference.pdfPages, chapterMapping?.sourceRef.pdfPages)) {
        issues.push(`Question ${question.id} có sourceRef nằm ngoài page range của chapter.`);
      }
    }
    if (lessonMapping && !question.sourceRefs.some((reference) => (
      isContained(reference.bookPages, lessonMapping.sourceRef.bookPages)
      && isContained(reference.pdfPages, lessonMapping.sourceRef.pdfPages)
    ))) {
      issues.push(`Question ${question.id} phải có ít nhất một sourceRef trong lesson ${question.lessonId}.`);
    }
  }

  for (const quiz of COURSE_QUIZZES) {
    if (quiz.questionIds.length !== 8) issues.push(`Quiz ${quiz.id} phải có đúng 8 question.`);
    if (quiz.status !== "available") issues.push(`Quiz ${quiz.id} phải available sau khi ngân hàng được xác minh.`);
    const lessonCounts = new Map<string, number>();
    for (const questionId of quiz.questionIds) {
      const question = QUIZ_QUESTIONS.find((item) => item.id === questionId);
      if (question?.lessonId) lessonCounts.set(question.lessonId, (lessonCounts.get(question.lessonId) ?? 0) + 1);
    }
    const chapterLessons = COURSE_LESSONS.filter((lesson) => lesson.chapterId === quiz.chapterId);
    for (const lesson of chapterLessons) {
      if ((lessonCounts.get(lesson.id) ?? 0) < 2) {
        issues.push(`Quiz ${quiz.id} phải có ít nhất 2 question cho ${lesson.id}.`);
      }
    }
  }

  issues.push(...getAssessmentGradingIssues());
  issues.push(...getProgressSelectorFixtureIssues(COURSE_CHAPTERS, COURSE_QUIZZES));
  issues.push(...getProgressRepositoryFixtureIssues());

  return issues;
}

export function getAssessmentGradingIssues(): string[] {
  const issues: string[] = [];

  for (const quiz of COURSE_QUIZZES) {
    const questions = quiz.questionIds
      .map((questionId) => QUIZ_QUESTIONS.find((question) => question.id === questionId))
      .filter((question): question is QuizQuestion => question !== undefined);
    if (questions.length !== quiz.questionIds.length || questions.length === 0) continue;

    const correctAnswers = questions.map((question) => ({
      questionId: question.id,
      selectedOptionIds: getCorrectOptionIds(question),
    }));
    const wrongAnswers = questions.map((question) => ({
      questionId: question.id,
      selectedOptionIds: question.options
        .map((option) => option.id)
        .filter((optionId) => !getCorrectOptionIds(question).includes(optionId))
        .slice(0, 1),
    }));
    const oneCorrectAnswers = questions.map((question, index) => ({
      questionId: question.id,
      selectedOptionIds: index === 0
        ? getCorrectOptionIds(question)
        : question.options
          .map((option) => option.id)
          .filter((optionId) => !getCorrectOptionIds(question).includes(optionId))
          .slice(0, 1),
    }));

    const allCorrect = gradeQuiz(quiz, questions, correctAnswers);
    const allWrong = gradeQuiz(quiz, questions, wrongAnswers);
    const oneCorrect = gradeQuiz(quiz, questions, oneCorrectAnswers);

    if (allCorrect.correctCount !== questions.length || allCorrect.percentage !== 100) {
      issues.push(`Grading synthetic all-correct thất bại cho ${quiz.id}.`);
    }
    if (allWrong.correctCount !== 0 || allWrong.percentage !== 0) {
      issues.push(`Grading synthetic all-wrong thất bại cho ${quiz.id}.`);
    }
    if (oneCorrect.correctCount !== 1 || oneCorrect.totalQuestions !== questions.length) {
      issues.push(`Grading synthetic one-correct thất bại cho ${quiz.id}.`);
    }
  }

  return issues;
}

export function assertAssessmentDataIntegrity(): void {
  const issues = getAssessmentDataIssues();
  if (issues.length > 0) throw new Error(`Assessment data không hợp lệ:\n${issues.join("\n")}`);
}

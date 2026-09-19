import type { CourseChapter } from "@/data/course";
import type {
  AssessmentProgressState,
  Quiz,
  QuizAttempt,
  QuizProgressState,
} from "@/data/course/assessment";
import {
  getBestAttempt,
  getLatestAttempt,
  getQuizProgressState,
  getSubmittedAttemptsForQuiz,
} from "./selectors";

export interface ChapterPracticeSummary {
  chapter: CourseChapter;
  quiz: Quiz;
  status: QuizProgressState;
  attemptCount: number;
  latestAttempt?: QuizAttempt;
  bestAttempt?: QuizAttempt;
}

export interface RecentPracticeItem {
  chapter: CourseChapter;
  quiz: Quiz;
  attempt: QuizAttempt;
}

export interface CoursePracticeSummary {
  practicedChapterCount: number;
  totalChapterCount: number;
  totalAttemptCount: number;
  chapters: readonly ChapterPracticeSummary[];
  recentAttempts: readonly RecentPracticeItem[];
}

function timestampValue(value: string | undefined): number {
  if (!value) return 0;
  const parsed = Date.parse(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

export function formatPracticePercentage(score: number | undefined): string {
  if (score === undefined || !Number.isFinite(score)) return "—";
  return `${Math.round(score * 100)}%`;
}

export function getChapterPracticeSummary(
  state: AssessmentProgressState,
  chapter: CourseChapter,
  quiz: Quiz,
): ChapterPracticeSummary {
  const attempts = getSubmittedAttemptsForQuiz(state, quiz.id);
  return {
    chapter,
    quiz,
    status: getQuizProgressState(state, quiz),
    attemptCount: attempts.length,
    latestAttempt: getLatestAttempt(state, quiz.id),
    bestAttempt: getBestAttempt(state, quiz.id),
  };
}

export function getCoursePracticeSummary(
  state: AssessmentProgressState,
  chapters: readonly CourseChapter[],
  quizzes: readonly Quiz[],
): CoursePracticeSummary {
  const quizByChapter = new Map(quizzes.map((quiz) => [quiz.chapterId, quiz]));
  const chapterSummaries = chapters.flatMap((chapter) => {
    const quiz = quizByChapter.get(chapter.id);
    return quiz ? [getChapterPracticeSummary(state, chapter, quiz)] : [];
  });
  const recentAttempts = chapterSummaries
    .flatMap((summary) => {
      const attempts = getSubmittedAttemptsForQuiz(state, summary.quiz.id);
      return attempts.map((attempt) => ({ chapter: summary.chapter, quiz: summary.quiz, attempt }));
    })
    .sort((left, right) => {
      const dateDifference = timestampValue(right.attempt.submittedAt) - timestampValue(left.attempt.submittedAt);
      if (dateDifference !== 0) return dateDifference;
      return right.attempt.id.localeCompare(left.attempt.id);
    });

  return {
    practicedChapterCount: chapterSummaries.filter((summary) => summary.attemptCount > 0).length,
    totalChapterCount: chapters.length,
    totalAttemptCount: chapterSummaries.reduce((total, summary) => total + summary.attemptCount, 0),
    chapters: chapterSummaries,
    recentAttempts: recentAttempts.slice(0, 5),
  };
}

/** Small deterministic checks for the dashboard's selector contract. */
export function getProgressSummaryFixtureIssues(
  state: AssessmentProgressState,
  chapters: readonly CourseChapter[],
  quizzes: readonly Quiz[],
): string[] {
  const summary = getCoursePracticeSummary(state, chapters, quizzes);
  const issues: string[] = [];
  if (summary.totalChapterCount !== chapters.length) issues.push("summary chapter count mismatch");
  if (summary.practicedChapterCount > summary.totalChapterCount) issues.push("practiced chapter count exceeds total");
  if (summary.totalAttemptCount < summary.practicedChapterCount) issues.push("attempt count is below practiced chapter count");
  return issues;
}

/** Build-time selector contract checks; these fixtures never enter browser storage. */
export function getProgressSelectorFixtureIssues(
  chapters: readonly CourseChapter[],
  quizzes: readonly Quiz[],
): string[] {
  const firstQuiz = quizzes[0];
  const secondQuiz = quizzes[1];
  if (!firstQuiz || !secondQuiz) return ["progress selector fixtures require at least two quizzes"];
  const state: AssessmentProgressState = {
    version: 1,
    chapterProgress: [],
    attempts: [
      { id: "fixture-old", quizId: firstQuiz.id, startedAt: "2026-09-18T09:00:00Z", submittedAt: "2026-09-18T09:10:00Z", answers: [], score: 0.5, correctCount: 4, totalQuestions: 8 },
      { id: "fixture-best", quizId: firstQuiz.id, startedAt: "2026-09-18T10:00:00Z", submittedAt: "2026-09-18T10:10:00Z", answers: [], score: 0.75, correctCount: 6, totalQuestions: 8 },
      { id: "fixture-latest", quizId: firstQuiz.id, startedAt: "2026-09-18T11:00:00Z", submittedAt: "2026-09-18T11:10:00Z", answers: [], score: 0.625, correctCount: 5, totalQuestions: 8 },
      { id: "fixture-orphan", quizId: secondQuiz.id, startedAt: "2026-09-18T12:00:00Z", answers: [], score: 0.25, correctCount: 2, totalQuestions: 8 },
    ],
  };
  const summary = getCoursePracticeSummary(state, chapters, quizzes);
  const issues: string[] = [];
  const first = summary.chapters.find((item) => item.quiz.id === firstQuiz.id);
  const second = summary.chapters.find((item) => item.quiz.id === secondQuiz.id);
  if (!first || first.attemptCount !== 3 || first.latestAttempt?.id !== "fixture-latest" || first.bestAttempt?.id !== "fixture-best") {
    issues.push("progress selector latest/best fixture failed");
  }
  if (!second || second.attemptCount !== 0) issues.push("unsubmitted attempts must not count as practice");
  if (summary.practicedChapterCount !== 1 || summary.totalAttemptCount !== 3) {
    issues.push("progress selector course totals fixture failed");
  }
  return issues;
}

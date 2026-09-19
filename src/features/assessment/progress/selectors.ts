import { getQuizByChapterId } from "@/data/course/assessment/quizzes";
import type { ChapterId } from "@/data/course/types";
import type {
  AssessmentProgressState,
  Quiz,
  QuizAttempt,
  QuizId,
  QuizProgressState,
} from "@/data/course/assessment";

export function getAttemptsForQuiz(state: AssessmentProgressState, quizId: QuizId): readonly QuizAttempt[] {
  return state.attempts.filter((attempt) => attempt.quizId === quizId);
}

/** Submitted attempts are the only records that represent a completed practice session. */
export function getSubmittedAttemptsForQuiz(
  state: AssessmentProgressState,
  quizId: QuizId,
): readonly QuizAttempt[] {
  return getAttemptsForQuiz(state, quizId).filter((attempt) => Boolean(attempt.submittedAt));
}

function timestampValue(value: string): number {
  const parsed = Date.parse(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function compareAttemptDates(left: QuizAttempt, right: QuizAttempt): number {
  const leftValue = timestampValue(left.submittedAt ?? left.startedAt);
  const rightValue = timestampValue(right.submittedAt ?? right.startedAt);
  if (leftValue !== rightValue) return rightValue - leftValue;
  return (right.submittedAt ?? right.startedAt).localeCompare(left.submittedAt ?? left.startedAt);
}

export function getLatestAttempt(state: AssessmentProgressState, quizId: QuizId): QuizAttempt | undefined {
  return [...getSubmittedAttemptsForQuiz(state, quizId)].sort(compareAttemptDates)[0];
}

export function getBestAttempt(state: AssessmentProgressState, quizId: QuizId): QuizAttempt | undefined {
  return [...getSubmittedAttemptsForQuiz(state, quizId)].sort((left, right) => {
    const rightScore = right.score ?? -1;
    const leftScore = left.score ?? -1;
    if (rightScore !== leftScore) return rightScore - leftScore;
    return compareAttemptDates(left, right);
  })[0];
}

export function getQuizProgressState(state: AssessmentProgressState, quiz: Quiz): QuizProgressState {
  const attempts = getSubmittedAttemptsForQuiz(state, quiz.id);
  if (attempts.length === 0) return "not-attempted";
  if (quiz.passingScore !== undefined) {
    const bestAttempt = getBestAttempt(state, quiz.id);
    if ((bestAttempt?.score ?? -1) >= quiz.passingScore) return "passed";
  }
  return "attempted";
}

export function getChapterAssessmentState(
  state: AssessmentProgressState,
  chapterId: ChapterId,
): QuizProgressState {
  const quiz = getQuizByChapterId(chapterId);
  return quiz ? getQuizProgressState(state, quiz) : "not-attempted";
}

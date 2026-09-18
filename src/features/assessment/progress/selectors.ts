import { getQuizByChapterId } from "@/data/course/assessment";
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

export function getLatestAttempt(state: AssessmentProgressState, quizId: QuizId): QuizAttempt | undefined {
  return [...getAttemptsForQuiz(state, quizId)].sort((left, right) => {
    const leftDate = left.submittedAt ?? left.startedAt;
    const rightDate = right.submittedAt ?? right.startedAt;
    return rightDate.localeCompare(leftDate);
  })[0];
}

export function getBestAttempt(state: AssessmentProgressState, quizId: QuizId): QuizAttempt | undefined {
  return [...getAttemptsForQuiz(state, quizId)].sort((left, right) => {
    const rightScore = right.score ?? -1;
    const leftScore = left.score ?? -1;
    if (rightScore !== leftScore) return rightScore - leftScore;
    return (right.submittedAt ?? right.startedAt).localeCompare(left.submittedAt ?? left.startedAt);
  })[0];
}

export function getQuizProgressState(state: AssessmentProgressState, quiz: Quiz): QuizProgressState {
  const attempts = getAttemptsForQuiz(state, quiz.id);
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

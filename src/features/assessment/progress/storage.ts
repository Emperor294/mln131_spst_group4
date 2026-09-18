import type {
  AssessmentProgressState,
  ChapterProgress,
  QuizAnswer,
  QuizAttempt,
  QuizId,
  QuizProgressState,
} from "@/data/course/assessment";

export const PROGRESS_STORAGE_KEY = "socialism360-progress";
export const PROGRESS_STORAGE_VERSION = 1 as const;

export interface ProgressRepository {
  load(): AssessmentProgressState;
  save(state: AssessmentProgressState): boolean;
  clear(): void;
}

export const EMPTY_PROGRESS: AssessmentProgressState = {
  version: PROGRESS_STORAGE_VERSION,
  attempts: [],
  chapterProgress: [],
};

function getBrowserStorage(): Storage | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isQuizId(value: unknown): value is QuizId {
  return typeof value === "string" && /^quiz-ch0[1-7]$/.test(value);
}

function isProgressState(value: unknown): value is AssessmentProgressState {
  return isRecord(value)
    && value.version === PROGRESS_STORAGE_VERSION
    && Array.isArray(value.attempts)
    && Array.isArray(value.chapterProgress);
}

function normalizeAnswer(value: unknown): QuizAnswer | null {
  if (!isRecord(value) || typeof value.questionId !== "string" || !Array.isArray(value.selectedOptionIds)) return null;
  const selectedOptionIds = value.selectedOptionIds.filter((id): id is string => typeof id === "string");
  return { questionId: value.questionId as QuizAttempt["answers"][number]["questionId"], selectedOptionIds };
}

function normalizeAttempt(value: unknown): QuizAttempt | null {
  if (!isRecord(value) || typeof value.id !== "string" || !isQuizId(value.quizId) || typeof value.startedAt !== "string") return null;
  if (!Array.isArray(value.answers)) return null;
  const answers = value.answers.map(normalizeAnswer).filter((answer): answer is QuizAnswer => answer !== null);
  const attempt: QuizAttempt = { id: value.id, quizId: value.quizId, startedAt: value.startedAt, answers };
  if (typeof value.submittedAt === "string") attempt.submittedAt = value.submittedAt;
  if (typeof value.score === "number" && Number.isFinite(value.score)) attempt.score = value.score;
  if (typeof value.correctCount === "number" && Number.isInteger(value.correctCount)) attempt.correctCount = value.correctCount;
  if (typeof value.totalQuestions === "number" && Number.isInteger(value.totalQuestions)) attempt.totalQuestions = value.totalQuestions;
  return attempt;
}

function normalizeChapterProgress(value: unknown): ChapterProgress | null {
  if (!isRecord(value)
    || typeof value.chapterId !== "string"
    || !/^chapter-0[1-7]$/.test(value.chapterId)
    || !["not-attempted", "attempted", "passed"].includes(value.state as string)) return null;
  const progress: ChapterProgress = {
    chapterId: value.chapterId as ChapterProgress["chapterId"],
    state: value.state as QuizProgressState,
  };
  if (typeof value.latestAttemptId === "string") progress.latestAttemptId = value.latestAttemptId;
  if (typeof value.bestScore === "number" && Number.isFinite(value.bestScore)) progress.bestScore = value.bestScore;
  return progress;
}

function normalizeState(value: unknown): AssessmentProgressState {
  if (!isProgressState(value)) return EMPTY_PROGRESS;
  return {
    version: PROGRESS_STORAGE_VERSION,
    attempts: value.attempts.map(normalizeAttempt).filter((attempt): attempt is QuizAttempt => attempt !== null),
    chapterProgress: value.chapterProgress
      .map(normalizeChapterProgress)
      .filter((progress): progress is ChapterProgress => progress !== null),
  };
}

function toStorageEnvelope(state: AssessmentProgressState): AssessmentProgressState {
  return normalizeState({
    version: PROGRESS_STORAGE_VERSION,
    attempts: state.attempts,
    chapterProgress: state.chapterProgress,
  });
}

export function createLocalProgressRepository(storage: Storage | null = getBrowserStorage()): ProgressRepository {
  return {
    load() {
      if (!storage) return EMPTY_PROGRESS;
      try {
        return normalizeState(JSON.parse(storage.getItem(PROGRESS_STORAGE_KEY) ?? "null"));
      } catch {
        return EMPTY_PROGRESS;
      }
    },
    save(state) {
      if (!storage) return false;
      try {
        storage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(toStorageEnvelope(state)));
        return true;
      } catch {
        return false;
      }
    },
    clear() {
      try {
        storage?.removeItem(PROGRESS_STORAGE_KEY);
      } catch {
        // Storage can be unavailable in private browsing or a restricted iframe.
      }
    },
  };
}

export function loadLocalProgress(): AssessmentProgressState {
  return createLocalProgressRepository().load();
}

export function saveLocalProgress(state: AssessmentProgressState): boolean {
  return createLocalProgressRepository().save(state);
}

export function clearLocalProgress(): void {
  createLocalProgressRepository().clear();
}

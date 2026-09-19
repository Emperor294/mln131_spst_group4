"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { AssessmentProgressState, QuizAttempt } from "@/data/course/assessment";
import { EMPTY_PROGRESS, isLocalProgressStorageAvailable, loadLocalProgress, saveLocalProgress, clearLocalProgress } from "./storage";

interface AssessmentProgressContextValue {
  progress: AssessmentProgressState;
  /** True after the browser-local envelope has been read. */
  isHydrated: boolean;
  saveAttempt: (attempt: QuizAttempt) => boolean;
  persistenceError: boolean;
  clearProgress: () => void;
}

const AssessmentProgressContext = createContext<AssessmentProgressContextValue | null>(null);

export default function AssessmentProgressProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState<AssessmentProgressState>(EMPTY_PROGRESS);
  const [isHydrated, setIsHydrated] = useState(false);
  const [persistenceError, setPersistenceError] = useState(false);

  useEffect(() => {
    setProgress(loadLocalProgress());
    setPersistenceError(!isLocalProgressStorageAvailable());
    setIsHydrated(true);
  }, []);

  const saveAttempt = useCallback((attempt: QuizAttempt) => {
    const existingAttempt = progress.attempts.find((item) => item.id === attempt.id);
    if (existingAttempt?.submittedAt) return true;

    const next: AssessmentProgressState = {
      ...progress,
      attempts: progress.attempts.some((item) => item.id === attempt.id)
        ? progress.attempts.map((item) => item.id === attempt.id ? attempt : item)
        : [...progress.attempts, attempt],
    };
    const didPersist = saveLocalProgress(next);
    setProgress(next);
    setPersistenceError(!didPersist);
    return didPersist;
  }, [progress]);

  const clearProgress = useCallback(() => {
    clearLocalProgress();
    setProgress(EMPTY_PROGRESS);
    setPersistenceError(false);
  }, []);

  const value = useMemo(
    () => ({ progress, isHydrated, saveAttempt, persistenceError, clearProgress }),
    [progress, isHydrated, saveAttempt, persistenceError, clearProgress],
  );
  return <AssessmentProgressContext.Provider value={value}>{children}</AssessmentProgressContext.Provider>;
}

export function useAssessmentProgress(): AssessmentProgressContextValue {
  const context = useContext(AssessmentProgressContext);
  if (!context) throw new Error("useAssessmentProgress phải được dùng trong AssessmentProgressProvider.");
  return context;
}

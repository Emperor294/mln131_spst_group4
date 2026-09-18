"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { AssessmentProgressState, QuizAttempt } from "@/data/course/assessment";
import { EMPTY_PROGRESS, loadLocalProgress, saveLocalProgress, clearLocalProgress } from "./storage";

interface AssessmentProgressContextValue {
  progress: AssessmentProgressState;
  saveAttempt: (attempt: QuizAttempt) => void;
  clearProgress: () => void;
}

const AssessmentProgressContext = createContext<AssessmentProgressContextValue | null>(null);

export default function AssessmentProgressProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState<AssessmentProgressState>(EMPTY_PROGRESS);

  useEffect(() => {
    setProgress(loadLocalProgress());
  }, []);

  const saveAttempt = useCallback((attempt: QuizAttempt) => {
    setProgress((current) => {
      const existingAttempt = current.attempts.find((item) => item.id === attempt.id);
      if (existingAttempt?.submittedAt) return current;

      const next: AssessmentProgressState = {
        ...current,
        attempts: current.attempts.some((item) => item.id === attempt.id)
          ? current.attempts.map((item) => item.id === attempt.id ? attempt : item)
          : [...current.attempts, attempt],
      };
      saveLocalProgress(next);
      return next;
    });
  }, []);

  const clearProgress = useCallback(() => {
    clearLocalProgress();
    setProgress(EMPTY_PROGRESS);
  }, []);

  const value = useMemo(() => ({ progress, saveAttempt, clearProgress }), [progress, saveAttempt, clearProgress]);
  return <AssessmentProgressContext.Provider value={value}>{children}</AssessmentProgressContext.Provider>;
}

export function useAssessmentProgress(): AssessmentProgressContextValue {
  const context = useContext(AssessmentProgressContext);
  if (!context) throw new Error("useAssessmentProgress phải được dùng trong AssessmentProgressProvider.");
  return context;
}

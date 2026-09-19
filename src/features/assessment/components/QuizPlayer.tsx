"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import type { CourseChapter } from "@/data/course";
import type { Quiz, QuizAnswer, QuizAttempt, QuizGradeResult, QuizQuestion } from "@/data/course/assessment";
import { gradeQuiz } from "@/features/assessment/grading/grade-quiz";
import { getBestAttempt, getSubmittedAttemptsForQuiz } from "@/features/assessment/progress/selectors";
import { useAssessmentProgress } from "@/features/assessment/progress";
import QuizIntro from "./QuizIntro";
import QuizQuestionView from "./QuizQuestionView";
import QuizResults from "./QuizResults";

type PlayerPhase = "intro" | "answering" | "results";
type AnswerMap = Readonly<Record<string, string | undefined>>;

interface QuizPlayerProps {
  chapter: CourseChapter;
  quiz: Quiz;
  questions: readonly QuizQuestion[];
}

function createAttemptId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") return crypto.randomUUID();
  return `attempt-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export default function QuizPlayer({ chapter, quiz, questions }: QuizPlayerProps) {
  const { progress, saveAttempt, persistenceError } = useAssessmentProgress();
  const [phase, setPhase] = useState<PlayerPhase>("intro");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [submitNotice, setSubmitNotice] = useState<{ unanswered: number } | null>(null);
  const [grade, setGrade] = useState<QuizGradeResult | null>(null);
  const [attempt, setAttempt] = useState<QuizAttempt | null>(null);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const startedAtRef = useRef<string | null>(null);
  const attemptIdRef = useRef<string | null>(null);
  const isSubmittingRef = useRef(false);

  const attempts = getSubmittedAttemptsForQuiz(progress, quiz.id);
  const bestAttempt = getBestAttempt(progress, quiz.id);

  const startQuiz = () => {
    startedAtRef.current = new Date().toISOString();
    attemptIdRef.current = createAttemptId();
    isSubmittingRef.current = false;
    setAnswers({});
    setCurrentIndex(0);
    setSubmitNotice(null);
    setGrade(null);
    setAttempt(null);
    setSubmissionError(null);
    setPhase("answering");
  };

  const selectAnswer = (questionId: string, optionId: string) => {
    if (phase !== "answering") return;
    setAnswers((current) => ({ ...current, [questionId]: optionId }));
  };

  const navigateTo = (index: number) => {
    if (index < 0 || index >= questions.length) return;
    setCurrentIndex(index);
  };

  const requestSubmit = () => {
    const unanswered = questions.filter((question) => !answers[question.id]).length;
    setSubmitNotice({ unanswered });
  };

  const submitQuiz = () => {
    if (phase !== "answering" || isSubmittingRef.current) return;
    isSubmittingRef.current = true;
    const quizAnswers: QuizAnswer[] = questions.map((question) => ({
      questionId: question.id,
      selectedOptionIds: answers[question.id] ? [answers[question.id] as string] : [],
    }));

    try {
      const nextGrade = gradeQuiz(quiz, questions, quizAnswers);
      const nextAttempt: QuizAttempt = {
        id: attemptIdRef.current ?? createAttemptId(),
        quizId: quiz.id,
        startedAt: startedAtRef.current ?? new Date().toISOString(),
        submittedAt: new Date().toISOString(),
        answers: quizAnswers,
        score: nextGrade.score,
        correctCount: nextGrade.correctCount,
        totalQuestions: nextGrade.totalQuestions,
      };
      saveAttempt(nextAttempt);
      setGrade(nextGrade);
      setAttempt(nextAttempt);
      setSubmitNotice(null);
      setPhase("results");
    } catch {
      isSubmittingRef.current = false;
      setSubmissionError("Không thể chấm lượt luyện tập này. Bạn có thể quay lại chương và thử lại.");
    }
  };

  if (questions.length === 0) {
    return (
      <section className="quiz-card quiz-error" role="alert">
        <p className="course-eyebrow">Bài luyện tập</p>
        <h1>Chưa có câu hỏi khả dụng</h1>
        <p>Nội dung bài học vẫn sẵn sàng để bạn khám phá trong chương.</p>
        <Link href={`/chapters/${chapter.id}`} className="quiz-button quiz-button--primary">Quay về chương</Link>
      </section>
    );
  }

  if (submissionError) {
    return (
      <section className="quiz-card quiz-error" role="alert">
        <p className="course-eyebrow">Bài luyện tập</p>
        <h1>Không thể hoàn tất lượt luyện tập</h1>
        <p>{submissionError}</p>
        <div className="quiz-actions">
          <button type="button" className="quiz-button quiz-button--primary" onClick={() => setSubmissionError(null)}>Quay lại bài làm</button>
          <Link href={`/chapters/${chapter.id}`} className="quiz-button quiz-button--secondary">Quay về chương</Link>
        </div>
      </section>
    );
  }

  return (
    <div className="quiz-player">
      {phase === "intro" && (
        <QuizIntro
          chapter={chapter}
          quiz={quiz}
          attemptCount={attempts.length}
          bestAttempt={bestAttempt}
          onStart={startQuiz}
        />
      )}
      {phase === "answering" && (
        <QuizQuestionView
          questions={questions}
          currentIndex={currentIndex}
          answers={answers}
          submitNotice={submitNotice}
          onSelect={selectAnswer}
          onNavigate={navigateTo}
          onRequestSubmit={requestSubmit}
          onCancelSubmit={() => setSubmitNotice(null)}
          onConfirmSubmit={submitQuiz}
        />
      )}
      {phase === "results" && grade && attempt && (
        <QuizResults
          chapter={chapter}
          quiz={quiz}
          questions={questions}
          grade={grade}
          attempt={attempt}
          persistenceError={persistenceError}
          onRetake={startQuiz}
        />
      )}
    </div>
  );
}

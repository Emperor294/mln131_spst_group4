"use client";

import type { QuizQuestion } from "@/data/course/assessment";
import { useEffect, useRef } from "react";

interface QuizQuestionViewProps {
  questions: readonly QuizQuestion[];
  currentIndex: number;
  answers: Readonly<Record<string, string | undefined>>;
  submitNotice: { unanswered: number } | null;
  onSelect: (questionId: string, optionId: string) => void;
  onNavigate: (index: number) => void;
  onRequestSubmit: () => void;
  onCancelSubmit: () => void;
  onConfirmSubmit: () => void;
}

export default function QuizQuestionView({
  questions,
  currentIndex,
  answers,
  submitNotice,
  onSelect,
  onNavigate,
  onRequestSubmit,
  onCancelSubmit,
  onConfirmSubmit,
}: QuizQuestionViewProps) {
  const question = questions[currentIndex];
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, [currentIndex]);

  if (!question) return null;

  const selectedOptionId = answers[question.id];
  const answeredCount = questions.filter((item) => answers[item.id]).length;
  const isLastQuestion = currentIndex === questions.length - 1;

  return (
    <section className="quiz-card quiz-question-view" aria-labelledby={`quiz-question-${question.id}`}>
      <div className="quiz-progress-row">
        <p className="course-eyebrow">Câu {currentIndex + 1} / {questions.length}</p>
        <p aria-live="polite">Đã trả lời {answeredCount} / {questions.length}</p>
      </div>
      <div className="quiz-progress-track" role="progressbar" aria-valuemin={0} aria-valuemax={questions.length} aria-valuenow={answeredCount} aria-label="Số câu đã trả lời">
        <span style={{ width: `${(answeredCount / questions.length) * 100}%` }} />
      </div>

      <nav className="quiz-navigator" aria-label="Điều hướng câu hỏi">
        <ol>
          {questions.map((item, index) => {
            const isAnswered = Boolean(answers[item.id]);
            const isCurrent = index === currentIndex;
            return (
              <li key={item.id}>
                <button
                  type="button"
                  className={isCurrent ? "is-current" : undefined}
                  aria-current={isCurrent ? "step" : undefined}
                  aria-label={`Câu ${index + 1}, ${isAnswered ? "đã trả lời" : "chưa trả lời"}`}
                  onClick={() => onNavigate(index)}
                >
                  <span aria-hidden="true">{index + 1}</span>
                  <span className="sr-only">{isAnswered ? "Đã trả lời" : "Chưa trả lời"}</span>
                </button>
              </li>
            );
          })}
        </ol>
      </nav>

      <div className="quiz-question-heading">
        <span aria-hidden="true">{String(currentIndex + 1).padStart(2, "0")}</span>
        <h2 ref={headingRef} id={`quiz-question-${question.id}`} tabIndex={-1}>{question.prompt}</h2>
      </div>

      <fieldset className="quiz-options">
        <legend className="sr-only">Chọn một đáp án</legend>
        {question.options.map((option, index) => (
          <label key={option.id} className={`quiz-option${selectedOptionId === option.id ? " is-selected" : ""}`}>
            <input
              type="radio"
              name={`question-${question.id}`}
              value={option.id}
              checked={selectedOptionId === option.id}
              onChange={() => onSelect(question.id, option.id)}
            />
            <span className="quiz-option__letter" aria-hidden="true">{String.fromCharCode(65 + index)}</span>
            <span className="quiz-option__label">{option.label}</span>
          </label>
        ))}
      </fieldset>

      {submitNotice && (
        <div className="quiz-submit-notice" role="alert">
          <strong>{submitNotice.unanswered > 0 ? `Bạn còn ${submitNotice.unanswered} câu chưa trả lời.` : "Kiểm tra lần cuối trước khi nộp bài."}</strong>
          <p>Sau khi nộp, lượt làm này sẽ được khóa để bạn xem lại đáp án và lời giải.</p>
          <div className="quiz-actions">
            <button type="button" className="quiz-button quiz-button--secondary" onClick={onCancelSubmit}>
              {submitNotice.unanswered > 0 ? "Quay lại hoàn thành" : "Tiếp tục làm bài"}
            </button>
            <button type="button" className="quiz-button quiz-button--primary" onClick={onConfirmSubmit}>
              {submitNotice.unanswered > 0 ? "Nộp bài dù chưa hoàn thành" : "Xác nhận nộp bài"}
            </button>
          </div>
        </div>
      )}

      <div className="quiz-navigation">
        <button type="button" className="quiz-button quiz-button--secondary" onClick={() => onNavigate(currentIndex - 1)} disabled={currentIndex === 0}>
          ← Câu trước
        </button>
        {isLastQuestion ? (
          <button type="button" className="quiz-button quiz-button--primary" onClick={onRequestSubmit}>
            Nộp bài
          </button>
        ) : (
          <button type="button" className="quiz-button quiz-button--primary" onClick={() => onNavigate(currentIndex + 1)}>
            Câu tiếp →
          </button>
        )}
      </div>
    </section>
  );
}

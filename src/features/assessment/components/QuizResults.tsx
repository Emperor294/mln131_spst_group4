"use client";

import { Check, CircleHelp, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { CourseChapter } from "@/data/course";
import SourceList from "@/features/course/components/SourceList";
import type {
  Quiz,
  QuizAttempt,
  QuizGradeResult,
  QuizQuestion,
} from "@/data/course/assessment";

interface QuizResultsProps {
  chapter: CourseChapter;
  quiz: Quiz;
  questions: readonly QuizQuestion[];
  grade: QuizGradeResult;
  attempt: QuizAttempt;
  persistenceError: boolean;
  onRetake: () => void;
}

function getResultLabel(result: QuizGradeResult["questionResults"][number]) {
  if (result.isCorrect) return "Đúng";
  if (result.selectedOptionIds.length === 0) return "Chưa trả lời";
  return "Chưa đúng";
}

export default function QuizResults({ chapter, quiz, questions, grade, attempt, persistenceError, onRetake }: QuizResultsProps) {
  const [showReview, setShowReview] = useState(true);
  const resultHeadingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    resultHeadingRef.current?.focus();
  }, []);

  return (
    <section className="quiz-results" aria-labelledby="quiz-results-title">
      <div className="quiz-card quiz-results__summary">
        <p className="course-eyebrow">Chương {chapter.number} · Kết quả luyện tập</p>
        <h1 ref={resultHeadingRef} id="quiz-results-title" tabIndex={-1}>Kết quả luyện tập</h1>
        <p className="quiz-results__quiz-title">{quiz.title}</p>
        <div className="quiz-score" aria-label={`${grade.correctCount} trên ${grade.totalQuestions} câu đúng, ${grade.percentage} phần trăm`}>
          <strong>{grade.correctCount} / {grade.totalQuestions}</strong>
          <span>{grade.percentage}%</span>
        </div>
        <p className="quiz-results__summary-copy">
          Bạn trả lời đúng {grade.correctCount}/{grade.totalQuestions} câu.
          {grade.totalQuestions - grade.correctCount > 0 ? ` ${grade.totalQuestions - grade.correctCount} câu cần xem lại.` : ""}
        </p>
        {grade.questionResults.some((result) => result.selectedOptionIds.length === 0) && (
          <p className="quiz-results__unanswered">Có câu chưa trả lời; các câu này được tính là chưa đúng trong lượt luyện tập.</p>
        )}
        {persistenceError && (
          <p className="quiz-storage-notice" role="status">
            Kết quả vẫn hiển thị trong phiên này, nhưng không thể lưu trên thiết bị.
          </p>
        )}
        <p className="quiz-results__attempt-id">Lượt luyện tập đã hoàn tất.</p>
        <div className="quiz-actions">
          <button type="button" className="quiz-button quiz-button--primary" onClick={() => setShowReview((visible) => !visible)}>
            {showReview ? "Ẩn phần xem lại" : "Xem lại đáp án"}
          </button>
          <button type="button" className="quiz-button quiz-button--secondary" onClick={onRetake}>Làm lại</button>
          <Link href={`/chapters/${chapter.id}`} className="quiz-button quiz-button--secondary">Quay về chương</Link>
        </div>
      </div>

      {showReview && (
        <section className="quiz-card quiz-review" aria-labelledby="quiz-review-title">
          <div className="quiz-review__heading">
            <p className="course-eyebrow">Đối chiếu từng câu</p>
            <h2 id="quiz-review-title">Xem lại đáp án và lời giải</h2>
            <p>Đáp án và giải thích dưới đây chỉ xuất hiện sau khi nộp bài.</p>
          </div>
          <ol className="quiz-review-list">
            {grade.questionResults.map((result, index) => {
              const question = questions.find((item) => item.id === result.questionId);
              if (!question) return null;
              const resultLabel = getResultLabel(result);
              return (
                <li key={question.id} id={question.id} className={`quiz-review-item ${result.isCorrect ? "is-correct" : "is-incorrect"}`}>
                  <div className="quiz-review-item__header">
                    <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <p className="course-eyebrow">Câu {index + 1}</p>
                      <h3>{question.prompt}</h3>
                    </div>
                    <strong className="quiz-review-item__status">
                      {result.isCorrect ? <Check aria-hidden="true" size={16} /> : result.selectedOptionIds.length === 0 ? <CircleHelp aria-hidden="true" size={16} /> : <X aria-hidden="true" size={16} />}
                      {resultLabel}
                    </strong>
                  </div>
                  <ul className="quiz-review-options">
                    {question.options.map((option, optionIndex) => {
                      const isSelected = result.selectedOptionIds.includes(option.id);
                      const isCorrect = result.correctOptionIds.includes(option.id);
                      const optionState = isCorrect ? "is-correct" : isSelected ? "is-selected" : "";
                      return (
                        <li key={option.id} className={optionState}>
                          <span className="quiz-option__letter" aria-hidden="true">{String.fromCharCode(65 + optionIndex)}</span>
                          <span className="quiz-option__label">{option.label}</span>
                          <span className="quiz-review-option__tags">
                            {isSelected && <span className="quiz-review-tag">Bạn đã chọn</span>}
                            {isCorrect && <span className="quiz-review-tag quiz-review-tag--correct">Đáp án đúng</span>}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                  <div className="quiz-explanation">
                    <p className="course-eyebrow">Lời giải</p>
                    <p>{question.explanation}</p>
                  </div>
                  <SourceList sourceRefs={question.sourceRefs} headingLevel="h3" />
                </li>
              );
            })}
          </ol>
          <p className="quiz-review__immutability">Lượt luyện tập này đã được khóa. Bạn có thể bắt đầu một lượt mới bất cứ lúc nào.</p>
        </section>
      )}
      <p className="sr-only">Mã lượt luyện tập: {attempt.id}</p>
    </section>
  );
}

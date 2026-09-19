"use client";

import Link from "next/link";
import type { CourseChapter } from "@/data/course";
import type { Quiz, QuizAttempt } from "@/data/course/assessment";

interface QuizIntroProps {
  chapter: CourseChapter;
  quiz: Quiz;
  attemptCount: number;
  bestAttempt?: QuizAttempt;
  onStart: () => void;
}

export default function QuizIntro({ chapter, quiz, attemptCount, bestAttempt, onStart }: QuizIntroProps) {
  return (
    <section className="quiz-card quiz-intro" aria-labelledby="quiz-player-title">
      <div className="quiz-intro__heading">
        <p className="course-eyebrow">Chương {chapter.number} · Luyện tập</p>
        <h1 id="quiz-player-title">{quiz.title}</h1>
        <p>{quiz.description}</p>
      </div>
      <div className="quiz-intro__details" aria-label="Thông tin bài luyện tập">
        <div><span>{quiz.questionIds.length.toString().padStart(2, "0")}</span><strong>Câu hỏi</strong></div>
        <div><span>○</span><strong>Một lựa chọn</strong></div>
        <div><span>∞</span><strong>Không giới hạn thời gian</strong></div>
      </div>
      <p className="quiz-intro__note">
        Đây là bài luyện tập tự học. Sau khi nộp, bạn sẽ xem được đáp án, lời giải và nguồn giáo trình cho từng câu.
      </p>
      {attemptCount > 0 && (
        <p className="quiz-intro__history" role="status">
          Bạn đã luyện tập {attemptCount} lần.
          {bestAttempt?.correctCount !== undefined && bestAttempt.totalQuestions !== undefined
            ? ` Điểm cao nhất: ${bestAttempt.correctCount}/${bestAttempt.totalQuestions}.`
            : ""}
        </p>
      )}
      <div className="quiz-actions">
        <button type="button" className="quiz-button quiz-button--primary" onClick={onStart}>
          Bắt đầu luyện tập
        </button>
        <Link href={`/chapters/${chapter.id}`} className="quiz-button quiz-button--secondary">
          Quay về chương
        </Link>
      </div>
    </section>
  );
}

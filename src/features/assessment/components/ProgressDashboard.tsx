"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { COURSE_CHAPTERS } from "@/data/course/chapters";
import { COURSE_QUIZZES } from "@/data/course/assessment/quizzes";
import {
  formatPracticePercentage,
  getCoursePracticeSummary,
  useAssessmentProgress,
} from "@/features/assessment/progress";

function formatAttemptScore(attempt: { correctCount?: number; totalQuestions?: number; score?: number }): string {
  if (attempt.correctCount !== undefined && attempt.totalQuestions !== undefined) {
    return `${attempt.correctCount} / ${attempt.totalQuestions}`;
  }
  return formatPracticePercentage(attempt.score);
}

function formatAttemptDate(value: string | undefined): string {
  if (!value || !Number.isFinite(Date.parse(value))) return "Thời điểm chưa xác định";
  return new Intl.DateTimeFormat("vi-VN", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(value));
}

export default function ProgressDashboard() {
  const { progress, isHydrated, persistenceError, clearProgress } = useAssessmentProgress();
  const [isResetOpen, setIsResetOpen] = useState(false);
  const resetTriggerRef = useRef<HTMLButtonElement>(null);
  const cancelResetRef = useRef<HTMLButtonElement>(null);
  const hadResetDialogRef = useRef(false);

  const summary = useMemo(
    () => getCoursePracticeSummary(progress, COURSE_CHAPTERS, COURSE_QUIZZES),
    [progress],
  );

  useEffect(() => {
    if (!isResetOpen) {
      if (hadResetDialogRef.current) resetTriggerRef.current?.focus();
      return;
    }
    hadResetDialogRef.current = true;
    cancelResetRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsResetOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isResetOpen]);

  if (!isHydrated) {
    return (
      <main className="course-page progress-page" aria-busy="true">
        <div className="course-container progress-page__shell">
          <p className="course-eyebrow">SOCIALISM 360 · Tiến độ</p>
          <h1 className="progress-loading__title">Tiến độ luyện tập</h1>
          <p className="progress-loading">Đang đọc tiến độ được lưu cục bộ…</p>
        </div>
      </main>
    );
  }

  const hasAttempts = summary.totalAttemptCount > 0;

  return (
    <main className="course-page progress-page">
      <header className="progress-hero">
        <div className="course-grid" aria-hidden="true" />
        <div className="course-container progress-hero__content">
          <p className="course-eyebrow">SOCIALISM 360 · Practice record</p>
          <h1>Tiến độ<br /><span>luyện tập</span></h1>
          <p className="progress-hero__intro">
            Xem lại lịch sử luyện tập của bảy chương. Đây là thông tin tự học được lưu trên trình duyệt, không phải bảng điểm chính thức.
          </p>
        </div>
      </header>

      <section className="progress-section" aria-labelledby="progress-summary-title">
        <div className="course-container">
          <div className="progress-summary-heading">
            <div>
              <p className="course-eyebrow">Tổng quan</p>
              <h2 id="progress-summary-title">Lịch sử thực hành</h2>
            </div>
            <button
              ref={resetTriggerRef}
              type="button"
              className="progress-reset-button"
              onClick={() => setIsResetOpen(true)}
              disabled={!hasAttempts}
            >
              Xóa lịch sử luyện tập
            </button>
          </div>

          {persistenceError && (
            <p className="progress-storage-notice" role="status">
              Trình duyệt hiện không thể lưu tiến độ lâu dài. Kết quả trong phiên này vẫn được hiển thị.
            </p>
          )}

          <dl className="progress-metrics">
            <div><dt>Chương đã luyện tập</dt><dd>{summary.practicedChapterCount} / {summary.totalChapterCount}</dd></div>
            <div><dt>Tổng lượt làm</dt><dd>{summary.totalAttemptCount}</dd></div>
            <div><dt>Chế độ lưu trữ</dt><dd>Cục bộ</dd></div>
          </dl>

          {!hasAttempts && (
            <div className="progress-empty" role="status">
              <p className="course-eyebrow">Chưa có dữ liệu luyện tập</p>
              <h2>Bạn chưa có lượt luyện tập nào.</h2>
              <p>Bắt đầu từ bất kỳ chương nào để đọc lời giải và nguồn giáo trình sau khi nộp bài.</p>
              <Link href="/chapters" className="quiz-button quiz-button--primary">Khám phá các chương</Link>
            </div>
          )}

          <ol className="progress-chapter-grid" aria-label="Tiến độ luyện tập theo chương">
            {summary.chapters.map((chapterSummary) => {
              const latest = chapterSummary.latestAttempt;
              const best = chapterSummary.bestAttempt;
              const attempted = chapterSummary.attemptCount > 0;
              return (
                <li key={chapterSummary.chapter.id} className={`progress-chapter-card ${attempted ? "is-attempted" : ""}`}>
                  <div className="progress-chapter-card__topline">
                    <span>{String(chapterSummary.chapter.number).padStart(2, "0")}</span>
                    <span>{attempted ? "Đã luyện tập" : "Chưa luyện tập"}</span>
                  </div>
                  <h3>{chapterSummary.chapter.title}</h3>
                  {attempted && latest && best ? (
                    <dl className="progress-chapter-card__details">
                      <div><dt>Lượt làm</dt><dd>{chapterSummary.attemptCount}</dd></div>
                      <div><dt>Gần nhất</dt><dd>{formatAttemptScore(latest)} <small>{formatPracticePercentage(latest.score)}</small></dd></div>
                      <div><dt>Cao nhất</dt><dd>{formatAttemptScore(best)} <small>{formatPracticePercentage(best.score)}</small></dd></div>
                    </dl>
                  ) : (
                    <p className="progress-chapter-card__empty">Chưa có lượt luyện tập được lưu.</p>
                  )}
                  <div className="progress-chapter-card__actions">
                    <Link href={`/chapters/${chapterSummary.chapter.id}/quiz`} className="quiz-button quiz-button--primary">
                      {attempted ? "Luyện tập lại" : "Bắt đầu luyện tập"}
                    </Link>
                    <Link href={`/chapters/${chapterSummary.chapter.id}`} className="progress-text-link">Xem chương</Link>
                  </div>
                </li>
              );
            })}
          </ol>

          {hasAttempts && (
            <section className="progress-recent" aria-labelledby="progress-recent-title">
              <div className="progress-section-heading">
                <p className="course-eyebrow">Hoạt động gần đây</p>
                <h2 id="progress-recent-title">Năm lượt luyện tập mới nhất</h2>
              </div>
              <ol className="progress-recent-list">
                {summary.recentAttempts.map(({ attempt, chapter }) => (
                  <li key={attempt.id}>
                    <Link href={`/chapters/${chapter.id}/quiz`}>
                      <span><strong>Chương {chapter.number}</strong>{chapter.title}</span>
                      <span><strong>{formatAttemptScore(attempt)}</strong>{formatAttemptDate(attempt.submittedAt)}</span>
                    </Link>
                  </li>
                ))}
              </ol>
            </section>
          )}

          <p className="progress-privacy-note">
            Tiến độ được lưu cục bộ trên trình duyệt này. Không cần tài khoản và dữ liệu không được đồng bộ lên đám mây.
          </p>
        </div>
      </section>

      {isResetOpen && (
        <div className="progress-dialog-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setIsResetOpen(false); }}>
          <section className="progress-dialog" role="dialog" aria-modal="true" aria-labelledby="progress-reset-title" aria-describedby="progress-reset-description">
            <p className="course-eyebrow">Xác nhận thao tác</p>
            <h2 id="progress-reset-title">Xóa lịch sử luyện tập?</h2>
            <p id="progress-reset-description">Tất cả lượt làm được lưu trên trình duyệt này sẽ bị xóa. Nội dung học tập không bị ảnh hưởng và thao tác này không thể hoàn tác trên thiết bị hiện tại.</p>
            <div className="quiz-actions">
              <button type="button" ref={cancelResetRef} className="quiz-button quiz-button--secondary" onClick={() => setIsResetOpen(false)}>Hủy</button>
              <button type="button" className="quiz-button quiz-button--primary" onClick={() => { clearProgress(); setIsResetOpen(false); }}>Xóa lịch sử</button>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}

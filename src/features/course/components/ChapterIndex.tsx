"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { COURSE_CHAPTERS } from "@/data/course/chapters";
import { COURSE_QUIZZES } from "@/data/course/assessment/quizzes";
import { AssessmentProgressProvider, getCoursePracticeSummary, useAssessmentProgress } from "@/features/assessment/progress";
import { CHAPTER_VISUAL_IDENTITIES } from "@/features/course/chapter-visuals";
import ContentStatusLabel from "./ContentStatusLabel";

function ChapterIndexContent() {
  const { progress, isHydrated } = useAssessmentProgress();
  const summary = getCoursePracticeSummary(progress, COURSE_CHAPTERS, COURSE_QUIZZES);
  const summaryByChapter = new Map(summary.chapters.map((item) => [item.chapter.id, item]));

  return (
    <ol className="course-index" aria-label="Danh sách bảy chương MLN131">
      {COURSE_CHAPTERS.map((chapter) => {
        const visual = CHAPTER_VISUAL_IDENTITIES[chapter.id];
        const chapterSummary = summaryByChapter.get(chapter.id);
        const hasAttempts = isHydrated && (chapterSummary?.attemptCount ?? 0) > 0;
        return (
          <li key={chapter.id} className="course-index__item" data-featured={chapter.id === "chapter-05" || undefined}>
            <Link href={`/chapters/${chapter.id}`} className="course-index__link">
              <span className="course-index__number">{chapter.number.toString().padStart(2, "0")}</span>
              <span className="course-index__content">
                <span className="course-index__label">{visual.label}</span>
                <strong>{chapter.title}</strong>
                <ContentStatusLabel status={chapter.status} />
                {isHydrated && (
                  <span className="course-index__practice" aria-label={hasAttempts ? `Đã luyện tập ${chapterSummary?.attemptCount ?? 0} lượt` : "Chưa luyện tập"}>
                    {hasAttempts ? `Đã luyện tập · ${chapterSummary?.attemptCount} lượt` : "Chưa luyện tập"}
                  </span>
                )}
              </span>
              <span className="course-index__meta">
                <span>{visual.indexLabel}</span>
                <ArrowUpRight aria-hidden="true" size={22} />
              </span>
            </Link>
          </li>
        );
      })}
    </ol>
  );
}

export default function ChapterIndex() {
  return (
    <AssessmentProgressProvider>
      <ChapterIndexContent />
    </AssessmentProgressProvider>
  );
}

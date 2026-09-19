import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SITE_CONFIG } from "@/config/site";
import {
  assertCourseDataIntegrity,
  COURSE_CHAPTERS,
  getChapterById,
} from "@/data/course";
import { getQuizByChapterId, getQuizQuestionById } from "@/data/course/assessment";
import AllianceMap from "@/features/course/chapter-five/AllianceMap";
import ChapterHero from "@/features/course/components/ChapterHero";
import ChapterLearningContent from "@/features/course/components/ChapterLearningContent";
import ChapterNavigation from "@/features/course/components/ChapterNavigation";
import LessonList from "@/features/course/components/LessonList";
import RelatedArtifacts from "@/features/course/components/RelatedArtifacts";
import SourceList from "@/features/course/components/SourceList";
import { generateSEOMetadata } from "@/lib/seo";

interface ChapterPageProps {
  params: Promise<{ chapterId: string }>;
}

export function generateStaticParams() {
  return COURSE_CHAPTERS.map((chapter) => ({ chapterId: chapter.id }));
}

export async function generateMetadata({ params }: ChapterPageProps): Promise<Metadata> {
  const { chapterId } = await params;
  const chapter = getChapterById(chapterId);
  if (!chapter) return { title: `Không tìm thấy chương | ${SITE_CONFIG.brand}` };

  return generateSEOMetadata({
    title: `Chương ${chapter.number} · ${chapter.title}`,
    description: `Cấu trúc học tập Chương ${chapter.number} trong học phần ${SITE_CONFIG.academicTitle}.`,
    canonical: `/chapters/${chapter.id}`,
  });
}

export default async function ChapterPage({ params }: ChapterPageProps) {
  assertCourseDataIntegrity();
  const { chapterId } = await params;
  const chapter = getChapterById(chapterId);
  if (!chapter) notFound();

  const hasReviewedOverview = chapter.status !== "placeholder" && !chapter.description.startsWith("[");
  const quiz = getQuizByChapterId(chapter.id);
  const quizAvailable = Boolean(
    quiz?.status === "available"
      && quiz.questionIds.length > 0
      && quiz.questionIds.every((questionId) => getQuizQuestionById(questionId)),
  );

  return (
    <article className="chapter-page">
      <ChapterHero chapter={chapter} />
      <div className="course-container chapter-page__content">
        <section className="chapter-overview" aria-labelledby="chapter-overview-title">
          <div className="chapter-overview__heading">
            <p className="course-eyebrow">Tổng quan</p>
            <h2 id="chapter-overview-title">Giới thiệu chương</h2>
          </div>
          {hasReviewedOverview ? (
            <p className="chapter-overview__copy">{chapter.description}</p>
          ) : (
            <div className="chapter-overview__placeholder">
              <span aria-hidden="true">IN REVIEW</span>
              <p>Nội dung chi tiết đang được cập nhật và đối chiếu với tài liệu MLN131 của học kỳ hiện tại.</p>
            </div>
          )}
        </section>

        <section className="chapter-outline" aria-labelledby="chapter-outline-title">
          <div className="course-section-heading">
            <p className="course-eyebrow">Cấu trúc học tập</p>
            <h2 id="chapter-outline-title">Danh sách bài học</h2>
            <span>{chapter.lessons.length.toString().padStart(2, "0")} bài học hiện có</span>
          </div>
          <LessonList lessons={chapter.lessons} />
        </section>

        <ChapterLearningContent lessons={chapter.lessons} />
        {chapter.id === "chapter-05" && <AllianceMap />}
        <RelatedArtifacts chapterId={chapter.id} />
        {quizAvailable && quiz && (
          <section className="chapter-quiz-cta" aria-labelledby="chapter-quiz-cta-title">
            <div>
              <p className="course-eyebrow">Luyện tập sau bài học</p>
              <h2 id="chapter-quiz-cta-title">Củng cố nội dung chương</h2>
              <p>{quiz.questionIds.length} câu hỏi trắc nghiệm, có giải thích và nguồn giáo trình sau khi nộp bài.</p>
            </div>
            <Link href={`/chapters/${chapter.id}/quiz`} className="quiz-button quiz-button--primary">
              Luyện tập chương →
            </Link>
          </section>
        )}
        <SourceList sourceRefs={chapter.sourceRefs} />
        <ChapterNavigation chapter={chapter} />
      </div>
    </article>
  );
}

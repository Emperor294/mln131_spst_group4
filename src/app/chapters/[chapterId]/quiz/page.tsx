import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SITE_CONFIG } from "@/config/site";
import { assertCourseDataIntegrity, COURSE_CHAPTERS, getChapterById } from "@/data/course";
import { getQuizByChapterId } from "@/data/course/assessment";
import { generateSEOMetadata } from "@/lib/seo";

interface QuizPageProps {
  params: Promise<{ chapterId: string }>;
}

export function generateStaticParams() {
  return COURSE_CHAPTERS.map((chapter) => ({ chapterId: chapter.id }));
}

export async function generateMetadata({ params }: QuizPageProps): Promise<Metadata> {
  const { chapterId } = await params;
  const chapter = getChapterById(chapterId);
  if (!chapter) return { title: `Không tìm thấy bài luyện tập | ${SITE_CONFIG.brand}` };
  return generateSEOMetadata({
    title: `Bài luyện tập · Chương ${chapter.number}`,
    description: `Bài luyện tập của ${chapter.title} đang được chuẩn bị.`,
    canonical: `/chapters/${chapter.id}/quiz`,
  });
}

export default async function QuizPage({ params }: QuizPageProps) {
  assertCourseDataIntegrity();
  const { chapterId } = await params;
  const chapter = getChapterById(chapterId);
  if (!chapter) notFound();

  const quiz = getQuizByChapterId(chapter.id);
  if (!quiz) notFound();

  return (
    <main className="chapter-page">
      <div className="course-container chapter-page__content">
        <nav aria-label="Điều hướng bài luyện tập">
          <Link href={`/chapters/${chapter.id}`} className="course-eyebrow">← Quay lại chương</Link>
        </nav>
        <section className="chapter-overview" aria-labelledby="quiz-title">
          <div className="chapter-overview__heading">
            <p className="course-eyebrow">Chương {chapter.number} · Bài luyện tập</p>
            <h1 id="quiz-title">{quiz.title}</h1>
          </div>
          <p className="chapter-overview__copy">{quiz.description}</p>
          <div className="chapter-overview__placeholder" role="status">
            <span aria-hidden="true">{quiz.status === "available" ? "READY" : "COMING SOON"}</span>
            <p>
              {quiz.status === "available"
                ? `${quiz.questionIds.length} câu hỏi đã sẵn sàng. Trình làm bài tương tác sẽ được giới thiệu ở pha tiếp theo.`
                : "Bài luyện tập đang được chuẩn bị. Nội dung học tập của chương vẫn sẵn sàng để bạn khám phá."}
            </p>
          </div>
          <Link href={`/chapters/${chapter.id}`} className="button button--primary">Khám phá bài học</Link>
        </section>
      </div>
    </main>
  );
}

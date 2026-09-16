import type { Lesson } from "@/data/course";
import ContentStatusLabel from "./ContentStatusLabel";
import LearningSectionRenderer from "./LearningSectionRenderer";
import SourceList from "./SourceList";

export default function ChapterLearningContent({ lessons }: { lessons: readonly Lesson[] }) {
  if (lessons.length === 0) return null;

  return (
    <section className="chapter-lessons" aria-labelledby="chapter-lessons-title">
      <p className="course-eyebrow">Nội dung học tập</p>
      <h2 id="chapter-lessons-title">Các bài học</h2>
      {lessons.map((lesson) => (
        <article className="chapter-lesson" id={lesson.id} key={lesson.id}>
          <header>
            <span>{lesson.order.toString().padStart(2, "0")}</span>
            <div>
              <h3>{lesson.title}</h3>
              <p>{lesson.summary}</p>
              <ContentStatusLabel status={lesson.status} hideVerified />
            </div>
          </header>
          <div className="chapter-lesson__sections">
            {lesson.sections.map((section) => <LearningSectionRenderer key={section.id} section={section} />)}
          </div>
          <SourceList sourceRefs={lesson.sourceRefs} headingLevel="h4" />
        </article>
      ))}
    </section>
  );
}

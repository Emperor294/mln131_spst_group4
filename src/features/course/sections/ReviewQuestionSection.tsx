import type { ReviewQuestionLearningSection } from "@/data/course";
import SourceList from "../components/SourceList";

export default function ReviewQuestionSection({ section }: { section: ReviewQuestionLearningSection }) {
  const questions = [...section.questions].sort((left, right) => left.order - right.order);

  return (
    <section className="learning-block learning-block--review" aria-labelledby={`${section.id}-title`}>
      <p className="course-eyebrow">Tự học</p>
      <h3 id={`${section.id}-title`}>{section.title ?? "Câu hỏi ôn tập"}</h3>
      <ol className="review-question-list">
        {questions.map((item) => (
          <li key={item.id}>
            <span>{String(item.order).padStart(2, "0")}</span>
            <div>
              <p>{item.question}</p>
            </div>
          </li>
        ))}
      </ol>
      <SourceList sourceRefs={section.sourceRefs} headingLevel="h4" />
    </section>
  );
}

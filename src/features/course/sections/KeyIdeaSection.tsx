import type { KeyIdeaLearningSection } from "@/data/course";
import SourceList from "../components/SourceList";

export default function KeyIdeaSection({ section }: { section: KeyIdeaLearningSection }) {
  return (
    <aside className="learning-block learning-block--key-idea" aria-labelledby={`${section.id}-title`}>
      <p className="course-eyebrow">Ý chính</p>
      <h3 id={`${section.id}-title`}>{section.title ?? "Điểm cần ghi nhớ"}</h3>
      <p>{section.content}</p>
      <SourceList sourceRefs={section.sourceRefs} headingLevel="h4" />
    </aside>
  );
}

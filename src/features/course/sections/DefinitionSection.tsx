import type { DefinitionLearningSection } from "@/data/course";
import SourceList from "../components/SourceList";

export default function DefinitionSection({ section }: { section: DefinitionLearningSection }) {
  return (
    <section className="learning-block learning-block--definition" aria-labelledby={`${section.id}-term`}>
      <p className="course-eyebrow">Khái niệm</p>
      <h3 id={`${section.id}-term`}>{section.term}</h3>
      <p>{section.definition}</p>
      <SourceList sourceRefs={section.sourceRefs} headingLevel="h4" />
    </section>
  );
}

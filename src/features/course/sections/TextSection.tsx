import type { TextLearningSection } from "@/data/course";
import SourceList from "../components/SourceList";

export default function TextSection({ section }: { section: TextLearningSection }) {
  return (
    <section className="learning-block learning-block--text" aria-labelledby={section.title ? `${section.id}-title` : undefined}>
      {section.title && <h3 id={`${section.id}-title`}>{section.title}</h3>}
      {section.paragraphs.map((paragraph, index) => <p key={`${section.id}-${index}`}>{paragraph}</p>)}
      <SourceList sourceRefs={section.sourceRefs} headingLevel="h4" />
    </section>
  );
}

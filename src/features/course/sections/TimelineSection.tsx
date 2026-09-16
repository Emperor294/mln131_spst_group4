import type { TimelineLearningSection } from "@/data/course";
import SourceList from "../components/SourceList";

export default function TimelineSection({ section }: { section: TimelineLearningSection }) {
  return (
    <section className="learning-block learning-block--timeline" aria-labelledby={section.title ? `${section.id}-title` : undefined}>
      {section.title && <h3 id={`${section.id}-title`}>{section.title}</h3>}
      <ol className="academic-timeline">
        {section.items.map((item) => (
          <li key={item.id}>
            <span>{item.period}</span>
            <div>
              <strong>{item.title}</strong>
              <p>{item.description}</p>
            </div>
          </li>
        ))}
      </ol>
      <SourceList sourceRefs={section.sourceRefs} headingLevel="h4" />
    </section>
  );
}

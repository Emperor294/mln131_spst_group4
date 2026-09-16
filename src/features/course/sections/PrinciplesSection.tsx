import type { PrinciplesLearningSection } from "@/data/course";
import SourceList from "../components/SourceList";

export default function PrinciplesSection({ section }: { section: PrinciplesLearningSection }) {
  return (
    <section className="learning-block learning-block--principles" aria-labelledby={section.title ? `${section.id}-title` : undefined}>
      {section.title && <h3 id={`${section.id}-title`}>{section.title}</h3>}
      {section.intro && <p>{section.intro}</p>}
      <ol className="principles-list">
        {section.items.map((item) => (
          <li key={item.id}>
            {(item.label || item.title) && (
              <div className="principles-list__heading">
                {item.label && <span>{item.label}</span>}
                {item.title && <strong>{item.title}</strong>}
              </div>
            )}
            <p>{item.content}</p>
          </li>
        ))}
      </ol>
      <SourceList sourceRefs={section.sourceRefs} headingLevel="h4" />
    </section>
  );
}

import type { ComparisonLearningSection } from "@/data/course";
import SourceList from "../components/SourceList";

export default function ComparisonSection({ section }: { section: ComparisonLearningSection }) {
  return (
    <section className="learning-block learning-block--comparison" aria-labelledby={section.title ? `${section.id}-title` : undefined}>
      {section.title && <h3 id={`${section.id}-title`}>{section.title}</h3>}
      <div className="comparison" role="table" aria-label={section.title ?? "Nội dung đối chiếu"}>
        <div className="comparison__header" role="row">
          <span role="columnheader">Tiêu chí</span>
          <strong role="columnheader">{section.left.title}</strong>
          <strong role="columnheader">{section.right.title}</strong>
        </div>
        {section.rows.map((row) => (
          <div className="comparison__row" role="row" key={row.id}>
            <strong role="rowheader">{row.criterion}</strong>
            <div role="cell" data-column={section.left.title}>{row.left}</div>
            <div role="cell" data-column={section.right.title}>{row.right}</div>
          </div>
        ))}
      </div>
      <SourceList sourceRefs={section.sourceRefs} headingLevel="h4" />
    </section>
  );
}

import type { DiagramLearningSection } from "@/data/course";
import SourceList from "../components/SourceList";

export default function DiagramSection({ section }: { section: DiagramLearningSection }) {
  const nodeLabels = new Map(section.nodes.map((node) => [node.id, node.label]));

  return (
    <section className="learning-block learning-block--diagram" aria-labelledby={section.title ? `${section.id}-title` : undefined}>
      {section.title && <h3 id={`${section.id}-title`}>{section.title}</h3>}
      {section.intro && <p>{section.intro}</p>}
      <figure className="academic-diagram">
        <ul className="academic-diagram__nodes" aria-label="Các thành phần trong sơ đồ">
          {section.nodes.map((node, index) => (
            <li key={node.id}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{node.label}</strong>
              {node.description && <p>{node.description}</p>}
            </li>
          ))}
        </ul>
        {section.edges.length > 0 && (
          <figcaption>
            <span>Các mối liên hệ</span>
            <ul>
              {section.edges.map((edge) => (
                <li key={edge.id}>
                  <strong>{nodeLabels.get(edge.from) ?? edge.from}</strong>
                  <span aria-hidden="true"> → </span>
                  <strong>{nodeLabels.get(edge.to) ?? edge.to}</strong>
                  {edge.label && <span>: {edge.label}</span>}
                </li>
              ))}
            </ul>
          </figcaption>
        )}
      </figure>
      <SourceList sourceRefs={section.sourceRefs} headingLevel="h4" />
    </section>
  );
}

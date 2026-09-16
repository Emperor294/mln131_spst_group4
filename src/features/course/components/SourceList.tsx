import { getAcademicSourceById } from "@/data/course";
import type { ScopedSourceReference, SourceType } from "@/data/course";

const SOURCE_TYPE_LABELS = {
  textbook: "Giáo trình",
  "lecture-slide": "Slide bài giảng",
  "lecturer-material": "Tài liệu giảng viên",
  "academic-reference": "Tài liệu học thuật",
  "legal-policy-document": "Văn bản pháp lý / chính sách",
  media: "Nguồn media",
  other: "Nguồn khác",
} as const satisfies Record<SourceType, string>;

interface SourceListProps {
  sourceRefs?: readonly ScopedSourceReference[];
  headingLevel?: "h2" | "h3" | "h4";
}

function formatBookPages(reference: ScopedSourceReference) {
  if (!reference.bookPages) return null;
  const { start, end } = reference.bookPages;
  return start === end ? `tr. ${start}` : `tr. ${start}–${end}`;
}

export default function SourceList({ sourceRefs, headingLevel = "h2" }: SourceListProps) {
  if (!sourceRefs?.length) return null;
  const Heading = headingLevel;

  return (
    <section className={`source-list ${headingLevel === "h2" ? "" : "source-list--compact"}`} aria-label="Nguồn tham khảo">
      <p className="course-eyebrow">Đối chiếu học thuật</p>
      <Heading>Nguồn tham khảo</Heading>
      <ol>
        {sourceRefs.map((reference) => {
          const source = getAcademicSourceById(reference.sourceId);
          if (!source) return null;
          const publication = [source.publisher, source.year].filter(Boolean).join(", ");
          const bookPages = formatBookPages(reference);

          return (
            <li key={reference.id}>
              <span>{SOURCE_TYPE_LABELS[source.sourceType]}</span>
              <div>
                <strong>{source.title}</strong>
                {(source.author || source.institution) && <p>{source.author ?? source.institution}</p>}
                <p>{publication || source.reference}</p>
                {bookPages && <p className="source-list__pages">{bookPages}</p>}
                {(reference.notes || source.notes) && <p className="source-list__notes">{reference.notes ?? source.notes}</p>}
                {source.url && (
                  <a href={source.url} target="_blank" rel="noopener noreferrer">Mở nguồn ↗</a>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

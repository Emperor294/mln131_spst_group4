import type { ChapterId } from "@/data/course";
import { getArtifactsByChapterId } from "@/data/course";
import ContentStatusLabel from "./ContentStatusLabel";

export default function RelatedArtifacts({ chapterId }: { chapterId: ChapterId }) {
  const artifacts = getArtifactsByChapterId(chapterId);
  if (artifacts.length === 0) return null;

  return (
    <section className="related-artifacts" aria-labelledby="related-artifacts-title">
      <p className="course-eyebrow">Kết nối bảo tàng</p>
      <h2 id="related-artifacts-title">Hiện vật liên quan</h2>
      <ul>
        {artifacts.map((artifact) => (
          <li key={artifact.id}>
            <span aria-hidden="true">OBJ</span>
            <div>
              <h3>{artifact.title}</h3>
              <ContentStatusLabel status={artifact.status} hideVerified />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

import AllianceEdge from "./AllianceEdge";
import SocialGroupNode from "./SocialGroupNode";
import { ALLIANCE_EDGES, SOCIAL_GROUP_NODES } from "./alliance-map-data";

export default function AllianceMap() {
  return (
    <section className="alliance-section" aria-labelledby="alliance-map-title">
      <header>
        <div>
          <p className="course-eyebrow">Chapter 05 · Visual foundation</p>
          <h2 id="alliance-map-title">Các lực lượng trong sơ đồ liên minh</h2>
        </div>
        <p>Minh họa cấu trúc trực quan ban đầu. Nội dung diễn giải sẽ được bổ sung sau khi đối chiếu giáo trình.</p>
      </header>
      <figure className="alliance-map">
        <div className="alliance-map__canvas" aria-hidden="true">
          <ol className="alliance-map__edges">
            {ALLIANCE_EDGES.map((edge) => <AllianceEdge edge={edge} key={edge.id} />)}
          </ol>
          <ol className="alliance-map__nodes">
            {SOCIAL_GROUP_NODES.map((node) => <SocialGroupNode node={node} key={node.id} />)}
          </ol>
        </div>
        <figcaption>
          <span>Sơ đồ gồm ba nhóm:</span>
          <ol>
            {SOCIAL_GROUP_NODES.map((node) => <li key={node.id}>{node.label}</li>)}
          </ol>
          <span>Các đường nối thể hiện quan hệ giữa các nhóm ở cấp độ khái niệm trực quan.</span>
        </figcaption>
      </figure>
    </section>
  );
}

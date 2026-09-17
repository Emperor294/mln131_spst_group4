import AllianceEdge from "./AllianceEdge";
import SocialGroupNode from "./SocialGroupNode";
import SourceList from "../components/SourceList";
import { ALLIANCE_EDGES, ALLIANCE_MAP_SOURCE_REFS, SOCIAL_GROUP_NODES } from "./alliance-map-data";

export default function AllianceMap() {
  return (
    <section className="alliance-section" aria-labelledby="alliance-map-title">
      <header>
        <div>
          <p className="course-eyebrow">Chapter 05 · Textbook visualization</p>
          <h2 id="alliance-map-title">Liên minh Công nhân – Nông dân – Trí thức</h2>
        </div>
        <p>Giáo trình trình bày cơ cấu xã hội – giai cấp rộng hơn; sơ đồ này tập trung vào ba lực lượng cốt lõi trong quan hệ liên minh để hỗ trợ đọc phần Việt Nam.</p>
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
          <p className="alliance-map__context">Các đường nối được ghi là “Liên minh” để diễn đạt quan hệ hợp tác, gắn kết lợi ích và phối hợp được giáo trình phân tích; sơ đồ không hàm ý quan hệ chỉ huy hay bao quát toàn bộ cơ cấu xã hội.</p>
          <div className="alliance-map__fallback" aria-label="Mô tả bằng văn bản của sơ đồ liên minh">
            <h3>Đọc sơ đồ bằng văn bản</h3>
            <ol>
              {SOCIAL_GROUP_NODES.map((node) => (
                <li key={node.id}>
                  <strong>{node.label}</strong>
                  <span>{node.summary}</span>
                </li>
              ))}
            </ol>
            <ul>
              {ALLIANCE_EDGES.map((edge) => {
                const from = SOCIAL_GROUP_NODES.find((node) => node.id === edge.from)?.label;
                const to = SOCIAL_GROUP_NODES.find((node) => node.id === edge.to)?.label;
                return <li key={edge.id}><strong>{from} ↔ {to} · {edge.label}</strong><span>{edge.summary}</span></li>;
              })}
            </ul>
          </div>
        </figcaption>
      </figure>
      <SourceList sourceRefs={ALLIANCE_MAP_SOURCE_REFS} headingLevel="h3" />
    </section>
  );
}

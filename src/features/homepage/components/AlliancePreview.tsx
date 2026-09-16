export default function AlliancePreview() {
  return (
    <div className="alliance-preview" aria-label="Minh họa trực quan về các lực lượng trong liên minh xã hội">
      <svg className="alliance-preview__lines" viewBox="0 0 360 180" aria-hidden="true">
        <path d="M180 35 L78 140 L282 140 Z" />
        <circle cx="180" cy="35" r="4" /><circle cx="78" cy="140" r="4" /><circle cx="282" cy="140" r="4" />
      </svg>
      <span className="alliance-node alliance-node--worker">Công nhân</span>
      <span className="alliance-node alliance-node--farmer">Nông dân</span>
      <span className="alliance-node alliance-node--intellectual">Trí thức</span>
    </div>
  );
}

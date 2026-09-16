import type { CSSProperties } from "react";
import type { SocialGroupNodeData } from "./alliance-map-data";

export default function SocialGroupNode({ node }: { node: SocialGroupNodeData }) {
  const style = { "--node-x": `${node.x}%`, "--node-y": `${node.y}%` } as CSSProperties;
  return (
    <li className="alliance-map__node" style={style}>
      <span>{node.index}</span>
      <strong>{node.label}</strong>
    </li>
  );
}

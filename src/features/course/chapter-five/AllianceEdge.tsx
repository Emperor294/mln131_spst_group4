import type { CSSProperties } from "react";
import type { AllianceEdgeData } from "./alliance-map-data";

export default function AllianceEdge({ edge }: { edge: AllianceEdgeData }) {
  const style = {
    "--edge-x": `${edge.x}%`,
    "--edge-y": `${edge.y}%`,
    "--edge-length": `${edge.length}%`,
    "--edge-angle": `${edge.angle}deg`,
  } as CSSProperties;
  return <li className="alliance-map__edge" style={style}><span>{edge.label}</span></li>;
}

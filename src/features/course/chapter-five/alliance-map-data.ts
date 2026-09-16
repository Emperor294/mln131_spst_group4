import type { ScopedSourceReference } from "@/data/course";

export interface SocialGroupNodeData {
  id: "workers" | "farmers" | "intellectuals";
  label: string;
  index: string;
  x: number;
  y: number;
  sourceRefs?: readonly ScopedSourceReference[];
}

export interface AllianceEdgeData {
  id: string;
  from: SocialGroupNodeData["id"];
  to: SocialGroupNodeData["id"];
  label: string;
  x: number;
  y: number;
  length: number;
  angle: number;
  sourceRefs?: readonly ScopedSourceReference[];
}

export const SOCIAL_GROUP_NODES = [
  { id: "workers", label: "Công nhân", index: "01", x: 50, y: 15 },
  { id: "farmers", label: "Nông dân", index: "02", x: 19, y: 72 },
  { id: "intellectuals", label: "Trí thức", index: "03", x: 81, y: 72 },
] as const satisfies readonly SocialGroupNodeData[];

export const ALLIANCE_EDGES = [
  { id: "workers-farmers", from: "workers", to: "farmers", label: "Mối liên hệ", x: 48, y: 28, length: 64, angle: 119 },
  { id: "workers-intellectuals", from: "workers", to: "intellectuals", label: "Mối liên hệ", x: 52, y: 28, length: 64, angle: 61 },
  { id: "farmers-intellectuals", from: "farmers", to: "intellectuals", label: "Mối liên hệ", x: 19, y: 72, length: 62, angle: 0 },
] as const satisfies readonly AllianceEdgeData[];

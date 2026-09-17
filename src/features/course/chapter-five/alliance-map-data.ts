import { textbookReference } from "@/data/course/content/textbook-reference";
import type { ContentStatus, ScopedSourceReference } from "@/data/course";

export interface SocialGroupNodeData {
  id: "workers" | "farmers" | "intellectuals";
  label: string;
  index: string;
  x: number;
  y: number;
  summary: string;
  status: ContentStatus;
  sourceRefs: readonly ScopedSourceReference[];
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
  summary: string;
  status: ContentStatus;
  sourceRefs: readonly ScopedSourceReference[];
}

const mapRefs = {
  workers: textbookReference("ref-ch05-map-workers", 178, 179, 175, 176),
  farmers: textbookReference("ref-ch05-map-farmers", 179, 180, 176, 177),
  intellectuals: textbookReference("ref-ch05-map-intellectuals", 180, 181, 177, 178),
  alliance: textbookReference("ref-ch05-map-alliance", 172, 176, 169, 173),
} as const;

export const ALLIANCE_MAP_SOURCE_REFS = [
  mapRefs.workers,
  mapRefs.farmers,
  mapRefs.intellectuals,
  mapRefs.alliance,
] as const;

export const SOCIAL_GROUP_NODES = [
  {
    id: "workers",
    label: "Công nhân",
    index: "01",
    x: 50,
    y: 15,
    summary: "Lực lượng lãnh đạo cách mạng thông qua Đảng Cộng sản Việt Nam, đại diện cho phương thức sản xuất tiên tiến và giữ vai trò nòng cốt trong liên minh.",
    status: "verified",
    sourceRefs: [mapRefs.workers],
  },
  {
    id: "farmers",
    label: "Nông dân",
    index: "02",
    x: 19,
    y: 72,
    summary: "Lực lượng có vị trí chiến lược trong công nghiệp hóa, hiện đại hóa nông nghiệp, nông thôn và là thành tố quan trọng của khối liên minh.",
    status: "verified",
    sourceRefs: [mapRefs.farmers],
  },
  {
    id: "intellectuals",
    label: "Trí thức",
    index: "03",
    x: 81,
    y: 72,
    summary: "Lực lượng lao động sáng tạo quan trọng trong công nghiệp hóa, hiện đại hóa, phát triển kinh tế tri thức và xây dựng văn hóa.",
    status: "verified",
    sourceRefs: [mapRefs.intellectuals],
  },
] as const satisfies readonly SocialGroupNodeData[];

export const ALLIANCE_EDGES = [
  {
    id: "workers-farmers",
    from: "workers",
    to: "farmers",
    label: "Liên minh",
    summary: "Quan hệ liên minh giữa giai cấp công nhân và giai cấp nông dân trong khối liên minh.",
    x: 48,
    y: 28,
    length: 64,
    angle: 119,
    status: "verified",
    sourceRefs: [mapRefs.alliance],
  },
  {
    id: "workers-intellectuals",
    from: "workers",
    to: "intellectuals",
    label: "Liên minh",
    summary: "Quan hệ liên minh giữa giai cấp công nhân và đội ngũ trí thức trong quá trình xây dựng xã hội mới.",
    x: 52,
    y: 28,
    length: 64,
    angle: 61,
    status: "verified",
    sourceRefs: [mapRefs.alliance],
  },
  {
    id: "farmers-intellectuals",
    from: "farmers",
    to: "intellectuals",
    label: "Liên minh",
    summary: "Quan hệ liên minh và phối hợp lợi ích giữa giai cấp nông dân và đội ngũ trí thức.",
    x: 19,
    y: 72,
    length: 62,
    angle: 0,
    status: "verified",
    sourceRefs: [mapRefs.alliance],
  },
] as const satisfies readonly AllianceEdgeData[];

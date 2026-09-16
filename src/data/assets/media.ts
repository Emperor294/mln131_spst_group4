export type MediaAssetType =
  | "3d-model"
  | "video"
  | "audio"
  | "image"
  | "image-set"
  | "remote-video-collection"
  | "remote-image-collection"
  | "remote-3d-embed";

export type MediaAssetStatus = "active" | "legacy" | "unused";
export type LicenseStatus = "unknown" | "review-required" | "verified";

export interface MediaAsset {
  id: string;
  type: MediaAssetType;
  paths: readonly string[];
  usage: readonly string[];
  status: MediaAssetStatus;
  source?: string;
  licenseStatus: LicenseStatus;
  sizeBytes?: number;
  notes?: string;
}

export const MEDIA_ASSETS = [
  {
    id: "museum-model",
    type: "3d-model",
    paths: ["/museum.glb"],
    usage: ["/baotang"],
    status: "active",
    source: "[Chưa xác định]",
    licenseStatus: "review-required",
    sizeBytes: 101405464,
  },
  {
    id: "homepage-learning-video",
    type: "video",
    paths: ["/videodcxhcn.mp4"],
    usage: ["Homepage legacy media section"],
    status: "active",
    source: "[Chưa xác định]",
    licenseStatus: "review-required",
    sizeBytes: 101712589,
  },
  {
    id: "homepage-democracy-images",
    type: "image-set",
    paths: ["/dcnt.jpg", "/dccn.png", "/dcpk.jpg", "/dcts.jpg", "/dcxhcn.jpg"],
    usage: ["Homepage legacy carousel"],
    status: "active",
    source: "[Chưa xác định]",
    licenseStatus: "review-required",
  },
  {
    id: "site-identity-image",
    type: "image",
    paths: ["/vn.png"],
    usage: ["Legacy content cards"],
    status: "legacy",
    source: "[Chưa xác định]",
    licenseStatus: "review-required",
    sizeBytes: 43677,
  },
  {
    id: "legacy-vietnam-image-set",
    type: "image-set",
    paths: ["/vn2.jpg", "/vn3.jpg", "/vn4.jpg"],
    usage: ["No current code reference found"],
    status: "unused",
    source: "[Chưa xác định]",
    licenseStatus: "review-required",
  },
  {
    id: "site-background",
    type: "image",
    paths: ["/background.jpg"],
    usage: ["SiteShell", "Chatbot", "Social preview placeholder"],
    status: "active",
    source: "[Chưa xác định]",
    licenseStatus: "review-required",
    sizeBytes: 58759,
  },
  {
    id: "legacy-rap-audio",
    type: "audio",
    paths: ["/rap.mp3"],
    usage: ["Global music player", "/music lyrics page"],
    status: "legacy",
    source: "Described by the legacy page as AI-generated; provenance requires review.",
    licenseStatus: "review-required",
    sizeBytes: 4050523,
  },
  {
    id: "artifact-remote-images",
    type: "remote-image-collection",
    paths: ["Remote URLs stored in src/data/course/artifacts.ts"],
    usage: ["Museum artifact dialog"],
    status: "legacy",
    source: "Multiple external hosts; see artifact registry.",
    licenseStatus: "review-required",
  },
  {
    id: "legacy-youtube-resources",
    type: "remote-video-collection",
    paths: ["YouTube embed IDs stored in src/app/video/page.tsx"],
    usage: ["/video"],
    status: "legacy",
    source: "YouTube; individual provenance requires review.",
    licenseStatus: "review-required",
  },
  {
    id: "legacy-sketchfab-museum",
    type: "remote-3d-embed",
    paths: ["https://sketchfab.com/models/617be5181a35411cbbfefa536af7e87f"],
    usage: ["/game"],
    status: "legacy",
    source: "Sketchfab model embed; ownership requires review.",
    licenseStatus: "review-required",
  },
] as const satisfies readonly MediaAsset[];

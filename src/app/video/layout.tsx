import type { ReactNode } from "react";
import { SITE_CONFIG } from "@/config/site";
import { generateSEOMetadata } from "@/lib/seo";

export const metadata = generateSEOMetadata({
  title: "Học liệu",
  description: SITE_CONFIG.metadata.reviewDescription,
  canonical: "/video",
});

export default function VideoLayout({ children }: { children: ReactNode }) {
  return children;
}

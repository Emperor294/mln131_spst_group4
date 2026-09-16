import type { ReactNode } from "react";
import { SITE_CONFIG } from "@/config/site";
import { generateSEOMetadata } from "@/lib/seo";

export const metadata = generateSEOMetadata({
  title: `Âm nhạc – ${SITE_CONFIG.metadata.reviewTitle}`,
  description: SITE_CONFIG.metadata.reviewDescription,
  canonical: "/music",
});

export default function MusicLayout({ children }: { children: ReactNode }) {
  return children;
}

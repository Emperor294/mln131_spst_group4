import type { ReactNode } from "react";
import { SITE_CONFIG } from "@/config/site";
import { generateSEOMetadata } from "@/lib/seo";

export const metadata = generateSEOMetadata({
  title: SITE_CONFIG.metadata.reviewTitle,
  description: SITE_CONFIG.metadata.reviewDescription,
});

export default function LegacyContentLayout({ children }: { children: ReactNode }) {
  return children;
}

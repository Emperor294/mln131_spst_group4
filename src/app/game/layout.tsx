import type { ReactNode } from "react";
import { SITE_CONFIG } from "@/config/site";
import { generateSEOMetadata } from "@/lib/seo";

export const metadata = generateSEOMetadata({
  title: SITE_CONFIG.metadata.reviewTitle,
  description: SITE_CONFIG.metadata.reviewDescription,
  canonical: "/game",
});

export default function GameLayout({ children }: { children: ReactNode }) {
  return children;
}

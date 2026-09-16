import type { ReactNode } from "react";
import { generateSEOMetadata } from "@/lib/seo";

export const metadata = generateSEOMetadata({
  title: "Bảo tàng 3D",
  description: "Không gian bảo tàng 3D tương tác của môn Chủ nghĩa Xã hội Khoa học – MLN131.",
  canonical: "/baotang",
});

export default function BaotangLayout({ children }: { children: ReactNode }) {
  return children;
}

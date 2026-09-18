import type { ReactNode } from "react";
import { generateSEOMetadata } from "@/lib/seo";
import "@/features/course/course.css";

export const metadata = generateSEOMetadata({
  title: "Bảo tàng học tập",
  description: "Không gian bảo tàng học tập 3D và chế độ nhẹ của môn Chủ nghĩa Xã hội Khoa học – MLN131.",
  canonical: "/baotang",
});

export default function BaotangLayout({ children }: { children: ReactNode }) {
  return children;
}

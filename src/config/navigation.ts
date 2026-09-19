export interface NavigationItem {
  label: string;
  href: string;
}

export type RouteDisposition =
  | "keep"
  | "repurpose"
  | "redirect-later"
  | "remove-later";

export interface RouteStrategy {
  path: string;
  disposition: RouteDisposition;
  rationale: string;
}

export const PRIMARY_NAVIGATION = [
  { label: "Trang chủ", href: "/" },
  { label: "Khám phá", href: "/chapters" },
  { label: "Tiến độ", href: "/progress" },
  { label: "Bảo tàng 3D", href: "/baotang" },
  { label: "Học liệu", href: "/video" },
] as const satisfies readonly NavigationItem[];

export const SITE_SHELL_ROUTES = {
  withoutChrome: ["/baotang", "/admin", "/standalone", "/minimal"],
  contentReview: ["/game", "/music", "/noidung", "/video"],
} as const;

export const ROUTE_STRATEGY = [
  { path: "/", disposition: "keep", rationale: "Trang chủ chính thức của SOCIALISM 360." },
  { path: "/baotang", disposition: "keep", rationale: "Bảo tàng tương tác chính thức." },
  { path: "/game", disposition: "redirect-later", rationale: "Trang giới thiệu bảo tàng cũ, trùng vai trò với /baotang." },
  { path: "/music", disposition: "remove-later", rationale: "Học liệu thử nghiệm chưa phù hợp cấu trúc môn học mới." },
  { path: "/video", disposition: "repurpose", rationale: "Có thể phát triển thành khu vực Học liệu." },
  { path: "/noidung", disposition: "redirect-later", rationale: "Trang tương thích dẫn người dùng sang /chapters; các trang chi tiết legacy vẫn được giữ để rà soát." },
  { path: "/noidung/dao-duc-cach-mang", disposition: "redirect-later", rationale: "Slug và nội dung cần ánh xạ lại theo chương chính thức." },
  { path: "/noidung/tu-quan-vs-doc-tai", disposition: "redirect-later", rationale: "Nội dung cần rà soát trước khi ánh xạ vào chương." },
  { path: "/noidung/van-hoa-con-nguoi", disposition: "redirect-later", rationale: "Slug legacy không phản ánh cấu trúc MLN131 mới." },
] as const satisfies readonly RouteStrategy[];

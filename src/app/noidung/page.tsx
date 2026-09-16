import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function LegacyContentPage() {
  return (
    <section className="min-h-[70vh] bg-[#f3efe6] px-6 py-20 text-[#111419]">
      <div className="mx-auto max-w-5xl border-t border-black/25 pt-8">
        <p className="font-sub text-[11px] font-semibold uppercase tracking-[0.18em] text-red-900">Khu vực nội dung cũ</p>
        <div className="mt-8 grid gap-12 md:grid-cols-[1.2fr_.8fr] md:items-end">
          <h1 className="font-serif text-5xl leading-[1.02] tracking-[-0.04em] sm:text-7xl">Hệ nội dung này đang được chuyển đổi.</h1>
          <div>
            <p className="font-sub text-sm leading-7 text-black/65">
              Chỉ mục học tập chính thức của SOCIALISM 360 hiện được tổ chức theo bảy chương MLN131. Các trang chi tiết cũ vẫn được giữ để phục vụ quá trình rà soát, chưa được tự động chuyển thành nội dung đã xác minh.
            </p>
            <Link className="mt-8 inline-flex items-center gap-4 border-b border-red-900 pb-2 font-sub text-xs font-semibold uppercase tracking-[0.1em] text-red-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-900" href="/chapters">
              Mở chỉ mục chương <ArrowRight aria-hidden="true" size={17} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

import { SITE_CONFIG } from "@/config/site";
import { assertCourseDataIntegrity } from "@/data/course";
import ChapterIndex from "@/features/course/components/ChapterIndex";
import { generateSEOMetadata } from "@/lib/seo";

export const metadata = generateSEOMetadata({
  title: "Khám phá giáo trình",
  description: `Khám phá cấu trúc bảy chương của ${SITE_CONFIG.academicTitle}.`,
  canonical: "/chapters",
});

export default function ChaptersPage() {
  assertCourseDataIntegrity();

  return (
    <div className="course-page">
      <header className="course-index-hero">
        <div className="course-grid" aria-hidden="true" />
        <div className="course-container course-index-hero__content">
          <p className="course-eyebrow">MLN131 · Chapter collection</p>
          <h1>Khám phá<br /><span>giáo trình</span></h1>
          <div className="course-index-hero__intro">
            <span>01 — 07</span>
            <p>Bảy chương tạo thành cấu trúc học tập của Chủ nghĩa Xã hội Khoa học. Nội dung chi tiết được bổ sung theo trạng thái đối chiếu học thuật.</p>
          </div>
        </div>
      </header>
      <section className="course-index-section" aria-labelledby="chapter-index-title">
        <div className="course-container">
          <div className="course-section-heading">
            <p className="course-eyebrow">Academic collection</p>
            <h2 id="chapter-index-title">Chỉ mục chương</h2>
            <span>Chọn một chương để bắt đầu</span>
          </div>
          <ChapterIndex />
        </div>
      </section>
    </div>
  );
}

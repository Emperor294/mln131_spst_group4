import { HOMEPAGE_CONTENT } from "@/data/homepage";
import SectionReveal from "./SectionReveal";

export default function CourseIntroduction() {
  const { introduction } = HOMEPAGE_CONTENT;
  return (
    <section className="home-section home-intro" aria-labelledby="course-intro-title">
      <div className="home-container home-intro__layout">
        <SectionReveal className="home-intro__statement">
          <p className="home-eyebrow">{introduction.eyebrow}</p>
          <h2 id="course-intro-title" className="home-display home-display--medium">
            {introduction.heading.map((line) => <span key={line}>{line}</span>)}
          </h2>
        </SectionReveal>
        <SectionReveal className="home-intro__detail" delay={0.08}>
          <span className="home-rule-number" aria-hidden="true">01 / 07</span>
          <p>{introduction.description}</p>
          <ul className="home-intro__capabilities" aria-label="Các hình thức trải nghiệm">
            <li>Bảy chủ đề học phần</li><li>Học liệu trực quan</li><li>Bảo tàng 3D tương tác</li>
          </ul>
        </SectionReveal>
      </div>
    </section>
  );
}

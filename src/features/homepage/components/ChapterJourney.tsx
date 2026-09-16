import { COURSE_CHAPTERS } from "@/data/course";
import { HOMEPAGE_CONTENT } from "@/data/homepage";
import { CHAPTER_VISUAL_IDENTITIES } from "@/features/course/chapter-visuals";
import AlliancePreview from "./AlliancePreview";
import SectionReveal from "./SectionReveal";

export default function ChapterJourney() {
  const { chapters } = HOMEPAGE_CONTENT;
  return (
    <section id="chapter-journey" className="home-section chapter-journey" aria-labelledby="chapter-journey-title">
      <div className="home-container chapter-journey__layout">
        <header className="chapter-journey__header">
          <p className="home-eyebrow">{chapters.eyebrow}</p>
          <h2 id="chapter-journey-title" className="home-display home-display--medium">{chapters.heading}</h2>
          <p className="chapter-journey__description">{chapters.description}</p>
          <span className="chapter-journey__progress" aria-hidden="true">01 — 07</span>
        </header>
        <ol className="chapter-list">
          {COURSE_CHAPTERS.map((chapter, index) => {
            const visual = CHAPTER_VISUAL_IDENTITIES[chapter.id];
            const isFeatured = chapter.id === "chapter-05";
            return (
              <li key={chapter.id}>
                <SectionReveal delay={Math.min(index * 0.025, 0.12)}>
                  <article className="chapter-card" data-featured={isFeatured || undefined}>
                    <div className="chapter-card__number">{chapter.number.toString().padStart(2, "0")}</div>
                    <div className="chapter-card__body">
                      <p className="chapter-card__label">{visual.label}</p>
                      <h3>{chapter.title}</h3>
                      <span className="chapter-card__index">{visual.indexLabel}</span>
                    </div>
                    {isFeatured ? <AlliancePreview /> : <div className="chapter-card__mark" aria-hidden="true" />}
                  </article>
                </SectionReveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

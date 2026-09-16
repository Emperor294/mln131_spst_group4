import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import { HOMEPAGE_CONTENT } from "@/data/homepage";
import SectionReveal from "./SectionReveal";

export default function HomeHero() {
  const { hero } = HOMEPAGE_CONTENT;

  return (
    <section className="home-hero" aria-labelledby="home-hero-title">
      <div className="home-grid" aria-hidden="true" />
      <div className="home-orb home-orb--red" aria-hidden="true" />
      <div className="home-container home-hero__layout">
        <div className="home-hero__copy">
          <SectionReveal><p className="home-eyebrow">{hero.eyebrow}</p></SectionReveal>
          <h1 id="home-hero-title" className="home-hero__title">
            {hero.headline.map((line, index) => (
              <span key={line} className={index === 2 ? "home-hero__accent" : undefined}>{line}</span>
            ))}
          </h1>
          <SectionReveal delay={0.12}>
            <p className="home-hero__description">{hero.description}</p>
            <div className="home-actions">
              <Link className="home-button home-button--primary" href="/baotang">
                Bước vào bảo tàng 3D <ArrowUpRight aria-hidden="true" size={17} />
              </Link>
              <Link className="home-button home-button--ghost" href="/chapters">
                Khám phá hành trình <ArrowRight aria-hidden="true" size={16} />
              </Link>
            </div>
          </SectionReveal>
        </div>
        <div className="home-hero__visual" aria-hidden="true">
          <div className="home-portal">
            <div className="home-portal__frame home-portal__frame--one" />
            <div className="home-portal__frame home-portal__frame--two" />
            <div className="home-portal__frame home-portal__frame--three" />
            <div className="home-portal__core"><span>ENTER</span><strong>360°</strong></div>
          </div>
          <div className="home-hero__index">
            <span>Digital Museum</span><span>Seven Chapters</span><span>Interactive Space</span>
          </div>
        </div>
      </div>
      <div className="home-hero__footer home-container">
        <span>{SITE_CONFIG.englishSubtitle}</span>
        <span className="home-hero__edition">Digital edition · 2026</span>
      </div>
    </section>
  );
}

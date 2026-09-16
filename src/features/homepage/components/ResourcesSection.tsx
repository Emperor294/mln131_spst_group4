import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import { HOMEPAGE_CONTENT } from "@/data/homepage";
import SectionReveal from "./SectionReveal";

export default function ResourcesSection() {
  const { resources } = HOMEPAGE_CONTENT;
  return (
    <section className="home-section resources-section" aria-labelledby="resources-title">
      <div className="home-container resources-section__layout">
        <SectionReveal className="resources-section__visual">
          <div className="resources-archive" aria-hidden="true">
            <span className="resources-archive__index">ARCHIVE / 01</span>
            <div className="resources-archive__play"><Play fill="currentColor" size={20} /></div>
            <div className="resources-archive__lines"><i /><i /><i /></div>
            <span className="resources-archive__time">00:00 — 12:48</span>
          </div>
        </SectionReveal>
        <SectionReveal className="resources-section__copy" delay={0.08}>
          <p className="home-eyebrow">{resources.eyebrow}</p>
          <h2 id="resources-title" className="home-display home-display--medium">{resources.heading}</h2>
          <p>{resources.description}</p>
          <Link className="home-text-link" href="/video">
            Khám phá học liệu <ArrowRight aria-hidden="true" size={18} />
          </Link>
        </SectionReveal>
      </div>
    </section>
  );
}

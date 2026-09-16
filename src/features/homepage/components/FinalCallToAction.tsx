import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { HOMEPAGE_CONTENT } from "@/data/homepage";
import SectionReveal from "./SectionReveal";

export default function FinalCallToAction() {
  const { finalCta } = HOMEPAGE_CONTENT;
  return (
    <section className="home-section final-cta" aria-labelledby="final-cta-title">
      <div className="final-cta__rings" aria-hidden="true"><i /><i /><i /></div>
      <div className="home-container final-cta__content">
        <SectionReveal>
          <p className="home-eyebrow">{finalCta.eyebrow}</p>
          <h2 id="final-cta-title" className="home-display home-display--large">{finalCta.heading}</h2>
          <div className="home-actions final-cta__actions">
            <Link className="home-button home-button--primary" href="/baotang">
              Bước vào bảo tàng <ArrowUpRight aria-hidden="true" size={17} />
            </Link>
            <Link className="home-button home-button--ghost" href="/video">
              Xem học liệu <ArrowRight aria-hidden="true" size={17} />
            </Link>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { HOMEPAGE_CONTENT } from "@/data/homepage";
import MuseumViewport from "./MuseumViewport";
import SectionReveal from "./SectionReveal";

export default function MuseumFeature() {
  const { museum } = HOMEPAGE_CONTENT;
  return (
    <section className="home-section museum-feature" aria-labelledby="museum-feature-title">
      <div className="home-container">
        <SectionReveal>
          <div className="museum-feature__heading">
            <div>
              <p className="home-eyebrow">{museum.eyebrow}</p>
              <h2 id="museum-feature-title" className="home-display home-display--large">{museum.heading}</h2>
            </div>
            <p>{museum.description}</p>
          </div>
        </SectionReveal>
        <SectionReveal delay={0.08}>
          <div className="museum-feature__frame">
            <MuseumViewport />
            <div className="museum-feature__topline">
              <span>Live preview / Conceptual</span><span>Zone 00 · Central Hub</span>
            </div>
            <div className="museum-feature__controls" aria-label="Điều khiển bảo tàng">
              <div className="key-cluster" aria-hidden="true">
                <kbd>W</kbd><span><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd></span>
              </div>
              <dl>
                <div><dt>Chuột</dt><dd>Quan sát</dd></div>
                <div><dt>Click</dt><dd>Tương tác</dd></div>
              </dl>
            </div>
            <Link className="museum-feature__cta" href="/baotang">
              Vào bảo tàng <ArrowUpRight aria-hidden="true" size={20} />
            </Link>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}

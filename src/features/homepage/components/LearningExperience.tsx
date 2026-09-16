import { LEARNING_STEPS } from "@/data/homepage";
import SectionReveal from "./SectionReveal";

export default function LearningExperience() {
  return (
    <section className="home-section learning-experience" aria-labelledby="learning-experience-title">
      <div className="home-container">
        <header className="learning-experience__header">
          <p className="home-eyebrow">Cách trải nghiệm hoạt động</p>
          <h2 id="learning-experience-title" className="sr-only">Ba bước của trải nghiệm học tập</h2>
        </header>
        <ol className="learning-steps">
          {LEARNING_STEPS.map((step, index) => (
            <li key={step.number}>
              <SectionReveal delay={index * 0.07}>
                <article className="learning-step">
                  <span>{step.number}</span><h3>{step.title}</h3><p>{step.description}</p>
                </article>
              </SectionReveal>
            </li>
          ))}
        </ol>
        <p className="learning-experience__sequence" aria-hidden="true">
          {LEARNING_STEPS.map((step) => step.title).join("  →  ")}
        </p>
      </div>
    </section>
  );
}

import { useApp } from "../context/AppContext.jsx";
import { useReveal } from "../hooks/useReveal.js";
import { PROFILE } from "../data/profile.js";
import { IdentityCard } from "./IdentityCard.jsx";

export function Hero() {
  const { t } = useApp();
  const textRef = useReveal();
  const cardRef = useReveal();

  return (
    <section className="hero" id="top">
      <div className="wrap hero-grid">
        <div ref={textRef} className="reveal">
          <span className="eyebrow">{t.subtitle}</span>
          <h1>{t.hero.lead}</h1>
          <p className="hero-body">{t.hero.body}</p>
          <p className="hero-now">{t.hero.now}</p>
          <div className="hero-cta">
            <a className="btn btn-primary" href="#work">{t.hero.cta}</a>
            <a className="btn btn-ghost" href={`mailto:${PROFILE.email}`}>{t.hero.ctaAlt}</a>
            <a className="btn btn-ghost" href={t.cvFile} download>{t.hero.ctaCv}</a>
          </div>
        </div>

        <div ref={cardRef} className="reveal">
          <IdentityCard />
        </div>
      </div>
    </section>
  );
}

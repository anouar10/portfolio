import { useApp } from "../context/AppContext.jsx";
import { useReveal } from "../hooks/useReveal.js";
import { PROFILE } from "../data/profile.js";
import { toTelHref } from "../lib/format.js";
import { Section } from "./Section.jsx";

export function Contact() {
  const { t } = useApp();
  const ref = useReveal();

  return (
    <Section id="contact" eyebrow={t.sections.contact.eyebrow} title={t.sections.contact.title}>
      <div ref={ref} className="reveal">
        <p className="contact-lead">{t.contact.lead}</p>

        <div className="contact-grid">
          <a className="contact-card" href={`mailto:${PROFILE.email}`}>
            <span className="field">{t.contact.email}</span>
            <span className="contact-val">{PROFILE.email}</span>
          </a>

          <a className="contact-card" href={toTelHref(PROFILE.phone)}>
            <span className="field">{t.contact.phone}</span>
            <span className="contact-val">{PROFILE.phone}</span>
          </a>

          <a className="contact-card" href={PROFILE.linkedin} target="_blank" rel="noreferrer noopener">
            <span className="field">{t.contact.elsewhere}</span>
            <span className="contact-val">LinkedIn · GitHub</span>
          </a>
        </div>
      </div>
    </Section>
  );
}

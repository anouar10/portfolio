import { useApp } from "../context/AppContext.jsx";
import { useReveal } from "../hooks/useReveal.js";
import { EDUCATION } from "../data/profile.js";
import { formatPeriod } from "../lib/format.js";
import { Section } from "./Section.jsx";

export function Education() {
  const { t, lang } = useApp();
  const ref = useReveal();

  return (
    <Section id="education" eyebrow={t.sections.education.eyebrow} title={t.sections.education.title}>
      <div ref={ref} className="reveal edu">
        {EDUCATION.map((entry) => {
          const copy = t.education[entry.id];
          return (
            <div className="edu-card" key={entry.id}>
              <h3>{copy.degree}</h3>
              <span className="edu-school">{copy.school} — {entry.city}</span>
              <span className="edu-period">
                {formatPeriod(entry.start, entry.end, lang, t.labels.present)}
              </span>
              <p className="edu-detail">{copy.detail}</p>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

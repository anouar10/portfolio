import { useApp } from "../context/AppContext.jsx";
import { useReveal } from "../hooks/useReveal.js";
import { SKILL_GROUPS } from "../data/profile.js";
import { Section } from "./Section.jsx";

export function Skills() {
  const { t } = useApp();
  const ref = useReveal();

  return (
    <Section id="skills" eyebrow={t.sections.skills.eyebrow} title={t.sections.skills.title}>
      <div ref={ref} className="reveal skills">
        {SKILL_GROUPS.map((group) => (
          <div className="skill-card" key={group.id}>
            <span className="field">{t.skillGroups[group.id]}</span>
            <div className="skill-items">
              {group.items.map((item) => <span className="tech" key={item}>{item}</span>)}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

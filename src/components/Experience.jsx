import { useCallback, useMemo, useState } from "react";
import { useApp } from "../context/AppContext.jsx";
import { useReveal } from "../hooks/useReveal.js";
import { ROLES } from "../data/profile.js";
import { filterRoles } from "../lib/format.js";
import { Section } from "./Section.jsx";
import { RoleRecord } from "./RoleRecord.jsx";

const FILTER_KEYS = ["all", "ai", "frontend", "fullstack", "devops"];

export function Experience() {
  const { t } = useApp();
  const ref = useReveal();
  const [filter, setFilter] = useState("all");
  const [openId, setOpenId] = useState(ROLES[0].id);

  const visible = useMemo(() => filterRoles(ROLES, filter), [filter]);
  const toggle = useCallback(
    (id) => setOpenId((current) => (current === id ? null : id)),
    []
  );

  return (
    <Section
      id="work"
      eyebrow={t.sections.work.eyebrow}
      title={t.sections.work.title.replace("{n}", String(ROLES.length))}
      note={t.sections.work.note}
    >
      <div ref={ref} className="reveal">
        <div className="filters">
          {FILTER_KEYS.map((key) => (
            <button
              key={key}
              className="chip"
              aria-pressed={filter === key}
              onClick={() => setFilter(key)}
            >
              {t.filters[key]}
            </button>
          ))}
        </div>

        <div className="records">
          {visible.length === 0 ? (
            <div className="empty">
              <p>{t.labels.empty}</p>
              <p>{t.labels.emptyHint}</p>
            </div>
          ) : (
            visible.map((role) => (
              <RoleRecord
                key={role.id}
                role={role}
                isOpen={openId === role.id}
                onToggle={() => toggle(role.id)}
              />
            ))
          )}
        </div>
      </div>
    </Section>
  );
}

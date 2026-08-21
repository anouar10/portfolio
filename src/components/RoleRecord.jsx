import { useApp } from "../context/AppContext.jsx";
import { formatPeriod } from "../lib/format.js";
import { IconCaret } from "./icons.jsx";

/** One row of the experience ledger, expanding in place to show detail. */
export function RoleRecord({ role, isOpen, onToggle }) {
  const { t, lang } = useApp();
  const copy = t.roles[role.id];
  const period = formatPeriod(role.start, role.end, lang, t.labels.present);
  const meta = [role.city, t.modes[role.mode]].filter(Boolean).join(" · ");

  return (
    <div className={`record${isOpen ? " open" : ""}`}>
      <button
        className="record-btn"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`panel-${role.id}`}
      >
        <span className="record-period">{period}</span>
        <span className="record-main">
          <span className="record-title">
            {copy.title}
            {role.internship ? <span className="badge">{t.labels.internship}</span> : null}
          </span>
          <span className="record-co">
            <b>{role.company}</b> — {meta}
          </span>
        </span>
        <IconCaret />
      </button>

      <div className="record-panel" id={`panel-${role.id}`} role="region">
        <div className="record-panel-in">
          <div className="record-body">
            {role.concurrent ? <span className="note-inline">{t.labels.concurrent}</span> : null}
            {copy.summary ? <p className="record-summary">{copy.summary}</p> : null}

            <ul className="record-list">
              {copy.bullets.map((bullet, index) => <li key={index}>{bullet}</li>)}
            </ul>

            <div className="stack-row">
              <span className="field">{t.labels.stack}</span>
              {role.stack.map((tech) => <span className="tech" key={tech}>{tech}</span>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

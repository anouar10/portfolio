import { useApp } from "../context/AppContext.jsx";
import { PROFILE } from "../data/profile.js";
import { Avatar } from "./Avatar.jsx";

/** The hero's right-hand column: a record, with a portrait and typed fields. */
export function IdentityCard() {
  const { t, lang } = useApp();

  const rows = [
    { label: t.record.based, value: t.recordValues.based },
    { label: t.record.focus, value: t.recordValues.focus },
    { label: t.record.languages, value: t.recordValues.languages },
    { label: t.record.available, value: t.recordValues.available },
  ];

  return (
    <div className="card">
      <div className="card-id">
        <Avatar />
        <div className="card-id-text">
          <span className="card-id-name">{PROFILE.name}</span>
          <span className="card-id-role">{t.tagline}</span>
          <span className="card-id-loc">{PROFILE.city}, {PROFILE.country[lang]}</span>
        </div>
      </div>

      {rows.map((row) => (
        <div className="card-row" key={row.label}>
          <span className="field">{row.label}</span>
          <span className="card-val">{row.value}</span>
        </div>
      ))}

      <div className="card-row">
        <span className="field">GitHub</span>
        <span className="card-val">
          <a href={PROFILE.github} target="_blank" rel="noreferrer noopener">
            {PROFILE.githubHandle}
          </a>
        </span>
      </div>
    </div>
  );
}

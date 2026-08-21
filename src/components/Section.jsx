import { useReveal } from "../hooks/useReveal.js";

/** Section shell: eyebrow, heading, optional note, then the section's content. */
export function Section({ id, eyebrow, title, note, children }) {
  const ref = useReveal();
  return (
    <section className="section" id={id}>
      <div className="wrap">
        <div ref={ref} className="reveal section-head">
          <span className="eyebrow">{eyebrow}</span>
          <h2>{title}</h2>
          {note ? <p className="section-note">{note}</p> : null}
        </div>
        {children}
      </div>
    </section>
  );
}

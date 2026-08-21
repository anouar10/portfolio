import { MONTHS } from "../i18n/index.js";

/**
 * Pure formatting helpers. No React, no side effects — trivially unit-testable.
 */

/** "2024-07" -> "Jul 2024" (en) / "juil. 2024" (fr) */
export function formatMonth(iso, lang) {
  if (!iso) return null;
  const [year, month] = iso.split("-");
  const names = MONTHS[lang] ?? MONTHS.en;
  return `${names[Number(month) - 1]} ${year}`;
}

/** Renders a start/end pair, using `presentLabel` when `end` is null. */
export function formatPeriod(start, end, lang, presentLabel) {
  return `${formatMonth(start, lang)} — ${end ? formatMonth(end, lang) : presentLabel}`;
}

/** Roles are stored newest-first, so filtering preserves the intended order. */
export function filterRoles(roles, tag) {
  return tag === "all" ? roles : roles.filter((role) => role.tags.includes(tag));
}

/** Strips spaces so a display phone number works inside a tel: href. */
export function toTelHref(phone) {
  return `tel:${phone.replace(/\s/g, "")}`;
}

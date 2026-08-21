# Portfolio — Hadj Salem Anwar

Bilingual (EN/FR) portfolio with light and dark themes, built with React 18 and Vite.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build into dist/
npm run preview  # serve the production build locally
```

Node 18 or newer.

## Structure

The project separates facts from words. Anything that reads the same in every
language lives in `data/`; anything that needs translating lives in `i18n/`.
Add a job once, translate only its prose.

```
src/
  data/profile.js        PROFILE, ROLES, SKILL_GROUPS, EDUCATION — language-neutral
  i18n/en.js             English strings, keyed by the ids in data/
  i18n/fr.js             French strings, same keys
  i18n/index.js          dictionary registry + month names
  lib/format.js          pure helpers: date formatting, role filtering
  hooks/useTheme.js      theme state, persisted, follows the OS by default
  hooks/useLanguage.js   language state, persisted, follows the browser
  hooks/useReveal.js     scroll-reveal, honours prefers-reduced-motion
  context/AppContext.jsx provides { theme, lang, t } to the whole tree
  components/            one file per component
  styles/tokens.css      colours, fonts, spacing — every value in the design
  styles/base.css        element defaults, type scale, motion
  styles/components.css  component styles, in page order
  App.jsx                composition only, no logic
  main.jsx               entry point
```

## Change your photo

Drop the file in `src/assets/`, then edit `src/data/profile.js`:

```js
import photo from "../assets/me.jpg";

export const PROFILE = {
  photo,          // was: avatarPlaceholder
  ...
};
```

Use a square crop with the face centred, 400×400 or larger. It renders at 68px
with `object-fit: cover`, so a rectangular image gets cropped from the centre.

Set `photo: null` and the card falls back to an initials monogram — a deliberate
look, not a broken image. The `Avatar` component also falls back if the file is
missing at runtime, so the card never shows a broken-image icon.

## Add a job

Two edits. First the facts, in `src/data/profile.js` — put it in the right place,
the list is ordered newest start date first:

```js
{
  id: "acme",
  company: "Acme SA",
  city: "Tunis",
  start: "2026-03",
  end: null,                 // null means current
  mode: "remote",            // remote | hybrid | onsite
  tags: ["fullstack"],       // drives the filter chips
  stack: ["Angular", "Go"],
}
```

Then the prose, under `roles` in **both** `i18n/en.js` and `i18n/fr.js`, keyed by
the same `id`:

```js
acme: {
  title: "Staff Engineer",
  summary: "",
  bullets: ["What you built and what it did."],
},
```

Dates format themselves per language — you never write "March" or "mars".

## Change the colours

Everything resolves to `src/styles/tokens.css`. The two theme blocks
(`[data-theme="light"]` and `[data-theme="dark"]`) hold every colour in the
project; nothing is hard-coded in a component.

## Deploy

The build is fully static, so any host works.

- **Netlify / Vercel** — build `npm run build`, publish `dist`.
- **GitHub Pages** — set `base: "/<repo-name>/"` in `vite.config.js` first,
  then publish `dist`.

## Notes

- Fonts (IBM Plex Sans + Mono) load from Google Fonts in `index.html`.
  Self-host them if you'd rather not depend on a third party.
- Theme and language persist in `localStorage`. On a first visit they follow
  the operating system theme and the browser language.
- Accessible by default: visible keyboard focus, `aria-expanded` on the
  expanding rows, `aria-pressed` on the filters, and reduced motion respected.

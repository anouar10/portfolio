import { useApp } from "../context/AppContext.jsx";
import { PROFILE } from "../data/profile.js";
import { IconMoon, IconSun } from "./icons.jsx";

const NAV_KEYS = ["work", "skills", "education", "contact"];

export function TopBar() {
  const { t, theme, toggleTheme, lang, toggleLanguage } = useApp();

  return (
    <header className="bar">
      <div className="wrap bar-in">
        <a className="mark" href="#top">
          {PROFILE.name.toUpperCase()} <span>/ {t.tagline}</span>
        </a>

        <nav className="bar-nav">
          {NAV_KEYS.map((key) => (
            <a key={key} href={`#${key}`}>{t.nav[key]}</a>
          ))}
        </nav>

        <div className="bar-actions">
          <button className="ctrl" onClick={toggleLanguage} aria-label={t.a11y.lang}>
            {lang === "en" ? "FR" : "EN"}
          </button>
          <button className="ctrl" onClick={toggleTheme} aria-label={t.a11y.theme}>
            {theme === "light" ? <IconMoon /> : <IconSun />}
          </button>
        </div>
      </div>
    </header>
  );
}

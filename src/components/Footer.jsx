import { useApp } from "../context/AppContext.jsx";
import { PROFILE } from "../data/profile.js";

export function Footer() {
  const { t } = useApp();
  return (
    <footer className="wrap foot">
      <p>{t.footer}</p>
      <p>© {new Date().getFullYear()} {PROFILE.name}</p>
    </footer>
  );
}

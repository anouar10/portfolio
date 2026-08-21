import { useCallback, useEffect, useState } from "react";
import { DEFAULT_LANGUAGE, LANGUAGES, getDictionary } from "../i18n/index.js";

const STORAGE_KEY = "portfolio:lang";

function readInitialLanguage() {
  if (typeof window === "undefined") return DEFAULT_LANGUAGE;
  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (LANGUAGES.includes(saved)) return saved;
  const browser = navigator.language?.slice(0, 2);
  return LANGUAGES.includes(browser) ? browser : DEFAULT_LANGUAGE;
}

/**
 * Language state, persisted across visits. Opens in French for a French
 * browser, English otherwise, until the visitor chooses.
 */
export function useLanguage() {
  const [lang, setLang] = useState(readInitialLanguage);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.setAttribute("lang", lang);
  }, [lang]);

  const toggleLanguage = useCallback(
    () => setLang((current) => (current === "en" ? "fr" : "en")),
    []
  );

  return { lang, toggleLanguage, t: getDictionary(lang) };
}

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "portfolio:theme";

function readInitialTheme() {
  if (typeof window === "undefined") return "light";
  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (saved === "light" || saved === "dark") return saved;
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

/**
 * Theme state, persisted across visits. Falls back to the operating system
 * preference on a first visit, and keeps following it until the visitor
 * makes a choice of their own.
 */
export function useTheme() {
  const [theme, setTheme] = useState(readInitialTheme);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    const media = window.matchMedia?.("(prefers-color-scheme: dark)");
    if (!media) return;
    const onChange = (event) => {
      if (!window.localStorage.getItem(STORAGE_KEY)) {
        setTheme(event.matches ? "dark" : "light");
      }
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  const toggleTheme = useCallback(
    () => setTheme((current) => (current === "light" ? "dark" : "light")),
    []
  );

  return { theme, toggleTheme };
}

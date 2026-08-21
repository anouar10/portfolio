import { createContext, useContext, useMemo } from "react";
import { useTheme } from "../hooks/useTheme.js";
import { useLanguage } from "../hooks/useLanguage.js";

/**
 * Theme and language are needed almost everywhere, so they are provided once
 * here instead of threaded through every component as props. Everything else
 * stays local to the component that owns it.
 */

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const { theme, toggleTheme } = useTheme();
  const { lang, toggleLanguage, t } = useLanguage();

  const value = useMemo(
    () => ({ theme, toggleTheme, lang, toggleLanguage, t }),
    [theme, toggleTheme, lang, toggleLanguage, t]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used inside <AppProvider>.");
  }
  return context;
}

import { en } from "./en.js";
import { fr } from "./fr.js";

export const LANGUAGES = ["en", "fr"];
export const DEFAULT_LANGUAGE = "en";
export const DICTIONARIES = { en, fr };

export const MONTHS = {
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  fr: ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."],
};

/** Returns the dictionary for a language, falling back to the default. */
export function getDictionary(lang) {
  return DICTIONARIES[lang] ?? DICTIONARIES[DEFAULT_LANGUAGE];
}

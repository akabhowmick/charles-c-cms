import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { dictionaries, type Dictionary, type Locale } from "@/lib/i18n";

const STORAGE_KEY = "faithful-serve.locale";

interface LocaleState {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  t: Dictionary;
}

const LocaleContext = createContext<LocaleState | null>(null);

function getInitialLocale(): Locale {
  return localStorage.getItem(STORAGE_KEY) === "ko" ? "ko" : "en";
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(getInitialLocale);

  useEffect(() => {
    document.documentElement.lang = locale;
    localStorage.setItem(STORAGE_KEY, locale);
  }, [locale]);

  function toggleLocale() {
    setLocale((current) => (current === "en" ? "ko" : "en"));
  }

  return (
    <LocaleContext.Provider value={{ locale, setLocale, toggleLocale, t: dictionaries[locale] }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used inside LocaleProvider");
  return ctx;
}

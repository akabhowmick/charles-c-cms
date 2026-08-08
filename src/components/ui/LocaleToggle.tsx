import { Languages } from "lucide-react";
import { useLocale } from "@/context/LocaleContext";
import { cn } from "@/lib/utils";

export function LocaleToggle({ className }: { className?: string }) {
  const { locale, toggleLocale, t } = useLocale();

  return (
    <button
      type="button"
      onClick={toggleLocale}
      aria-label={locale === "en" ? t.layout.switchToKorean : t.layout.switchToEnglish}
      className={cn(
        "inline-flex items-center justify-center gap-1.5 rounded-full border border-taupe-light px-3.5 py-1.5 text-sm font-medium text-ink-soft transition-colors hover:border-pine hover:text-pine",
        className,
      )}
    >
      <Languages size={15} aria-hidden="true" />
      <span aria-hidden="true">{locale === "en" ? "한국어" : "EN"}</span>
    </button>
  );
}

import { useState } from "react";
import { events, GROUP_LABELS, type AgeGroup } from "@/data/events";
import { EventCard } from "@/components/EventCard";
import { Eyebrow } from "@/components/Eyebrow";
import { Reveal } from "@/components/Reveal";
import { useLocale } from "@/context/LocaleContext";
import { cn } from "@/lib/utils";

const filters: Array<AgeGroup | "everything"> = [
  "everything",
  "youth",
  "college",
  "adults",
  "all",
];

export function Opportunities() {
  const { t } = useLocale();
  const [filter, setFilter] = useState<AgeGroup | "everything">("everything");
  const shown =
    filter === "everything" ? events : events.filter((e) => e.group === filter);

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <Reveal>
        <Eyebrow ko="봉사와 기회" en="Volunteering & opportunities" />
        <h1 className="mt-3 font-display text-4xl font-bold">
          {t.opportunities.heading}
        </h1>
        <p className="mt-3 max-w-2xl text-ink-soft">{t.opportunities.subtitle}</p>
      </Reveal>

      <div
        role="group"
        aria-label={t.opportunities.filterAriaLabel}
        className="mt-8 flex flex-wrap gap-2"
      >
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
              filter === f
                ? "border-pine bg-pine text-paper"
                : "border-taupe-strong bg-white text-ink-soft hover:border-pine hover:text-pine",
            )}
          >
            {f === "everything" ? t.opportunities.filterEverything : GROUP_LABELS[f].en}
          </button>
        ))}
      </div>

      <p className="sr-only" role="status">
        {t.opportunities.showingCount(shown.length)}
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((e, i) => (
          <Reveal key={e.id} delay={i * 60}>
            <EventCard event={e} />
          </Reveal>
        ))}
      </div>

      {shown.length === 0 && (
        <p className="mt-12 rounded-2xl border border-dashed border-taupe-strong p-10 text-center text-ink-soft">
          {t.opportunities.emptyState}
        </p>
      )}
    </div>
  );
}

import { useState } from "react";
import { events, GROUP_LABELS, type AgeGroup } from "@/data/events";
import { EventCard } from "@/components/EventCard";
import { Eyebrow } from "@/components/Eyebrow";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";

const filters: Array<AgeGroup | "everything"> = [
  "everything",
  "youth",
  "college",
  "adults",
  "all",
];

export function Opportunities() {
  const [filter, setFilter] = useState<AgeGroup | "everything">("everything");
  const shown =
    filter === "everything" ? events : events.filter((e) => e.group === filter);

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <Reveal>
        <Eyebrow ko="봉사와 기회" en="Volunteering & opportunities" />
        <h1 className="mt-3 font-display text-4xl font-bold">
          Find your place to serve
        </h1>
        <p className="mt-3 max-w-2xl text-ink-soft">
          Every upcoming event, trip, and ongoing team, organized by age group. Sign in
          to reserve a spot.
        </p>
      </Reveal>

      <div
        role="group"
        aria-label="Filter events by age group"
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
                : "border-taupe-light bg-white text-ink-soft hover:border-pine hover:text-pine",
            )}
          >
            {f === "everything" ? "Everything" : GROUP_LABELS[f].en}
          </button>
        ))}
      </div>

      <p className="sr-only" role="status">
        Showing {shown.length} {shown.length === 1 ? "event" : "events"}
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((e, i) => (
          <Reveal key={e.id} delay={i * 60}>
            <EventCard event={e} />
          </Reveal>
        ))}
      </div>

      {shown.length === 0 && (
        <p className="mt-12 rounded-2xl border border-dashed border-taupe-light p-10 text-center text-ink-soft">
          No events in this group right now. Check back soon or browse everything.
        </p>
      )}
    </div>
  );
}

import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { events } from "@/data/events";
import { highlights } from "@/data/highlights";
import { EventCard } from "@/components/EventCard";
import { Eyebrow } from "@/components/Eyebrow";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/Button";
import { formatDate } from "@/lib/utils";

export function Home() {
  const upcoming = [...events]
    .filter((e) => e.spotsTaken < e.spotsTotal)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--color-pine-tint),transparent_55%)]"
        />
        <div className="relative mx-auto max-w-6xl px-4 pb-20 pt-16 sm:px-6 md:pb-28 md:pt-24">
          <Reveal>
            <p lang="ko" className="font-display text-2xl font-bold text-taupe md:text-3xl">
              함께 섬기다
            </p>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="mt-2 max-w-3xl font-display text-4xl font-bold leading-[1.15] md:text-6xl">
              Serve together.
              <br />
              Everything in one place.
            </h1>
          </Reveal>
          <Reveal delay={240}>
            <p className="mt-6 max-w-xl text-lg text-ink-soft">
              Mission trips, shoebox drives, retreats, praise team, and fellowship
              dinners for every age group. Find your place, see what's coming up, and
              sign up in two minutes.
            </p>
          </Reveal>
          <Reveal delay={360}>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/opportunities">
                <Button size="lg">
                  Browse opportunities <ArrowRight size={18} aria-hidden="true" />
                </Button>
              </Link>
              <Link to="/highlights">
                <Button variant="secondary" size="lg">
                  See past highlights
                </Button>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Upcoming */}
      <section aria-labelledby="upcoming-heading" className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <Eyebrow ko="다가오는 일정" en="Coming up" />
          <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
            <h2 id="upcoming-heading" className="font-display text-3xl font-bold">
              Open for sign-up now
            </h2>
            <Link
              to="/opportunities"
              className="text-sm font-semibold text-pine underline-offset-4 hover:underline"
            >
              View all events
            </Link>
          </div>
        </Reveal>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {upcoming.map((e, i) => (
            <Reveal key={e.id} delay={i * 100}>
              <EventCard event={e} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Latest highlight */}
      <section
        aria-labelledby="highlight-heading"
        className="mx-auto mt-24 max-w-6xl px-4 sm:px-6"
      >
        <div className="overflow-hidden rounded-3xl bg-pine-deep text-paper">
          <div className="grid md:grid-cols-[1fr_auto]">
            <div className="p-8 md:p-12">
              <Reveal>
                <p className="flex items-baseline gap-3">
                  <span lang="ko" className="font-display text-lg font-bold text-taupe-light">
                    {highlights[0].eyebrowKo}
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-taupe-light">
                    {highlights[0].eyebrowEn} · {formatDate(highlights[0].date)}
                  </span>
                </p>
                <h2 id="highlight-heading" className="mt-3 font-display text-3xl font-bold">
                  {highlights[0].title}
                </h2>
                <p className="mt-4 max-w-2xl leading-relaxed text-paper/80">
                  {highlights[0].body}
                </p>
                <Link to="/highlights" className="mt-6 inline-block">
                  <Button variant="secondary" className="border-paper/40 text-paper hover:bg-paper/10">
                    More highlights
                  </Button>
                </Link>
              </Reveal>
            </div>
            {highlights[0].stat && (
              <div className="flex items-center border-t border-paper/15 px-8 py-6 md:border-l md:border-t-0 md:px-12">
                <Reveal delay={150}>
                  <p className="font-display text-5xl font-bold text-taupe-light">
                    {highlights[0].stat.value}
                  </p>
                  <p className="mt-1 text-sm text-paper/70">{highlights[0].stat.label}</p>
                </Reveal>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

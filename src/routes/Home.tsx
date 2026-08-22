import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { events } from "@/data/events";
import { EventCard } from "@/components/EventCard";
import { Eyebrow } from "@/components/Eyebrow";
import { HeroCarousel } from "@/components/HeroCarousel";
import { Reveal } from "@/components/Reveal";
import { buttonClasses } from "@/components/ui/Button";
import { useLocale } from "@/context/LocaleContext";
import { useReviews } from "@/hooks/useReviews";
import { formatDate } from "@/lib/utils";

export function Home() {
  const { locale, t } = useLocale();
  const { reviews } = useReviews();
  const latest = reviews[0];
  const upcoming = [...events]
    .filter((e) => e.spotsTaken < e.spotsTotal)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <HeroCarousel />
        <div className="relative mx-auto max-w-6xl px-4 pb-20 pt-16 sm:px-6 md:pb-28 md:pt-24">
          <Reveal>
            <p lang="ko" className="font-display text-2xl font-bold text-taupe md:text-3xl">
              함께 섬기다
            </p>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="mt-2 max-w-3xl font-display text-4xl font-bold leading-[1.15] md:text-6xl">
              {t.home.heroTitleLine1}
              <br />
              {t.home.heroTitleLine2}
            </h1>
          </Reveal>
          <Reveal delay={240}>
            <p className="mt-6 max-w-xl text-lg text-ink-soft">
              {t.home.heroSubtitle}
            </p>
          </Reveal>
          <Reveal delay={360}>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/opportunities" className={buttonClasses({ size: "lg" })}>
                {t.home.browseOpportunities} <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <Link to="/footsteps" className={buttonClasses({ variant: "secondary", size: "lg" })}>
                {t.home.seePastHighlights}
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
              {t.home.openForSignupNow}
            </h2>
            <Link
              to="/opportunities"
              className="text-sm font-semibold text-pine underline-offset-4 hover:underline"
            >
              {t.home.viewAllEvents}
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

      {/* Latest year-in-review entry — hidden until reviews have loaded. */}
      {latest && (
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
                      {latest.eyebrowKo}
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-taupe-light">
                      {latest.eyebrowEn} · {formatDate(latest.date, locale)}
                    </span>
                  </p>
                  <h2 id="highlight-heading" className="mt-3 font-display text-3xl font-bold">
                    {latest.title}
                  </h2>
                  <p className="mt-4 max-w-2xl leading-relaxed text-paper/80">
                    {locale === "ko" ? latest.bodyKo : latest.body}
                  </p>
                  <Link
                    to="/footsteps"
                    className={buttonClasses({
                      variant: "secondary",
                      className: "mt-6 border-paper/40 text-paper hover:bg-paper/10",
                    })}
                  >
                    {t.home.moreHighlights}
                  </Link>
                </Reveal>
              </div>
              {latest.stat && (
                <div className="flex items-center border-t border-paper/15 px-8 py-6 md:border-l md:border-t-0 md:px-12">
                  <Reveal delay={150}>
                    <p className="font-display text-5xl font-bold text-taupe-light">
                      {latest.stat.value}
                    </p>
                    <p className="mt-1 text-sm text-paper/70">
                      {locale === "ko" ? latest.stat.labelKo : latest.stat.label}
                    </p>
                  </Reveal>
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

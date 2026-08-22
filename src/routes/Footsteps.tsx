import { useState } from "react";
import { type Photo } from "@/data/photos";
import { type Review } from "@/data/reviews";
import { Eyebrow } from "@/components/Eyebrow";
import { PhotoGrid } from "@/components/PhotoGrid";
import { PhotoLightbox } from "@/components/PhotoLightbox";
import { Reveal } from "@/components/Reveal";
import { useReviews, groupByYear } from "@/hooks/useReviews";
import { useLocale } from "@/context/LocaleContext";
import { formatDate } from "@/lib/utils";

function ReviewCard({ review }: { review: Review }) {
  const { locale } = useLocale();
  return (
    <article className="grid gap-6 rounded-3xl border border-taupe-strong bg-white p-8 md:grid-cols-[1fr_auto] md:p-10">
      <div>
        <p className="flex items-baseline gap-3 text-taupe">
          <span lang="ko" className="font-display text-base font-bold text-pine">
            {review.eyebrowKo}
          </span>
          <span className="text-xs font-semibold uppercase tracking-[0.2em]">
            {review.eyebrowEn}
            {review.date && ` · ${formatDate(review.date, locale)}`}
          </span>
        </p>
        <h4 className="mt-3 font-display text-2xl font-bold">{review.title}</h4>
        <p className="mt-4 leading-relaxed text-ink-soft">
          {locale === "ko" ? review.bodyKo : review.body}
        </p>
      </div>
      {review.stat && (
        <div className="flex items-center gap-3 border-t border-taupe-strong pt-5 md:flex-col md:items-end md:justify-center md:border-l md:border-t-0 md:pl-8 md:pt-0 md:text-right">
          <p className="font-display text-4xl font-bold text-pine">{review.stat.value}</p>
          <p className="text-sm text-ink-soft md:mt-1">
            {locale === "ko" ? review.stat.labelKo : review.stat.label}
          </p>
        </div>
      )}
    </article>
  );
}

function ReviewSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="h-52 animate-pulse rounded-3xl border border-taupe-strong bg-paper-deep"
    />
  );
}

export function Footsteps() {
  const { t } = useLocale();
  const { reviews, loading } = useReviews();
  const [active, setActive] = useState<Photo | null>(null);
  const years = groupByYear(reviews);

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <Reveal>
        <Eyebrow ko="교회 발자취" en="Church Footsteps" />
        <h1 className="mt-3 font-display text-4xl font-bold">{t.footsteps.heading}</h1>
        <p className="mt-3 max-w-2xl text-ink-soft">{t.footsteps.subtitle}</p>
      </Reveal>

      <section aria-labelledby="reviews-heading" className="mt-14">
        <Reveal>
          <h2 id="reviews-heading" className="font-display text-3xl font-bold">
            {t.footsteps.reviewsHeading}
          </h2>
        </Reveal>

        <div role="status" aria-live="polite">
          {loading && <p className="sr-only">{t.footsteps.loading}</p>}
        </div>

        {loading ? (
          <div className="mt-8 space-y-6">
            <ReviewSkeleton />
            <ReviewSkeleton />
          </div>
        ) : (
          <div className="mt-8 max-w-4xl space-y-12">
            {years.map(([year, group]) => (
              <div key={year}>
                <h3 className="font-display text-xl font-bold text-taupe">
                  {t.footsteps.yearLabel(year)}
                </h3>
                <div className="mt-5 space-y-8">
                  {group.map((r, i) => (
                    <Reveal key={r.id} delay={i * 80}>
                      <ReviewCard review={r} />
                    </Reveal>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section aria-labelledby="photos-heading" className="mt-20">
        <Reveal>
          <h2 id="photos-heading" className="font-display text-3xl font-bold">
            {t.footsteps.photosHeading}
          </h2>
          <p className="mt-3 max-w-2xl text-ink-soft">{t.footsteps.photosSubtitle}</p>
        </Reveal>
        <PhotoGrid onSelect={setActive} />
      </section>

      {active && <PhotoLightbox photo={active} onClose={() => setActive(null)} />}
    </div>
  );
}

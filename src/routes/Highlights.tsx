import { highlights } from "@/data/highlights";
import { Eyebrow } from "@/components/Eyebrow";
import { Reveal } from "@/components/Reveal";
import { useLocale } from "@/context/LocaleContext";
import { formatDate } from "@/lib/utils";

export function Highlights() {
  const { locale, t } = useLocale();
  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
      <Reveal>
        <Eyebrow ko="지난 이야기" en="Highlights" />
        <h1 className="mt-3 font-display text-4xl font-bold">{t.highlights.heading}</h1>
        <p className="mt-3 max-w-2xl text-ink-soft">{t.highlights.subtitle}</p>
      </Reveal>

      <div className="mt-12 space-y-10">
        {highlights.map((h, i) => (
          <Reveal key={h.id} delay={i * 80}>
            <article className="grid gap-6 rounded-3xl border border-taupe-light/60 bg-white p-8 md:grid-cols-[1fr_auto] md:p-10">
              <div>
                <p className="flex items-baseline gap-3 text-taupe">
                  <span lang="ko" className="font-display text-base font-bold text-pine">
                    {h.eyebrowKo}
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-[0.2em]">
                    {h.eyebrowEn} · {formatDate(h.date, locale)}
                  </span>
                </p>
                <h2 className="mt-3 font-display text-2xl font-bold">{h.title}</h2>
                <p className="mt-4 leading-relaxed text-ink-soft">
                  {locale === "ko" ? h.bodyKo : h.body}
                </p>
              </div>
              {h.stat && (
                <div className="flex items-center gap-3 border-t border-taupe-light/50 pt-5 md:flex-col md:items-end md:justify-center md:border-l md:border-t-0 md:pl-8 md:pt-0 md:text-right">
                  <p className="font-display text-4xl font-bold text-pine">{h.stat.value}</p>
                  <p className="text-sm text-ink-soft md:mt-1">
                    {locale === "ko" ? h.stat.labelKo : h.stat.label}
                  </p>
                </div>
              )}
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

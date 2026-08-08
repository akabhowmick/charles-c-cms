import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { photos, type Photo } from "@/data/photos";
import { Eyebrow } from "@/components/Eyebrow";
import { Reveal } from "@/components/Reveal";
import { useLocale } from "@/context/LocaleContext";

export function Photos() {
  const { t } = useLocale();
  const [active, setActive] = useState<Photo | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!active) return;
    lastFocused.current = document.activeElement as HTMLElement;
    dialogRef.current?.focus();
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setActive(null);
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      lastFocused.current?.focus();
    };
  }, [active]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <Reveal>
        <Eyebrow ko="사진첩" en="Photos" />
        <h1 className="mt-3 font-display text-4xl font-bold">{t.photos.heading}</h1>
        <p className="mt-3 max-w-2xl text-ink-soft">{t.photos.subtitle}</p>
      </Reveal>

      <ul className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4" role="list">
        {photos.map((p, i) => (
          <li key={p.id}>
            <Reveal delay={i * 50}>
              <button
                type="button"
                onClick={() => setActive(p)}
                className="group block w-full overflow-hidden rounded-2xl text-left"
                aria-label={`${t.photos.viewPhotoPrefix} ${p.alt}`}
              >
                <div
                  className="relative aspect-square w-full transition-transform duration-500 group-hover:scale-[1.04]"
                  style={{ backgroundColor: p.tone }}
                >
                  <span
                    lang="ko"
                    aria-hidden="true"
                    className="absolute inset-0 flex items-center justify-center font-display text-3xl font-bold text-paper/60"
                  >
                    {p.labelKo}
                  </span>
                </div>
                <p className="mt-2 text-sm font-medium text-ink-soft group-hover:text-pine">
                  {p.label}
                </p>
              </button>
            </Reveal>
          </li>
        ))}
      </ul>

      {active && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/70 p-4 backdrop-blur-sm"
          onClick={() => setActive(null)}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={active.label}
            tabIndex={-1}
            className="w-full max-w-2xl rounded-3xl bg-paper p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-display text-2xl font-bold">{active.label}</h2>
                <p lang="ko" className="text-taupe">{active.labelKo}</p>
              </div>
              <button
                type="button"
                onClick={() => setActive(null)}
                aria-label={t.photos.closePhotoView}
                className="rounded-full p-2 text-ink-soft hover:bg-paper-deep"
              >
                <X aria-hidden="true" />
              </button>
            </div>
            <div
              className="mt-4 flex aspect-video items-center justify-center rounded-2xl"
              style={{ backgroundColor: active.tone }}
            >
              <p className="max-w-md px-6 text-center text-sm text-paper/80">{active.alt}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import { photos, type Photo } from "@/data/photos";
import { Reveal } from "@/components/Reveal";
import { useLocale } from "@/context/LocaleContext";

export function PhotoGrid({ onSelect }: { onSelect: (photo: Photo) => void }) {
  const { t } = useLocale();

  return (
    <ul className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4" role="list">
      {photos.map((p, i) => (
        <li key={p.id}>
          <Reveal delay={i * 50}>
            <button
              type="button"
              onClick={() => onSelect(p)}
              className="group block w-full overflow-hidden rounded-2xl text-left"
              aria-label={`${t.footsteps.viewPhotoPrefix} ${p.alt}`}
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
  );
}

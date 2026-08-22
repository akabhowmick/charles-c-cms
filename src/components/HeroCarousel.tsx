import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { heroImages } from "@/data/heroImages";
import { useLocale } from "@/context/LocaleContext";

const INTERVAL_MS = 6000;

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

/**
 * Decorative crossfading backdrop for the hero.
 *
 * The images carry no information the <h1> doesn't already state, so the whole layer is
 * aria-hidden — nothing is announced as it rotates. See A11Y-DECISIONS.md.
 *
 * Autoplay obligations (WCAG 2.2.2 Pause/Stop/Hide, 2.3.3 Animation from Interactions):
 * a visible pause control is always rendered while rotating, and prefers-reduced-motion
 * stops the timer entirely rather than just shortening the CSS transition.
 */
export function HeroCarousel() {
  const { t } = useLocale();
  const reducedMotion = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<number | null>(null);

  const rotating = heroImages.length > 1 && !reducedMotion && !paused;

  useEffect(() => {
    if (!rotating) return;

    function tick() {
      if (!document.hidden) setIndex((i) => (i + 1) % heroImages.length);
    }
    timer.current = window.setInterval(tick, INTERVAL_MS);
    return () => {
      if (timer.current !== null) window.clearInterval(timer.current);
      timer.current = null;
    };
  }, [rotating]);

  // No photography collected yet — fall back to the original gradient wash.
  if (heroImages.length === 0) {
    return (
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--color-pine-tint),transparent_55%)]"
      />
    );
  }

  return (
    <>
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
        {heroImages.map((img, i) => (
          <img
            key={img.id}
            src={img.src}
            alt=""
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 motion-reduce:transition-none ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        {/* Scrim: keeps hero text above 4.5:1 regardless of which slide is showing. */}
        <div className="absolute inset-0 bg-ink/45" />
      </div>

      {heroImages.length > 1 && !reducedMotion && (
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-pressed={paused}
          aria-label={paused ? t.home.heroPlay : t.home.heroPause}
          className="absolute bottom-4 right-4 z-10 rounded-full bg-ink/60 p-2.5 text-paper transition-colors hover:bg-ink/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-paper"
        >
          {paused ? <Play size={18} aria-hidden="true" /> : <Pause size={18} aria-hidden="true" />}
        </button>
      )}
    </>
  );
}

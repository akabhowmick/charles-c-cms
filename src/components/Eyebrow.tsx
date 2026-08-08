/**
 * Signature element: bilingual section eyebrow.
 * Korean word set in the display serif, English label beside it.
 */
export function Eyebrow({ ko, en }: { ko: string; en: string }) {
  return (
    <p className="flex items-baseline gap-3 text-taupe">
      <span lang="ko" className="font-display text-lg font-bold text-pine">
        {ko}
      </span>
      <span aria-hidden="true" className="h-px w-8 self-center bg-taupe-light" />
      <span className="text-xs font-semibold uppercase tracking-[0.2em]">{en}</span>
    </p>
  );
}

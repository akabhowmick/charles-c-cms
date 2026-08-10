import type { ReactNode } from "react";

/** Consistent heading + prose block for legal pages (Privacy, Terms, Accessibility). */
export function LegalSection({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="font-display text-xl font-bold text-ink">{heading}</h2>
      <div className="mt-3 space-y-3 text-ink-soft leading-relaxed">{children}</div>
    </section>
  );
}

import type { ReactNode } from "react";

/** Visible placeholder marker for unfilled legal-copy fields. Pass the full bracketed text as children. */
export function Todo({ children }: { children: ReactNode }) {
  return <span className="rounded bg-paper-deep px-1 font-mono text-sm">{children}</span>;
}

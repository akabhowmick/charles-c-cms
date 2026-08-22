import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { type Photo } from "@/data/photos";
import { useLocale } from "@/context/LocaleContext";

/**
 * Focus-trap dialog for a single photo. The trap below is the project's agreed modal
 * pattern (see A11Y-DECISIONS.md) — moved here verbatim from the old Photos route.
 */
export function PhotoLightbox({
  photo,
  onClose,
}: {
  photo: Photo;
  onClose: () => void;
}) {
  const { t } = useLocale();
  const dialogRef = useRef<HTMLDivElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    lastFocused.current = document.activeElement as HTMLElement;
    dialogRef.current?.focus();

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "Tab" && dialogRef.current) {
        const focusable = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
          ),
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        const activeIndex = focusable.indexOf(document.activeElement as HTMLElement);
        if (activeIndex === -1) {
          // Focus is still on the dialog's own -1-tabindex container (initial state) — enter the trap.
          e.preventDefault();
          (e.shiftKey ? last : first).focus();
        } else if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      lastFocused.current?.focus();
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/70 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={photo.label}
        tabIndex={-1}
        className="w-full max-w-2xl rounded-3xl bg-paper p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl font-bold">{photo.label}</h2>
            <p lang="ko" className="text-taupe">{photo.labelKo}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={t.footsteps.closePhotoView}
            className="rounded-full p-2 text-ink-soft hover:bg-paper-deep"
          >
            <X aria-hidden="true" />
          </button>
        </div>
        <div
          className="mt-4 flex aspect-video items-center justify-center rounded-2xl"
          style={{ backgroundColor: photo.tone }}
        >
          <p className="max-w-md px-6 text-center text-sm text-paper/80">{photo.alt}</p>
        </div>
      </div>
    </div>
  );
}

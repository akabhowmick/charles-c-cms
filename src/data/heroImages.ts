export interface HeroImage {
  id: string;
  /** Path under public/hero/. */
  src: string;
  /** Kept for the file record only — the hero layer is decorative and aria-hidden. */
  alt: string;
}

/**
 * Empty until real photography is collected (see todo.md). While empty the hero falls
 * back to its original gradient wash, so nothing renders broken.
 */
export const heroImages: HeroImage[] = [];

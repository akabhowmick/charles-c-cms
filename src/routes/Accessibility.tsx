import { Eyebrow } from "@/components/Eyebrow";
import { LegalSection } from "@/components/LegalSection";
import { Reveal } from "@/components/Reveal";
import { Todo } from "@/components/Todo";

export function Accessibility() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <Reveal>
        <Eyebrow ko="접근성" en="Accessibility" />
        <h1 className="mt-3 font-display text-4xl font-bold">Accessibility</h1>
        <p className="mt-2 text-sm text-ink-soft">
          Last reviewed: <Todo>[DATE]</Todo>
        </p>
      </Reveal>

      <LegalSection heading="Our commitment">
        <p>
          We are building this site to meet WCAG 2.2 Level AA, the standard most public
          websites are held to for accessibility.
        </p>
      </LegalSection>

      <LegalSection heading="What's in place">
        <ul className="list-disc space-y-1 pl-5">
          <li>Full keyboard navigation, with no mouse required</li>
          <li>Visible focus indicators on every interactive element</li>
          <li>Semantic landmarks and headings so screen readers can navigate the page</li>
          <li>Alt text on images</li>
          <li>Respect for your device's reduced motion setting</li>
          <li>Color contrast that meets AA</li>
          <li>Forms with labelled fields and errors that are announced, not just shown</li>
        </ul>
      </LegalSection>

      <LegalSection heading="Known limitations">
        <p>
          <Todo>[PLACEHOLDER: list any as they're found]</Todo> The photo gallery currently
          uses placeholder tiles pending real photos.
        </p>
      </LegalSection>

      <LegalSection heading="Third-party services">
        <p>
          Sign-in and data storage on this site are handled by Supabase. We do not control
          the accessibility of their interfaces directly.
        </p>
      </LegalSection>

      <LegalSection heading="Tell us about a barrier">
        <p>
          If something on this site does not work for you, email{" "}
          <Todo>[CONTACT EMAIL]</Todo> and we will respond within{" "}
          <Todo>[RESPONSE WINDOW]</Todo>. Please describe the page you were on and what
          happened, so we can find and fix it.
        </p>
      </LegalSection>
    </div>
  );
}

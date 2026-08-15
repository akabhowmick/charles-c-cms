import { Eyebrow } from "@/components/Eyebrow";
import { LegalSection } from "@/components/LegalSection";
import { Reveal } from "@/components/Reveal";
import { Todo } from "@/components/Todo";

export function Terms() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <Reveal>
        <Eyebrow ko="이용약관" en="Terms" />
        <h1 className="mt-3 font-display text-4xl font-bold">Terms of use</h1>
        <p className="mt-2 text-sm text-ink-soft">
          Last updated: <Todo>2026-08-14</Todo>
        </p>
      </Reveal>

      <LegalSection heading="What this site is for">
        <p>
          This site is for browsing and signing up for volunteer opportunities at Faithful Church of
          New York.
        </p>
      </LegalSection>

      <LegalSection heading="Accounts">
        <p>
          Please keep to one account per person, and keep your password private. Give us accurate
          information when you sign up. If you are under 18, a parent or guardian must hold the
          account for you.
        </p>
      </LegalSection>

      <LegalSection heading="Sign-ups">
        <p>
          Reserving a spot at an event is a request, not a guarantee. Organizers may reassign or
          cancel spots, and events may change or be cancelled.
        </p>
      </LegalSection>

      <LegalSection heading="Conduct">
        <p>Please do not:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>sign someone else up for an event without their permission</li>
          <li>misuse the contact form</li>
          <li>try to access other volunteers' information</li>
        </ul>
      </LegalSection>

      <LegalSection heading="Account removal">
        <p>Faithful Church of New York may suspend or remove accounts that violate these terms.</p>
      </LegalSection>

      <LegalSection heading="Liability">
        <p>
          Participation in events is voluntary and at your own risk. This site is provided as is,
          with no warranty. Separate waivers may be required for trips and retreats.{" "}
          {/* <Todo>[CONFIRM WITH CHURCH: waiver process for mission trips]</Todo> */}
        </p>
      </LegalSection>

      <LegalSection heading="Payments">
        <p>
          Payments are not currently collected through this site.{" "}
          {/* <Todo>[PLACEHOLDER: refund and cancellation terms to be added when payments launch]</Todo> */}
        </p>
      </LegalSection>

      <LegalSection heading="Governing law">
        <p>These terms are governed by the laws of New York.</p>
      </LegalSection>
    </div>
  );
}

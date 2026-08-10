import { Eyebrow } from "@/components/Eyebrow";
import { LegalSection } from "@/components/LegalSection";
import { Reveal } from "@/components/Reveal";
import { Todo } from "@/components/Todo";

export function Privacy() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <Reveal>
        <Eyebrow ko="개인정보" en="Privacy" />
        <h1 className="mt-3 font-display text-4xl font-bold">Privacy policy</h1>
        <p className="mt-2 text-sm text-ink-soft">
          Last updated: <Todo>[DATE]</Todo>
        </p>
      </Reveal>

      <LegalSection heading="What we collect">
        <p>
          When you create an account and sign up for events, we collect your name, email
          address, and password. Your password is hashed by Supabase Auth, so we never see
          or store it in plain text. If you leave a note when signing up for an event, we
          keep that too, along with a record of which events you signed up for.
        </p>
      </LegalSection>

      <LegalSection heading="Why we collect it">
        <p>
          We use this information to manage event rosters and to contact volunteers about
          the events they signed up for. That is the whole reason it exists. We do not sell
          your information or share it with third parties.
        </p>
      </LegalSection>

      <LegalSection heading="Where it's stored">
        <p>
          Your information is stored with Supabase, a hosted database provider, on servers
          in <Todo>[REGION]</Todo>.
        </p>
      </LegalSection>

      <LegalSection heading="Who can see it">
        <p>
          You can see your own information at any time from your account. Church event
          organizers with admin access can see sign-up rosters so they can plan and run
          events.
        </p>
      </LegalSection>

      <LegalSection heading="Minors">
        <p>
          Volunteers under 18 must be registered by a parent or guardian, and a parent or
          guardian must be the account holder. We do not knowingly create accounts for
          children under 13. <Todo>[CONFIRM WITH CHURCH: parental consent process]</Todo>
        </p>
      </LegalSection>

      <LegalSection heading="Photos">
        <p>
          Photos on this site are used with consent on file. If you would like a photo of
          you or your child removed, contact <Todo>[CONTACT EMAIL]</Todo> and we will take
          it down.
        </p>
      </LegalSection>

      <LegalSection heading="Data retention">
        <p>
          Sign-up records are kept for <Todo>[RETENTION PERIOD]</Todo> after an event, then
          deleted.
        </p>
      </LegalSection>

      <LegalSection heading="Your choices">
        <p>
          You can request a copy or deletion of your data at any time by emailing{" "}
          <Todo>[CONTACT EMAIL]</Todo>. Accounts can be deleted on request.
        </p>
      </LegalSection>

      <LegalSection heading="Changes to this policy">
        <p>
          If this policy changes, we will update the date at the top of this page. Check
          back here if you want to know what has changed.
        </p>
      </LegalSection>

      <LegalSection heading="Contact">
        <p>
          <Todo>[CHURCH LEGAL NAME]</Todo>
          <br />
          <Todo>[MAILING ADDRESS]</Todo>
          <br />
          <Todo>[CONTACT EMAIL]</Todo>
        </p>
      </LegalSection>
    </div>
  );
}

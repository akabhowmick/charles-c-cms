# Manual review checklist

Everything here needs a human decision, an outside account/service, or a person with
assistive tech. Nothing on this list can be resolved by editing code alone. Grouped by
topic, each with a rough time estimate.

---

## 1. Legal page content (fill in the `[bracketed]` placeholders)

### Needs an actual policy decision, not just a lookup

- [ ] **Data retention period** for sign-up records after an event (30-60 min discussion
      with whoever owns this decision) - `Privacy.tsx` Data retention section
- [ ] **Parental consent process** for volunteers under 18 (1-2 hours: decide the process,
      then someone needs to write a sentence or two describing it) - `Privacy.tsx` Minors
      section, currently commented out
- [ ] **Waiver process for mission trips/retreats** - does a paper or digital waiver
      already exist separately from this site? (30-60 min to confirm and summarize) -
      `Terms.tsx` Liability section, currently commented out
- [ ] **Refund/cancellation terms** (5 min once payments are actually being designed - not
      urgent, no rush on this one) - `Terms.tsx` Payments section, currently commented out

### Accessibility-specific placeholders

- [ ] **Known accessibility limitations list** (10 min) - `Accessibility.tsx` Known
      limitations section, currently commented out. Can be filled in now with EXT-2026-004
      below once that's resolved either way.

---

## 2. Accessibility follow-ups (from the A11Y.md audit)

See `REPORT.md` and `EXCEPTIONS.md` for full detail on all of these.

- [ ] **EXT-2026-004: photo tile contrast** (10 min to accept as WCAG-exempt and fill in
      Risk Owner/Approver/Tracking Issue in `EXCEPTIONS.md`, or 15 min of code work to
      actually fix the tile's tone/opacity) - one photo tile's decorative Korean watermark
      fails contrast against its background color
- [ ] **Screen reader pass** with VoiceOver (Mac) or NVDA (1-2 hours) - walk the main task
      (browse, toggle language, sign up for an event, cancel a sign-up) and confirm
      everything is announced sensibly
- [ ] **200% text zoom check** (30 min) - browser zoom to 200% on a few key pages and
      confirm nothing is cut off or overlapping
- [ ] **Color blindness / vision-deficiency simulation pass** (30 min, e.g. using a browser
      extension simulator) - confirm nothing relies on color alone to convey meaning

---

## 3. Site assets and identity

- [ ] **Favicon** (15-30 min) - `public/favicon.svg` is still the old placeholder (green
      square with the Korean character "섬"), unrelated to the real FCNY logo now in use
      everywhere else. Needs regenerating from `src/assets/logo.png` (or a square-cropped
      variant of it - see logo creation below) so the browser tab matches the actual brand.
- [ ] **Logo creation** (30-60 min if the church can provide one, longer if it needs to be
      designed from scratch) - `src/assets/logo.png` is a single 292×124 horizontal wordmark
      PNG. That works fine for the header/footer, but a square icon-only mark (just the
      "FCNY" letters, no subtitle) and/or a higher-resolution or vector (SVG) source would
      make the favicon, any future app icon, and social-share previews look right instead of
      an awkwardly-cropped stretch of the current file.
- [ ] **Real URL** (15-30 min for a Netlify default URL; add DNS propagation time, usually
      under a few hours but budget up to 24-48 hrs, if pointing a real subdomain like
      serve.fcny.tv) - the site isn't deployed anywhere permanent yet. Deploy per
      `README.md`'s "Deploy (Netlify)" section, then decide whether it lives on Netlify's
      default `*.netlify.app` URL or a custom subdomain of fcny.tv.

---

## 4. Production readiness

- [ ] **Fix recursive RLS policy on `profiles`** (~15 min to write + run once you're ready)
      - schema bug, not yet broken in prod, but will be. Confirmed live via a read-only
      query against the East US project: any select against `public.profiles` throws
      `infinite recursion detected in policy for relation "profiles" (42P17)`. Root cause in
      `supabase/schema.sql`: the "Profiles are viewable by owner and admins" policy checks
      admin status with
      `exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')`
      - a select against `profiles`, inside a policy *on* `profiles`, which re-triggers the
      same policy recursively. Two other policies share the identical pattern and are
      equally broken: `events` "Admins manage events" (all operations) and `signups` "Users
      see their own signups; admins see all" (the admin-sees-all branch).
      **Not currently breaking anything** - the app never selects `profiles` or `signups`
      today. **Will break** the moment "Real events" (below) or any real signup-roster read
      gets built.
      **Standard fix** - a `security definer` helper function that checks admin status
      without re-invoking RLS:
      ```sql
      create or replace function public.is_admin()
      returns boolean language sql security definer set search_path = public as $$
        select exists (select 1 from public.profiles where id = auth.uid() and role = 'admin');
      $$;
      ```
      then replace the three inlined `exists (select ...)` checks with `public.is_admin()`.
      I did not run this - it's a live schema change on your production database, your call
      on timing.
- [ ] **Promote the real admin account** (2 min once Charles has confirmed his email) -
      account created, two steps still need a human:
      1. **Charles needs to confirm his email** - Supabase's default email confirmation is
         on, so `clee87823@gmail.com` has an unconfirmed signup sitting there. He can't sign
         in until he clicks the confirmation link Supabase sent.
      2. **Run the promotion SQL** - `README.md`'s "Connect Supabase" section, in the
         Supabase SQL editor, to set his `profiles.role` to `'admin'`. Can be run now,
         doesn't need to wait on email confirmation - I still can't run it myself, no
         database access from here.
- [ ] **Security: `handle_new_user()` trusts client-supplied `role`** (~20-30 min to write +
      test a fix) - found this while setting up Charles's account. `supabase/schema.sql`'s
      trigger does `coalesce(new.raw_user_meta_data ->> 'role', 'volunteer')` with no
      server-side check on what role is allowed - it just inserts whatever the signup call's
      metadata says. The app's own UI always hardcodes `role: "volunteer"`
      (`AuthContext.tsx`), so nobody hits this through the site itself, but the publishable
      key is public by design, and anyone who calls the Supabase auth API directly (not
      through your UI) could pass `role: "admin"` in the signup metadata and self-promote,
      no SQL editor needed. Real privilege-escalation gap, independent of anything else on
      this list. Fix is a database-side check (e.g. a trigger that only allows `'volunteer'`
      regardless of what the client sends, with role changes only ever done via direct
      SQL/dashboard like the admin promotion above) - did not touch `schema.sql` since
      changing it needs to be re-run against the live project.

---

## 5. Bigger features (not yet started)

- [ ] **Real events** (3-6 hours for a basic migrate-and-fetch version: move the six events
      in `src/data/events.ts` into the `events` table and fetch them on load; 6-10+ hours if
      also building an admin "create event" form so Charles can add real ones without a code
      change) - right now sign-ups write to Supabase but the events themselves are still
      hardcoded mock data. Probably the biggest remaining chunk of work on this list.
- [ ] **Real photos** (30-60 min to swap in real image files once Charles provides them,
      +2-4 hours if also wiring Supabase Storage so he can upload directly instead of you
      editing `src/data/photos.ts` each time) - currently placeholder color tiles.
- [ ] **Resend setup for the contact form** (1-2 hours: create a Resend account, verify a
      sending domain, get an API key, write a small serverless/edge function, wire
      `About.tsx`'s contact form to call it) - right now the form just shows a local success
      message and nothing actually sends anywhere.

# Manual review checklist

Everything here needs a human decision, an outside account/service, or a person with
assistive tech. Nothing on this list can be resolved by editing code alone. Grouped by
topic, each with a rough time estimate.

---

## 1. Legal page content (fill in the `[bracketed]` placeholders)

The three placeholders below repeat across multiple pages. Once decided, the value gets
pasted into every spot listed.

### Needs an actual policy decision, not just a lookup

- [ ] **Data retention period** for sign-up records after an event (30-60 min discussion
      with whoever owns this decision) - `Privacy.tsx` Data retention section
- [ ] **Parental consent process** for volunteers under 18 (1-2 hours: decide the process,
      then someone needs to write a sentence or two describing it) - `Privacy.tsx` Minors
      section
- [ ] **Waiver process for mission trips/retreats** - does a paper or digital waiver
      already exist separately from this site? (30-60 min to confirm and summarize) -
      `Terms.tsx` Liability section

### Accessibility-specific placeholders

- [ ] **Known accessibility limitations list** - `Accessibility.tsx` Known limitations
      section. Can partly be filled in now: `EXCEPTIONS.md` EXT-2026-004 (see #3 below) is a
      real, current limitation and can be summarized here in a sentence (10 min once that
      item is resolved one way or the other).

---

## 2. Accessibility follow-ups (from the A11Y.md audit)

See `REPORT.md` and `EXCEPTIONS.md` for full detail on all of these.

- [ ] **EXT-2026-004: photo tile contrast** - one photo tile's decorative Korean watermark
      fails contrast against its background color. Decide: accept as WCAG-exempt decorative
      text (10 min, just fill in Risk Owner/Approver/Tracking Issue in `EXCEPTIONS.md`) or fix
      the tile's tone/opacity (15 min of actual code work if you want it fixed - flag that
      separately, since this file is meant to be non-code items)
- [ ] **Screen reader pass** with VoiceOver (Mac) or NVDA - walk the main task (browse,
      toggle language, sign up for an event, cancel a sign-up) and confirm everything is
      announced sensibly (1-2 hours)
- [ ] **200% text zoom check** - browser zoom to 200% on a few key pages and confirm
      nothing is cut off or overlapping (30 min)
- [ ] **Color blindness / vision-deficiency simulation pass** - confirm nothing relies on
      color alone to convey meaning (30 min, e.g. using a browser extension simulator)

---

## 4. Production readiness

- [ ] **Fix recursive RLS policy on `profiles` (schema bug, not yet broken in prod, but will
      be)** - confirmed live via a read-only query against the East US project: any select
      against `public.profiles` throws `infinite recursion detected in policy for relation
      "profiles" (42P17)`. Root cause in `supabase/schema.sql`: the "Profiles are viewable by
      owner and admins" policy checks admin status with
      `exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')`
      - a select against `profiles`, inside a policy *on* `profiles`, which re-triggers the
      same policy recursively. Two other policies share the identical pattern and are
      equally broken: `events` "Admins manage events" (all operations) and `signups` "Users
      see their own signups; admins see all" (the admin-sees-all branch).
      **Not currently breaking anything** - the app never selects `profiles` or `signups`
      today (`SignupContext.tsx` keeps signups in local seeded state; only `insert`/`delete`
      hit Supabase, and neither of those two policies reference `profiles`). **Will break**
      the moment either of the two big items below ("Real events" admin-create, or any real
      signup-roster read) gets built.
      **Standard fix** - a `security definer` helper function that checks admin status
      without re-invoking RLS, e.g.:
      ```sql
      create or replace function public.is_admin()
      returns boolean language sql security definer set search_path = public as $$
        select exists (select 1 from public.profiles where id = auth.uid() and role = 'admin');
      $$;
      ```
      then replace the three inlined `exists (select ...)` checks with `public.is_admin()`.
      I did not run this - it's a live schema change on your production database, your call
      on timing. (~15 min to write + run once you're ready)
- [ ] **Promote the real admin account** - account created, but two steps still need a
      human:
      1. **Charles needs to confirm his email** - Supabase's default email confirmation is
         on, so `clee87823@gmail.com` has an unconfirmed signup sitting there. He can't sign
         in until he clicks the confirmation link Supabase sent. (Charles's action, not
         yours - just make sure he checks that inbox.)
      2. **Run the promotion SQL** - `README.md`'s "Connect Supabase" section, in the
         Supabase SQL editor, to set his `profiles.role` to `'admin'`. This can be run now
         (doesn't need to wait on email confirmation) - I still can't run it myself, no
         database access from here. (2 min)
- [ ] **Security: `handle_new_user()` trusts client-supplied `role`** - found this while
      setting up Charles's account. `supabase/schema.sql`'s trigger does
      `coalesce(new.raw_user_meta_data ->> 'role', 'volunteer')` with no server-side check on
      what role is allowed - it just inserts whatever the signup call's metadata says. The
      app's own UI always hardcodes `role: "volunteer"` (`AuthContext.tsx`), so nobody hits
      this through the site itself, but the publishable key is public by design, and anyone
      who calls the Supabase auth API directly (not through your UI) could pass
      `role: "admin"` in the signup metadata and self-promote, no SQL editor needed. Real
      privilege-escalation gap, independent of anything else on this list. Fix is a
      database-side check (e.g. a trigger that only allows `'volunteer'` regardless of what
      the client sends, with role changes only ever done via direct SQL/dashboard like the
      admin promotion above) - flagging for your call on priority, did not touch
      `schema.sql` since changing it needs to be re-run against the live project.
- [ ] **Church name and branding approval** - real logo (`src/assets/logo.png`) and church
      name ("Faithful Church of New York", from fcny.tv) are wired into the header, footer,
      and legal pages, replacing the placeholder "The Faithful · Serve" wordmark. The footer
      still says "Demo site. Name and branding pending church approval."
      (`src/lib/i18n.ts` -> `footerDisclaimer`) since I wasn't told this is signed off, just
      that these are the real assets to use - confirm and I'll remove that line and the
      demo-mode banner copy.

Real events — the six events in src/data/events.ts are still hardcoded mock data, not pulled from Supabase. Right now sign-ups write to Supabase but the events themselves don't. You'll want to either migrate events into the events table and fetch them, or build the admin "create event" form so Charles can add real ones. This is probably the biggest remaining chunk of work.
Real photos — swap the placeholder color tiles in src/data/photos.ts for actual uploads once Charles has them, plus wire up Supabase Storage if you want him uploading directly rather than you editing the file each time.
Contact form — right now it just shows a success message locally, nothing actually sends. Needs a real destination (FormSubmit, a Supabase edge function, or similar, like your other client sites).

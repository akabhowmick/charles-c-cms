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

- [ ] **Fix recursive RLS policy on `profiles`** (~15 min to write + run once you're ready) - schema bug, not yet broken in prod, but will be. Confirmed live via a read-only
      query against the East US project: any select against `public.profiles` throws
      `infinite recursion detected in policy for relation "profiles" (42P17)`. Root cause in
      `supabase/schema.sql`: the "Profiles are viewable by owner and admins" policy checks
      admin status with
      `exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')` - a select against `profiles`, inside a policy _on_ `profiles`, which re-triggers the
      same policy recursively. Two other policies share the identical pattern and are
      equally broken: `events` "Admins manage events" (all operations) and `signups` "Users
      see their own signups; admins see all" (the admin-sees-all branch).
      **Not currently breaking anything** - the app never selects `profiles` or `signups`
      today. **Will break** the moment "Real events" (below) or any real signup-roster read
      gets built.
      **Standard fix** - a `security definer` helper function that checks admin status
      without re-invoking RLS:
      `sql
    create or replace function public.is_admin()
    returns boolean language sql security definer set search_path = public as $$
      select exists (select 1 from public.profiles where id = auth.uid() and role = 'admin');
    $$;
    `
      then replace the three inlined `exists (select ...)` checks with `public.is_admin()`.
      I did not run this - it's a live schema change on your production database, your call
      on timing.
- [ ] **Promote the real admin account** (2 min once Charles has confirmed his email) -
      account created, two steps still need a human: 1. **Charles needs to confirm his email** - Supabase's default email confirmation is
      on, so `clee87823@gmail.com` has an unconfirmed signup sitting there. He can't sign
      in until he clicks the confirmation link Supabase sent. 2. **Run the promotion SQL** - `README.md`'s "Connect Supabase" section, in the
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

Two tasks in this repo: build a crossfade hero slideshow, and update `todo.md`
with checklist gaps found in a recent audit. Read the existing patterns first.

## Context to read first

- `src/routes/Home.tsx` — current hero section, replace only the hero, leave
  the "Upcoming" and "Latest highlight" sections below it untouched
- `src/data/photos.ts` — existing Photo type and placeholder tone colors
- `src/index.css` — the `prefers-reduced-motion` media query already zeroes out
  animation durations globally; the slideshow needs its own explicit static-frame
  behavior on top of that, since crossfade opacity transitions still need to
  resolve to one visible frame, not a frozen mid-fade blend
- `src/components/Reveal.tsx` — existing IntersectionObserver + motion pattern
  for reference, this is a different kind of animation (timed, not scroll-
  triggered) so don't reuse Reveal directly
- `src/lib/i18n.ts` and `src/context/LocaleContext.tsx` — this site has a KR/EN
  toggle, any new user-facing string (pause button label, etc.) needs entries
  in both locales, follow the existing `t.something.key` pattern

## Task 1: Crossfade hero slideshow

Create `src/components/HeroSlideshow.tsx`:

- Accepts an array of slide objects: `{ id, src, alt }`. For now, source the
  slides from a new `heroSlides` array in `src/data/photos.ts` using the same
  placeholder-tone-block approach as the existing `photos` array (colored div
  standing in for a real `<img>`, so this is a one-line swap once real photos
  exist — comment this clearly)
- Full-bleed background layer behind the existing hero text and CTAs from
  `Home.tsx`, absolutely positioned, `inset-0`, `object-cover` when real images
  land
- Crossfade between slides every 7 seconds using opacity transitions
  (`transition-opacity duration-1000`), one slide fully visible at a time
- Gradient overlay: `bg-gradient-to-t from-ink/70 via-ink/30 to-transparent` (or
  adjust for the existing `--color-ink` token) so hero text stays readable
  against any photo
- **Pause/play control**: a visible icon button, bottom-right of the hero,
  using `lucide-react`'s `Pause`/`Play` icons, `aria-label` that reflects
  current state ("Pause slideshow" / "Play slideshow"), and `aria-pressed`.
  Clicking it stops the interval entirely, not just visually.
- **prefers-reduced-motion**: on mount, check
  `window.matchMedia("(prefers-reduced-motion: reduce)").matches`. If true,
  skip the interval entirely, show only the first slide, and don't render the
  pause button at all (nothing to pause). Do NOT rely solely on the global CSS
  rule in `index.css` for this component, that zeroes durations but would still
  cycle through frames instantly, which is worse than not cycling at all.
- **Accessibility beyond the button**: the slideshow container needs
  `aria-hidden="true"` on the image layer itself (it's decorative background,
  the real content is the hero text sitting on top), so screen readers don't
  announce photo changes. `alt` text on the Photo objects still gets used if
  this later becomes a non-decorative element, but for now treat it as pure
  background.
- Clean up the interval on unmount (`useEffect` return function)
- No autoplay sound obviously, but also confirm the component pauses when the
  browser tab is backgrounded (`document.visibilityState`), so it's not
  burning cycles or looking janky when the user comes back to the tab

Wire it into `Home.tsx`'s existing hero `<section>`, behind the current
`radial-gradient` decorative div and the hero text, without changing the text
content, headline, or CTA buttons already there.

Add the pause/play button label strings to both locale files in `src/lib/i18n.ts`
following the existing key structure (something like `t.hero.pauseSlideshow` /
`t.hero.playSlideshow`).

### Verify

1. `npm run build` passes
2. `npm run dev`, confirm slides crossfade every ~7s and the pause button stops
   it (interval, not just opacity)
3. In browser devtools, emulate `prefers-reduced-motion: reduce` and reload —
   confirm exactly one static slide, no cycling, no pause button rendered
4. Tab to the pause button with keyboard only, confirm it's reachable and has a
   visible focus ring (existing `:focus-visible` global style should apply
   automatically if it's a real `<button>`)
5. Confirm text and CTA buttons stay readable against all slide tones with the
   gradient overlay

## Task 2: Update todo.md

Append a new numbered section at the end of `todo.md` (after section 5, "Bigger
features"), following the exact same formatting conventions as the existing
sections (checkbox list, bold lead-in, rough time estimate in parens, file
reference where applicable):

```markdown
---

## 6. Master checklist gaps (from code sweep)

Not yet started, no code exists for any of these. Grouped as found.

### Metadata and SEO

- [ ] **OG/Twitter card tags + OG image** (30-45 min) - pasting the URL into
      iMessage or a group chat currently shows nothing. Needs a 1200x630 image
      and the meta tags in `index.html`.
- [ ] **Canonical URL per page** (15-20 min)
- [ ] **robots.txt and sitemap.xml** (20-30 min)
- [ ] **JSON-LD structured data** (20-30 min) - `Organization` or `Event` schema
      depending on page
- [ ] **theme-color meta tag** (5 min)
- [ ] **apple-touch-icon + site.webmanifest** (20-30 min) - pairs with the
      existing favicon regeneration task in section 3

### Resilience

- [ ] **Custom 404 page** (30-45 min) - unknown URLs currently hit TanStack
      Router's bare default not-found text on an unstyled page
- [ ] **Error boundary** (30-45 min) - a component crash currently white-screens
      the whole site with no fallback UI

### Security and deploy

- [ ] **Security headers** (20-30 min) - no CSP, HSTS, X-Content-Type-Options,
      Referrer-Policy, or Permissions-Policy configured anywhere. Add a
      `public/_headers` file for Netlify.
- [ ] **Spam protection on the contact form** (15-20 min once Resend wiring
      happens per section 5) - no honeypot or other bot protection currently,
      easiest to add alongside the Resend work rather than separately
- [ ] **Analytics** (15-30 min depending on provider choice)
- [ ] **Error tracking** (e.g. Sentry) (30-45 min)
- [ ] **Uptime monitoring** (15 min, ties to Ben's FreelanceOps project)

### Consciously deferred (flagging, not urgent)

- [ ] **Staging environment** - single Supabase project currently serves as
      both staging and prod. Fine at current scale, worth a real decision once
      real events/signups are live.
- [ ] **Backup restore never tested** - free tier limits options here, but
      worth knowing the recovery story before launch rather than after
      something goes wrong.
```

Don't touch any other section of `todo.md`, only append this one. Don't mark
anything as resolved that isn't actually resolved by Task 1 (the slideshow
doesn't close any of these items).

---

## 7. Follow-ups from the Church Footsteps / hero / social change (2026-08-20)

Everything here is blocked on a human decision, a real asset, or an outside account.
Code for all of it is already in place and degrades cleanly while these are pending.

### Content and assets

- [ ] **Hero photography** (30-60 min to drop files in once photos exist) -
      `src/data/heroImages.ts` ships as an empty array, so the hero currently falls back
      to its original gradient wash. Add 3-5 landscape images to `public/hero/` and list
      them in that file; autoplay, the pause control, and reduced-motion handling all
      switch on automatically once there is more than one entry.
- [x] **YouTube and KakaoTalk channel URLs** - DONE 2026-08-20. Both filled into
      `src/data/social.ts`: YouTube channel `UCUl46H7KQFJShZRhIbvafTg` and the Kakao
      channel `pf.kakao.com/_RKBBK`. Both confirmed reachable (HTTP 200) and rendering in
      the footer and on About. If either channel ever moves, this one file is the only
      place to change.
- [ ] **Staff consent, then staff entries** (blocked on people, not code) -
      `src/data/staff.ts` is empty and its renderer filters on `consentGranted`. Before
      anyone is listed publicly, get **written consent from each person** covering their
      name, role, and photo appearing on a public site, and keep that record somewhere
      durable. Only then add the entry with `consentGranted: true`. A person can be staged
      in the file with `consentGranted: false` while their consent is pending.
- [ ] **Native Korean review of the new strings** (20-30 min with a native speaker) - the
      `footsteps` namespace, `about.staffHeading`/`staffSubtitle`/`followHeading`,
      `layout.socialLinkLabel`, and `home.heroPause`/`heroPlay` in `src/lib/i18n.ts` were
      written this session and have not had a native pass. Same standing rule as the rest
      of the KO dictionary.

### Decisions deferred

- [ ] **"Using these colors → No"** (needs a conversation, then 15 min-several hours
      depending on the answer) - raised in the 2026-08-20 feedback round and explicitly
      parked. It is unclear whether this means (a) drop the placeholder `tone` color
      blocks in `src/data/photos.ts` in favour of real images, (b) rework the pine/taupe
      brand palette in `src/index.css`, or (c) something narrower about the hero. Nothing
      was changed on this; resolve the intent before touching color.

### Supabase

- [ ] **Run `supabase/reviews.sql`** (5 min in the SQL editor) - creates the `reviews`
      table, its RLS policies, and seeds the three existing entries. Until it runs, the
      `/footsteps` year-in-review section falls back to the static seed in
      `src/data/reviews.ts`, so the page works either way but is not yet editable without
      a redeploy. Note this file deliberately avoids the recursive-policy shape that
      section 4 above documents as broken.
- [ ] **Admin UI for reviews** (2-4 hours) - rows are currently added by hand in the
      Supabase dashboard. `published` defaults to `false`, so a draft is invisible until
      someone flips it. A small admin form would remove the dashboard round-trip; same
      shape of work as the "Real events" item in section 5.

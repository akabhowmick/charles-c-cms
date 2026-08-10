# Manual review checklist

Everything here needs a human decision, an outside account/service, or a person with
assistive tech. Nothing on this list can be resolved by editing code alone. Grouped by
topic, each with a rough time estimate.

---

## 1. Legal page content (fill in the `[bracketed]` placeholders)

The three placeholders below repeat across multiple pages. Once decided, the value gets
pasted into every spot listed.

- [ ] **Church legal name** (5 min once known) - `Privacy.tsx` Contact section, `Terms.tsx`
  "What this site is for" and "Account removal" (3 spots total)
- [ ] **Mailing address** (5 min) - `Privacy.tsx` Contact section (1 spot)
- [ ] **Contact email for privacy/accessibility requests** (15-30 min if a new inbox/alias
  needs setting up, 2 min if reusing `serve@demo.church`) - `Privacy.tsx` Photos and Your
  choices sections, `Accessibility.tsx` Tell us about a barrier section (3 spots)
- [ ] **Supabase server region** (5 min, check the Supabase project dashboard once it
  exists) - `Privacy.tsx` Where it's stored section (1 spot)
- [ ] **Governing law / state** (2 min) - `Terms.tsx` Governing law section (1 spot)
- [ ] **Publish dates** ("Last updated" / "Last reviewed") (2 min, set when the pages
  actually go live) - top of all three pages (3 spots)

### Needs an actual policy decision, not just a lookup

- [ ] **Data retention period** for sign-up records after an event (30-60 min discussion
  with whoever owns this decision) - `Privacy.tsx` Data retention section
- [ ] **Parental consent process** for volunteers under 18 (1-2 hours: decide the process,
  then someone needs to write a sentence or two describing it) - `Privacy.tsx` Minors
  section
- [ ] **Waiver process for mission trips/retreats** - does a paper or digital waiver
  already exist separately from this site? (30-60 min to confirm and summarize) -
  `Terms.tsx` Liability section
- [ ] **Refund/cancellation terms** - not urgent, payments aren't collected through the
  site yet. Revisit when payments launch. - `Terms.tsx` Payments section

### Accessibility-specific placeholders

- [ ] **Known accessibility limitations list** - `Accessibility.tsx` Known limitations
  section. Can partly be filled in now: `EXCEPTIONS.md` EXT-2026-004 (see #3 below) is a
  real, current limitation and can be summarized here in a sentence (10 min once that
  item is resolved one way or the other).
- [ ] **Response window** for accessibility barrier reports, e.g. "2 business days" (10 min
  decision) - `Accessibility.tsx` Tell us about a barrier section

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

## 3. Korean translation review

- [ ] **Native-speaker review of all Korean copy** - both the UI toggle dictionary
  (`src/lib/i18n.ts`, ~150 short strings) and the bilingual accent fields in
  `src/data/*.ts` (`titleKo`, `descriptionKo`, `bodyKo`, etc., ~15 longer fields) were
  AI-authored this session and have not been checked by a native speaker (2-4 hours)

---

## 4. Production readiness (currently running in demo/mock mode)

- [ ] **Set up a real Supabase project** to replace mock-mode auth and in-memory sign-ups
  (15-30 min if you know Supabase: create project, run `supabase/schema.sql` against it,
  copy the URL and anon key into a real `.env` per `.env.example`)
- [ ] **Church name and branding approval** - the site currently ships with a placeholder
  name ("The Faithful · Serve") and a footer disclaimer saying so
  (`src/lib/i18n.ts` -> `footerDisclaimer`). Timeline depends on church leadership, not
  estimable here. Once approved, remove the disclaimer and demo-mode banner copy.

---

## 5. Git repository housekeeping

- [x] `.gitignore` rewritten and `node_modules` / `tsconfig.tsbuildinfo` untracked from
  git's index this session (files are still on disk, just no longer staged for tracking).
  **This is staged but not committed** - review with `git status` and commit when ready.
- [ ] **Repo history still contains the old node_modules commit** (~7,400 files, already
  pushed to `origin/main`). Untracking only stops it from being tracked *going forward* -
  the old blobs are still in history and already on GitHub. Reclaiming that space needs a
  history rewrite (e.g. `git filter-repo`) followed by a force-push to `origin/main`,
  which rewrites shared history. Not done here since that needs your explicit go-ahead
  (10-15 min to run, but coordinate first if anyone else has cloned this repo).

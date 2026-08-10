# A11y Verification Report

This report compiles the compliance evidence for a given *Feature*, ensuring its development reached the "Certification Ready" definition, per [A11Y.md](A11Y.md) (Standard/AA profile).

> **Marking legend:** `[x]` verified, with the evidence described beside it · `[!]` verified and **failed** (fix it, or open an entry in `EXCEPTIONS.md`) · `[~]` partially verified, with what is missing written down · `[ ]` **not verified** — the reason is written beside it.

---

## 📌 Validation Context
- **Feature/Epic:** English/Korean language toggle (site-wide i18n) + the accessibility fixes that surfaced while adopting `A11Y.md`
- **Test Date:** 2026-08-08 (initial audit), re-verified 2026-08-09 after fixes
- **Covers interface as of:** uncommitted working tree, session dated 2026-08-09 (no commit made yet — see `git status`)
- **Compliance Status:** ⚠️ CONDITIONAL (Passes with Exceptions) — one new low-severity finding remains open (EXT-2026-004); the three originally-found issues are fixed and re-verified

## 1. Technical Verification (Automated & Semantics)
- **[x] Axe-Core:** Ran `axe-core` (WCAG 2a/2aa/2.1aa/2.2aa rulesets) via headless Chrome against all 7 routes (`/`, `/opportunities`, `/highlights`, `/photos`, `/about`, `/login`, `/signup`). **2026-08-08 (before fixes):** 0 critical, 8 serious. **2026-08-09 (after fixes):** 0 critical, 0 serious on 6 of 7 routes; 1 serious remains only on `/photos` (EXT-2026-004, a different, newly-surfaced root cause — a single photo tile's decorative watermark contrast, not the original three findings). The three original root causes (EXT-2026-001/002/003) are fixed — see `EXCEPTIONS.md` for the resolution detail on each.
- **[x] HTML Semantics:** No bare `div`/`span` used as a click target (the one `div` with `onClick` is the photo-lightbox backdrop, a supplementary dismiss affordance, not the sole interactive element). The `<Link>`-wrapping-`<Button>` nested-control issue (EXT-2026-003) is fixed — verified via `document.querySelectorAll("a button, button a")` returning zero matches across 5 routes after the `buttonClasses()` refactor.
- **[x] Heading Hierarchy:** Verified via direct inspection of all 8 route files — exactly one `<h1>` per route, `<h2>`s nested under it, no level skips. Confirmed further by axe's `heading-order` rule (0 violations, included in the scanned ruleset).

## 2. Tab Order and Focus Management
- **[x] Focus Indicator:** Fixed this session — `EventCard.tsx`'s stretched-link title anchor had `focus-visible:outline-none` with **no replacement** (a direct `A11Y.md` §"Anti-patterns"/Operable violation). Replaced with `focus-within:ring-2 focus-within:ring-pine focus-within:ring-offset-2` on the parent card. Verified with real (non-scripted) keyboard `Tab` traversal + `getComputedStyle`: renders a 4px pine ring (`rgb(63,92,78)`), contrast 6.89:1 against `paper`, well above the 2px/3:1 floor. The sitewide `:focus-visible { outline: 3px solid var(--color-pine); outline-offset: 2px }` default (`index.css`) was confirmed intact everywhere else — this was the only suppressed instance found.
- **[~] Logical Navigation:** Traced and confirmed correct for the photo lightbox modal and the event-card stretched-link specifically (see below). A full manual `Tab`-path walkthrough of every route end-to-end was not performed this session — recommended before shipping.
- **[x] Captured Focus (Modals/Overlays):** Fixed this session — the photo lightbox (`Photos.tsx`) moved focus in and returned it to the trigger on close, but did **not trap** `Tab`/`Shift+Tab` inside the dialog (background content stayed keyboard-reachable — a 🔴 CRITICAL "Leaked Focus Trap" per `A11Y.md` §6). Added a `Tab`-cycling `keydown` handler. Verified with real keyboard events: focus enters dialog → `Tab` lands on the close button → `Tab` again cycles back (never leaks to the grid behind it) → `Escape` closes and returns focus to the trigger button. Pattern recorded in `A11Y-DECISIONS.md`.

## 3. Behavior and Task Return
- **[ ] Screen Reader Test:** Not performed. Reason: no VoiceOver/NVDA session available in this headless environment. **A human must run this** — main task path (browse → toggle language → sign up for an event) with VoiceOver (macOS) or NVDA before this ships.
- **[~] Status Change (`aria-live`):** `role="status"`/`role="alert"` elements are structurally present at every relevant point (event sign-up confirmation, form validation errors, the "showing N events" filter count, the About-page sent-message) — confirmed by code inspection, and axe's ARIA-state rules returned 0 violations. Actual announcement behavior to a real screen reader was not confirmed (needs the same human AT session as above).
- **[x] Form Filling:** Every form field in `About.tsx`/`Auth.tsx`/`EventDetail.tsx` uses `<Field label htmlFor>` wrapping `<Input id>`/`<Textarea id>` (`ui/Input.tsx`) — real `<label for>`/`id` pairing, not placeholder-only. Confirmed by code inspection and axe's `label` rule (0 violations across all scanned forms).

## 4. Visual Perception and Comprehension
- **[~] Text & UI Contrast:** Two systemic, pre-existing failures were found, measured, fixed, and re-verified (WCAG relative-luminance formula + confirmed by axe before/after):
  - `--color-taupe` as text: was #A68A6D (3.03–3.09:1, below the 4.5:1 AA floor); now `#7E664D` (4.53–5.37:1 across `paper`/`paper-deep`/white). → `EXCEPTIONS.md` EXT-2026-001, resolved.
  - Interactive-component borders: was `--color-taupe-light` #C9B49C (2.00:1, below the 3:1 AA floor, worse at reduced opacity); now a new `--color-taupe-strong` #AA8A64 token at full opacity (3.02–3.22:1). → `EXCEPTIONS.md` EXT-2026-002, resolved.
  - One new, narrower finding surfaced by the re-scan: a single photo tile's decorative Korean watermark (`Photos.tsx`, `aria-hidden`) has insufficient contrast against that one tile's background color. Arguably WCAG-exempt as decorative/redundant text; logged as EXT-2026-004, not fixed (needs a human call on the exemption).
  - Everything else measured (body text, buttons, primary badges, error text, footer text) remains well above the 4.5:1/3:1 floors.
- **[x] Redundancy:** No state is conveyed by color alone — "Full"/error/confirmation states are always paired with explicit text (e.g. the word "Full", not just a red dot), so vision-deficient users lose no information.
- **[~] Scale / Zoom:** Reflow at 320 CSS px width (SC 1.4.10) verified directly — set a real 320×800 viewport and checked `scrollWidth` vs `clientWidth` on all 8 routes: **zero horizontal overflow on every route.** Text resize to 200% (SC 1.4.4, a distinct mechanism — OS/browser text-only zoom, not viewport width) was **not** tested this session.

---
## 📝 Assessment Notes or Known Blockers
- **Fixed 2026-08-08 (verified, not just claimed):** the photo-lightbox focus trap (🔴 CRITICAL) and the suppressed, unreplaced focus outline on event cards (🟠 HIGH/🔴 CRITICAL-adjacent — a sitewide, every-card-on-3-pages instance). Both re-verified with real keyboard-driven browser automation.
- **Fixed 2026-08-09 (verified, not just claimed):** the two design-token contrast gaps (EXT-2026-001/002 — a single `--color-taupe` darkening plus a new `--color-taupe-strong` border token) and the nested-interactive-controls pattern (EXT-2026-003 — `Button.tsx` now exports `buttonClasses()` so links can look like buttons without nesting a real `<button>`). All three re-verified with axe-core (0 serious violations on 6/7 routes, down from 8) and a direct DOM query confirming zero nested `<a><button>` anywhere checked.
- **Open, not fixed:** EXT-2026-004, a single photo tile's decorative watermark contrast — low severity, arguably WCAG-exempt as decorative/redundant text, needs a human call rather than a unilateral fix.
- **Not verified at all this session, and why:** screen-reader announcement behavior (no AT tooling in this environment) and 200%-text-zoom (not exercised). Both need a human pass before a real (non-demo) release.
- **This report's evidence trail:** axe-core scan output (before/after both fix passes), real keyboard-event traces, and WCAG contrast-ratio computations were produced via a temporary, uninstalled-after-use `puppeteer-core` + `axe-core` dev dependency driving the project's own real Chrome install — not fabricated or inferred.

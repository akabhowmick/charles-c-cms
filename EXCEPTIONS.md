# A11y Exceptions Log

This document logs known deviations from accessibility standards (WCAG 2.2 AA / EN 301 549) that have been temporarily accepted, per [A11Y.md](A11Y.md).

> **Objective:** Provide technical and legal transparency by documenting *where*, *why*, and *how* we temporarily mitigate guidelines that could not be met due to technical, platform, or scope limitations.

> **Rules:**
> 1. An exception is **temporary** and does not change the requirement.
> 2. Every exception MUST have a **risk owner**, an **approver**, a **tracking issue**, and an **expiry date** — "dependent on third-party" still gets a review date.
> 3. Scope is the **narrowest practical**: one component/selector, never a whole rule.
> 4. At expiry, the exception is reviewed: fixed and removed, or consciously renewed with a new date. **Never silently suppressed.**
> 5. **AI duty:** in review mode, the AI MUST flag any exception past its expiry date as 🟠 HIGH technical debt.
> 6. This log is a **versioned project record** — never add it to `.gitignore`. Exceptions must be visible in pull requests and auditable later; a risk record hidden from version control protects no one.

> **Status note:** EXT-2026-001/002/003 below were found by an automated Axe-Core scan (`wcag2a`/`wcag2aa`/`wcag21aa`/`wcag22aa` rulesets) on 2026-08-08, then **fixed and re-verified** on 2026-08-09 (same scan, 0 critical/0 serious on 6 of 7 routes afterward — see `REPORT.md`). Kept below as a resolved record per Rule 4 ("never silently suppressed"). EXT-2026-004 is a new, still-open finding surfaced by the 2026-08-09 re-scan.

---

## 🛑 Exception Log

### 1. Basic Details
- **Exception ID:** EXT-2026-001 — ✅ RESOLVED 2026-08-09
- **Component / Page:** Site-wide — `text-taupe` used as text color (not decorative), e.g. `Eyebrow.tsx` English labels, `<dt>` field labels in `EventDetail.tsx`, footer/eyebrow meta text on every route
- **WCAG Guideline Affected:** 1.4.3 Contrast (Minimum) (AA)
- **Severity (User Impact):** 🟠 High
- **Risk Owner:** n/a — fixed, no longer an accepted risk
- **Approved by:** n/a
- **Tracking Issue:** n/a

### 2. Technical Blockade Description
- **What was broken?** `--color-taupe` (`#A68A6D`) on `--color-paper`/`--color-paper-deep`/white measured **3.03–3.09:1**, below the 4.5:1 AA text floor. Low-vision users could struggle to read section eyebrows ("Coming up", "Highlights", etc.), the `Date`/`Time`/`Location`/`Spots` field labels on the event detail page, and footer heading labels.
- **Why did it happen?** `--color-taupe` is a core brand/theme token (`src/index.css`) used for warm secondary text throughout the design system; it was tuned for visual tone, not against a contrast checker.

### 3. Resolution
- **What changed:** darkened `--color-taupe` in `src/index.css` from `#A68A6D` to `#7E664D` — the darkest of the three backgrounds it appears against (`--color-paper-deep`, the footer background) was the binding constraint. Verified: 4.53:1 vs `paper-deep`, 5.02:1 vs `paper`, 5.37:1 vs white — all ≥4.5:1. Single token change, no component edits needed. Re-scanned with axe-core: the footer-heading and eyebrow-label violations are gone on all 7 routes.

---

### 1. Basic Details
- **Exception ID:** EXT-2026-002 — ✅ RESOLVED 2026-08-09
- **Component / Page:** Site-wide — border on form inputs (`ui/Input.tsx`) and interactive card/section borders (`EventCard.tsx`, `Highlights.tsx`, `EventDetail.tsx`, `About.tsx`, `Dashboard.tsx`, `Opportunities.tsx` filter buttons, `LocaleToggle.tsx`, `Layout.tsx` chrome dividers)
- **WCAG Guideline Affected:** 1.4.11 Non-text Contrast (AA)
- **Severity (User Impact):** 🟠 High
- **Risk Owner:** n/a — fixed, no longer an accepted risk
- **Approved by:** n/a
- **Tracking Issue:** n/a

### 2. Technical Blockade Description
- **What was broken?** `--color-taupe-light` (`#C9B49C`) at full opacity on white measured **2.00:1**, below the 3:1 AA floor for UI-component boundaries; several usages applied it at `/40`–`/60` opacity, which was even lower.
- **Why did it happen?** Same root cause as EXT-2026-001 — a brand token tuned for a soft, warm aesthetic rather than measured contrast.

### 3. Resolution
- **What changed:** added a new token `--color-taupe-strong: #AA8A64` to `src/index.css`, and replaced every `border-taupe-light(/NN)` usage sitewide with `border-taupe-strong` at full opacity (opacity modifiers removed, since a translucent border's *effective* contrast is lower than the solid-color computation). Verified: 3.02:1 vs `paper`, 3.22:1 vs white — both ≥3:1. Left untouched: `Eyebrow.tsx`'s `bg-taupe-light` hairline divider (purely decorative, not a UI-component boundary) and `text-taupe-light` on the dark `pine-deep` hero card in `Home.tsx` (different context, already compliant, darkening the shared token would have broken it — this is why a *new* token was added rather than editing `--color-taupe-light` in place).

---

### 1. Basic Details
- **Exception ID:** EXT-2026-003 — ✅ RESOLVED 2026-08-09
- **Component / Page:** Site-wide — `<Link>` wrapping `<Button>` (rendered as `<a href><button>...</button></a>`), used in `Home.tsx`, `EventDetail.tsx`, `Dashboard.tsx`, `Layout.tsx` desktop + mobile nav
- **WCAG Guideline Affected:** 4.1.2 Name, Role, Value (A) — nested interactive controls
- **Severity (User Impact):** 🟡 Medium
- **Risk Owner:** n/a — fixed, no longer an accepted risk
- **Approved by:** n/a
- **Tracking Issue:** n/a

### 2. Technical Blockade Description
- **What was broken?** An `<a>` containing a `<button>` put two interactive elements at the same location in the accessibility tree, which Axe-Core flagged (surfaced as a `target-size` false-positive on the Home hero CTA — really a symptom of the nested-control structure confusing the geometry check).

### 3. Resolution
- **What changed:** `src/components/ui/Button.tsx` now exports `buttonClasses({variant, size, className})`, the same class-building logic `Button` uses internally. Every `<Link to="..."><Button>...</Button></Link>` site (9 locations across `Layout.tsx`, `Home.tsx`, `Dashboard.tsx`, `EventDetail.tsx`) was changed to `<Link to="..." className={buttonClasses({...})}>...</Link>` — a single `<a>` styled as a button, no nested `<button>`. `Button` itself is unchanged and still used for every real `<button>` (form submits, sign-out, cancel, etc.). Verified via DOM query (`document.querySelectorAll("a button, button a")`) across 5 routes: zero nested controls found. Pattern recorded in `A11Y-DECISIONS.md`.

---

### 1. Basic Details
- **Exception ID:** EXT-2026-004
- **Component / Page:** `PhotoGrid.tsx` (rendered by the `/footsteps` route; was `Photos.tsx` before the 2026-08-20 Highlights+Photos merge) — the decorative Korean-word overlay (`labelKo`) on individual photo tiles, `text-paper/60` over each tile's `tone` background color
- **WCAG Guideline Affected:** 1.4.3 Contrast (Minimum) (AA) — arguable exemption, see below
- **Severity (User Impact):** 🔵 Low
- **Risk Owner:** TBD — pending assignment
- **Approved by:** TBD — pending assignment
- **Tracking Issue:** TBD — not yet filed

### 2. Technical Blockade Description
- **What is broken?** One of the 8 photo tiles (`summer-school`, tone `#C9B49C`) renders its `labelKo` watermark at `text-paper/60` with insufficient contrast against that specific tile's background color — flagged by axe-core during the 2026-08-09 re-scan. The other 7 tiles' tone colors happen to contrast enough; this one doesn't.
- **Why did it happen?** Each photo tile has its own hardcoded `tone` color in `src/data/photos.ts`; the overlay text color was never checked against all 8 individually.
- **Arguable exemption:** the overlay is `aria-hidden="true"` and its content is redundant with the normal-contrast `<p>{p.label}</p>` caption directly below the tile — WCAG 1.4.3 exempts "text that is part of a picture that contains significant other visual content" / purely decorative text. `aria-hidden` hides it from screen readers but not from sighted low-vision users, which is why axe still (correctly) checks its visual contrast.

### 3. Workaround (Fallback / Remediation)
- **How can the user still complete the task?** Yes — the same information is available immediately below the tile at compliant contrast, and screen-reader users never see the overlay at all (`aria-hidden`).

### 4. Resolution Plan and Expiry
- **Expiry (review-by date):** 2026-09-09
- **Note (2026-08-20):** the `/photos` route was merged into `/footsteps` and the tile markup moved verbatim to `src/components/PhotoGrid.tsx`. The finding is unchanged — same markup, same `tone` values, same overlay opacity — only its file location moved. Expiry date deliberately **not** extended.
- **Resolution Criterion:** Either accept as decorative (WCAG exemption) and close with no code change, or adjust the `summer-school` tile's `tone` value (or the overlay's opacity formula) so `paper/60` clears 3:1 against it like the other 7 tiles. Needs a human call on whether the decorative-text exemption applies here — not fixed as part of this session's work since it wasn't part of the originally-scoped fix.

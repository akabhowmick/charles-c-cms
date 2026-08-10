# Accessibility

Frontend work in this repo follows [A11Y.md](A11Y.md) strictly (source: [fecarrico/A11Y.md](https://github.com/fecarrico/A11Y.md)), at the **Standard (AA)** compliance profile, with full governance artifacts enabled:

- [A11Y.md](A11Y.md) — the rules (POUR framework, severity model, anti-patterns, AI behavior contract).
- [REPORT.md](REPORT.md) — verification evidence; must be regenerated/updated before any delivery (build, deploy, shared artifact) and stay newer than the last interface change.
- [EXCEPTIONS.md](EXCEPTIONS.md) — logged, accepted deviations from the target level. Check for entries past their expiry before starting new frontend work — an expired entry is 🟠 HIGH technical debt per the guide.
- [A11Y-DECISIONS.md](A11Y-DECISIONS.md) — reusable pattern choices (e.g. modal focus-trap implementation, stretched-link focus indicator). Check this before building a new interactive component so patterns stay consistent instead of re-derived per component.

All four files are versioned — never add them to `.gitignore`.

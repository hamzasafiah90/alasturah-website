# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Static, bilingual (Arabic primary / English mirrored) brochure + lead-gen site for Shabakat Alasturah, a Saudi connectivity/security/software company. No build step, no framework — every page is a hand-authored, standalone HTML file (no templating/includes), so shared header/nav/footer must be edited in every page individually when changed.

- `ar/` — Arabic pages (primary): index, about, contact, network, privacy, security, software, terms
- `en/` — English mirrors of the same pages
- `index.html` — language redirect (browser-language aware, defaults to Arabic)
- `assets/css/design-system.css` — current stylesheet (an older `assets/css/styles.css` referenced in README is stale/superseded)
- `robots.txt`, `sitemap.xml` — hand-maintained flat files, not generated

## Deployment — never push directly to `main`

`wrangler.jsonc` serves the whole repo root as static assets via Cloudflare Workers. Pushing to `main` auto-deploys straight to production (`alasturah.com`). Always work on a branch/PR — never `git push origin main` directly.

## Contact form

The contact form submits via **Web3Forms** (see `web3forms.com/submit` in `en/contact.html` / `ar/contact.html`). The README's mention of a `mailto:` fallback is outdated — do not reintroduce it.

## Conventions

- Every HTML page carries hreflang alternates (`en`/`ar`/`x-default`) and matching canonical URLs — when adding or renaming a page, update the hreflang/canonical links in both language mirrors.
- LocalBusiness JSON-LD schema (name, address, CR/VAT, telephone) currently only appears on `ar/index.html` / `en/index.html` — keep it in sync between the two if business details change. Inner pages (about/contact/network/security/software/privacy/terms) carry no structured data.
- Placeholder content is marked with CSS class `.todo` — search for `class="todo"` or `[TODO` before assuming a value (phone number, logo, business hours, etc.) is final.
- No formatter or test suite is configured. Linting: `npm run lint` (`lint:html` via html-validate, `lint:css` via stylelint) — configs are tuned to skip stylistic noise (e.g. self-closing void tags, single-line declarations) and only flag real issues (unescaped `&`, missing `<button type>`, invalid CSS).
- Explain tradeoffs before making large or structural changes (e.g. redesign work, schema changes) rather than just making them.

## Local preview

`npm run dev` (wrangler dev) or `python3 -m http.server 8080` from the repo root.

## Ongoing redesign

`CC-BRIEF-mintlify-redesign.md` documents an in-progress visual redesign (new `design-system.css`, pill buttons, RTL rules for Arabic, phased per-page migration). Check it before touching page structure/styling — legacy and new stylesheets should not be loaded together on the same page.

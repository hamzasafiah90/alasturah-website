# CC Brief — Apply Mintlify-Derived Design System to alasturah.com

## Context
Full visual redesign of the static bilingual site (AR default, EN under `/en/`).
Reference files (in project root after Hamza copies them in):
- `design-system.css` — the complete token + component stylesheet. This is the source of truth for all styling.
- `alasturah-mintlify-preview.html` — approved reference implementation of the EN homepage. Match it.

**Content does not change.** This is a restyle. All existing copy, links, meta tags, and structure semantics stay as they are unless this brief says otherwise.

## Git strategy — do this first
1. Create branch `redesign/mintlify` from `main`. ALL work happens on this branch. Never push to `main` — pushes to `main` auto-deploy to production via Cloudflare Workers.
2. Scoped commits, one concern each, e.g. `redesign: add design-system.css and fonts`, `redesign: homepage EN`, `redesign: homepage AR`, `redesign: security pages`, etc.
3. Do not merge to `main`. Hamza merges after review.

## Hard rules
- **Logo:** use the existing registered mark image asset exactly as-is in nav and footer. Never redraw, recolor, filter, or substitute it. The `.wordmark img` class in design-system.css sizes it to 28px height in the nav.
- **Accent:** `--brand-green` (#00d4a4) is reserved for: eyebrow labels, the hero accent CTA, focus rings, the dark-band stat, checkmarks. Never on body text or large surfaces. Black pills (`.btn-primary`) are the dominant CTA everywhere else.
- **All buttons are pills** (`border-radius: 9999px`). No exceptions.
- **Card radius is always 12px** (`--r-lg`). Inputs/code use 8px (`--r-md`).
- **Max two typefaces per page.** EN: Inter + Geist Mono. AR: IBM Plex Sans Arabic (+ Inter for Latin/numeric fragments only). Never introduce a third.
- **Preserve untouched:** Web3Forms integration on the contact form (action, access key, hidden fields), all meta/OG tags, the hidden social links in the footer HTML, language-switcher hrefs, WhatsApp link, phone/email links, CR/VAT footer line.

## Fonts
Add to `<head>`:
- EN pages: `<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Geist+Mono:wght@400;500&display=swap" rel="stylesheet">`
- AR pages: `<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;500;600&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">`
- Plus the two `preconnect` links to fonts.googleapis.com and fonts.gstatic.com.

## Arabic / RTL rules
- AR pages must have `<html lang="ar" dir="rtl">`. design-system.css keys all Arabic overrides off `html[lang="ar"]` and `html[dir="rtl"]` — no separate RTL stylesheet.
- Negative letter-spacing is automatically zeroed for Arabic via tokens. Do not re-add tracking on Arabic text.
- Use CSS logical properties in any new page-specific rules (`margin-inline-start`, `padding-inline`, `text-align: start`) so one rule serves both directions.
- Arrows in "Explore" card links: `→` in EN becomes `←` in AR (and the hover-shift flips automatically via the RTL rule already in the stylesheet).
- Uppercase eyebrow treatment doesn't exist in Arabic; the stylesheet renders eyebrows as normal-case 13px automatically. Keep eyebrow text short in Arabic.
- Numerals: keep Western Arabic numerals (1, 2, 3) as currently used on the site for consistency in stats, phone, CR/VAT.

## Phases

### Phase 1 — Foundation (commit 1)
1. Add `design-system.css` to the CSS directory.
2. Wire fonts into a shared head pattern.
3. Decide per existing architecture: either retire the legacy stylesheet per-page as pages migrate, or strip legacy rules that conflict. Do NOT load legacy + new stylesheets together on a migrated page and fight specificity.

### Phase 2 — Homepage EN (commit 2)
Rebuild `/en/index.html` to match `alasturah-mintlify-preview.html` exactly, with these production substitutions:
- Placeholder "SA" square → real logo asset.
- Section order: nav → sky hero + mockup → capability strip → What We Do (3 `card-feature`) → Value of Convergence (dark teal band, 35% stat in mint) → Why (3 `card-base` on `band-surface`) → CTA → footer.
- The hero mockup dashboard is decorative HTML/CSS (as in the preview) — keep it static, no JS needed.
- Keep existing `<title>`, meta description, OG tags.

### Phase 3 — Homepage AR (commit 3)
Mirror Phase 2 on `/ar/index.html` (or root index if AR lives at root) using the existing Arabic copy verbatim. Apply RTL rules above. The mockup dashboard sidebar/labels may stay in English (it depicts a software UI) — but hero, sections, buttons, footer all use the existing Arabic content.

### Phase 4 — Inner pages, EN then AR (commits 4–9, one per page pair where sensible)
Order: `network` → `security` → `software` → `about` → `contact`.
Per page:
- Page hero: use a compact variant of the sky gradient (~64px padding, `t-h1` headline) — full 120px atmospheric hero is homepage-only per the spec ("use atmospheric gradient hero bands sparingly").
- Content sections: `band` rhythm (96px), `card-base` / `card-feature` for existing card-like content, `t-h2`/`t-h3` headings.
- About page's 4-phase Deployment Journey: this IS a true sequence, so numbered step markers are appropriate here — style as `card-base` row with `t-micro-up` step labels.
- Contact page: restyle form with `.text-input` / `.form-label`; submit button is `.btn-primary`. Do not alter the Web3Forms form attributes.
- Product photos are still placeholders — style their containers (12px radius, hairline border) so real photos drop in later.

### Phase 5 — Sweep (final commit)
- Remove dead legacy CSS.
- Verify every page loads only the fonts it needs.
- Check no page still references removed classes.

## QA checklist (report results back, raw output not summaries)
1. Serve locally via wrangler dev.
2. For each page, both languages, verify via DOM inspection (getComputedStyle):
   - body font-family resolves to Inter (EN) / IBM Plex Sans Arabic (AR)
   - hero h1 font-size 72px desktop (64px AR), letter-spacing -2px EN / 0px AR
   - all `.btn` computed border-radius 9999px
   - nav height 64px, sticky
3. Viewport checks at 1280 / 1024 / 768 / 375: grids collapse 3→2→1, hero scales 72→56→44→36.
4. RTL check on AR pages: layout mirrors, arrows flipped, no clipped text.
5. Contact form: confirm form action/access key unchanged (diff against main).
6. Lighthouse quick pass: no CLS from font loading (font-display: swap is in the Google Fonts URL).

## Sign-off tracker (manual review, page by page)

Mark each page reviewed and approved before merging `redesign/mintlify` to `main`:

- [ ] en/index.html
- [ ] ar/index.html
- [ ] en/network.html
- [ ] ar/network.html
- [ ] en/security.html
- [ ] ar/security.html
- [ ] en/software.html
- [ ] ar/software.html
- [ ] en/about.html
- [ ] ar/about.html
- [ ] en/contact.html — confirm Web3Forms action/access key unchanged
- [ ] ar/contact.html — confirm Web3Forms action/access key unchanged
- [ ] en/privacy.html
- [ ] ar/privacy.html
- [ ] en/terms.html
- [ ] ar/terms.html

## Out of scope — do not touch
- Any copy rewrites (hero H1 / footer tagline / CTA heading rework is a separate track)
- GA4 / Search Console
- Social account links (keep hidden)
- The Diamond Grid brand assets

# Shabakat Alasturah — Website

Static, bilingual (Arabic primary / English mirrored) brochure + lead-generation site. No build step, no framework — every page is a hand-authored, standalone HTML file. Deployed as static assets via Cloudflare Workers (`wrangler.jsonc`).

## Structure

```
index.html          → language redirect (defaults to Arabic, browser-language aware)
ar/                  → Arabic pages (primary)
en/                  → English pages (mirrored)
assets/css/design-system.css
assets/js/main.js
assets/img/          → logo, favicon, OG images (finalized, not placeholders)
robots.txt
sitemap.xml
```

Each language has 8 pages: `index`, `about`, `network`, `software`, `security`, `contact`, `privacy`, `terms`.

## Preview locally

```
npm run dev
```

or, without Wrangler:

```
python3 -m http.server 8080
```

## What's real vs. placeholder

Everything marked with the CSS class `.todo` on the live pages is a placeholder. Search the codebase for `class="todo"` to find every instance. As of now the only remaining placeholders are the three social-media icons (X, Instagram, LinkedIn) in the footer of every page — hidden (`display:none`) until real links are supplied.

Logo, favicon, OG images, phone/WhatsApp number, CR/VAT numbers, and business details are all finalized in the current markup — not placeholders.

## Contact form

The form submits via [Web3Forms](https://web3forms.com) (`https://api.web3forms.com/submit`) — no backend required. Do not reintroduce a `mailto:` fallback.

## Legal pages

`privacy.html` and `terms.html` are drafts aligned with PDPL (Personal Data Protection Law / SDAIA) and general website-terms norms — review with a licensed Saudi legal advisor before treating them as final.

## Deployment

`wrangler.jsonc` serves the whole repo root as static assets. Pushing to `main` auto-deploys straight to production (`alasturah.com`) — always work on a branch/PR, never push to `main` directly. See `CLAUDE.md` for full contributor conventions.

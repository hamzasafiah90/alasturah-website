# Shabakat Alasturah — Website

Static, bilingual (Arabic primary / English) brochure + lead-generation site. No build step — open the HTML files directly or serve the folder with any static host.

## Structure

```
index.html          → language redirect (defaults to Arabic, browser-language aware)
ar/                  → Arabic pages (primary)
en/                  → English pages (mirrored)
assets/css/styles.css
assets/js/main.js
assets/img/          → placeholder logo + favicon
robots.txt
sitemap.xml
```

Each language has 7 pages: `index`, `about`, `products`, `software`, `contact`, `privacy`, `terms`.

## Preview locally

From this folder, run a simple static server, e.g.:

```
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## What's real vs. placeholder

Everything marked with a dashed orange box on the live pages (CSS class `.todo`) is a placeholder. Search the codebase for `class="todo"` or `[TODO` to find every instance. Current placeholders:

- **Logo** — no logo file was actually received (only inline chat previews, nothing saved to disk). The header/footer/favicon currently use a hand-built placeholder mark (`assets/img/logo-mark.svg`, `assets/img/favicon.svg`). Replace these two files with the real logo exports once supplied, ideally as SVG or high-res transparent PNG.
- **Phone number / WhatsApp link** — every `wa.me/9665XXXXXXXX` link and the footer phone placeholder need the real 10-digit Saudi mobile number. The number given in chat (058383398) is 9 digits, one short of the standard `05XXXXXXXX` format — confirm the correct number before going live.
- **CR number, VAT number, National Address** — required in the footer of every page (and ideally in Terms/Privacy) per Ministry of Commerce disclosure norms. Currently shown as visible `[placeholder]` text so they're impossible to forget.
- **Legal entity name in Arabic** — footer/legal pages currently use "مؤسسة شبكات الأسطورة المميزة" as a transliteration-based best guess of "Shabakat Alasturah Almumayizah Establishment." Confirm the exact spelling against the CR certificate.
- **CST certificate/license number** — the products page states the boosters are CST-approved (per your confirmation) but doesn't cite a certificate number. Optional but adds credibility — supply it if you want it displayed.
- **Domain** — all canonical URLs, hreflang tags, and the sitemap assume `https://www.alasturah.com`. Confirm this matches the live domain before publishing the sitemap to Search Console.
- **Product photos** — product cards currently show an icon placeholder instead of real device photos.
- **Business hours** — contact page shows "Sunday–Thursday" with hours left blank.
- **Social links** — footer social icons are non-functional placeholders.

## Contact form — important limitation

The form currently submits via a `mailto:` link (opens the visitor's local email client — works with zero backend, but isn't a reliable production pattern across all browsers/devices). Before relying on it for real leads, wire it to a proper form backend such as Web3Forms, Formspree, or a small server-side mail script, and update `assets/js/main.js` accordingly.

## Legal pages

`privacy.html` and `terms.html` are starting drafts aligned with PDPL (Personal Data Protection Law / SDAIA) and general website-terms norms — **not reviewed by a lawyer**. Have a licensed Saudi legal advisor review both before publishing.

## Next steps (deployment & marketing)

1. Fill in the placeholders above.
2. Pick a host (any static host works — e.g. a shared hosting plan, Netlify, Cloudflare Pages) and point the `alasturah.com` DNS at it.
3. Verify the domain in Google Search Console and submit `sitemap.xml`.
4. Set up Google Business Profile (helps local/Maps visibility for a Saudi B2B/installer business).
5. Add GA4 + Search Console verification using the commented-out hooks already left in the `<head>` of `ar/index.html` and `en/index.html`.
6. Only then start paid Google Ads / SEO work — sending traffic to a site still full of placeholder legal info undermines trust and conversion.

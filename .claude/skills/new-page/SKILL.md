---
name: new-page
description: Scaffold a new bilingual page pair (English + Arabic) for the Alasturah site, since pages are hand-authored HTML with no templating system. Use when asked to add a new page to the site.
disable-model-invocation: true
---

Given a page name/topic ($ARGUMENTS), create both `en/<slug>.html` and `ar/<slug>.html`:

1. Pick the closest existing page (e.g. `about.html`) in both `en/` and `ar/` as a starting template — copy its `<head>` structure exactly:
   - GA4 gtag snippet
   - `<meta charset>`, viewport, title, meta description (write new page-appropriate copy for each language)
   - `canonical` link and all three `hreflang` alternates (`en`, `ar`, `x-default`), pointing at the new page's URLs in both languages
   - `og:*` and `twitter:card` meta tags
   - favicon link
   - font preconnects and `<link rel="stylesheet" href="../assets/css/design-system.css">`
   - the `LocalBusiness` JSON-LD block — copy verbatim from an existing page, don't invent new business data
2. Copy the shared header/nav and footer markup verbatim from the same reference page in each language — do not redesign them for the new page.
3. Write the new page's body content in the matching language, keeping `dir="rtl"`/`lang="ar"` on the Arabic version and `dir="ltr"`/`lang="en"` on the English version.
4. Add the new page to `sitemap.xml` (both language URLs) and, if it should appear in navigation, add nav links in every existing page's header — in both `en/` and `ar/`.
5. Flag any content you don't have real values for using `class="todo"`, matching the convention used elsewhere on the site — don't invent business details (phone numbers, certificate numbers, etc.).

# IMRANE — Cinematic Architectural Atelier

A complete Next.js portfolio for Imrane Ammour, with TypeScript, Tailwind CSS,
GSAP and ScrollTrigger. The site exports to static files for free hosting.
All 11 projects and 101 renders come from the original portfolio; there are no
demo projects, invented dates, testimonials, awards or client logos.

## Run locally

Use Node.js 24 LTS (Next.js requires Node 20.9 or newer).

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:3000. The asset preparation script copies the original
`assets/` directory into ignored `public/assets/`. The originals remain intact.

For the production export:

```sh
npm run build
npm run verify:export
npm run preview
```

The deployable website is in `out/`. The preview supports clean directory
routes, 404 status responses, and byte ranges for video playback.
Stop a local server with Ctrl+C.

## Routes and source

- `src/app/page.tsx`: cinematic homepage.
- `src/app/projects/page.tsx`: project browsing and accessible filters.
- `src/app/projects/[slug]/page.tsx`: statically generated case studies.
- `src/app/about/page.tsx`, `services/page.tsx`, `contact/page.tsx`.
- `src/app/not-found.tsx`: custom 404.
- `src/components/`: navigation, motion, image loading, galleries, hero,
  contact form and shared finale.
- `src/app/globals.css`: the design system and responsive layouts.
- `src/data/projects.ts`: editable authentic project catalogue.
- `src/data/site.ts`: identity, contacts, social URLs, portrait and hero media.
- `src/data/services.ts`: service descriptions and related projects.

The original HTML, CSS, JavaScript and assets are preserved at the repository
root as a reference. They are not included in the new production export.
`public/_redirects` maps the old HTML project URLs to their new case studies
on Netlify. `netlify.toml` declares the build command and `out/` publish folder.

## Update projects and images

Edit `src/data/projects.ts`. Each record contains a slug, title, category,
description, concept, cover, lightweight preview, gallery and actual services.
Optional location, year, status, material board and technical drawing galleries
are displayed only when provided. Before/after data can be stored for future
paired-image work; no comparator is shown without an implemented paired-image
section. The current catalogue has no technical drawing or before/after files.

Add original media to `assets/`, then update the paths, alt text and exact
dimensions in the data file. Below-the-fold images load lazily. Gallery images
retain the full original compositions in the viewer. The homepage uses the
existing optimized WebP previews and a silent ~2 MB H.264 hero loop.
The full original villa film remains available on its case study.

No demo images need replacement. To replace the authentic portrait, update
`site.portrait` and its width/height attributes in the homepage and About page.
Only regenerate the catalogue from the preserved original HTML with
`python tools/migrate-project-data.py` if you intend to overwrite catalogue edits
(Pillow is required). `tools/optimize-preview-images.py` belongs to the preserved
original homepage workflow; do not use it as a project catalogue editor.

## Contact configuration

Edit `src/data/site.ts` for email, phone, WhatsApp, site URL and social profiles.
Empty social URLs are hidden. Keep the production URL accurate for canonicals,
Open Graph metadata, sitemap and robots.

The form retains the existing endpoint `https://formspree.io/f/xljrajoz`.
Set `site.form.enabled = false` to use direct contact links only.
Before publishing, confirm the destination and account activation in Formspree.
The UI reports acceptance only after a successful provider response; actual
email arrival was not tested and depends on that account's settings.
No real test enquiry was sent.

Required-field/email validation, message limits, a honeypot, a short submission
delay, a per-session cooldown and Formspree's provider filtering protect the
form. Client-side guards are not a substitute for provider-side spam filtering.
Failures preserve the draft; a 15-second timeout unlocks retry. The website
requires no private API keys or server secrets.

## Animation and accessibility

GSAP/ScrollTrigger provides scroll reveals, restrained image parallax and
scroll-linked typography. CSS handles entrances, menus, filtering and route
transitions; there is no scroll hijacking or second animation library.
GSAP contexts revert on route changes and preference changes.

The preloader lasts 900 ms and runs once per browser-tab session. Reduced
motion skips it, disables animated effects and retains the still hero image.
The footer's Reduce motion control provides the same static experience without
changing system settings. The choice is remembered locally; a system reduced
motion preference always takes priority.
The background video pauses off-screen and in hidden tabs, respects reduced
motion/data saving, offers Pause/Play and retains a photo fallback.
Clicking the decorative hero visual never navigates.

Native dialogs provide modal keyboard containment. Galleries support arrow
keys, Escape, previous/next buttons, image counters, touch swipes and restored
focus. Mobile navigation closes on selection or Escape. Explicit page links
open at the top; back/forward retains browser restoration. Normal scrolling
and touch remain available throughout.

## Validation

```sh
npm run typecheck
npm test
npm run build
npm run verify:export
```

The Node tests validate the new catalogue/provider contract and also retain
the original hero/contact regression suites. Original content tests remain
available with `python -m unittest discover -s tests` (Pillow required).

Browser QA should use the production preview: check route navigation,
all categories, galleries, focus return, phone layouts, reduced motion, hero
pause/resume and real form validation. Form delivery tests use mocked
responses to avoid unsolicited messages. Lighthouse scores are not claimed
without a measured Lighthouse run.

## Deployment (not performed)

Upload the complete `out/` folder to a static host or connect the repository
with build command `npm run build` and publish directory `out`.
Serve directory indexes, use `404.html` for missing URLs with HTTP 404, and keep
video byte-range requests enabled. On Netlify, the supplied configuration and
legacy redirects handle this.

No public deployment or paid service was created.
See the [Next.js static export guide](https://nextjs.org/docs/app/guides/static-exports)
and [GSAP matchMedia documentation](https://gsap.com/docs/v3/GSAP/gsap.matchMedia/).

# Verification — architectural atelier

Verified locally on 12 October 2026. No public deployment was performed.

## Automated checks

- Next.js 16.4.0 production build: passed; all required routes are statically generated.
- TypeScript: `npm run typecheck` passed.
- Node: 15 tests passed (catalogue/filter/provider checks and preserved regression suites).
- Python: 25 original project/content/image tests passed.
- Export integrity: 17 pages including the custom 404 and 638 local links/assets passed.
- Sitemap, robots and legacy redirect files are included in the export.

## Actual Chrome verification

- Header and mobile-menu navigation; menu closes after selection.
- All, Interior Design, Architecture and 3D Visualization filters.
- Architecture returns one project; Interior Design ten; Visualization eleven.
- Keyboard movement between filter controls.
- Case-study navigation opens at the top; browser Back returns to Projects.
- Gallery open, next image, arrow-key navigation, Escape and focus return.
- Hero pause/resume; clicking its visual keeps the homepage URL.
- Footer Reduce motion stops the film, removes title animation and restores the photo.
- Mobile gallery and every required page render at 390 px without horizontal overflow.
- Homepage checked at 320, 390, 768 and 1280 px without horizontal overflow.
- Native required-field validation blocks empty contact submissions.
- Custom 404 displays its recovery links.

The reduced-motion browser test used the site's own preference control. System
media-query support is implemented; the browser tool did not expose OS media
emulation. Touch swipe handlers are implemented; gallery buttons and keyboard
controls were exercised in Chrome, without simulating a physical touch device.

## Limits

No real enquiry was sent to Formspree. Provider acceptance/error behaviour is
tested with mocked responses; actual mailbox delivery depends on the configured
Formspree account. Lighthouse was not run; no score is asserted.

The preserved static homepage at port 8000 is the previous version. The new
Next.js production preview runs at port 3000 using `npm run preview`.

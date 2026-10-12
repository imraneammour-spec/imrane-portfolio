# Portfolio content clarity audit

Audited the existing local homepage and all page templates on 12 October 2026.
The existing portfolio, route structure and deployment configuration are retained.

## Homepage decisions

| Previous section | Communication problem | Implemented replacement |
| --- | --- | --- |
| Cinematic hero | Poetic heading did not identify the designer or profession; one project CTA | Name, professional role, specific introduction, Projects and Contact CTAs; authentic villa film retained |
| “Beyond spaces. Into experiences.” | Large decorative text, abstract description and symbol without useful visual content | Three service stories with scope descriptions, actual interior/exterior renders, a documentation icon and direct service anchors |
| “A sense of place.” | Title did not identify the portfolio; no project descriptions | Selected Projects, categories, existing descriptions and authentic landscape/portrait images |
| “From intention to detail.” | Repeated expertise with no visual evidence; all links had the same destination | Service information consolidated into the service stories and dedicated Services page |
| “Light. Matter. Emotion.” | Two real images with vague labels, duplicating portfolio imagery | Four-step process with visible purposes and animated timeline; no fabricated intermediate images |
| About preview | Professional role present but small; mostly atmospheric copy | Meet Imrane Ammour, specializations, genuine portrait and an explicit About link |
| Contact finale | Abstract call to action without direct contact channels | Project enquiry explanation, Contact page, configured email and WhatsApp |

Added a dedicated software section with the original confirmed tools: 3ds Max,
V-Ray, AutoCAD, Archicad and Illustrator. Imrane clarified that Lumion and
Photoshop are not part of his practice; they are excluded. There are no invented
proficiency scores, and template suggestions must not be treated as personal skills.

## Content and asset boundaries

- All 11 project slugs, their 101 gallery images, categories, scope, descriptions,
  optional metadata and contact details are retained.
- Project cards now expose the existing overview rather than inventing new copy.
- Featured images use the authentic full-resolution covers; collection previews
  retain the lighter thumbnails.
- No authenticated technical drawings or before/after pairs are configured.
  Technical documentation uses a labeled icon composition, with an editable
  TODO in `TechnicalVisual.tsx`; it is never presented as an actual project plan.
- Dates, client names, awards, statistics and testimonials are not fabricated.
- The villa remains explicitly identified as a personal architectural study.

## Other pages and motion

Projects, About, Services and Contact use descriptive page titles. Case studies
have Project Overview, Work performed, Design Approach and Project Renders.
Technical information appears only when populated in the project data.

Text, buttons, labels and form controls have larger readable sizes. Reveals start
when their elements enter view, without hiding off-screen content. Staggered
service/process/tool entrances and a timeline accent support the reading order.
Reduced motion restores the static layout and pauses the hero film. The one-time
preloader was shortened to 350 ms; browser scrolling remains native.

## Verification

- Production build and TypeScript passed.
- All 15 Node tests and 25 preserved Python content/image tests passed.
- Export verification checks 17 pages, 681 local references including section
  anchors, and the sitemap/robots/redirect files.
- Chrome: all 16 portfolio pages at 390 px had no horizontal overflow, clipped
  headings or content hidden by reveals. Homepage also passed at 320, 768 and
  1280 px; desktop sections were visually reviewed at the default viewport.
- Architecture filter returns the real villa study; the project scope and
  personal-study status remain visible on its detail page.
- Gallery open/next/Escape, mobile menu selection/closure, service section
  navigation and the reduced-motion control were exercised.
- Reduced motion paused the background video and retained visible content;
  normal motion was restored after testing.
- Desktop, service, process and mobile screenshots were saved for review.

No real form message was sent. Provider responses remain covered by mocked
tests; actual mailbox delivery and Lighthouse scores are not asserted.

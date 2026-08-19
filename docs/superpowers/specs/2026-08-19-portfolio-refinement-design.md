# Portfolio Refinement Design

## Objective

Refine the existing Imrane Ammour portfolio into a restrained, premium French-language architecture portfolio while preserving the project imagery, page structure, WhatsApp contact route, and existing Formspree endpoint.

## Visual system

- Retain Playfair Display, Manrope, and DM Mono for the existing editorial hierarchy.
- Consolidate colours around warm ivory `#F1ECE3`, light stone `#E6DED2`, charcoal `#1D1D1B`, muted text `#67625C`, and a sparing espresso accent `#5A4033`.
- Preserve the existing generous white space, image-first composition, and subtle reveal approach. Hover and focus feedback use transforms and opacity only.
- Respect `prefers-reduced-motion`; all reveals are visible without JavaScript and motion is disabled when requested.

## Content and navigation

- French is the UI language. Keep project names intact; replace generic English service and CTA copy with French.
- WhatsApp remains the primary contact route and keeps its existing number and URL.
- Remove Instagram and LinkedIn placeholders completely. Rebalance the contact footer with email, WhatsApp, telephone, and copyright only.
- Terrasse Atlas remains present but is not a link because there is no detail page or supplied information. Its card is labelled as unavailable rather than routing visitors to Contact.
- Add previous/next project links between the three supplied case studies, wrapping from the final project to the first. Do not create a detail page for Terrasse Atlas.

## Technical changes

- Improve semantic navigation, focus states, keyboard menu behavior, filter controls, and form feedback. Preserve Formspree `https://formspree.io/f/xljrajoz` and provide loading/success/error states.
- Add `loading=lazy`, `decoding=async`, explicit image dimensions, and aspect-ratio rules to prevent layout shifts. Keep the hero eager; set the walkthrough to `preload=metadata`, `playsinline`, and its existing project image poster.
- Add click-to-expand gallery lightbox using the existing images only, progressively enhanced by JavaScript.
- Add titles, unique descriptions, production canonical URL, Open Graph/Twitter metadata, and JSON-LD to all pages. Use `https://imrane-portfolio.netlify.app/` as the production origin.
- Create `robots.txt` and `sitemap.xml`. Generate a favicon and Apple touch icon from the existing logo asset, and declare them on every page.

## Scope limits

- Do not replace imagery, add project facts, add a framework, remove existing projects, create fake credentials, or expose new credentials.
- Do not test the remote Formspree endpoint by submitting user data.

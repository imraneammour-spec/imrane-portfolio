# Portfolio Refinement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Improve the existing portfolio's editorial polish, accessibility, SEO, media loading, and navigation without changing its supplied imagery or content scope.

**Architecture:** Keep the current four static HTML pages and shared CSS/JavaScript. Consolidate shared visual behaviour in the existing stylesheets, enrich the existing progressive-enhancement JavaScript, and add static SEO/indexing artifacts.

**Tech Stack:** Static HTML5, CSS, vanilla JavaScript, existing Google Fonts, Formspree, Netlify.

**Spec:** `docs/superpowers/specs/2026-08-19-portfolio-refinement-design.md`

## Global Constraints

- Production URL: `https://imrane-portfolio.netlify.app/`.
- Preserve all supplied project images, project facts, WhatsApp route, and Formspree endpoint.
- Use French for interface copy; project names remain unchanged.
- Do not add dependencies or a framework.
- Animations must honor `prefers-reduced-motion`.

---

### Task 1: Shared visual and interaction foundation

**Files:**
- Modify: `style.css`, `hero.css`, `portrait.css`, `cafe.css`, `contact.css`, `mobile.css`, `script.js`

**Interfaces:**
- Consumes: Existing class names used by all pages.
- Produces: Shared tokens, focus/hover/motion styles, robust menu/filter/form interaction, and optional image-lightbox behavior.

- [ ] Review duplicated overrides and replace only conflicting rules with coherent shared declarations.
- [ ] Add focus-visible, mobile menu keyboard behavior, aria state updates, filter pressed state, form submit state, reduced-motion support, and lightbox event handling.
- [ ] Validate JavaScript syntax with `node --check script.js` if Node is available; otherwise manually parse and inspect every selector against `index.html`.

### Task 2: Homepage refinement

**Files:**
- Modify: `index.html`, `style.css`, `hero.css`, `contact.css`, `mobile.css`

**Interfaces:**
- Consumes: CSS and JavaScript from Task 1.
- Produces: French editorial homepage, accessible contact experience, responsive video, accurate project affordances, and SEO metadata.

- [ ] Add homepage metadata, canonical, sharing metadata, JSON-LD, favicon declarations, and image dimensions/loading strategy.
- [ ] Refine project-card markup: retain three working project links and make Terrasse Atlas an honest non-link placeholder.
- [ ] Remove Instagram and LinkedIn, keep WhatsApp unchanged, and rebalance footer layout.
- [ ] Inspect the resulting HTML for one h1, valid labels, no `href="#"`, and no missing local assets.

### Task 3: Case-study consistency

**Files:**
- Modify: `cafe-khemisset.html`, `villa-contemporaine.html`, `parapharmacie-sale.html`, `cafe.css`, `mobile.css`

**Interfaces:**
- Consumes: shared metadata declarations and optional gallery lightbox from Tasks 1-2.
- Produces: Consistent project pages with SEO metadata, fast galleries, and previous/next project navigation.

- [ ] Add unique canonical/sharing metadata, favicon links, JSON-LD, image dimensions, lazy-loading, and `data-gallery-image` hooks.
- [ ] Replace English CTA copy while preserving the WhatsApp URL.
- [ ] Add explicit previous/next links among only the three existing project pages.
- [ ] Verify all gallery paths exist and all project links resolve locally.

### Task 4: Static publishing artifacts and audit

**Files:**
- Create: `favicon.svg`, `favicon-32.png`, `apple-touch-icon.png`, `robots.txt`, `sitemap.xml`
- Modify: all four HTML pages

**Interfaces:**
- Consumes: existing `assets/imrane-ammour-logo.png` and production URL.
- Produces: browser icon declarations and discoverable production URLs.

- [ ] Generate the small raster favicon variants from the existing logo and add an SVG wrapper/reference that preserves recognisability.
- [ ] Add sitemap routes for the homepage and three supplied projects, and point robots.txt to the sitemap.
- [ ] Run a static audit for metadata, local paths, empty placeholder links, and JavaScript syntax.
- [ ] Inspect CSS breakpoints at 320, 375, 390, 430, 768, and desktop widths using layout rules and report any remaining browser-only verification limitations.

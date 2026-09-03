# Contributor Guide

## Project structure

- Keep numerical formulas in pure TypeScript functions under `src/lib/`.
- Keep Astro routes under `src/pages/`, reusable presentation in `src/components/`, and global tokens in `src/styles/global.css`.
- Keep site-wide name, URL, email, and social values in `src/config/site.ts`.
- Public files copied verbatim belong in `public/`. Production output belongs in `dist/` and must not be hand-edited.

## Coding conventions

- Use strict TypeScript for calculation logic. Validate finite values, integer requirements, zero, and hardware ranges before calculating.
- State units in labels and keep protocol assumptions visible near results.
- Use semantic HTML, associated labels, keyboard-native controls, visible focus states, sufficient contrast, and responsive layouts without horizontal overflow.
- Public copy must be original, natural English. Do not invent credentials, adoption numbers, endorsements, or precision.
- Add unique page title, description, canonical, breadcrumbs, and appropriate structured data to new public routes.
- Do not add analytics, ads, cookies, external fonts, or large dependencies without a documented requirement.

## Required checks

Run `npm run test`, `npm run build`, and `node scripts/validate-build.mjs`. Add unit coverage for normal, boundary, zero, invalid, conversion, range, and solver-error behavior when formulas change. Confirm calculator keyboard use and narrow-screen layout before release.

## Adding a tool

Create a pure library module and tests first, then add the Astro page, browser adapter, educational explanation, worked example, common mistakes, FAQ, related links, and disclaimer. Link it from the tool index and relevant guides. Update sitemap generation only if the route is excluded by Astro defaults.

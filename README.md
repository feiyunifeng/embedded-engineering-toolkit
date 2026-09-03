# Embedded Engineering Toolkit

A lightweight English-language Astro website with browser-based UART, Classical CAN, and STM32 timer/PWM calculators. The production build is fully static and can be uploaded directly to Hostinger.

## GitHub and Cloudflare Pages

The repository is ready for GitHub source control. Commit the source files and lockfile listed below; local dependencies, generated output, environment files, logs, and editor state are excluded by `.gitignore`.

Cloudflare Pages can deploy this static Astro build without an SSR adapter or backend. Use these project settings:

- Production branch: `main`
- Build command: `npm run build`
- Build output directory: `dist`
- Framework preset: Astro (optional; the values above are authoritative)

Cloudflare Pages should build from the repository root. No environment variables are required for the current site. The same `dist` output is suitable for static hosting.

## Commands

```bash
npm install
npm run dev
npm run test
npm run build
npm run validate
```

`npm run dev` starts the local site. `npm run test` runs formula unit tests. `npm run build` creates `dist/`; `npm run validate` runs tests, builds, and checks generated pages, key assets, internal links, and forbidden placeholders.

## Site identity and domain

Edit `src/config/site.ts` after purchasing a domain. Change `name`, `tagline`, `url`, `email`, and optional social links there. Also update the absolute sitemap URL in `public/robots.txt`; static text files cannot import the TypeScript config. Replace the placeholder contact mailbox before launch. No real personal information is currently included.

## Hostinger deployment

1. Run `npm install`, `npm run validate`, and inspect the generated site locally.
2. In Hostinger, connect the purchased domain to the hosting plan.
3. Empty only the intended `public_html` destination when appropriate, then upload the **contents** of `dist/` (not the `dist` directory itself) to `public_html`.
4. Enable Hostinger's SSL certificate and force HTTPS after DNS is active.
5. Verify the home page, all calculator routes, `404.html`, `robots.txt`, and `sitemap-index.xml` on the final domain.
6. Add the HTTPS property to Google Search Console, verify ownership, and submit `/sitemap-index.xml`.

## Future AdSense and consent setup

`src/components/AdSlot.astro` reserves unobtrusive space and currently loads no network. After approval, add the genuine Google-provided script once in `src/layouts/BaseLayout.astro` and replace or enhance the ad-slot component using the real publisher and unit identifiers. Never use a fabricated publisher ID. Upload Google's verified `ads.txt` at `public/ads.txt` so it builds to the site root. Before enabling ads, update the Privacy Policy and implement a Google-certified CMP where consent rules apply; document cookie categories, vendors, and withdrawal controls based on the actual configuration.

## Architecture

- `src/lib/` — pure, tested TypeScript calculations
- `src/pages/` — Astro routes and long-form English content
- `src/components/` — shared layout/content components
- `public/scripts/` — dependency-free browser UI adapters
- `tests/` — Vitest unit tests
- `scripts/validate-build.mjs` — generated-site checks

The CAN model is explicitly an estimate. It uses 47/67 base bits including intermission plus payload and shows a separate 20% conservative stuffing allowance.

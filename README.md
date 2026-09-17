# Redwood Retreats

A luxury A-frame cabin rental site — a front-end showcase built around a custom canvas animation, a small design system, and production-grade SEO.

**Live:** https://redwood-retreats.vercel.app

## Highlights

- **Canvas grass field** (`EmberGrass`) — 200 blades on desktop, 100 on mobile, with layered wind simulation, soil gradients, cattail seed heads, and floating embers. Drawing is skipped when the element is off-screen via `IntersectionObserver`.
- **SSR-safe particle system** — a seeded PRNG generates deterministic positions, so the server and client render identical markup with no hydration mismatch.
- **Design system** — semantic color tokens, an asymmetric `20px 4px 20px 4px` radius, and fluid `clamp()` typography.
- **9 cabins** with a filterable listing page, a 29-image gallery with a keyboard-navigable lightbox, a reviews carousel, and an accessible FAQ accordion.
- **41 Vitest tests** across 11 files covering data integrity, hooks, and component behaviour.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS v4 · Canvas API · `next/font` (Playfair Display + Inter) · Lucide · Vitest · Vercel

## Engineering notes

- `src/components/EmberGrass.tsx` — the canvas renderer is isolated from the CTA section, which shrank from ~368 lines to ~66 once the animation was extracted.
- `src/lib/useInView.ts` — a one-shot reveal hook: the element is unobserved after it first enters the viewport, so entrance animations never replay.
- `src/data/` — a typed, single source of truth for houses, gallery images, reviews, and amenities, shared across pages.
- `React.memo` on the heavier card components (`HouseBlock`, `HouseCard`, `PhotoCard`).
- Blade count is device-capped and the render loop is gated, keeping the animation cheap on phones.

## Not included

This is a front-end project. The reservation form has a live price estimate and a confirmation modal, but there is **no backend, availability check, payment, or email** — it is a UI demonstration. (Being explicit so the repo matches reality.)

## SEO, accessibility, security

- **SEO:** JSON-LD (`LodgingBusiness`, `FAQPage`, `Review`), `sitemap.ts`, `robots.txt`, Open Graph metadata
- **Accessibility:** skip-to-content link, ARIA on the FAQ / navigation / lightbox, keyboard-navigable lightbox and accordion, focus styles, `prefers-reduced-motion`
- **Security:** CSP, HSTS (preload), Permissions-Policy, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `poweredByHeader: false`

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm test         # 41 Vitest tests
npm run lint
npm run build
```

No environment variables are required.

## Structure

```
src/
├── app/
│   ├── layout.tsx          # fonts, metadata, JSON-LD
│   ├── page.tsx            # homepage sections
│   ├── loading.tsx / error.tsx
│   ├── sitemap.ts
│   ├── houses/             # filterable listings + 3D tilt cards
│   └── gallery/            # grid, lightbox, magnetic buttons
├── components/             # Navigation, Hero, EmberGrass, Particles, Booking,
│                           # Reviews, Faq, Amenities, Location, Footer, ...
├── data/                   # houses (9), gallery (29), reviews, amenities
├── lib/                    # useInView, shared styles
└── __tests__/              # 11 test files
```

## License

MIT

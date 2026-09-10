# Redwood Retreats

> A luxury A-frame cabin rental platform built with Next.js 16, featuring real-time canvas animations, PS5-style particle systems, and production-grade SEO.

**Live Demo:** [redwood-retreats.vercel.app](https://redwood-retreats.vercel.app)

## Overview

Redwood Retreats is a premium vacation rental website showcasing modern A-frame cabins in a forest setting. Built as a portfolio piece demonstrating full-stack Next.js development with emphasis on visual design, animation, performance, and accessibility.

## Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4
- **Animations:** Custom canvas rendering, CSS keyframes, IntersectionObserver
- **Fonts:** Playfair Display + Inter (next/font/google)
- **Icons:** Lucide React
- **Testing:** Vitest
- **Deployment:** Vercel

## Key Features

### Visual Design
- Custom warm amber color palette with semantic tokens
- Asymmetric border-radius design system (`20px 4px 20px 4px`)
- Layered radial gradient backgrounds with breathing glow orbs
- Editorial typography with `clamp()` fluid scaling

### Animations & Interactions
- **EmberGrass Canvas:** 200+ grass blades with wind physics, soil layers, cattail seed heads, and floating embers — pauses when off-screen via IntersectionObserver
- **PS5-style Particles:** 36 seeded-random floating particles across 4 depth layers with CSS animations
- **Scroll Reveals:** `useInView` hook for staggered section entrance animations
- **3D Tilt Cards:** Perspective-based tilt on house and gallery cards with smooth mouse tracking
- **Lightbox:** Full-screen image viewer with keyboard navigation (Escape, ArrowLeft, ArrowRight)
- **Magnetic Buttons:** Hover-responsive magnetic effect on gallery action buttons

### Performance
- `next/image` with AVIF/WebP optimization and responsive srcSet
- IntersectionObserver-based animation gating (no off-screen rendering)
- Seeded random for SSR-safe particle positions (no hydration mismatch)
- `prefers-reduced-motion` media query support
- Font preloading with `display: "swap"`
- 30-day image cache TTL
- `React.memo` on heavy card components

### Responsive Design
- Fluid typography with `clamp()` for smooth scaling across viewports
- Mobile-first breakpoints (`sm`/`md`/`lg`/`xl`) for layout adaptation
- Touch-friendly targets with 44px minimum tap size
- Tested across Chrome, Firefox, Safari, and mobile browsers

### SEO & Accessibility
- JSON-LD structured data (LodgingBusiness, FAQPage, Review schemas)
- Open Graph and Twitter card metadata
- `sitemap.xml` and `robots.txt`
- Skip-to-content links
- ARIA labels, `aria-expanded`, `aria-controls` on interactive elements
- Keyboard-navigable lightbox and FAQ accordion
- Semantic HTML (`<section>`, `<nav>`, `<main>`, `<footer>`)

### Security
- Content-Security-Policy headers
- Strict-Transport-Security (HSTS) with preload
- Permissions-Policy (disables camera/mic/geolocation)
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- X-XSS-Protection: 1; mode=block
- `poweredByHeader: false`

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with fonts, metadata, JSON-LD
│   ├── page.tsx            # Homepage (14 sections)
│   ├── loading.tsx         # Loading state
│   ├── error.tsx           # Error boundary
│   ├── sitemap.ts          # Dynamic sitemap
│   ├── houses/
│   │   ├── layout.tsx      # Houses page metadata
│   │   └── page.tsx        # Property listings with filters
│   └── gallery/
│       ├── page.tsx        # Gallery hero + grid
│       ├── GalleryGrid.tsx # Gallery container (167 lines)
│       ├── PhotoCard.tsx   # Individual photo cards (React.memo)
│       ├── Lightbox.tsx    # Full-screen viewer
│       └── MagneticBtn.tsx # Magnetic hover effect buttons
├── components/
│   ├── Navigation.tsx      # Fixed nav with mobile menu
│   ├── Hero.tsx            # Full-viewport hero
│   ├── Particles.tsx       # PS5-style floating particles
│   ├── EmberGrass.tsx      # Canvas grass animation (extracted)
│   ├── ValueProps.tsx      # Value proposition cards
│   ├── FeaturedHouses.tsx  # Alternating house cards (React.memo)
│   ├── Amenities.tsx       # Amenity grid
│   ├── Gallery.tsx         # Horizontal scroll gallery
│   ├── Experience.tsx      # Staggered moments grid
│   ├── Faq.tsx             # Accordion FAQ
│   ├── Booking.tsx         # Reservation form with confirmation modal
│   ├── Location.tsx        # Map + attractions
│   ├── Reviews.tsx         # Auto-rotating carousel
│   ├── CtaBand.tsx         # CTA section (62 lines, clean)
│   ├── ScrollToTop.tsx     # Floating back-to-top
│   ├── TechStack.tsx       # Built-with tech badges
│   ├── Footer.tsx          # 4-column footer
│   └── Decorations.tsx     # SVG decorative shapes
├── data/
│   ├── houses.ts           # Shared house data (9 properties)
│   ├── gallery.ts          # Gallery image data (29 images)
│   ├── reviews.ts          # Review data
│   └── amenities.ts        # Amenity data
├── lib/
│   ├── useInView.ts        # IntersectionObserver hook
│   └── styles.ts           # Shared style tokens (shadows)
└── __tests__/
    ├── houses.test.ts      # House data tests (5 tests)
    ├── gallery.test.ts     # Gallery data tests (3 tests)
    └── reviews.test.ts     # Review data tests (2 tests)
```

## Design Decisions

### Why Canvas for Grass?
CSS animations can't handle 200+ individual blade physics. Canvas provides GPU-accelerated rendering with full control over wind simulation, soil layers, and cattail seed heads. IntersectionObserver pauses the animation loop when off-screen.

### Why Seeded Random for Particles?
Server-side rendering generates different random values than client-side, causing hydration mismatches. A seeded PRNG (linear congruential) produces deterministic positions that match on both server and client.

### Why `next/image` Over `<img>`?
Automatic WebP/AVIF conversion, responsive srcSet generation, lazy loading, and blur placeholders — all without manual configuration. The hero image alone saves ~60% bandwidth with format negotiation.

### Why Asymmetric Border Radius?
The `20px 4px 20px 4px` pattern creates a distinctive, branded feel that separates this from generic rounded-corner designs. Applied consistently to cards, buttons, and badges for visual cohesion.

### Why Extract Components?
`GalleryGrid.tsx` was 493 lines with 4 components. Splitting into `MagneticBtn`, `Lightbox`, `PhotoCard`, and `GalleryGrid` improves maintainability and enables `React.memo` on individual cards. `CtaBand.tsx` dropped from 368 to 62 lines after extracting `EmberGrass`.

### Why Shared Data Layer?
House data was duplicated across `FeaturedHouses.tsx` (4 houses) and `houses/page.tsx` (9 houses). A single `src/data/houses.ts` with `houses`, `featuredHouses`, and `getHouseByName()` eliminates duplication and ensures consistency.

## Refactoring Journey

### Starting Point
The project began as a single-page landing with all components inline, raw `<img>` tags, hardcoded data arrays scattered across files, and no tests.

### Key Refactors

| Phase | Before | After |
|-------|--------|-------|
| **Data Layer** | House data duplicated in 2 files (47 + 153 lines), gallery images inline, reviews hardcoded | Single `src/data/` directory with typed exports, shared across all pages |
| **Component Split** | `GalleryGrid.tsx` (493 lines, 4 components), `CtaBand.tsx` (368 lines with embedded canvas) | `GalleryGrid` (167 lines), `EmberGrass` extracted, `Lightbox`/`PhotoCard`/`MagneticBtn` separated |
| **Image Optimization** | All `<img>` tags (10 lint warnings, no WebP/AVIF, no responsive srcSet) | All `next/image` with `fill`, `sizes`, `priority` on LCP images |
| **State Management** | `useState` for `loaded` animation trigger, `displayIndex` synced via `useEffect` | CSS animations only, removed redundant state |
| **Testing** | 0 tests | 29 tests across 8 files (data, hooks, components, interactions) |
| **Accessibility** | No skip links, no ARIA on FAQ, no reduced-motion | Skip links, `aria-expanded`/`aria-controls`, `prefers-reduced-motion` |
| **Security** | No headers | CSP, HSTS, Permissions-Policy, X-Frame-Options |
| **SEO** | Basic meta tags only | JSON-LD (LodgingBusiness, FAQPage, Review), sitemap, robots.txt |

### Performance Optimizations
- Canvas grass: 200 blades on desktop, 100 on mobile (IntersectionObserver pause)
- Particles: Seeded random for SSR safety, 36 particles across 4 depth layers
- Images: AVIF/WebP via next/image, 30-day cache TTL
- Animations: All use `transform`/`opacity` (compositor-only properties)

### Git History
The repository shows the full development process through meaningful commits with conventional commit messages.

## Performance

Lighthouse scores (target):
- **Performance:** 95+
- **Accessibility:** 100
- **Best Practices:** 100
- **SEO:** 100

Key optimizations:
- next/image with AVIF/WebP format negotiation
- IntersectionObserver-based animation gating
- Font preloading with `display: "swap"`
- Canvas animation throttled on mobile
- No layout shift (explicit dimensions on all images)

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Run tests
npm run test

# Lint
npm run lint
```

## Author

[Your Name] — [Your LinkedIn] — [Your GitHub]

## License

MIT

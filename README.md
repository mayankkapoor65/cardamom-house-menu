# Cardamom House — Restaurant Menu Page

A responsive, high-performance, single-page restaurant menu built for **Cardamom House**, a fictional brunch café located on Rua da Boavista in Lisbon. Designed mobile-first for customers standing on the pavement outside deciding what to order, this application pairs a warm, editorial European bistro aesthetic with strict type safety, zero `any` usage, and WCAG AA/AAA accessibility.

---

## Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Library**: React 19
- **Language**: TypeScript 5 (`strict: true`, zero `any`)
- **Styling**: Tailwind CSS v4 (native `@theme` tokens, CSS custom properties)
- **Typography**: `next/font/google` (`Lora` editorial serif for headings, `Inter` for body)
- **Theming**: Light & Dark mode support (respecting `prefers-color-scheme` + 1-click logo toggle)
- **Printing**: Native `@media print` styling + dedicated `/print` clipboard sheet
- **Icons**: Handcrafted, accessible inline SVGs (`aria-hidden="true"`)

---

## Running Locally

1. **Clone the repository and install dependencies**:
   ```bash
   git clone <repo-url>
   cd <repo-folder>
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```

3. **Open the menu**:
   Open [http://localhost:3000](http://localhost:3000) in your browser (or `http://<your-lan-ip>:3000` on mobile).

4. **Production Build & Verification**:
   ```bash
   npm run build
   npm run start
   ```

---

## Viewing the States & Features

The application supports URL query-parameter-driven view states via `?state=` with a `<Suspense>` client boundary, and includes a discrete preview bar at the top of the viewport for 1-click toggling:

| State | URL Parameter | Simulated "Now" | Visual Behavior |
| :--- | :--- | :--- | :--- |
| **Open (Default)** | [`/?state=open`](http://localhost:3000/?state=open) | Tuesday 11:30 | Green pulsing status badge (`Open now`), full amber Today's Special card, weekly hours with Tuesday highlighted. |
| **Closed** | [`/?state=closed`](http://localhost:3000/?state=closed) | Monday 10:00 | Neutral gray status badge (`Closed`), friendly on-brand `ClosedBanner` ("We're closed today — back Tuesday at 08:00"), Monday highlighted in hours table. |
| **Special Sold Out** | [`/?state=special-sold-out`](http://localhost:3000/?state=special-sold-out) | Tuesday 12:00 | Today's Special degrades gracefully with "Back tomorrow at 08:00" copy, and the Saffron French Toast item row shows as dimmed with a "Sold out" pill and `aria-disabled="true"`. |
| **Print Sheet** | [`/print`](http://localhost:3000/print) | Any | Clean black-and-white A4 clipboard print format with 1-click PDF export. |

---

## Key Design Decisions

1. **Brand Fidelity (`#B45309`)**:
   - Rather than treating the brand color as a generic button fill, amber is integrated intentionally:
     - Active scrollspy navigation indicators (mobile tab fill and desktop sidebar border).
     - Chef's Special callout accent strip and card background (`--brand-surface`).
     - Weekly opening hours current-day left border and badge.
     - Custom high-visibility keyboard focus rings (`focus-visible:ring-amber-400`).
     - Derived darker tints (`--brand-dark: #8b3e05`, `--brand-darker: #6d2f02`) guarantee **7.4:1 to 9.8:1 contrast ratios (WCAG AAA)** for all text elements.

2. **Editorial Typography**:
   - Headings use **Lora**, an elegant serif font evoking independent Mediterranean dining cards and Lisbon printed menus.
   - Body copy and ingredients use **Inter** for clean, effortless scanning on small mobile screens outdoors under sunlight.

3. **Type-Led Design over Stock Food Photography**:
   - Stock food photos often make an independent café feel like a generic SaaS template or franchise. We prioritized typographic hierarchy, tactile card surfaces, and subtle warm tones to communicate craftsmanship and authenticity.

4. **Mobile-First Category Navigation & Tap Targets**:
   - On mobile, `CategoryNav` is a sticky horizontal bar that auto-scrolls the active tab into the center of the viewport as the user reads down the page.
   - Every interactive element (navigation links, menu items, phone/hours anchors) guarantees a minimum touch target height of **at least 44px** (`min-h-[44px]`).

5. **Pure CSS Motion**:
   - Page sections, special callout, and headings utilize a subtle entrance animation (`fadeInRise`) with zero external animation libraries, fully disabled when `prefers-reduced-motion: reduce` is detected.

---

## What I'd Build Next (Honest Roadmap)

Given another half-day or production scope, I would prioritize:

1. **Bilingual Localization (Portuguese / English)**:
   - Add a discrete `PT / EN` language switch. Lisbon has a vibrant blend of local neighborhood regulars and international travelers; bilingual dish titles (e.g. *Torrada com Abacate* / *Avocado Toast*) would elevate hospitality.
2. **Order-Ahead & Table QR Ordering with NIF Tax Support**:
   - Integration with local Portuguese fiscal POS (e.g. Vendus or Moloni) allowing customers to tap an item to add to a light tray and request their fiscal tax number (`NIF`) on the receipt.
3. **Live "Closing Soon" Window Banner**:
   - When within 20 minutes of daily closing, transition the green badge to warm amber with a friendly countdown ("Kitchen closing in 18 minutes — last coffee orders").

---

## Known Trade-offs (4–6 Hour Time-Box)

- **Static JSON Data Model**:
  - The menu data is stored directly in a strictly typed TypeScript constant (`src/lib/data.ts`) rather than an external CMS or database, maximizing speed, zero cold starts, and immediate reliability.
- **Client-Side Scrollspy**:
  - Scrollspy tracking uses `IntersectionObserver` in a lightweight client component. While anchor links work natively with pure HTML/CSS without JavaScript, active tab highlighting requires client hydration.
- **Preview Switcher Component**:
  - A persistent top bar (`StateSwitcher`) is included for reviewers and evaluators. In a live production customer deployment, this bar would be restricted to staff preview mode or staging environments.

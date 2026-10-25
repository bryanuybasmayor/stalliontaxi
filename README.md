# Stallion Taxi — Melfort, Saskatchewan

One-page site for a local taxi service in Melfort, SK. Static HTML, no CMS, no backend.

- **Stack:** [Astro](https://astro.build) (static output) + **Tailwind CSS v4** built through the Vite plugin. No CSS framework beyond Tailwind, no client framework, ~2 KB of vanilla JS for the menu and the booking form.
- **Business facts** live in `src/data/business.ts` — phone, email, hours, towns, services and the open TODOs.
- **Design:** black ground, gold accent sampled from the supplied logo, a geometric sans for headings (Jost) and Inter for body copy, both self-hosted via Fontsource. Subtle motion throughout: hero/section parallax, scroll reveals, hover states.

## Run it

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # type-checks, builds dist/, then refreshes the GitHub Pages copy
npm run preview    # serve the built site
npm run demo       # re-copy dist/ to the repo root without rebuilding
```

Requires Node 20+. If `npm install` fails with `Cannot read properties of null (reading 'edgesOut')`, that is a known npm 10 bug with optional peer dependencies — use `npm install --legacy-peer-deps`.

Deploy by uploading the contents of `dist/` to any static host. The export step rewrites the build to relative URLs and inlines the one script, so `dist/index.html` also opens straight from disk (double-click it) and works from any sub-path. Set the real domain in `astro.config.mjs` (`site: 'https://…'`) so canonical and social URLs can be absolute.

## GitHub Pages demo

The repository root holds a ready-to-serve copy of the site — `index.html` plus its `_astro/` assets — so a client can open the demo without building anything.

- `npm run build` (and `npm run demo`) rewrites `dist/` and copies it to the root via `scripts/export-demo.mjs`.
- Every internal URL is relative (`./_astro/…`), so the page works at `https://<user>.github.io/<repo>/`, at a root domain, and when the file is opened directly — `dist/index.html` included.
- `.nojekyll` is written so GitHub Pages serves the `_astro/` folder (Jekyll skips folders starting with `_`).
- Publish with **Settings → Pages → Source: Deploy from a branch**, branch `main`, folder `/ (root)`. The printed page is the demo; `src/` stays the source of truth.
- Re-run `npm run build` after any content change so the demo does not go stale.

## Where to change things

| What | Where |
| --- | --- |
| Phone, email, hours, launch dates, towns, services | `src/data/business.ts` |
| Colours, fonts (Tailwind theme tokens) | `src/styles/global.css` (`@theme` block) |
| Page sections and copy | `src/pages/index.astro` |
| Header, footer, mobile call bar | `src/components/` |
| Booking form markup + fields | `src/components/BookingForm.astro`, `src/components/BookingField.astro` |
| Form validation, menu, email fallback | `src/scripts/site.ts` |
| Photos | `src/assets/photos/` (see `images-credits.md`) |
| Logo + favicons | `public/` and the original `img/stalliontaxi.png` |
| SEO title, description, LocalBusiness/TaxiService schema | `src/layouts/BaseLayout.astro` |

## Logo and palette

The supplied logo (`img/stalliontaxi.png`) is gold artwork on a transparent background — there is no black in the file, so the page ground is the deep black the logo is designed to sit on.

| Token | Value | Where it came from |
| --- | --- | --- |
| `--color-gold` | `#D8B850` | sampled mid tone of the logo gold |
| `--color-gold-light` | `#F0DF8A` | sampled highlight of the logo gold |
| `--color-gold-deep` | `#8A6F2C` | sampled shadow of the logo gold |
| `--color-ink` | `#0A0A0A` | page ground |
| `--color-void` | `#030303` | footer ground, deliberately darker than the page |
| `--color-coal` | `#101010` | alternating section band |
| `--color-charcoal` | `#171614` | form panels |
| `--color-line` | `#2A2721` | hairline rules |
| `--color-bone` | `#F5F1E8` | body text |
| `--color-mute` | `#A29C92` | secondary text |

Assets derived from the original logo (never redrawn):

- `public/logo-stallion-taxi.webp` — the full lockup (mark + “STALLION TAXI”), used in the footer.
- `public/logo-mark.webp` — the horse mark cropped from the same file, used in the header beside a typeset wordmark.
- `public/icon-64.png`, `public/apple-touch-icon.png` — the mark on the site black.

## Motion

All motion is CSS transitions plus a small scroll loop in `src/scripts/site.ts`; no animation library.

- **Parallax** — `[data-parallax]` on an image inside a clipping frame drifts at its own speed as the section passes (hero background, the three photo-band frames, the booking background). Add the attribute with a speed (`0.04`–`0.08`); images carry `scale(1.25)` so no edge ever shows.
- **Reveal** — `[data-reveal]` blocks fade and rise in when they enter the viewport, staggered by sibling order. JS adds `.reveal-ready` first, so content stays visible if JS fails or is disabled, and a viewport sweep keeps elements from staying hidden after an anchor jump.
- **Hover** — service rows tint and their arrow slides, images zoom slightly inside their frames, nav links draw a gold underline.
- **Reduced motion** — everything above is skipped under `prefers-reduced-motion: reduce`; the parallax and reveal loops never run and no content is hidden.

## Booking form behaviour

There is no booking server. On submit the form:

1. validates pickup, date, time and phone (plus name on the full form) with inline, screen-reader-friendly errors;
2. shows a confirmation panel with the request summarised;
3. builds a `mailto:` to `stalliontaxi@outlook.com` with the details filled in, so the request actually reaches the owner's inbox;
4. keeps the phone number one tap away at all times.

`TODO: connect form` — replace the `buildMailto()` path in `src/scripts/site.ts` with a real endpoint (email service, SMS or dispatch API) and switch the confirmation copy back to “Request received — we'll call or text you to confirm” once submissions are actually delivered server-side.

## Before launch — TODO checklist

Nothing unconfirmed is printed on the page any more; these open questions are collected in `src/data/business.ts` (`todos`).

1. **Hours** — confirm 6:00 a.m. – 1:00 a.m., seven days a week is still current after the October 27, 2026 launch.
2. **Fares** — add real out-of-town fares or a price range to replace “call for a quote”.
3. **Naicam** — confirm whether Naicam is a pickup town, and the rate if it is.
4. **Accessibility** — confirm wheelchair, walker, child-seat and luggage support before listing them.
5. **Fleet** — confirm vehicle make, model and passenger capacity.
6. **Address** — confirm a street or mailing address (Facebook shows only Melfort, SK, S0E1A0).
7. **Domain** — confirm the domain, then set it in `astro.config.mjs`.
8. **Booking form** — connect to the owner's email, SMS or dispatch system (see above).
9. **Photos** — replace the stock photos with real Stallion Taxi photos; update `images-credits.md`.

After launch, two lines will age out and should be edited: “Phone lines open Monday, October 26, 2026 / First rides Tuesday, October 27, 2026” in the contact section.

The reviews section was removed at the owner's request. When real Google reviews exist, add a `section#reviews` back to `src/pages/index.astro` with the customer's own words only — never invented reviews or stars.

## Verification

- `npm run build` — Astro type check plus static build, no errors.
- Lighthouse (mobile, production build): performance 99, accessibility 100, best practices 100, SEO 100.
- Layout checked at 360, 640, 768, 1024, 1280 and 1440 px: no horizontal scrolling, 44 px touch targets, sticky call bar, no clipped form fields, both booking forms and the mobile menu exercised in a headless browser.
- Motion checked headlessly: reveals fire on scroll and after anchor jumps, parallax transforms update with scroll, and with `prefers-reduced-motion: reduce` no content is hidden and no transforms run.

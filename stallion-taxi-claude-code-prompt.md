# Claude Code Prompt — Stallion Taxi, Melfort, Saskatchewan

Copy everything below the line and paste it into Claude Code in the project folder.

---

## Project: Stallion Taxi website — Melfort, SK

Build a fast, mobile-first website for **Stallion Taxi**, a local taxi service in **Melfort, Saskatchewan**.

This is a real local business website, not a demo, template, or concept piece. The #1 job of the site is to get a visitor a ride as fast as possible: call, or book in under a minute on a phone.

### Verified business facts — from Stallion Taxi's Facebook page, checked October 25, 2026

Source: https://www.facebook.com/people/Stallion-Taxi/61593001542307/

Use these facts on the site. Do not replace them with placeholders, and do not add facts beyond this list without the owner confirming them:

- **Business:** Stallion Taxi — Taxi Service, Melfort, SK, S0E1A0. No street address was shown on Facebook, so do not invent one.
- **Phone:** (306) 920-9896 — use this as the `tel:` link everywhere, including the sticky header and mobile Call Now button.
- **Email:** stalliontaxi@outlook.com
- **Facebook:** link to the page above in the header/footer and contact section. No website was shown on Facebook, so do not invent a domain.
- **Tagline (from the Facebook page):** "PREMIUM RIDE AT A STANDARD PRICE"
- **Hours / launch:** Services officially commence Tuesday, October 27, 2026, operating seven days a week, 6:00 a.m. to 1:00 a.m., with the phone line open for bookings and inquiries starting Monday, October 26, 2026. This came from a Facebook post, not from a separate About hours field — display these hours, but flag to the owner to confirm they are still current after launch. Do NOT claim 24/7 service.
- **Services (Facebook, September 30 post):** rides within the city; travel to medical appointments in Prince Albert, Saskatoon, and Regina; transportation to and from Kinistino, Tisdale, and St. Brieux; and full-day bookings.
- **Service area note:** A business reply on Facebook also mentioned rides from Naicam, with rates to be provided closer to the opening date — treat Naicam as tentative and confirm with the owner before presenting it as a confirmed pickup town.
- **Rates (Facebook, October 4 post):** within-city trips charged as per city bylaws; out-of-town trips use fixed pricing, described as much more affordable. **No dollar amounts were shown — do NOT invent any fares, flat rates, or minimums.** Use "Call for a quote" for out-of-town trips until the owner supplies real numbers.
- **Reviews:** Facebook showed "Not yet rated (0 reviews)" and 31 followers on October 25, 2026 — so leave the reviews section as a placeholder for real reviews only. Never write fake reviews or a fake rating.

### 0. First, look at what is already in this project — do not start from scratch blindly

1. Explore the current project folder first: existing files, framework, package manager, and any README or config.
2. **I have already created a folder for the logo in this project. Use that folder. Do not redesign the logo, do not generate a new logo, and do not invent a different brand mark.**
3. Open the logo file(s) in that folder and base the entire colour palette on the actual logo. Sample the real gold and black from the logo artwork and use those exact values as the primary palette.
4. If the logo folder is empty, missing, or unreadable, STOP and tell me exactly that — do not silently invent a logo or a palette. As a fallback only, use a restrained palette of deep black `#0A0A0A`, charcoal `#1A1A1A`, muted warm gold `#C9A227`, soft gold `#D4AF37` used sparingly, and off-white `#F5F1E8`. Never use bright taxi-yellow, neon gold, or a gold gradient as the main look.
5. Tech stack is decided (see section 6): Tailwind CSS, modern best practices. If a different stack already exists in the folder, flag that conflict to me before replacing it — do not silently switch stacks. If the folder is empty, scaffold with the stack in section 6: a clean, fast site, no CMS, and no backend unless a booking form needs one.

### 1. Brand: gold and black, premium but practical — not flashy, not cartoonish

- **Colours:** Black-dominant, gold as an accent only. Gold for the logo, key phone number, primary button, thin rules, and small highlights — never for large backgrounds, never for body text on gold.
- **Feel:** Strong, reliable, local, and grown-up. Think a well-kept black car at night, a gold badge, a prairie winter road — not a Las Vegas limo, not a cartoon horse, and not a tech startup.
- **Name treatment:** "Stallion" should feel like strength and reliability. Do not add horse clip-art, horseshoes everywhere, or a western theme unless the actual logo already has it.
- **Photography:** Use real, believable photography — a clean car, a driver helping a passenger, a small-town street in winter — over illustrations. Since no real Stallion photos are supplied yet, use **free stock images from Unsplash, Pexels, and other free stock libraries** (see the Images section below). Do NOT use AI-generated-looking illustrations, cartoon cars, or generic "taxi" clip-art.
- **Copy tone:** Plain, local, Saskatchewan English. Short sentences. No hype. Say what the service does, where it goes, and how to book. No "Welcome to Stallion Taxi!" opener.

### 2. Hard rule: DO NOT make it look like an AI-generated website

This is the most important design rule. Reject every generic AI-website tell:

**BANNED:**
- Purple, blue, or pink gradients, glowing blobs, or glassmorphism cards
- A centred hero with a big gradient headline, a pill button, and three identical feature cards underneath
- Generic icons in coloured circles, emoji bullets, and stock "seamless / elevate / unlock / experience" copy
- Identical rounded cards, identical spacing, and a layout that could belong to any business
- Fake stats, fake testimonials, fake "500+ happy customers," or fake reviews
- Lorem ipsum anywhere in the final output

**REQUIRED INSTEAD:**
- An editorial, asymmetric layout: a strong left-aligned headline in a condensed or strong serif/sans pairing, a thin gold rule, generous black space, and one clear action
- Real hierarchy: one dominant action per screen (Call Now on mobile, Book a Ride on desktop), everything else secondary
- Texture and restraint: solid black, charcoal panels, hairline gold dividers, off-white text — let type and photography do the work
- Local specificity: Melfort, Saskatchewan place names and real use cases (town rides, medical appointments, airport runs, late-night pickups, out-of-town trips) — only where confirmed, otherwise leave a marked placeholder
- Imperfect, human details: a real phone number in the header, real service hours, a "call for a fare quote" note instead of a fake live price calculator

If a section starts to look like a template, redesign it. I would rather have a simpler, bolder page than a polished generic one.

### 3. Design references — borrow the structure and discipline, do NOT clone the look

Study these before designing, then translate the lessons into Stallion's black-and-gold identity:

1. **Blacklane — https://www.blacklane.com/en/car-service/**
   Take: the frictionless booking journey. Clear vehicle/service choice, transparent pricing language, professional photography, and a booking flow that never makes the user hunt. Do NOT take its blue palette or corporate look.

2. **Subframe — 25 Taxi Website Design Examples — https://www.subframe.com/tips/taxi-website-design-examples**
   Take: dark themes with one bright call-to-action, the booking bar inside the hero (pickup / drop-off / date / time), and real-time tracking cues. Avoid the generic app-screenshot layouts.

3. **WebCitz — 24 Best Limo Websites — https://www.webcitz.com/blog/best-limo-websites/?p=37153**
   Take: Sapphire Limousine's dark palette with restrained yellow/gold accents and badge-style logo treatment, and AGA Limousine's gold accents with simple, visible contact information. Lesson: dark + one metallic accent works when the contact details are impossible to miss.

4. **Táxi Quarteira case study — https://ideiasfrescas.com/en/blog/2025-11-03/how-a-simple-website-can-bring-more-clients-the-taxi-quarteira-case**
   Take: mobile-first, book in three taps, large thumb-friendly buttons, reviews shown as trust, and local SEO for "[service] in [town]" searches. This is the closest model for a small-town taxi: simple beats clever.

5. **Chauffeur booking pattern (LuxRide / Taxi Web Design) — https://www.taxi-webdesign.com/chauffeur-booking-software/**
   Take: the four-step booking flow — Search & Pickup → Choose Vehicle/Service → Confirm → Track/Contact — and fleet/service cards that state passenger and luggage capacity plainly. Do NOT copy a WordPress theme layout.

Synthesis for Stallion: Blacklane's booking clarity + the limo sites' black-and-gold restraint + Quarteira's three-tap mobile booking. Nothing else.

### 4. Pages and sections

Build a one-page site first, with clean anchors, unless the existing project already has a multi-page structure:

1. **Sticky header:** Logo (from the logo folder), phone number as a `tel:` link, and a "Book a Ride" button. On mobile, the phone number must be tappable and always visible.
2. **Hero:** Left-aligned. Headline in the owner's voice, e.g. "A ride in Melfort, when you need one." Subline: local, reliable taxi service in Melfort, SK. Booking bar directly in the hero: Pickup, Drop-off, Date, Time, Passengers, and a "Request Ride" button. A secondary "Call Now" button beside it. No slideshow, no auto-playing video.
3. **How it works (3 steps, in plain words):** 1. Call or request online. 2. We confirm your pickup time. 3. Your driver arrives. No jargon, no "seamless experience."
4. **Services:** Use only the verified Facebook services: rides within Melfort, medical appointments in Prince Albert, Saskatoon, and Regina, transportation to and from Kinistino, Tisdale, and St. Brieux, and full-day bookings. Each service gets one line of plain description and a "Call for a quote" note for out-of-town trips — do not invent flat rates or dollar amounts. Do not add airport transfers, parcels, or errands unless the owner confirms them.
5. **Service area:** Melfort, plus Prince Albert, Saskatoon, and Regina for medical appointments, and Kinistino, Tisdale, and St. Brieux. Naicam is tentative only — confirm with the owner before listing it. For any other town, show "Call to confirm your pickup."
6. **Why Stallion:** Local drivers who know Melfort, clean vehicles, help with luggage and accessibility needs where offered. Keep it to 3–4 short, verifiable claims. No invented claims.
7. **Reviews / trust:** A section ready for real Google reviews, but leave it empty with a clear placeholder if no real reviews are supplied. Never write fake reviews.
8. **Booking / contact section:** Repeat the booking form, plus phone, email (if supplied), hours, and service area. Form fields: name, phone number, pickup, drop-off, date, time, passengers, notes (e.g. wheelchair, luggage, child seat).
9. **Footer:** Logo, phone, hours, service area, and a simple "Taxi service in Melfort, Saskatchewan" line for local search.

### 5. Booking form behaviour — honest, not fake

- Validate phone number, pickup, date, and time before submission.
- On submit, show a clear confirmation state: "Request received — we will call/text you to confirm." Do NOT claim a car is dispatched, show a fake live map, or show a fake ETA unless a real dispatch system is connected.
- If no backend/email is configured yet, wire the form to a clearly marked placeholder (e.g. `TODO: connect form to owner's email/phone`) and make the Call Now path the primary path — the phone number must always work even if the form does not.
- Every form field must be usable with one thumb on a phone. Large inputs, large buttons, no tiny text.

### 5A. Images — free stock from Unsplash, Pexels, and others

- Use **free stock photography from Unsplash, Pexels, and other reputable free stock libraries** for all photography until the owner supplies real Stallion Taxi photos. Only use images that are actually free to use for a commercial business website — check the licence on each source before using it, and do not use watermarked, paid-only, or "free preview" images.
- **What to search for (in this order):** black sedan / clean car at night, taxi driver helping a passenger with luggage, passenger getting into a car, quiet small-town street, prairie highway, and winter road in Saskatchewan / Canada. Pick dark, moody, believable shots that sit naturally on a black-and-gold site — not bright, glossy, or obviously staged corporate stock.
- **What to avoid:** yellow cabs in New York, cartoon or illustrated cars, AI-looking people, images with visible other-company logos or licence plates, and any image that contradicts the verified facts (for example, a luxury limo fleet if Stallion has not confirmed one).
- **How to use them:** Download and host the chosen images locally in the project (do not hotlink to Unsplash/Pexels URLs that can break or change), compress and properly size them for web, give each one descriptive `alt` text, and keep a short `images-credits.md` in the project listing each image, its source, and its photographer/licence — so the owner can swap in real Stallion photos later without hunting.
- If a needed shot cannot be found as good free stock (for example, a true Melfort street shot), use a clearly marked placeholder for that one image only and list it in the final TODOs — do not fill it with a random unrelated photo.

### 6. Tech stack — Tailwind CSS, modern best practices

**Use Tailwind CSS. This is not optional.**

- Build the site with **Tailwind CSS** (installed properly via the Tailwind CLI / PostCSS build — not a CDN script in production, and not hand-written CSS for layout). Put the brand tokens in the Tailwind theme/config, not scattered through the markup: the black, charcoal, gold, and off-white sampled from the logo, plus the two font families.
- Use Tailwind's utility classes for layout, spacing, and responsive design. Do not fight Tailwind with large custom stylesheets, inline styles everywhere, or a second CSS framework.
- **Responsive, mobile-first, beautifully done:** Design mobile first, then scale up with Tailwind's `sm:`, `md:`, and `lg:` breakpoints. The site must look intentional at 360px, 768px, and 1280px — not just "not broken." Test the hero booking bar, sticky Call button, navigation, and form at each width. Touch targets at least 44px, no horizontal scrolling, no text clipped by the gold-on-black palette.
- **Modern best practices:**
  - Semantic HTML5: `header`, `main`, `section`, `footer`, proper heading order (`h1` once, then `h2`/`h3`), real `<label>` elements, and real `<button>` / `<a>` elements — no divs pretending to be buttons.
  - Clean, component-style structure: reusable header, booking form, service card, and footer pieces, not one giant copy-pasted file.
  - Performance: optimised, properly sized images with `alt` text, lazy-loading below the fold, no heavy JavaScript, no unused libraries. Aim for a Lighthouse performance score above 90 on mobile.
  - Accessibility: gold-on-black text must pass contrast checks, visible focus states, keyboard-navigable booking form, and `aria` labels where a control needs one.
  - SEO for a local business: page title like "Stallion Taxi — Taxi Service in Melfort, SK", meta description, `LocalBusiness` / `Taxi` schema markup, Melfort, Saskatchewan in headings and copy naturally, and a Google Business Profile link placeholder if supplied.
  - Clean code: consistent formatting, no dead code, no placeholder comments left in production, and a short README explaining how to run the Tailwind build and update the business details.
- Use one strong display font paired with one clean body font. No more than two font families.
- Keep all business facts in one easy-to-edit place at the top of the code or in a config file: phone, email, hours, service area, and services — so the owner can update them without hunting through markup.
- The result must feel modern and polished, but still follow section 2: modern does NOT mean generic. A beautiful Tailwind site with an editorial layout, real hierarchy, and restrained gold is the goal — not a Tailwind template.

### 7. DO NOT invent business facts — placeholders required

**Do not invent, guess, or fill in any of the following.** If a fact is not in this project folder or supplied by the owner, use a visible `[TODO: confirm with owner — ...]` placeholder and list every placeholder at the end of your output:

- Website domain (none was shown on Facebook) and street address (only Melfort, S0E1A0 was shown)
- Confirmation that the 6:00 a.m. to 1:00 a.m., seven-days-a-week hours are still current after the October 27, 2026 launch
- Dollar fares, flat rates, or minimum charges — Facebook only says within-city per city bylaws and out-of-town fixed pricing, with no amounts
- Whether Naicam is a confirmed pickup town
- Fleet size, vehicle models, or accessibility features
- Reviews, ratings, or years in business — Facebook showed 0 reviews on October 25, 2026, so do not invent any

The following are now VERIFIED from Facebook and must NOT be left as placeholders: phone (306) 920-9896, email stalliontaxi@outlook.com, Melfort location, the services and towns listed above, and the "PREMIUM RIDE AT A STANDARD PRICE" tagline.

Before finishing, print a short checklist of every TODO placeholder so the owner can fill them in one pass.

### 8. Deliverable and final check

1. Build the site in this project folder, using the logo from the logo folder and the black-and-gold palette sampled from it.
2. Run the Tailwind build and the site preview and fix any errors. Do not report success if the Tailwind build fails.
3. Test the responsive view yourself at mobile, tablet, and desktop widths: hero booking bar, sticky Call button, and form must all work on a narrow phone screen.
4. Final reply must include: what you built, where the logo/palette came from, the reference lessons you applied, and the full TODO list of unconfirmed business facts.
5. If anything in this prompt conflicts with what is actually in the project folder (for example, a different logo or an existing stack), flag the conflict and follow the project folder, then tell me what you changed and why.

# Airpiphyte SG

Marketing site for a Singapore terrarium and plant workshop studio.
**Four workshops: sealed, open, potted, bound.**

Next.js 16 (App Router) · Tailwind v4 · TypeScript · fully static, no backend.

---

## The one thing you must change before launch

Open [`lib/site.ts`](lib/site.ts) and replace:

```ts
export const WHATSAPP_NUMBER = "65XXXXXXXX";
```

with the real WhatsApp Business number in international format, digits only, no `+` and no
spaces — e.g. `"6591234567"`.

**Nothing else needs to change.** Every enquiry CTA on the site routes through this constant.
While it still contains an `X`, `isEnquiryLive` is false and every button silently falls back
to `mailto:` carrying the same prefilled message, so the site never ships a dead `wa.me`
link. Replace the number and all of them switch to WhatsApp at once.

---

## Run it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build — all 9 routes prerender static
npm start
```

Node 20+. No environment variables, no database, no API keys — see *Why there is no backend*
below.

---

## What is where

```
app/
  page.tsx                  Home
  workshops/[slug]/page.tsx One template, four routes
  private/page.tsx          Group & corporate — the highest-value enquiry
  shop/page.tsx             Showcase + gift voucher (no cart)
  care/page.tsx             Four anchored care guides — the SEO surface
  about/page.tsx            The maker, the review proof, the reply promise
  globals.css               Every design token, as Tailwind v4 @theme

lib/
  site.ts                   WhatsApp number, enquiry messages, link helpers
  content.ts                Workshops, plants, care copy, group figures

components/
  ui.tsx                    Button, EnquiryButton, StatTile, ImageSlot, Ph
  chrome.tsx                Header, Footer, MobileCta
  workshop-card.tsx         Price + duration on the card face (a binding rule)
  arranging.tsx             Replaces a date list — see below
  icons.tsx                 Four vessel icons, the Rosette A logo
  motion/
    use-scroll-driver.ts    ONE shared rAF loop for the whole page
    jar-fill.tsx            The signature set-piece — no animation library
    plant-index.tsx         Blur crossfade; the only stateful set-piece
```

## Editing content

All copy lives in [`lib/content.ts`](lib/content.ts) as typed data. There is no CMS: six page
types and four workshops do not justify one, and there is no schedule to keep current.

Every invented figure is marked `placeholder: true` and rendered with a dotted underline by
the `<Ph>` component, so unconfirmed numbers are visible on the page rather than hidden in a
spreadsheet. Search for `placeholder: true` to find them all.

Still invented: prices, durations, capacities, typical notice period, group size bands, the
per-head rate and the voucher turnaround.

## Why there is no booking, and no schedule

Both were removed by client decision, and the code reflects that deliberately.

**No booking.** The site takes no payments and holds no inventory. Enquiries arrive by
WhatsApp and email, so there is no server, no database, no Stripe and no transactional email.
This is why it deploys as pure static output.

**No schedule.** The studio runs no fixed sessions. There is no date list, no calendar and no
availability state anywhere — a visitor names a day and a session is arranged around them.
The `ArrangingBlock` component does the job a date list used to: sessions on request, typical
notice, people per session, session length.

Two consequences worth knowing before "improving" anything:

- Workshop pages use `Service` structured data, **not** `Event`. `Event` requires a
  `startDate`, and inventing one to win a rich search result would misrepresent a session that
  does not exist.
- The `bract` chartreuse in the palette is a **graphic accent only** — technique numbers and
  the logo crossbar. It was once an availability signal; do not reintroduce a schedule or a
  seat count to justify it.

## Motion

Five set-pieces were designed; two ship so far — the jar fill and the plant index. All motion
runs off a single `requestAnimationFrame` loop behind one passive scroll listener
([`use-scroll-driver.ts`](components/motion/use-scroll-driver.ts)). React state is never
touched during scroll, so nothing re-renders per frame.

Rules that are binding, not stylistic:

- Only `transform` and `opacity` animate. Never `height`, `width`, `margin` or `padding`.
- Nothing in the UI exceeds 400ms. `ease-in` and the CSS default `ease` are banned.
- **The enquiry path is never animated.** Every WhatsApp button and arranging block renders
  visible on first paint — a CTA that fades in is one a fast scroller missed, and unlike a
  checkout there is no second step to recover them at.
- `prefers-reduced-motion` collapses every pinned section to normal flow. Every fallback is
  CSS, so nothing depends on JavaScript having run.

## Accessibility

WCAG 2.1 AA. Every colour pair in the palette was measured, not assumed — the ratios are
documented in `globals.css` beside each token. Two results worth carrying:

- `--color-line` (1.19:1) is decorative only and **must never bound an interactive control**.
  Controls use `--color-line-control` (3.11:1), which clears WCAG 1.4.11.
- `--color-bract` (1.94:1) fails as text by design. It is valid as a *fill* — ink on bract
  measures 7.64:1.

Verified in-browser across 21 page-width combinations: no horizontal overflow, one `h1` per
page, all targets ≥ 44px, no unnamed links, zero console errors. See `../../07-qa/qa-report.md`.

## Design source

This app was built from the project's own design artefacts, not from a screenshot:

- `../../03-design-system/tokens.json` — every token in `globals.css`
- `../../04-figma/screens.html` — the nine screens
- `../../04-figma/motion.html` — the five set-pieces and their component contracts
- `../../05-review/audit.md` — the review this build already incorporates

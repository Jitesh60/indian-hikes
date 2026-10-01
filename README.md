# Indiahikes — concept redesign

A front-end redesign of a Himalayan trekking company's website, plus an admin
panel mockup. Next.js 16 (App Router), React 19, TypeScript, Tailwind v4.

Everything runs on mock data held in `src/data`. There is no backend, no
payment provider and no database — forms validate and respond, but nothing is
sent anywhere.

## Running it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npx eslint src  # lint
```

## The design idea

The public site is built from three references: a **bento dashboard** (rounded
white and near-black tiles, frosted glass laid over photos, compact stat
blocks), a **national-park site** (an immersive night-sky hero, stats over a
landscape, alternating photo/text rows, a dark section with a rotating text
ring) and an **outdoor store** (icy-blue panels, bold sans headings, image
category tiles, a brush-stroke promo banner, blog cards, a newsletter strip).

- **Tokens** live in `src/app/globals.css`: `mist` (page and surfaces), `ink`
  (text and dark tiles), `ember` (the single warm accent — the glow of a lit
  tent), `sun` (promo highlight only), `ice` and `pine`. Utilities: `.glass`,
  `.glass-dark`, `.glass-light`, `.shadow-soft`, `.scrim-b`, `.brush`,
  `rounded-bento` (28px).
- **Type** is Geist throughout, set heavy and tight for display, with tabular
  numerals on every altitude, price and count.
- **Motion** uses [`motion`](https://motion.dev): `Reveal` fades sections in on
  scroll, `Parallax` drifts hero photos, `CountUp` animates stats. All of it
  respects `prefers-reduced-motion`. Carousels use Embla.
- **The navigation** is a floating glass pill that sits clear over photo heroes
  and turns to light glass once you scroll.
- **Altitude still matters**: the home page lets you pick treks by altitude
  band, and every trek keeps its altitude profile.

### Photography

Photos are free Unsplash images, listed by Unsplash id in
`src/data/photos.ts` and loaded straight from Unsplash in the browser. To change
a picture, change its id there — nothing else knows where images come from.
`trekPhotos` maps each trek to a cover and a small gallery.

`<Photo>` (`src/components/site/Photo.tsx`) draws generated ridge artwork
underneath every photo, so a slot is never empty: the artwork shows while the
image loads and stays if it can't be fetched (offline, or a network that blocks
Unsplash).

The old altitude-band colour tokens (`spruce`, `deodar`, `bugyal`, `glacier`,
`snow`) are kept only for the admin panel, which is unchanged apart from the
typeface.

## Routes

**Site**

| Route | What it does |
| --- | --- |
| `/` | Night-sky hero with trek finder, bento overview, stats, seasonal spotlight, altitude-band carousel, gear tiles, stories |
| `/treks` | Filter by grade, altitude ceiling, length, month, region; register and gallery views |
| `/treks/[slug]` | Altitude profile, day-by-day itinerary, fitness bar, inclusions, live departures |
| `/treks/[slug]/book` | Four-step booking — trekkers, add-ons, health declaration, review and pay |
| `/departures` | Month-by-month calendar across all treks, with filters |
| `/stories`, `/stories/[slug]` | Editorial |
| `/green-trails` | Waste recovery programme, with the numbers |
| `/account` | Trekker dashboard — upcoming, fitness, documents, saved |
| `/login` | Passwordless sign-in |
| `/about` `/contact` `/fitness` `/safety` `/gear` `/policy` `/faq` `/careers` | Supporting content |

**Admin** (`/admin`)

Dashboard with season charts and an attention queue; treks list and a
five-tab trek editor; departures with a scheduling modal; bookings with a
detail drawer; trekkers; trek leaders; Green Trails waste logging; stories;
and settings. Sortable, searchable, paginated tables throughout.

## Structure

```
src/
  app/            routes
  components/
    site/         public site components
    admin/        admin shell, data table, charts
    home/         home page pieces — finder, compass, trek rail, text ring
    viz/          altitude profile, generated ridge art (photo fallback)
  data/           treks, departures, stories, photos, admin mock data
  lib/types.ts    domain types, altitude bands, formatting
```

Departures, bookings and waste logs are generated deterministically from seeds,
so the site, the booking flow and the admin panel always agree on the same
numbers. The dataset is pinned to a fixed reference date (`TODAY` in
`src/lib/types.ts`) so nothing drifts or mismatches on hydration.

## Notes

This is a design concept, not an affiliated or official product. All copy and
data were written for this project; photography is from Unsplash under the
Unsplash License.

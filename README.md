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

The organising principle is **altitude**. Everything in trekking is vertical —
tree line, snow line, day-by-day ascent, acclimatisation — so elevation drives
the design system rather than decorating it:

- **Colour is mapped to altitude bands.** Deodar green at the bottom, meadow
  gold in the middle, glacier blue at the snowline. `band()` in `src/lib/types.ts`
  is the single source of truth, used by the charts, the itinerary markers and
  the homepage ladder.
- **The hero is a ridge where every peak is a real trek**, placed on the vertical
  axis at its true maximum altitude. Hover, focus or tap a peak to read it.
- **Trek listings are a field register**, not a grid of identical cards — one row
  per trek with an inline altitude sparkline. A gallery view is available too.
- **Every trek is introduced by its altitude profile**, drawn from the real
  campsite heights in its itinerary.

Type is Fraunces (variable, with its SOFT and WONK axes dialled in) for display
and Archivo for UI, with tabular numerals on every altitude, price and count.

Imagery is generated, not photographic: `RidgeArt` draws layered ridge
silhouettes deterministically from a trek's slug, so the same trek always looks
the same on the server and the client.

## Routes

**Site**

| Route | What it does |
| --- | --- |
| `/` | Interactive ridge hero, altitude ladder, live departure strip |
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
    viz/          altitude profile, ridge hero, generated ridge art
  data/           treks, departures, stories, admin mock data
  lib/types.ts    domain types, altitude bands, formatting
```

Departures, bookings and waste logs are generated deterministically from seeds,
so the site, the booking flow and the admin panel always agree on the same
numbers. The dataset is pinned to a fixed reference date (`TODAY` in
`src/lib/types.ts`) so nothing drifts or mismatches on hydration.

## Notes

This is a design concept, not an affiliated or official product. All copy,
data and artwork in it were written and generated for this project.

# HeyHikers — website redesign

A redesign of the [HeyHikers](https://heyhikers.com) website — a Dehradun-based
company running guided Himalayan treks — plus an admin panel mockup.
Next.js 16 (App Router), React 19, TypeScript, Tailwind v4.

Company facts (story, founders, stats, promises, testimonials, contact
details) live in `src/data/brand.ts`, taken from heyhikers.com. Everything the
site says about the company reads from there.

The site lists 20 of HeyHikers' routes (they advertise 47+), with real route
geography. Treks, departures and bookings are still mock data in `src/data`.
There is no backend, no payment provider and no database — forms validate and
respond, but nothing is sent anywhere. Per-trek prices (other than the
₹7,499 starting price), ratings, departure dates and slot counts are
placeholders to replace with the real figures.

## Running it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npx eslint src  # lint
```

## The design idea

The home page follows two references: a bright, airy travel landing page (a
hiker photo with a left-aligned headline ending in a serif-italic accent word,
a white search pill, a handwritten note, a feature row and a popular-treks
photo grid) and an adventure landing page (a giant word set into the
landscape, with torn-paper edges). The rest of the site uses a bento/glass
system: rounded white and near-black tiles, frosted glass over photos, pill
controls.

- **Tokens** live in `src/app/globals.css`: `mist` (page and surfaces), `ink`
  (text and dark tiles), `forest` (the brand green — buttons, active states,
  highlights), `ember` (warnings only: hard grades, last few slots, full
  departures), `sun` (promo highlight only), `ice` and `pine`. Utilities: `.glass`,
  `.glass-dark`, `.glass-light`, `.shadow-soft`, `.scrim-b`, `.brush`,
  `rounded-bento` (28px).
- **Type** is Geist for UI and headlines, Instrument Serif for editorial
  section titles and accent words, and Caveat for handwritten notes, with
  tabular numerals on every altitude, price and count.
- **Motion** comes from real component libraries, vendored into
  `src/components/fx/` with their sources and licenses noted in each file
  (see `src/components/fx/README.md`):
  - [React Bits](https://github.com/DavidHDev/react-bits): BlurText headline
    reveals, CountUp stats, ScrollVelocity type bands, Magnet CTAs, and more.
  - [Magic UI](https://github.com/magicuidesign/magicui): Marquee route strip,
    NumberTicker, BlurFade grids, BorderBeam cards, ShimmerButton, Meteors,
    AnimatedList booking feed.
  - [Uiverse](https://github.com/uiverse-io/galaxy): ArrowButton, the rotating
    "scroll to explore" seal, and the compass loader shown while routes load.
  - Plus small helpers in `src/components/site/motion.tsx` (Reveal, Parallax,
    Float) on [`motion`](https://motion.dev), and Embla for carousels.
  - Everything respects `prefers-reduced-motion` and renders on the server
    without hydration differences.
- **The navigation** is a floating glass pill that sits clear over photo heroes
  and turns to light glass once you scroll.
- **Altitude still matters**: the home page lets you pick treks by altitude
  band, and every trek keeps its altitude profile.

### Photography

Every photo is a real photograph from the open
[Unsplash Lite dataset](https://github.com/unsplash/datasets) (Unsplash
License), served from Unsplash's image CDN with responsive `srcset`s. Where
the dataset has them, they are from the Indian and Nepal Himalaya —
Gangotri, Manali, Tosh, Spiti, Ladakh, Dzukou, Annapurna, Everest.
Photographers are credited on `/credits`.

`src/data/photos.ts` holds each photo's CDN URL, alt text, photographer and a
tiny preview decoded from its BlurHash. `<Photo>` shows that softened preview
while the full image loads, so a slot is never empty. `trekPhotos` maps each
trek to a cover and a small gallery. To change a picture, change its entry —
nothing else knows where images come from.

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
| `/account` | Trekker dashboard — upcoming, fitness, documents, saved |
| `/login` | Passwordless sign-in |
| `/custom-treks` | Customised treks for schools, companies and solo travellers; women-only batches |
| `/about` `/contact` `/fitness` `/safety` `/gear` `/policy` `/faq` `/careers` | Supporting content |
| `/credits` | Photographer credits |

**Admin** (`/admin`)

Dashboard with season charts and an attention queue; treks list and a
five-tab trek editor; departures with a scheduling modal; bookings with a
detail drawer; trekkers; trek leaders; trail clean-up logging; stories;
and settings. Sortable, searchable, paginated tables throughout.

## Structure

```
src/
  app/            routes
  components/
    site/         public site components
    admin/        admin shell, data table, charts
    home/         home page pieces — finder, compass, trek rail, text ring
    fx/           vendored animation components (React Bits, Magic UI, Uiverse)
    viz/          altitude profile and sparkline
  data/           treks, departures, stories, photos, admin mock data
  lib/types.ts    domain types, altitude bands, formatting
```

Departures, bookings and waste logs are generated deterministically from seeds,
so the site, the booking flow and the admin panel always agree on the same
numbers. The dataset is pinned to a fixed reference date (`TODAY` in
`src/lib/types.ts`) so nothing drifts or mismatches on hydration.

## Notes

Company copy, testimonials and cancellation terms are from heyhikers.com. Photography is from Unsplash under the
Unsplash License, credited on `/credits`.

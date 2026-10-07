# Health Reminder

A small installable web app (PWA) for medicine and meal reminders. It's separate
from the HeyHikers site, has no dependencies or build step, and keeps all data on
the device in `localStorage`.

## What it does

**Medicines**
- Name, dose, notes.
- Every day or **weekly** on chosen days (e.g. Vitamin D3 every Wed and Sat).
- Before meal / with meal / after meal / empty stomach / any time.
- Times either **linked to your meals** (e.g. "30 min after breakfast and dinner";
  change the meal time and the dose moves with it) or set on the clock, 1–6 times a day.
- Duration: start date plus N days / weeks / months, or ongoing. Shows "Day 3 of 7",
  flags the last day, and stops reminding when the course ends.
- Weekly medicines can also give an evening-before heads-up.

**Meals** — five daily meal times with a high-protein, high-fibre, low-carb, low-fat
plan (Indian-kitchen ideas, editable, "Suggest another" cycles options) and diet rules.

**Today** — timeline of every dose and meal with Due / Missed / Taken states,
progress ring, next-up card, and upcoming weekly doses.

**Alerts** — a system notification (with *Mark taken* / *Snooze 10 min* buttons),
an in-app alert card, a chime and vibration at each dose and meal.

## About alerts when the app is closed

Browsers pause web apps in the background, and there is no web API to schedule a
notification for later without a push server. So in-app alerts fire while the app
is open or recently used. For alarms that always ring, use **Settings → Add to
phone calendar**: it downloads an `.ics` file with every dose and meal as repeating
events (daily, or weekly on your chosen days, ending with the course) plus alarms,
including the evening-before alarm for weekly medicines. Re-download after you change things.

## Run it

```bash
npx serve health-reminder        # or: python3 -m http.server -d health-reminder
```

Open the printed `localhost` URL. Notifications and the service worker need
`localhost` or HTTPS, so for phone use deploy the folder to any static host
(Netlify drop, GitHub Pages, Vercel) and then "Add to Home screen". On iPhone,
alerts need iOS 16.4+ and the app opened from the home screen.

## Files

- `index.html` — shell and the add/edit medicine form
- `app.js` — state, schedule logic, alerts, views, calendar export
- `styles.css` — light/dark theme
- `sw.js` — offline cache and notification button handling
- `manifest.webmanifest`, `icon.svg` — install metadata

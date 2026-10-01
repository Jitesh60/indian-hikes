# fx: vendored animation components

These components were copied from open-source libraries, adapted to this project, and typed. Each file starts with a header comment that names its source file, its license and every change made to it.

## Setup

- **Keyframes:** import `fx.css` once, globally. In `src/app/globals.css`, add `@import "../components/fx/fx.css";` after `@import "tailwindcss";`. The file is plain CSS with no Tailwind directives, so a page can also import it directly.
- **Imports:** use `import { BlurText, Marquee } from "@/components/fx";`.
- **Dependencies:**
  - `motion` (already installed; import from `motion/react`).
  - `clsx` and `tailwind-merge`, used by `cn.ts` so a caller's `className` can override a component's default classes.
  - `ogl`, used only by `Galaxy`.
- **Shared rules:**
  - Every component is SSR-safe: nothing touches `window` during render.
  - Every component respects `prefers-reduced-motion`. The JS side reads it through `usePrefersReducedMotion()`, which is hydration-safe. The CSS side uses the media query in `fx.css`.
  - Decorative layers are `aria-hidden`.
  - Text stays real text. When text is split into animated letters or words, the full string is also rendered once as `sr-only`.

## Licenses

| Library | Repo | License |
|---|---|---|
| React Bits | https://github.com/DavidHDev/react-bits | **MIT + Commons Clause** (c) David Haz. You may use it in an app or website, including commercially. You may not sell, sublicense or redistribute the components themselves, alone or as a bundle. |
| Magic UI | https://github.com/magicuidesign/magicui | MIT (c) Magic UI |
| Uiverse.io (galaxy) | https://github.com/uiverse-io/galaxy | MIT (c) 2023 Uiverse.io. Each element's author is credited in its file header. |
| ogl (dependency) | https://github.com/oframe/ogl | Unlicense |

## Components

### React Bits (MIT + Commons Clause)

| Component | Use it for | Key props | Example |
|---|---|---|---|
| `BlurText` | Headline reveal: words blur and slide in when scrolled into view | `text`, `as`, `animateBy` ("words" \| "letters"), `direction`, `delay` (ms stagger), `stepDuration` | `<BlurText as="h1" text="Walk into the Himalaya" className="text-6xl" />` |
| `RotatingText` | A word inside a sentence that cycles with a per-letter spring. It pauses on hover or focus. | `texts`, `rotationInterval` (ms), `staggerDuration`, `staggerFrom`, `splitBy`, `mainClassName`, `splitLevelClassName`; a ref exposes `next`, `previous`, `jumpTo` and `reset` | `<RotatingText texts={["summit","meadows"]} mainClassName="bg-ember-500 px-3 rounded-xl" splitLevelClassName="overflow-hidden" />` |
| `CountUp` | A stat number that springs to its value in view, with `en-IN` grouping | `to`, `from`, `duration`, `delay`, `separator`, `locale`, `prefix`, `suffix`, `startWhen` | `<CountUp to={128000} suffix="+" />` |
| `ShinyText` | A band of light sweeping across text | `text` or `children`, `speed`, `delay`, `color`, `shineColor`, `spread`, `yoyo`, `pauseOnHover` | `<ShinyText text="Small groups. Trained leaders." />` |
| `Magnet` | Magnetic wrapper that pulls a CTA toward the cursor. Fine pointers only. | `padding` (px), `magnetStrength` (higher means weaker), `disabled`, `innerClassName` | `<Magnet><ShimmerButton>Book</ShimmerButton></Magnet>` |
| `SpotlightCard` | Card with a radial light that follows the cursor and lights up on focus | `spotlightColor`, `spotlightSize`, `as`, plus any div props; override classes freely | `<SpotlightCard className="bg-white text-ink-900">…</SpotlightCard>` |
| `TiltedCard` | 3D card that tilts toward the cursor, with a caption tooltip and a raised overlay | `children` (the face, e.g. `<Photo/>`) or `imageSrc` + `altText`, `captionText`, `imageWidth`/`imageHeight`, `containerHeight`, `rotateAmplitude`, `scaleOnHover`, `overlayContent` | `<TiltedCard captionText="Brahmatal" imageWidth="280px" imageHeight="300px"><Photo name="tentMilkyWay" /></TiltedCard>` |
| `ScrollVelocity` | Big type bands that drift and speed up with scroll velocity. Rows alternate direction. | `texts`, `velocity` (px/s), `numCopies`, `scrollerClassName`, `className`, `velocityMapping` | `<ScrollVelocity texts={["Kedarkantha · Hampta Pass ·"]} />` |
| `Galaxy` | WebGL starfield background for the night-sky hero (described in more detail below this table) | `density`, `hueShift`, `saturation`, `glowIntensity`, `twinkleIntensity`, `speed`, `starSpeed`, `rotationSpeed`, `mouseInteraction`, `mouseRepulsion`, `transparent`, `dpr`, `maxFps`, `adaptive` | `<div className="absolute inset-0"><Galaxy hueShift={20} saturation={0.2} /></div>` |

How `Galaxy` behaves:

- It renders only while it is on screen and the tab is visible.
- It is capped at 30 fps.
- If the device can't hold about 12 fps, it freezes to a still frame.
- Under reduced motion it draws one still frame.

### Magic UI (MIT)

| Component | Use it for | Key props | Example |
|---|---|---|---|
| `Marquee` | Infinite row or column of logos, chips or quotes. Only the first copy is exposed to assistive tech; the other copies are `aria-hidden` and `inert`. | `repeat`, `duration` ("40s"), `gap` ("1rem"), `reverse`, `pauseOnHover`, `vertical` | `<Marquee pauseOnHover>{chips}</Marquee>` |
| `NumberTicker` | Number that ticks to its value in view | `value`, `startValue`, `direction`, `delay`, `decimalPlaces`, `locale`, `prefix`, `suffix` | `<NumberTicker value={4.8} decimalPlaces={1} />` |
| `BlurFade` | Fade, blur and offset entrance; good for staggered grids | `delay`, `duration`, `offset`, `direction`, `inView`, `inViewMargin`, `blur`, `as` | `<BlurFade delay={0.1 * i} inView>…</BlurFade>` |
| `BorderBeam` | A light beam that travels around a card's border. Place it as the last child of a `relative`, rounded card. | `size`, `duration`, `delay`, `colorFrom`, `colorTo`, `borderWidth`, `reverse` | `<div className="relative rounded-3xl">…<BorderBeam /></div>` |
| `ShimmerButton` | Dark pill with a spark that sweeps around its border | `href` (renders an `<a>`), `shimmerColor`, `shimmerSize`, `shimmerDuration`, `background`, `borderRadius` | `<ShimmerButton href="/treks">Find your trek</ShimmerButton>` |
| `AnimatedShinyText` | Subtle glide of light across text, for eyebrow pills | `shimmerWidth`, `shimmerColor` (use a dark colour on light backgrounds) | `<AnimatedShinyText>✦ Winter batches open</AnimatedShinyText>` |
| `Meteors` | Shooting stars. Place it inside a `relative overflow-hidden` parent. | `number`, `angle`, `minDuration`/`maxDuration`, `minDelay`/`maxDelay`, `color` | `<Meteors number={12} />` |
| `Dock` / `DockIcon` | Dock whose icons magnify under the cursor. Put a link or button inside each icon. | Dock: `iconSize`, `iconMagnification`, `iconDistance`, `disableMagnification`, `direction` | `<Dock><DockIcon><a href="/treks" aria-label="Treks"><Mountain/></a></DockIcon></Dock>` |
| `AnimatedList` | Items pop in one at a time, newest on top, like a booking feed. Give children stable keys. | `delay` (ms), `loop` | `<AnimatedList delay={1200}>{items}</AnimatedList>` |

### Uiverse.io (MIT; author credited in each file)

| Component | Original element | Key props | Example |
|---|---|---|---|
| `ArrowButton` | `Buttons/gharsh11032000_loud-chicken-53.html` by **gharsh11032000**. An outlined pill; on hover or focus an ember fill floods it and the arrows swap. | `href`, `accent`, `onAccent`, plus button/anchor props | `<ArrowButton href="/treks">Explore treks</ArrowButton>` |
| `CircularTextButton` | `Buttons/Creatlydev_fresh-goose-83.html` by **Creatlydev**. Label rotates around the rim and the arrow swaps on hover. | `text`, `label` (accessible name), `size`, `speed`, `href` | `<CircularTextButton text="Explore · the · Himalaya · " href="#treks" />` |
| `CompassLoader` | `loaders/Nawsome_ancient-yak-42.html` by **Nawsome**. Compass loader with `role="status"`. | `size`, `tone` ("dark" \| "light"), `label`, `speed` | `<CompassLoader tone="light" size={64} />` |
| `GlassCard` | `Cards/G4b413l_good-crab-75.html` by **G4b413l**. Frosted glass with bobbing ember orbs behind it. | `tone`, `orbColors`, `orbSize`, `innerClassName` | `<GlassCard className="m-6"><h3>Night camp</h3></GlassCard>` |

## Helpers

- `cn(...classes)`: clsx combined with tailwind-merge.
- `usePrefersReducedMotion()`: returns `false` on the server and on the first client render, then the live media-query value.

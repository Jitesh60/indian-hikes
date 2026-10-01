import Link from "next/link";
import {
  ArrowUpRight,
  ArrowRight,
  MapPin,
  Tent,
  Wind,
  Thermometer,
  Radio,
  Play,
  Leaf,
  ShieldCheck,
  Backpack,
  Footprints,
  Shirt,
  Mountain,
  Quote,
} from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Photo } from "@/components/site/Photo";
import { Reveal, Parallax, Float } from "@/components/site/motion";
import {
  AnimatedList,
  AnimatedShinyText,
  ArrowButton,
  BlurText,
  BorderBeam,
  CircularTextButton,
  CountUp,
  Magnet,
  Marquee,
  Meteors,
  NumberTicker,
  ScrollVelocity,
  ShimmerButton,
} from "@/components/fx";
import { Button, Eyebrow, SectionHead, Stars, Avatar, DifficultyMeter, Pill } from "@/components/site/ui";
import { HeroFinder } from "@/components/home/HeroFinder";
import { Compass } from "@/components/home/Compass";
import { CircleText } from "@/components/home/CircleText";
import { TrekRail } from "@/components/home/TrekRail";
import { treks, departures, trekBySlug, departuresFor } from "@/data/treks";
import { stories } from "@/data/stories";
import { leaders, bookings } from "@/data/admin";
import { trekCover, trekPhotos, type PhotoKey } from "@/data/photos";
import { inr, daysUntil } from "@/lib/types";

const fmt = (iso: string) =>
  new Date(iso + "T00:00:00Z").toLocaleDateString("en-GB", { day: "numeric", month: "short", timeZone: "UTC" });

const STORY_PHOTO: Record<string, PhotoKey> = {
  "what-12000-feet-does-to-you": "snowTrekkers",
  "ninety-one-kilos-of-waste": "windingRoad",
  "i-turned-back-at-the-pass": "snowRange2",
  "reading-a-himalayan-weather-window": "silhouette",
  "what-actually-goes-in-the-backpack": "gearFlatlay",
  "the-village-at-the-start-of-the-trail": "grazing",
};

/** A falling rhododendron petal, drawn — the floating leaf from the park reference. */
function Petal({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 40" className={className} aria-hidden="true">
      <path d="M2 30 C 14 4, 44 0, 58 8 C 44 22, 22 38, 2 30 Z" fill="#ff8a52" />
      <path d="M4 29 C 22 22, 38 14, 56 9" stroke="#e5531a" strokeWidth="1.2" fill="none" />
    </svg>
  );
}

export default function HomePage() {
  const open = departures.filter((d) => d.status !== "full");
  const next = open[0];
  const nextTrek = trekBySlug(next.trek)!;
  const totalSlots = departures.reduce((s, d) => s + (d.capacity - d.booked), 0);
  const minPrice = Math.min(...treks.map((t) => t.price));

  const kgl = trekBySlug("kashmir-great-lakes")!;
  const kk = trekBySlug("kedarkantha")!;
  const kkDep = departuresFor("kedarkantha").find((d) => d.status !== "full")!;
  const deoria = trekBySlug("deoriatal-chandrashila")!;
  const goechala = trekBySlug("goechala")!;
  const nima = leaders.find((l) => l.name === "Nima Lepcha")!;
  const spotlight = [kk, kgl, trekBySlug("sandakphu-phalut")!];
  const justBooked = bookings.filter((b) => b.status === "confirmed").slice(0, 8);

  return (
    <>
      <SiteHeader variant="dark" />

      <main>
        {/* ── 1. Hero: a lit tent under the stars ─────────────────────── */}
        <section className="px-3 pt-3 sm:px-5 sm:pt-4">
          <div className="relative mx-auto flex min-h-[calc(100svh-24px)] max-w-[1320px] flex-col overflow-hidden rounded-bento bg-ink-950 text-white sm:min-h-[760px] lg:min-h-[calc(100svh-32px)]">
            <Parallax distance={60} className="absolute inset-0">
              <Photo name="tentMilkyWay" width={2400} priority imgClassName="scale-[1.04]" />
            </Parallax>
            <div className="absolute inset-0 bg-gradient-to-b from-ink-950/55 via-ink-950/10 to-ink-950/85" aria-hidden="true" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-2/3 overflow-hidden" aria-hidden="true">
              <Meteors number={9} minDelay={1} maxDelay={9} minDuration={4} maxDuration={10} />
            </div>

            <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-5 pb-10 pt-32 text-center sm:pt-36">
              <Reveal>
                <span className="glass inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[13px]">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ember-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-ember-500" />
                  </span>
                  <AnimatedShinyText shimmerColor="rgba(255,255,255,0.95)" className="text-white/75">
                    Departures open through November 2027
                  </AnimatedShinyText>
                </span>
              </Reveal>
              <BlurText
                as="h1"
                text="Your Himalaya begins here."
                delay={110}
                className="font-display mx-auto mt-6 max-w-[14ch] justify-center text-[clamp(2.8rem,8vw,6.2rem)] leading-[0.95] tracking-[-0.045em]"
              />
              <Reveal delay={0.16}>
                <p className="mx-auto mt-6 max-w-[46ch] text-[16.5px] leading-relaxed text-white/75 sm:text-[18px]">
                  {treks.length} routes across five states, walked in small groups with a trek leader
                  who checks your oxygen every morning and every night.
                </p>
              </Reveal>
              <Reveal delay={0.24} className="mt-9 w-full flex justify-center">
                <HeroFinder />
              </Reveal>
              <Reveal delay={0.3}>
                <p className="mt-5 text-[13.5px] text-white/60">
                  Starting at <span className="nums font-semibold text-white">{inr(minPrice)}</span> / person ·{" "}
                  <span className="nums">{totalSlots.toLocaleString("en-IN")}</span> slots open
                </p>
              </Reveal>
            </div>

            {/* bottom glass row */}
            <div className="relative z-10 grid gap-3 px-3 pb-3 sm:grid-cols-[1fr_auto_1fr] sm:items-end sm:px-5 sm:pb-5">
              <Link
                href={`/treks/${nextTrek.slug}`}
                className="glass group flex items-center gap-3 rounded-[22px] p-2.5 pr-4 transition-colors hover:bg-white/20 sm:max-w-[340px]"
              >
                <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl">
                  <Photo name={trekCover(nextTrek.slug)} width={200} alt="" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[11.5px] uppercase tracking-[0.12em] text-white/55">Leaving next</span>
                  <span className="block truncate text-[15px] font-medium">{nextTrek.name}</span>
                  <span className="nums block text-[12.5px] text-white/65">
                    {fmt(next.start)} · {next.capacity - next.booked} slots left
                  </span>
                </span>
                <ArrowUpRight size={18} className="shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>

              <div className="hidden justify-center sm:flex">
                <CircularTextButton
                  href="#explore"
                  text="SCROLL · TO · EXPLORE · "
                  label="Scroll to explore"
                  size={92}
                  speed={14}
                />
              </div>

              <Link
                href="/treks"
                className="glass hidden items-center gap-3 justify-self-end rounded-[22px] p-2.5 pl-4 transition-colors hover:bg-white/20 sm:flex"
              >
                <span>
                  <span className="block text-[11.5px] uppercase tracking-[0.12em] text-white/55">Explore</span>
                  <span className="block text-[15px] font-medium">{treks.length} Himalayan routes</span>
                </span>
                <span className="flex -space-x-3">
                  {(["alpineLake", "flowerMeadow", "whitePeak"] as PhotoKey[]).map((k) => (
                    <span key={k} className="relative h-12 w-12 overflow-hidden rounded-full ring-2 ring-white/40">
                      <Photo name={k} width={160} alt="" />
                    </span>
                  ))}
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* ── Route strip ─────────────────────────────────────────────── */}
        <section aria-label="Our routes" className="pt-10 sm:pt-14">
          <Marquee pauseOnHover duration="70s" gap="0.75rem" className="[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
            {treks.map((t) => (
              <Link
                key={t.slug}
                href={`/treks/${t.slug}`}
                className="group inline-flex shrink-0 items-center gap-3 rounded-full bg-white py-1.5 pl-1.5 pr-5 shadow-soft transition-shadow hover:shadow-[0_14px_30px_-16px_rgb(16_24_40/0.35)]"
              >
                <span className="relative h-10 w-10 overflow-hidden rounded-full">
                  <Photo name={trekCover(t.slug)} width={120} alt="" />
                </span>
                <span>
                  <span className="block text-[14px] font-medium text-ink-900">{t.name}</span>
                  <span className="nums block text-[12px] text-ink-400">
                    {t.maxAltFt.toLocaleString("en-IN")} ft · {t.state}
                  </span>
                </span>
              </Link>
            ))}
          </Marquee>
        </section>

        {/* ── 2. Bento: the whole product on one screen ───────────────── */}
        <section id="explore" className="scroll-mt-24 px-3 pb-20 pt-16 sm:px-5 sm:pb-28 sm:pt-20">
          <div className="mx-auto max-w-[1320px]">
            <Reveal>
              <SectionHead
                eyebrow="Plan, pack, walk"
                title="Everything a trek needs, in one place"
                intro="Routes, dates, the people leading them and the conditions on the trail — so you can decide with the full picture."
                action={{ href: "/treks", label: "Browse all treks" }}
              />
            </Reveal>

            <div className="grid grid-cols-[minmax(0,1fr)] gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)_minmax(0,1fr)]">
              {/* left column */}
              <div className="flex flex-col gap-4">
                <Reveal className="flex flex-1 flex-col rounded-bento bg-white p-6 shadow-soft">
                  <div className="flex items-start justify-between">
                    <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-ember-500/10 text-ember-500">
                      <Tent size={28} strokeWidth={1.6} />
                    </span>
                    <Link href="/about" aria-label="About us" className="text-ink-400 transition-colors hover:text-ink-900">
                      <ArrowUpRight size={18} />
                    </Link>
                  </div>
                  <p className="mt-6 text-[19px] font-medium leading-snug tracking-[-0.01em] text-ink-900">
                    Leave the city and walk into the Himalaya with people who know every campsite by name.
                  </p>
                  <div className="mt-auto pt-7">
                    <p className="mb-3 flex items-center gap-2 text-[12px] uppercase tracking-[0.14em] text-ink-400">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-pine-500" aria-hidden="true" />
                      Recently booked
                    </p>
                    <AnimatedList delay={2200} loop className="h-[168px] items-stretch gap-2 overflow-hidden">
                      {justBooked.map((b) => (
                        <div key={b.id} className="flex items-center gap-2.5 rounded-2xl bg-mist-100 p-2">
                          <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-xl">
                            <Photo name={trekCover(b.trek)} width={100} alt="" />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-[13px] font-medium text-ink-900">
                              {b.trekker.split(" ")[0]} · {b.city}
                            </span>
                            <span className="block truncate text-[12px] text-ink-400">
                              {b.trekName} · {b.people} {b.people === 1 ? "seat" : "seats"}
                            </span>
                          </span>
                        </div>
                      ))}
                    </AnimatedList>
                  </div>
                </Reveal>

                <Reveal delay={0.1} className="rounded-bento bg-white p-3 shadow-soft">
                  <div className="flex gap-3">
                    <div className="flex flex-col items-center justify-between py-1 pl-1">
                      <span className="nums text-[22px] font-semibold leading-none text-ink-900">
                        {String(treks.indexOf(deoria) + 1).padStart(2, "0")}
                        <span className="block text-[12px] font-normal text-ink-400">/{treks.length}</span>
                      </span>
                      <span className="text-[10.5px] uppercase tracking-[0.2em] text-ink-400 [writing-mode:vertical-rl] rotate-180">
                        Featured trek
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="relative aspect-[4/3] overflow-hidden rounded-[20px]">
                        <Photo name={trekCover(deoria.slug)} width={800} />
                        <span className="glass-dark absolute bottom-2 right-2 rounded-full px-2.5 py-1 text-[11.5px] text-white">
                          4 photos
                        </span>
                      </div>
                      <h3 className="mt-3.5 text-[17px] font-semibold tracking-[-0.02em] text-ink-900">{deoria.name}</h3>
                      <div className="mt-1.5">
                        <Stars rating={deoria.rating} reviews={deoria.reviews} />
                      </div>
                      <p className="mt-2 line-clamp-3 text-[13.5px] leading-snug text-ink-500">{deoria.tagline}.</p>
                      <p className="mt-3 text-[13px] text-ink-400">
                        <span className="nums text-[16px] font-semibold text-ink-900">{inr(deoria.price)}</span> / person
                      </p>
                      <Button href={`/treks/${deoria.slug}/book`} variant="outline" className="mt-3 w-full">
                        Book this trek
                      </Button>
                    </div>
                  </div>
                </Reveal>
              </div>

              {/* middle column */}
              <div className="flex flex-col gap-4">
                <Reveal delay={0.05} className="relative min-h-[420px] overflow-hidden rounded-bento text-white lg:min-h-[460px]">
                  <Photo name={trekCover(kgl.slug)} width={1600} />
                  <div className="scrim-t absolute inset-0" aria-hidden="true" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950/50 to-transparent" aria-hidden="true" />
                  <div className="relative flex h-full min-h-[420px] flex-col p-6 lg:min-h-[460px]">
                    <div>
                      <h3 className="font-display text-[30px] leading-[1.02] sm:text-[36px]">{kgl.name}</h3>
                      <p className="mt-2 inline-flex items-center gap-1.5 text-[14px] text-white/85">
                        <MapPin size={14} /> {kgl.region}, {kgl.state}
                      </p>
                    </div>
                    <Link
                      href={`/treks/${kgl.slug}`}
                      className="glass-dark group mt-6 ml-auto w-full max-w-[240px] self-end rounded-[20px] p-3.5 transition-colors hover:bg-ink-900/70 sm:mt-auto sm:mb-4"
                    >
                      <div className="flex items-start justify-between">
                        <span className="relative h-11 w-11 overflow-hidden rounded-xl">
                          <Photo name="alpineLake2" width={160} alt="" />
                        </span>
                        <ArrowUpRight size={16} className="text-white/70" />
                      </div>
                      <p className="mt-3 text-[14px] font-medium">Seven lakes, four passes</p>
                      <p className="mt-1 text-[12.5px] leading-snug text-white/65">
                        Camp beside a different alpine lake almost every night of the week.
                      </p>
                      <span className="mt-3 inline-block rounded-full border border-white/30 px-3 py-1.5 text-[12px] transition-colors group-hover:border-white">
                        See details
                      </span>
                    </Link>
                    <nav
                      aria-label={`${kgl.name} sections`}
                      className="glass-dark no-scrollbar mx-auto mt-4 flex max-w-full gap-1 overflow-x-auto rounded-full p-1 text-[13px]"
                    >
                      {[
                        ["Overview", ""],
                        ["Itinerary", "#itinerary"],
                        ["Departures", "#departures"],
                        ["Fee", "#fee"],
                      ].map(([l, h], i) => (
                        <Link
                          key={l}
                          href={`/treks/${kgl.slug}${h}`}
                          className={`shrink-0 rounded-full px-4 py-2 transition-colors ${
                            i === 0 ? "bg-white/15 text-white" : "text-white/70 hover:text-white"
                          }`}
                        >
                          {l}
                        </Link>
                      ))}
                      <Link href={`/treks/${kgl.slug}/book`} className="shrink-0 rounded-full px-4 py-2 text-sun-300 hover:text-sun-400">
                        Book
                      </Link>
                    </nav>
                  </div>
                </Reveal>

                <Reveal delay={0.1} className="relative overflow-hidden rounded-bento text-white">
                  <Photo name="mistForest" width={1200} alt="" />
                  <div className="absolute inset-0 bg-ink-900/40" aria-hidden="true" />
                  <div className="glass relative m-0 flex flex-wrap items-center gap-x-6 gap-y-4 rounded-bento p-5">
                    <Avatar name={nima.name} size={54} tone="ember" />
                    <div className="min-w-0 flex-1">
                      <p className="text-[16px] font-medium">{nima.name}</p>
                      <p className="text-[13px] text-white/70">
                        Trek leader · {nima.home} · since {nima.since}
                      </p>
                    </div>
                    <dl className="flex gap-5 sm:gap-7">
                      {(
                        [
                          [nima.treksLed, "Treks led", 0],
                          [nima.rating, "Rating", 1],
                          [2026 - nima.since, "Years", 0],
                        ] as const
                      ).map(([v, l, dp]) => (
                        <div key={l} className="text-center">
                          <dt className="sr-only">{l}</dt>
                          <dd className="nums text-[20px] font-semibold leading-none">
                            <NumberTicker value={v} decimalPlaces={dp} className="text-white" />
                          </dd>
                          <dd aria-hidden="true" className="mt-1 text-[11.5px] text-white/60">{l}</dd>
                        </div>
                      ))}
                    </dl>
                    <span className="absolute right-4 top-4 h-2 w-2 rounded-full bg-sun-400" aria-hidden="true" />
                  </div>
                </Reveal>

                <Reveal delay={0.15} className="grid items-center gap-6 rounded-bento bg-ink-900 p-6 text-white sm:grid-cols-[1fr_auto] sm:p-7">
                  <div>
                    <p className="text-[16px] font-medium">Trail conditions · {goechala.name}</p>
                    <p className="nums mt-1 text-[13px] text-white/50">
                      27.47° N, 88.15° E · <span className="text-white/70">Dzongri, 13,024 ft</span>
                    </p>
                    <dl className="mt-6 grid grid-cols-2 gap-5">
                      <div>
                        <dt className="flex items-center gap-1.5 text-[12.5px] text-white/55">
                          <Wind size={14} /> Wind
                        </dt>
                        <dd className="nums mt-1 text-[24px] font-semibold">22 km/h</dd>
                      </div>
                      <div>
                        <dt className="flex items-center gap-1.5 text-[12.5px] text-white/55">
                          <Thermometer size={14} /> Night low
                        </dt>
                        <dd className="nums mt-1 text-[24px] font-semibold">−6 °C</dd>
                      </div>
                    </dl>
                    <div className="mt-6 flex flex-wrap items-center gap-3">
                      <Link
                        href="/safety"
                        className="inline-flex items-center gap-2 rounded-full border border-ember-500/50 px-4 py-2 text-[13.5px] text-ember-300 transition-colors hover:border-ember-400 hover:bg-ember-500/10"
                      >
                        <Radio size={15} /> How we handle emergencies
                      </Link>
                      <span className="text-[12px] text-white/40">Sample radio check, 06:40</span>
                    </div>
                  </div>
                  <div className="mx-auto flex flex-col items-center">
                    <Compass bearing={39} size={180} />
                    <p className="nums mt-1 text-[13px] text-white/60">39° NE</p>
                  </div>
                </Reveal>
              </div>

              {/* right column */}
              <div className="flex flex-col gap-4">
                <Reveal delay={0.1} className="relative min-h-[520px] flex-1 overflow-hidden rounded-bento text-white">
                  <Photo name="hikerPeak" width={1000} />
                  <div className="absolute inset-0 bg-gradient-to-b from-ink-950/70 via-ink-950/10 to-ink-950/90" aria-hidden="true" />
                  <div className="relative flex h-full min-h-[520px] flex-col p-6">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-[20px] font-semibold leading-tight tracking-[-0.02em]">
                        Upcoming departure
                      </h3>
                      <Link href="/departures" aria-label="All departures" className="glass inline-flex h-9 w-9 items-center justify-center rounded-full">
                        <ArrowUpRight size={16} />
                      </Link>
                    </div>
                    <p className="mt-2 text-[13.5px] leading-snug text-white/75">
                      {kk.name} · {fmt(kkDep.start)} – {fmt(kkDep.end)}
                    </p>
                    <div className="mt-5 flex items-center gap-3">
                      <Avatar name={kkDep.leader} size={38} tone="ice" />
                      <div>
                        <p className="text-[14px] font-medium">{kkDep.leader}</p>
                        <p className="text-[12px] text-white/60">Trek leader</p>
                      </div>
                    </div>

                    <dl className="mt-auto grid grid-cols-2 gap-x-4 gap-y-5 pt-10">
                      <div className="col-span-2">
                        <dt className="text-[12.5px] text-white/60">Team members</dt>
                        <dd className="nums mt-1 text-[24px] font-semibold">
                          {kkDep.booked}
                          <span className="text-[15px] font-normal text-white/50"> / {kkDep.capacity}</span>
                        </dd>
                      </div>
                      <div>
                        <dt className="text-[12.5px] text-white/60">Walking distance</dt>
                        <dd className="nums mt-1 text-[22px] font-semibold">{kk.trailKm} km</dd>
                      </div>
                      <div>
                        <dt className="text-[12.5px] text-white/60">Summit</dt>
                        <dd className="nums mt-1 text-[22px] font-semibold">{kk.maxAltFt.toLocaleString("en-IN")} ft</dd>
                      </div>
                    </dl>
                    <Link
                      href={`/treks/${kk.slug}/book`}
                      className="mt-6 inline-flex w-full items-center justify-center rounded-full border border-white/30 py-3 text-[14px] font-medium transition-colors hover:border-white hover:bg-white hover:text-ink-900"
                    >
                      Reserve a spot · {daysUntil(kkDep.start)} days to go
                    </Link>
                  </div>
                  <BorderBeam size={120} duration={9} colorFrom="#ff8a52" colorTo="#ffd84d" borderWidth={1.5} />
                </Reveal>

                <Reveal delay={0.15} className="rounded-bento bg-white p-3 shadow-soft">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-[20px]">
                    <Photo name="woodenHut" width={800} />
                    <span className="glass-dark absolute bottom-2 right-2 rounded-full px-2.5 py-1 text-[11.5px] text-white">
                      Basecamp
                    </span>
                  </div>
                  <div className="px-2 pb-2 pt-4">
                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="text-[16px] font-semibold tracking-[-0.01em] text-ink-900">Homestay before you start</h3>
                      <Pill tone="green">Included</Pill>
                    </div>
                    <p className="mt-2 text-[13.5px] leading-snug text-ink-500">
                      Your first night is in a village home at the road head — a warm meal, a briefing, and a
                      gear check before the climb.
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="flex -space-x-2">
                        {["Asha Pillai", "Rahul Verma", "Zoya Khan"].map((n, i) => (
                          <Avatar key={n} name={n} size={30} tone={(["ember", "ink", "ice"] as const)[i]} />
                        ))}
                      </span>
                      <span className="text-[12.5px] text-ink-400">Sankri · Yuksom · Lohajung</span>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* ── 3. Numbers over a landscape ─────────────────────────────── */}
        <section className="px-3 sm:px-5">
          <div className="relative mx-auto max-w-[1320px] overflow-hidden rounded-bento text-white">
            <Parallax distance={50} className="absolute inset-0">
              <Photo name="rangeSunset" width={2000} alt="" />
            </Parallax>
            <div className="absolute inset-0 bg-gradient-to-r from-ink-950/85 via-ink-950/50 to-ink-950/30" aria-hidden="true" />
            <div className="relative px-6 py-16 sm:px-12 sm:py-24">
              <Reveal>
                <Eyebrow onDark>Since 2008</Eyebrow>
                <p className="mt-4 max-w-[30ch] text-[clamp(1.4rem,2.6vw,2rem)] font-medium leading-snug tracking-[-0.02em]">
                  We walk these trails every season, carry our rubbish down, and turn people around when the mountain
                  says no.
                </p>
              </Reveal>
              <dl className="mt-14 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
                {[
                  { v: treks.length, l: "Himalayan routes", s: "" },
                  { v: departures.length, l: "Departures open", s: "" },
                  { v: 31400, l: "Waste carried down", s: "kg" },
                  { v: 98, l: "Trekkers who'd return", s: "%" },
                ].map((x, i) => (
                  <Reveal key={x.l} delay={i * 0.08}>
                    <dt className="sr-only">{x.l}</dt>
                    <dd className="flex items-baseline gap-1">
                      <CountUp to={x.v} duration={2} className="nums text-[clamp(2.4rem,5vw,3.6rem)] font-semibold leading-none tracking-[-0.04em]" />
                      {x.s && <span className="text-[18px] text-white/70">{x.s}</span>}
                    </dd>
                    <dd aria-hidden="true" className="mt-2 text-[12.5px] uppercase tracking-[0.14em] text-white/60">
                      {x.l}
                    </dd>
                  </Reveal>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* ── 4. Spotlight: alternating photo + story rows ────────────── */}
        <section className="relative overflow-hidden px-3 py-20 sm:px-5 sm:py-28">
          <Float className="absolute left-[4%] top-[22%] hidden w-14 md:block" duration={8}>
            <Petal />
          </Float>
          <Float className="absolute right-[5%] top-[58%] hidden w-10 md:block" duration={9} rotate={-18}>
            <Petal className="opacity-80" />
          </Float>

          <div className="mx-auto max-w-[1100px]">
            <Reveal>
              <SectionHead
                center
                eyebrow="This season"
                title="Three treks worth taking leave for"
                intro="Picked for the months ahead: a winter summit, a week of alpine lakes, and the best view of Kanchenjunga in India."
              />
            </Reveal>

            <div className="space-y-16 sm:space-y-24">
              {spotlight.map((t, i) => {
                const flip = i % 2 === 1;
                return (
                  <article key={t.slug} className="grid items-center gap-8 md:grid-cols-2 md:gap-14">
                    <Reveal className={`relative ${flip ? "md:order-2" : ""}`}>
                      <div className="relative aspect-[5/4] overflow-hidden rounded-bento">
                        <Photo name={trekCover(t.slug)} width={1200} />
                      </div>
                      <div
                        className={`absolute -bottom-6 hidden w-[42%] overflow-hidden rounded-[22px] border-4 border-mist-100 sm:block ${
                          flip ? "-left-6" : "-right-6"
                        }`}
                      >
                        <div className="relative aspect-square">
                          <Photo name={trekPhotos[t.slug]?.[1] ?? trekCover(t.slug)} width={500} alt="" />
                        </div>
                      </div>
                    </Reveal>
                    <Reveal delay={0.1} className={flip ? "md:order-1" : ""}>
                      <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-ember-500 shadow-soft">
                        {i === 0 ? <Mountain size={20} /> : i === 1 ? <Leaf size={20} /> : <Tent size={20} />}
                      </span>
                      <p className="mt-5 text-[13px] uppercase tracking-[0.14em] text-ink-400">
                        {t.state} · {t.seasons.join(" ")}
                      </p>
                      <h3 className="font-display mt-2 text-[clamp(1.8rem,3.4vw,2.6rem)] leading-[1.02] text-ink-900">{t.name}</h3>
                      <div className="mt-3">
                        <Stars rating={t.rating} reviews={t.reviews} />
                      </div>
                      <p className="mt-5 max-w-[50ch] text-[16px] leading-relaxed text-ink-500">{t.summary.split(". ").slice(0, 2).join(". ")}.</p>
                      <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-[14px] text-ink-600">
                        <span className="nums">{t.days} days · {t.trailKm} km</span>
                        <span className="nums">{t.maxAltFt.toLocaleString("en-IN")} ft</span>
                        <DifficultyMeter difficulty={t.difficulty} />
                      </div>
                      <div className="mt-8 flex flex-wrap items-center gap-5">
                        <Button href={`/treks/${t.slug}`} variant="outline">
                          See details
                        </Button>
                        <p className="text-[14px] text-ink-400">
                          Starting at <span className="nums text-[17px] font-semibold text-ink-900">{inr(t.price)}</span> / person
                        </p>
                      </div>
                    </Reveal>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Velocity band of route names ────────────────────────────── */}
        <section aria-hidden="true" className="overflow-hidden pb-16 sm:pb-24">
          <ScrollVelocity
            texts={[
              treks.slice(0, 8).map((t) => t.name).join("  ·  ") + "  ·  ",
              treks.slice(8).map((t) => t.name).join("  ·  ") + "  ·  ",
            ]}
            velocity={40}
            className="font-display px-3 text-[clamp(2.6rem,7vw,5.6rem)] leading-[1.1] tracking-[-0.045em] text-ink-900/[0.08]"
          />
        </section>

        {/* ── 5. Find by altitude: band pills + carousel ──────────────── */}
        <section className="px-3 pb-20 sm:px-5 sm:pb-28">
          <div className="mx-auto max-w-[1320px] rounded-bento bg-ice-100 px-5 py-14 sm:px-10 sm:py-16">
            <Reveal>
              <SectionHead
                eyebrow="Pick by height"
                title="Start with the altitude you’re ready for"
                intro="Altitude is what your body will notice first. Choose a band, then a trek inside it."
                action={{ href: "/treks", label: "All treks" }}
              />
            </Reveal>
            <TrekRail treks={treks} />
          </div>
        </section>

        {/* ── 6. Dark: who shares the trail ───────────────────────────── */}
        <section className="px-3 sm:px-5">
          <div className="relative mx-auto max-w-[1320px] overflow-hidden rounded-bento bg-ink-950 px-5 py-20 text-white sm:px-12 sm:py-28">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-40 opacity-40" aria-hidden="true">
              <Photo name="mistPines" width={1600} alt="" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-ink-950" />
            </div>

            <div className="relative grid items-center gap-16 lg:grid-cols-[1fr_1.1fr]">
              <Reveal>
                <Eyebrow onDark>On the trail</Eyebrow>
                <h2 className="font-display mt-4 max-w-[16ch] text-[clamp(2rem,4vw,3.2rem)] leading-[1.02]">
                  The mountain has residents. We walk like guests.
                </h2>
                <p className="mt-5 max-w-[46ch] text-[16px] leading-relaxed text-white/65">
                  Red pandas in the bamboo on Singalila, monal pheasants flashing across Tungnath,
                  blue sheep above Goechala. Groups stay on the trail, keep their voices down, and carry
                  every wrapper back to the road head.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <ArrowButton href="/green-trails" accent="#ffffff" onAccent="#111519">
                    How Green Trails works
                  </ArrowButton>
                  <Button href="/stories" variant="outline-light">
                    Field notes
                  </Button>
                </div>
              </Reveal>

              <div className="relative mx-auto flex h-[340px] w-[340px] items-center justify-center sm:h-[440px] sm:w-[440px]">
                <CircleText text="RED PANDA · HIMALAYAN MONAL · BLUE SHEEP · LAMMERGEIER · SNOW PARTRIDGE · " size={440} />
                <Reveal className="relative h-[230px] w-[230px] overflow-hidden rounded-full sm:h-[300px] sm:w-[300px]">
                  <Photo name="redPanda" width={700} />
                </Reveal>
              </div>
            </div>

            <Reveal delay={0.1} className="relative mx-auto mt-16 grid max-w-[760px] overflow-hidden rounded-bento bg-ink-800 sm:grid-cols-[240px_1fr]">
              <div className="relative min-h-[220px]">
                <Photo name="hikerView" width={600} />
                <span className="glass absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-full py-1 pl-1 pr-3 text-[12px]">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white text-ink-900">
                    <Play size={12} className="ml-0.5 fill-current" />
                  </span>
                  Rupin Pass
                </span>
              </div>
              <figure className="flex flex-col justify-center p-7 sm:p-9">
                <Quote size={26} className="text-ember-400" aria-hidden="true" />
                <blockquote className="mt-4 text-[17px] leading-relaxed text-white/85">
                  “Our leader turned me around four hundred metres below the pass. I was furious for a day.
                  Eleven months later I went back, slept well at the high camp, and walked over it.”
                </blockquote>
                <figcaption className="mt-6">
                  <p className="text-[15px] font-medium">Shreya Bhattacharya</p>
                  <p className="text-[13px] text-white/50">Trekker · Rupin Pass</p>
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </section>

        {/* ── 7. Promo banner with a brush highlight ──────────────────── */}
        <section className="px-3 py-20 sm:px-5 sm:py-28">
          <Reveal className="relative mx-auto grid max-w-[1320px] grid-cols-[minmax(0,1fr)] overflow-hidden rounded-bento bg-white shadow-soft md:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
            <div className="relative min-h-[300px] md:min-h-[440px]">
              <Photo name="summitGroup" width={1600} />
            </div>
            <div className="flex flex-col justify-center p-8 sm:p-12">
              <Eyebrow>Winter window</Eyebrow>
              <h2 className="font-display mt-5 text-[clamp(2.2rem,4.4vw,3.4rem)] leading-[1] text-ink-900">
                Snow season opens <span className="brush inline-block px-1">2 December</span>
              </h2>
              <p className="mt-6 max-w-[40ch] text-[16px] leading-relaxed text-ink-500">
                Kedarkantha, Brahmatal, Dayara and Deoriatal go white for four months. Winter batches are the first to
                fill — and Green Trails batches run smaller groups at the same fee.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Magnet padding={60} magnetStrength={4}>
                  <ShimmerButton href="/treks?snow=1" shimmerColor="#ffffff" background="#111519" className="px-6 py-3 text-[14.5px]">
                    Winter treks <ArrowRight size={16} />
                  </ShimmerButton>
                </Magnet>
                <Button href="/departures" variant="outline">
                  Departure calendar
                </Button>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ── 8. Gear up: category tiles ──────────────────────────────── */}
        <section className="px-3 pb-20 sm:px-5 sm:pb-28">
          <div className="mx-auto max-w-[1320px]">
            <Reveal>
              <SectionHead
                eyebrow="Before you go"
                title="Gear up"
                intro="Rent what you won’t use again, buy what you will. Everything is checked at basecamp before you leave."
                action={{ href: "/gear", label: "Full packing list" }}
              />
            </Reveal>
            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
              {(
                [
                  { k: "gearFlatlay", t: "Backpacks", s: "50–60 L, rain cover", icon: Backpack },
                  { k: "bootsGrass", t: "Trekking boots", s: "Ankle support, broken in", icon: Footprints },
                  { k: "snowForest", t: "Layers for −10 °C", s: "Fleece, down, shell", icon: Shirt },
                  { k: "bootsBench", t: "Spikes & poles", s: "Provided on snow treks", icon: ShieldCheck },
                ] as { k: PhotoKey; t: string; s: string; icon: typeof Backpack }[]
              ).map((g, i) => (
                <Reveal key={g.t} delay={i * 0.06}>
                  <Link href="/gear" className="group block">
                    <div className="relative aspect-[4/5] overflow-hidden rounded-bento">
                      <Photo name={g.k} width={700} imgClassName="transition-transform duration-700 group-hover:scale-[1.06]" />
                      <div className="scrim-b absolute inset-0" aria-hidden="true" />
                      <span className="glass absolute left-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-full text-white">
                        <g.icon size={18} />
                      </span>
                      <div className="absolute inset-x-0 bottom-0 p-4 text-white sm:p-5">
                        <p className="text-[17px] font-semibold tracking-[-0.01em]">{g.t}</p>
                        <p className="mt-0.5 text-[13px] text-white/70">{g.s}</p>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── 9. Stories ──────────────────────────────────────────────── */}
        <section className="px-3 pb-20 sm:px-5 sm:pb-28">
          <div className="mx-auto max-w-[1320px]">
            <Reveal>
              <SectionHead
                eyebrow="Journal"
                title="Written on the way down"
                action={{ href: "/stories", label: "All stories" }}
              />
            </Reveal>
            <div className="grid gap-4 md:grid-cols-3">
              {stories.slice(0, 3).map((s, i) => (
                <Reveal key={s.slug} delay={i * 0.08} as="article">
                  <Link href={`/stories/${s.slug}`} className="group flex h-full flex-col rounded-bento bg-white p-2.5 shadow-soft">
                    <div className="relative aspect-[16/10] overflow-hidden rounded-[20px]">
                      <Photo
                        name={STORY_PHOTO[s.slug] ?? trekCover(s.trek)}
                        width={900}
                        imgClassName="transition-transform duration-700 group-hover:scale-[1.05]"
                      />
                      <span className="glass-dark absolute left-3 top-3 rounded-full px-2.5 py-1 text-[12px] font-medium text-white">
                        {s.category}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col px-3 pb-3 pt-4">
                      <p className="nums text-[12.5px] text-ink-400">
                        {new Date(s.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })} ·{" "}
                        {s.minutes} min read
                      </p>
                      <h3 className="mt-2 text-[19px] font-semibold leading-snug tracking-[-0.02em] text-ink-900">{s.title}</h3>
                      <p className="mt-2 line-clamp-2 text-[14px] leading-snug text-ink-500">{s.standfirst}</p>
                      <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-[14px] font-medium text-ink-900">
                        Read more <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── 10. Final landscape CTA ─────────────────────────────────── */}
        <section className="px-3 pb-3 sm:px-5 sm:pb-5">
          <div className="relative mx-auto max-w-[1320px] overflow-hidden rounded-bento text-white">
            <Parallax distance={70} className="absolute inset-0">
              <Photo name="morningLight" width={2400} alt="" />
            </Parallax>
            <div className="absolute inset-0 bg-gradient-to-b from-ink-950/60 via-ink-950/20 to-ink-950/60" aria-hidden="true" />
            <div className="relative flex min-h-[520px] flex-col items-center justify-center px-6 py-24 text-center sm:min-h-[620px]">
              <Reveal>
                <h2 className="font-display max-w-[15ch] text-[clamp(2.4rem,6vw,4.6rem)] leading-[0.98]">
                  Your exploration starts here
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mx-auto mt-5 max-w-[44ch] text-[16.5px] leading-relaxed text-white/75">
                  Tell us where your fitness is today. We’ll suggest three treks that fit — and a date for each.
                </p>
              </Reveal>
              <Reveal delay={0.2} className="mt-9 flex flex-wrap justify-center gap-3">
                <Magnet padding={80} magnetStrength={4}>
                  <ShimmerButton href="/treks" shimmerColor="#ffd84d" background="#ff6a2b" className="px-8 py-4 text-[15.5px] font-medium">
                    Find your trek <ArrowUpRight size={17} />
                  </ShimmerButton>
                </Magnet>
                <Button href="/contact" variant="glass" size="lg">
                  Talk to a trek coordinator
                </Button>
              </Reveal>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}


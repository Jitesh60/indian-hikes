import Link from "next/link";
import {
  ArrowUpRight,
  ArrowRight,
  MapPin,
  Tent,
  Wind,
  Thermometer,
  Radio,
  Leaf,
  ShieldCheck,
  BadgeCheck,
  Headset,
  IndianRupee,
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
  ArrowButton,
  BlurText,
  BorderBeam,
  CountUp,
  Magnet,
  NumberTicker,
  ScrollVelocity,
  ShimmerButton,
} from "@/components/fx";
import { Button, Eyebrow, SectionHead, Stars, Avatar, DifficultyMeter, Pill } from "@/components/site/ui";
import { HeroFinder } from "@/components/home/HeroFinder";
import { Compass } from "@/components/home/Compass";
import { CircleText } from "@/components/home/CircleText";
import { TrekRail } from "@/components/home/TrekRail";
import { TornEdge } from "@/components/home/TornEdge";
import { treks, trekBySlug, departuresFor } from "@/data/treks";
import { stories } from "@/data/stories";
import { storyPhoto } from "@/components/site/content/stories";
import { brand, whatsappHref } from "@/data/brand";
import { trekCover, trekPhotos, type PhotoKey } from "@/data/photos";
import { inr, daysUntil } from "@/lib/types";

const fmt = (iso: string) =>
  new Date(iso + "T00:00:00Z").toLocaleDateString("en-GB", { day: "numeric", month: "short", timeZone: "UTC" });
/** A falling rhododendron petal, drawn — the floating leaf from the park reference. */
function Petal({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 40" className={className} aria-hidden="true">
      <path d="M2 30 C 14 4, 44 0, 58 8 C 44 22, 22 38, 2 30 Z" fill="#7fb99a" />
      <path d="M4 29 C 22 22, 38 14, 56 9" stroke="#17563b" strokeWidth="1.2" fill="none" />
    </svg>
  );
}

export default function HomePage() {

  const kgl = trekBySlug("kashmir-great-lakes")!;
  const kk = trekBySlug("kedarkantha")!;
  const kkDep = departuresFor("kedarkantha").find((d) => d.status !== "full")!;
  const deoria = trekBySlug("deoriatal-chandrashila")!;
  const hampta = trekBySlug("hampta-pass")!;
  const founder = brand.founders[0];
  const spotlight = [kk, hampta, kgl];
  const { stats } = brand;

  return (
    <>
      <SiteHeader variant="light" />

      <main>
        {/* ── 1. Hero: bright, airy, a hiker looking out ─────────────── */}
        <section className="relative isolate overflow-hidden bg-mist-50">
          <Parallax distance={40} className="absolute inset-0">
            <Photo name="hikerSitting" width={2400} priority position="62% 55%" />
          </Parallax>
          {/* light wash from the left so dark type reads, plus a soft top for the nav */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-mist-50 via-mist-50/80 to-mist-50/0 sm:via-mist-50/65"
            aria-hidden="true"
          />
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-mist-50/80 to-transparent" aria-hidden="true" />

          <div className="relative mx-auto flex min-h-[640px] max-w-[1320px] flex-col justify-center px-5 pb-28 pt-36 sm:min-h-[760px] sm:px-10 lg:min-h-[min(100svh,880px)]">
            <Reveal>
              <p className="text-[12px] font-semibold uppercase tracking-[0.28em] text-forest-500">
                Safe <span className="mx-2 text-forest-300">·</span> Guided <span className="mx-2 text-forest-300">·</span> Himalayan
              </p>
            </Reveal>
            <h1 className="mt-5 max-w-[13ch] text-[clamp(2.8rem,6.6vw,5.4rem)] font-semibold leading-[0.98] tracking-[-0.04em] text-ink-900">
              <BlurText as="span" text="Your Next Himalayan Trek" delay={90} className="inline-flex" />
              <span className="font-serif mt-1 block text-[1.18em] italic leading-[0.95] tracking-[-0.02em] text-forest-500">
                Awaits
              </span>
            </h1>
            <Reveal delay={0.15}>
              <p className="mt-6 max-w-[44ch] text-[16.5px] leading-relaxed text-ink-600 sm:text-[17.5px]">
                {brand.promise}
              </p>
            </Reveal>
            <Reveal delay={0.25} className="mt-9">
              <HeroFinder />
            </Reveal>
            <Reveal delay={0.35}>
              <div className="mt-7 flex items-start gap-2 pl-2 text-forest-600" aria-hidden="true">
                <svg width="38" height="34" viewBox="0 0 38 34" fill="none" className="mt-1 shrink-0">
                  <path d="M4 2c-3 12 2 22 26 24" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  <path d="M25 20l6 6-7 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="font-hand -rotate-6 text-[24px] leading-[1.05]">
                  Small groups,
                  <br />
                  big mountains
                </span>
              </div>
            </Reveal>
          </div>

          {/* trust badge, bottom right */}
          <Reveal delay={0.4} className="absolute bottom-20 right-5 hidden sm:right-10 sm:block">
            <div className="glass-light flex items-center gap-3 rounded-2xl px-4 py-3 shadow-soft">
              <span className="flex -space-x-2">
                {brand.testimonials.map((t, i) => (
                  <Avatar key={t.name} name={t.name} size={32} tone={(["ember", "pine", "ice"] as const)[i % 3]} />
                ))}
              </span>
              <span>
                <Stars rating={stats.rating} />
                <span className="nums block text-[12.5px] text-ink-500">
                  {stats.trekkers.toLocaleString("en-IN")}+ trekkers led safely
                </span>
              </span>
            </div>
          </Reveal>

          <TornEdge seed={11} />
        </section>

        {/* ── Feature row ─────────────────────────────────────────────── */}
        <section aria-label="What every trek includes" className="px-5 pt-10 sm:px-10 sm:pt-14">
          <div className="mx-auto grid max-w-[1180px] grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-mist-300">
            {[
              { icon: BadgeCheck, t: "Certified leaders", d: "Trained trek leaders who have walked every route personally." },
              { icon: ShieldCheck, t: "Safe & secure", d: `Zero serious incidents in ${stats.years} years of guiding.` },
              { icon: Headset, t: "24×7 support", d: "Caring on-trail support, and a phone that is always answered." },
              { icon: IndianRupee, t: "All-inclusive pricing", d: "Transparent prices, pickup & drop included — no hidden costs." },
            ].map((f, i) => (
              <Reveal key={f.t} delay={i * 0.06} className="lg:px-8 first:lg:pl-0 last:lg:pr-0">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-forest-50 text-forest-500">
                  <f.icon size={21} strokeWidth={1.8} />
                </span>
                <h3 className="mt-4 text-[16px] font-semibold text-forest-600">{f.t}</h3>
                <p className="mt-1.5 max-w-[26ch] text-[14px] leading-snug text-ink-500">{f.d}</p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── Popular treks: serif heading + photo grid ───────────────── */}
        <section className="px-3 py-20 sm:px-5 sm:py-28">
          <div className="mx-auto grid max-w-[1320px] items-center gap-10 px-2 sm:px-5 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.4fr)] lg:gap-14">
            <Reveal>
              <p className="flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.24em] text-forest-500">
                <span className="h-px w-10 bg-forest-400" aria-hidden="true" /> Popular treks
              </p>
              <h2 className="font-serif mt-5 text-[clamp(2.4rem,4.6vw,3.8rem)] leading-[1.02] text-ink-900">
                Explore the Himalaya’s most <span className="italic text-forest-500">beautiful</span> trails
              </h2>
              <p className="mt-5 max-w-[42ch] text-[16px] leading-relaxed text-ink-500">
                From a first snow summit to week-long crossings — {stats.routes}+ routes across Uttarakhand,
                Himachal, J&amp;K and Ladakh, each one walked by our own team.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/treks"
                  className="inline-flex items-center gap-2 rounded-full bg-forest-500 px-6 py-3 text-[14.5px] font-medium text-white transition-colors hover:bg-forest-600"
                >
                  View all treks <ArrowRight size={16} />
                </Link>
                <span className="text-[14px] text-ink-500">
                  From <span className="nums font-semibold text-ink-900">{inr(stats.fromPrice)}</span>
                </span>
              </div>
            </Reveal>

            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-[1.35fr_1fr] lg:grid-rows-2">
              {[kk, kgl, hampta].map((t, i) => (
                <Reveal
                  key={t.slug}
                  delay={i * 0.08}
                  className={i === 0 ? "col-span-2 lg:col-span-1 lg:row-span-2" : ""}
                >
                  <Link
                    href={`/treks/${t.slug}`}
                    className={`group relative block overflow-hidden rounded-[22px] ${
                      i === 0 ? "aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[480px]" : "aspect-[4/3] lg:aspect-auto lg:h-full"
                    }`}
                  >
                    <Photo
                      name={trekCover(t.slug)}
                      width={i === 0 ? 1200 : 700}
                      imgClassName="transition-transform duration-700 group-hover:scale-[1.05]"
                    />
                    <div className="scrim-b absolute inset-0" aria-hidden="true" />
                    <span className="glass-light absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px] font-medium text-ink-900">
                      <MapPin size={12} className="text-forest-500" /> {t.state}
                    </span>
                    <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 text-white sm:p-5">
                      <span>
                        <span className={`block font-semibold tracking-[-0.02em] ${i === 0 ? "text-[24px] sm:text-[28px]" : "text-[17px] sm:text-[19px]"}`}>
                          {t.name}
                        </span>
                        <span className="nums block text-[12.5px] text-white/75">
                          {t.days} days · {t.maxAltFt.toLocaleString("en-IN")} ft
                        </span>
                      </span>
                      <span className="nums hidden rounded-full bg-white/90 px-3 py-1 text-[12.5px] font-semibold text-ink-900 sm:inline">
                        {inr(t.price)}
                      </span>
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Treks we organise: a giant word set into the landscape ──── */}
        <section className="relative isolate overflow-hidden bg-ink-900 text-white">
          <Parallax distance={50} className="absolute inset-0">
            <Photo name="snowRanges" width={2400} alt="" />
          </Parallax>
          <div className="absolute inset-0 bg-gradient-to-b from-ink-950/30 via-ink-950/10 to-ink-950/60" aria-hidden="true" />
          <TornEdge flip seed={23} />
          <div className="relative flex min-h-[420px] items-center justify-center px-4 py-28 sm:min-h-[560px]">
            <p
              aria-hidden="true"
              className="select-none text-center text-[clamp(4.2rem,17vw,15rem)] font-black uppercase leading-[0.85] tracking-[-0.05em] text-white/80 mix-blend-overlay"
            >
              Himalaya
            </p>
          </div>
          <TornEdge seed={31} />
        </section>

        <section className="px-3 pb-20 pt-6 sm:px-5 sm:pb-28">
          <div className="mx-auto max-w-[1320px] px-2 sm:px-5">
            <Reveal className="mx-auto max-w-[640px] text-center">
              <p className="text-[12px] font-semibold uppercase tracking-[0.28em] text-forest-500">Treks we organise</p>
              <h2 className="font-serif mt-4 text-[clamp(2.2rem,4.2vw,3.4rem)] leading-[1.04] text-ink-900">
                A trek for every kind of <span className="italic text-forest-500">hiker</span>
              </h2>
              <p className="mt-4 text-[16px] leading-relaxed text-ink-500">
                First snow, first summit, a high pass or a group that wants its own dates — we plan and lead them all,
                across the Garhwal, Kumaon and Himachal ranges.
              </p>
            </Reveal>
            <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
              {(
                [
                  { k: "snowPines", t: "Winter snow treks", d: "Dec – Apr", href: "/treks?snow=1" },
                  { k: "sunriseSummit", t: "First Himalayan trek", d: "Easy to moderate", href: "/treks?difficulty=Easy%E2%80%93Moderate" },
                  { k: "snowGroup", t: "High passes", d: "For experienced trekkers", href: "/treks?difficulty=Difficult" },
                  { k: "tallPines", t: "Women-only batches", d: "Led by female trek leaders", href: "/treks?green=1" },
                ] as { k: PhotoKey; t: string; d: string; href: string }[]
              ).map((c, i) => (
                <Reveal key={c.t} delay={i * 0.06}>
                  <Link href={c.href} className="group block">
                    <div className="relative aspect-[3/4] overflow-hidden rounded-[22px]">
                      <Photo name={c.k} width={700} imgClassName="transition-transform duration-700 group-hover:scale-[1.06]" />
                      <div className="scrim-b absolute inset-0" aria-hidden="true" />
                      <span className="absolute inset-x-0 bottom-0 p-4 text-white sm:p-5">
                        <span className="block text-[17px] font-semibold tracking-[-0.01em] sm:text-[19px]">{c.t}</span>
                        <span className="mt-0.5 flex items-center justify-between text-[13px] text-white/75">
                          {c.d}
                          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-ink-900 transition-transform group-hover:translate-x-0.5">
                            <ArrowUpRight size={15} />
                          </span>
                        </span>
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── 2. Bento: the whole product on one screen ───────────────── */}
        <section id="explore" className="scroll-mt-24 px-3 pb-20 pt-16 sm:px-5 sm:pb-28 sm:pt-20">
          <div className="mx-auto max-w-[1320px]">
            <Reveal>
              <SectionHead
                eyebrow="Why HeyHikers"
                title="A small team that treats you like a guest"
                intro="Owner-operated from Dehradun. We have personally walked every route we offer, and you deal directly with the people whose name is on the company."
                action={{ href: "/treks", label: "Browse all treks" }}
              />
            </Reveal>

            <div className="grid grid-cols-[minmax(0,1fr)] gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)_minmax(0,1fr)]">
              {/* left column */}
              <div className="flex flex-col gap-4">
                <Reveal className="flex flex-1 flex-col rounded-bento bg-white p-6 shadow-soft">
                  <div className="flex items-start justify-between">
                    <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-forest-500/10 text-forest-500">
                      <Tent size={28} strokeWidth={1.6} />
                    </span>
                    <Link href="/about" aria-label="About us" className="text-ink-400 transition-colors hover:text-ink-900">
                      <ArrowUpRight size={18} />
                    </Link>
                  </div>
                  <p className="mt-6 text-[19px] font-medium leading-snug tracking-[-0.01em] text-ink-900">
                    Born in the foothills of Uttarakhand, built by people who grew up walking these trails.
                  </p>
                  <div className="mt-auto pt-7">
                    <p className="mb-3 flex items-center gap-2 text-[12px] uppercase tracking-[0.14em] text-ink-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-pine-500" aria-hidden="true" />
                      Every trek comes with
                    </p>
                    <AnimatedList delay={1800} loop className="h-[168px] items-stretch gap-2 overflow-hidden">
                      {brand.promises.map((p) => (
                        <div key={p.title} className="flex items-center gap-2.5 rounded-2xl bg-mist-100 px-3 py-2.5">
                          <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-pine-600">
                            <ShieldCheck size={15} />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-[13px] font-medium text-ink-900">{p.title}</span>
                            <span className="block truncate text-[12px] text-ink-400">{p.body}</span>
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
                    <Avatar name={founder.name} size={54} tone="ember" />
                    <div className="min-w-0 flex-1">
                      <p className="text-[16px] font-medium">{founder.name}</p>
                      <p className="text-[13px] text-white/70">{founder.role} · personally scouts and guides</p>
                    </div>
                    <dl className="flex gap-5 sm:gap-7">
                      {(
                        [
                          [50, "Treks", 0, "+"],
                          [7, "Years", 0, "+"],
                          [stats.rating, "Rating", 1, ""],
                        ] as const
                      ).map(([v, l, dp, sfx]) => (
                        <div key={l} className="text-center">
                          <dt className="sr-only">{l}</dt>
                          <dd className="nums text-[20px] font-semibold leading-none">
                            <NumberTicker value={v} decimalPlaces={dp} className="text-white" />
                            {sfx}
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
                    <p className="text-[16px] font-medium">Trail conditions · {kk.name}</p>
                    <p className="nums mt-1 text-[13px] text-white/50">
                      31.02° N, 78.17° E · <span className="text-white/70">Kedarkantha Base, 11,250 ft</span>
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
                        className="inline-flex items-center gap-2 rounded-full border border-forest-500/50 px-4 py-2 text-[13.5px] text-forest-300 transition-colors hover:border-forest-400 hover:bg-forest-500/10"
                      >
                        <Radio size={15} /> 24×7 support, on and off the trail
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
                  <BorderBeam size={120} duration={9} colorFrom="#7fb99a" colorTo="#ffd84d" borderWidth={1.5} />
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
                      <h3 className="text-[16px] font-semibold tracking-[-0.01em] text-ink-900">From your doorstep to the trail</h3>
                      <Pill tone="green">Included</Pill>
                    </div>
                    <p className="mt-2 text-[13.5px] leading-snug text-ink-500">
                      Most treks start with pickup from Dehradun or Manali and a night at the road head —
                      a warm meal, a briefing and a gear check before the climb.
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <Pill tone="ice">Pickup &amp; drop</Pill>
                      <span className="text-[12.5px] text-ink-400">Sankri · Lohajung · Manali</span>
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
                <Eyebrow onDark>{stats.years} years on the trail</Eyebrow>
                <p className="mt-4 max-w-[30ch] text-[clamp(1.4rem,2.6vw,2rem)] font-medium leading-snug tracking-[-0.02em]">
                  Safety first, every time. Transparent, all-inclusive pricing with no hidden costs. And a team
                  that picks up the phone at any hour.
                </p>
              </Reveal>
              <dl className="mt-14 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
                {[
                  { v: stats.trekkers, l: "Trekkers led safely", s: "+" },
                  { v: stats.routes, l: "Himalayan routes", s: "+" },
                  { v: stats.rating, l: "Average rating", s: "/5" },
                  { v: stats.seriousIncidents, l: `Serious incidents in ${stats.years} years`, s: "" },
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
                eyebrow="Most loved"
                title="Three treks worth taking leave for"
                intro="A winter summit made for first-timers, a crossing from green Kullu into stark Lahaul, and a week of alpine lakes in Kashmir."
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
                      <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-forest-500 shadow-soft">
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

        {/* ── 6. Dark: treks your way + what trekkers say ──────────────── */}
        <section className="px-3 sm:px-5">
          <div className="relative mx-auto max-w-[1320px] overflow-hidden rounded-bento bg-ink-950 px-5 py-20 text-white sm:px-12 sm:py-28">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-40 opacity-40" aria-hidden="true">
              <Photo name="mistPines" width={1600} alt="" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-ink-950" />
            </div>

            <div className="relative grid items-center gap-16 lg:grid-cols-[1fr_1.1fr]">
              <Reveal>
                <Eyebrow onDark>Treks your way</Eyebrow>
                <h2 className="font-display mt-4 max-w-[16ch] text-[clamp(2rem,4vw,3.2rem)] leading-[1.02]">
                  Your dates, your pace, your group.
                </h2>
                <p className="mt-5 max-w-[46ch] text-[16px] leading-relaxed text-white/65">
                  We plan fully customised treks for school groups, corporate teams and solo travellers — custom
                  dates, pace, dietary needs and pickup points. And our women-only batches, led by female trek
                  leaders, are the ones solo women trekkers trust most.
                </p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {[...brand.custom.flexible].map((f) => (
                    <li key={f} className="glass rounded-full px-3.5 py-1.5 text-[13px]">
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-wrap gap-3">
                  <ArrowButton href="/custom-treks" accent="#ffffff" onAccent="#111519">
                    Plan a custom trek
                  </ArrowButton>
                  <Button href={whatsappHref} variant="outline-light">
                    Chat on WhatsApp
                  </Button>
                </div>
              </Reveal>

              <div className="relative mx-auto flex h-[340px] w-[340px] items-center justify-center sm:h-[440px] sm:w-[440px]">
                <CircleText text="SCHOOL GROUPS · CORPORATE TEAMS · SOLO TRAVELLERS · WOMEN-ONLY BATCHES · " size={440} />
                <Reveal className="relative h-[230px] w-[230px] overflow-hidden rounded-full sm:h-[300px] sm:w-[300px]">
                  <Photo name="ridgeWalkers" width={700} />
                </Reveal>
              </div>
            </div>

            <div className="relative mt-20">
              <Reveal>
                <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
                  <h3 className="font-display text-[clamp(1.6rem,3vw,2.3rem)] leading-[1.05]">What our trekkers say</h3>
                  <p className="inline-flex items-center gap-2 text-[14px] text-white/60">
                    <Stars rating={stats.rating} onDark /> average across {stats.trekkers.toLocaleString("en-IN")}+ trekkers
                  </p>
                </div>
              </Reveal>
              <div className="grid gap-4 md:grid-cols-3">
                {brand.testimonials.map((t, i) => (
                  <Reveal key={t.name} delay={i * 0.08} as="article" className="flex flex-col rounded-bento bg-ink-800 p-7">
                    <Quote size={24} className="text-forest-400" aria-hidden="true" />
                    <blockquote className="mt-4 flex-1 text-[16px] leading-relaxed text-white/85">“{t.quote}”</blockquote>
                    <footer className="mt-6 flex items-center gap-3">
                      <Avatar name={t.name} size={40} tone={(["ember", "ice", "pine"] as const)[i % 3]} />
                      <div>
                        <p className="text-[15px] font-medium">{t.name}</p>
                        <p className="text-[13px] text-white/50">{t.trek}</p>
                      </div>
                    </footer>
                  </Reveal>
                ))}
              </div>
            </div>
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
                Kedarkantha, Brahmatal, Dayara Bugyal and Deoriatal go white for four months, and winter batches are
                the first to fill. Kedarkantha starts at {inr(stats.fromPrice)} — all-inclusive, no hidden costs.
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
                        name={storyPhoto(s)}
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
                  Tell us where your fitness is today and when you can get away. We’ll suggest the trek that fits —
                  and reply within 24 hours.
                </p>
              </Reveal>
              <Reveal delay={0.2} className="mt-9 flex flex-wrap justify-center gap-3">
                <Magnet padding={80} magnetStrength={4}>
                  <ShimmerButton href="/treks" shimmerColor="#ffd84d" background="#1f6b4a" className="px-8 py-4 text-[15.5px] font-medium">
                    Find your trek <ArrowUpRight size={17} />
                  </ShimmerButton>
                </Magnet>
                <Button href={whatsappHref} variant="glass" size="lg">
                  Chat with us on WhatsApp
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


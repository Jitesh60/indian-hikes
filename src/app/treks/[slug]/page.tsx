import type { Metadata } from "next";
import { BorderBeam } from "@/components/fx";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowUpRight,
  Check,
  ChevronRight,
  Heart,
  Venus,
  MapPin,
  Minus,
  Share2,
  TrainFront,
  Mountain,
  CalendarDays,
  Route,
  Gauge,
  Footprints,
} from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Photo } from "@/components/site/Photo";
import { Reveal } from "@/components/site/motion";
import { AltitudeProfile } from "@/components/viz/AltitudeProfile";
import { DepartureList } from "@/components/site/DepartureList";
import { TrekCard } from "@/components/site/TrekViews";
import { TrekTabs } from "@/components/site/trek/TrekTabs";
import { Button, DifficultyMeter, Eyebrow, Pill, SectionHead, Stars } from "@/components/site/ui";
import { treks, trekBySlug, departuresFor } from "@/data/treks";
import { stories } from "@/data/stories";
import { trekCover, trekPhotos } from "@/data/photos";
import { band, ft2m, inr, type Departure, type Trek } from "@/lib/types";

export function generateStaticParams() {
  return treks.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const trek = trekBySlug(slug);
  if (!trek) return { title: "Trek not found" };
  return { title: trek.name, description: trek.tagline };
}

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "itinerary", label: "Itinerary" },
  { id: "departures", label: "Departures" },
  { id: "fee", label: "Fee" },
];

/* Which stat cells get a right-hand hairline at 2 / 3 / 5 columns. */
const HAIRLINE = [
  "",
  "after:hidden sm:after:block",
  "sm:after:hidden lg:after:block",
  "after:hidden sm:after:block",
];

/* Sections land below the fixed header and the sticky tab bar. */
const ANCHOR = "scroll-mt-[150px] sm:scroll-mt-[160px]";

export default async function TrekPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const trek = trekBySlug(slug);
  if (!trek) notFound();

  const deps = departuresFor(trek.slug);
  const openSlots = deps.reduce((s, d) => s + (d.capacity - d.booked), 0);
  const related = treks
    .filter((t) => t.slug !== trek.slug)
    .map((t) => ({ t, d: Math.abs(t.maxAltFt - trek.maxAltFt) + (t.state === trek.state ? -1200 : 0) }))
    .sort((a, b) => a.d - b.d)
    .slice(0, 3)
    .map((x) => x.t);
  const related_story = stories.find((s) => s.trek === trek.slug);
  const topBand = band(trek.maxAltFt);
  const gallery = (trekPhotos[trek.slug] ?? []).slice(1, 4);
  const peakDay = trek.profile.reduce((a, b) => (b.altFt > a.altFt ? b : a), trek.profile[0]);

  const stats: { label: string; value: string; sub: string; icon: typeof Mountain; grade?: boolean }[] = [
    {
      label: "Max altitude",
      value: `${trek.maxAltFt.toLocaleString("en-IN")} ft`,
      sub: `${ft2m(trek.maxAltFt).toLocaleString("en-IN")} m · ${topBand.label}`,
      icon: Mountain,
    },
    { label: "Duration", value: `${trek.days} days`, sub: `${trek.nights} ${trek.nights === 1 ? "night" : "nights"} on the trail`, icon: CalendarDays },
    { label: "Distance", value: `${trek.trailKm} km`, sub: `From ${trek.basecamp}`, icon: Route },
    { label: "Grade", value: trek.difficulty, sub: trek.firstTimer ? "Fine for a first trek" : "Some experience helps", icon: Gauge, grade: true },
    { label: "Trek fee", value: inr(trek.price), sub: "Per person, all-inclusive", icon: Footprints },
  ];

  return (
    <>
      <SiteHeader variant="dark" />

      {/* ── Hero ── */}
      <div className="px-3 pt-3 sm:px-5 sm:pt-4">
        <section className="relative isolate mx-auto max-w-[1320px] overflow-hidden rounded-bento bg-ink-900 text-white">
          <div className="absolute inset-0 -z-10">
            <Photo name={trekCover(trek.slug)} width={2000} priority />
            <div className="scrim-t absolute inset-0" />
            <div className="scrim-b absolute inset-0" />
          </div>

          <div className="flex min-h-[680px] flex-col justify-between gap-10 px-4 pb-4 pt-[100px] sm:min-h-[760px] sm:px-8 sm:pb-8 sm:pt-[120px]">
            <div className="flex items-center justify-between gap-3">
              <nav aria-label="Breadcrumb" className="glass min-w-0 rounded-full px-4 py-2 text-[13px]">
                <ol className="flex min-w-0 items-center gap-1.5">
                  <li className="shrink-0">
                    <Link href="/treks" className="text-white/75 transition-colors hover:text-white">
                      All treks
                    </Link>
                  </li>
                  <li aria-hidden="true" className="text-white/40">
                    <ChevronRight size={13} />
                  </li>
                  <li className="shrink-0 text-white/75">{trek.state}</li>
                  <li aria-hidden="true" className="hidden text-white/40 sm:block">
                    <ChevronRight size={13} />
                  </li>
                  <li className="hidden truncate font-medium sm:block" aria-current="page">
                    {trek.name}
                  </li>
                </ol>
              </nav>
              <div className="flex shrink-0 items-center gap-2">
                <button
                  type="button"
                  aria-label="Save this trek"
                  className="glass inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-white/25"
                >
                  <Heart size={16} />
                </button>
                <button
                  type="button"
                  aria-label="Share this trek"
                  className="glass inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-white/25"
                >
                  <Share2 size={16} />
                </button>
              </div>
            </div>

            <div>
              <div className="max-w-[820px] px-1 sm:px-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="glass inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12.5px]">
                    <MapPin size={12} aria-hidden="true" /> {trek.region}, {trek.state}
                  </span>
                  {trek.womenOnly && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-pine-500 px-3 py-1.5 text-[12.5px] font-medium">
                      <Venus size={12} aria-hidden="true" /> Women-only batches
                    </span>
                  )}
                  <span className="glass inline-flex items-center rounded-full px-3 py-1.5">
                    <Stars rating={trek.rating} reviews={trek.reviews} onDark />
                  </span>
                </div>
                <h1 className="mt-5 font-display text-[clamp(2.9rem,8vw,6.4rem)] leading-[0.94]">
                  {trek.name}
                </h1>
                <p className="mt-4 max-w-[46ch] text-[17px] leading-snug text-white/80 sm:text-[19px]">
                  {trek.tagline}
                </p>
              </div>

              {/* Frosted stat panel */}
              <dl className="glass mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-[24px] sm:grid-cols-3 lg:grid-cols-5">
                {stats.map((s, i) => (
                  <div
                    key={s.label}
                    className={[
                      "relative px-4 py-4 sm:px-5 sm:py-5",
                      i === stats.length - 1 ? "col-span-2 sm:col-span-1" : "",
                      // hairlines between cells in the same row (2, 3 or 5 per row)
                      "after:absolute after:inset-y-4 after:right-0 after:w-px after:bg-white/20",
                      HAIRLINE[i] ?? "after:hidden",
                    ].join(" ")}
                  >
                    <dt className="flex items-center gap-1.5 text-[12px] text-white/65">
                      <s.icon size={13} aria-hidden="true" /> {s.label}
                    </dt>
                    <dd className="nums mt-2 text-[20px] font-semibold leading-none tracking-[-0.02em] sm:text-[24px]">
                      {s.grade ? (
                        <span className="text-[17px] sm:text-[18px]">
                          <DifficultyMeter difficulty={trek.difficulty} size="md" onDark />
                        </span>
                      ) : (
                        s.value
                      )}
                    </dd>
                    <dd className="nums mt-1.5 text-[12px] text-white/60">{s.sub}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>
      </div>

      {/* ── Sticky tab bar ── */}
      <div className="sticky top-[78px] z-40 mt-3 px-3 sm:top-[86px] sm:px-5">
        <TrekTabs tabs={TABS} cta={{ href: "#departures", label: "Pick a date" }} />
      </div>

      <main className="px-3 pb-16 pt-5 sm:px-5 sm:pb-24 sm:pt-6">
        <div className="mx-auto grid max-w-[1320px] gap-4 sm:gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="min-w-0 space-y-4 sm:space-y-5">
            {/* ── Overview ── */}
            <section id="overview" aria-labelledby="overview-h" className={`${ANCHOR} grid gap-4 sm:gap-5 md:grid-cols-5`}>
              <Reveal className="rounded-bento bg-white p-6 shadow-soft sm:p-9 md:col-span-3">
                <Eyebrow>About this trek</Eyebrow>
                <h2 id="overview-h" className="mt-3 font-display text-[clamp(1.6rem,3vw,2.2rem)] leading-[1.08]">
                  {trek.days} days, {trek.trailKm} km, one high point
                </h2>
                <p className="mt-4 text-[16px] leading-[1.7] text-ink-600">{trek.summary}</p>
                <dl className="mt-7 grid grid-cols-2 gap-3">
                  <Fact icon={MapPin} label="Basecamp" value={trek.basecamp} />
                  <Fact icon={TrainFront} label="Railhead" value={trek.railhead} />
                </dl>
              </Reveal>

              <Reveal delay={0.08} className="flex flex-col rounded-bento bg-ice-100 p-6 sm:p-8 md:col-span-2">
                <Eyebrow>Why this trek</Eyebrow>
                <ol className="mt-5 space-y-4">
                  {trek.whyThis.map((w, i) => (
                    <li key={w} className="flex gap-3.5">
                      <span className="nums inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-[12.5px] font-semibold text-ink-900 shadow-soft">
                        {i + 1}
                      </span>
                      <p className="text-[14.5px] leading-relaxed text-ink-700">{w}</p>
                    </li>
                  ))}
                </ol>
              </Reveal>
            </section>

            {/* Booking card inline on phones and tablets */}
            <div className="lg:hidden">
              <BookingCard trek={trek} deps={deps} openSlots={openSlots} />
            </div>

            {/* Gallery bento */}
            {gallery.length > 0 && (
              <Reveal className="grid auto-rows-[150px] grid-cols-2 gap-3 sm:auto-rows-[190px] sm:grid-cols-4 sm:gap-4">
                {gallery[0] && (
                  <figure className="relative col-span-2 row-span-2 overflow-hidden rounded-bento">
                    <Photo name={gallery[0]} width={1200} />
                    <figcaption className="glass absolute bottom-3 left-3 rounded-full px-3 py-1.5 text-[12px] text-white">
                      On the trail
                    </figcaption>
                  </figure>
                )}
                {gallery[1] && (
                  <figure className="relative overflow-hidden rounded-[22px]">
                    <Photo name={gallery[1]} width={700} />
                  </figure>
                )}
                <div className="flex flex-col justify-between rounded-[22px] bg-ink-900 p-4 text-white sm:p-5">
                  <p className="text-[12px] text-white/60">Trekkers rate it</p>
                  <div>
                    <p className="nums text-[34px] font-semibold leading-none tracking-[-0.03em]">
                      {trek.rating.toFixed(1)}
                    </p>
                    <p className="nums mt-1.5 text-[12px] text-white/60">
                      from {trek.reviews.toLocaleString("en-IN")} reviews
                    </p>
                  </div>
                </div>
                {gallery[2] && (
                  <figure className="relative col-span-2 overflow-hidden rounded-[22px]">
                    <Photo name={gallery[2]} width={1000} />
                  </figure>
                )}
              </Reveal>
            )}

            {/* ── Itinerary ── */}
            <section id="itinerary" aria-labelledby="itinerary-h" className={`${ANCHOR} rounded-bento bg-white p-5 shadow-soft sm:p-9`}>
              <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
                <div>
                  <Eyebrow>Itinerary</Eyebrow>
                  <h2 id="itinerary-h" className="mt-3 font-display text-[clamp(1.6rem,3vw,2.2rem)] leading-[1.08]">
                    The {trek.days} days as a line
                  </h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Pill tone="red">
                    <Mountain size={11} aria-hidden="true" /> Summit day {peakDay.day} · {trek.maxAltFt.toLocaleString("en-IN")} ft
                  </Pill>
                  <Pill tone="neutral">{trek.trailKm} km on foot</Pill>
                </div>
              </div>

              <div className="mt-6 rounded-[22px] bg-mist-50 px-2 pb-3 pt-4 text-ink-900 sm:px-5 sm:pt-6">
                <div className="sm:hidden">
                  <AltitudeProfile profile={trek.profile} height={760} fontScale={2.8} />
                </div>
                <div className="hidden sm:block">
                  <AltitudeProfile profile={trek.profile} height={330} />
                </div>
              </div>

              <h3 className="mb-6 mt-10 text-[18px] font-semibold tracking-[-0.02em]">Day by day</h3>
              <ol>
                {trek.profile.map((d, i) => {
                  const prev = i > 0 ? trek.profile[i - 1].altFt : d.altFt;
                  const delta = d.altFt - prev;
                  const isPeak = d.day === peakDay.day;
                  const last = i === trek.profile.length - 1;
                  return (
                    <li key={`${d.day}-${d.label}`} className="relative grid grid-cols-[44px_1fr] gap-x-4 pb-7 last:pb-0 sm:gap-x-5">
                      {!last && (
                        <span className="absolute bottom-0 left-[21.5px] top-12 w-px bg-mist-300" aria-hidden="true" />
                      )}
                      <span
                        className={[
                          "nums relative z-10 inline-flex h-11 w-11 items-center justify-center rounded-full text-[14px] font-semibold",
                          isPeak
                            ? "bg-forest-500 text-white shadow-[0_8px_20px_-8px_rgb(255_106_43/0.7)]"
                            : "bg-ink-900 text-white",
                        ].join(" ")}
                        aria-label={`Day ${d.day}`}
                      >
                        {String(d.day).padStart(2, "0")}
                      </span>
                      <div className="min-w-0 pt-1">
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                          <h4 className="text-[18px] font-semibold leading-tight tracking-[-0.02em] text-ink-900">
                            {d.label}
                          </h4>
                          {isPeak && <Pill tone="red">Highest point</Pill>}
                        </div>
                        <p className="nums mt-2 flex flex-wrap gap-1.5 text-[12px]">
                          <span className="rounded-full bg-mist-100 px-2.5 py-1 text-ink-600">
                            {d.altFt.toLocaleString("en-IN")} ft
                          </span>
                          {d.km > 0 && (
                            <span className="rounded-full bg-mist-100 px-2.5 py-1 text-ink-600">{d.km} km on foot</span>
                          )}
                          {i > 0 && delta !== 0 && (
                            <span
                              className={`rounded-full px-2.5 py-1 ${
                                delta > 0 ? "bg-forest-500/10 text-forest-600" : "bg-ice-100 text-ice-500"
                              }`}
                            >
                              {delta > 0 ? "▲ +" : "▼ −"}
                              {Math.abs(delta).toLocaleString("en-IN")} ft
                            </span>
                          )}
                        </p>
                        <p className="mt-2.5 max-w-[64ch] text-[15px] leading-relaxed text-ink-600">{d.note}</p>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </section>

            {/* Fitness */}
            <Reveal className="grid gap-5 overflow-hidden rounded-bento bg-ink-900 p-6 text-white sm:grid-cols-[1.4fr_1fr] sm:p-9">
              <div>
                <Eyebrow onDark>Before we confirm you</Eyebrow>
                <h2 className="mt-3 font-display text-[clamp(1.5rem,2.6vw,2rem)] leading-[1.1]">
                  Fitness we&apos;ll ask to see
                </h2>
                <p className="mt-3 max-w-[54ch] text-[15px] leading-relaxed text-white/70">{trek.fitnessNote}</p>
                <Button href="/fitness" variant="outline-light" size="sm" className="mt-6">
                  How we check fitness <ArrowUpRight size={14} />
                </Button>
              </div>
              <div className="glass flex flex-col justify-between gap-6 rounded-[22px] p-5">
                <div>
                  <p className="text-[12px] text-white/60">Target to hit before you arrive</p>
                  <p className="nums mt-2 text-[26px] font-semibold leading-tight tracking-[-0.02em]">
                    {trek.fitnessTarget}
                  </p>
                </div>
                <div>
                  <p className="mb-2 text-[12px] text-white/60">Grade</p>
                  <DifficultyMeter difficulty={trek.difficulty} size="md" onDark />
                </div>
              </div>
            </Reveal>

            {/* ── Departures ── */}
            <section id="departures" aria-labelledby="departures-h" className={`${ANCHOR} rounded-bento bg-white p-5 shadow-soft sm:p-9`}>
              <Eyebrow>Departures</Eyebrow>
              <h2 id="departures-h" className="mt-3 font-display text-[clamp(1.6rem,3vw,2.2rem)] leading-[1.08]">
                Open departures
              </h2>
              <p className="mb-7 mt-2.5 max-w-[60ch] text-[15px] leading-relaxed text-ink-500">
                Slot counts update as people book. Departures marked with a leaf run smaller
                groups and spend a day on waste recovery.
              </p>
              <DepartureList departures={deps} slug={trek.slug} price={trek.price} />
            </section>

            {/* ── Fee ── */}
            <section id="fee" aria-labelledby="fee-h" className={`${ANCHOR} rounded-bento bg-white p-5 shadow-soft sm:p-9`}>
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <Eyebrow>Fee</Eyebrow>
                  <h2 id="fee-h" className="mt-3 font-display text-[clamp(1.6rem,3vw,2.2rem)] leading-[1.08]">
                    What the fee covers
                  </h2>
                </div>
                <p className="nums text-[14px] text-ink-500">
                  <span className="text-[22px] font-semibold tracking-[-0.02em] text-ink-900">{inr(trek.price)}</span>{" "}
                  per person
                </p>
              </div>
              <div className="mt-7 grid gap-3 sm:grid-cols-2 sm:gap-4">
                <div className="rounded-[22px] bg-mist-50 p-5 sm:p-6">
                  <h3 className="mb-4 inline-flex items-center gap-2 text-[14px] font-semibold text-pine-600">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-pine-500 text-white">
                      <Check size={13} aria-hidden="true" />
                    </span>
                    Included
                  </h3>
                  <ul className="space-y-2.5">
                    {trek.included.map((i) => (
                      <li key={i} className="flex gap-2.5 text-[14.5px] leading-snug text-ink-700">
                        <Check size={16} className="mt-0.5 shrink-0 text-pine-500" aria-hidden="true" />
                        {i}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-[22px] bg-mist-50 p-5 sm:p-6">
                  <h3 className="mb-4 inline-flex items-center gap-2 text-[14px] font-semibold text-ink-700">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-ink-400 text-white">
                      <Minus size={13} aria-hidden="true" />
                    </span>
                    Not included
                  </h3>
                  <ul className="space-y-2.5">
                    {trek.excluded.map((i) => (
                      <li key={i} className="flex gap-2.5 text-[14.5px] leading-snug text-ink-700">
                        <Minus size={16} className="mt-0.5 shrink-0 text-ink-400" aria-hidden="true" />
                        {i}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {related_story && (
              <Link
                href={`/stories/${related_story.slug}`}
                className="group grid gap-5 rounded-bento bg-white p-3 shadow-soft transition-shadow hover:shadow-[0_28px_50px_-24px_rgb(16_24_40/0.35)] sm:grid-cols-[220px_1fr] sm:items-center"
              >
                <div className="relative aspect-[16/9] overflow-hidden rounded-[20px] sm:aspect-square">
                  <Photo
                    name="hikerView"
                    width={600}
                    alt=""
                    imgClassName="transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="px-3 pb-3 sm:px-2 sm:pb-0 sm:pr-6">
                  <Pill tone="gold">From the field</Pill>
                  <h3 className="mt-3 text-[21px] font-semibold leading-tight tracking-[-0.02em] text-ink-900">
                    {related_story.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-[14.5px] leading-relaxed text-ink-500">
                    {related_story.standfirst}
                  </p>
                  <p className="nums mt-4 inline-flex items-center gap-1.5 text-[13px] font-medium text-ink-900">
                    {related_story.author} · {related_story.minutes} min read
                    <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </p>
                </div>
              </Link>
            )}
          </div>

          {/* ── Booking rail (desktop) ── */}
          <aside className="hidden lg:block" aria-label="Book this trek">
            <div className="sticky top-[160px]">
              <BookingCard trek={trek} deps={deps} openSlots={openSlots} />
            </div>
          </aside>
        </div>

        {/* ── Related ── */}
        <section className="mx-auto mt-16 max-w-[1320px] sm:mt-24" aria-label="Similar treks">
          <SectionHead
            eyebrow="Similar treks"
            title="If this one is not right"
            intro="Three treks that sit at a similar height, so they will ask something similar of you."
            action={{ href: "/treks", label: "All treks" }}
          />
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {related.map((t, i) => (
              <Reveal key={t.slug} delay={i * 0.06} className="h-full">
                <TrekCard trek={t} />
              </Reveal>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}

function Fact({ icon: Icon, label, value }: { icon: typeof MapPin; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 rounded-[18px] bg-mist-100 p-3">
      <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-ink-700">
        <Icon size={16} aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <dt className="text-[11.5px] text-ink-400">{label}</dt>
        <dd className="truncate text-[14.5px] font-medium text-ink-900">{value}</dd>
      </div>
    </div>
  );
}

function BookingCard({ trek, deps, openSlots }: { trek: Trek; deps: Departure[]; openSlots: number }) {
  return (
    <div className="relative overflow-hidden rounded-bento bg-ink-900 p-6 text-white shadow-[0_30px_60px_-30px_rgb(10_13_16/0.6)] sm:p-7">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[12.5px] text-white/60">Trek fee per person</p>
          <p className="nums mt-1.5 text-[38px] font-semibold leading-none tracking-[-0.03em]">{inr(trek.price)}</p>
        </div>
        <span className="nums rounded-full bg-white/10 px-3 py-1.5 text-[12px] text-white/80">
          {openSlots} slots open
        </span>
      </div>
      <p className="mt-3 text-[13px] leading-relaxed text-white/55">
        {trek.included.find((i) => i.startsWith("Pickup")) ?? "All-inclusive pricing"} — no hidden costs.
      </p>

      <dl className="mt-6 rounded-[20px] bg-white/[0.06] px-4 text-[13.5px]">
        {[
          ["Grade", trek.difficulty],
          ["Season", trek.seasons.join(", ")],
          ["Group size", trek.difficulty === "Difficult" ? "15 maximum" : "20 maximum"],
          ["Pick-up", `${trek.railhead}, 6:30 am`],
          ["Slots open", `${openSlots} across ${deps.length} dates`],
        ].map(([k, v]) => (
          <div key={k} className="flex justify-between gap-5 border-b border-white/10 py-3 last:border-b-0">
            <dt className="shrink-0 text-white/55">{k}</dt>
            <dd className="nums text-right">{v}</dd>
          </div>
        ))}
      </dl>

      <a
        href="#departures"
        className="mt-6 flex items-center justify-center gap-2 rounded-full bg-forest-500 px-5 py-3.5 text-[15px] font-medium text-white shadow-[0_8px_24px_-8px_rgb(255_106_43/0.6)] transition-colors hover:bg-forest-600"
      >
        Choose your dates <ArrowUpRight size={16} aria-hidden="true" />
      </a>
      <p className="mt-4 text-[12.5px] leading-relaxed text-white/50">
        Full refund 30+ days out (minus a processing fee). Inside 14 days, transfer your place to
        someone else or another date for free.
      </p>
      <BorderBeam size={110} duration={10} colorFrom="#7fb99a" colorTo="#ffd84d" borderWidth={1.5} />
    </div>
  );
}

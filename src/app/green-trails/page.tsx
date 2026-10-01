import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Leaf, Scale, Recycle, Users, ArrowDown } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Photo } from "@/components/site/Photo";
import { TrekCard } from "@/components/site/TrekViews";
import { CountUp, Reveal } from "@/components/site/motion";
import { Button } from "@/components/site/ui";
import { treks } from "@/data/treks";

export const metadata: Metadata = {
  title: "Green Trails",
  description:
    "What Green Trails is, how waste gets weighed and sorted, and which departures run it.",
};

const WASTE = [
  { label: "Multi-layer plastic", kg: 21400, color: "bg-ember-500" },
  { label: "Glass", kg: 5100, color: "bg-ice-500" },
  { label: "Tin and aluminium", kg: 2800, color: "bg-sun-400" },
  { label: "Cloth and rubber", kg: 1300, color: "bg-pine-500" },
  { label: "Paper", kg: 800, color: "bg-ink-600" },
];

const STEPS = [
  { icon: Leaf, h: "An eco-bag each", b: "Handed out at basecamp, clipped to your rucksack, emptied at the next camp.", span: "lg:col-span-5", cls: "bg-pine-600 text-white", sub: "text-white/70", num: "text-white/25" },
  { icon: Scale, h: "Weighed and logged", b: "Every collection is weighed against the departure, not the group, so the record is honest.", span: "lg:col-span-7", cls: "bg-white shadow-soft text-ink-900", sub: "text-ink-500", num: "text-mist-300" },
  { icon: Recycle, h: "Sorted, not dumped", b: "Five streams. Plastic goes to a cement kiln, metal to a scrap dealer, glass back to a bottler.", span: "lg:col-span-7", cls: "bg-white shadow-soft text-ink-900", sub: "text-ink-500", num: "text-mist-300" },
  { icon: Users, h: "Smaller groups", b: "Twelve rather than twenty, with a coordinator whose only job is the recovery work.", span: "lg:col-span-5", cls: "bg-ink-900 text-white", sub: "text-white/65", num: "text-white/20" },
];

const START_YEAR = 2013;
const SHEDS = 11;
/** "Thirteen years later" — the record runs through the 2026 season. */
const THROUGH_YEAR = 2026;

/** Eyebrow in the programme's own pine colour. */
function PineEyebrow({ children, onDark = false }: { children: ReactNode; onDark?: boolean }) {
  return (
    <p
      className={`inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.16em] ${
        onDark ? "text-white/70" : "text-pine-600"
      }`}
    >
      <Leaf size={13} className={onDark ? "text-pine-500" : ""} aria-hidden="true" />
      {children}
    </p>
  );
}

export default function GreenTrailsPage() {
  const total = WASTE.reduce((s, w) => s + w.kg, 0);
  const greenTreks = treks.filter((t) => t.greenTrails);
  const years = THROUGH_YEAR - START_YEAR;

  return (
    <>
      <SiteHeader variant="dark" />
      <main className="px-3 pb-16 pt-3 sm:px-5 sm:pb-24 sm:pt-4">
        <div className="mx-auto max-w-[1320px]">
          {/* Hero */}
          <header className="relative flex min-h-[640px] items-center justify-center overflow-hidden rounded-bento bg-ink-900 sm:min-h-[720px] lg:min-h-[780px]">
            <Photo name="mistForest" width={2200} priority alt="" />
            <div className="absolute inset-0 bg-ink-950/45" aria-hidden="true" />
            <div className="scrim-b absolute inset-0 opacity-80" aria-hidden="true" />
            <div className="relative flex flex-col items-center px-5 pb-14 pt-[130px] text-center sm:px-10">
              <span className="glass inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[13px] text-white">
                <Leaf size={14} className="text-pine-500" /> Green Trails · since {START_YEAR}
              </span>
              <h1 className="font-display mt-6 max-w-[16ch] text-[clamp(2.6rem,7.4vw,5.6rem)] leading-[0.98] text-white">
                Leave the mountain better than you found it.
              </h1>
              <p className="mt-6 max-w-[58ch] text-[16.5px] leading-relaxed text-white/75 sm:text-[18px]">
                It began as a rule of thumb — one bag of waste per group, carried down.
                Thirteen years later it is a weighing scale at every basecamp, a sorting
                shed at eleven of them, and a public record of what came off each trail.
              </p>
              <div className="mt-9 flex flex-wrap justify-center gap-3">
                <Button href="#routes" variant="light" size="lg">
                  Find a Green Trails trek
                </Button>
                <Button href="#how" variant="glass" size="lg">
                  How it works <ArrowDown size={16} />
                </Button>
              </div>
            </div>
          </header>

          {/* Big numbers over a landscape */}
          <section aria-labelledby="numbers" className="pt-14 sm:pt-20">
            <div className="mb-8 grid gap-x-10 gap-y-4 px-2 lg:grid-cols-2 lg:items-end">
              <div>
                <PineEyebrow>The record</PineEyebrow>
                <h2 id="numbers" className="font-display mt-3 text-[clamp(1.9rem,3.8vw,3rem)] leading-[1.04] text-ink-900">
                  What came down, by category
                </h2>
              </div>
              <p className="max-w-[54ch] text-[16px] leading-relaxed text-ink-500 lg:justify-self-end">
                Every bag is weighed at the basecamp before it goes anywhere. These are
                the totals across all routes since we started counting, in kilograms.
              </p>
            </div>

            <div className="relative overflow-hidden rounded-bento bg-ink-900">
              <Photo name="windingRoad" width={2000} alt="" />
              <div className="absolute inset-0 bg-ink-950/40" aria-hidden="true" />
              <div className="scrim-b absolute inset-0" aria-hidden="true" />
              <div className="relative flex min-h-[520px] flex-col justify-end p-5 sm:min-h-[560px] sm:p-10 lg:p-12">
                <p className="text-[14px] text-white/70">Brought down and processed</p>
                <p className="nums font-display mt-2 text-[clamp(3.2rem,11vw,8.5rem)] leading-[0.9] text-white">
                  <CountUp value={total} /> <span className="text-[0.4em] text-white/70">kg</span>
                </p>
                <dl className="mt-8 grid grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-4">
                  {[
                    { n: years, l: "Years running" },
                    { n: SHEDS, l: "Sorting sheds" },
                    { n: greenTreks.length, l: "Routes on the programme" },
                    { n: WASTE.length, l: "Waste streams sorted" },
                  ].map((s) => (
                    <div key={s.l} className="glass rounded-[20px] p-4 sm:p-5">
                      <dt className="text-[12.5px] leading-snug text-white/70">{s.l}</dt>
                      <dd className="nums font-display mt-2 text-[clamp(1.8rem,3.4vw,2.6rem)] leading-none text-white">
                        <CountUp value={s.n} />
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            <div className="mt-3 rounded-bento bg-white p-6 shadow-soft sm:mt-5 sm:p-10">
              <div className="grid gap-x-10 gap-y-6 md:grid-cols-2 lg:grid-cols-5">
                {WASTE.map((w) => {
                  const pct = (w.kg / total) * 100;
                  return (
                    <div key={w.label}>
                      <div className="flex items-baseline justify-between gap-3">
                        <span className="text-[14.5px] font-medium text-ink-900">{w.label}</span>
                        <span className="nums text-[13px] text-ink-400">{Math.round(pct)}%</span>
                      </div>
                      <p className="nums font-display mt-2 text-[26px] leading-none text-ink-900">
                        {w.kg.toLocaleString("en-IN")} <span className="text-[14px] font-medium text-ink-400">kg</span>
                      </p>
                      <div className="mt-3 h-2 overflow-hidden rounded-full bg-mist-200" aria-hidden="true">
                        <div className={`h-full rounded-full ${w.color}`} style={{ width: `${Math.max(pct, 2)}%` }} />
                      </div>
                      <p className="sr-only">{Math.round(pct)}% of everything collected</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* How it works */}
          <section id="how" aria-labelledby="how-title" className="scroll-mt-24 pt-14 sm:pt-20">
            <div className="mb-8 px-2">
              <PineEyebrow>On the ground</PineEyebrow>
              <h2 id="how-title" className="font-display mt-3 text-[clamp(1.9rem,3.8vw,3rem)] leading-[1.04] text-ink-900">
                How it works on the ground
              </h2>
              <p className="mt-3 max-w-[56ch] text-[16px] leading-relaxed text-ink-500">
                Four things happen on every Green Trails departure. None of them are optional.
              </p>
            </div>
            <ol className="grid gap-3 sm:gap-5 md:grid-cols-2 lg:grid-cols-12">
              {STEPS.map((c, i) => {
                const Icon = c.icon;
                return (
                  <Reveal key={c.h} as="li" delay={(i % 2) * 0.08} className={`h-full ${c.span}`}>
                    <div
                      className={`relative flex h-full min-h-[260px] flex-col overflow-hidden rounded-bento p-6 sm:p-8 ${c.cls}`}
                    >
                      <span
                        className={`nums font-display pointer-events-none absolute -right-2 -top-6 text-[140px] leading-none ${c.num}`}
                        aria-hidden="true"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={`relative inline-flex h-12 w-12 items-center justify-center rounded-full ${
                          i === 0 ? "bg-white text-pine-600" : i === 3 ? "bg-pine-500 text-white" : "bg-pine-500/12 text-pine-600"
                        }`}
                      >
                        <Icon size={20} />
                      </span>
                      <div className="relative mt-auto pt-10">
                        <p className={`nums text-[13px] ${c.sub}`}>Step {i + 1}</p>
                        <h3 className="mt-1 text-[22px] font-semibold leading-tight tracking-[-0.02em]">{c.h}</h3>
                        <p className={`mt-2 max-w-[44ch] text-[15px] leading-relaxed ${c.sub}`}>{c.b}</p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </ol>
          </section>

          {/* Routes */}
          <section id="routes" aria-labelledby="routes-title" className="scroll-mt-24 pt-14 sm:pt-20">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-5 px-2">
              <div>
                <PineEyebrow>Where to go</PineEyebrow>
                <h2 id="routes-title" className="font-display mt-3 text-[clamp(1.9rem,3.8vw,3rem)] leading-[1.04] text-ink-900">
                  Routes that run Green Trails departures
                </h2>
                <p className="mt-3 max-w-[56ch] text-[16px] leading-relaxed text-ink-500">
                  {greenTreks.length} of our {treks.length} treks have at least one marked
                  departure a month in season.
                </p>
              </div>
              <Button href="/treks?green=1" variant="outline" size="sm">
                See all {greenTreks.length} routes
              </Button>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
              {greenTreks.slice(0, 6).map((t, i) => (
                <Reveal key={t.slug} delay={(i % 3) * 0.06} className="h-full">
                  <TrekCard trek={t} />
                </Reveal>
              ))}
            </div>
          </section>

          {/* Closing band */}
          <section className="relative mt-14 overflow-hidden rounded-bento bg-pine-600 px-6 py-12 text-white sm:mt-20 sm:px-12 sm:py-16">
            <div className="grid items-center gap-10 md:grid-cols-[minmax(0,1fr)_auto]">
              <div>
                <PineEyebrow onDark>Book a marked departure</PineEyebrow>
                <h2 className="font-display mt-4 max-w-[20ch] text-[clamp(1.9rem,4vw,3.2rem)] leading-[1.04]">
                  Carry one bag down. We will weigh it.
                </h2>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button href="/treks?green=1" variant="light" size="lg">
                    See all {greenTreks.length} routes
                  </Button>
                  <Button href="/stories/ninety-one-kilos-of-waste" variant="outline-light" size="lg">
                    Read a field report
                  </Button>
                </div>
              </div>
              <div className="relative mx-auto hidden h-44 w-44 sm:block" aria-hidden="true">
                <svg viewBox="0 0 200 200" className="spin-slow absolute inset-0 h-full w-full">
                  <defs>
                    <path id="gt-ring" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
                  </defs>
                  <text className="fill-white/80 text-[13px] uppercase">
                    <textPath href="#gt-ring" textLength="486" lengthAdjust="spacing">
                      Leave no trace · carry it down · weigh it ·
                    </textPath>
                  </text>
                </svg>
                <span className="absolute inset-0 m-auto inline-flex h-16 w-16 items-center justify-center rounded-full bg-white text-pine-600">
                  <Leaf size={24} />
                </span>
              </div>
            </div>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

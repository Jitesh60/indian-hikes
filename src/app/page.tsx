import Link from "next/link";
import { ArrowUpRight, Leaf, Activity, Radio } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { RidgeHero } from "@/components/viz/RidgeHero";
import { TrekRow } from "@/components/site/TrekViews";
import { SectionHead, Button, Pill } from "@/components/site/ui";
import { AltitudeLadder } from "@/components/site/AltitudeLadder";
import { treks, departures } from "@/data/treks";
import { stories } from "@/data/stories";
import { inr, band } from "@/lib/types";

export default function HomePage() {
  const upcoming = departures.filter((d) => d.status !== "full").slice(0, 6);
  const featured = [...treks].sort((a, b) => b.reviews - a.reviews).slice(0, 6);
  const totalSlots = departures.reduce((s, d) => s + (d.capacity - d.booked), 0);

  return (
    <>
      {/* ── Hero: a dark sky panel with the ridge of treks drawn across it ── */}
      <div className="bg-spruce-900 contours text-snow-100">
        <SiteHeader variant="dark" />
        <section className="mx-auto max-w-[1360px] px-5 sm:px-8 pt-14 pb-14 sm:pt-20 sm:pb-16">
          <div className="grid lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)] gap-y-12 gap-x-16 items-start">
            <div className="rise">
              <p className="text-bugyal-400 text-[14px] mb-5">
                Departures open through November 2027
              </p>
              <h1 className="font-display text-[clamp(2.7rem,6.4vw,4.4rem)] leading-[0.98] text-snow-50">
                Every trek is a question about altitude.
              </h1>
              <p className="mt-6 text-[17px] leading-relaxed text-glacier-200/75 max-w-[40ch]">
                So we sorted them that way. Fifteen Himalayan routes arranged by
                the height they ask you to reach — pick the one that matches where
                your body is now, not where you wish it were.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/treks"
                  className="bg-bugyal-500 text-spruce-900 font-semibold px-6 py-3.5 hover:bg-bugyal-400 transition-colors"
                >
                  Browse all treks
                </Link>
                <Link
                  href="/departures"
                  className="border border-glacier-700/60 text-snow-100 font-semibold px-6 py-3.5 hover:border-glacier-400 transition-colors"
                >
                  See open dates
                </Link>
              </div>
              <p className="nums mt-7 text-[13.5px] text-glacier-400/70">
                {totalSlots.toLocaleString("en-IN")} slots open across{" "}
                {departures.length.toLocaleString("en-IN")} departures
              </p>
            </div>

            <div className="on-dark min-w-0">
              <RidgeHero treks={treks} />
            </div>
          </div>
        </section>
      </div>

      {/* ── A live strip of what is actually leaving next ── */}
      <section className="border-b border-snow-300 bg-snow-50">
        <div className="mx-auto max-w-[1360px] px-5 sm:px-8 py-4">
          <div className="flex items-center gap-5 overflow-x-auto thin-scroll">
            <span className="flex items-center gap-2 text-[13px] font-semibold text-rhodo-600 whitespace-nowrap shrink-0">
              <Radio size={14} />
              Leaving next
            </span>
            {upcoming.map((d) => {
              const t = treks.find((x) => x.slug === d.trek)!;
              const left = d.capacity - d.booked;
              return (
                <Link
                  key={d.id}
                  href={`/treks/${t.slug}`}
                  className="flex items-baseline gap-2.5 whitespace-nowrap text-[13.5px] hover:text-deodar-600 transition-colors shrink-0"
                >
                  <span className="font-semibold">{t.name}</span>
                  <span className="nums text-snow-500">
                    {new Date(d.start).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                  </span>
                  <span className={`nums ${left <= 3 ? "text-rhodo-600" : "text-snow-400"}`}>
                    {left} left
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── The altitude ladder: the site's organising idea, made usable ── */}
      <section className="mx-auto max-w-[1360px] px-5 sm:px-8 py-20 sm:py-24">
        <SectionHead
          title="Start with the height, not the name"
          intro="Altitude is what your body will notice, and it is the single best predictor of whether a trek will suit you. Pick a band and see what lives there."
        />
        <AltitudeLadder treks={treks} />
      </section>

      {/* ── Green Trails, as a dark counterpoint ── */}
      <section className="bg-deodar-700 text-snow-100 contours">
        <div className="mx-auto max-w-[1360px] px-5 sm:px-8 py-20 sm:py-24">
          <div className="grid lg:grid-cols-[1.05fr_1fr] gap-14 items-center">
            <div>
              <span className="inline-flex items-center gap-2 text-bugyal-400 text-[14px] mb-5">
                <Leaf size={16} />
                Green Trails
              </span>
              <h2 className="font-display text-[clamp(2rem,4vw,3rem)] leading-[1.05] text-snow-50">
                Every group comes down carrying something that was not theirs.
              </h2>
              <p className="mt-5 text-[16.5px] leading-relaxed text-snow-200/75 measure">
                It started in 2013 as one bag per group. It is now a weighing
                scale at every basecamp, a sorting shed at four of them, and a
                published record of what came off each trail. Marked departures
                go further — smaller groups, a dedicated coordinator, and a full
                day spent on the trail rather than on it.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link
                  href="/green-trails"
                  className="bg-bugyal-500 text-spruce-900 font-semibold px-5 py-3 hover:bg-bugyal-400 transition-colors"
                >
                  How it works
                </Link>
                <Link
                  href="/treks?green=1"
                  className="border border-snow-100/25 px-5 py-3 font-semibold hover:border-snow-100/60 transition-colors"
                >
                  Green Trails departures
                </Link>
              </div>
            </div>

            <dl className="grid grid-cols-2 gap-px bg-snow-100/15">
              {[
                ["31,400 kg", "Waste brought down since 2013"],
                ["68%", "Of it multi-layer plastic"],
                ["11", "Basecamps with sorting sheds"],
                ["1,940", "Trekkers on marked departures last year"],
              ].map(([n, l]) => (
                <div key={l} className="bg-deodar-700 p-6">
                  <dt className="nums font-display text-[clamp(1.6rem,3vw,2.3rem)] text-bugyal-400 leading-none">
                    {n}
                  </dt>
                  <dd className="mt-2.5 text-[14px] text-snow-200/70 leading-snug">{l}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ── The register ── */}
      <section className="mx-auto max-w-[1360px] px-5 sm:px-8 py-20 sm:py-24">
        <SectionHead
          title="The treks people keep coming back to"
          intro="Ranked by how many trekkers have finished them and written in afterwards."
          action={{ href: "/treks", label: "All 15 treks" }}
        />
        <div className="border-t border-snow-300">
          {featured.map((t, i) => (
            <TrekRow key={t.slug} trek={t} index={i} />
          ))}
        </div>
      </section>

      {/* ── How altitude is handled: the trust section, built on the same idea ── */}
      <section className="bg-snow-50 border-y border-snow-300">
        <div className="mx-auto max-w-[1360px] px-5 sm:px-8 py-20 sm:py-24">
          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-14">
            <div>
              <span className="inline-flex items-center gap-2 text-rhodo-600 text-[14px] mb-5">
                <Activity size={16} />
                On the mountain
              </span>
              <h2 className="font-display text-[clamp(2rem,4vw,2.9rem)] leading-[1.06]">
                We measure the thing that hurts people, twice a day.
              </h2>
              <p className="mt-5 text-[16.5px] leading-relaxed text-spruce-800/70 measure">
                Blood oxygen and resting pulse are recorded for every trekker
                every morning and evening, written into the trek log, and
                carried down. A reading that does not recover overnight ends a
                trek — the leader decides, not the trekker, and not us in the
                office.
              </p>
              <Button href="/safety" variant="outline" className="mt-8">
                Read the altitude protocol
              </Button>
            </div>

            <div className="grid sm:grid-cols-2 gap-px bg-snow-300 border border-snow-300">
              {[
                {
                  h: "Oximeter on every trek",
                  b: "Two readings a day per trekker, logged against name and campsite.",
                },
                {
                  h: "Oxygen and a pressure bag",
                  b: "Carried above 11,000 ft on every route, not only the difficult ones.",
                },
                {
                  h: "One leader per twelve",
                  b: "Plus a technical guide and enough support staff to send someone down mid-day.",
                },
                {
                  h: "Evacuation rehearsed",
                  b: "Each basecamp has a written descent plan and a named driver on call.",
                },
              ].map((c) => (
                <div key={c.h} className="bg-snow-50 p-7">
                  <h3 className="font-display-tight text-[19px] leading-tight">{c.h}</h3>
                  <p className="mt-2.5 text-[14.5px] leading-relaxed text-spruce-800/65">{c.b}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Stories ── */}
      <section className="mx-auto max-w-[1360px] px-5 sm:px-8 py-20 sm:py-24">
        <SectionHead
          title="Written on the way down"
          intro="Field notes from leaders, and accounts from people who finished — or decided not to."
          action={{ href: "/stories", label: "All stories" }}
        />
        <div className="grid md:grid-cols-3 gap-px bg-snow-300 border border-snow-300">
          {stories.slice(0, 3).map((s) => {
            const t = treks.find((x) => x.slug === s.trek);
            return (
              <Link key={s.slug} href={`/stories/${s.slug}`} className="group bg-snow-100 p-7 hover:bg-snow-50 transition-colors">
                <Pill tone={s.category === "Green Trails" ? "green" : s.category === "Safety" ? "red" : "neutral"}>
                  {s.category}
                </Pill>
                <h3 className="font-display-tight text-[21px] leading-tight mt-4 group-hover:text-deodar-600 transition-colors">
                  {s.title}
                </h3>
                <p className="mt-2.5 text-[14.5px] leading-relaxed text-spruce-800/65">{s.standfirst}</p>
                <p className="nums mt-5 text-[12.5px] text-snow-500">
                  {s.author} · {s.minutes} min{t ? ` · ${t.name}` : ""}
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── Closing call ── */}
      <section className="bg-spruce-900 text-snow-100 contours">
        <div className="mx-auto max-w-[1360px] px-5 sm:px-8 py-20 sm:py-24 text-center">
          <h2 className="font-display text-[clamp(2.1rem,5vw,3.4rem)] leading-[1.04] text-snow-50 max-w-[18ch] mx-auto">
            The window for winter opens in six weeks.
          </h2>
          <p className="mt-5 text-[17px] text-glacier-200/70 max-w-[52ch] mx-auto leading-relaxed">
            Snow arrives on the Sankri treks in the second week of December and
            stays through March. Those departures fill first.
          </p>
          <div className="mt-9 flex flex-wrap gap-3 justify-center">
            <Link
              href="/treks?snow=1"
              className="bg-bugyal-500 text-spruce-900 font-semibold px-6 py-3.5 hover:bg-bugyal-400 transition-colors"
            >
              Winter treks
            </Link>
            <Link
              href="/departures"
              className="border border-glacier-700/60 px-6 py-3.5 font-semibold hover:border-glacier-400 transition-colors inline-flex items-center gap-2"
            >
              Departure calendar
              <ArrowUpRight size={17} />
            </Link>
          </div>
          <p className="nums mt-8 text-[13.5px] text-glacier-400/60">
            Lowest winter price {inr(Math.min(...treks.filter((t) => t.snow).map((t) => t.price)))} ·
            highest camp {Math.max(...treks.map((t) => t.maxAltFt)).toLocaleString("en-IN")} ft ·{" "}
            {band(Math.max(...treks.map((t) => t.maxAltFt))).label}
          </p>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}

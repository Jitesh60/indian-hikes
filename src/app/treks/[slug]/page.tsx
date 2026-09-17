import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Leaf, Check, Minus, Heart, Share2 } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { RidgeArt } from "@/components/viz/RidgeArt";
import { AltitudeProfile } from "@/components/viz/AltitudeProfile";
import { DepartureList } from "@/components/site/DepartureList";
import { TrekCard } from "@/components/site/TrekViews";
import { DifficultyMeter, Pill } from "@/components/site/ui";
import { treks, trekBySlug, departuresFor } from "@/data/treks";
import { stories } from "@/data/stories";
import { band, ft2m, inr } from "@/lib/types";

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

  return (
    <>
      {/* ── Masthead ── */}
      <div className="bg-spruce-900 text-snow-100 relative overflow-hidden">
        <div className="absolute inset-0 opacity-45">
          <RidgeArt seed={trek.slug} tone="dark" className="w-full h-full" snowline={false} />
        </div>
        <div className="relative">
          <SiteHeader variant="dark" />
          <div className="mx-auto max-w-[1360px] px-5 sm:px-8 pt-12 pb-14 sm:pt-16 sm:pb-16">
            <nav aria-label="Breadcrumb" className="text-[13.5px] text-glacier-400 mb-6">
              <Link href="/treks" className="hover:text-snow-100 transition-colors">
                All treks
              </Link>
              <span className="mx-2 text-glacier-700">/</span>
              <span>{trek.state}</span>
            </nav>

            <div className="grid lg:grid-cols-[1.35fr_1fr] gap-x-16 gap-y-8 items-end">
              <div>
                <h1 className="font-display text-[clamp(2.7rem,6.5vw,4.6rem)] leading-[0.97] text-snow-50">
                  {trek.name}
                </h1>
                <p className="mt-4 text-[18px] leading-snug text-glacier-200/80 max-w-[46ch]">
                  {trek.tagline}
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-2.5">
                  <span className="inline-block border border-glacier-700/60 px-2.5 py-1 text-[12.5px] text-glacier-200">
                    {trek.region}, {trek.state}
                  </span>
                  {trek.greenTrails && (
                    <span className="inline-flex items-center gap-1.5 bg-deodar-600 px-2.5 py-1 text-[12.5px] text-snow-50">
                      <Leaf size={12} /> Green Trails route
                    </span>
                  )}
                  <span className="nums inline-block border border-glacier-700/60 px-2.5 py-1 text-[12.5px] text-glacier-200">
                    ★ {trek.rating} from {trek.reviews.toLocaleString("en-IN")} trekkers
                  </span>
                </div>
              </div>

              <dl className="on-dark grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-px bg-glacier-700/30 border border-glacier-700/30">
                {[
                  ["Highest point", `${trek.maxAltFt.toLocaleString("en-IN")} ft`, `${ft2m(trek.maxAltFt).toLocaleString("en-IN")} m · ${topBand.label}`],
                  ["On the trail", `${trek.days} days`, `${trek.trailKm} km walking`],
                  ["Starts from", trek.basecamp, `Railhead ${trek.railhead}`],
                  ["Trek fee", inr(trek.price), "Excludes transport"],
                ].map(([l, v, s]) => (
                  <div key={l} className="bg-spruce-900/80 px-4 py-3.5">
                    <dt className="text-[11.5px] text-glacier-400">{l}</dt>
                    <dd className="nums text-[18px] font-semibold text-snow-50 mt-1 leading-none">{v}</dd>
                    <dd className="nums text-[11.5px] text-glacier-400/70 mt-1.5">{s}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>

      {/* ── Sticky action bar ── */}
      <div className="sticky top-0 z-20 bg-snow-50 border-b border-snow-300">
        <div className="mx-auto max-w-[1360px] px-5 sm:px-8 py-3 flex items-center justify-between gap-5">
          <div className="flex items-center gap-5 min-w-0 overflow-x-auto thin-scroll">
            <DifficultyMeter difficulty={trek.difficulty} />
            <span className="nums text-[13.5px] text-snow-500 whitespace-nowrap">
              {trek.seasons.join(" · ")}
            </span>
            <span className="nums text-[13.5px] text-snow-500 whitespace-nowrap hidden sm:inline">
              {openSlots} slots open
            </span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button aria-label="Save this trek" className="p-2.5 border border-snow-300 hover:border-spruce-800 transition-colors">
              <Heart size={16} />
            </button>
            <button aria-label="Share this trek" className="p-2.5 border border-snow-300 hover:border-spruce-800 transition-colors">
              <Share2 size={16} />
            </button>
            <a
              href="#departures"
              className="bg-bugyal-500 text-spruce-900 px-5 py-2.5 text-[14.5px] font-semibold hover:bg-bugyal-400 transition-colors"
            >
              Pick a date
            </a>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-[1360px] px-5 sm:px-8">
        {/* ── The profile: this trek's signature ── */}
        <section className="py-14 sm:py-16 border-b border-snow-300">
          <h2 className="font-display text-[clamp(1.7rem,3.2vw,2.3rem)] leading-tight mb-2">
            What the {trek.days} days look like as a line
          </h2>
          <p className="text-[16px] text-spruce-800/65 measure mb-8">
            Every camp plotted at its real height. The colour under the line is the
            altitude band you are sleeping in that night.
          </p>
          <div className="text-spruce-800">
            <div className="sm:hidden">
              <AltitudeProfile profile={trek.profile} height={560} fontScale={2.4} />
            </div>
            <div className="hidden sm:block">
              <AltitudeProfile profile={trek.profile} height={330} />
            </div>
          </div>
        </section>

        <div className="grid lg:grid-cols-[minmax(0,1fr)_340px] gap-x-16 py-14 sm:py-16">
          <div className="min-w-0">
            <section>
              <h2 className="font-display text-[clamp(1.7rem,3.2vw,2.3rem)] leading-tight">
                About this trek
              </h2>
              <p className="mt-5 text-[17.5px] leading-[1.65] text-spruce-800/85 measure">
                {trek.summary}
              </p>

              <ul className="mt-9 space-y-5 border-l-2 border-bugyal-500 pl-6">
                {trek.whyThis.map((w) => (
                  <li key={w} className="text-[16px] leading-relaxed text-spruce-800/80 measure">
                    {w}
                  </li>
                ))}
              </ul>
            </section>

            {/* Itinerary — genuinely a sequence, so it is numbered */}
            <section className="mt-16">
              <h2 className="font-display text-[clamp(1.7rem,3.2vw,2.3rem)] leading-tight mb-8">
                Day by day
              </h2>
              <ol className="relative">
                {trek.profile.map((d, i) => {
                  const b = band(d.altFt);
                  const prev = i > 0 ? trek.profile[i - 1].altFt : d.altFt;
                  const delta = d.altFt - prev;
                  return (
                    <li key={d.day} className="grid grid-cols-[40px_1fr] gap-x-5 pb-8 last:pb-0 relative">
                      {i < trek.profile.length - 1 && (
                        <span
                          className="absolute left-[19px] top-9 bottom-0 w-px bg-snow-300"
                          aria-hidden="true"
                        />
                      )}
                      <span
                        className="nums relative z-10 w-10 h-10 flex items-center justify-center text-[14px] font-semibold text-snow-50 shrink-0"
                        style={{ background: b.color }}
                      >
                        {d.day}
                      </span>
                      <div className="pt-1.5">
                        <h3 className="font-display-tight text-[20px] leading-tight">{d.label}</h3>
                        <p className="nums text-[13px] text-snow-500 mt-1">
                          {d.altFt.toLocaleString("en-IN")} ft
                          {d.km > 0 && ` · ${d.km} km on foot`}
                          {i > 0 && delta !== 0 && (
                            <span className={delta > 0 ? " text-deodar-600" : " text-glacier-700"}>
                              {` · ${delta > 0 ? "+" : "−"}${Math.abs(delta).toLocaleString("en-IN")} ft`}
                            </span>
                          )}
                        </p>
                        <p className="mt-2 text-[15.5px] leading-relaxed text-spruce-800/75 measure">
                          {d.note}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </section>

            {/* Fitness */}
            <section className="mt-16 border border-snow-300 bg-snow-50 p-7 sm:p-9">
              <h2 className="font-display text-[clamp(1.5rem,2.6vw,2rem)] leading-tight">
                Before we confirm you
              </h2>
              <p className="mt-4 text-[16px] leading-relaxed text-spruce-800/75 measure">
                {trek.fitnessNote}
              </p>
              <div className="mt-7 flex flex-wrap gap-x-12 gap-y-5">
                <div>
                  <p className="text-[12.5px] text-snow-500 mb-1">Target to hit before you arrive</p>
                  <p className="nums font-display-tight text-[24px] leading-none">{trek.fitnessTarget}</p>
                </div>
                <div>
                  <p className="text-[12.5px] text-snow-500 mb-1">Grade</p>
                  <div className="pt-1">
                    <DifficultyMeter difficulty={trek.difficulty} size="md" />
                  </div>
                </div>
              </div>
              <Link
                href="/fitness"
                className="inline-block mt-7 text-[15px] font-semibold border-b-2 border-bugyal-500 pb-0.5 hover:border-spruce-800 transition-colors"
              >
                How we check fitness
              </Link>
            </section>

            {/* Inclusions */}
            <section className="mt-16">
              <h2 className="font-display text-[clamp(1.7rem,3.2vw,2.3rem)] leading-tight mb-7">
                What the fee covers
              </h2>
              <div className="grid sm:grid-cols-2 gap-x-10 gap-y-8">
                <div>
                  <h3 className="text-[14px] font-semibold mb-3.5 text-deodar-600">Included</h3>
                  <ul className="space-y-2.5">
                    {trek.included.map((i) => (
                      <li key={i} className="flex gap-2.5 text-[15px] leading-snug text-spruce-800/80">
                        <Check size={16} className="text-deodar-500 shrink-0 mt-0.5" />
                        {i}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-[14px] font-semibold mb-3.5 text-rhodo-600">Not included</h3>
                  <ul className="space-y-2.5">
                    {trek.excluded.map((i) => (
                      <li key={i} className="flex gap-2.5 text-[15px] leading-snug text-spruce-800/80">
                        <Minus size={16} className="text-rhodo-500 shrink-0 mt-0.5" />
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
                className="group block mt-16 border border-snow-300 p-7 hover:bg-snow-50 transition-colors"
              >
                <Pill tone="gold">From the field</Pill>
                <h3 className="font-display-tight text-[22px] leading-tight mt-3.5 group-hover:text-deodar-600 transition-colors">
                  {related_story.title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-spruce-800/65 measure">
                  {related_story.standfirst}
                </p>
                <p className="nums mt-4 text-[13px] text-snow-500">
                  {related_story.author} · {related_story.minutes} min read
                </p>
              </Link>
            )}
          </div>

          {/* ── Booking rail ── */}
          <aside className="mt-14 lg:mt-0">
            <div className="lg:sticky lg:top-[88px] border border-snow-300 bg-snow-50">
              <div className="p-6 border-b border-snow-300">
                <p className="text-[13px] text-snow-500">Trek fee per person</p>
                <p className="nums font-display text-[34px] leading-none mt-1.5">{inr(trek.price)}</p>
                <p className="text-[13px] text-snow-500 mt-2">
                  Plus {inr(2400)} for shared transport from {trek.railhead}, if you want it.
                </p>
              </div>
              <dl className="p-6 space-y-3.5 text-[14px] border-b border-snow-300">
                {[
                  ["Grade", trek.difficulty],
                  ["Season", trek.seasons.join(", ")],
                  ["Group size", trek.difficulty === "Difficult" ? "15 maximum" : "20 maximum"],
                  ["Pick-up", `${trek.railhead}, 6:30 am`],
                  ["Slots open", `${openSlots} across ${deps.length} dates`],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-5">
                    <dt className="text-snow-500 shrink-0">{k}</dt>
                    <dd className="nums text-right">{v}</dd>
                  </div>
                ))}
              </dl>
              <div className="p-6">
                <a
                  href="#departures"
                  className="block text-center bg-bugyal-500 text-spruce-900 px-5 py-3.5 font-semibold hover:bg-bugyal-400 transition-colors"
                >
                  Choose your dates
                </a>
                <p className="text-[12.5px] text-snow-500 mt-3.5 leading-relaxed">
                  Free to cancel up to 30 days before departure. After that the refund
                  drops on a published scale.
                </p>
              </div>
            </div>
          </aside>
        </div>

        {/* ── Departures ── */}
        <section id="departures" className="py-14 sm:py-16 border-t border-snow-300 scroll-mt-20">
          <h2 className="font-display text-[clamp(1.9rem,3.6vw,2.6rem)] leading-tight mb-2">
            Open departures
          </h2>
          <p className="text-[16px] text-spruce-800/65 measure mb-9">
            Slot counts update as people book. Departures marked with a leaf run smaller
            groups and spend a day on waste recovery.
          </p>
          <DepartureList departures={deps} slug={trek.slug} price={trek.price} />
        </section>

        {/* ── Related ── */}
        <section className="py-14 sm:py-16 border-t border-snow-300">
          <h2 className="font-display text-[clamp(1.9rem,3.6vw,2.6rem)] leading-tight mb-2">
            If this one is not right
          </h2>
          <p className="text-[16px] text-spruce-800/65 measure mb-9">
            Three treks that sit at a similar height, so they will ask something similar of you.
          </p>
          <div className="grid sm:grid-cols-3 gap-x-7 gap-y-10">
            {related.map((t) => (
              <TrekCard key={t.slug} trek={t} />
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}

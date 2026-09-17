import type { Metadata } from "next";
import Link from "next/link";
import { Leaf, Scale, Recycle, Users } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { treks } from "@/data/treks";

export const metadata: Metadata = {
  title: "Green Trails",
  description:
    "What Green Trails is, how waste gets weighed and sorted, and which departures run it.",
};

const WASTE = [
  { label: "Multi-layer plastic", kg: 21400, color: "#b23a48" },
  { label: "Glass", kg: 5100, color: "#6e93a6" },
  { label: "Tin and aluminium", kg: 2800, color: "#d4a22b" },
  { label: "Cloth and rubber", kg: 1300, color: "#4c8770" },
  { label: "Paper", kg: 800, color: "#1f4438" },
];

export default function GreenTrailsPage() {
  const total = WASTE.reduce((s, w) => s + w.kg, 0);
  const greenTreks = treks.filter((t) => t.greenTrails);

  return (
    <>
      <div className="bg-deodar-700 text-snow-100 contours">
        <SiteHeader variant="dark" />
        <div className="mx-auto max-w-[1360px] px-5 sm:px-8 py-16 sm:py-24">
          <span className="inline-flex items-center gap-2 text-bugyal-400 text-[14px] mb-5">
            <Leaf size={16} />
            Since 2013
          </span>
          <h1 className="font-display text-[clamp(2.6rem,6vw,4.4rem)] leading-[0.99] text-snow-50 max-w-[19ch]">
            Leave the mountain better than you found it.
          </h1>
          <p className="mt-6 text-[18px] leading-relaxed text-snow-200/75 max-w-[56ch]">
            It began as a rule of thumb — one bag of waste per group, carried down.
            Thirteen years later it is a weighing scale at every basecamp, a sorting
            shed at eleven of them, and a public record of what came off each trail.
          </p>
        </div>
      </div>

      <main>
        <section className="mx-auto max-w-[1360px] px-5 sm:px-8 py-16 sm:py-20">
          <div className="grid lg:grid-cols-[1fr_1.15fr] gap-x-16 gap-y-10">
            <div>
              <h2 className="font-display text-[clamp(1.9rem,3.6vw,2.6rem)] leading-tight">
                What came down, by category
              </h2>
              <p className="mt-4 text-[16.5px] leading-relaxed text-spruce-800/70 measure">
                Every bag is weighed at the basecamp before it goes anywhere. These are
                the totals across all routes since we started counting, in kilograms.
              </p>
              <p className="nums mt-8 font-display text-[clamp(3rem,7vw,4.5rem)] leading-none text-deodar-600">
                {total.toLocaleString("en-IN")} kg
              </p>
              <p className="text-[14px] text-snow-500 mt-2">Brought down and processed</p>
            </div>

            <div>
              {WASTE.map((w) => (
                <div key={w.label} className="py-4 border-b border-snow-300 first:border-t">
                  <div className="flex justify-between items-baseline gap-5 mb-2">
                    <span className="text-[16px]">{w.label}</span>
                    <span className="nums text-[15px] font-semibold">
                      {w.kg.toLocaleString("en-IN")} kg
                    </span>
                  </div>
                  <div className="h-2.5 bg-snow-200" aria-hidden="true">
                    <div
                      className="h-full"
                      style={{ width: `${(w.kg / total) * 100}%`, background: w.color }}
                    />
                  </div>
                  <p className="nums text-[12.5px] text-snow-500 mt-1.5">
                    {Math.round((w.kg / total) * 100)}% of everything collected
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-snow-50 border-y border-snow-300">
          <div className="mx-auto max-w-[1360px] px-5 sm:px-8 py-16 sm:py-20">
            <h2 className="font-display text-[clamp(1.9rem,3.6vw,2.6rem)] leading-tight mb-3">
              How it works on the ground
            </h2>
            <p className="text-[16.5px] text-spruce-800/70 measure mb-10">
              Four things happen on every Green Trails departure. None of them are optional.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-snow-300 border border-snow-300">
              {[
                { icon: Leaf, h: "An eco-bag each", b: "Handed out at basecamp, clipped to your rucksack, emptied at the next camp." },
                { icon: Scale, h: "Weighed and logged", b: "Every collection is weighed against the departure, not the group, so the record is honest." },
                { icon: Recycle, h: "Sorted, not dumped", b: "Five streams. Plastic goes to a cement kiln, metal to a scrap dealer, glass back to a bottler." },
                { icon: Users, h: "Smaller groups", b: "Twelve rather than twenty, with a coordinator whose only job is the recovery work." },
              ].map((c) => {
                const Icon = c.icon;
                return (
                  <div key={c.h} className="bg-snow-50 p-7">
                    <Icon size={22} className="text-deodar-600" />
                    <h3 className="font-display-tight text-[19px] leading-tight mt-4">{c.h}</h3>
                    <p className="mt-2.5 text-[14.5px] leading-relaxed text-spruce-800/65">{c.b}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1360px] px-5 sm:px-8 py-16 sm:py-20">
          <h2 className="font-display text-[clamp(1.9rem,3.6vw,2.6rem)] leading-tight mb-3">
            Routes that run Green Trails departures
          </h2>
          <p className="text-[16.5px] text-spruce-800/70 measure mb-9">
            {greenTreks.length} of our {treks.length} treks have at least one marked
            departure a month in season.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-snow-300 border border-snow-300">
            {greenTreks.map((t) => (
              <Link
                key={t.slug}
                href={`/treks/${t.slug}`}
                className="group bg-snow-100 p-6 hover:bg-snow-50 transition-colors"
              >
                <h3 className="font-display-tight text-[20px] leading-tight group-hover:text-deodar-600 transition-colors">
                  {t.name}
                </h3>
                <p className="nums text-[13px] text-snow-500 mt-1.5">
                  {t.state} · {t.maxAltFt.toLocaleString("en-IN")} ft · {t.days} days
                </p>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

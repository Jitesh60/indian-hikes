import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { RidgeArt } from "@/components/viz/RidgeArt";
import { Pill } from "@/components/site/ui";
import { stories } from "@/data/stories";
import { treks } from "@/data/treks";

export const metadata: Metadata = {
  title: "Stories",
  description: "Field notes from trek leaders and accounts from trekkers.",
};

const toneFor = (c: string) =>
  c === "Green Trails" ? "green" : c === "Safety" ? "red" : c === "Gear" ? "ice" : "neutral";

export default function StoriesPage() {
  const [lead, ...rest] = stories;
  const leadTrek = treks.find((t) => t.slug === lead.trek);

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-[1360px] px-5 sm:px-8 py-12 sm:py-16">
        <header className="mb-12 max-w-[58ch]">
          <h1 className="font-display text-[clamp(2.4rem,5vw,3.6rem)] leading-[1.02]">
            What we learned, written down
          </h1>
          <p className="mt-5 text-[17px] leading-relaxed text-spruce-800/70">
            Leaders write up what happened on a trek when they get back down. Some of it is
            useful to anyone going up next. That is what this is.
          </p>
        </header>

        <Link href={`/stories/${lead.slug}`} className="group block mb-16">
          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-x-12 gap-y-7 items-center">
            <div className="relative aspect-[16/10] overflow-hidden bg-spruce-800 order-last lg:order-first">
              <RidgeArt seed={lead.slug} tone="warm" className="w-full h-full" />
            </div>
            <div>
              <Pill tone={toneFor(lead.category)}>{lead.category}</Pill>
              <h2 className="font-display text-[clamp(1.9rem,4vw,2.9rem)] leading-[1.06] mt-4 group-hover:text-deodar-600 transition-colors">
                {lead.title}
              </h2>
              <p className="mt-4 text-[17px] leading-relaxed text-spruce-800/70 measure">
                {lead.standfirst}
              </p>
              <p className="nums mt-6 text-[13.5px] text-snow-500">
                {lead.author}, {lead.role} · {lead.minutes} min
                {leadTrek ? ` · ${leadTrek.name}` : ""}
              </p>
            </div>
          </div>
        </Link>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-12 border-t border-snow-300 pt-12">
          {rest.map((s) => {
            const t = treks.find((x) => x.slug === s.trek);
            return (
              <Link key={s.slug} href={`/stories/${s.slug}`} className="group block">
                <div className="relative aspect-[3/2] overflow-hidden bg-spruce-800 mb-4">
                  <RidgeArt seed={s.slug} tone={s.category === "Safety" ? "cool" : "warm"} className="w-full h-full" />
                </div>
                <Pill tone={toneFor(s.category)}>{s.category}</Pill>
                <h3 className="font-display-tight text-[22px] leading-tight mt-3 group-hover:text-deodar-600 transition-colors">
                  {s.title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-spruce-800/65">{s.standfirst}</p>
                <p className="nums mt-4 text-[13px] text-snow-500">
                  {s.author} · {s.minutes} min{t ? ` · ${t.name}` : ""}
                </p>
              </Link>
            );
          })}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

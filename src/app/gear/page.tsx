import type { Metadata } from "next";
import { ArrowDown, Check } from "lucide-react";
import { InfoShell, Panel, Prose, H2, Stat } from "@/components/site/InfoShell";
import { Reveal } from "@/components/site/motion";
import { Photo } from "@/components/site/Photo";
import { Button, Pill } from "@/components/site/ui";
import type { PhotoKey } from "@/data/photos";
import { inr } from "@/lib/types";

export const metadata: Metadata = {
  title: "What to carry",
  description: "A kit list by weight, with what to rent instead of buy.",
};

const KIT: {
  id: string;
  group: string;
  short: string;
  photo: PhotoKey;
  note: string;
  items: [string, string, "Buy" | "Rent"][];
}[] = [
  {
    id: "essentials",
    group: "The four that decide your trek",
    short: "Essentials",
    photo: "bootsGrass",
    note: "Get these right and the rest is detail. Get them wrong and nothing else helps.",
    items: [
      ["Trekking shoes with ankle support", "Worn in for at least 40 km before you arrive", "Buy"],
      ["A padded insulation layer", "Down or synthetic, rated to −10°C for winter treks", "Rent"],
      ["A 50–60 litre rucksack", "With a hip belt that actually takes the weight", "Rent"],
      ["A rain jacket and trousers", "Not a poncho. Wind is the real problem, not water", "Buy"],
    ],
  },
  {
    id: "layers",
    group: "Layers",
    short: "Layers",
    photo: "snowField",
    note: "Three thin layers beat one thick one, every time.",
    items: [
      ["Two quick-dry T-shirts", "Never cotton", "Buy"],
      ["Two fleece or wool layers", "One heavy, one light", "Buy"],
      ["Two trekking trousers", "Quick-dry, not jeans", "Buy"],
      ["Thermal base layer", "Top and bottom, for sleeping in above 11,000 ft", "Buy"],
    ],
  },
  {
    id: "accessories",
    group: "Accessories that people forget",
    short: "Accessories",
    photo: "bootsBench",
    note: "Every one of these has ended somebody's day at some point.",
    items: [
      ["Sunglasses rated for snow glare", "Category 3 or 4. Snow blindness is real and it is fast", "Buy"],
      ["A headlamp with fresh batteries", "Summit days start at 2 am", "Buy"],
      ["Two pairs of dry socks in a plastic bag", "The single best morale item on any trek", "Buy"],
      ["Sun cream, SPF 50", "Reapplied. Altitude burns faster than the beach", "Buy"],
      ["Trekking poles", "A pair, not one. They save your knees on descent", "Rent"],
    ],
  },
];

const RENTALS: [string, number][] = [
  ["Insulation jacket", 600],
  ["Rucksack, 55 litre", 450],
  ["Trekking poles, pair", 250],
];
const BUNDLE = 1200;

export default function GearPage() {
  return (
    <InfoShell
      photo="gearFlatlay"
      eyebrow="What to carry"
      title="Nine kilos, and most of it is not clothes"
      intro="A properly packed rucksack for a six-day winter trek weighs about nine kilograms with water in it. Most people arrive with twelve. Here is what actually earns its place."
    >
      <Panel>
        <div className="grid gap-x-14 gap-y-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] lg:items-center">
          <Prose>
            <p>
              The list below is what we send everyone who books. What is marked{" "}
              <Pill tone="gold">Rent</Pill> is worth renting from us rather than buying — a
              down jacket you will use once every two years is not a good purchase, and ours
              are cleaned and re-rated every season.
            </p>
          </Prose>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-[22px] bg-ink-900 p-5">
              <Stat value="9 kg" label="Packed properly" onDark />
            </div>
            <div className="rounded-[22px] bg-mist-100 p-5">
              <Stat value="12 kg" label="What most bring" />
            </div>
          </div>
        </div>
      </Panel>

      {/* Category tiles */}
      <nav aria-label="Kit categories" className="grid gap-3 sm:grid-cols-3 sm:gap-5">
        {KIT.map((k, i) => (
          <Reveal key={k.id} delay={i * 0.07}>
            <a
              href={`#${k.id}`}
              className="group relative block aspect-[4/3] overflow-hidden rounded-bento bg-ink-800 sm:aspect-[4/5] lg:aspect-[5/4]"
            >
              <Photo name={k.photo} width={900} alt="" imgClassName="transition-transform duration-700 group-hover:scale-[1.06]" />
              <div className="scrim-b absolute inset-0" aria-hidden="true" />
              <div className="absolute inset-x-3 bottom-3 flex items-end justify-between gap-3 sm:inset-x-4 sm:bottom-4">
                <div className="min-w-0">
                  <p className="nums text-[13px] text-white/70">{k.items.length} items</p>
                  <p className="mt-0.5 text-[22px] font-semibold leading-tight tracking-[-0.02em] text-white">{k.short}</p>
                </div>
                <span className="glass inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white transition-colors group-hover:bg-white group-hover:text-ink-900">
                  <ArrowDown size={17} />
                </span>
              </div>
            </a>
          </Reveal>
        ))}
      </nav>

      {KIT.map((section) => (
        <Panel key={section.id} id={section.id} className="scroll-mt-28">
          <H2 intro={section.note}>{section.group}</H2>
          <ul className="grid gap-2.5 md:grid-cols-2 md:gap-3">
            {section.items.map(([n, d, mode]) => (
              <li
                key={n}
                className="flex items-start gap-4 rounded-[20px] bg-mist-50 p-4 ring-1 ring-mist-200 sm:p-5"
              >
                <span
                  className={`mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                    mode === "Rent" ? "bg-sun-400 text-ink-900" : "bg-ink-900 text-white"
                  }`}
                  aria-hidden="true"
                >
                  <Check size={14} strokeWidth={2.5} />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-1.5">
                    <p className="text-[16px] font-semibold leading-snug text-ink-900">{n}</p>
                    <Pill tone={mode === "Rent" ? "gold" : "neutral"}>{mode}</Pill>
                  </div>
                  <p className="mt-1 text-[14.5px] leading-snug text-ink-500">{d}</p>
                </div>
              </li>
            ))}
          </ul>
        </Panel>
      ))}

      {/* Rental promo, MountEquip style */}
      <Panel tone="ice">
        <div className="grid gap-x-14 gap-y-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center">
          <div>
            <H2 eyebrow="Rental prices" intro="Collected at basecamp on day one, returned on the last day. Nothing to carry up from the city.">
              Rent the heavy things{" "}
              <span className="brush mt-2 inline-block whitespace-nowrap">at basecamp</span>
            </H2>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2">
            {RENTALS.map(([n, p]) => (
              <div key={n} className="rounded-[22px] bg-white p-5 shadow-soft">
                <p className="nums font-display text-[26px] leading-none text-ink-900">{inr(p)}</p>
                <p className="mt-2.5 text-[14px] leading-snug text-ink-600">{n}</p>
                <p className="mt-1 text-[12.5px] text-ink-400">For the whole trek</p>
              </div>
            ))}
            <div className="rounded-[22px] bg-ink-900 p-5">
              <p className="nums font-display text-[26px] leading-none text-white">{inr(BUNDLE)}</p>
              <p className="mt-2.5 text-[14px] leading-snug text-white/80">Full bundle</p>
              <p className="mt-1 text-[12.5px] text-white/50">For the whole trek</p>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <Button href="/treks">Pick a trek, then add rentals</Button>
        </div>
      </Panel>
    </InfoShell>
  );
}

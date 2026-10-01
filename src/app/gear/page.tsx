import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Check, MessageCircle } from "lucide-react";
import { InfoShell, Panel, Prose, H2, Stat } from "@/components/site/InfoShell";
import { Reveal } from "@/components/site/motion";
import { Photo } from "@/components/site/Photo";
import { Button, Pill } from "@/components/site/ui";
import type { PhotoKey } from "@/data/photos";
import { brand, whatsappHref } from "@/data/brand";

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

export default function GearPage() {
  return (
    <InfoShell
      photo="gearFlatlay"
      eyebrow="What to carry"
      title="Nine kilos, and most of it is not clothes"
      intro="A well-packed rucksack for a six-day winter trek weighs about nine kilograms with water in it. It is easy to carry more than you need. Here is what actually earns its place."
    >
      <Panel>
        <div className="grid gap-x-14 gap-y-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] lg:items-center">
          <Prose>
            <p>
              This is our packing guidance for a Himalayan trek. Anything marked{" "}
              <Pill tone="gold">Rent</Pill> is usually worth renting rather than buying — a
              down jacket you will use once every two years is not a good purchase. Ask us
              about rental options for your trek when you book.
            </p>
          </Prose>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-[22px] bg-ink-900 p-5">
              <Stat value="9 kg" label="Packed well" onDark />
            </div>
            <div className="rounded-[22px] bg-mist-100 p-5">
              <Stat value="50–60 L" label="Rucksack size" />
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

      {/* Help strip, MountEquip style */}
      <Panel tone="ice">
        <div className="grid gap-x-14 gap-y-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center">
          <div>
            <H2
              eyebrow="Not sure what to bring?"
              intro={`Every trek is a little different. Tell us which one you are doing and we will help you pack for it. ${brand.contact.responseTime}`}
            >
              Ask us before you{" "}
              <span className="brush mt-2 inline-block whitespace-nowrap">buy anything</span>
            </H2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 rounded-[22px] bg-ink-900 p-5 text-white transition-colors hover:bg-ink-700"
            >
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-forest-500">
                <MessageCircle size={18} />
              </span>
              <span className="min-w-0">
                <span className="block text-[16px] font-semibold">Chat on WhatsApp</span>
                <span className="block text-[13px] text-white/60">Send us your trek and dates</span>
              </span>
              <span className="sr-only">(opens in a new tab)</span>
            </a>
            <Link
              href="/stories/what-actually-goes-in-the-backpack"
              className="flex items-center gap-4 rounded-[22px] bg-white p-5 shadow-soft transition-colors hover:bg-mist-50"
            >
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ice-100 text-ink-900">
                <ArrowUpRight size={18} />
              </span>
              <span className="min-w-0">
                <span className="block text-[16px] font-semibold text-ink-900">What goes in the backpack</span>
                <span className="block text-[13px] text-ink-500">Our packing guide, by weight</span>
              </span>
            </Link>
          </div>
        </div>
        <div className="mt-8">
          <Button href="/treks">Pick a trek</Button>
        </div>
      </Panel>
    </InfoShell>
  );
}

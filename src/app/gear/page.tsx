import type { Metadata } from "next";
import { InfoShell, Prose, H2 } from "@/components/site/InfoShell";
import { inr } from "@/lib/types";

export const metadata: Metadata = {
  title: "What to carry",
  description: "A kit list by weight, with what to rent instead of buy.",
};

const KIT = [
  {
    group: "The four that decide your trek",
    note: "Get these right and the rest is detail. Get them wrong and nothing else helps.",
    items: [
      ["Trekking shoes with ankle support", "Worn in for at least 40 km before you arrive", "Buy"],
      ["A padded insulation layer", "Down or synthetic, rated to −10°C for winter treks", "Rent"],
      ["A 50–60 litre rucksack", "With a hip belt that actually takes the weight", "Rent"],
      ["A rain jacket and trousers", "Not a poncho. Wind is the real problem, not water", "Buy"],
    ],
  },
  {
    group: "Layers",
    note: "Three thin layers beat one thick one, every time.",
    items: [
      ["Two quick-dry T-shirts", "Never cotton", "Buy"],
      ["Two fleece or wool layers", "One heavy, one light", "Buy"],
      ["Two trekking trousers", "Quick-dry, not jeans", "Buy"],
      ["Thermal base layer", "Top and bottom, for sleeping in above 11,000 ft", "Buy"],
    ],
  },
  {
    group: "Accessories that people forget",
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
      title="Nine kilos, and most of it is not clothes"
      intro="A properly packed rucksack for a six-day winter trek weighs about nine kilograms with water in it. Most people arrive with twelve. Here is what actually earns its place."
    >
      <Prose>
        <p>
          The list below is what we send everyone who books. What is marked <em>Rent</em> is
          worth renting from us rather than buying — a down jacket you will use once every
          two years is not a good purchase, and ours are cleaned and re-rated every season.
        </p>
      </Prose>

      {KIT.map((section) => (
        <section key={section.group}>
          <H2>{section.group}</H2>
          <p className="text-[16px] text-spruce-800/65 measure -mt-2 mb-6">{section.note}</p>
          <div className="border-t border-snow-300">
            {section.items.map(([n, d, mode]) => (
              <div key={n} className="grid grid-cols-[1fr_auto] sm:grid-cols-[1.2fr_1.4fr_auto] gap-x-8 gap-y-1 py-4 border-b border-snow-300 items-baseline">
                <p className="text-[16.5px] font-semibold">{n}</p>
                <p className="col-span-2 sm:col-span-1 text-[14.5px] text-spruce-800/65 leading-snug">{d}</p>
                <span
                  className={`row-start-1 col-start-2 sm:row-auto sm:col-auto justify-self-end text-[12.5px] border px-2 py-[3px] ${
                    mode === "Rent"
                      ? "border-bugyal-600/40 text-bugyal-600 bg-bugyal-500/10"
                      : "border-snow-300 text-snow-500"
                  }`}
                >
                  {mode}
                </span>
              </div>
            ))}
          </div>
        </section>
      ))}

      <section>
        <H2>Rental prices</H2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-snow-300 border border-snow-300">
          {[
            ["Insulation jacket", 600],
            ["Rucksack, 55 litre", 450],
            ["Trekking poles, pair", 250],
            ["Full bundle", 1200],
          ].map(([n, p]) => (
            <div key={n as string} className="bg-snow-50 p-6">
              <p className="nums font-display text-[26px] leading-none">{inr(p as number)}</p>
              <p className="text-[14px] text-spruce-800/65 mt-2.5">{n}</p>
              <p className="text-[12.5px] text-snow-500 mt-1">For the whole trek</p>
            </div>
          ))}
        </div>
        <p className="text-[14px] text-snow-500 mt-4">
          Collected at basecamp on day one, returned on the last day. Nothing to carry up
          from the city.
        </p>
      </section>
    </InfoShell>
  );
}

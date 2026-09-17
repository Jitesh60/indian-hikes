import type { Metadata } from "next";
import Link from "next/link";
import { InfoShell, Prose, H2 } from "@/components/site/InfoShell";
import { treks } from "@/data/treks";
import { DIFFICULTY_ORDER } from "@/lib/types";

export const metadata: Metadata = {
  title: "Fitness standards",
  description: "What each grade asks of you, and how to get there from where you are.",
};

const WEEKS = [
  { w: "Weeks 1–2", goal: "3 km, any pace", note: "Four days a week. The point is the habit, not the time." },
  { w: "Weeks 3–4", goal: "4 km under 40 minutes", note: "Add one day of stairs or a hill. Legs, not lungs, are the limit here." },
  { w: "Weeks 5–6", goal: "5 km under 42 minutes", note: "Start walking with a loaded rucksack once a week." },
  { w: "Weeks 7–8", goal: "5 km under 38 minutes", note: "Or 10 km under 90 if you are going above 13,500 ft." },
];

export default function FitnessPage() {
  return (
    <InfoShell
      title="Fitness is the one thing you control"
      intro="You cannot control the weather, the snow or how your body handles altitude. You can control whether you arrive able to walk for six hours. Here is exactly what each grade asks for."
    >
      <section>
        <H2>What each grade asks for</H2>
        <div className="border-t border-snow-300">
          {DIFFICULTY_ORDER.map((d) => {
            const list = treks.filter((t) => t.difficulty === d);
            if (!list.length) return null;
            return (
              <div key={d} className="grid sm:grid-cols-[180px_1fr_auto] gap-x-8 gap-y-2 py-5 border-b border-snow-300">
                <p className="text-[16.5px] font-semibold">{d}</p>
                <div>
                  <p className="nums text-[15px]">{list[0].fitnessTarget}</p>
                  <p className="text-[14px] text-snow-500 mt-1">
                    {list.map((t) => t.name).join(", ")}
                  </p>
                </div>
                <p className="nums text-[14px] text-snow-500 whitespace-nowrap">
                  up to {Math.max(...list.map((t) => t.maxAltFt)).toLocaleString("en-IN")} ft
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section>
        <H2>Eight weeks from nothing</H2>
        <Prose>
          <p>
            This is the plan we send to anyone who tells us they do not currently run. It
            assumes you are starting from zero and have two months. If you have less time,
            pick an easier trek rather than compressing the plan.
          </p>
        </Prose>
        <ol className="mt-8 border-t border-snow-300">
          {WEEKS.map((w, i) => (
            <li key={w.w} className="grid grid-cols-[42px_1fr] gap-x-5 py-5 border-b border-snow-300">
              <span className="nums w-10 h-10 bg-spruce-800 text-snow-50 flex items-center justify-center text-[14px] font-semibold">
                {i + 1}
              </span>
              <div>
                <p className="text-[13px] text-snow-500">{w.w}</p>
                <p className="text-[18px] font-semibold mt-0.5">{w.goal}</p>
                <p className="text-[15px] text-spruce-800/70 mt-1.5 leading-relaxed measure">{w.note}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section>
        <H2>How we check</H2>
        <Prose>
          <p>
            For Easy and Moderate treks we take you at your word. You tell us where your
            fitness is when you book, and your trek leader has that note at basecamp.
          </p>
          <p>
            For Difficult treks — Rupin, Buran Ghati and Goechala — we ask for a record
            before we confirm the booking. A screenshot from any running app is enough. This
            is not gatekeeping for its own sake: on those three routes there is no easy way
            down from the middle of the trek.
          </p>
          <p>
            Nobody is turned away for being early in their training. We move people to a
            later departure or a different trek, and we hold the money.
          </p>
        </Prose>
        <Link
          href="/treks"
          className="inline-block mt-8 text-[16px] font-semibold border-b-2 border-bugyal-500 pb-0.5 hover:border-spruce-800 transition-colors"
        >
          Find a trek that matches where you are
        </Link>
      </section>
    </InfoShell>
  );
}

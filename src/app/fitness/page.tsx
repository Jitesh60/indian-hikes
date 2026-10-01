import type { Metadata } from "next";
import { InfoShell, Panel, Prose, H2, Stat, StepNo } from "@/components/site/InfoShell";
import { Reveal } from "@/components/site/motion";
import { Button, DifficultyMeter } from "@/components/site/ui";
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
  const difficult = treks.filter((t) => t.difficulty === "Difficult");

  return (
    <InfoShell
      photo="hikerPeak"
      eyebrow="Fitness standards"
      title="Fitness is the one thing you control"
      intro="You cannot control the weather, the snow or how your body handles altitude. You can control whether you arrive able to walk for six hours. Here is exactly what each grade asks for."
    >
      <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
        {[
          { v: "6 hrs", l: "Walking on a long day", dark: true },
          { v: "8 wks", l: "From zero to ready" },
          { v: "5 km", l: "The benchmark run" },
          { v: String(difficult.length), l: "Treks that need a record" },
        ].map((s, i) => (
          <Reveal key={s.l} delay={i * 0.06} className="h-full">
            <div
              className={`h-full rounded-bento p-5 sm:p-7 ${
                s.dark ? "bg-ink-900" : i === 2 ? "bg-ice-100" : "bg-white shadow-soft"
              }`}
            >
              <Stat value={s.v} label={s.l} onDark={s.dark} />
            </div>
          </Reveal>
        ))}
      </div>

      <Panel>
        <H2 eyebrow="By grade" intro="The run target for each grade, the treks it applies to and the highest point you will reach.">
          What each grade asks for
        </H2>
        <div className="grid gap-3">
          {DIFFICULTY_ORDER.map((d) => {
            const list = treks.filter((t) => t.difficulty === d);
            if (!list.length) return null;
            return (
              <div
                key={d}
                className="grid gap-x-8 gap-y-3 rounded-[22px] bg-mist-50 p-5 ring-1 ring-mist-200 sm:p-6 md:grid-cols-[200px_minmax(0,1fr)_auto] md:items-center"
              >
                <div className="text-ink-900">
                  <DifficultyMeter difficulty={d} size="md" />
                </div>
                <div className="min-w-0">
                  <p className="nums text-[16.5px] font-semibold text-ink-900">{list[0].fitnessTarget}</p>
                  <p className="mt-1 text-[14px] leading-snug text-ink-500">
                    {list.map((t) => t.name).join(", ")}
                  </p>
                </div>
                <p className="nums text-[13.5px] text-ink-500 md:text-right">
                  up to{" "}
                  <span className="text-[17px] font-semibold text-ink-900">
                    {Math.max(...list.map((t) => t.maxAltFt)).toLocaleString("en-IN")} ft
                  </span>
                </p>
              </div>
            );
          })}
        </div>
      </Panel>

      <Panel tone="ice">
        <div className="grid gap-x-14 gap-y-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <div>
            <H2 eyebrow="Training plan">Eight weeks from nothing</H2>
            <Prose>
              <p>
                This is the plan we send to anyone who tells us they do not currently run. It
                assumes you are starting from zero and have two months. If you have less time,
                pick an easier trek rather than compressing the plan.
              </p>
            </Prose>
          </div>
          <ol className="grid gap-3 sm:grid-cols-2">
            {WEEKS.map((w, i) => {
              const last = i === WEEKS.length - 1;
              return (
                <Reveal key={w.w} as="li" delay={i * 0.07} className="h-full">
                  <div
                    className={`flex h-full flex-col rounded-[22px] p-5 sm:p-6 ${
                      last ? "bg-ink-900 text-white" : "bg-white shadow-soft"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <StepNo n={i + 1} tone={last ? "ember" : "dark"} />
                      <span className={`text-[13px] ${last ? "text-white/60" : "text-ink-400"}`}>{w.w}</span>
                    </div>
                    <p className={`mt-6 text-[20px] font-semibold leading-tight tracking-[-0.02em] ${last ? "text-white" : "text-ink-900"}`}>
                      {w.goal}
                    </p>
                    <p className={`mt-2 text-[14.5px] leading-relaxed ${last ? "text-white/65" : "text-ink-500"}`}>
                      {w.note}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </Panel>

      <Panel>
        <div className="grid gap-x-14 gap-y-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] lg:items-end">
          <div>
            <H2 eyebrow="Before you book">How we check</H2>
            <Prose>
              <p>
                For Easy and Moderate treks we take you at your word. You tell us where your
                fitness is when you book, and your trek leader has that note at basecamp.
              </p>
              <p>
                For Difficult treks — {difficult.map((t) => t.name).join(", ").replace(/, ([^,]*)$/, " and $1")} — we ask for a record
                before we confirm the booking. A screenshot from any running app is enough. This
                is not gatekeeping for its own sake: on those routes there is no easy way
                down from the middle of the trek.
              </p>
              <p>
                Nobody is turned away for being early in their training. We move people to a
                later departure or a different trek, and we hold the money.
              </p>
            </Prose>
          </div>
          <div className="rounded-[22px] bg-ink-900 p-6 sm:p-7">
            <p className="text-[18px] font-semibold leading-snug text-white">
              Find a trek that matches where you are
            </p>
            <p className="mt-2 text-[14px] leading-relaxed text-white/60">
              Filter by grade, altitude and days.
            </p>
            <Button href="/treks" variant="light" className="mt-5 w-full sm:w-auto">
              Browse treks
            </Button>
          </div>
        </div>
      </Panel>
    </InfoShell>
  );
}

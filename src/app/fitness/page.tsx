import type { Metadata } from "next";
import { InfoShell, Panel, Prose, H2, Stat, StepNo } from "@/components/site/InfoShell";
import { Reveal } from "@/components/site/motion";
import Link from "next/link";
import { Button, DifficultyMeter } from "@/components/site/ui";
import { treks } from "@/data/treks";
import { DIFFICULTY_ORDER } from "@/lib/types";

export const metadata: Metadata = {
  title: "Fitness standards",
  description: "What each grade asks of you, and how to get there from where you are.",
};

/** A summary of our eight-week plan — the full version is on the stories page. */
const WEEKS = [
  { w: "Weeks 1–2", goal: "Build the base", note: "Brisk 30-minute walks every day, stairs up to 10 floors, squats and lunges three times a week." },
  { w: "Weeks 3–4", goal: "Add load", note: "Carry a 5–7 kg daypack on your walks and stair sessions, and stretch walks towards 45 minutes." },
  { w: "Weeks 5–6", goal: "Build endurance", note: "One long 2–3 hour loaded session each weekend, plus jogging or cycling — aim to run 5 km comfortably." },
  { w: "Weeks 7–8", goal: "Peak, then taper", note: "Your longest loaded walk in week seven, then ease off so you arrive rested, in boots you have broken in." },
];

export default function FitnessPage() {
  const difficult = treks.filter((t) => t.difficulty === "Difficult");

  return (
    <InfoShell
      photo="hikerPeak"
      eyebrow="Fitness standards"
      title="Fitness is the one thing you control"
      intro="You cannot control the weather, the snow or how your body handles altitude. You can control whether you arrive able to walk for six hours. Here is what each grade asks for."
    >
      <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
        {[
          { v: "6 hrs", l: "Walking on a long day", dark: true },
          { v: "8 wks", l: "From zero to ready" },
          { v: "5 km", l: "The benchmark run" },
          { v: String(difficult.length), l: "Difficult-grade treks" },
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
                Training for a Himalayan trek is less about brute strength and more about
                endurance, leg stamina and the grit to keep moving. This plan works even if you
                are starting from a desk job. If you have less time, pick an easier trek rather
                than compressing the plan.
              </p>
              <p>
                <Link
                  href="/stories/how-to-train-for-himalayan-trek-8-weeks"
                  className="font-medium text-ink-900 underline decoration-forest-500 decoration-2 underline-offset-4 hover:text-forest-600"
                >
                  Read the full eight-week plan
                </Link>
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
            <H2 eyebrow="Before you book">Be honest with us, and yourself</H2>
            <Prose>
              <p>
                When you book, tell us where your fitness really is. It helps us suggest the
                right trek, and it helps your trek leader look after you on the trail.
              </p>
              <p>
                It matters most on Difficult treks — {difficult.map((t) => t.name).join(", ").replace(/, ([^,]*)$/, " and $1")}. On
                those routes there is no easy way down from the middle of the trek, so arrive
                trained and with some Himalayan trekking behind you.
              </p>
              <p>
                Not quite ready yet? That is fine. Talk to us and we will help you find a trek
                that suits where you are now — or plan a customised trek at your own pace.
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

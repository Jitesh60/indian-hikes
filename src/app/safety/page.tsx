import type { Metadata } from "next";
import Link from "next/link";
import { Activity, Gauge, ArrowDown } from "lucide-react";
import { InfoShell, Panel, Prose, H2, Stat, StepNo } from "@/components/site/InfoShell";
import { Reveal } from "@/components/site/motion";
import { CountUp } from "@/components/fx";
import { brand } from "@/data/brand";

export const metadata: Metadata = {
  title: "Safety and altitude",
  description: `How ${brand.name} keeps trekkers safe at altitude — certified leaders, small groups and 24×7 support.`,
};

const { stats } = brand;

/** General altitude-sickness guidance — the signs every trekker should know. */
const BANDS = [
  {
    stage: "Mild",
    title: "Headache, poor appetite, bad sleep",
    action: "Rest, drink water, and do not go higher until it eases. Tell your leader.",
    icon: Activity,
    cls: "bg-pine-500/10",
    dot: "bg-pine-500",
    text: "text-pine-600",
  },
  {
    stage: "Not improving",
    title: "Symptoms that stay or get worse with rest",
    action: "No further ascent. Your leader decides whether you wait it out or head down.",
    icon: Gauge,
    cls: "bg-sun-400/25",
    dot: "bg-sun-400",
    text: "text-ink-800",
  },
  {
    stage: "Serious",
    title: "Confusion, unsteady walking, breathless at rest",
    action: "Descend straight away. Going down is the treatment that works.",
    icon: ArrowDown,
    cls: "bg-forest-500/10",
    dot: "bg-forest-500",
    text: "text-forest-600",
  },
];

const [, praveen] = brand.founders;

const PROMISES: [string, string][] = [
  ["Certified trek leaders", "Every group is led by trained, certified leaders who know the route personally."],
  ["Small groups", "Batches stay small, so leaders can watch every trekker, every day."],
  ["24×7 support", "Caring on-trail support, and someone at the end of the phone around the clock."],
  ["Routes we know", "We have personally walked every route we offer before we lead anyone on it."],
  [
    "Safety has an owner",
    `${praveen.name}, our ${praveen.role.toLowerCase()}, oversees trek quality and safety protocols himself.`,
  ],
  ["Gradual itineraries", "Treks are paced to give your body time to adjust to altitude, not to rush a summit."],
];

const CALLS = ["Whether a pass is crossed", "Whether a summit attempt goes ahead", "Whether someone needs to descend"];

export default function SafetyPage() {
  return (
    <InfoShell
      photo="snowTrekkers"
      eyebrow="Safety and altitude"
      title="Safe treks are the whole point"
      intro={`We have led more than ${stats.trekkers.toLocaleString("en-IN")} trekkers with zero serious incidents in ${stats.years} years. Here is how we think about altitude, weather and turning around — in plain words.`}
    >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-5">
        {[
          { v: <CountUp to={stats.trekkers} suffix="+" />, l: "Trekkers led safely", dark: true },
          { v: "Zero", l: `Serious incidents in ${stats.years} years` },
          { v: "24×7", l: "Support while you are on the trail" },
        ].map((s, i) => (
          <Reveal key={s.l} delay={i * 0.06} className="h-full">
            <div
              className={`h-full rounded-bento p-5 sm:p-7 ${
                s.dark ? "bg-ink-900" : i === 1 ? "bg-ice-100" : "bg-white shadow-soft"
              }`}
            >
              <Stat value={s.v} label={s.l} onDark={s.dark} />
            </div>
          </Reveal>
        ))}
      </div>

      <Panel>
        <div className="grid gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div>
            <H2 eyebrow="Altitude">Know the signs, say something early</H2>
            <Prose>
              <p>
                Altitude sickness has very little to do with how fit you are. It depends on how
                quickly you go up and how your body adjusts on the way — which is why our
                itineraries climb gradually and our leaders check in with every trekker through
                the day.
              </p>
              <p>
                What matters most is that you speak up. A headache on its own is ordinary; a
                headache with no appetite and a bad night, at altitude, is a signal. The earlier
                your leader knows, the simpler the fix. Read more in{" "}
                <Link
                  href="/stories/what-12000-feet-does-to-you"
                  className="font-medium text-ink-900 underline decoration-forest-500 decoration-2 underline-offset-4 hover:text-forest-600"
                >
                  what 12,000 feet does to you
                </Link>
                .
              </p>
            </Prose>
          </div>
          <div className="grid content-start gap-3">
            {BANDS.map((b, i) => {
              const Icon = b.icon;
              return (
                <Reveal key={b.stage} delay={i * 0.08}>
                  <div className={`flex items-start gap-4 rounded-[22px] p-5 sm:p-6 ${b.cls}`}>
                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-ink-900">
                      <Icon size={18} />
                    </span>
                    <div className="min-w-0">
                      <p className={`text-[13px] font-medium ${b.text}`}>
                        <span className={`mr-2 inline-block h-2 w-2 rounded-full ${b.dot}`} aria-hidden="true" />
                        {b.stage}
                      </p>
                      <p className="mt-1.5 text-[19px] font-semibold leading-snug tracking-[-0.02em] text-ink-900">
                        {b.title}
                      </p>
                      <p className="mt-2 text-[14.5px] leading-snug text-ink-600">{b.action}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
            <p className="px-1 text-[12.5px] text-ink-400">General guidance, not medical advice. Your leader&rsquo;s call on the day comes first.</p>
          </div>
        </div>
      </Panel>

      <Panel tone="none">
        <div className="px-1 pt-6 sm:px-2 sm:pt-10">
          <H2 eyebrow="On every trek" intro={brand.promise}>
            What keeps you safe
          </H2>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {PROMISES.map(([h, b], i) => (
            <Reveal key={h} delay={(i % 3) * 0.07} className="h-full">
              <div className="flex h-full flex-col rounded-bento bg-white p-6 shadow-soft sm:p-7">
                <StepNo n={i + 1} tone={i === 0 ? "ember" : "dark"} />
                <h3 className="mt-6 text-[19px] font-semibold leading-tight tracking-[-0.02em] text-ink-900">{h}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-500">{b}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Panel>

      <Panel tone="dark" className="on-dark">
        <div className="grid gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
          <div>
            <H2 eyebrow="Leader's call" onDark>
              The decisions that are the leader&rsquo;s
            </H2>
            <Prose onDark>
              <p>
                On the mountain, safety calls belong to the trek leader: whether a pass is
                crossed, whether a summit attempt goes ahead, and whether someone needs to
                descend. Weather and altitude do not negotiate, and neither can we.
              </p>
              <p>
                A leader who turns a group around is doing their job well. We would always rather
                bring you back another season than push on in conditions that are not right.
              </p>
            </Prose>
          </div>
          <div className="grid content-start gap-3">
            {CALLS.map((c, i) => (
              <div key={c} className="flex items-center gap-4 rounded-[22px] bg-white/[0.06] p-4 ring-1 ring-white/10 sm:p-5">
                <StepNo n={i + 1} tone="light" />
                <p className="text-[16px] font-medium leading-snug text-white">{c}</p>
              </div>
            ))}
            <div className="mt-2 rounded-[22px] bg-forest-500 p-5 sm:p-6">
              <p className="text-[13px] font-medium text-white/85">What is yours</p>
              <p className="mt-2 text-[16px] leading-relaxed text-white">
                You can choose to turn back at any point, for any reason. Tell your leader, and
                we will make sure you get down safely — nobody is asked to explain themselves.
              </p>
            </div>
          </div>
        </div>
      </Panel>
    </InfoShell>
  );
}

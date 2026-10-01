import type { Metadata } from "next";
import { Activity, Gauge, ArrowDown } from "lucide-react";
import { InfoShell, Panel, Prose, H2, StepNo } from "@/components/site/InfoShell";
import { Reveal } from "@/components/site/motion";

export const metadata: Metadata = {
  title: "Safety and altitude",
  description: "The altitude protocol every trek leader carries, written out in full.",
};

const BANDS = [
  { range: "Above 85%", title: "Normal at altitude", action: "Carry on as planned", icon: Activity, cls: "bg-pine-500/10", dot: "bg-pine-500", text: "text-pine-600" },
  { range: "80 – 85%", title: "Watch closely", action: "No further ascent that day; rechecked hourly", icon: Gauge, cls: "bg-sun-400/25", dot: "bg-sun-400", text: "text-ink-800" },
  { range: "Below 80%", title: "Descend", action: "Leader takes you down with two staff, immediately", icon: ArrowDown, cls: "bg-ember-500/10", dot: "bg-ember-500", text: "text-ember-600" },
];

const KIT = [
  ["Bottled oxygen", "Two cylinders on routes above 11,000 ft, three above 14,000 ft."],
  ["A portable altitude chamber", "A pressure bag that simulates a 5,000 ft descent without moving anyone."],
  ["A stocked medical kit", "Including dexamethasone and nifedipine, and a leader trained to use them."],
  ["Satellite communication", "On every route where mobile signal is absent for more than a day."],
  ["A written descent plan", "Per campsite, with the fastest route down and how long it takes at night."],
  ["A named driver on call", "At each basecamp, for the length of every departure."],
];

const CALLS = ["Whether a pass is crossed", "Whether a summit attempt goes ahead", "Whether an individual descends on medical grounds"];

export default function SafetyPage() {
  return (
    <InfoShell
      photo="snowTrekkers"
      eyebrow="Safety and altitude"
      title="What happens when something goes wrong"
      intro="Most treks finish without incident. The ones that do not are the reason this protocol exists, and the reason we publish it rather than keep it internal."
    >
      <Panel>
        <div className="grid gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div>
            <H2 eyebrow="The daily check">Twice a day, every trekker</H2>
            <Prose>
              <p>
                Blood oxygen saturation and resting pulse are recorded every morning before you
                leave camp and every evening after you arrive. The numbers go into the trek log
                against your name and the campsite, and the log comes down with the leader.
              </p>
              <p>
                We are not looking at any single reading. We are looking at the trend. A
                saturation of 78 on the evening of a hard climbing day is expected. The same
                number the next morning, after a night of rest, is not — and that is when a
                trek ends.
              </p>
            </Prose>
          </div>
          <div className="grid content-start gap-3">
            {BANDS.map((b, i) => {
              const Icon = b.icon;
              return (
                <Reveal key={b.range} delay={i * 0.08}>
                  <div className={`flex items-start gap-4 rounded-[22px] p-5 sm:p-6 ${b.cls}`}>
                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-ink-900">
                      <Icon size={18} />
                    </span>
                    <div className="min-w-0">
                      <p className={`text-[13px] font-medium ${b.text}`}>
                        <span className={`mr-2 inline-block h-2 w-2 rounded-full ${b.dot}`} aria-hidden="true" />
                        {b.title}
                      </p>
                      <p className="nums font-display mt-1.5 text-[clamp(1.7rem,3vw,2.2rem)] leading-none text-ink-900">
                        {b.range}
                      </p>
                      <p className="mt-2 text-[14.5px] leading-snug text-ink-600">{b.action}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
            <p className="px-1 text-[12.5px] text-ink-400">Resting SpO₂, read on a pulse oximeter.</p>
          </div>
        </div>
      </Panel>

      <Panel tone="none">
        <div className="px-1 pt-6 sm:px-2 sm:pt-10">
          <H2 eyebrow="On every departure">What every trek carries</H2>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {KIT.map(([h, b], i) => (
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
              The decisions that are not yours
            </H2>
            <Prose onDark>
              <p>
                Three calls belong to the trek leader and cannot be overridden by a trekker,
                by a group, or by the office: whether a pass is crossed, whether a summit
                attempt goes ahead, and whether an individual descends on medical grounds.
              </p>
              <p>
                This is written into what you agree to when you book, and it is the single
                most important line in that agreement. A leader who sends you down on day four
                of a six-day trek is doing their job, and no refund is due — which is why we
                say it here rather than at basecamp.
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
            <div className="mt-2 rounded-[22px] bg-ember-500 p-5 sm:p-6">
              <p className="text-[13px] font-medium text-white/80">What is yours</p>
              <p className="mt-2 text-[16px] leading-relaxed text-white">
                You can turn back at any point, for any reason, and a member of staff will come
                with you. Nobody is ever left to descend alone, and nobody is asked to explain
                themselves.
              </p>
            </div>
          </div>
        </div>
      </Panel>
    </InfoShell>
  );
}

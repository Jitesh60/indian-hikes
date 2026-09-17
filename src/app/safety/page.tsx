import type { Metadata } from "next";
import { InfoShell, Prose, H2 } from "@/components/site/InfoShell";

export const metadata: Metadata = {
  title: "Safety and altitude",
  description: "The altitude protocol every trek leader carries, written out in full.",
};

export default function SafetyPage() {
  return (
    <InfoShell
      title="What happens when something goes wrong"
      intro="Most treks finish without incident. The ones that do not are the reason this protocol exists, and the reason we publish it rather than keep it internal."
    >
      <section>
        <H2>Twice a day, every trekker</H2>
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

        <div className="mt-9 grid sm:grid-cols-3 gap-px bg-snow-300 border border-snow-300">
          {[
            ["Above 85%", "Normal at altitude", "Carry on as planned", "#2f6350"],
            ["80 – 85%", "Watch closely", "No further ascent that day; rechecked hourly", "#d4a22b"],
            ["Below 80%", "Descend", "Leader takes you down with two staff, immediately", "#b23a48"],
          ].map(([r, t, a, c]) => (
            <div key={r} className="bg-snow-50 p-6 border-t-4" style={{ borderTopColor: c }}>
              <p className="nums font-display text-[26px] leading-none">{r}</p>
              <p className="text-[14px] font-semibold mt-3">{t}</p>
              <p className="text-[14px] text-spruce-800/65 mt-2 leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <H2>What every trek carries</H2>
        <div className="grid sm:grid-cols-2 gap-x-10 gap-y-6 mt-2">
          {[
            ["Bottled oxygen", "Two cylinders on routes above 11,000 ft, three above 14,000 ft."],
            ["A portable altitude chamber", "A pressure bag that simulates a 5,000 ft descent without moving anyone."],
            ["A stocked medical kit", "Including dexamethasone and nifedipine, and a leader trained to use them."],
            ["Satellite communication", "On every route where mobile signal is absent for more than a day."],
            ["A written descent plan", "Per campsite, with the fastest route down and how long it takes at night."],
            ["A named driver on call", "At each basecamp, for the length of every departure."],
          ].map(([h, b]) => (
            <div key={h}>
              <h3 className="font-display-tight text-[19px] leading-tight">{h}</h3>
              <p className="text-[15px] text-spruce-800/70 mt-1.5 leading-relaxed">{b}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <H2>The decisions that are not yours</H2>
        <Prose>
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
          <p>
            What is yours: you can turn back at any point, for any reason, and a member of
            staff will come with you. Nobody is ever left to descend alone, and nobody is
            asked to explain themselves.
          </p>
        </Prose>
      </section>
    </InfoShell>
  );
}

import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { InfoShell, Panel, Prose, H2 } from "@/components/site/InfoShell";
import { CountUp, Reveal } from "@/components/site/motion";
import { Photo } from "@/components/site/Photo";
import { Avatar, Button } from "@/components/site/ui";
import type { PhotoKey } from "@/data/photos";
import { treks } from "@/data/treks";

export const metadata: Metadata = {
  title: "About",
  description: "Who we are, how we grade treks, and what we publish.",
};

const PEOPLE = [
  { name: "Arundhati Rane", role: "Head of trek operations", note: "Nineteen seasons. Has crossed Rupin thirty-one times.", tone: "ember" as const },
  { name: "Dr. Ananya Kulkarni", role: "Mountain medicine advisor", note: "Writes the altitude protocol every leader carries.", tone: "ice" as const },
  { name: "Pema Bhutia", role: "Green Trails coordinator", note: "Runs the sorting sheds at eleven basecamps.", tone: "pine" as const },
  { name: "Sundar Rawat", role: "Head of Sankri basecamp", note: "Grew up in Osla. Knows the Supin in every month.", tone: "ink" as const },
];

const VALUES: { photo: PhotoKey; k: string; h: string }[] = [
  { photo: "windingRoad", k: "Walked three times", h: "No route is listed until a third team has walked it." },
  { photo: "snowRange2", k: "Graded honestly", h: "Two routes re-graded upward after their first season. One withdrawn." },
  { photo: "prayerFlags", k: "Published openly", h: "Campsites, water, escape routes — all of it, for anyone to use." },
];

const CTAS = [
  { h: "Work with us", b: "We hire trek leaders every February and August. No prior guiding experience needed — we train.", href: "/careers", cta: "Open roles", tone: "dark" },
  { h: "Talk to somebody", b: "The office picks up between nine and six, and answers email faster than that.", href: "/contact", cta: "Contact us", tone: "ice" },
  { h: "Read the protocol", b: "How we handle altitude, weather and evacuation, written out in full.", href: "/safety", cta: "Safety", tone: "white" },
] as const;

export default function AboutPage() {
  const states = Array.from(new Set(treks.map((t) => t.state)));
  const STATS: { n: number | string; l: string; plain?: boolean }[] = [
    { n: 2008, l: "First documented trek", plain: true },
    { n: treks.length, l: "Routes we run" },
    { n: states.length, l: "Himalayan states" },
    { n: 38200, l: "Trekkers, last five years" },
    { n: "1:12", l: "Leaders to trekkers" },
    { n: 11, l: "Permanent basecamps" },
  ];

  return (
    <InfoShell
      photo="summitGroup"
      eyebrow="About Indiahikes"
      title="We document trails so people can walk them without us."
      intro="That sounds like a bad business model. It is the reason the treks on this site are as good as they are — we have to keep being worth booking."
    >
      {/* Story + stats bento */}
      <div className="grid gap-3 sm:gap-5 lg:grid-cols-12">
        <Panel className="lg:col-span-7">
          <H2 eyebrow="Our method">How a trek gets on this site</H2>
          <Prose>
            <p>
              Somebody walks it first, in the wrong season, and writes down everything
              that went badly. Then a second team walks it in the right season and
              disagrees with most of the first report. Only after the third pass does a
              route get an altitude profile, a grade and a date on the calendar.
            </p>
            <p>
              The grade is the part we are most careful about. It is not a marketing
              decision — it is a promise about what a trek will demand, and getting it
              wrong puts people on a mountain they are not ready for. Two of our routes
              were re-graded upward after their first season. One was withdrawn.
            </p>
            <p>
              Everything we find goes into the public documentation: campsites, water
              sources, escape routes, where the phone signal comes back. People use it
              to trek independently, and that is the point.
            </p>
          </Prose>
        </Panel>

        <dl className="grid grid-cols-2 gap-3 sm:gap-5 lg:col-span-5">
          {STATS.map((s, i) => {
            const dark = i === 0 || i === 5;
            const ice = i === 3;
            return (
              <Reveal key={s.l} delay={(i % 2) * 0.06} className="h-full">
                <div
                  className={`flex h-full flex-col justify-between rounded-bento p-5 sm:p-6 ${
                    dark ? "bg-ink-900" : ice ? "bg-ice-100" : "bg-white shadow-soft"
                  }`}
                >
                  <dt className={`text-[13px] leading-snug ${dark ? "text-white/60" : "text-ink-500"}`}>{s.l}</dt>
                  <dd
                    className={`nums font-display mt-6 text-[clamp(1.9rem,3.2vw,2.6rem)] leading-none ${
                      dark ? "text-white" : "text-ink-900"
                    }`}
                  >
                    {typeof s.n === "number" && !s.plain ? <CountUp value={s.n} /> : s.n}
                  </dd>
                </div>
              </Reveal>
            );
          })}
        </dl>
      </div>

      {/* Values as photo tiles */}
      <div className="grid gap-3 sm:gap-5 md:grid-cols-3">
        {VALUES.map((v, i) => (
          <Reveal key={v.k} delay={i * 0.07}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-bento bg-ink-800 md:aspect-[4/5] lg:aspect-[5/6]">
              <Photo name={v.photo} width={900} alt="" />
              <div className="scrim-b absolute inset-0" aria-hidden="true" />
              <div className="glass absolute inset-x-3 bottom-3 rounded-[20px] p-4 sm:p-5">
                <p className="text-[18px] font-semibold leading-tight tracking-[-0.02em] text-white">{v.k}</p>
                <p className="mt-1.5 text-[14px] leading-snug text-white/80">{v.h}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* People */}
      <Panel>
        <H2 eyebrow="The team" intro="We have no portraits of our staff on this site, so here are their initials and what they do.">
          Some of the people you will meet
        </H2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {PEOPLE.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.06} className="h-full">
              <div className="h-full rounded-[22px] bg-mist-50 p-5 ring-1 ring-mist-200 sm:p-6">
                <Avatar name={p.name} size={56} tone={p.tone} />
                <h3 className="mt-5 text-[18px] font-semibold leading-tight tracking-[-0.02em] text-ink-900">{p.name}</h3>
                <p className="mt-1 text-[13.5px] font-medium text-ember-600">{p.role}</p>
                <p className="mt-2.5 text-[14.5px] leading-snug text-ink-500">{p.note}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Panel>

      {/* Next steps */}
      <div className="grid gap-3 sm:gap-5 md:grid-cols-3">
        {CTAS.map((c) => {
          const dark = c.tone === "dark";
          return (
            <div
              key={c.h}
              className={`flex flex-col rounded-bento p-6 sm:p-8 ${
                dark ? "bg-ink-900 text-white" : c.tone === "ice" ? "bg-ice-100" : "bg-white shadow-soft"
              }`}
            >
              <h3 className={`text-[22px] font-semibold leading-tight tracking-[-0.02em] ${dark ? "text-white" : "text-ink-900"}`}>
                {c.h}
              </h3>
              <p className={`mt-3 flex-1 text-[15px] leading-relaxed ${dark ? "text-white/65" : "text-ink-500"}`}>{c.b}</p>
              <div className="mt-6">
                <Button href={c.href} variant={dark ? "light" : "dark"} size="sm">
                  {c.cta} <ArrowUpRight size={15} />
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </InfoShell>
  );
}

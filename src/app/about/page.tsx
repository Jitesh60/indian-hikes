import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { RidgeArt } from "@/components/viz/RidgeArt";
import { treks } from "@/data/treks";

export const metadata: Metadata = {
  title: "About",
  description: "Who we are, how we grade treks, and what we publish.",
};

const PEOPLE = [
  { name: "Arundhati Rane", role: "Head of trek operations", note: "Nineteen seasons. Has crossed Rupin thirty-one times." },
  { name: "Dr. Ananya Kulkarni", role: "Mountain medicine advisor", note: "Writes the altitude protocol every leader carries." },
  { name: "Pema Bhutia", role: "Green Trails coordinator", note: "Runs the sorting sheds at eleven basecamps." },
  { name: "Sundar Rawat", role: "Head of Sankri basecamp", note: "Grew up in Osla. Knows the Supin in every month." },
];

export default function AboutPage() {
  const states = Array.from(new Set(treks.map((t) => t.state)));

  return (
    <>
      <div className="bg-spruce-900 text-snow-100 relative overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <RidgeArt seed="about-page" tone="dark" className="w-full h-full" />
        </div>
        <div className="relative">
          <SiteHeader variant="dark" />
          <div className="mx-auto max-w-[1360px] px-5 sm:px-8 py-16 sm:py-24">
            <h1 className="font-display text-[clamp(2.6rem,6vw,4.4rem)] leading-[0.99] text-snow-50 max-w-[17ch]">
              We document trails so people can walk them without us.
            </h1>
            <p className="mt-6 text-[18px] leading-relaxed text-glacier-200/75 max-w-[56ch]">
              That sounds like a bad business model. It is the reason the treks on this
              site are as good as they are — we have to keep being worth booking.
            </p>
          </div>
        </div>
      </div>

      <main>
        <section className="mx-auto max-w-[1360px] px-5 sm:px-8 py-16 sm:py-20">
          <div className="grid lg:grid-cols-[1fr_1fr] gap-x-16 gap-y-10">
            <div>
              <h2 className="font-display text-[clamp(1.9rem,3.6vw,2.6rem)] leading-tight">
                How a trek gets on this site
              </h2>
              <div className="mt-6 space-y-5 text-[17px] leading-[1.68] text-spruce-800/85 measure">
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
              </div>
            </div>

            <dl className="grid grid-cols-2 gap-px bg-snow-300 border border-snow-300 self-start">
              {[
                ["2008", "First documented trek"],
                [`${treks.length}`, "Routes we run"],
                [`${states.length}`, "Himalayan states"],
                ["38,200", "Trekkers last five years"],
                ["1:12", "Leaders to trekkers"],
                ["11", "Permanent basecamps"],
              ].map(([n, l]) => (
                <div key={l} className="bg-snow-100 p-6">
                  <dt className="nums font-display text-[clamp(1.7rem,3vw,2.4rem)] leading-none">{n}</dt>
                  <dd className="mt-2 text-[13.5px] text-spruce-800/60 leading-snug">{l}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="bg-snow-50 border-y border-snow-300">
          <div className="mx-auto max-w-[1360px] px-5 sm:px-8 py-16 sm:py-20">
            <h2 className="font-display text-[clamp(1.9rem,3.6vw,2.6rem)] leading-tight mb-9">
              Some of the people you will meet
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
              {PEOPLE.map((p) => (
                <div key={p.name}>
                  <div className="relative aspect-square overflow-hidden bg-spruce-800 mb-4">
                    <RidgeArt seed={p.name} tone="warm" className="w-full h-full" snowline={false} />
                  </div>
                  <h3 className="font-display-tight text-[19px] leading-tight">{p.name}</h3>
                  <p className="text-[13.5px] text-deodar-600 mt-1">{p.role}</p>
                  <p className="text-[14px] text-spruce-800/65 mt-2 leading-snug">{p.note}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1360px] px-5 sm:px-8 py-16 sm:py-20">
          <div className="grid md:grid-cols-3 gap-px bg-snow-300 border border-snow-300">
            {[
              { h: "Work with us", b: "We hire trek leaders every February and August. No prior guiding experience needed — we train.", href: "/careers", cta: "Open roles" },
              { h: "Talk to somebody", b: "The office picks up between nine and six, and answers email faster than that.", href: "/contact", cta: "Contact us" },
              { h: "Read the protocol", b: "How we handle altitude, weather and evacuation, written out in full.", href: "/safety", cta: "Safety" },
            ].map((c) => (
              <div key={c.h} className="bg-snow-100 p-8">
                <h3 className="font-display-tight text-[21px] leading-tight">{c.h}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-spruce-800/65">{c.b}</p>
                <Link
                  href={c.href}
                  className="inline-block mt-5 text-[15px] font-semibold border-b-2 border-bugyal-500 pb-0.5 hover:border-spruce-800 transition-colors"
                >
                  {c.cta}
                </Link>
              </div>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

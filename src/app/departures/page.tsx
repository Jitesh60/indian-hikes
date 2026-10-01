import type { Metadata } from "next";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { DepartureCalendar } from "@/components/site/DepartureCalendar";
import { Photo } from "@/components/site/Photo";
import { Eyebrow } from "@/components/site/ui";
import { treks, departures } from "@/data/treks";

export const metadata: Metadata = {
  title: "Departure calendar",
  description: "Every open HeyHikers departure, month by month.",
};

export default function DeparturesPage() {
  const open = departures.filter((d) => d.status !== "full").length;

  return (
    <>
      <SiteHeader />
      <main className="px-3 pb-16 sm:px-5 sm:pb-24">
        <header className="relative mx-auto max-w-[1320px] overflow-hidden rounded-bento bg-ink-900">
          <Photo name="tentStars" width={1800} priority alt="" position="center 60%" />
          <div className="scrim-b absolute inset-0" aria-hidden="true" />
          <div className="relative flex min-h-[340px] flex-col justify-end gap-6 p-6 sm:min-h-[400px] sm:p-10 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-[40rem]">
              <Eyebrow onDark>Departure calendar</Eyebrow>
              <h1 className="mt-4 font-display text-[clamp(2.1rem,5vw,3.6rem)] leading-[1.02] text-white">
                Start from the dates you can actually take off
              </h1>
              <p className="mt-4 max-w-[52ch] text-[15.5px] leading-relaxed text-white/75 sm:text-[16.5px]">
                Find the week first, then see what leaves in it.
              </p>
            </div>
            <dl className="glass flex shrink-0 gap-6 self-start rounded-[20px] px-5 py-4 text-white lg:self-end">
              <div>
                <dt className="text-[12px] text-white/65">Open departures</dt>
                <dd className="nums mt-1 text-[26px] font-semibold leading-none">{open}</dd>
              </div>
              <div>
                <dt className="text-[12px] text-white/65">Treks</dt>
                <dd className="nums mt-1 text-[26px] font-semibold leading-none">{treks.length}</dd>
              </div>
            </dl>
          </div>
        </header>

        <div className="mx-auto mt-3 max-w-[1320px] sm:mt-5">
          <DepartureCalendar treks={treks} departures={departures} />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

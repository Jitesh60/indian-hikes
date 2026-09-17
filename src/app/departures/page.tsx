import type { Metadata } from "next";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { DepartureCalendar } from "@/components/site/DepartureCalendar";
import { treks, departures } from "@/data/treks";

export const metadata: Metadata = {
  title: "Departure calendar",
  description: "Every open departure across all fifteen treks, month by month.",
};

export default function DeparturesPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-[1360px] px-5 sm:px-8 py-12 sm:py-16">
        <header className="mb-10 max-w-[58ch]">
          <h1 className="font-display text-[clamp(2.4rem,5vw,3.6rem)] leading-[1.02]">
            Start from the dates you can actually take off
          </h1>
          <p className="mt-5 text-[17px] leading-relaxed text-spruce-800/70">
            Most people pick a trek and then discover it does not run when they are free.
            This is the other way round: find the week, then see what leaves in it.
          </p>
        </header>
        <DepartureCalendar treks={treks} departures={departures} />
      </main>
      <SiteFooter />
    </>
  );
}

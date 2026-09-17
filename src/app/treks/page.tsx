import type { Metadata } from "next";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { TrekExplorer } from "@/components/site/TrekExplorer";
import { treks } from "@/data/treks";

export const metadata: Metadata = {
  title: "All treks",
  description:
    "Fifteen Himalayan treks, filterable by altitude, grade, month and region.",
};

export default async function TreksPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const one = (k: string) => (Array.isArray(sp[k]) ? sp[k][0] : sp[k]);

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-[1360px] px-5 sm:px-8 py-12 sm:py-16">
        <header className="mb-12 max-w-[56ch]">
          <h1 className="font-display text-[clamp(2.4rem,5vw,3.6rem)] leading-[1.02]">
            Fifteen routes, sorted by how high they go
          </h1>
          <p className="mt-5 text-[17px] leading-relaxed text-spruce-800/70">
            Grade tells you how hard a trek is. Altitude tells you what it will do to
            you. Both are here, along with the months each route is actually open —
            because a trek you cannot get leave for is not an option.
          </p>
        </header>

        <TrekExplorer
          treks={treks}
          initial={{
            difficulty: one("difficulty"),
            snow: one("snow") === "1",
            family: one("family") === "1",
            green: one("green") === "1",
          }}
        />
      </main>
      <SiteFooter />
    </>
  );
}

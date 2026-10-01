import type { Metadata } from "next";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { TrekExplorer } from "@/components/site/TrekExplorer";
import { treks } from "@/data/treks";

export const metadata: Metadata = {
  title: "All treks",
  description:
    "Guided Himalayan treks across Uttarakhand, Himachal, J&K and Ladakh, filterable by altitude, grade, month and region.",
};

export default async function TreksPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const one = (k: string) => (Array.isArray(sp[k]) ? sp[k][0] : sp[k]);
  const initial = {
    difficulty: one("difficulty"),
    snow: one("snow") === "1",
    family: one("family") === "1",
    green: one("green") === "1",
  };

  return (
    <>
      <SiteHeader />
      <main className="px-3 pb-16 sm:px-5 sm:pb-24">
        <div className="mx-auto max-w-[1320px]">
          {/* Keyed on the URL filters so a link to /treks?snow=1 from this page re-seeds them. */}
          <TrekExplorer key={JSON.stringify(initial)} treks={treks} initial={initial} />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

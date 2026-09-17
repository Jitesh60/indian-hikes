import type { Metadata } from "next";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { AccountDashboard } from "@/components/site/AccountDashboard";
import { treks, departures, trekBySlug } from "@/data/treks";

export const metadata: Metadata = { title: "My treks" };

export default function AccountPage() {
  const booked = ["kedarkantha", "hampta-pass"]
    .map((slug) => {
      const trek = trekBySlug(slug)!;
      const departure = departures.find((d) => d.trek === slug)!;
      return { trek, departure };
    })
    .filter((b) => b.departure);

  const saved = treks.filter((t) =>
    ["kashmir-great-lakes", "rupin-pass", "goechala"].includes(t.slug)
  );

  const past = [
    { trek: trekBySlug("dayara-bugyal")!, date: "2025-12-20", summited: true },
    { trek: trekBySlug("brahmatal")!, date: "2025-02-08", summited: true },
    { trek: trekBySlug("bhrigu-lake")!, date: "2024-06-14", summited: false },
  ];

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-[1360px] px-5 sm:px-8 py-12 sm:py-14">
        <header className="mb-10">
          <p className="text-[14px] text-snow-500">Signed in as jitesh.bhatt@devslane.com</p>
          <h1 className="font-display text-[clamp(2.2rem,4.5vw,3.2rem)] leading-[1.03] mt-1.5">
            Your treks
          </h1>
        </header>
        <AccountDashboard booked={booked} saved={saved} past={past} />
      </main>
      <SiteFooter />
    </>
  );
}

import type { Metadata } from "next";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { AccountDashboard } from "@/components/site/AccountDashboard";
import { treks, departures, trekBySlug } from "@/data/treks";

export const metadata: Metadata = { title: "My treks" };

const EMAIL = "jitesh.bhatt@devslane.com";

export default function AccountPage() {
  const booked = ["kedarkantha", "hampta-pass"]
    .map((slug) => {
      const trek = trekBySlug(slug)!;
      const departure = departures.find((d) => d.trek === slug)!;
      return { trek, departure };
    })
    .filter((b) => b.departure);

  const saved = treks.filter((t) =>
    ["kashmir-great-lakes", "rupin-pass", "bali-pass"].includes(t.slug)
  );

  const past = [
    { trek: trekBySlug("dayara-bugyal")!, date: "2025-12-20", summited: true },
    { trek: trekBySlug("brahmatal")!, date: "2025-02-08", summited: true },
    { trek: trekBySlug("bhrigu-lake")!, date: "2024-06-14", summited: false },
  ];

  const first = EMAIL.split(/[.@]/)[0];
  const name = first.charAt(0).toUpperCase() + first.slice(1);

  return (
    <>
      <SiteHeader />
      <main className="px-3 pb-16 sm:px-5 sm:pb-24">
        <div className="mx-auto max-w-[1320px]">
          <AccountDashboard email={EMAIL} name={name} booked={booked} saved={saved} past={past} />
        </div>
      </main>
      <SiteFooter newsletter={false} />
    </>
  );
}

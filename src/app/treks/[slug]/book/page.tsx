import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { BookingFlow } from "@/components/site/BookingFlow";
import { trekBySlug, departuresFor } from "@/data/treks";

export const metadata: Metadata = { title: "Book a departure" };

export default async function BookPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { slug } = await params;
  const sp = await searchParams;
  const trek = trekBySlug(slug);
  if (!trek) notFound();

  const deps = departuresFor(slug);
  const wanted = Array.isArray(sp.d) ? sp.d[0] : sp.d;
  const departure = deps.find((d) => d.id === wanted) ?? deps[0];
  if (!departure) notFound();

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-[1180px] px-5 sm:px-8 py-12 sm:py-16">
        <BookingFlow trek={trek} departure={departure} waitlist={sp.waitlist === "1"} />
      </main>
      <SiteFooter />
    </>
  );
}

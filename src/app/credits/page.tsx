import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { InfoShell, Panel, H2 } from "@/components/site/InfoShell";
import { Photo } from "@/components/site/Photo";
import { photos, photoCredits, type PhotoKey } from "@/data/photos";

export const metadata: Metadata = {
  title: "Photo credits",
  description: "The photographers whose work appears on this site, all published on Unsplash.",
};

export default function CreditsPage() {
  const credits = photoCredits();
  const keyFor = (id: string) => (Object.keys(photos) as PhotoKey[]).find((k) => photos[k].id === id)!;

  return (
    <InfoShell
      eyebrow="Photography"
      title="The people behind the pictures"
      intro="Every photograph on this site is a real photo, published on Unsplash under the Unsplash License. Thank you to each of these photographers."
      photo="morningLight"
    >
      <Panel>
        <H2 intro={`${credits.length} photographers, ${Object.keys(photos).length} photo slots.`}>Credits</H2>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {credits.map((c) => (
            <li key={c.user} className="flex items-center gap-3 rounded-2xl bg-mist-50 p-2.5">
              <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl">
                <Photo name={keyFor(c.ids[0])} width={160} alt="" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[15px] font-medium text-ink-900">{c.by}</span>
                <span className="block text-[12.5px] text-ink-400">
                  {c.ids.length} {c.ids.length === 1 ? "photo" : "photos"}
                </span>
              </span>
              <Link
                href={`https://unsplash.com/@${c.user}?utm_source=heyhikers&utm_medium=referral`}
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ink-900/10 text-ink-900 transition-colors hover:border-ink-900"
                aria-label={`${c.by} on Unsplash`}
                target="_blank"
                rel="noreferrer"
              >
                <ArrowUpRight size={16} />
              </Link>
            </li>
          ))}
        </ul>
      </Panel>
    </InfoShell>
  );
}

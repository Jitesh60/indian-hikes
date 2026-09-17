import Link from "next/link";
import { Mountain } from "lucide-react";
import { treks } from "@/data/treks";

const COLUMNS = [
  {
    title: "Plan a trek",
    links: [
      { href: "/treks", label: "All treks" },
      { href: "/departures", label: "Departure calendar" },
      { href: "/treks?difficulty=Easy%E2%80%93Moderate", label: "First Himalayan trek" },
      { href: "/treks?snow=1", label: "Winter snow treks" },
      { href: "/treks?family=1", label: "Treks with children" },
    ],
  },
  {
    title: "Before you go",
    links: [
      { href: "/fitness", label: "Fitness standards" },
      { href: "/gear", label: "What to carry" },
      { href: "/safety", label: "How we handle altitude" },
      { href: "/policy", label: "Cancellation policy" },
      { href: "/faq", label: "Questions people ask" },
    ],
  },
  {
    title: "The organisation",
    links: [
      { href: "/about", label: "Who we are" },
      { href: "/green-trails", label: "Green Trails" },
      { href: "/stories", label: "Trekker stories" },
      { href: "/careers", label: "Work with us" },
      { href: "/contact", label: "Contact" },
    ],
  },
];

export function SiteFooter() {
  const regions = Array.from(new Set(treks.map((t) => t.state)));

  return (
    <footer className="on-dark bg-spruce-900 text-snow-200 contours">
      <div className="mx-auto max-w-[1360px] px-5 sm:px-8 py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <div className="flex items-center gap-2.5 text-snow-50">
              <Mountain className="text-bugyal-400" size={26} strokeWidth={1.75} />
              <span className="font-display text-[26px] leading-none">Indiahikes</span>
            </div>
            <p className="mt-5 text-[15px] leading-relaxed text-glacier-200/70 max-w-sm">
              We run {treks.length} routes across {regions.length} states, grade every one of
              them by the altitude it asks of you, and publish what we find so people can
              also walk them without us.
            </p>
            <Link
              href="/treks"
              className="inline-block mt-7 bg-bugyal-500 text-spruce-900 font-semibold px-5 py-3 hover:bg-bugyal-400 transition-colors"
            >
              Find a trek
            </Link>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="font-display-tight text-[17px] text-snow-50 mb-4">{col.title}</h3>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-[14.5px] text-glacier-200/65 hover:text-bugyal-400 transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-7 border-t border-glacier-700/30 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
          <p className="text-[13px] text-glacier-400/70">
            Concept redesign. Built as a front-end demonstration — no live bookings are taken.
          </p>
          <div className="flex gap-6 text-[13px] text-glacier-400/70">
            <Link href="/policy" className="hover:text-snow-100 transition-colors">Terms</Link>
            <Link href="/policy" className="hover:text-snow-100 transition-colors">Privacy</Link>
            <Link href="/admin" className="hover:text-snow-100 transition-colors">Admin panel</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

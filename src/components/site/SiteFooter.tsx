import Link from "next/link";
import { Mountain, ArrowUpRight, Mail, Phone, MapPin } from "lucide-react";
import { brand, telHref, whatsappHref } from "@/data/brand";
import { Photo } from "@/components/site/Photo";
import { NewsletterForm } from "@/components/site/NewsletterForm";

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
    title: "Company",
    links: [
      { href: "/about", label: "Who we are" },
      { href: "/custom-treks", label: "Custom treks" },
      { href: "/stories", label: "Trekker stories" },
      { href: "/careers", label: "Work with us" },
      { href: "/credits", label: "Photo credits" },
      { href: "/contact", label: "Contact" },
    ],
  },
];

export function SiteFooter({ newsletter = true }: { newsletter?: boolean }) {

  return (
    <footer className="px-3 pb-3 sm:px-5 sm:pb-5">
      {newsletter && (
        <section
          aria-labelledby="newsletter-title"
          className="mx-auto mb-3 grid max-w-[1320px] grid-cols-[minmax(0,1fr)] overflow-hidden rounded-bento bg-ice-100 sm:mb-5 md:grid-cols-2"
        >
          <div className="relative min-h-[220px] md:min-h-[300px]">
            <Photo name="snowRange2" width={1200} alt="" />
          </div>
          <div className="flex flex-col justify-center p-8 sm:p-12">
            <h2 id="newsletter-title" className="font-display text-[clamp(1.6rem,3vw,2.3rem)] leading-[1.05] text-ink-900">
              New departures, before they fill.
            </h2>
            <p className="mt-3 max-w-[44ch] text-[15px] leading-relaxed text-ink-500">
              One email when a season opens, with the dates and slot counts. Nothing else.
            </p>
            <NewsletterForm />
          </div>
        </section>
      )}

      <div className="relative mx-auto max-w-[1320px] overflow-hidden rounded-bento bg-ink-900 text-white">
        <div className="relative z-10 px-6 py-14 sm:px-12 sm:py-16">
          <div className="grid gap-12 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
            <div>
              <div className="flex items-center gap-2.5">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-ink-900">
                  <Mountain size={18} strokeWidth={2} />
                </span>
                <span className="text-[20px] font-semibold tracking-[-0.02em]">HeyHikers</span>
              </div>
              <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-white/60">
                {brand.promise} {brand.stats.routes}+ routes across Uttarakhand, Himachal, J&amp;K and Ladakh.
              </p>
              <ul className="mt-6 space-y-2 text-[14.5px] text-white/75">
                <li>
                  <a href={`mailto:${brand.contact.email}`} className="inline-flex items-center gap-2 transition-colors hover:text-white">
                    <Mail size={15} className="text-forest-400" aria-hidden="true" /> {brand.contact.email}
                  </a>
                </li>
                <li className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <Phone size={15} className="text-forest-400" aria-hidden="true" />
                  {brand.contact.phones.map((ph) => (
                    <a key={ph} href={telHref(ph)} className="nums transition-colors hover:text-white">
                      {ph}
                    </a>
                  ))}
                </li>
                <li className="inline-flex items-center gap-2">
                  <MapPin size={15} className="text-forest-400" aria-hidden="true" /> {brand.base}
                </li>
              </ul>
              <Link
                href="/treks"
                className="mt-7 inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-2.5 text-[14.5px] font-medium text-ink-900 transition-colors hover:bg-mist-100"
              >
                Find a trek <ArrowUpRight size={15} />
              </Link>
              <a
                href={whatsappHref}
                className="ml-2 mt-7 inline-flex items-center gap-1.5 rounded-full border border-white/25 px-5 py-2.5 text-[14.5px] font-medium transition-colors hover:border-white"
              >
                WhatsApp us
              </a>
            </div>

            {COLUMNS.map((col) => (
              <div key={col.title}>
                <h3 className="mb-4 text-[13px] font-medium uppercase tracking-[0.14em] text-white/40">{col.title}</h3>
                <ul className="space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="text-[15px] text-white/75 transition-colors hover:text-white">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[13px] text-white/45">
              © {new Date().getFullYear()} {brand.name} · {brand.base} · Photography from{" "}
              <Link href="/credits" className="underline underline-offset-2 transition-colors hover:text-white">
                Unsplash photographers
              </Link>
              .
            </p>
            <div className="flex gap-6 text-[13px] text-white/45">
              <Link href="/policy" className="transition-colors hover:text-white">Terms</Link>
              <Link href="/policy" className="transition-colors hover:text-white">Privacy</Link>
              <Link href="/admin" className="transition-colors hover:text-white">Admin panel</Link>
            </div>
          </div>
        </div>

        <p
          aria-hidden="true"
          className="pointer-events-none -mb-[0.22em] select-none px-6 text-center text-[clamp(4rem,17vw,15rem)] font-semibold leading-none tracking-[-0.06em] text-white/[0.05]"
        >
          HeyHikers
        </p>
      </div>
    </footer>
  );
}

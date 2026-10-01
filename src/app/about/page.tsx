import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";
import {
  ArrowUpRight,
  BadgeCheck,
  Bus,
  HeartHandshake,
  IndianRupee,
  MapPin,
  PhoneCall,
  Quote,
  Users,
} from "lucide-react";
import { InfoShell, Panel, Prose, H2 } from "@/components/site/InfoShell";
import { Reveal } from "@/components/site/motion";
import { CountUp } from "@/components/fx";
import { Photo } from "@/components/site/Photo";
import { Avatar, Button, Pill } from "@/components/site/ui";
import type { PhotoKey } from "@/data/photos";
import { brand } from "@/data/brand";

export const metadata: Metadata = {
  title: "About",
  description: `${brand.name} is a small, owner-operated trekking company from ${brand.base}, leading guided Himalayan treks across the ${brand.ranges.join(", ")} ranges.`,
};

const { stats } = brand;

const STATS: { to: number; prefix?: string; suffix?: string; l: string; tone: "dark" | "ice" | "white" | "ember" }[] = [
  { to: stats.trekkers, suffix: "+", l: "Trekkers led safely", tone: "dark" },
  { to: stats.routes, suffix: "+", l: "Himalayan routes", tone: "white" },
  { to: stats.rating, suffix: "/5", l: "Average trekker rating", tone: "white" },
  { to: stats.seriousIncidents, l: `Serious incidents in ${stats.years} years`, tone: "ice" },
  { to: stats.fromPrice, prefix: "₹", l: "Treks start from", tone: "white" },
  { to: 24, suffix: "×7", l: "Support, on and off the trail", tone: "ember" },
];

/** One icon per promise in brand.promises, in the same order. */
const PROMISE_ICONS: LucideIcon[] = [BadgeCheck, Users, PhoneCall, IndianRupee, Bus, HeartHandshake];

/** A photo for each range we trek in. */
const RANGE_PHOTOS: Record<(typeof brand.ranges)[number], PhotoKey> = {
  Garhwal: "snowValley",
  Kumaon: "mistPines",
  Himachal: "greenMountain",
};

const CTAS = [
  {
    h: "Plan a trek around your group",
    b: "School groups, corporate teams, friends and families — your dates, your pace, your pickup point.",
    href: "/custom-treks",
    cta: "Custom treks",
    tone: "dark",
  },
  {
    h: "Talk to the owners",
    b: `Email or call us. ${brand.contact.responseTime}`,
    href: "/contact",
    cta: "Contact us",
    tone: "ice",
  },
  {
    h: "How we keep you safe",
    b: "Altitude, weather and what happens if a trek has to turn around — in plain words.",
    href: "/safety",
    cta: "Safety",
    tone: "white",
  },
] as const;

export default function AboutPage() {
  const [kartik, praveen] = brand.founders;
  const farooqQuote = brand.testimonials.find((t) => t.quote.includes("Farooq"));

  return (
    <InfoShell
      photo="summitGroup"
      eyebrow={`About ${brand.name}`}
      title="Every trekker a guest, never a booking."
      intro={brand.story}
    >
      {/* Story + stats bento */}
      <div className="grid gap-3 sm:gap-5 lg:grid-cols-12">
        <Panel className="lg:col-span-7">
          <H2 eyebrow="Owner-operated">The people whose name is on the company</H2>
          <Prose>
            <p>
              {brand.name} is a small team based in {brand.base}. We lead guided Himalayan
              treks across the {brand.ranges[0]}, {brand.ranges[1]} and {brand.ranges[2]} ranges
              — {stats.routes}+ routes in {brand.regions.slice(0, -1).join(", ")} and{" "}
              {brand.regions[brand.regions.length - 1]}.
            </p>
            <p>
              When you trek with us, you deal directly with the people whose name is on the
              company. We have personally walked every route we offer, and we plan, scout and
              guide the treks ourselves — so the answers you get before you book come from
              people who know the trail.
            </p>
            <p>
              That is also why we keep groups small and prices all-inclusive. We would rather
              lead fewer people well than many people in a hurry — and we would rather tell you
              the full price up front than surprise you at basecamp.
            </p>
          </Prose>
        </Panel>

        <dl className="grid grid-cols-2 gap-3 sm:gap-5 lg:col-span-5">
          {STATS.map((s, i) => {
            const dark = s.tone === "dark" || s.tone === "ember";
            const bg =
              s.tone === "dark"
                ? "bg-ink-900"
                : s.tone === "ember"
                  ? "bg-forest-500"
                  : s.tone === "ice"
                    ? "bg-ice-100"
                    : "bg-white shadow-soft";
            return (
              <Reveal key={s.l} delay={(i % 2) * 0.06} className="h-full">
                <div className={`flex h-full flex-col justify-between rounded-bento p-5 sm:p-6 ${bg}`}>
                  <dt className={`text-[13px] leading-snug ${dark ? "text-white/70" : "text-ink-500"}`}>{s.l}</dt>
                  <dd
                    className={`nums font-display mt-6 text-[clamp(1.8rem,3.2vw,2.6rem)] leading-none ${
                      dark ? "text-white" : "text-ink-900"
                    }`}
                  >
                    {s.to === 0 ? (
                      "Zero"
                    ) : (
                      <CountUp to={s.to} prefix={s.prefix} suffix={s.suffix} />
                    )}
                  </dd>
                </div>
              </Reveal>
            );
          })}
        </dl>
      </div>

      {/* Founders */}
      <Panel>
        <H2
          eyebrow="The founders"
          intro="We have no portraits on this site, so here are our initials. You will hear our voices soon enough."
        >
          Who you are trekking with
        </H2>
        <div className="grid gap-3 sm:gap-5 md:grid-cols-2">
          {[kartik, praveen].map((p, i) => (
            <Reveal key={p.name} delay={i * 0.08} className="h-full">
              <article
                className={`flex h-full flex-col rounded-[24px] p-6 sm:p-8 ${
                  i === 0 ? "bg-ink-900 text-white" : "bg-mist-50 ring-1 ring-mist-200"
                }`}
              >
                <div className="flex items-center gap-4">
                  <Avatar name={p.name} size={64} tone={i === 0 ? "ember" : "ink"} />
                  <div className="min-w-0">
                    <h3
                      className={`text-[22px] font-semibold leading-tight tracking-[-0.02em] ${
                        i === 0 ? "text-white" : "text-ink-900"
                      }`}
                    >
                      {p.name}
                    </h3>
                    <p className={`mt-1 text-[14px] font-medium ${i === 0 ? "text-forest-300" : "text-forest-600"}`}>
                      {p.role}
                    </p>
                  </div>
                </div>
                <p
                  className={`mt-6 flex-1 text-[15.5px] leading-relaxed ${
                    i === 0 ? "text-white/75" : "text-ink-600"
                  }`}
                >
                  {p.bio}
                </p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {p.facts.map((f) => (
                    <li key={f}>
                      <Pill tone={i === 0 ? "glass" : "neutral"}>{f}</Pill>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>

        {farooqQuote && (
          <figure className="mt-3 flex flex-col gap-4 rounded-[24px] bg-ice-100 p-6 sm:mt-5 sm:flex-row sm:items-start sm:gap-6 sm:p-8">
            <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-ink-900">
              <Quote size={18} />
            </span>
            <div className="min-w-0">
              <blockquote className="max-w-[62ch] text-[17px] font-medium leading-snug tracking-[-0.01em] text-ink-900 sm:text-[19px]">
                “{farooqQuote.quote}”
              </blockquote>
              <figcaption className="mt-3 text-[13.5px] text-ink-500">
                {farooqQuote.name} · {farooqQuote.trek}
              </figcaption>
            </div>
          </figure>
        )}
      </Panel>

      {/* Promises */}
      <Panel tone="none">
        <div className="px-1 pt-6 sm:px-2 sm:pt-10">
          <H2 eyebrow="On every trek" intro={brand.promise}>
            What we promise
          </H2>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {brand.promises.map((p, i) => {
            const Icon = PROMISE_ICONS[i] ?? BadgeCheck;
            return (
              <Reveal key={p.title} delay={(i % 3) * 0.07} className="h-full">
                <div className="flex h-full flex-col rounded-bento bg-white p-6 shadow-soft sm:p-7">
                  <span
                    className={`inline-flex h-12 w-12 items-center justify-center rounded-full ${
                      i === 0 ? "bg-forest-500 text-white" : "bg-ice-100 text-ink-900"
                    }`}
                  >
                    <Icon size={20} />
                  </span>
                  <h3 className="mt-6 text-[19px] font-semibold leading-tight tracking-[-0.02em] text-ink-900">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink-500">{p.body}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Panel>

      {/* Where we trek */}
      <section aria-labelledby="where" className="pt-6 sm:pt-10">
        <div className="mb-7 grid gap-x-10 gap-y-4 px-1 sm:mb-9 sm:px-2 lg:grid-cols-2 lg:items-end">
          <div>
            <p className="inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.16em] text-ink-500">
              <span className="h-1.5 w-1.5 rounded-full bg-forest-500" aria-hidden="true" />
              Where we trek
            </p>
            <h2 id="where" className="font-display mt-3 text-[clamp(1.7rem,3.4vw,2.6rem)] leading-[1.06] text-ink-900">
              Three ranges, four Himalayan regions
            </h2>
          </div>
          <ul className="flex flex-wrap gap-2 lg:justify-self-end" aria-label="Regions">
            {brand.regions.map((r) => (
              <li
                key={r}
                className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-2 text-[13.5px] font-medium text-ink-800 shadow-soft"
              >
                <MapPin size={13} className="text-forest-500" aria-hidden="true" /> {r}
              </li>
            ))}
          </ul>
        </div>
        <div className="grid gap-3 sm:gap-5 md:grid-cols-3">
          {brand.ranges.map((r, i) => (
            <Reveal key={r} delay={i * 0.07}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-bento bg-ink-800 md:aspect-[4/5] lg:aspect-[5/6]">
                <Photo name={RANGE_PHOTOS[r]} width={900} alt="" />
                <div className="scrim-b absolute inset-0" aria-hidden="true" />
                <div className="glass absolute inset-x-3 bottom-3 rounded-[20px] p-4 sm:p-5">
                  <p className="text-[12.5px] text-white/75">The {r} range</p>
                  <p className="mt-0.5 text-[22px] font-semibold leading-tight tracking-[-0.02em] text-white">{r}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-5 flex flex-wrap items-center gap-3 px-1 sm:px-2">
          <Button href="/treks" variant="dark" size="sm">
            Browse all treks <ArrowUpRight size={15} />
          </Button>
          <span className="text-[14px] text-ink-500">
            Pickup and drop is included on most treks, with transport help from Dehradun, Manali and Srinagar.
          </span>
        </div>
      </section>

      {/* Next steps */}
      <div className="grid gap-3 pt-6 sm:gap-5 sm:pt-10 md:grid-cols-3">
        {CTAS.map((c) => {
          const dark = c.tone === "dark";
          return (
            <div
              key={c.h}
              className={`flex flex-col rounded-bento p-6 sm:p-8 ${
                dark ? "bg-ink-900 text-white" : c.tone === "ice" ? "bg-ice-100" : "bg-white shadow-soft"
              }`}
            >
              <h3 className={`text-[22px] font-semibold leading-tight tracking-[-0.02em] ${dark ? "text-white" : "text-ink-900"}`}>
                {c.h}
              </h3>
              <p className={`mt-3 flex-1 text-[15px] leading-relaxed ${dark ? "text-white/65" : "text-ink-500"}`}>{c.b}</p>
              <div className="mt-6">
                <Button href={c.href} variant={dark ? "light" : "dark"} size="sm">
                  {c.cta} <ArrowUpRight size={15} />
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </InfoShell>
  );
}

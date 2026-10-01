import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";
import {
  ArrowDown,
  BriefcaseBusiness,
  CalendarDays,
  Footprints,
  GraduationCap,
  HeartHandshake,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Sparkles,
  User,
  Users,
  Utensils,
} from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Photo } from "@/components/site/Photo";
import { Reveal } from "@/components/site/motion";
import { Button, Eyebrow } from "@/components/site/ui";
import { CircularTextButton, CountUp } from "@/components/fx";
import type { PhotoKey } from "@/data/photos";
import { brand, telHref, whatsappHref } from "@/data/brand";

export const metadata: Metadata = {
  title: "Custom treks",
  description: `Fully customised Himalayan treks from ${brand.name} for school groups, corporate teams, solo travellers, friends and families — plus women-only batches led by female trek leaders.`,
};

type Audience = (typeof brand.custom.audiences)[number];
type Flexible = (typeof brand.custom.flexible)[number];

const AUDIENCES: Record<Audience, { icon: LucideIcon; photo: PhotoKey; line: string }> = {
  "School groups": {
    icon: GraduationCap,
    photo: "ridgeWalkers",
    line: "A first taste of the mountains, planned around your term dates and your students.",
  },
  "Corporate teams": {
    icon: BriefcaseBusiness,
    photo: "summitGroup",
    line: "A few days on the trail together, on dates that work for the whole team.",
  },
  "Solo travellers": {
    icon: User,
    photo: "hikerPeak",
    line: "Your own trek at your own pace — or a small batch to walk with.",
  },
  "Friends & families": {
    icon: Users,
    photo: "campfire",
    line: "Just your people, on a route and a pace that suits everyone.",
  },
};

const FLEXIBLE: Record<Flexible, { icon: LucideIcon; line: string }> = {
  "Custom dates": { icon: CalendarDays, line: "Trek when it suits you, not when a batch happens to leave." },
  "Your own pace": { icon: Footprints, line: "Slower days, extra rest, or a tighter schedule — your call." },
  "Dietary needs": { icon: Utensils, line: "Tell us about allergies and preferences and we plan the meals around them." },
  "Pickup points": { icon: MapPin, line: "We collect your group from where works best for you." },
};

const STEPS = [
  {
    h: "Tell us about your group",
    b: "Who is coming, roughly when, how fit everyone is, and what kind of trek you have in mind.",
  },
  {
    h: "We plan the route and dates",
    b: "We suggest the trek that fits — and plan the pace, pickup and meals around your group.",
  },
  {
    h: "You get an all-inclusive quote",
    b: "One clear price, with no hidden costs. What you see is what you pay.",
  },
  {
    h: "We lead the trek",
    b: "Certified leaders, caring on-trail support and our team reachable 24×7 until you are home.",
  },
];

export default function CustomTreksPage() {
  const { contact, stats } = brand;
  const subject = encodeURIComponent("Custom trek enquiry");

  return (
    <>
      <SiteHeader variant="dark" />
      <main className="px-3 pb-16 pt-3 sm:px-5 sm:pb-24 sm:pt-4">
        <div className="mx-auto max-w-[1320px]">
          {/* Hero */}
          <header className="relative flex min-h-[680px] flex-col overflow-hidden rounded-bento bg-ink-900 sm:min-h-[740px] lg:min-h-[800px]">
            <Photo name="snowGroup" width={2200} priority alt="" />
            <div className="absolute inset-0 bg-ink-950/40" aria-hidden="true" />
            <div className="scrim-b absolute inset-0 opacity-90" aria-hidden="true" />
            <div className="relative flex flex-1 flex-col items-center justify-center px-5 pb-10 pt-[130px] text-center sm:px-10">
              <span className="glass inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[13px] text-white">
                <Sparkles size={14} className="text-forest-300" /> Custom treks · Women-only batches
              </span>
              <h1 className="font-display mt-6 max-w-[16ch] text-[clamp(2.6rem,7.4vw,5.6rem)] leading-[0.98] text-white">
                Your trek, planned around you.
              </h1>
              <p className="mt-6 max-w-[58ch] text-[16.5px] leading-relaxed text-white/80 sm:text-[18px]">
                Fully customised Himalayan treks for school groups, corporate teams, solo
                travellers, friends and families. Your dates, your pace, your pickup point —
                with the same all-inclusive pricing and no hidden costs.
              </p>
              <div className="mt-9 flex flex-wrap justify-center gap-3">
                <Button href={`mailto:${contact.email}?subject=${subject}`} variant="light" size="lg">
                  Plan my trek
                </Button>
                <Button href="#how" variant="glass" size="lg">
                  How it works <ArrowDown size={16} />
                </Button>
              </div>
            </div>
            <dl className="relative grid grid-cols-2 gap-2.5 p-3 sm:gap-3 sm:p-5 lg:grid-cols-4">
              {[
                { to: stats.trekkers, suffix: "+", l: "Trekkers led safely" },
                { to: stats.routes, suffix: "+", l: "Himalayan routes" },
                { to: stats.rating, suffix: "/5", l: "Average rating" },
                { to: stats.fromPrice, prefix: "₹", l: "Treks start from" },
              ].map((s) => (
                <div key={s.l} className="glass rounded-[20px] p-4 sm:p-5">
                  <dt className="text-[12.5px] leading-snug text-white/75">{s.l}</dt>
                  <dd className="nums font-display mt-2 text-[clamp(1.6rem,3.2vw,2.4rem)] leading-none text-white">
                    <CountUp to={s.to} prefix={s.prefix} suffix={s.suffix} />
                  </dd>
                </div>
              ))}
            </dl>
          </header>

          {/* Who it's for */}
          <section aria-labelledby="who" className="pt-14 sm:pt-20">
            <div className="mb-8 grid gap-x-10 gap-y-4 px-2 lg:grid-cols-2 lg:items-end">
              <div>
                <Eyebrow>Who it&rsquo;s for</Eyebrow>
                <h2 id="who" className="font-display mt-3 text-[clamp(1.9rem,3.8vw,3rem)] leading-[1.04] text-ink-900">
                  A trek for every kind of group
                </h2>
              </div>
              <p className="max-w-[54ch] text-[16px] leading-relaxed text-ink-500 lg:justify-self-end">
                Whoever you are bringing, we plan the trek around them — and lead it ourselves,
                with the small-group care every {brand.name} trek gets.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
              {brand.custom.audiences.map((a, i) => {
                const { icon: Icon, photo, line } = AUDIENCES[a];
                return (
                  <Reveal key={a} delay={(i % 4) * 0.06} className="h-full">
                    <article className="relative flex aspect-[4/3] h-full flex-col justify-end overflow-hidden rounded-bento bg-ink-800 sm:aspect-[3/4]">
                      <Photo name={photo} width={900} alt="" />
                      <div className="scrim-b absolute inset-0" aria-hidden="true" />
                      <div className="glass relative m-3 rounded-[20px] p-4 sm:p-5">
                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-ink-900">
                          <Icon size={18} />
                        </span>
                        <h3 className="mt-4 text-[20px] font-semibold leading-tight tracking-[-0.02em] text-white">{a}</h3>
                        <p className="mt-1.5 text-[14px] leading-snug text-white/80">{line}</p>
                      </div>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </section>

          {/* What you can customise */}
          <section
            aria-labelledby="flex"
            className="mt-14 rounded-bento bg-ice-100 p-6 sm:mt-20 sm:p-10 lg:p-12"
          >
            <div className="grid gap-x-14 gap-y-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center">
              <div>
                <Eyebrow>Make it yours</Eyebrow>
                <h2 id="flex" className="font-display mt-3 text-[clamp(1.9rem,3.8vw,3rem)] leading-[1.04] text-ink-900">
                  What you can{" "}
                  <span className="brush mt-1 inline-block whitespace-nowrap">customise</span>
                </h2>
                <p className="mt-4 max-w-[48ch] text-[16px] leading-relaxed text-ink-600">
                  Change what you need to. What stays the same: certified trek leaders, small
                  groups, caring on-trail support and 24×7 service.
                </p>
              </div>
              <ul className="grid gap-3 sm:grid-cols-2">
                {brand.custom.flexible.map((f, i) => {
                  const { icon: Icon, line } = FLEXIBLE[f];
                  return (
                    <Reveal key={f} as="li" delay={(i % 2) * 0.07} className="h-full">
                      <div className="flex h-full flex-col rounded-[22px] bg-white p-5 shadow-soft sm:p-6">
                        <span
                          className={`inline-flex h-11 w-11 items-center justify-center rounded-full ${
                            i === 0 ? "bg-forest-500 text-white" : "bg-ink-900 text-white"
                          }`}
                        >
                          <Icon size={18} />
                        </span>
                        <p className="mt-5 text-[18px] font-semibold leading-tight tracking-[-0.02em] text-ink-900">{f}</p>
                        <p className="mt-1.5 text-[14.5px] leading-relaxed text-ink-500">{line}</p>
                      </div>
                    </Reveal>
                  );
                })}
              </ul>
            </div>
          </section>

          {/* Women-only batches */}
          <section
            aria-labelledby="women"
            className="mt-3 grid overflow-hidden rounded-bento bg-ink-900 text-white sm:mt-5 lg:grid-cols-2"
          >
            <div className="relative min-h-[300px] sm:min-h-[380px] lg:min-h-[520px]">
              <Photo name="leaderPortrait" width={1200} alt="" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-900/70 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-ink-900/40" aria-hidden="true" />
            </div>
            <div className="relative flex flex-col justify-center p-6 sm:p-10 lg:p-14">
              <Eyebrow onDark>Women-only batches</Eyebrow>
              <h2 id="women" className="font-display mt-4 max-w-[16ch] text-[clamp(1.9rem,4vw,3.2rem)] leading-[1.04]">
                Led by women, for women.
              </h2>
              <p className="mt-5 max-w-[50ch] text-[16px] leading-relaxed text-white/70">
                Our women-only batches are led by female trek leaders, with the same small
                groups, certified leadership and round-the-clock support as every other{" "}
                {brand.name} trek. A comfortable way to take on the Himalaya — whether you are
                coming with friends or on your own.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-6">
                <div className="flex flex-wrap gap-3">
                  <Button href="/treks?green=1" variant="light" size="lg">
                    See treks with women-only batches
                  </Button>
                </div>
                <div className="hidden sm:block">
                  <CircularTextButton
                    href="/treks?green=1"
                    text="Women-only · led by women · small groups · "
                    label="See treks with women-only batches"
                    size={120}
                    tabIndex={-1}
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* How it works */}
          <section id="how" aria-labelledby="how-title" className="scroll-mt-24 pt-14 sm:pt-20">
            <div className="mb-8 px-2">
              <Eyebrow>How it works</Eyebrow>
              <h2 id="how-title" className="font-display mt-3 text-[clamp(1.9rem,3.8vw,3rem)] leading-[1.04] text-ink-900">
                From first message to the summit
              </h2>
              <p className="mt-3 max-w-[56ch] text-[16px] leading-relaxed text-ink-500">
                Four steps, and you only have to take the first one.
              </p>
            </div>
            <ol className="grid gap-3 sm:gap-5 md:grid-cols-2 lg:grid-cols-4">
              {STEPS.map((s, i) => {
                const dark = i === STEPS.length - 1;
                return (
                  <Reveal key={s.h} as="li" delay={i * 0.07} className="h-full">
                    <div
                      className={`relative flex h-full min-h-[200px] flex-col overflow-hidden rounded-bento p-6 sm:min-h-[250px] sm:p-7 ${
                        dark ? "bg-ink-900 text-white" : "bg-white text-ink-900 shadow-soft"
                      }`}
                    >
                      <span
                        className={`nums font-display pointer-events-none absolute -right-2 -top-6 text-[130px] leading-none ${
                          dark ? "text-white/15" : "text-mist-200"
                        }`}
                        aria-hidden="true"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={`nums relative inline-flex h-10 w-10 items-center justify-center rounded-full text-[14px] font-semibold ${
                          dark ? "bg-forest-500 text-white" : "bg-ink-900 text-white"
                        }`}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="relative mt-auto pt-10">
                        <h3 className="text-[21px] font-semibold leading-tight tracking-[-0.02em]">{s.h}</h3>
                        <p className={`mt-2 text-[15px] leading-relaxed ${dark ? "text-white/65" : "text-ink-500"}`}>
                          {s.b}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </ol>
          </section>

          {/* Contact band */}
          <section
            aria-labelledby="start"
            className="relative mt-14 overflow-hidden rounded-bento bg-forest-500 px-6 py-12 text-ink-950 sm:mt-20 sm:px-12 sm:py-16"
          >
            <div
              className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-white/20 blur-2xl"
              aria-hidden="true"
            />
            <div className="relative grid items-end gap-10 lg:grid-cols-[minmax(0,1fr)_auto]">
              <div>
                <p className="inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.16em] text-ink-900/75">
                  <HeartHandshake size={14} aria-hidden="true" /> Start planning
                </p>
                <h2 id="start" className="font-display mt-4 max-w-[20ch] text-[clamp(1.9rem,4vw,3.2rem)] leading-[1.04]">
                  Tell us about your group.
                </h2>
                <p className="mt-4 max-w-[52ch] text-[16px] leading-relaxed text-ink-900/80">
                  Email or WhatsApp us with who is coming, roughly when, and what you have in
                  mind. {contact.responseTime}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button href={`mailto:${contact.email}?subject=${subject}`} variant="dark" size="lg">
                    <Mail size={17} /> Email us
                  </Button>
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-[15.5px] font-medium text-ink-900 transition-colors hover:bg-mist-100"
                  >
                    <MessageCircle size={17} /> WhatsApp
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </div>
              </div>
              <ul className="grid gap-2 text-[15px]" aria-label="Phone numbers">
                <li className="text-[13px] text-ink-900/70">Or call</li>
                {contact.phones.map((p) => (
                  <li key={p}>
                    <a
                      href={telHref(p)}
                      className="nums inline-flex items-center gap-2 font-semibold text-ink-950 underline-offset-4 hover:underline"
                    >
                      <Phone size={14} aria-hidden="true" /> {p}
                    </a>
                  </li>
                ))}
                <li className="mt-1 break-words text-ink-900/80">
                  <a href={`mailto:${contact.email}`} className="underline-offset-4 hover:underline">
                    {contact.email}
                  </a>
                </li>
              </ul>
            </div>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

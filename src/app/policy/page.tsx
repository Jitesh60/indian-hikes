import type { Metadata } from "next";
import { InfoShell, Panel, Prose, H2 } from "@/components/site/InfoShell";
import { Reveal } from "@/components/site/motion";
import { Info, Mail } from "lucide-react";
import { Button } from "@/components/site/ui";
import { brand } from "@/data/brand";

export const metadata: Metadata = {
  title: "Cancellation policy",
  description: "What you get back, when, and what happens if we cancel instead.",
};

/** When, what you get back, and how much of the fee comes back in any form (for the bar). */
const SCALE = [
  { when: "More than 30 days before", back: "Full refund, or a voucher with no expiry", pct: 100, bar: "bg-pine-500", tag: "100%" },
  { when: "30 to 20 days before", back: "50% cash refund, or 100% as a voucher", pct: 100, bar: "bg-pine-500/60", tag: "50–100%" },
  { when: "20 to 10 days before", back: "No cash refund, 75% as a voucher", pct: 75, bar: "bg-sun-400", tag: "75%" },
  { when: "Fewer than 10 days", back: "No refund and no voucher", pct: 0, bar: "bg-forest-500", tag: "0%" },
];

export default function PolicyPage() {
  return (
    <InfoShell
      eyebrow="Cancellation policy"
      title="What happens if you cannot go"
      intro="Plans change, and we would rather explain how cancellations work up front than have you discover it in an email. Here is how it usually works."
    >
      <div className="flex flex-col gap-4 rounded-bento bg-ink-900 p-5 text-white sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:p-7">
        <div className="flex items-start gap-4">
          <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-forest-500">
            <Info size={19} />
          </span>
          <p className="max-w-[70ch] text-[15.5px] leading-relaxed text-white/80">
            <span className="font-semibold text-white">The exact terms for your trek are confirmed with you at booking.</span>{" "}
            The scale below is a general guide; if your booking confirmation says something
            different, your confirmation applies. Questions? Contact the team — {brand.contact.responseTime.toLowerCase()}
          </p>
        </div>
        <a
          href={`mailto:${brand.contact.email}?subject=${encodeURIComponent("Cancellation question")}`}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-white px-5 py-2.5 text-[14.5px] font-medium text-ink-900 transition-colors hover:bg-mist-100"
        >
          <Mail size={16} /> Email us
        </a>
      </div>

      <Panel>
        <H2 eyebrow="If you cancel" intro="A general guide, measured from the start date of your departure rather than the date you booked. Your booking confirmation has the exact terms.">
          How refunds usually work
        </H2>
        <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {SCALE.map((s, i) => (
            <Reveal key={s.when} as="li" delay={i * 0.07} className="h-full">
              <div className="flex h-full flex-col rounded-[22px] bg-mist-50 p-5 ring-1 ring-mist-200 sm:p-6">
                <p className="text-[13px] text-ink-500">{s.when}</p>
                <p className="nums font-display mt-3 text-[34px] leading-none text-ink-900">{s.tag}</p>
                <p className="mt-3 flex-1 text-[15px] leading-snug text-ink-700">{s.back}</p>
                <div className="mt-5 h-2 overflow-hidden rounded-full bg-mist-200" aria-hidden="true">
                  <div className={`h-full rounded-full ${s.bar}`} style={{ width: `${Math.max(s.pct, 3)}%` }} />
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </Panel>

      <div className="grid gap-3 sm:gap-5 lg:grid-cols-2">
        <Panel>
          <H2 eyebrow="If we cancel">You get it all back</H2>
          <Prose>
            <p>
              We cancel departures for three reasons: too few people booked, a road or permit
              closure, or a forecast that makes the trek unsafe. In all three cases you get a
              full cash refund or a voucher, whichever you prefer, and we do not keep the
              payment gateway charge.
            </p>
            <p>
              We will tell you as early as we know. For under-subscribed departures that is
              usually three weeks out. For weather it can be the night before, and we accept
              that this is genuinely disruptive — if you have already travelled, we cover
              your accommodation at the basecamp until you can get home.
            </p>
          </Prose>
        </Panel>

        <Panel tone="dark" className="on-dark">
          <H2 eyebrow="If your trek ends on the mountain" onDark>
            Why no refund applies
          </H2>
          <Prose onDark>
            <p>
              If a trek leader sends you down on medical grounds, no refund applies. This is
              the hardest line in this policy and the one people find most unfair, so it is
              worth explaining: the cost of your trek is spent the moment the group leaves
              basecamp — on staff, on permits, on food carried up, on the tent that is now
              pitched for you.
            </p>
            <p>
              Talk to us when you are back down. We would much rather see you on the trail
              again, and the team will tell you what we can offer for a future trek.
            </p>
          </Prose>
        </Panel>
      </div>

      <Panel tone="ice">
        <div className="grid gap-x-14 gap-y-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div>
            <H2 eyebrow="Changing plans">Moving to a different date</H2>
            <Prose>
              <p>
                Free more than 30 days out, once. After that, or for a second change, it is
                treated as a cancellation and a fresh booking. Transferring your place to
                somebody else is free at any time up to five days before departure — we only
                need their details for the permit.
              </p>
            </Prose>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href="/account" variant="dark">
              Manage a booking
            </Button>
            <Button href="/contact" variant="outline">
              Ask us
            </Button>
          </div>
        </div>
      </Panel>
    </InfoShell>
  );
}

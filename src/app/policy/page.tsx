import type { Metadata } from "next";
import { InfoShell, Panel, Prose, H2 } from "@/components/site/InfoShell";
import { Reveal } from "@/components/site/motion";
import { Info, Mail, Repeat2 } from "lucide-react";
import { Button } from "@/components/site/ui";
import { brand, whatsappHref } from "@/data/brand";

export const metadata: Metadata = {
  title: "Cancellation policy",
  description:
    "HeyHikers cancellation and refund terms: full refund 30+ days out, 50% at 15–29 days, and free transfers to another person or date after that.",
};

const BAR = ["bg-pine-500", "bg-sun-400", "bg-ember-500"];
const TAG = ["100%", "50%", "0%"];

export default function PolicyPage() {
  return (
    <InfoShell
      eyebrow="Cancellation policy"
      title="What happens if you cannot go"
      intro="Plans change. Here is exactly what you get back, and how to keep your trek when you can't make the original date."
    >
      <Panel>
        <H2 eyebrow="If you cancel" intro="Measured from the start date of your departure, not the date you booked.">
          The refund scale
        </H2>
        <ol className="grid gap-3 md:grid-cols-3">
          {brand.cancellation.map((s, i) => (
            <Reveal key={s.when} as="li" delay={i * 0.07} className="h-full">
              <div className="flex h-full flex-col rounded-[22px] bg-mist-50 p-5 ring-1 ring-mist-200 sm:p-6">
                <p className="text-[13px] text-ink-500">{s.when}</p>
                <p className="nums font-display mt-3 text-[34px] leading-none text-ink-900">{TAG[i]}</p>
                <p className="mt-3 flex-1 text-[15px] leading-snug text-ink-700">{s.back}</p>
                <div className="mt-5 h-2 overflow-hidden rounded-full bg-mist-200" aria-hidden="true">
                  <div className={`h-full rounded-full ${BAR[i]}`} style={{ width: `${Math.max(s.pct, 3)}%` }} />
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </Panel>

      <div className="grid gap-3 sm:gap-5 lg:grid-cols-2">
        <Panel tone="ice">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-forest-500">
            <Repeat2 size={20} />
          </span>
          <H2 eyebrow="Can't make it?">Transfer it instead</H2>
          <Prose>
            <p>
              Inside 14 days there is no refund — but your trek isn&apos;t lost. You can transfer your booking to
              another person or move it to another date at no extra charge. Message us with the new name or the
              date you&apos;d like, and we&apos;ll take care of the rest.
            </p>
          </Prose>
        </Panel>

        <Panel tone="dark" className="on-dark">
          <H2 eyebrow="Safety first" onDark>
            If the mountain says no
          </H2>
          <Prose onDark>
            <p>
              Weather, road closures and permits can change a plan at short notice. If a departure has to be
              moved or called off for safety, we&apos;ll contact you straight away and work out the next step with
              you.
            </p>
            <p>
              On the trail, your trek leader&apos;s call on safety is final. We would always rather bring you back
              another season than take a risk.
            </p>
          </Prose>
        </Panel>
      </div>

      <div className="flex flex-col gap-4 rounded-bento bg-ink-900 p-5 text-white sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:p-7">
        <div className="flex items-start gap-4">
          <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-forest-500">
            <Info size={19} />
          </span>
          <p className="max-w-[70ch] text-[15.5px] leading-relaxed text-white/80">
            <span className="font-semibold text-white">Need to cancel or change a booking?</span> Email or WhatsApp
            the team with your booking details. {brand.contact.responseTime}
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-2">
          <a
            href={`mailto:${brand.contact.email}?subject=${encodeURIComponent("Cancellation or date change")}`}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-2.5 text-[14.5px] font-medium text-ink-900 transition-colors hover:bg-mist-100"
          >
            <Mail size={16} /> Email us
          </a>
          <Button href={whatsappHref} variant="outline-light">
            WhatsApp
          </Button>
        </div>
      </div>
    </InfoShell>
  );
}

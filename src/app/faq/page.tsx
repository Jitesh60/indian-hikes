import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MessageCircle } from "lucide-react";
import { InfoShell } from "@/components/site/InfoShell";
import { FaqAccordion, type FaqGroup } from "@/components/site/content/FaqAccordion";
import { brand, telHref, whatsappHref } from "@/data/brand";
import { treks } from "@/data/treks";
import { inr } from "@/lib/types";

export const metadata: Metadata = {
  title: "Questions people ask",
  description: `Answers to the questions people ask ${brand.name} most before they book a Himalayan trek.`,
};

/** "a, b and c" */
function list(items: string[]) {
  return items.length < 2 ? items.join("") : `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

export default function FaqPage() {
  const { stats, contact } = brand;
  const firstTimers = treks.filter((t) => t.firstTimer && t.slug !== "kedarkantha").map((t) => t.name);

  const GROUPS: FaqGroup[] = [
    {
      group: "Choosing a trek",
      qs: [
        {
          q: "I have never trekked. Where do I start?",
          a: <>
            Kedarkantha is the classic first Himalayan trek, and where many people
            begin. {list(firstTimers.slice(0, 4))} are also good first treks — steady
            trails and a short enough itinerary that one hard day does not
            spoil the trip. Tell us about your fitness and we will suggest the right one.
          </>,
        },
        {
          q: "When is the best time to trek?",
          a: <>
            It depends on the trail. December to March is snow-trek season for routes like
            Kedarkantha and Brahmatal; spring brings rhododendron bloom; September and October
            have the clearest skies of the year; and during the monsoon the rain-shadow treks
            stay dry. We have written it all up in{" "}
            <Link href="/stories/best-time-to-trek-himalayas-month-by-month">
              the best time to trek, month by month
            </Link>
            .
          </>,
        },
        {
          q: "How fit do I need to be?",
          a: <>
            Fit enough to walk for five to six hours on uphill trails, day after day. Endurance
            matters far more than strength, and most people can get there in two months.
            Follow our{" "}
            <Link href="/stories/how-to-train-for-himalayan-trek-8-weeks">eight-week training plan</Link>{" "}
            — it works even if you are starting from a desk job — and see the{" "}
            <Link href="/fitness">fitness guide</Link> for what each grade asks of you.
          </>,
        },
        {
          q: "Does altitude or grade matter more?",
          a: "Altitude, usually. Grade describes how hard the walking is, which you can train for. Altitude affects everyone differently regardless of training, which is why we climb gradually and our leaders keep a close eye on every trekker.",
        },
      ],
    },
    {
      group: "Pricing and booking",
      qs: [
        {
          q: "How much does a trek cost?",
          a: <>
            Our treks start from {inr(stats.fromPrice)}. Every trek page shows its price, and
            that price is all-inclusive — transparent, with no hidden costs. What you see is
            what you pay. <Link href="/treks">Compare all treks</Link>.
          </>,
        },
        {
          q: "Is pickup and drop included?",
          a: "On most of our treks, yes. We also help with transport from Dehradun, Manali and Srinagar to the trailhead, so you are not left to work out the last stretch on your own. Each trek page says exactly what is included.",
        },
        {
          q: "How do I book?",
          a: <>
            Pick a trek and a departure date on this site, or simply get in touch — email{" "}
            <a href={`mailto:${contact.email}`}>{contact.email}</a>, call{" "}
            <a href={telHref(contact.phones[0])}>{contact.phones[0]}</a> or{" "}
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
              message us on WhatsApp
            </a>
            . {contact.responseTime}
          </>,
        },
        {
          q: "What if I need to cancel?",
          a: <>
            Plans change, and we understand that. The exact cancellation terms for your
            trek are confirmed with you at booking. Our <Link href="/policy">cancellation policy</Link>{" "}
            explains how it works, and you can always <Link href="/contact">ask us</Link>.
          </>,
        },
      ],
    },
    {
      group: "Groups, solo and custom treks",
      qs: [
        {
          q: "Can you plan a trek just for our group?",
          a: <>
            Yes. We run fully customised treks for {list(brand.custom.audiences.map((a) => a.toLowerCase()))}.
            You choose the dates, the pace, the pickup point, and we plan around any dietary
            needs. <Link href="/custom-treks">See how custom treks work</Link>.
          </>,
        },
        {
          q: "Do you run women-only batches?",
          a: <>
            Yes. Our women-only batches are led by female trek leaders. A good choice if you
            are a woman trekking solo.{" "}
            <Link href="/treks?green=1">See treks with women-only batches</Link>.
          </>,
        },
        {
          q: "I am travelling solo. Can I join?",
          a: "Of course. Solo trekkers join our regular batches, or a women-only batch, and you will be walking with a small group from day one. If you would rather go at your own pace, we can plan a customised trek for you too.",
        },
        {
          q: "How big are the groups?",
          a: "Small. We keep batches small on purpose, so our leaders can watch every trekker, every day — and so the trail still feels like the mountains, not a queue.",
        },
      ],
    },
    {
      group: "Safety and on the trail",
      qs: [
        {
          q: "How safe are your treks?",
          a: <>
            We have led more than {stats.trekkers.toLocaleString("en-IN")} trekkers with zero
            serious incidents in {stats.years} years. Every group is led by certified trek
            leaders who know the route personally, and our team is reachable 24×7 while you
            are on the trail. Read <Link href="/safety">how we handle altitude and safety</Link>.
          </>,
        },
        {
          q: "What about altitude sickness?",
          a: <>
            It can affect anyone, however fit. We build gradual ascents into our itineraries,
            our leaders check on every trekker through the day, and if someone is unwell the
            answer is always to go down. Our explainer on{" "}
            <Link href="/stories/what-12000-feet-does-to-you">what 12,000 feet does to you</Link>{" "}
            covers the symptoms to watch for.
          </>,
        },
        {
          q: "Can you cater to dietary needs?",
          a: "Yes. Tell us about allergies, restrictions or preferences when you book and we will plan the trek meals around them.",
        },
        {
          q: "Will I have mobile signal?",
          a: "Expect patchy or no signal once you leave the roadhead on most high trails. Share your itinerary with family before you set out — and remember our team is reachable around the clock while your group is out.",
        },
      ],
    },
  ];

  return (
    <InfoShell
      photo="valley"
      eyebrow="Questions people ask"
      title="Questions people ask before they book"
      intro="These are the ones that come up most. If yours is not here, ask us — we reply to every email within 24 hours."
    >
      <div className="grid gap-x-8 gap-y-8 pt-6 sm:pt-10 lg:grid-cols-[minmax(0,1fr)_340px]">
        <FaqAccordion groups={GROUPS} />

        <aside className="self-start lg:sticky lg:top-28">
          <div className="rounded-bento bg-ink-900 p-6 text-white sm:p-8">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-forest-500">
              <MessageCircle size={19} />
            </span>
            <h2 className="mt-6 text-[22px] font-semibold leading-tight tracking-[-0.02em]">
              Still deciding between two treks?
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-white/65">
              Tell us your fitness honestly and the weeks you can take off. We will tell you
              which one to book — and sometimes that neither is right yet.
            </p>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-2.5 text-[14.5px] font-medium text-ink-900 transition-colors hover:bg-mist-100"
            >
              <MessageCircle size={16} /> Chat on WhatsApp
              <span className="sr-only">(opens in a new tab)</span>
            </a>
            <a
              href={`mailto:${contact.email}`}
              className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/30 px-5 py-2.5 text-[14.5px] font-medium text-white transition-colors hover:border-white hover:bg-white/5"
            >
              <Mail size={16} /> Email us
            </a>
            <Link
              href="/treks"
              className="mt-4 block text-center text-[14px] text-white/65 underline decoration-white/30 underline-offset-4 transition-colors hover:text-white"
            >
              Or compare all treks
            </Link>
          </div>
        </aside>
      </div>
    </InfoShell>
  );
}

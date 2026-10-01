import type { Metadata } from "next";
import { MessageCircle } from "lucide-react";
import { InfoShell } from "@/components/site/InfoShell";
import { FaqAccordion, type FaqGroup } from "@/components/site/content/FaqAccordion";
import { Button } from "@/components/site/ui";

export const metadata: Metadata = {
  title: "Questions people ask",
  description: "Answers to the questions people ask most before they book a trek.",
};

const GROUPS: FaqGroup[] = [
  {
    group: "Choosing a trek",
    qs: [
      ["I have never trekked. Where do I start?", "Dayara Bugyal or Deoriatal–Chandrashila. Both stay under 12,100 ft, both have gentle gradients, and both are short enough that a bad day does not ruin the trip. Avoid anything graded Difficult until you have two Himalayan treks behind you."],
      ["Does altitude or grade matter more?", "Altitude, almost always. Grade describes how hard the walking is, which you can train for. Altitude describes what happens to your body regardless of training, and it is the thing that ends treks. A Moderate trek at 14,100 ft is harder on most people than a Moderate–Difficult one at 12,000 ft."],
      ["Can I bring my children?", "On the five treks marked for families, from age ten. Below that the cold at night is the limiting factor rather than the walking. Children under sixteen must have a parent on the same departure."],
      ["Is there an upper age limit?", "No. Our oldest trekker last season was seventy-four, on Dayara Bugyal. Above sixty we ask for a doctor's note for anything going past 13,000 ft."],
    ],
  },
  {
    group: "Booking and money",
    qs: [
      ["How much do I pay upfront?", "Twenty-five per cent to hold your slot. The balance is due thirty days before you leave, and we send a reminder ten days before that."],
      ["What is not included in the trek fee?", "Transport from the railhead, backpack offloading, gear rental and insurance. All four are optional add-ons at booking and all four can be added later, up to a week before departure."],
      ["Can I book for a group?", "Up to the remaining slots on any open departure. For groups larger than eight we can run a private departure on a date you choose — write to us rather than booking online."],
      ["What if my dates are full?", "Join the waitlist on that departure. Cancellations happen on roughly one booking in seven, and waitlist places are offered in order. Nothing is charged until a slot opens and you accept it."],
    ],
  },
  {
    group: "On the trek",
    qs: [
      ["What is the food like?", "Vegetarian throughout, cooked fresh at camp. Breakfast, packed lunch, evening snacks and dinner. Tell us about allergies and restrictions when you book and the basecamp kitchen plans around them."],
      ["How do the toilets work?", "Dry toilet tents at every campsite, dug and closed properly when the group leaves. On four routes we now have permanent bio-toilets at the busiest camps."],
      ["Will I have mobile signal?", "Assume not, from the second day onward. Basecamps have signal and a landline. Every group carries a satellite communicator, and your emergency contact gets the basecamp number before you leave."],
      ["Who carries my bag?", "You do, unless you add offloading, in which case a mule carries it between camps and you walk with a day pack. Offloading must be booked before you arrive at basecamp — we cannot arrange mules on the day."],
      ["What if I cannot keep up?", "There is always a staff member at the back of the group, and the day's schedule has enough slack for the slowest walker. If you genuinely cannot make a campsite, you descend with two staff to the previous one. It happens on maybe one trek in twenty."],
    ],
  },
];

export default function FaqPage() {
  return (
    <InfoShell
      photo="valley"
      eyebrow="Questions people ask"
      title="Questions people ask before they book"
      intro="These are the ones that come up most. If yours is not here, ask us — the answer usually ends up on this page."
    >
      <div className="grid gap-x-8 gap-y-8 pt-6 sm:pt-10 lg:grid-cols-[minmax(0,1fr)_340px]">
        <FaqAccordion groups={GROUPS} />

        <aside className="self-start lg:sticky lg:top-28">
          <div className="rounded-bento bg-ink-900 p-6 text-white sm:p-8">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-ember-500">
              <MessageCircle size={19} />
            </span>
            <h2 className="mt-6 text-[22px] font-semibold leading-tight tracking-[-0.02em]">
              Still deciding between two treks?
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-white/65">
              Tell us your fitness honestly and the weeks you can take off. We will tell
              you which one to book, and sometimes that neither is right yet.
            </p>
            <Button href="/contact" variant="light" className="mt-6 w-full">
              Ask us directly
            </Button>
            <Button href="/treks" variant="outline-light" className="mt-3 w-full">
              Compare all treks
            </Button>
          </div>
        </aside>
      </div>
    </InfoShell>
  );
}

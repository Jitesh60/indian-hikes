"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Button } from "@/components/site/ui";

const GROUPS = [
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
  const [open, setOpen] = useState<string | null>(GROUPS[0].qs[0][0]);

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-[1360px] px-5 sm:px-8 py-12 sm:py-16">
        <header className="mb-12 max-w-[54ch]">
          <h1 className="font-display text-[clamp(2.3rem,5vw,3.4rem)] leading-[1.03]">
            Questions people ask before they book
          </h1>
          <p className="mt-5 text-[17px] leading-relaxed text-spruce-800/70">
            These are the ones that come up most. If yours is not here, ask us — the answer
            usually ends up on this page.
          </p>
        </header>

        <div className="grid lg:grid-cols-[minmax(0,1fr)_320px] gap-x-16 gap-y-12">
          <div className="space-y-14">
            {GROUPS.map((g) => (
              <section key={g.group}>
                <h2 className="font-display text-[clamp(1.6rem,3vw,2.1rem)] leading-tight mb-6">
                  {g.group}
                </h2>
                <div className="border-t border-snow-300">
                  {g.qs.map(([q, a]) => {
                    const on = open === q;
                    return (
                      <div key={q} className="border-b border-snow-300">
                        <button
                          onClick={() => setOpen(on ? null : q)}
                          aria-expanded={on}
                          className="w-full flex items-start justify-between gap-6 py-5 text-left group"
                        >
                          <span className="text-[17.5px] font-semibold leading-snug group-hover:text-deodar-600 transition-colors">
                            {q}
                          </span>
                          <span className="shrink-0 mt-1 text-snow-500">
                            {on ? <Minus size={18} /> : <Plus size={18} />}
                          </span>
                        </button>
                        {on && (
                          <p className="pb-6 -mt-1 text-[16.5px] leading-[1.68] text-spruce-800/80 measure">
                            {a}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>

          <aside className="lg:sticky lg:top-6 self-start border border-snow-300 bg-snow-50 p-7">
            <h2 className="font-display-tight text-[21px] leading-tight">
              Still deciding between two treks?
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-spruce-800/70">
              Tell us your fitness honestly and the weeks you can take off. We will tell
              you which one to book, and sometimes that neither is right yet.
            </p>
            <Button href="/contact" variant="dark" className="mt-6 w-full">
              Ask us directly
            </Button>
            <Button href="/treks" variant="outline" className="mt-3 w-full">
              Compare all treks
            </Button>
          </aside>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

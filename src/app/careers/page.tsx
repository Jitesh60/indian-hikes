import type { Metadata } from "next";
import Link from "next/link";
import { InfoShell, Prose, H2 } from "@/components/site/InfoShell";
import { inr } from "@/lib/types";

export const metadata: Metadata = {
  title: "Work with us",
  description: "Open roles on the mountain and in the office.",
};

const ROLES = [
  { title: "Trek leader", where: "Sankri, Lohajung, Manali, Sonamarg", type: "Seasonal, six months", pay: 42000, note: "No guiding experience needed. We run a six-week residential training course twice a year and pay you through it." },
  { title: "Green Trails coordinator", where: "Any basecamp", type: "Seasonal, four months", pay: 34000, note: "You run the eco-bag system, the weighing and the sorting shed for one basecamp." },
  { title: "Basecamp manager", where: "Yuksom, Sikkim", type: "Full time", pay: 58000, note: "Logistics, staff, stores and the local relationships that make a basecamp work." },
  { title: "Content and documentation", where: "Bengaluru, hybrid", type: "Full time", pay: 72000, note: "Turn trek reports into the public documentation. You will be sent on treks. This is not a perk, it is the job." },
  { title: "Product engineer", where: "Bengaluru, hybrid", type: "Full time", pay: 145000, note: "The booking system, the trek log and the tools basecamp staff use on patchy connections." },
];

export default function CareersPage() {
  return (
    <InfoShell
      title="Most of our staff were trekkers first"
      intro="Nobody here started out planning to work in the mountains. If you have walked with us and thought you would like to be on the other side of it, this is the way in."
    >
      <section>
        <H2>Open roles</H2>
        <div className="border-t border-snow-300">
          {ROLES.map((r) => (
            <div key={r.title} className="py-6 border-b border-snow-300">
              <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
                <h3 className="font-display-tight text-[22px] leading-tight">{r.title}</h3>
                <p className="nums text-[16px] font-semibold">
                  {inr(r.pay)}
                  <span className="text-[13px] text-snow-500 font-normal"> per month</span>
                </p>
              </div>
              <p className="nums text-[13.5px] text-snow-500 mt-1.5">
                {r.where} · {r.type}
              </p>
              <p className="text-[15.5px] text-spruce-800/75 mt-3 leading-relaxed measure">{r.note}</p>
              <Link
                href="/contact"
                className="inline-block mt-4 text-[15px] font-semibold border-b-2 border-bugyal-500 pb-0.5 hover:border-spruce-800 transition-colors"
              >
                Apply for this role
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section>
        <H2>What the trek leader training involves</H2>
        <Prose>
          <p>
            Six weeks, residential, at Sankri. Two weeks of altitude physiology and
            wilderness first aid, two weeks of technical skills — rope work, river
            crossing, snow craft — and two weeks shadowing live departures.
          </p>
          <p>
            You are paid a stipend throughout and there is no bond. Roughly half the people
            who finish the course lead for a season and move on, and that is a fine
            outcome. The ones who stay tend to stay for years.
          </p>
        </Prose>
      </section>
    </InfoShell>
  );
}

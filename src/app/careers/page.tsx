import type { Metadata } from "next";
import { ArrowUpRight, Clock, MapPin } from "lucide-react";
import { InfoShell, Panel, Prose, H2, StepNo } from "@/components/site/InfoShell";
import { Reveal } from "@/components/site/motion";
import { Button, Pill } from "@/components/site/ui";
import { inr } from "@/lib/types";

export const metadata: Metadata = {
  title: "Work with us",
  description: "Open roles on the mountain and in the office.",
};

const ROLES = [
  { title: "Trek leader", where: "Sankri, Lohajung, Manali, Sonamarg", type: "Seasonal, six months", pay: 42000, team: "Mountain", note: "No guiding experience needed. We run a six-week residential training course twice a year and pay you through it." },
  { title: "Green Trails coordinator", where: "Any basecamp", type: "Seasonal, four months", pay: 34000, team: "Mountain", note: "You run the eco-bag system, the weighing and the sorting shed for one basecamp." },
  { title: "Basecamp manager", where: "Yuksom, Sikkim", type: "Full time", pay: 58000, team: "Mountain", note: "Logistics, staff, stores and the local relationships that make a basecamp work." },
  { title: "Content and documentation", where: "Bengaluru, hybrid", type: "Full time", pay: 72000, team: "Office", note: "Turn trek reports into the public documentation. You will be sent on treks. This is not a perk, it is the job." },
  { title: "Product engineer", where: "Bengaluru, hybrid", type: "Full time", pay: 145000, team: "Office", note: "The booking system, the trek log and the tools basecamp staff use on patchy connections." },
];

const TRAINING = [
  { weeks: "Weeks 1–2", h: "Altitude physiology and wilderness first aid" },
  { weeks: "Weeks 3–4", h: "Technical skills — rope work, river crossing, snow craft" },
  { weeks: "Weeks 5–6", h: "Shadowing live departures" },
];

export default function CareersPage() {
  return (
    <InfoShell
      photo="hikerView"
      eyebrow="Work with us"
      title="Most of our staff were trekkers first"
      intro="Nobody here started out planning to work in the mountains. If you have walked with us and thought you would like to be on the other side of it, this is the way in."
    >
      <Panel tone="none">
        <div className="flex flex-wrap items-end justify-between gap-4 px-1 pt-6 sm:px-2 sm:pt-10">
          <H2 eyebrow={`${ROLES.length} open roles`}>Open roles</H2>
        </div>
        <div className="grid gap-3 sm:gap-5 md:grid-cols-2">
          {ROLES.map((r, i) => {
            const lead = i === 0;
            return (
              <Reveal key={r.title} delay={(i % 2) * 0.07} className={lead ? "h-full md:col-span-2" : "h-full"}>
                <article
                  className={`flex h-full flex-col rounded-bento p-6 sm:p-8 ${
                    lead ? "bg-ink-900 text-white" : "bg-white shadow-soft"
                  }`}
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <Pill tone={lead ? "glass" : r.team === "Mountain" ? "ice" : "neutral"}>{r.team}</Pill>
                    <Pill tone={lead ? "glass" : "neutral"}>
                      <MapPin size={11} /> {r.where}
                    </Pill>
                    <Pill tone={lead ? "glass" : "neutral"}>
                      <Clock size={11} /> {r.type}
                    </Pill>
                  </div>
                  <div className="mt-6 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
                    <h3
                      className={`font-display text-[clamp(1.5rem,2.6vw,2rem)] leading-tight ${
                        lead ? "text-white" : "text-ink-900"
                      }`}
                    >
                      {r.title}
                    </h3>
                    <p className={`nums text-[18px] font-semibold ${lead ? "text-white" : "text-ink-900"}`}>
                      {inr(r.pay)}
                      <span className={`text-[13px] font-normal ${lead ? "text-white/55" : "text-ink-400"}`}>
                        {" "}
                        per month
                      </span>
                    </p>
                  </div>
                  <p
                    className={`mt-3 max-w-[60ch] flex-1 text-[15.5px] leading-relaxed ${
                      lead ? "text-white/70" : "text-ink-500"
                    }`}
                  >
                    {r.note}
                  </p>
                  <div className="mt-6">
                    <Button href="/contact" variant={lead ? "primary" : "outline"} size="sm">
                      Apply for this role <ArrowUpRight size={15} />
                      <span className="sr-only">: {r.title}</span>
                    </Button>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Panel>

      <Panel tone="ice">
        <div className="grid gap-x-14 gap-y-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div>
            <H2 eyebrow="Six weeks at Sankri">What the trek leader training involves</H2>
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
          </div>
          <ol className="grid content-start gap-3">
            {TRAINING.map((t, i) => (
              <li key={t.weeks} className="flex items-center gap-4 rounded-[22px] bg-white p-5 shadow-soft">
                <StepNo n={i + 1} tone={i === 2 ? "ember" : "dark"} />
                <div className="min-w-0">
                  <p className="text-[13px] text-ink-400">{t.weeks}</p>
                  <p className="mt-0.5 text-[16px] font-semibold leading-snug text-ink-900">{t.h}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Panel>
    </InfoShell>
  );
}

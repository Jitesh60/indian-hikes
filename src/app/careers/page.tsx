import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";
import { ArrowUpRight, Compass, Mail, Mountain, Utensils } from "lucide-react";
import { InfoShell, Panel, Prose, H2, StepNo } from "@/components/site/InfoShell";
import { Reveal } from "@/components/site/motion";
import { Button } from "@/components/site/ui";
import { brand } from "@/data/brand";

export const metadata: Metadata = {
  title: "Work with us",
  description: `${brand.name} is a small, owner-operated team. We occasionally look for trek leaders, guides and cooks who know the Himalayan trails.`,
};

const PEOPLE: { icon: LucideIcon; h: string; b: string }[] = [
  {
    icon: Mountain,
    h: "Trek leaders",
    b: "People who can look after a small group at altitude — calm, careful and good company on a long day.",
  },
  {
    icon: Compass,
    h: "Guides",
    b: "Local knowledge of the trails: the turns, the campsites, the weather and the villages along the way.",
  },
  {
    icon: Utensils,
    h: "Cooks",
    b: "Good, hot food at high camp makes or breaks a trek. Our trekkers notice, and so do we.",
  },
];

const STEPS = [
  "Write to us with a few lines about yourself",
  "Tell us which trails you know, and how well",
  "Share any certifications or first-aid training",
];

export default function CareersPage() {
  const { email } = brand.contact;
  const subject = encodeURIComponent(`Working with ${brand.name}`);

  return (
    <InfoShell
      photo="hikerView"
      eyebrow="Work with us"
      title="Walk the trails with us"
      intro={`${brand.name} is a small, owner-operated team from ${brand.base}. We do not have a careers portal or a list of open roles — but we are always glad to hear from people who know these mountains.`}
    >
      <Panel>
        <div className="grid gap-x-14 gap-y-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-start">
          <div>
            <H2 eyebrow="Who we look for">People who know the trails</H2>
            <Prose>
              <p>
                From time to time we look for trek leaders, guides and cooks who know the{" "}
                {brand.ranges.join(", ").replace(/, ([^,]*)$/, " and $1")} trails. Every one of
                them is part of how we treat trekkers — like guests, not bookings.
              </p>
              <p>
                If that sounds like you, email us with your experience. We read every message
                and reply when there is a fit.
              </p>
            </Prose>
          </div>
          <div className="grid gap-3">
            {PEOPLE.map((p, i) => {
              const Icon = p.icon;
              return (
                <Reveal key={p.h} delay={i * 0.07}>
                  <div className="flex items-start gap-4 rounded-[22px] bg-mist-50 p-5 ring-1 ring-mist-200 sm:p-6">
                    <span
                      className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${
                        i === 0 ? "bg-forest-500 text-white" : "bg-ice-100 text-ink-900"
                      }`}
                    >
                      <Icon size={19} />
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-[18px] font-semibold leading-tight tracking-[-0.02em] text-ink-900">{p.h}</h3>
                      <p className="mt-1.5 text-[15px] leading-relaxed text-ink-500">{p.b}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Panel>

      <Panel tone="dark">
        <div className="grid gap-x-14 gap-y-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center">
          <div>
            <H2 eyebrow="How to get in touch" onDark>
              Send us your experience
            </H2>
            <a
              href={`mailto:${email}?subject=${subject}`}
              className="font-display block break-words text-[clamp(1.4rem,3vw,2.2rem)] leading-tight text-white underline decoration-forest-500 decoration-2 underline-offset-[6px] transition-colors hover:text-forest-300"
            >
              {email}
            </a>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={`mailto:${email}?subject=${subject}`} variant="primary">
                <Mail size={16} /> Email us
              </Button>
              <Button href="/about" variant="outline-light">
                About {brand.name} <ArrowUpRight size={15} />
              </Button>
            </div>
          </div>
          <ol className="grid content-start gap-3">
            {STEPS.map((s, i) => (
              <li key={s} className="flex items-center gap-4 rounded-[22px] bg-white/[0.06] p-4 ring-1 ring-white/10 sm:p-5">
                <StepNo n={i + 1} tone={i === 0 ? "ember" : "light"} />
                <p className="text-[16px] font-medium leading-snug text-white">{s}</p>
              </li>
            ))}
          </ol>
        </div>
      </Panel>
    </InfoShell>
  );
}

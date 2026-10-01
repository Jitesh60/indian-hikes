import type { Metadata } from "next";
import { Phone, Mail, MapPin, Radio } from "lucide-react";
import { InfoShell, Panel } from "@/components/site/InfoShell";
import { ContactForm } from "@/components/site/content/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Ask us before you book — about fitness, choosing a trek, or an existing booking.",
};

const CHANNELS = [
  { icon: Phone, h: "Phone", l: "+91 80 4670 0100", href: "tel:+918046700100", s: "Monday to Saturday, 9 am – 6 pm IST" },
  { icon: Mail, h: "Email", l: "trek@indiahikes.example", href: "mailto:trek@indiahikes.example", s: "Answered within one working day" },
  { icon: MapPin, h: "Office · Bengaluru", l: "139, Defence Colony Road, Indiranagar", s: "Visitors welcome, but call first" },
];

export default function ContactPage() {
  return (
    <InfoShell
      photo="woodenHut"
      eyebrow="Contact"
      title="Ask us before you book, not after"
      intro="The most useful conversation we have with anyone is the one where they describe their fitness honestly and we talk them out of the wrong trek."
    >
      <div className="grid gap-3 sm:gap-5 lg:grid-cols-[minmax(0,1fr)_380px]">
        <Panel as="div">
          <ContactForm />
        </Panel>

        <aside className="grid content-start gap-3 sm:gap-5" aria-label="Other ways to reach us">
          {CHANNELS.map((c) => {
            const Icon = c.icon;
            return (
              <div key={c.h} className="flex items-start gap-4 rounded-bento bg-white p-5 shadow-soft sm:p-6">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ice-100 text-ice-500">
                  <Icon size={18} />
                </span>
                <div className="min-w-0">
                  <p className="text-[13px] text-ink-500">{c.h}</p>
                  {c.href ? (
                    <a href={c.href} className="mt-1 block break-words text-[16.5px] font-semibold text-ink-900 hover:text-ember-600">
                      {c.l}
                    </a>
                  ) : (
                    <p className="mt-1 text-[16.5px] font-semibold leading-snug text-ink-900">{c.l}</p>
                  )}
                  <p className="mt-1 text-[13px] text-ink-400">{c.s}</p>
                </div>
              </div>
            );
          })}
          <div className="rounded-bento bg-ink-900 p-6 text-white sm:p-7">
            <span className="inline-flex items-center gap-2 rounded-full bg-ember-500 px-3 py-1.5 text-[12.5px] font-medium">
              <Radio size={13} /> On a trek right now?
            </span>
            <p className="mt-4 text-[15px] leading-relaxed text-white/75">
              Basecamp numbers are on the confirmation email for your departure. They
              are staffed around the clock while a group is out.
            </p>
          </div>
        </aside>
      </div>
    </InfoShell>
  );
}

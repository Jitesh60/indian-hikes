"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, Check } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Button, Field, inputCls } from "@/components/site/ui";
import { treks } from "@/data/treks";

const TOPICS = [
  "Choosing between two treks",
  "An existing booking",
  "Fitness and whether I am ready",
  "Group or corporate departures",
  "Working as a trek leader",
  "Something else",
];

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [topic, setTopic] = useState(TOPICS[0]);

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-[1360px] px-5 sm:px-8 py-12 sm:py-16">
        <header className="mb-12 max-w-[54ch]">
          <h1 className="font-display text-[clamp(2.4rem,5vw,3.6rem)] leading-[1.02]">
            Ask us before you book, not after
          </h1>
          <p className="mt-5 text-[17px] leading-relaxed text-spruce-800/70">
            The most useful conversation we have with anyone is the one where they
            describe their fitness honestly and we talk them out of the wrong trek.
          </p>
        </header>

        <div className="grid lg:grid-cols-[1fr_360px] gap-x-16 gap-y-12">
          <div>
            {sent ? (
              <div className="border border-snow-300 bg-snow-50 p-10">
                <div className="w-12 h-12 bg-deodar-600 text-snow-50 flex items-center justify-center">
                  <Check size={24} />
                </div>
                <h2 className="font-display text-[28px] leading-tight mt-6">Message received</h2>
                <p className="mt-3 text-[16px] leading-relaxed text-spruce-800/70 measure">
                  Somebody who has actually walked the trek you asked about will reply,
                  usually within a working day.
                </p>
                <Button onClick={() => setSent(false)} variant="outline" className="mt-7">
                  Send another
                </Button>
              </div>
            ) : (
              <form
                className="space-y-6"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
              >
                <div className="grid sm:grid-cols-2 gap-6">
                  <Field label="Your name" htmlFor="cname">
                    <input id="cname" className={inputCls} required placeholder="Full name" />
                  </Field>
                  <Field label="Email" htmlFor="cemail">
                    <input id="cemail" type="email" className={inputCls} required placeholder="you@example.com" />
                  </Field>
                </div>

                <Field label="What is this about?" htmlFor="ctopic">
                  <select
                    id="ctopic"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className={inputCls}
                  >
                    {TOPICS.map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </Field>

                <Field label="Which trek?" htmlFor="ctrek" hint="Leave on 'not sure yet' if that is the question">
                  <select id="ctrek" className={inputCls} defaultValue="">
                    <option value="">Not sure yet</option>
                    {treks.map((t) => (
                      <option key={t.slug} value={t.slug}>{t.name}</option>
                    ))}
                  </select>
                </Field>

                <Field
                  label="Tell us a bit more"
                  htmlFor="cmsg"
                  hint="If it is about fitness, the most useful thing you can give us is how far you can currently run and how long it takes."
                >
                  <textarea id="cmsg" rows={6} className={inputCls} required placeholder="Start anywhere" />
                </Field>

                <Button type="submit">Send message</Button>
                <p className="text-[13px] text-snow-500">
                  Demonstration only — this form does not send anything.
                </p>
              </form>
            )}
          </div>

          <aside className="space-y-px bg-snow-300 border border-snow-300 self-start">
            {[
              { icon: Phone, h: "Phone", l: "+91 80 4670 0100", s: "Monday to Saturday, 9 am – 6 pm IST" },
              { icon: Mail, h: "Email", l: "trek@indiahikes.example", s: "Answered within one working day" },
              { icon: MapPin, h: "Office", h2: "Bengaluru", l: "139, Defence Colony Road, Indiranagar", s: "Visitors welcome, but call first" },
            ].map((c) => {
              const Icon = c.icon;
              return (
                <div key={c.h} className="bg-snow-50 p-6">
                  <div className="flex items-center gap-2.5 text-deodar-600">
                    <Icon size={17} />
                    <span className="text-[13.5px] font-semibold">{c.h}</span>
                  </div>
                  {c.h2 && <p className="text-[15px] font-semibold mt-3">{c.h2}</p>}
                  <p className="text-[15.5px] mt-2">{c.l}</p>
                  <p className="text-[13px] text-snow-500 mt-1.5">{c.s}</p>
                </div>
              );
            })}
            <div className="bg-snow-50 p-6">
              <p className="text-[13.5px] font-semibold text-rhodo-600">On a trek right now?</p>
              <p className="text-[14.5px] mt-2 leading-relaxed text-spruce-800/75">
                Basecamp numbers are on the confirmation email for your departure. They
                are staffed around the clock while a group is out.
              </p>
            </div>
          </aside>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

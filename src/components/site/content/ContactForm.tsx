"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Button, Field, inputCls } from "@/components/site/ui";
import { treks } from "@/data/treks";
import { brand } from "@/data/brand";

const TOPICS = [
  "Choosing a trek",
  "An existing booking",
  "Fitness and whether I am ready",
  "A custom trek for my group",
  "Women-only batches",
  "Working with you",
  "Something else",
];

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [topic, setTopic] = useState(TOPICS[0]);

  if (sent) {
    return (
      <div role="status" className="py-6 sm:py-10">
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-pine-500 text-white">
          <Check size={26} />
        </span>
        <h2 className="font-display mt-6 text-[clamp(1.8rem,3vw,2.4rem)] leading-tight text-ink-900">
          Message received
        </h2>
        <p className="mt-3 max-w-[52ch] text-[16px] leading-relaxed text-ink-500">
          Thank you — someone from the {brand.name} team will get back to you.{" "}
          {brand.contact.responseTime}
        </p>
        <Button onClick={() => setSent(false)} variant="outline" className="mt-7">
          Send another
        </Button>
      </div>
    );
  }

  return (
    <form
      className="space-y-5"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <div>
        <h2 className="font-display text-[clamp(1.6rem,3vw,2.2rem)] leading-tight text-ink-900">
          Send us a message
        </h2>
        <p className="mt-2 text-[15px] text-ink-500">We read every one. {brand.contact.responseTime}</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Your name" htmlFor="cname">
          <input id="cname" className={inputCls} required placeholder="Full name" autoComplete="name" />
        </Field>
        <Field label="Email" htmlFor="cemail">
          <input id="cemail" type="email" className={inputCls} required placeholder="you@example.com" autoComplete="email" />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="What is this about?" htmlFor="ctopic">
          <select id="ctopic" value={topic} onChange={(e) => setTopic(e.target.value)} className={inputCls}>
            {TOPICS.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </Field>

        <Field label="Which trek?" htmlFor="ctrek" hint="Leave on 'not sure yet' if that is the question">
          <select id="ctrek" className={inputCls} defaultValue="">
            <option value="">Not sure yet</option>
            {treks.map((t) => (
              <option key={t.slug} value={t.slug}>
                {t.name}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field
        label="Tell us a bit more"
        htmlFor="cmsg"
        hint="If it is about fitness, the most useful thing you can give us is how far you can currently run and how long it takes."
      >
        <textarea id="cmsg" rows={6} className={inputCls} required placeholder="Start anywhere" />
      </Field>

      <div className="flex flex-wrap items-center gap-x-5 gap-y-3 pt-1">
        <Button type="submit" size="lg">
          Send message
        </Button>
        <p className="text-[13px] text-ink-400">
          Demonstration only — this form does not send anything. Write to{" "}
          <a href={`mailto:${brand.contact.email}`} className="text-ink-700 underline underline-offset-2 hover:text-forest-600">
            {brand.contact.email}
          </a>{" "}
          instead.
        </p>
      </div>
    </form>
  );
}

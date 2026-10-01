"use client";

import { useId, useState } from "react";
import { Plus } from "lucide-react";

export type FaqGroup = { group: string; qs: [string, string][] };

/** Grouped questions as rounded accordion cards; one answer open at a time. */
export function FaqAccordion({ groups }: { groups: FaqGroup[] }) {
  const [open, setOpen] = useState<string | null>(groups[0]?.qs[0]?.[0] ?? null);
  const base = useId();

  return (
    <div className="space-y-12 sm:space-y-14">
      {groups.map((g, gi) => (
        <section key={g.group} aria-labelledby={`${base}-g${gi}`}>
          <div className="mb-5 flex items-baseline justify-between gap-4 px-1">
            <h2 id={`${base}-g${gi}`} className="font-display text-[clamp(1.5rem,2.8vw,2rem)] leading-tight text-ink-900">
              {g.group}
            </h2>
            <span className="nums shrink-0 text-[13px] text-ink-400">{g.qs.length} questions</span>
          </div>
          <div className="grid gap-2.5">
            {g.qs.map(([q, a], qi) => {
              const on = open === q;
              const id = `${base}-${gi}-${qi}`;
              return (
                <div
                  key={q}
                  className={`rounded-[22px] transition-colors duration-300 ${
                    on ? "bg-white shadow-soft" : "bg-white/60 hover:bg-white"
                  }`}
                >
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpen(on ? null : q)}
                      aria-expanded={on}
                      aria-controls={`${id}-a`}
                      id={`${id}-q`}
                      className="flex w-full items-start justify-between gap-5 rounded-[22px] p-5 text-left sm:px-6"
                    >
                      <span className="text-[16.5px] font-semibold leading-snug text-ink-900 sm:text-[17.5px]">{q}</span>
                      <span
                        className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                          on ? "rotate-45 bg-ember-500 text-white" : "bg-mist-100 text-ink-900"
                        }`}
                        aria-hidden="true"
                      >
                        <Plus size={16} />
                      </span>
                    </button>
                  </h3>
                  <div
                    id={`${id}-a`}
                    role="region"
                    aria-labelledby={`${id}-q`}
                    hidden={!on}
                    className="px-5 pb-6 sm:px-6"
                  >
                    <p className="max-w-[64ch] text-[16px] leading-[1.7] text-ink-600">{a}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}

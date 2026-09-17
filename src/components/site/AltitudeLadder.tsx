"use client";

import { useState } from "react";
import Link from "next/link";
import { DifficultyMeter } from "@/components/site/ui";
import { AltitudeSpark } from "@/components/viz/AltitudeProfile";
import { inr, ft2m, type Trek } from "@/lib/types";

/**
 * Treks grouped into altitude bands. Selecting a band filters the list.
 * The colour of each rung is the band colour used everywhere else.
 */
const BANDS = [
  {
    key: "meadow",
    name: "Below 12,000 ft",
    color: "#4c8770",
    lo: 0,
    hi: 11999,
    blurb:
      "Meadow and forest country. You will feel the thin air on a climb, but you sleep low enough that it does not follow you into the night.",
    asks: "Four weeks of steady jogging",
  },
  {
    key: "bugyal",
    name: "12,000 – 13,500 ft",
    color: "#d4a22b",
    lo: 12000,
    hi: 13499,
    blurb:
      "The bugyal band. Above the last trees, on grass that goes gold in autumn. This is where most people's first real summit sits.",
    asks: "5 km in 40 minutes, comfortably",
  },
  {
    key: "moraine",
    name: "13,500 – 15,000 ft",
    color: "#6e93a6",
    lo: 13500,
    hi: 14999,
    blurb:
      "Moraine, scree and old snow. Acclimatisation stops being automatic here — the schedule is built around it rather than around distance.",
    asks: "10 km in 90 minutes",
  },
  {
    key: "snow",
    name: "Above 15,000 ft",
    color: "#a6c2cf",
    lo: 15000,
    hi: 99999,
    blurb:
      "Passes and viewpoints on permanent snow. Every one of these involves a technical section and a documented fitness record before we confirm you.",
    asks: "10 km in 80 minutes, plus a trek record",
  },
];

export function AltitudeLadder({ treks }: { treks: Trek[] }) {
  const [active, setActive] = useState("bugyal");
  const sel = BANDS.find((b) => b.key === active)!;
  const matches = treks
    .filter((t) => t.maxAltFt >= sel.lo && t.maxAltFt <= sel.hi)
    .sort((a, b) => a.maxAltFt - b.maxAltFt);

  return (
    <div className="grid lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)] gap-x-14 gap-y-8">
      {/* The ladder itself — reads top-down, highest first, like a mountain. */}
      <div>
        <div className="border-l-2 border-snow-300 pl-0">
          {[...BANDS].reverse().map((b) => {
            const on = b.key === active;
            const count = treks.filter((t) => t.maxAltFt >= b.lo && t.maxAltFt <= b.hi).length;
            return (
              <button
                key={b.key}
                onClick={() => setActive(b.key)}
                aria-pressed={on}
                className={[
                  "w-full text-left pl-5 pr-4 py-4 -ml-[2px] border-l-2 transition-colors",
                  on ? "bg-snow-50" : "border-transparent hover:bg-snow-50/60",
                ].join(" ")}
                style={on ? { borderLeftColor: b.color } : undefined}
              >
                <div className="flex items-center justify-between gap-4">
                  <span className={`nums text-[17px] ${on ? "font-semibold" : ""}`}>{b.name}</span>
                  <span className="nums text-[13px] text-snow-500">{count}</span>
                </div>
                {on && (
                  <>
                    <p className="mt-2 text-[14.5px] leading-relaxed text-spruce-800/65">{b.blurb}</p>
                    <p className="mt-3 text-[13px] text-spruce-800/80">
                      <span className="text-snow-500">Asks of you — </span>
                      {b.asks}
                    </p>
                  </>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <div className="border-t border-snow-300">
          {matches.map((t) => (
            <Link
              key={t.slug}
              href={`/treks/${t.slug}`}
              className="group flex items-center gap-5 py-4 border-b border-snow-300 hover:bg-snow-50 transition-colors -mx-3 px-3"
            >
              <span
                className="w-1.5 self-stretch shrink-0"
                style={{ background: sel.color }}
                aria-hidden="true"
              />
              <div className="min-w-0 flex-1">
                <h3 className="font-display-tight text-[19px] leading-tight group-hover:text-deodar-600 transition-colors">
                  {t.name}
                </h3>
                <p className="text-[13.5px] text-snow-500 mt-0.5">
                  {t.state} · {t.days} days · {t.trailKm} km
                </p>
              </div>
              <div className="hidden sm:block text-spruce-800/70 shrink-0">
                <AltitudeSpark profile={t.profile} width={100} height={30} />
              </div>
              <div className="hidden md:block shrink-0 w-[168px]">
                <DifficultyMeter difficulty={t.difficulty} />
              </div>
              <div className="text-right shrink-0">
                <p className="nums text-[17px] font-semibold leading-none">
                  {t.maxAltFt.toLocaleString("en-IN")} ft
                </p>
                <p className="nums text-[12.5px] text-snow-500 mt-1">
                  {ft2m(t.maxAltFt).toLocaleString("en-IN")} m · {inr(t.price)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

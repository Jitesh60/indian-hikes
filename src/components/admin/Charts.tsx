"use client";

import { useState } from "react";

/** Season shape: two peaks a year. Bars, because months are discrete buckets. */
export function SeasonBars({
  data,
  metric,
}: {
  data: { month: string; trekkers: number; revenue: number; cancellations: number }[];
  metric: "trekkers" | "revenue";
}) {
  const [hover, setHover] = useState<number | null>(null);
  const max = Math.max(...data.map((d) => d[metric]));
  const fmt = (n: number) =>
    metric === "revenue" ? `₹${(n / 100000).toFixed(1)}L` : n.toLocaleString("en-IN");

  return (
    <div>
      <div className="flex items-end gap-1.5 h-[190px]">
        {data.map((d, i) => {
          const h = (d[metric] / max) * 100;
          const on = hover === i;
          return (
            <button
              key={d.month}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              onFocus={() => setHover(i)}
              onBlur={() => setHover(null)}
              className="flex-1 h-full flex flex-col justify-end group"
              aria-label={`${d.month}: ${fmt(d[metric])}`}
            >
              <span
                className={`nums block text-[11px] mb-1 transition-opacity ${on ? "opacity-100" : "opacity-0"}`}
              >
                {fmt(d[metric])}
              </span>
              <span
                className={`block transition-colors ${on ? "bg-bugyal-500" : "bg-deodar-500"}`}
                style={{ height: `${h}%` }}
              />
            </button>
          );
        })}
      </div>
      <div className="flex gap-1.5 mt-2">
        {data.map((d, i) => (
          <span
            key={d.month}
            className={`nums flex-1 text-center text-[11px] ${hover === i ? "text-spruce-800" : "text-snow-400"}`}
          >
            {d.month}
          </span>
        ))}
      </div>
    </div>
  );
}

/** Horizontal ranking — a bar per trek, sorted. */
export function RankBars({
  rows,
  unit = "",
}: {
  rows: { label: string; value: number; sub?: string }[];
  unit?: string;
}) {
  const max = Math.max(...rows.map((r) => r.value), 1);
  return (
    <div className="space-y-2.5">
      {rows.map((r) => (
        <div key={r.label}>
          <div className="flex justify-between items-baseline gap-4 mb-1">
            <span className="text-[13.5px] truncate">{r.label}</span>
            <span className="nums text-[13px] font-semibold shrink-0">
              {r.value.toLocaleString("en-IN")}
              {unit}
            </span>
          </div>
          <div className="h-[6px] bg-snow-200">
            <div className="h-full bg-deodar-500" style={{ width: `${(r.value / max) * 100}%` }} />
          </div>
          {r.sub && <p className="nums text-[11.5px] text-snow-400 mt-1">{r.sub}</p>}
        </div>
      ))}
    </div>
  );
}

/** Fill-rate donut, drawn as a single arc. */
export function FillGauge({ pct }: { pct: number }) {
  const r = 52;
  const c = 2 * Math.PI * r;
  return (
    <div className="flex items-center gap-5">
      <svg viewBox="0 0 130 130" className="w-[118px] h-[118px] shrink-0" role="img" aria-label={`${pct}% of slots filled`}>
        <circle cx="65" cy="65" r={r} fill="none" stroke="#dbe3e3" strokeWidth="13" />
        <circle
          cx="65"
          cy="65"
          r={r}
          fill="none"
          stroke={pct > 80 ? "#b23a48" : pct > 60 ? "#d4a22b" : "#2f6350"}
          strokeWidth="13"
          strokeDasharray={`${(pct / 100) * c} ${c}`}
          transform="rotate(-90 65 65)"
        />
        <text x="65" y="70" textAnchor="middle" className="nums" fontSize="26" fontWeight="700" fill="#12211e">
          {pct}%
        </text>
      </svg>
      <div>
        <p className="text-[14px] font-semibold">Slots filled this season</p>
        <p className="text-[13.5px] text-spruce-800/65 mt-1.5 leading-relaxed">
          Winter departures are running ahead of last year. Monsoon Kashmir is behind.
        </p>
      </div>
    </div>
  );
}

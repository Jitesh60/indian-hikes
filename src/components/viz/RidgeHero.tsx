"use client";

import { useId, useMemo, useState } from "react";
import Link from "next/link";
import { band, inr, ft2m, type Trek } from "@/lib/types";

/**
 * The hero. Every peak on this ridge is a real trek, placed on the vertical
 * axis at its true maximum altitude. Hover, focus or tap a peak to read it.
 */
export function RidgeHero({ treks }: { treks: Trek[] }) {
  const uid = useId().replace(/:/g, "");
  const [active, setActive] = useState<number>(7); // Rupin — the highest
  const W = 1200;
  const H = 440;
  const floor = H - 8;
  const LO = 10200;
  const HI = 15800;

  const peaks = useMemo(
    () =>
      treks.map((t, i) => {
        const px = 58 + (i / (treks.length - 1)) * (W - 116);
        const py = 74 + (1 - (t.maxAltFt - LO) / (HI - LO)) * (H - 190);
        return { t, px, py };
      }),
    [treks]
  );

  // Ridge line. Each trek is a named summit; between them we insert minor
  // sub-peaks so the skyline reads as a massif rather than a zig-zag chart.
  // Everything is derived from the index, so it is stable across renders.
  const { ridgeD, fillD, backD } = useMemo(() => {
    const jitter = (n: number) => {
      const x = Math.sin(n * 12.9898) * 43758.5453;
      return x - Math.floor(x);
    };

    const pts: [number, number][] = [[-80, floor - 18]];
    peaks.forEach((p, i) => {
      if (i > 0) {
        const prev = peaks[i - 1];
        const gap = p.px - prev.px;
        const low = Math.max(prev.py, p.py);
        // Three minor summits in the col between two named peaks.
        for (let k = 1; k <= 3; k++) {
          const f = k / 4;
          const sag = Math.sin(f * Math.PI) * (54 + jitter(i * 9 + k) * 40);
          const baseY = prev.py + (p.py - prev.py) * f;
          const notch = k === 2 ? 14 : -10 + jitter(i * 31 + k) * 26;
          pts.push([
            prev.px + gap * f,
            Math.min(Math.max(baseY + sag + notch, Math.min(prev.py, p.py) + 16), floor - 52),
          ]);
        }
        void low;
      }
      pts.push([p.px, p.py]);
    });
    pts.push([W + 80, floor - 26]);

    // A softer silhouette behind, one long swell per three treks.
    const back: [number, number][] = [[-80, floor - 4]];
    for (let i = 0; i <= peaks.length; i++) {
      const px = -40 + (i / peaks.length) * (W + 80);
      const swell = 58 + jitter(i * 77) * 96;
      back.push([px, floor - swell]);
    }
    back.push([W + 80, floor - 8]);

    const toPath = (a: [number, number][]) =>
      a.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");

    return {
      ridgeD: toPath(pts),
      fillD: `${toPath(pts)} L${W + 80},${floor} L-80,${floor} Z`,
      backD: `${toPath(back)} L${W + 80},${floor} L-80,${floor} Z`,
    };
  }, [peaks, floor]);

  const gridAlts = [11000, 12000, 13000, 14000, 15000];
  const gy = (a: number) => 74 + (1 - (a - LO) / (HI - LO)) * (H - 190);

  const sel = peaks[active];

  return (
    <div className="relative">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-auto block text-glacier-400"
        role="group"
        aria-label="Treks arranged by maximum altitude"
      >
        <defs>
          <linearGradient id={`fill-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6e93a6" stopOpacity="0.34" />
            <stop offset="55%" stopColor="#2f6350" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#12211e" stopOpacity="0" />
          </linearGradient>
        </defs>

        {gridAlts.map((a) => (
          <g key={a}>
            <line
              x1="52"
              x2={W}
              y1={gy(a)}
              y2={gy(a)}
              stroke="currentColor"
              strokeOpacity="0.16"
              strokeDasharray="2 7"
            />
            <text
              x="44"
              y={gy(a) + 4}
              textAnchor="end"
              className="nums"
              fontSize="12"
              fill="currentColor"
              fillOpacity="0.55"
            >
              {a / 1000}k
            </text>
          </g>
        ))}

        <path d={backD} fill="#6e93a6" fillOpacity="0.12" />
        <path d={fillD} fill={`url(#fill-${uid})`} />
        <path
          d={ridgeD}
          fill="none"
          stroke="#a6c2cf"
          strokeWidth="2"
          strokeLinejoin="round"
          className="ridge-draw"
          style={{ ["--len" as string]: "4200" }}
        />

        {peaks.map((p, i) => {
          const on = i === active;
          const b = band(p.t.maxAltFt);
          return (
            <g key={p.t.slug}>
              {on && (
                <line
                  x1={p.px}
                  x2={p.px}
                  y1={p.py}
                  y2={floor}
                  stroke="#d4a22b"
                  strokeWidth="1.5"
                  strokeOpacity="0.8"
                />
              )}
              <circle cx={p.px} cy={p.py} r={on ? 9 : 5} fill={on ? "#d4a22b" : b.color} />
              {on && <circle cx={p.px} cy={p.py} r="15" fill="none" stroke="#d4a22b" strokeOpacity="0.45" />}

              {/* Generous invisible hit area so this works on a phone. */}
              <rect
                x={p.px - 34}
                y={40}
                width="68"
                height={floor - 40}
                fill="transparent"
                className="cursor-pointer"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                tabIndex={0}
                role="button"
                aria-label={`${p.t.name}, ${p.t.maxAltFt.toLocaleString("en-IN")} feet`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActive(i);
                  }
                }}
              />
            </g>
          );
        })}

        <line x1="0" x2={W} y1={floor} y2={floor} stroke="currentColor" strokeOpacity="0.3" />
      </svg>

      {/* Read-out for the selected peak, anchored below the ridge. */}
      <div className="mt-5 sm:mt-2 border-t border-glacier-700/40 pt-5">
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
          <div>
            <p className="text-glacier-400 text-[13px] mb-1">
              {sel.t.state} · {sel.t.region}
            </p>
            <h2 className="font-display text-3xl sm:text-4xl text-snow-50 leading-[1.05]">
              {sel.t.name}
            </h2>
            <p className="text-glacier-200/80 text-[15px] mt-2 max-w-md leading-snug">
              {sel.t.tagline}
            </p>
          </div>

          <dl className="flex gap-7 sm:gap-9 nums">
            <Stat label="Max altitude" value={`${sel.t.maxAltFt.toLocaleString("en-IN")} ft`} sub={`${ft2m(sel.t.maxAltFt).toLocaleString("en-IN")} m`} />
            <Stat label="Days" value={String(sel.t.days)} sub={`${sel.t.trailKm} km`} />
            <Stat label="Grade" value={sel.t.difficulty.replace("–", "–​")} sub={sel.t.seasons.join(" ")} />
            <Stat label="From" value={inr(sel.t.price)} sub="excl. transport" />
          </dl>

          <Link
            href={`/treks/${sel.t.slug}`}
            className="bg-bugyal-500 text-spruce-900 font-semibold px-6 py-3 hover:bg-bugyal-400 transition-colors"
          >
            Open {sel.t.name}
          </Link>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div>
      <dt className="text-[11.5px] text-glacier-400 mb-1">{label}</dt>
      <dd className="text-snow-50 text-lg font-semibold leading-none">{value}</dd>
      <dd className="text-[11.5px] text-glacier-400/70 mt-1">{sub}</dd>
    </div>
  );
}

"use client";

import { motion, useReducedMotion } from "motion/react";

/** Dial with tick marks and a needle that settles on a bearing, then sways. */
export function Compass({ bearing = 39, size = 190 }: { bearing?: number; size?: number }) {
  const reduce = useReducedMotion();
  const ticks = Array.from({ length: 72 }, (_, i) => i * 5);
  const r = 90;
  // Round so server and client produce identical attribute strings.
  const f = (n: number) => Math.round(n * 100) / 100;

  return (
    <svg viewBox="0 0 200 200" width={size} height={size} role="img" aria-label={`Compass showing ${bearing}° north-east`}>
      <circle cx="100" cy="100" r={r + 6} fill="none" stroke="rgb(255 255 255 / 0.08)" />
      {ticks.map((deg) => {
        const major = deg % 30 === 0;
        const a = (deg * Math.PI) / 180;
        const r1 = r - (major ? 12 : 6);
        return (
          <line
            key={deg}
            x1={f(100 + Math.sin(a) * r1)}
            y1={f(100 - Math.cos(a) * r1)}
            x2={f(100 + Math.sin(a) * r)}
            y2={f(100 - Math.cos(a) * r)}
            stroke={major ? "rgb(255 255 255 / 0.75)" : "rgb(255 255 255 / 0.25)"}
            strokeWidth={major ? 1.6 : 1}
          />
        );
      })}
      {[
        ["N", 0],
        ["E", 90],
        ["S", 180],
        ["W", 270],
      ].map(([l, deg]) => {
        const a = ((deg as number) * Math.PI) / 180;
        return (
          <text
            key={l}
            x={f(100 + Math.sin(a) * 58)}
            y={f(100 - Math.cos(a) * 58 + 4)}
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill={l === "N" ? "#ff8a52" : "rgb(255 255 255 / 0.8)"}
          >
            {l}
          </text>
        );
      })}
      <circle cx="100" cy="100" r="30" fill="rgb(255 255 255 / 0.06)" />
      <line x1="70" y1="100" x2="130" y2="100" stroke="rgb(255 255 255 / 0.25)" />
      <line x1="100" y1="70" x2="100" y2="130" stroke="rgb(255 255 255 / 0.25)" />
      <motion.g
        style={{ originX: "100px", originY: "100px" }}
        initial={{ rotate: reduce ? bearing : bearing - 140 }}
        whileInView={reduce ? undefined : { rotate: [bearing - 140, bearing + 8, bearing - 4, bearing] }}
        viewport={{ once: true }}
        transition={{ duration: 2.4, ease: "easeOut" }}
      >
        <path d="M100 38 L105 100 L100 106 L95 100 Z" fill="#ff8a52" />
        <path d="M100 162 L105 100 L100 94 L95 100 Z" fill="rgb(255 255 255 / 0.35)" />
        <circle cx="100" cy="100" r="4" fill="#fff" />
        <circle cx="100" cy="30" r="3.5" fill="#ffd84d" />
      </motion.g>
    </svg>
  );
}

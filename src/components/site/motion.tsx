"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";

const EASE = [0.22, 0.61, 0.36, 1] as const;

/** Fades and lifts its children in the first time they scroll into view. */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className = "",
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article";
}) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </Tag>
  );
}

/** Children drift vertically as the element scrolls past — a gentle parallax. */
export function Parallax({
  children,
  distance = 80,
  className = "relative",
}: {
  children: ReactNode;
  distance?: number;
  /** Must include a position (e.g. "absolute inset-0" or "relative h-96"). */
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-distance, distance]);
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div style={{ y, top: -distance, bottom: -distance }} className="absolute inset-x-0">
        {children}
      </motion.div>
    </div>
  );
}

/** A small decorative element that floats on a slow loop (e.g. a falling leaf). */
export function Float({
  children,
  className = "",
  duration = 7,
  rotate = 14,
}: {
  children: ReactNode;
  className?: string;
  duration?: number;
  rotate?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      aria-hidden="true"
      className={className}
      animate={reduce ? undefined : { y: [0, -14, 0], rotate: [0, rotate, 0] }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}

/** Counts up to a number when it scrolls into view. */
export function CountUp({
  value,
  className = "",
  format = (n: number) => Math.round(n).toLocaleString("en-IN"),
}: {
  value: number;
  className?: string;
  format?: (n: number) => string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.span
      className={className}
      initial={{ opacity: reduce ? 1 : 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      onViewportEnter={(e) => {
        const el = (e?.target as HTMLElement | undefined) ?? null;
        if (!el || reduce) return;
        const start = performance.now();
        const dur = 1400;
        const tick = (t: number) => {
          const p = Math.min(1, (t - start) / dur);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = format(value * eased);
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }}
    >
      {format(value)}
    </motion.span>
  );
}

"use client";

/**
 * BorderBeam — a short beam of light that travels around the border of its
 * (positioned, rounded) parent. Drop it in as the last child of a card.
 *
 * Source:  Magic UI — https://github.com/magicuidesign/magicui
 *          apps/www/registry/magicui/border-beam.tsx
 * License: MIT, (c) Magic UI.
 * Changes: ember/sun defaults; aria-hidden; renders nothing under
 *          prefers-reduced-motion (it is purely decorative).
 */
import { motion, type MotionStyle, type Transition } from "motion/react";
import type { CSSProperties } from "react";
import { cn } from "./cn";
import { usePrefersReducedMotion } from "./use-reduced-motion";

export interface BorderBeamProps {
  /** beam length in px */
  size?: number;
  /** seconds per lap */
  duration?: number;
  /** seconds; offsets the start */
  delay?: number;
  colorFrom?: string;
  colorTo?: string;
  transition?: Transition;
  className?: string;
  style?: CSSProperties;
  reverse?: boolean;
  /** starting point around the border, 0–100 */
  initialOffset?: number;
  borderWidth?: number;
}

export function BorderBeam({
  className,
  size = 80,
  delay = 0,
  duration = 8,
  colorFrom = "#ff6a2b",
  colorTo = "#ffd84d",
  transition,
  style,
  reverse = false,
  initialOffset = 0,
  borderWidth = 1.5,
}: BorderBeamProps) {
  const reduce = usePrefersReducedMotion();
  if (reduce) return null;
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 rounded-[inherit] border-(length:--border-beam-width) border-transparent mask-[linear-gradient(transparent,transparent),linear-gradient(#000,#000)] mask-intersect [mask-clip:padding-box,border-box]"
      style={{ "--border-beam-width": `${borderWidth}px` } as CSSProperties}
    >
      <motion.div
        className={cn(
          "absolute aspect-square",
          "bg-linear-to-l from-(--color-from) via-(--color-to) to-transparent",
          className,
        )}
        style={
          {
            width: size,
            offsetPath: `rect(0 auto auto 0 round ${size}px)`,
            "--color-from": colorFrom,
            "--color-to": colorTo,
            ...style,
          } as MotionStyle
        }
        initial={{ offsetDistance: `${initialOffset}%` }}
        animate={{
          offsetDistance: reverse
            ? [`${100 - initialOffset}%`, `${-initialOffset}%`]
            : [`${initialOffset}%`, `${100 + initialOffset}%`],
        }}
        transition={{ repeat: Infinity, ease: "linear", duration, delay: -delay, ...transition }}
      />
    </div>
  );
}

export default BorderBeam;

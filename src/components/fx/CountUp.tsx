"use client";

/**
 * CountUp — springs a number from `from` to `to` when it scrolls into view.
 *
 * Source:  React Bits — https://github.com/DavidHDev/react-bits
 *          src/ts-tailwind/TextAnimations/CountUp/CountUp.tsx
 * License: MIT + Commons Clause, (c) David Haz. Free to use as part of a
 *          website/product; the component itself may not be sold or
 *          redistributed on its own.
 * Changes: server-renders the starting value (no empty span); the final
 *          value is exposed once to assistive tech (sr-only) while the
 *          ticking digits are aria-hidden; `locale`, `prefix`, `suffix`;
 *          prefers-reduced-motion shows the final value immediately.
 */
import { useInView, useMotionValue, useSpring } from "motion/react";
import { useCallback, useEffect, useRef } from "react";
import { cn } from "./cn";
import { usePrefersReducedMotion } from "./use-reduced-motion";

export interface CountUpProps {
  to: number;
  from?: number;
  direction?: "up" | "down";
  /** seconds before counting starts */
  delay?: number;
  /** approximate seconds the spring takes */
  duration?: number;
  className?: string;
  /** gate the start (e.g. wait for a parent reveal) */
  startWhen?: boolean;
  /** thousands separator; "" disables grouping */
  separator?: string;
  locale?: string;
  prefix?: string;
  suffix?: string;
  onStart?: () => void;
  onEnd?: () => void;
}

function decimalPlaces(num: number): number {
  const str = num.toString();
  if (str.includes(".")) {
    const decimals = str.split(".")[1];
    if (parseInt(decimals, 10) !== 0) return decimals.length;
  }
  return 0;
}

export function CountUp({
  to,
  from = 0,
  direction = "up",
  delay = 0,
  duration = 2,
  className,
  startWhen = true,
  separator = ",",
  locale = "en-IN",
  prefix = "",
  suffix = "",
  onStart,
  onEnd,
}: CountUpProps) {
  const reduce = usePrefersReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const startValue = direction === "down" ? to : from;
  const endValue = direction === "down" ? from : to;
  const motionValue = useMotionValue(startValue);
  const springValue = useSpring(motionValue, {
    damping: 20 + 40 * (1 / duration),
    stiffness: 100 * (1 / duration),
  });
  const isInView = useInView(ref, { once: true, margin: "0px" });
  const maxDecimals = Math.max(decimalPlaces(from), decimalPlaces(to));

  const format = useCallback(
    (latest: number) => {
      const formatted = new Intl.NumberFormat(locale, {
        useGrouping: !!separator,
        minimumFractionDigits: maxDecimals,
        maximumFractionDigits: maxDecimals,
      }).format(latest);
      const grouped = separator && separator !== "," ? formatted.replace(/,/g, separator) : formatted;
      return `${prefix}${grouped}${suffix}`;
    },
    [locale, maxDecimals, separator, prefix, suffix],
  );

  useEffect(() => {
    if (reduce && ref.current) ref.current.textContent = format(endValue);
  }, [reduce, endValue, format]);

  useEffect(() => {
    if (reduce || !isInView || !startWhen) return;
    onStart?.();
    const t1 = setTimeout(() => motionValue.set(endValue), delay * 1000);
    const t2 = setTimeout(() => onEnd?.(), delay * 1000 + duration * 1000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [reduce, isInView, startWhen, motionValue, endValue, delay, duration, onStart, onEnd]);

  useEffect(
    () =>
      springValue.on("change", (latest: number) => {
        if (ref.current) ref.current.textContent = format(latest);
      }),
    [springValue, format],
  );

  return (
    <span className={cn("tabular-nums", className)}>
      <span className="sr-only">{format(endValue)}</span>
      <span ref={ref} aria-hidden="true">
        {format(startValue)}
      </span>
    </span>
  );
}

export default CountUp;

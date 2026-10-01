"use client";

/**
 * NumberTicker — a number that springs up (or down) to its value when it
 * scrolls into view.
 *
 * Source:  Magic UI — https://github.com/magicuidesign/magicui
 *          apps/www/registry/magicui/number-ticker.tsx
 * License: MIT, (c) Magic UI.
 * Changes: `locale` (defaults to en-IN grouping), `prefix`/`suffix`; the
 *          final value is exposed once to assistive tech (sr-only) and the
 *          ticking digits are aria-hidden; server-renders the formatted
 *          start value; prefers-reduced-motion shows the final value; the
 *          default dark:/text-black colours removed (inherits colour).
 */
import { useInView, useMotionValue, useSpring } from "motion/react";
import { useCallback, useEffect, useRef, type ComponentPropsWithoutRef } from "react";
import { cn } from "./cn";
import { usePrefersReducedMotion } from "./use-reduced-motion";

export interface NumberTickerProps extends Omit<ComponentPropsWithoutRef<"span">, "children"> {
  value: number;
  startValue?: number;
  direction?: "up" | "down";
  /** seconds */
  delay?: number;
  decimalPlaces?: number;
  locale?: string;
  prefix?: string;
  suffix?: string;
}

export function NumberTicker({
  value,
  startValue = 0,
  direction = "up",
  delay = 0,
  className,
  decimalPlaces = 0,
  locale = "en-IN",
  prefix = "",
  suffix = "",
  ...props
}: NumberTickerProps) {
  const reduce = usePrefersReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const from = direction === "down" ? value : startValue;
  const to = direction === "down" ? startValue : value;
  const motionValue = useMotionValue(from);
  const springValue = useSpring(motionValue, { damping: 60, stiffness: 100 });
  const isInView = useInView(ref, { once: true, margin: "0px" });

  const format = useCallback(
    (n: number) =>
      `${prefix}${new Intl.NumberFormat(locale, {
        minimumFractionDigits: decimalPlaces,
        maximumFractionDigits: decimalPlaces,
      }).format(Number(n.toFixed(decimalPlaces)))}${suffix}`,
    [locale, decimalPlaces, prefix, suffix],
  );

  useEffect(() => {
    if (reduce && ref.current) ref.current.textContent = format(to);
  }, [reduce, to, format]);

  useEffect(() => {
    if (reduce || !isInView) return;
    const timer = setTimeout(() => motionValue.set(to), delay * 1000);
    return () => clearTimeout(timer);
  }, [reduce, motionValue, isInView, delay, to]);

  useEffect(
    () =>
      springValue.on("change", (latest) => {
        if (ref.current) ref.current.textContent = format(latest);
      }),
    [springValue, format],
  );

  return (
    <span className={cn("inline-block tracking-wider tabular-nums", className)} {...props}>
      <span className="sr-only">{format(value)}</span>
      <span ref={ref} aria-hidden="true">
        {format(from)}
      </span>
    </span>
  );
}

export default NumberTicker;

"use client";

/**
 * BlurText — headline reveal: words (or letters) blur + slide in when the
 * element scrolls into view.
 *
 * Source:  React Bits — https://github.com/DavidHDev/react-bits
 *          src/ts-tailwind/TextAnimations/BlurText/BlurText.tsx
 * License: MIT + Commons Clause, (c) David Haz. Free to use as part of a
 *          website/product; the component itself may not be sold or
 *          redistributed on its own.
 * Changes: `as` prop for the wrapping tag; real text is exposed once to
 *          assistive tech (sr-only) while the split spans are aria-hidden;
 *          uses motion's useInView instead of a hand-rolled observer;
 *          prefers-reduced-motion renders the plain, final text.
 */
import { motion, useInView, type Easing, type Transition, type UseInViewOptions } from "motion/react";
import { useMemo, useRef } from "react";
import { cn } from "./cn";
import { usePrefersReducedMotion } from "./use-reduced-motion";

type Snapshot = Record<string, string | number>;

export type BlurTextProps = {
  text: string;
  /** Stagger between segments, in ms. */
  delay?: number;
  className?: string;
  as?: "p" | "h1" | "h2" | "h3" | "span" | "div";
  animateBy?: "words" | "letters";
  direction?: "top" | "bottom";
  /** Fraction of the element that must be visible to trigger (0–1). */
  threshold?: number;
  rootMargin?: UseInViewOptions["margin"];
  animationFrom?: Snapshot;
  animationTo?: Snapshot[];
  easing?: Easing | Easing[];
  onAnimationComplete?: () => void;
  /** Seconds per keyframe step. */
  stepDuration?: number;
};

function buildKeyframes(from: Snapshot, steps: Snapshot[]): Record<string, Array<string | number>> {
  const keys = new Set<string>([...Object.keys(from), ...steps.flatMap((s) => Object.keys(s))]);
  const keyframes: Record<string, Array<string | number>> = {};
  keys.forEach((k) => {
    keyframes[k] = [from[k], ...steps.map((s) => s[k])];
  });
  return keyframes;
}

export function BlurText({
  text,
  delay = 120,
  className,
  as = "p",
  animateBy = "words",
  direction = "top",
  threshold = 0.1,
  rootMargin = "0px 0px 0px 0px",
  animationFrom,
  animationTo,
  easing = (t: number) => t,
  onAnimationComplete,
  stepDuration = 0.35,
}: BlurTextProps) {
  const reduce = usePrefersReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, {
    once: true,
    amount: threshold,
    margin: rootMargin,
  });

  const elements = animateBy === "words" ? text.split(" ") : text.split("");

  const fromSnapshot = useMemo<Snapshot>(
    () =>
      animationFrom ??
      (direction === "top"
        ? { filter: "blur(10px)", opacity: 0, y: -50 }
        : { filter: "blur(10px)", opacity: 0, y: 50 }),
    [animationFrom, direction],
  );
  const toSnapshots = useMemo<Snapshot[]>(
    () =>
      animationTo ?? [
        { filter: "blur(5px)", opacity: 0.5, y: direction === "top" ? 5 : -5 },
        { filter: "blur(0px)", opacity: 1, y: 0 },
      ],
    [animationTo, direction],
  );
  const animateKeyframes = useMemo(() => buildKeyframes(fromSnapshot, toSnapshots), [fromSnapshot, toSnapshots]);

  const stepCount = toSnapshots.length + 1;
  const totalDuration = stepDuration * (stepCount - 1);
  const times = Array.from({ length: stepCount }, (_, i) => (stepCount === 1 ? 0 : i / (stepCount - 1)));

  const Tag = as;

  if (reduce) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <Tag ref={ref as React.Ref<never>} className={cn("flex flex-wrap", className)}>
      <span className="sr-only">{text}</span>
      {elements.map((segment, index) => {
        const transition: Transition = {
          duration: totalDuration,
          times,
          delay: (index * delay) / 1000,
          ease: easing,
        };
        return (
          <motion.span
            key={index}
            aria-hidden="true"
            initial={fromSnapshot}
            animate={inView ? animateKeyframes : fromSnapshot}
            transition={transition}
            onAnimationComplete={index === elements.length - 1 ? onAnimationComplete : undefined}
            style={{ display: "inline-block", willChange: "transform, filter, opacity" }}
          >
            {segment === " " ? " " : segment}
            {animateBy === "words" && index < elements.length - 1 && " "}
          </motion.span>
        );
      })}
    </Tag>
  );
}

export default BlurText;

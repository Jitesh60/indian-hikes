"use client";

/**
 * ShinyText — a band of light sweeps across the text on a loop.
 *
 * Source:  React Bits — https://github.com/DavidHDev/react-bits
 *          src/ts-tailwind/TextAnimations/ShinyText/ShinyText.tsx
 * License: MIT + Commons Clause, (c) David Haz. Free to use as part of a
 *          website/product; the component itself may not be sold or
 *          redistributed on its own.
 * Changes: accepts children as well as `text`; shared cn(); the frame loop
 *          stops entirely under prefers-reduced-motion (solid `color`).
 */
import { motion, useAnimationFrame, useMotionValue, useTransform } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "./cn";
import { usePrefersReducedMotion } from "./use-reduced-motion";

export interface ShinyTextProps {
  text?: string;
  children?: ReactNode;
  disabled?: boolean;
  /** seconds per sweep */
  speed?: number;
  className?: string;
  color?: string;
  shineColor?: string;
  /** gradient angle in degrees */
  spread?: number;
  yoyo?: boolean;
  pauseOnHover?: boolean;
  direction?: "left" | "right";
  /** seconds to rest between sweeps */
  delay?: number;
}

export function ShinyText({
  text,
  children,
  disabled = false,
  speed = 2.4,
  className,
  color = "rgba(255,255,255,0.62)",
  shineColor = "#ffffff",
  spread = 120,
  yoyo = false,
  pauseOnHover = false,
  direction = "left",
  delay = 0.6,
}: ShinyTextProps) {
  const reduce = usePrefersReducedMotion();
  const [isPaused, setIsPaused] = useState(false);
  const progress = useMotionValue(0);
  const elapsedRef = useRef(0);
  const lastTimeRef = useRef<number | null>(null);
  const dir = direction === "left" ? 1 : -1;
  const off = disabled || reduce;

  const animationDuration = speed * 1000;
  const delayDuration = delay * 1000;

  useAnimationFrame((time) => {
    if (off || isPaused) {
      lastTimeRef.current = null;
      return;
    }
    if (lastTimeRef.current === null) {
      lastTimeRef.current = time;
      return;
    }
    elapsedRef.current += time - lastTimeRef.current;
    lastTimeRef.current = time;

    if (yoyo) {
      const cycle = animationDuration + delayDuration;
      const t = elapsedRef.current % (cycle * 2);
      let p: number;
      if (t < animationDuration) p = (t / animationDuration) * 100;
      else if (t < cycle) p = 100;
      else if (t < cycle + animationDuration) p = 100 - ((t - cycle) / animationDuration) * 100;
      else p = 0;
      progress.set(dir === 1 ? p : 100 - p);
    } else {
      const t = elapsedRef.current % (animationDuration + delayDuration);
      const p = t < animationDuration ? (t / animationDuration) * 100 : 100;
      progress.set(dir === 1 ? p : 100 - p);
    }
  });

  useEffect(() => {
    elapsedRef.current = 0;
    progress.set(0);
  }, [direction, progress]);

  // p=0 -> 150% (shine off right), p=100 -> -50% (shine off left)
  const backgroundPosition = useTransform(progress, (p) => `${150 - p * 2}% center`);

  return (
    <motion.span
      className={cn("inline-block", className)}
      style={{
        backgroundImage: off
          ? undefined
          : `linear-gradient(${spread}deg, ${color} 0%, ${color} 35%, ${shineColor} 50%, ${color} 65%, ${color} 100%)`,
        backgroundSize: "200% auto",
        WebkitBackgroundClip: off ? undefined : "text",
        backgroundClip: off ? undefined : "text",
        WebkitTextFillColor: off ? undefined : "transparent",
        color: off ? color : undefined,
        backgroundPosition,
      }}
      onMouseEnter={pauseOnHover ? () => setIsPaused(true) : undefined}
      onMouseLeave={pauseOnHover ? () => setIsPaused(false) : undefined}
    >
      {children ?? text}
    </motion.span>
  );
}

export default ShinyText;

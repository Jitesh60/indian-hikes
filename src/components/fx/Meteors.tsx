"use client";

/**
 * Meteors — shooting stars streaking diagonally across a dark panel.
 * Place inside a `relative overflow-hidden` parent.
 *
 * Source:  Magic UI — https://github.com/magicuidesign/magicui
 *          apps/www/registry/magicui/meteors.tsx
 * License: MIT, (c) Magic UI.
 * Changes: wrapped in an aria-hidden, pointer-events-none layer; positions
 *          spread across the parent's width (was window width) and
 *          generated after mount (SSR-safe, no hydration mismatch); keyframes
 *          in fx.css (.fx-meteor); white/ember tint defaults; nothing is
 *          rendered under prefers-reduced-motion.
 */
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { cn } from "./cn";
import { usePrefersReducedMotion } from "./use-reduced-motion";

export interface MeteorsProps {
  number?: number;
  /** seconds */
  minDelay?: number;
  maxDelay?: number;
  /** seconds */
  minDuration?: number;
  maxDuration?: number;
  /** travel angle in degrees */
  angle?: number;
  /** extra classes on each meteor head */
  className?: string;
  /** colour of the head and tail */
  color?: string;
}

export function Meteors({
  number = 14,
  minDelay = 0.2,
  maxDelay = 4,
  minDuration = 3,
  maxDuration = 9,
  angle = 215,
  className,
  color = "rgba(255,255,255,0.85)",
}: MeteorsProps) {
  const reduce = usePrefersReducedMotion();
  const layerRef = useRef<HTMLDivElement>(null);
  const [styles, setStyles] = useState<CSSProperties[]>([]);

  useEffect(() => {
    if (reduce) return;
    const width = layerRef.current?.offsetWidth || window.innerWidth;
    const next = Array.from({ length: number }, () => ({
      "--angle": `${-angle}deg`,
      top: "-5%",
      left: `${Math.floor(Math.random() * width * 1.2)}px`,
      animationDelay: `${(Math.random() * (maxDelay - minDelay) + minDelay).toFixed(2)}s`,
      animationDuration: `${Math.floor(Math.random() * (maxDuration - minDuration) + minDuration)}s`,
    })) as CSSProperties[];
    // Random positions are generated after mount so server and client markup match.
    setStyles(next);
  }, [reduce, number, minDelay, maxDelay, minDuration, maxDuration, angle]);

  if (reduce) return null;

  return (
    <div ref={layerRef} aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {styles.map((style, idx) => (
        <span
          key={idx}
          style={{ ...style, background: color, boxShadow: `0 0 0 1px #ffffff10, 0 0 6px 1px ${color}` }}
          className={cn("fx-meteor absolute size-0.5 rotate-(--angle) rounded-full opacity-0", className)}
        >
          <span
            className="absolute top-1/2 -z-10 h-px w-16 -translate-y-1/2"
            style={{ backgroundImage: `linear-gradient(to right, ${color}, transparent)` }}
          />
        </span>
      ))}
    </div>
  );
}

export default Meteors;

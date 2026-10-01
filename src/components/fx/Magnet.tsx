"use client";

/**
 * Magnet — wraps any element (typically a CTA button) so it drifts toward
 * the cursor when the pointer comes within `padding` px of it.
 *
 * Source:  React Bits — https://github.com/DavidHDev/react-bits
 *          src/ts-tailwind/Animations/Magnet/Magnet.tsx
 * License: MIT + Commons Clause, (c) David Haz. Free to use as part of a
 *          website/product; the component itself may not be sold or
 *          redistributed on its own.
 * Changes: transform written straight to the DOM in a rAF (no React
 *          re-render per mousemove); fine-pointer devices only; disabled
 *          under prefers-reduced-motion; shared cn().
 */
import { useEffect, useRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "./cn";
import { usePrefersReducedMotion } from "./use-reduced-motion";

export interface MagnetProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  /** activation distance around the element, in px */
  padding?: number;
  disabled?: boolean;
  /** higher = weaker pull (offset is divided by this) */
  magnetStrength?: number;
  activeTransition?: string;
  inactiveTransition?: string;
  innerClassName?: string;
}

export function Magnet({
  children,
  padding = 80,
  disabled = false,
  magnetStrength = 3,
  activeTransition = "transform 0.3s ease-out",
  inactiveTransition = "transform 0.5s ease-in-out",
  className,
  innerClassName,
  style,
  ...props
}: MagnetProps) {
  const reduce = usePrefersReducedMotion();
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const off = disabled || reduce;

  useEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;
    if (off || !window.matchMedia("(pointer: fine)").matches) {
      inner.style.transform = "translate3d(0,0,0)";
      return;
    }

    let raf = 0;
    let active = false;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const { left, top, width, height } = outer.getBoundingClientRect();
        const cx = left + width / 2;
        const cy = top + height / 2;
        const inside = Math.abs(cx - e.clientX) < width / 2 + padding && Math.abs(cy - e.clientY) < height / 2 + padding;
        if (inside) {
          active = true;
          inner.style.transition = activeTransition;
          inner.style.transform = `translate3d(${(e.clientX - cx) / magnetStrength}px, ${(e.clientY - cy) / magnetStrength}px, 0)`;
        } else if (active) {
          active = false;
          inner.style.transition = inactiveTransition;
          inner.style.transform = "translate3d(0,0,0)";
        }
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, [off, padding, magnetStrength, activeTransition, inactiveTransition]);

  return (
    <div ref={outerRef} className={cn("relative inline-block", className)} style={style} {...props}>
      <div ref={innerRef} className={innerClassName} style={{ willChange: off ? undefined : "transform" }}>
        {children}
      </div>
    </div>
  );
}

export default Magnet;

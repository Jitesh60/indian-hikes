"use client";

/**
 * ScrollVelocity — horizontal text bands that drift on their own and speed
 * up (and flip direction) with the page's scroll velocity. Alternate rows
 * run in opposite directions.
 *
 * Source:  React Bits — https://github.com/DavidHDev/react-bits
 *          src/ts-tailwind/TextAnimations/ScrollVelocity/ScrollVelocity.tsx
 * License: MIT + Commons Clause, (c) David Haz. Free to use as part of a
 *          website/product; the component itself may not be sold or
 *          redistributed on its own.
 * Changes: VelocityText hoisted out of the parent (it was re-created every
 *          render); width tracked with ResizeObserver; only the first copy
 *          of each row is read by assistive tech (the rest are aria-hidden);
 *          prefers-reduced-motion renders the rows static; the default
 *          type styling moved into overridable `scrollerClassName`.
 */
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import { useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode, type RefObject } from "react";
import { cn } from "./cn";
import { usePrefersReducedMotion } from "./use-reduced-motion";

interface VelocityMapping {
  input: [number, number];
  output: [number, number];
}

interface SharedProps {
  scrollContainerRef?: RefObject<HTMLElement | null>;
  /** class on each repeated copy */
  className?: string;
  damping?: number;
  stiffness?: number;
  numCopies?: number;
  velocityMapping?: VelocityMapping;
  parallaxClassName?: string;
  scrollerClassName?: string;
  parallaxStyle?: CSSProperties;
  scrollerStyle?: CSSProperties;
}

export interface ScrollVelocityProps extends SharedProps {
  texts: ReactNode[];
  /** px per second at rest */
  velocity?: number;
  /** class on the outer wrapper */
  wrapperClassName?: string;
}

function wrap(min: number, max: number, v: number): number {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
}

function useElementWidth<T extends HTMLElement>(ref: RefObject<T | null>): number {
  const [width, setWidth] = useState(0);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setWidth(el.offsetWidth);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);
  return width;
}

function VelocityText({
  children,
  baseVelocity,
  scrollContainerRef,
  className,
  damping = 50,
  stiffness = 400,
  numCopies = 6,
  velocityMapping = { input: [0, 1000], output: [0, 5] },
  parallaxClassName,
  scrollerClassName,
  parallaxStyle,
  scrollerStyle,
  reduce,
}: SharedProps & { children: ReactNode; baseVelocity: number; reduce: boolean }) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll(scrollContainerRef ? { container: scrollContainerRef } : {});
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping, stiffness });
  const velocityFactor = useTransform(smoothVelocity, velocityMapping.input, velocityMapping.output, {
    clamp: false,
  });

  const copyRef = useRef<HTMLSpanElement>(null);
  const copyWidth = useElementWidth(copyRef);

  const x = useTransform(baseX, (v) => (copyWidth === 0 ? "0px" : `${wrap(-copyWidth, 0, v)}px`));

  const directionFactor = useRef(1);
  useAnimationFrame((_, delta) => {
    if (reduce) return;
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
    const f = velocityFactor.get();
    if (f < 0) directionFactor.current = -1;
    else if (f > 0) directionFactor.current = 1;
    moveBy += directionFactor.current * moveBy * f;
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className={cn("relative overflow-hidden", parallaxClassName)} style={parallaxStyle}>
      <motion.div
        className={cn(
          "flex whitespace-nowrap font-display text-4xl font-semibold tracking-[-0.03em] md:text-[5rem] md:leading-[5rem]",
          scrollerClassName,
        )}
        style={{ x, ...scrollerStyle }}
      >
        {Array.from({ length: numCopies }, (_, i) => (
          <span
            key={i}
            ref={i === 0 ? copyRef : undefined}
            aria-hidden={i === 0 ? undefined : true}
            className={cn("shrink-0", className)}
          >
            {children}&nbsp;
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export function ScrollVelocity({ texts, velocity = 60, wrapperClassName, ...shared }: ScrollVelocityProps) {
  const reduce = usePrefersReducedMotion();
  return (
    <div className={wrapperClassName}>
      {texts.map((text, index) => (
        <VelocityText key={index} baseVelocity={index % 2 !== 0 ? -velocity : velocity} reduce={reduce} {...shared}>
          {text}
        </VelocityText>
      ))}
    </div>
  );
}

export default ScrollVelocity;

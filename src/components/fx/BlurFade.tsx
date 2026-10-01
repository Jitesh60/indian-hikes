"use client";

/**
 * BlurFade — wraps content so it fades in from a slight offset and blur,
 * on mount or when scrolled into view. Good for staggered card grids.
 *
 * Source:  Magic UI — https://github.com/magicuidesign/magicui
 *          apps/www/registry/magicui/blur-fade.tsx
 * License: MIT, (c) Magic UI.
 * Changes: dropped the no-op AnimatePresence wrapper; `as` prop;
 *          prefers-reduced-motion renders the final state with no animation.
 */
import { motion, useInView, type MotionProps, type UseInViewOptions, type Variants } from "motion/react";
import { useRef, type ReactNode } from "react";
import { usePrefersReducedMotion } from "./use-reduced-motion";

export interface BlurFadeProps extends MotionProps {
  children: ReactNode;
  className?: string;
  variant?: { hidden: { y: number }; visible: { y: number } };
  /** seconds */
  duration?: number;
  /** seconds */
  delay?: number;
  /** px travelled */
  offset?: number;
  direction?: "up" | "down" | "left" | "right";
  /** true = wait until scrolled into view; false = animate on mount */
  inView?: boolean;
  inViewMargin?: UseInViewOptions["margin"];
  blur?: string;
  as?: "div" | "li" | "section" | "article" | "span";
}

const getFilter = (v: Variants[string]) => (typeof v === "function" ? undefined : v.filter);

export function BlurFade({
  children,
  className,
  variant,
  duration = 0.4,
  delay = 0,
  offset = 6,
  direction = "down",
  inView = false,
  inViewMargin = "-50px",
  blur = "6px",
  as = "div",
  ...props
}: BlurFadeProps) {
  const reduce = usePrefersReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const inViewResult = useInView(ref, { once: true, margin: inViewMargin });
  const isInView = !inView || inViewResult;
  const axis = direction === "left" || direction === "right" ? "x" : "y";
  const defaultVariants: Variants = {
    hidden: {
      [axis]: direction === "right" || direction === "down" ? -offset : offset,
      opacity: 0,
      filter: `blur(${blur})`,
    },
    visible: { [axis]: 0, opacity: 1, filter: "blur(0px)" },
  };
  const combined = variant ?? defaultVariants;
  const hiddenFilter = getFilter(combined.hidden);
  const visibleFilter = getFilter(combined.visible);
  const transitionFilter = hiddenFilter != null && visibleFilter != null && hiddenFilter !== visibleFilter;

  const Tag = motion[as];
  return (
    <Tag
      ref={ref as React.Ref<never>}
      initial={reduce ? false : "hidden"}
      animate={reduce || isInView ? "visible" : "hidden"}
      variants={combined}
      transition={{
        delay: 0.04 + delay,
        duration,
        ease: "easeOut",
        ...(transitionFilter ? { filter: { duration } } : {}),
      }}
      className={className}
      {...props}
    >
      {children}
    </Tag>
  );
}

export default BlurFade;

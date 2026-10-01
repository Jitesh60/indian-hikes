"use client";

/**
 * AnimatedList — reveals its children one at a time, newest on top, each
 * popping in on a spring (notification-feed style: "Asha just booked Kedarkantha").
 *
 * Source:  Magic UI — https://github.com/magicuidesign/magicui
 *          apps/www/registry/magicui/animated-list.tsx
 * License: MIT, (c) Magic UI.
 * Changes: optional `loop` (restart after the last item); prefers-reduced-motion
 *          shows every item at once with no animation; `role="list"` /
 *          listitem semantics; children should carry stable keys.
 */
import { AnimatePresence, motion } from "motion/react";
import { Children, memo, useEffect, useMemo, useState, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { cn } from "./cn";
import { usePrefersReducedMotion } from "./use-reduced-motion";

export function AnimatedListItem({ children, still = false }: { children: ReactNode; still?: boolean }) {
  return (
    <motion.div
      role="listitem"
      initial={still ? false : { scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1, originY: 0 }}
      exit={still ? undefined : { scale: 0, opacity: 0 }}
      transition={{ type: "spring", stiffness: 350, damping: 40 }}
      layout={!still}
      className="mx-auto w-full"
    >
      {children}
    </motion.div>
  );
}

export interface AnimatedListProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
  /** ms between items */
  delay?: number;
  /** start over after the last item */
  loop?: boolean;
}

export const AnimatedList = memo(function AnimatedList({
  children,
  className,
  delay = 1000,
  loop = false,
  ...props
}: AnimatedListProps) {
  const reduce = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const childrenArray = useMemo(() => Children.toArray(children), [children]);

  useEffect(() => {
    if (reduce) return;
    const last = childrenArray.length - 1;
    if (index >= last && !loop) return;
    const timeout = setTimeout(
      () => setIndex((i) => (i >= last ? 0 : i + 1)),
      index >= last ? delay * 3 : delay,
    );
    return () => clearTimeout(timeout);
  }, [index, delay, loop, reduce, childrenArray.length]);

  const itemsToShow = useMemo(
    () => (reduce ? childrenArray : childrenArray.slice(0, index + 1)).slice().reverse(),
    [index, childrenArray, reduce],
  );

  return (
    <div role="list" className={cn("flex flex-col items-center gap-4", className)} {...props}>
      <AnimatePresence>
        {itemsToShow.map((item, i) => (
          <AnimatedListItem key={(item as React.ReactElement).key ?? i} still={reduce}>
            {item}
          </AnimatedListItem>
        ))}
      </AnimatePresence>
    </div>
  );
});

export default AnimatedList;

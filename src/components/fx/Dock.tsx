"use client";

/**
 * Dock — macOS-style dock: icons magnify as the cursor passes along it.
 * Put links/buttons inside each <DockIcon> (the icon is only a sizing box).
 *
 * Source:  Magic UI — https://github.com/magicuidesign/magicui
 *          apps/www/registry/magicui/dock.tsx
 * License: MIT, (c) Magic UI.
 * Changes: dropped class-variance-authority (plain class string); frosted
 *          dark-glass defaults, no dark: variants; uses clientX (pageX broke
 *          under horizontal scroll); magnification disabled under
 *          prefers-reduced-motion; ref as a plain prop (React 19).
 */
import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from "motion/react";
import { Children, cloneElement, isValidElement, useRef, type ReactNode, type Ref } from "react";
import { cn } from "./cn";
import { usePrefersReducedMotion } from "./use-reduced-motion";

const DEFAULT_SIZE = 40;
const DEFAULT_MAGNIFICATION = 60;
const DEFAULT_DISTANCE = 140;

export const dockClassName =
  "mx-auto flex h-[58px] w-max items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/10 p-2 backdrop-blur-md";

export interface DockProps {
  className?: string;
  iconSize?: number;
  iconMagnification?: number;
  disableMagnification?: boolean;
  iconDistance?: number;
  direction?: "top" | "middle" | "bottom";
  children: ReactNode;
  ref?: Ref<HTMLDivElement>;
  "aria-label"?: string;
}

export function Dock({
  className,
  children,
  iconSize = DEFAULT_SIZE,
  iconMagnification = DEFAULT_MAGNIFICATION,
  disableMagnification = false,
  iconDistance = DEFAULT_DISTANCE,
  direction = "middle",
  ref,
  ...props
}: DockProps) {
  const reduce = usePrefersReducedMotion();
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      ref={ref}
      onMouseMove={(e) => mouseX.set(e.clientX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      {...props}
      className={cn(
        dockClassName,
        direction === "top" && "items-start",
        direction === "middle" && "items-center",
        direction === "bottom" && "items-end",
        className,
      )}
    >
      {Children.map(children, (child) =>
        isValidElement<DockIconProps>(child) && child.type === DockIcon
          ? cloneElement(child, {
              mouseX,
              size: iconSize,
              magnification: iconMagnification,
              disableMagnification: disableMagnification || reduce,
              distance: iconDistance,
            })
          : child,
      )}
    </motion.div>
  );
}

export interface DockIconProps {
  size?: number;
  magnification?: number;
  disableMagnification?: boolean;
  distance?: number;
  mouseX?: MotionValue<number>;
  className?: string;
  children?: ReactNode;
}

export function DockIcon({
  size = DEFAULT_SIZE,
  magnification = DEFAULT_MAGNIFICATION,
  disableMagnification,
  distance = DEFAULT_DISTANCE,
  mouseX,
  className,
  children,
}: DockIconProps) {
  const ref = useRef<HTMLDivElement>(null);
  const padding = Math.max(6, size * 0.2);
  const fallbackMouseX = useMotionValue(Infinity);

  const distanceCalc = useTransform(mouseX ?? fallbackMouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });
  const sizeTransform = useTransform(
    distanceCalc,
    [-distance, 0, distance],
    [size, disableMagnification ? size : magnification, size],
  );
  const scaleSize = useSpring(sizeTransform, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <motion.div
      ref={ref}
      style={{ width: scaleSize, height: scaleSize, padding }}
      className={cn("flex aspect-square items-center justify-center rounded-full", className)}
    >
      {children}
    </motion.div>
  );
}

export default Dock;

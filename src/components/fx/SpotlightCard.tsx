"use client";

/**
 * SpotlightCard — a card with a soft radial light that follows the cursor
 * (and lights up while anything inside it has keyboard focus).
 *
 * Source:  React Bits — https://github.com/DavidHDev/react-bits
 *          src/ts-tailwind/Components/SpotlightCard/SpotlightCard.tsx
 * License: MIT + Commons Clause, (c) David Haz. Free to use as part of a
 *          website/product; the component itself may not be sold or
 *          redistributed on its own.
 * Changes: spotlight position written to CSS variables (no re-render per
 *          mousemove); ink/ember palette defaults; overridable classes via
 *          cn(); `as` prop; the light layer is aria-hidden.
 */
import { useRef, useState, type HTMLAttributes } from "react";
import { cn } from "./cn";

export interface SpotlightCardProps extends HTMLAttributes<HTMLElement> {
  /** any CSS color; a translucent one reads best */
  spotlightColor?: string;
  /** spotlight radius as a % of the card's farthest corner */
  spotlightSize?: number;
  as?: "div" | "article" | "li" | "section";
}

export function SpotlightCard({
  children,
  className,
  spotlightColor = "rgba(255, 106, 43, 0.22)",
  spotlightSize = 80,
  as: Tag = "div",
  onMouseMove,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  ...props
}: SpotlightCardProps) {
  const ref = useRef<HTMLElement>(null);
  const [lit, setLit] = useState(false);
  const [focused, setFocused] = useState(false);

  return (
    <Tag
      ref={ref as React.Ref<never>}
      onMouseMove={(e: React.MouseEvent<HTMLElement>) => {
        const el = ref.current;
        if (el && !focused) {
          const rect = el.getBoundingClientRect();
          el.style.setProperty("--fx-spot-x", `${e.clientX - rect.left}px`);
          el.style.setProperty("--fx-spot-y", `${e.clientY - rect.top}px`);
        }
        onMouseMove?.(e);
      }}
      onMouseEnter={(e: React.MouseEvent<HTMLElement>) => {
        setLit(true);
        onMouseEnter?.(e);
      }}
      onMouseLeave={(e: React.MouseEvent<HTMLElement>) => {
        setLit(false);
        onMouseLeave?.(e);
      }}
      onFocus={(e: React.FocusEvent<HTMLElement>) => {
        setFocused(true);
        onFocus?.(e);
      }}
      onBlur={(e: React.FocusEvent<HTMLElement>) => {
        setFocused(false);
        onBlur?.(e);
      }}
      className={cn(
        "relative overflow-hidden rounded-[28px] border border-white/10 bg-ink-900 p-8 text-white",
        className,
      )}
      {...props}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 transition-opacity duration-500 ease-in-out"
        style={{
          opacity: lit || focused ? 0.9 : 0,
          background: `radial-gradient(circle at var(--fx-spot-x, 50%) var(--fx-spot-y, 50%), ${spotlightColor}, transparent ${spotlightSize}%)`,
        }}
      />
      <div className="relative">{children}</div>
    </Tag>
  );
}

export default SpotlightCard;

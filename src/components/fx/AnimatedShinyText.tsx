/**
 * AnimatedShinyText — subtle text with a narrow light band that glides
 * across it every few seconds (great for eyebrow pills: "✦ Winter 2026
 * batches open").
 *
 * Source:  Magic UI — https://github.com/magicuidesign/magicui
 *          apps/www/registry/magicui/animated-shiny-text.tsx
 * License: MIT, (c) Magic UI.
 * Changes: keyframes moved to fx.css (.fx-shiny-text; static under reduced
 *          motion); removed the dark: variants (this site has no dark mode
 *          class) in favour of a `shimmerColor` prop; inherits text colour at
 *          70% by default. Server component safe.
 */
import type { ComponentPropsWithoutRef, CSSProperties } from "react";
import { cn } from "./cn";

export interface AnimatedShinyTextProps extends ComponentPropsWithoutRef<"span"> {
  /** width of the light band, px */
  shimmerWidth?: number;
  /** colour of the light band; use a dark one on light backgrounds */
  shimmerColor?: string;
}

export function AnimatedShinyText({
  children,
  className,
  shimmerWidth = 100,
  shimmerColor = "rgba(255,255,255,0.9)",
  style,
  ...props
}: AnimatedShinyTextProps) {
  return (
    <span
      style={
        {
          "--shiny-width": `${shimmerWidth}px`,
          backgroundImage: `linear-gradient(to right, transparent, ${shimmerColor} 50%, transparent)`,
          ...style,
        } as CSSProperties
      }
      className={cn(
        "text-current/70",
        "fx-shiny-text bg-size-[var(--shiny-width)_100%] bg-clip-text bg-position-[0_0] bg-no-repeat",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export default AnimatedShinyText;

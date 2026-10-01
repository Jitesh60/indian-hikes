/**
 * Marquee — infinitely scrolling row (or column) of any content: logos,
 * testimonials, trek names, photos.
 *
 * Source:  Magic UI — https://github.com/magicuidesign/magicui
 *          apps/www/registry/magicui/marquee.tsx
 * License: MIT, (c) Magic UI.
 * Changes: keyframes moved to fx.css (.fx-marquee / .fx-marquee-vertical);
 *          copies after the first are aria-hidden so screen readers read the
 *          content once; also pauses on keyboard focus-within; reduced
 *          motion = static row (handled in fx.css). Server component safe
 *          (no hooks).
 */
import type { ComponentPropsWithoutRef, CSSProperties, ReactNode } from "react";
import { cn } from "./cn";

export interface MarqueeProps extends ComponentPropsWithoutRef<"div"> {
  reverse?: boolean;
  pauseOnHover?: boolean;
  vertical?: boolean;
  /** times the children are repeated (≥ 2 for a seamless loop) */
  repeat?: number;
  /** CSS duration of one loop, e.g. "40s" */
  duration?: string;
  /** CSS gap between items, e.g. "1rem" */
  gap?: string;
  children: ReactNode;
}

export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  vertical = false,
  repeat = 4,
  duration = "40s",
  gap = "1rem",
  children,
  style,
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      style={{ "--duration": duration, "--gap": gap, ...style } as CSSProperties}
      className={cn(
        "flex gap-(--gap) overflow-hidden p-2",
        vertical ? "flex-col" : "flex-row",
        pauseOnHover && "fx-marquee-pause",
        className,
      )}
    >
      {Array.from({ length: repeat }, (_, i) => (
        <div
          key={i}
          aria-hidden={i === 0 ? undefined : true}
          // inert keeps links/buttons in the duplicate copies out of the tab order
          inert={i === 0 ? undefined : true}
          className={cn(
            "flex shrink-0 justify-around gap-(--gap)",
            vertical ? "fx-marquee-vertical flex-col" : "fx-marquee flex-row",
            reverse && "fx-reverse",
          )}
        >
          {children}
        </div>
      ))}
    </div>
  );
}

export default Marquee;

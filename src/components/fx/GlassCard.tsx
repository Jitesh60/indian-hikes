/**
 * GlassCard — frosted-glass panel with two softly bobbing ember orbs
 * glowing through it from behind; lifts and tilts a degree on hover.
 *
 * Source:  Uiverse.io — https://github.com/uiverse-io/galaxy
 *          Cards/G4b413l_good-crab-75.html
 *          by G4b413l (https://uiverse.io/G4b413l/good-crab-75)
 * License: MIT, (c) 2023 Uiverse.io and the element's author.
 * Changes: converted to React + Tailwind; accepts children and any size
 *          (was a fixed 190×254 empty card); ember→sun orbs (configurable)
 *          instead of lime; `tone` for dark or light backdrops; hairline
 *          glass border; orbs aria-hidden; orb float (fx.css .fx-orb-*) and
 *          hover tilt off under reduced motion. Server component safe.
 */
import type { CSSProperties, HTMLAttributes } from "react";
import { cn } from "./cn";

export interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  /** "dark" = glass over the ink night sky; "light" = over mist/white */
  tone?: "dark" | "light";
  /** two CSS colours for the orb radial gradient (inner, outer) */
  orbColors?: [string, string];
  /** orb diameter in px */
  orbSize?: number;
  innerClassName?: string;
}

export function GlassCard({
  tone = "dark",
  orbColors = ["#ffd84d", "#1f6b4a"],
  orbSize = 100,
  className,
  innerClassName,
  children,
  ...props
}: GlassCardProps) {
  const orbStyle: CSSProperties = {
    width: orbSize,
    height: orbSize,
    background: `radial-gradient(${orbColors[0]}, ${orbColors[1]})`,
  };
  const offset = -orbSize / 4;
  return (
    <div
      className={cn(
        "relative transition-transform duration-200 hover:scale-[1.04] hover:rotate-1 motion-reduce:transition-none motion-reduce:hover:transform-none",
        className,
      )}
      {...props}
    >
      <span
        aria-hidden="true"
        className="fx-orb-up pointer-events-none absolute rounded-full"
        style={{ ...orbStyle, top: offset, left: offset }}
      />
      <span
        aria-hidden="true"
        className="fx-orb-down pointer-events-none absolute rounded-full"
        style={{ ...orbStyle, bottom: offset, right: offset }}
      />
      <div
        className={cn(
          "relative h-full w-full rounded-[20px] border p-6 backdrop-blur-[10px]",
          tone === "dark"
            ? "border-white/15 bg-white/5 text-white shadow-[0_0_10px_rgba(0,0,0,0.25)]"
            : "border-white/60 bg-white/45 text-ink-900 shadow-[0_8px_30px_rgba(17,21,25,0.10)]",
          innerClassName,
        )}
      >
        {children}
      </div>
    </div>
  );
}

export default GlassCard;

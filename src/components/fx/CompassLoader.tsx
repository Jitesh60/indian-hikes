/**
 * CompassLoader — loading indicator drawn as a compass: the needle spins,
 * the bezel ring sweeps and the eight cardinal ticks blink in sequence.
 *
 * Source:  Uiverse.io — https://github.com/uiverse-io/galaxy
 *          loaders/Nawsome_ancient-yak-42.html
 *          by Nawsome (https://uiverse.io/Nawsome/ancient-yak-42)
 * License: MIT, (c) 2023 Uiverse.io and the element's author.
 * Changes: converted to React; SVG mask/gradient ids made unique per
 *          instance (useId) so several loaders can coexist; recoloured to
 *          ember/sun with a `tone` for dark or light backgrounds; per-tick
 *          delays inline instead of :nth-child; keyframes in fx.css
 *          (.fx-compass-*); role="status" + label for assistive tech;
 *          reduced motion shows a static, fully drawn compass.
 */
import { useId, type CSSProperties } from "react";
import { cn } from "./cn";

export interface CompassLoaderProps {
  /** rendered width/height in px */
  size?: number;
  /** "dark" = on the ink night sky; "light" = on mist/white */
  tone?: "dark" | "light";
  /** accessible label announced by screen readers */
  label?: string;
  /** seconds per cycle */
  speed?: number;
  className?: string;
}

const TICK_ANGLES = [-135, -90, -45, 0, 45, 90, 135, 180];

export function CompassLoader({
  size = 80,
  tone = "dark",
  label = "Loading",
  speed = 2,
  className,
}: CompassLoaderProps) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const grad = `fx-compass-grad-${uid}`;
  const mask1 = `fx-compass-m1-${uid}`;
  const mask2 = `fx-compass-m2-${uid}`;

  const c =
    tone === "dark"
      ? { ring: "#1f6b4a", ring2: "#ffd84d", tick: "rgba(255,255,255,0.85)", tick2: "#b2d6c2", north: "#1f6b4a", north2: "#17563b", south: "#e9eeee", south2: "#ffffff" }
      : { ring: "#1f6b4a", ring2: "#b2d6c2", tick: "#262d35", tick2: "#17563b", north: "#1f6b4a", north2: "#17563b", south: "#3a424c", south2: "#111519" };

  const ticks = (stroke: string) => (
    <g strokeWidth="4" strokeDasharray="12 12" strokeDashoffset="12" strokeLinecap="round" transform="translate(80,80)">
      {TICK_ANGLES.map((deg, i) => (
        <polyline
          key={deg}
          className="fx-compass-tick"
          stroke={stroke}
          points="0,2 0,14"
          transform={`rotate(${deg},0,0) translate(0,40)`}
          style={{ animationDelay: `${(-(((8 - i) % 8) * speed) / 8).toFixed(3)}s` }}
        />
      ))}
    </g>
  );

  const ring = (stroke: string) => (
    <g className="fx-compass-ring-rotate">
      <circle
        className="fx-compass-ring-stroke"
        cx="80"
        cy="80"
        r="72"
        fill="none"
        stroke={stroke}
        strokeWidth="16"
        strokeDasharray="452.39 452.39"
        strokeDashoffset="452"
        strokeLinecap="round"
        transform="rotate(-45,80,80)"
      />
    </g>
  );

  const needle = (north: string, south: string) => (
    <g transform="translate(64,28)">
      <g className="fx-compass-arrows" transform="rotate(45,16,52)">
        <path
          fill={north}
          d="M17.998,1.506l13.892,43.594c.455,1.426-.56,2.899-1.998,2.899H2.108c-1.437,0-2.452-1.473-1.998-2.899L14.002,1.506c.64-2.008,3.356-2.008,3.996,0Z"
        />
        <path
          fill={south}
          d="M14.009,102.499L.109,58.889c-.453-1.421,.559-2.889,1.991-2.889H29.899c1.433,0,2.444,1.468,1.991,2.889l-13.899,43.61c-.638,2.001-3.345,2.001-3.983,0Z"
        />
      </g>
    </g>
  );

  return (
    <span role="status" aria-label={label} className={cn("inline-block", className)}>
      <svg
        viewBox="0 0 160 160"
        width={size}
        height={size}
        aria-hidden="true"
        focusable="false"
        className="block"
        style={{ "--fx-compass-speed": `${speed}s` } as CSSProperties}
      >
        <defs>
          <linearGradient id={grad} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#000" />
            <stop offset="100%" stopColor="#fff" />
          </linearGradient>
          <mask id={mask1}>
            <rect x="0" y="0" width="160" height="160" fill={`url(#${grad})`} />
          </mask>
          <mask id={mask2}>
            <rect x="28" y="28" width="104" height="104" fill={`url(#${grad})`} />
          </mask>
        </defs>

        <g>{ring(c.ring)}</g>
        <g mask={`url(#${mask1})`}>{ring(c.ring2)}</g>

        <g>{ticks(c.tick)}</g>
        <g mask={`url(#${mask1})`}>{ticks(c.tick2)}</g>

        <g>{needle(c.north, c.south)}</g>
        <g mask={`url(#${mask2})`}>{needle(c.north2, c.south2)}</g>
      </svg>
    </span>
  );
}

export default CompassLoader;

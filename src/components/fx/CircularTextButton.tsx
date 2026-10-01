/**
 * CircularTextButton — round badge-button with its label running around
 * the rim (slowly rotating) and an arrow in the middle that slips out
 * diagonally and is replaced on hover/focus. Nice as a hero "Explore" or
 * "Scroll" seal.
 *
 * Source:  Uiverse.io — https://github.com/uiverse-io/galaxy
 *          Buttons/Creatlydev_fresh-goose-83.html
 *          by Creatlydev (https://uiverse.io/Creatlydev/fresh-goose-83)
 * License: MIT, (c) 2023 Uiverse.io and the element's author.
 * Changes: converted to React; the ring is generated from a `text` prop
 *          (angle step = 360° / characters, so any length closes the
 *          circle); styles in fx.css (.fx-ctb, .fx-text-rotation) with
 *          ember/ink custom properties; <p> inside <button> replaced by
 *          spans; ring aria-hidden + real accessible name (`label`);
 *          renders an <a> when `href` is set; rotation stops under reduced
 *          motion.
 */
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, CSSProperties } from "react";
import { cn } from "./cn";

interface CircularTextButtonBase {
  /** text that runs around the rim, e.g. "Explore treks · Explore treks · " */
  text: string;
  /** accessible name; defaults to `text` trimmed of separators */
  label?: string;
  /** diameter in px */
  size?: number;
  /** seconds per revolution */
  speed?: number;
  className?: string;
}

export type CircularTextButtonProps =
  | (CircularTextButtonBase & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & { href?: undefined })
  | (CircularTextButtonBase & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children"> & { href: string });

function ArrowIcon({ copy = false }: { copy?: boolean }) {
  return (
    <svg
      viewBox="0 0 14 15"
      fill="none"
      width="14"
      aria-hidden="true"
      focusable="false"
      className={copy ? "fx-ctb__icon fx-ctb__icon--copy" : "fx-ctb__icon"}
    >
      <path
        d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
        fill="currentColor"
      />
    </svg>
  );
}

export function CircularTextButton(allProps: CircularTextButtonProps) {
  const { text, label, size = 104, speed = 10, className, style, ...rest } = allProps;
  const chars = Array.from(text);
  const name = label ?? text.replace(/[·•*|]+/g, " ").replace(/\s+/g, " ").trim();
  const vars = {
    "--fx-ctb-size": `${size}px`,
    "--fx-ctb-step": `${360 / Math.max(chars.length, 1)}deg`,
    "--fx-rotation-speed": `${speed}s`,
    ...style,
  } as CSSProperties;

  const inner = (
    <>
      <span className="fx-ctb__ring fx-text-rotation" aria-hidden="true">
        {chars.map((ch, i) => (
          <span key={i} style={{ "--index": i } as CSSProperties}>
            {ch === " " ? " " : ch}
          </span>
        ))}
      </span>
      <span className="fx-ctb__circle" aria-hidden="true">
        <ArrowIcon />
        <ArrowIcon copy />
      </span>
      <span className="sr-only">{name}</span>
    </>
  );

  if (rest.href !== undefined) {
    return (
      <a {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)} style={vars} className={cn("fx-ctb", className)}>
        {inner}
      </a>
    );
  }
  return (
    <button
      type="button"
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
      style={vars}
      className={cn("fx-ctb", className)}
    >
      {inner}
    </button>
  );
}

export default CircularTextButton;

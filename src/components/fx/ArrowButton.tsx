/**
 * ArrowButton — outlined pill CTA ("Explore treks →"). On hover/focus an
 * ember disc floods the pill, the label slides right, the trailing arrow
 * exits and a second arrow slides in from the left.
 *
 * Source:  Uiverse.io — https://github.com/uiverse-io/galaxy
 *          Buttons/gharsh11032000_loud-chicken-53.html
 *          by gharsh11032000 (https://uiverse.io/gharsh11032000/loud-chicken-53)
 * License: MIT, (c) 2023 Uiverse.io and the element's author.
 * Changes: converted to React; styles in fx.css (.fx-arrow-btn), recoloured
 *          via --fx-accent / --fx-on-accent (ember on ink); hover state also
 *          applies to :focus-visible; renders an <a> when `href` is set;
 *          SVG arrows aria-hidden; transitions off under reduced motion.
 */
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, CSSProperties, ReactNode } from "react";
import { cn } from "./cn";

interface ArrowButtonBase {
  children: ReactNode;
  className?: string;
  /** outline + fill colour */
  accent?: string;
  /** label colour once filled */
  onAccent?: string;
}

export type ArrowButtonProps =
  | (ArrowButtonBase & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined })
  | (ArrowButtonBase & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string });

function Arrow({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className={className}>
      <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
    </svg>
  );
}

export function ArrowButton(allProps: ArrowButtonProps) {
  const { children, className, accent, onAccent, style, ...rest } = allProps;
  const vars = {
    ...(accent ? { "--fx-accent": accent } : {}),
    ...(onAccent ? { "--fx-on-accent": onAccent } : {}),
    ...style,
  } as CSSProperties;

  const inner = (
    <>
      <Arrow className="fx-arrow-btn__arr fx-arrow-btn__arr--2" />
      <span className="fx-arrow-btn__text">{children}</span>
      <span className="fx-arrow-btn__circle" aria-hidden="true" />
      <Arrow className="fx-arrow-btn__arr fx-arrow-btn__arr--1" />
    </>
  );

  if (rest.href !== undefined) {
    return (
      <a {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)} style={vars} className={cn("fx-arrow-btn", className)}>
        {inner}
      </a>
    );
  }
  return (
    <button
      type="button"
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
      style={vars}
      className={cn("fx-arrow-btn", className)}
    >
      {inner}
    </button>
  );
}

export default ArrowButton;

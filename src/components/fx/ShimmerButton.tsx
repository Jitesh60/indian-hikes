/**
 * ShimmerButton — a dark pill whose border carries a spark of light that
 * sweeps and spins around it; inset highlight deepens on hover/press.
 *
 * Source:  Magic UI — https://github.com/magicuidesign/magicui
 *          apps/www/registry/magicui/shimmer-button.tsx
 * License: MIT, (c) Magic UI.
 * Changes: keyframes moved to fx.css (.fx-shimmer-slide / .fx-spin-around,
 *          frozen under reduced motion); renders an <a> when `href` is set;
 *          ink/ember defaults; ref as a plain prop (React 19); decorative
 *          layers aria-hidden.
 */
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, CSSProperties, ReactNode, Ref } from "react";
import { cn } from "./cn";

interface ShimmerBaseProps {
  shimmerColor?: string;
  /** thickness of the visible spark ring, e.g. "0.05em" */
  shimmerSize?: string;
  borderRadius?: string;
  shimmerDuration?: string;
  /** any CSS background for the face */
  background?: string;
  className?: string;
  children?: ReactNode;
}

export type ShimmerButtonProps =
  | (ShimmerBaseProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined; ref?: Ref<HTMLButtonElement> })
  | (ShimmerBaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; ref?: Ref<HTMLAnchorElement> });

export function ShimmerButton(allProps: ShimmerButtonProps) {
  const {
    shimmerColor = "#ffb48a",
    shimmerSize = "0.06em",
    shimmerDuration = "3s",
    borderRadius = "100px",
    background = "#111519",
    className,
    children,
    ...rest
  } = allProps;

  const style = {
    "--spread": "90deg",
    "--shimmer-color": shimmerColor,
    "--radius": borderRadius,
    "--speed": shimmerDuration,
    "--cut": shimmerSize,
    "--bg": background,
  } as CSSProperties;

  const classes = cn(
    "group relative z-0 inline-flex cursor-pointer items-center justify-center gap-2 overflow-hidden [border-radius:var(--radius)] border border-white/10 px-6 py-3 font-medium whitespace-nowrap text-white [background:var(--bg)]",
    "transform-gpu transition-transform duration-300 ease-in-out active:translate-y-px",
    className,
  );

  const inner = (
    <>
      {/* spark container */}
      <span aria-hidden="true" className="absolute inset-0 -z-30 overflow-visible blur-[2px] @container-[size]">
        {/* spark */}
        <span className="fx-shimmer-slide absolute inset-0 aspect-[1] h-[100cqh] rounded-none [mask:none]">
          {/* spark before */}
          <span className="fx-spin-around absolute -inset-full w-auto [translate:0_0] rotate-0 [background:conic-gradient(from_calc(270deg-(var(--spread)*0.5)),transparent_0,var(--shimmer-color)_var(--spread),transparent_var(--spread))]" />
        </span>
      </span>
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
      {/* highlight */}
      <span
        aria-hidden="true"
        className="absolute inset-0 size-full [border-radius:var(--radius)] shadow-[inset_0_-8px_10px_#ffffff1f] transform-gpu transition-all duration-300 ease-in-out group-hover:shadow-[inset_0_-6px_10px_#ffffff3f] group-active:shadow-[inset_0_-10px_10px_#ffffff3f]"
      />
      {/* backdrop */}
      <span aria-hidden="true" className="absolute inset-(--cut) -z-20 [border-radius:var(--radius)] [background:var(--bg)]" />
    </>
  );

  if (rest.href !== undefined) {
    const anchorProps = rest as AnchorHTMLAttributes<HTMLAnchorElement> & { ref?: Ref<HTMLAnchorElement> };
    return (
      <a {...anchorProps} style={{ ...style, ...anchorProps.style }} className={classes}>
        {inner}
      </a>
    );
  }
  const buttonProps = rest as ButtonHTMLAttributes<HTMLButtonElement> & { ref?: Ref<HTMLButtonElement> };
  return (
    <button type="button" {...buttonProps} style={{ ...style, ...buttonProps.style }} className={classes}>
      {inner}
    </button>
  );
}

export default ShimmerButton;

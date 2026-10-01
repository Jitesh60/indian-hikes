/**
 * fx — vendored animation components (React Bits, Magic UI, Uiverse).
 * Keyframes live in ./fx.css, which must be imported once globally
 * (e.g. `@import "../components/fx/fx.css";` in src/app/globals.css).
 * See ./README.md for sources, licenses and usage.
 */

// helpers
export { cn } from "./cn";
export { usePrefersReducedMotion } from "./use-reduced-motion";

// React Bits (MIT + Commons Clause)
export { BlurText, type BlurTextProps } from "./BlurText";
export { RotatingText, type RotatingTextProps, type RotatingTextRef } from "./RotatingText";
export { CountUp, type CountUpProps } from "./CountUp";
export { ShinyText, type ShinyTextProps } from "./ShinyText";
export { Magnet, type MagnetProps } from "./Magnet";
export { SpotlightCard, type SpotlightCardProps } from "./SpotlightCard";
export { TiltedCard, type TiltedCardProps } from "./TiltedCard";
export { ScrollVelocity, type ScrollVelocityProps } from "./ScrollVelocity";
export { Galaxy, type GalaxyProps } from "./Galaxy";

// Magic UI (MIT)
export { Marquee, type MarqueeProps } from "./Marquee";
export { NumberTicker, type NumberTickerProps } from "./NumberTicker";
export { BlurFade, type BlurFadeProps } from "./BlurFade";
export { BorderBeam, type BorderBeamProps } from "./BorderBeam";
export { ShimmerButton, type ShimmerButtonProps } from "./ShimmerButton";
export { AnimatedShinyText, type AnimatedShinyTextProps } from "./AnimatedShinyText";
export { Meteors, type MeteorsProps } from "./Meteors";
export { Dock, DockIcon, type DockProps, type DockIconProps } from "./Dock";
export { AnimatedList, AnimatedListItem, type AnimatedListProps } from "./AnimatedList";

// Uiverse.io (MIT)
export { ArrowButton, type ArrowButtonProps } from "./ArrowButton";
export { CircularTextButton, type CircularTextButtonProps } from "./CircularTextButton";
export { CompassLoader, type CompassLoaderProps } from "./CompassLoader";
export { GlassCard, type GlassCardProps } from "./GlassCard";

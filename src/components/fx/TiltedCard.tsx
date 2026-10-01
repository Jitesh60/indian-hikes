"use client";

/**
 * TiltedCard — a 3D card that tilts toward the cursor on a spring, with an
 * optional floating caption tooltip and a raised (translateZ) overlay.
 *
 * Source:  React Bits — https://github.com/DavidHDev/react-bits
 *          src/ts-tailwind/Components/TiltedCard/TiltedCard.tsx
 * License: MIT + Commons Clause, (c) David Haz. Free to use as part of a
 *          website/product; the component itself may not be sold or
 *          redistributed on its own.
 * Changes: the card face can be any `children` (e.g. a next/image or the
 *          site's <Photo>) instead of only `imageSrc`; mobile warning
 *          removed (tilt simply never triggers on touch); last-Y kept in a
 *          ref (no re-render per mousemove); the caption is also exposed as
 *          real text (sr-only); prefers-reduced-motion = flat, static card.
 */
import { motion, useMotionValue, useSpring, type SpringOptions } from "motion/react";
import { useRef, type ReactNode } from "react";
import { cn } from "./cn";
import { usePrefersReducedMotion } from "./use-reduced-motion";

export interface TiltedCardProps {
  /** Card face. If omitted, `imageSrc` is rendered as an <img>. */
  children?: ReactNode;
  imageSrc?: string;
  altText?: string;
  captionText?: string;
  containerHeight?: React.CSSProperties["height"];
  containerWidth?: React.CSSProperties["width"];
  imageHeight?: React.CSSProperties["height"];
  imageWidth?: React.CSSProperties["width"];
  scaleOnHover?: number;
  /** max rotation in degrees */
  rotateAmplitude?: number;
  showTooltip?: boolean;
  /** content floated 30px above the face (e.g. a title chip) */
  overlayContent?: ReactNode;
  className?: string;
  faceClassName?: string;
}

const springValues: SpringOptions = { damping: 30, stiffness: 100, mass: 2 };

export function TiltedCard({
  children,
  imageSrc,
  altText = "",
  captionText = "",
  containerHeight = "300px",
  containerWidth = "100%",
  imageHeight = "300px",
  imageWidth = "300px",
  scaleOnHover = 1.05,
  rotateAmplitude = 12,
  showTooltip = true,
  overlayContent = null,
  className,
  faceClassName,
}: TiltedCardProps) {
  const reduce = usePrefersReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const lastY = useRef(0);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useMotionValue(0), springValues);
  const rotateY = useSpring(useMotionValue(0), springValues);
  const scale = useSpring(1, springValues);
  const opacity = useSpring(0);
  const rotateFigcaption = useSpring(0, { stiffness: 350, damping: 30, mass: 1 });

  function handleMouse(e: React.MouseEvent<HTMLElement>) {
    if (!ref.current || reduce) return;
    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;
    rotateX.set((offsetY / (rect.height / 2)) * -rotateAmplitude);
    rotateY.set((offsetX / (rect.width / 2)) * rotateAmplitude);
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
    rotateFigcaption.set(-(offsetY - lastY.current) * 0.6);
    lastY.current = offsetY;
  }

  function handleMouseEnter() {
    if (reduce) return;
    scale.set(scaleOnHover);
    opacity.set(1);
  }

  function handleMouseLeave() {
    opacity.set(0);
    scale.set(1);
    rotateX.set(0);
    rotateY.set(0);
    rotateFigcaption.set(0);
  }

  return (
    <figure
      ref={ref}
      className={cn("relative flex flex-col items-center justify-center [perspective:800px]", className)}
      style={{ height: containerHeight, width: containerWidth }}
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="relative [transform-style:preserve-3d]"
        style={{ width: imageWidth, height: imageHeight, rotateX, rotateY, scale }}
      >
        <div
          className={cn(
            "absolute inset-0 overflow-hidden rounded-[20px] will-change-transform [transform:translateZ(0)]",
            faceClassName,
          )}
        >
          {children ??
            (imageSrc ? (
              // eslint-disable-next-line @next/next/no-img-element -- generic vendored component; callers can pass <Image> as children
              <img src={imageSrc} alt={altText} className="h-full w-full object-cover" />
            ) : null)}
        </div>

        {overlayContent && (
          <div className="absolute top-0 left-0 z-[2] will-change-transform [transform:translateZ(30px)]">
            {overlayContent}
          </div>
        )}
      </motion.div>

      {captionText && <figcaption className="sr-only">{captionText}</figcaption>}
      {showTooltip && captionText && !reduce && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-0 z-[3] hidden rounded-full bg-white px-3 py-1 text-[11px] font-medium text-ink-900 shadow-lg sm:block"
          style={{ x, y, opacity, rotate: rotateFigcaption }}
        >
          {captionText}
        </motion.div>
      )}
    </figure>
  );
}

export default TiltedCard;

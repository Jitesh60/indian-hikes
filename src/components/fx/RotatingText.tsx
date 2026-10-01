"use client";

/**
 * RotatingText — cycles through a list of words with a staggered,
 * per-character spring (e.g. "Trek to the [summit | meadows | lakes]").
 *
 * Source:  React Bits — https://github.com/DavidHDev/react-bits
 *          src/ts-tailwind/TextAnimations/RotatingText/RotatingText.tsx
 * License: MIT + Commons Clause, (c) David Haz. Free to use as part of a
 *          website/product; the component itself may not be sold or
 *          redistributed on its own.
 * Changes: shared cn(); "random" stagger seeded per index (pure render);
 *          pauses while hovered/focused; prefers-reduced-motion shows the
 *          first text, static, with no rotation. The current text stays in
 *          an sr-only span; the animated characters are aria-hidden.
 */
import {
  AnimatePresence,
  motion,
  type Target,
  type TargetAndTransition,
  type Transition,
  type VariantLabels,
} from "motion/react";
import { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useState } from "react";
import { cn } from "./cn";
import { usePrefersReducedMotion } from "./use-reduced-motion";

export interface RotatingTextRef {
  next: () => void;
  previous: () => void;
  jumpTo: (index: number) => void;
  reset: () => void;
}

export interface RotatingTextProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof motion.span>,
    "children" | "transition" | "initial" | "animate" | "exit"
  > {
  texts: string[];
  transition?: Transition;
  initial?: boolean | Target | VariantLabels;
  animate?: boolean | VariantLabels | TargetAndTransition;
  exit?: Target | VariantLabels;
  animatePresenceMode?: "sync" | "wait";
  animatePresenceInitial?: boolean;
  /** ms between rotations */
  rotationInterval?: number;
  /** seconds between characters */
  staggerDuration?: number;
  staggerFrom?: "first" | "last" | "center" | "random" | number;
  loop?: boolean;
  auto?: boolean;
  splitBy?: "characters" | "words" | "lines" | (string & {});
  onNext?: (index: number) => void;
  mainClassName?: string;
  splitLevelClassName?: string;
  elementLevelClassName?: string;
}

function splitIntoCharacters(text: string): string[] {
  if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
    const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" });
    return Array.from(segmenter.segment(text), (s) => s.segment);
  }
  return Array.from(text);
}

/** Deterministic 0..1 pseudo-random from an integer (keeps render pure). */
function hash01(n: number): number {
  const x = Math.sin(n * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

export const RotatingText = forwardRef<RotatingTextRef, RotatingTextProps>(function RotatingText(
  {
    texts,
    transition = { type: "spring", damping: 25, stiffness: 300 },
    initial = { y: "100%", opacity: 0 },
    animate = { y: 0, opacity: 1 },
    exit = { y: "-120%", opacity: 0 },
    animatePresenceMode = "wait",
    animatePresenceInitial = false,
    rotationInterval = 2200,
    staggerDuration = 0.025,
    staggerFrom = "first",
    loop = true,
    auto = true,
    splitBy = "characters",
    onNext,
    mainClassName,
    splitLevelClassName,
    elementLevelClassName,
    onMouseEnter,
    onMouseLeave,
    onFocus,
    onBlur,
    ...rest
  },
  ref,
) {
  const reduce = usePrefersReducedMotion();
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const index = reduce ? 0 : currentTextIndex;

  const elements = useMemo(() => {
    const currentText = texts[index] ?? "";
    if (splitBy === "characters") {
      const words = currentText.split(" ");
      return words.map((word, i) => ({ characters: splitIntoCharacters(word), needsSpace: i !== words.length - 1 }));
    }
    const sep = splitBy === "words" ? " " : splitBy === "lines" ? "\n" : splitBy;
    return currentText.split(sep).map((part, i, arr) => ({ characters: [part], needsSpace: i !== arr.length - 1 }));
  }, [texts, index, splitBy]);

  const getStaggerDelay = useCallback(
    (i: number, total: number): number => {
      if (staggerFrom === "first") return i * staggerDuration;
      if (staggerFrom === "last") return (total - 1 - i) * staggerDuration;
      if (staggerFrom === "center") return Math.abs(Math.floor(total / 2) - i) * staggerDuration;
      if (staggerFrom === "random") {
        const r = Math.floor(hash01(i + index * 31) * total);
        return Math.abs(r - i) * staggerDuration;
      }
      return Math.abs(staggerFrom - i) * staggerDuration;
    },
    [staggerFrom, staggerDuration, index],
  );

  const handleIndexChange = useCallback(
    (newIndex: number) => {
      setCurrentTextIndex(newIndex);
      onNext?.(newIndex);
    },
    [onNext],
  );

  const next = useCallback(() => {
    const nextIndex =
      currentTextIndex === texts.length - 1 ? (loop ? 0 : currentTextIndex) : currentTextIndex + 1;
    if (nextIndex !== currentTextIndex) handleIndexChange(nextIndex);
  }, [currentTextIndex, texts.length, loop, handleIndexChange]);

  const previous = useCallback(() => {
    const prevIndex = currentTextIndex === 0 ? (loop ? texts.length - 1 : currentTextIndex) : currentTextIndex - 1;
    if (prevIndex !== currentTextIndex) handleIndexChange(prevIndex);
  }, [currentTextIndex, texts.length, loop, handleIndexChange]);

  const jumpTo = useCallback(
    (i: number) => {
      const valid = Math.max(0, Math.min(i, texts.length - 1));
      if (valid !== currentTextIndex) handleIndexChange(valid);
    },
    [texts.length, currentTextIndex, handleIndexChange],
  );

  const reset = useCallback(() => {
    if (currentTextIndex !== 0) handleIndexChange(0);
  }, [currentTextIndex, handleIndexChange]);

  useImperativeHandle(ref, () => ({ next, previous, jumpTo, reset }), [next, previous, jumpTo, reset]);

  useEffect(() => {
    if (!auto || reduce || paused) return;
    const id = setInterval(next, rotationInterval);
    return () => clearInterval(id);
  }, [next, rotationInterval, auto, reduce, paused]);

  const totalChars = elements.reduce((sum, w) => sum + w.characters.length, 0);

  return (
    <motion.span
      className={cn("relative flex flex-wrap whitespace-pre-wrap", mainClassName)}
      {...rest}
      onMouseEnter={(e) => {
        setPaused(true);
        onMouseEnter?.(e);
      }}
      onMouseLeave={(e) => {
        setPaused(false);
        onMouseLeave?.(e);
      }}
      onFocus={(e) => {
        setPaused(true);
        onFocus?.(e);
      }}
      onBlur={(e) => {
        setPaused(false);
        onBlur?.(e);
      }}
      layout={!reduce}
      transition={transition}
    >
      <span className="sr-only">{texts[index]}</span>
      <AnimatePresence mode={animatePresenceMode} initial={animatePresenceInitial}>
        <motion.span
          key={index}
          className={cn(splitBy === "lines" ? "flex w-full flex-col" : "relative flex flex-wrap whitespace-pre-wrap")}
          layout={!reduce}
          aria-hidden="true"
        >
          {elements.map((wordObj, wordIndex, array) => {
            const previousCharsCount = array.slice(0, wordIndex).reduce((sum, w) => sum + w.characters.length, 0);
            return (
              <span key={wordIndex} className={cn("inline-flex", splitLevelClassName)}>
                {wordObj.characters.map((char, charIndex) => (
                  <motion.span
                    key={charIndex}
                    initial={reduce ? false : initial}
                    animate={animate}
                    exit={exit}
                    transition={{ ...transition, delay: getStaggerDelay(previousCharsCount + charIndex, totalChars) }}
                    className={cn("inline-block", elementLevelClassName)}
                  >
                    {char}
                  </motion.span>
                ))}
                {wordObj.needsSpace && <span className="whitespace-pre"> </span>}
              </span>
            );
          })}
        </motion.span>
      </AnimatePresence>
    </motion.span>
  );
});

export default RotatingText;

import Link from "next/link";
import type { ReactNode } from "react";
import { DIFFICULTY_ORDER, difficultyScore, type Difficulty } from "@/lib/types";

/** Difficulty as five stacked bars — it reads as a scale, not a label. */
export function DifficultyMeter({
  difficulty,
  size = "sm",
  onDark = false,
}: {
  difficulty: Difficulty;
  size?: "sm" | "md";
  onDark?: boolean;
}) {
  const score = difficultyScore(difficulty);
  const h = size === "sm" ? "h-3" : "h-4";
  const w = size === "sm" ? "w-[3px]" : "w-1";
  return (
    <span className="inline-flex items-center gap-2" title={`${difficulty} — ${score} of 5`}>
      <span className="inline-flex items-end gap-[3px]" aria-hidden="true">
        {DIFFICULTY_ORDER.map((_, i) => (
          <span
            key={i}
            className={[
              w,
              h,
              "block",
              i < score
                ? score >= 5
                  ? "bg-rhodo-600"
                  : score >= 4
                    ? "bg-bugyal-600"
                    : "bg-deodar-500"
                : onDark
                  ? "bg-glacier-700/40"
                  : "bg-snow-300",
            ].join(" ")}
            style={{ height: `${(size === "sm" ? 6 : 8) + i * (size === "sm" ? 2 : 3)}px` }}
          />
        ))}
      </span>
      <span className={size === "sm" ? "text-[13px]" : "text-[14px]"}>{difficulty}</span>
    </span>
  );
}

export function Pill({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: "neutral" | "green" | "gold" | "red" | "ice";
}) {
  const tones = {
    neutral: "border-snow-300 text-snow-500",
    green: "border-deodar-500/40 text-deodar-600 bg-deodar-400/10",
    gold: "border-bugyal-600/40 text-bugyal-600 bg-bugyal-500/10",
    red: "border-rhodo-600/40 text-rhodo-600 bg-rhodo-600/8",
    ice: "border-glacier-600/40 text-glacier-700 bg-glacier-600/10",
  };
  return (
    <span className={`inline-block border px-2 py-[3px] text-[12px] leading-none ${tones[tone]}`}>
      {children}
    </span>
  );
}

export function SectionHead({
  title,
  intro,
  action,
}: {
  title: string;
  intro?: string;
  action?: { href: string; label: string };
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4 mb-9">
      <div>
        <h2 className="font-display text-[clamp(1.85rem,3.6vw,2.7rem)] leading-[1.08]">{title}</h2>
        {intro && <p className="mt-3 text-[16.5px] leading-relaxed text-spruce-800/70 measure">{intro}</p>}
      </div>
      {action && (
        <Link
          href={action.href}
          className="text-[15px] font-semibold border-b-2 border-bugyal-500 pb-0.5 hover:border-spruce-800 transition-colors whitespace-nowrap"
        >
          {action.label}
        </Link>
      )}
    </div>
  );
}

export function Button({
  href,
  children,
  variant = "primary",
  type,
  onClick,
  disabled,
  className = "",
}: {
  href?: string;
  children: ReactNode;
  variant?: "primary" | "outline" | "ghost" | "dark";
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}) {
  const base =
    "inline-flex items-center justify-center gap-2 px-5 py-3 text-[15px] font-semibold transition-colors disabled:opacity-40 disabled:cursor-not-allowed";
  const variants = {
    primary: "bg-bugyal-500 text-spruce-900 hover:bg-bugyal-400",
    dark: "bg-spruce-800 text-snow-50 hover:bg-spruce-700",
    outline: "border border-snow-300 text-spruce-800 hover:border-spruce-800",
    ghost: "text-spruce-800 hover:bg-snow-200",
  };
  const cls = `${base} ${variants[variant]} ${className}`;
  if (href) return <Link href={href} className={cls}>{children}</Link>;
  return (
    <button type={type ?? "button"} onClick={onClick} disabled={disabled} className={cls}>
      {children}
    </button>
  );
}

export function Field({
  label,
  hint,
  children,
  htmlFor,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
  htmlFor?: string;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block text-[13.5px] font-semibold mb-1.5">
        {label}
      </label>
      {children}
      {hint && <p className="mt-1.5 text-[12.5px] text-snow-500">{hint}</p>}
    </div>
  );
}

export const inputCls =
  "w-full border border-snow-300 bg-snow-50 px-3.5 py-2.5 text-[15px] placeholder:text-snow-400 focus:border-spruce-800 outline-none transition-colors";

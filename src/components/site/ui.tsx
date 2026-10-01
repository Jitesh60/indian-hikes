import Link from "next/link";
import type { ReactNode } from "react";
import { Star } from "lucide-react";
import { DIFFICULTY_ORDER, difficultyScore, type Difficulty } from "@/lib/types";

/** Difficulty as five rising bars — it reads as a scale, not a label. */
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
  const w = size === "sm" ? "w-[3px]" : "w-1";
  const on = score >= 5 ? "bg-ember-600" : score >= 4 ? "bg-ember-500" : onDark ? "bg-white" : "bg-ink-900";
  return (
    <span className="inline-flex items-center gap-2" title={`${difficulty} — ${score} of 5`}>
      <span className="inline-flex items-end gap-[3px]" aria-hidden="true">
        {DIFFICULTY_ORDER.map((_, i) => (
          <span
            key={i}
            className={[w, "block rounded-full", i < score ? on : onDark ? "bg-white/25" : "bg-mist-300"].join(" ")}
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
  tone?: "neutral" | "green" | "gold" | "red" | "ice" | "glass" | "dark";
}) {
  const tones = {
    neutral: "bg-mist-100 text-ink-600",
    green: "bg-pine-500/12 text-pine-600",
    gold: "bg-sun-400/30 text-ink-800",
    red: "bg-ember-500/12 text-ember-600",
    ice: "bg-ice-100 text-ice-500",
    glass: "glass text-white",
    dark: "bg-ink-900 text-white",
  };
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[12px] font-medium leading-none ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

/** Small uppercase label that introduces a section. */
export function Eyebrow({ children, onDark = false }: { children: ReactNode; onDark?: boolean }) {
  return (
    <p
      className={`inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.16em] ${
        onDark ? "text-white/60" : "text-ink-500"
      }`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-forest-500" aria-hidden="true" />
      {children}
    </p>
  );
}

export function SectionHead({
  title,
  intro,
  action,
  eyebrow,
  onDark = false,
  center = false,
}: {
  title: string;
  intro?: string;
  action?: { href: string; label: string };
  eyebrow?: string;
  onDark?: boolean;
  center?: boolean;
}) {
  return (
    <div
      className={`mb-10 flex flex-wrap gap-x-10 gap-y-5 ${
        center ? "flex-col items-center text-center" : "items-end justify-between"
      }`}
    >
      <div className={center ? "flex flex-col items-center" : ""}>
        {eyebrow && <div className="mb-3"><Eyebrow onDark={onDark}>{eyebrow}</Eyebrow></div>}
        <h2
          className={`font-display text-[clamp(1.9rem,3.8vw,3rem)] leading-[1.04] ${
            onDark ? "text-white" : "text-ink-900"
          }`}
        >
          {title}
        </h2>
        {intro && (
          <p
            className={`mt-4 max-w-[58ch] text-[16px] leading-relaxed ${
              onDark ? "text-white/65" : "text-ink-500"
            }`}
          >
            {intro}
          </p>
        )}
      </div>
      {action && (
        <Button href={action.href} variant={onDark ? "light" : "outline"} size="sm">
          {action.label}
        </Button>
      )}
    </div>
  );
}

export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  type,
  onClick,
  disabled,
  className = "",
}: {
  href?: string;
  children: ReactNode;
  variant?: "primary" | "outline" | "ghost" | "dark" | "light" | "glass" | "outline-light";
  size?: "sm" | "md" | "lg";
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}) {
  const sizes = {
    sm: "px-4 py-2 text-[13.5px]",
    md: "px-5 py-2.5 text-[14.5px]",
    lg: "px-7 py-3.5 text-[15.5px]",
  };
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap transition-all duration-200 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed";
  const variants = {
    primary: "bg-forest-500 text-white hover:bg-forest-600 shadow-[0_8px_24px_-8px_rgb(255_106_43/0.6)]",
    dark: "bg-ink-900 text-white hover:bg-ink-700",
    light: "bg-white text-ink-900 hover:bg-mist-100",
    outline: "border border-ink-900/15 text-ink-900 hover:border-ink-900 bg-transparent",
    "outline-light": "border border-white/30 text-white hover:border-white hover:bg-white/5",
    glass: "glass text-white hover:bg-white/25",
    ghost: "text-ink-900 hover:bg-mist-200",
  };
  const cls = `${base} ${sizes[size]} ${variants[variant]} ${className}`;
  if (href) return <Link href={href} className={cls}>{children}</Link>;
  return (
    <button type={type ?? "button"} onClick={onClick} disabled={disabled} className={cls}>
      {children}
    </button>
  );
}

/** Rating as five stars plus the number. */
export function Stars({ rating, reviews, onDark = false }: { rating: number; reviews?: number; onDark?: boolean }) {
  const full = Math.round(rating);
  return (
    <span className="inline-flex items-center gap-1.5 text-[13px]">
      <span className="inline-flex" aria-hidden="true">
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            size={13}
            className={i < full ? "fill-sun-400 text-sun-400" : onDark ? "text-white/25" : "text-mist-300"}
          />
        ))}
      </span>
      <span className={`nums font-medium ${onDark ? "text-white" : "text-ink-900"}`}>{rating.toFixed(1)}</span>
      {reviews !== undefined && (
        <span className={`nums ${onDark ? "text-white/55" : "text-ink-400"}`}>
          ({reviews.toLocaleString("en-IN")})
        </span>
      )}
      <span className="sr-only">{`Rated ${rating} out of 5`}</span>
    </span>
  );
}

/** Initials avatar — we have no portraits of real staff, so we don't fake them. */
export function Avatar({
  name,
  size = 36,
  tone = "ember",
}: {
  name: string;
  size?: number;
  tone?: "ember" | "ink" | "ice" | "pine";
}) {
  const initials = name
    .replace(/^(Dr\.|Mr\.|Ms\.)\s*/, "")
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join("");
  const tones = {
    ember: "bg-forest-400 text-white",
    ink: "bg-ink-800 text-white",
    ice: "bg-ice-200 text-ink-800",
    pine: "bg-pine-500 text-white",
  };
  return (
    <span
      aria-hidden="true"
      className={`inline-flex shrink-0 items-center justify-center rounded-full font-medium ring-2 ring-white ${tones[tone]}`}
      style={{ width: size, height: size, fontSize: size * 0.36 }}
    >
      {initials}
    </span>
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
      <label htmlFor={htmlFor} className="mb-1.5 block text-[13.5px] font-medium text-ink-800">
        {label}
      </label>
      {children}
      {hint && <p className="mt-1.5 text-[12.5px] text-ink-400">{hint}</p>}
    </div>
  );
}

export const inputCls =
  "w-full rounded-xl border border-mist-300 bg-white px-3.5 py-2.5 text-[15px] placeholder:text-ink-400 focus:border-ink-900 outline-none transition-colors";

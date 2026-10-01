import type { ReactNode } from "react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Photo } from "@/components/site/Photo";
import { Eyebrow } from "@/components/site/ui";
import type { PhotoKey } from "@/data/photos";

/**
 * Shared shell for the content pages (about, safety, fitness, policy…).
 *
 * With a `photo`, the header is a rounded full-bleed hero that sits under
 * the floating glass nav. Without one it is a calm ice-blue panel. Page
 * content goes underneath on the mist background, usually in <Panel>s.
 */
export function InfoShell({
  title,
  intro,
  children,
  photo,
  eyebrow,
  position,
}: {
  title: string;
  intro: string;
  children: ReactNode;
  /** A photograph for the hero; omit for a plain ice-blue header. */
  photo?: PhotoKey;
  /** Small label above the title. */
  eyebrow?: string;
  /** CSS object-position for the hero photo. */
  position?: string;
}) {
  return (
    <>
      <SiteHeader variant={photo ? "dark" : "paper"} />
      <main className="pb-16 sm:pb-24">
        <div className={`px-3 sm:px-5 ${photo ? "pt-3 sm:pt-4" : ""}`}>
          {photo ? (
            <header className="relative mx-auto flex min-h-[520px] max-w-[1320px] items-end overflow-hidden rounded-bento bg-ink-900 sm:min-h-[560px] lg:min-h-[600px]">
              <Photo name={photo} width={2000} priority position={position} alt="" />
              <div className="absolute inset-0 bg-ink-950/25" aria-hidden="true" />
              <div className="scrim-b absolute inset-0" aria-hidden="true" />
              <div className="relative w-full px-5 pb-8 pt-[130px] sm:px-10 sm:pb-12 lg:px-14 lg:pb-14">
                {eyebrow && (
                  <div className="mb-4">
                    <Eyebrow onDark>{eyebrow}</Eyebrow>
                  </div>
                )}
                <h1 className="font-display max-w-[18ch] text-[clamp(2.3rem,6vw,4.6rem)] leading-[1.0] text-white">
                  {title}
                </h1>
                <p className="mt-5 max-w-[58ch] text-[16.5px] leading-relaxed text-white/75 sm:text-[18px]">
                  {intro}
                </p>
              </div>
            </header>
          ) : (
            <header className="relative mx-auto max-w-[1320px] overflow-hidden rounded-bento bg-ice-100 px-5 py-12 sm:px-10 sm:py-16 lg:px-14 lg:py-20">
              <div
                className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-ice-200/70 blur-2xl"
                aria-hidden="true"
              />
              <div className="relative">
                {eyebrow && (
                  <div className="mb-4">
                    <Eyebrow>{eyebrow}</Eyebrow>
                  </div>
                )}
                <h1 className="font-display max-w-[20ch] text-[clamp(2.2rem,5.4vw,4rem)] leading-[1.02] text-ink-900">
                  {title}
                </h1>
                <p className="mt-5 max-w-[60ch] text-[16.5px] leading-relaxed text-ink-500 sm:text-[18px]">
                  {intro}
                </p>
              </div>
            </header>
          )}
        </div>

        <div className="mt-3 px-3 sm:mt-5 sm:px-5">
          <div className="mx-auto grid max-w-[1320px] gap-3 sm:gap-5">{children}</div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

/** A rounded content card. White by default; ice, dark and pine for emphasis. */
export function Panel({
  children,
  tone = "white",
  className = "",
  id,
  as: Tag = "section",
}: {
  children: ReactNode;
  tone?: "white" | "ice" | "dark" | "pine" | "none";
  className?: string;
  id?: string;
  as?: "section" | "div" | "aside" | "article";
}) {
  const tones = {
    white: "bg-white shadow-soft text-ink-900",
    ice: "bg-ice-100 text-ink-900",
    dark: "bg-ink-900 text-white",
    pine: "bg-pine-600 text-white",
    none: "",
  };
  return (
    <Tag
      id={id}
      className={`min-w-0 rounded-bento ${tone === "none" ? "" : "p-6 sm:p-10 lg:p-12"} ${tones[tone]} ${className}`}
    >
      {children}
    </Tag>
  );
}

export function Prose({ children, onDark = false }: { children: ReactNode; onDark?: boolean }) {
  return (
    <div
      className={`max-w-[64ch] space-y-5 text-[16.5px] leading-[1.7] sm:text-[17px] ${
        onDark ? "text-white/75" : "text-ink-600"
      }`}
    >
      {children}
    </div>
  );
}

export function H2({
  children,
  eyebrow,
  onDark = false,
  intro,
}: {
  children: ReactNode;
  eyebrow?: string;
  onDark?: boolean;
  intro?: ReactNode;
}) {
  return (
    <div className="mb-7 sm:mb-9">
      {eyebrow && (
        <div className="mb-3">
          <Eyebrow onDark={onDark}>{eyebrow}</Eyebrow>
        </div>
      )}
      <h2
        className={`font-display text-[clamp(1.7rem,3.4vw,2.6rem)] leading-[1.06] ${
          onDark ? "text-white" : "text-ink-900"
        }`}
      >
        {children}
      </h2>
      {intro && (
        <p
          className={`mt-3 max-w-[60ch] text-[16px] leading-relaxed ${
            onDark ? "text-white/65" : "text-ink-500"
          }`}
        >
          {intro}
        </p>
      )}
    </div>
  );
}

/** Compact stat: small label, big number. */
export function Stat({
  value,
  label,
  note,
  onDark = false,
}: {
  value: ReactNode;
  label: string;
  note?: string;
  onDark?: boolean;
}) {
  return (
    <div>
      <p className={`text-[13px] ${onDark ? "text-white/60" : "text-ink-500"}`}>{label}</p>
      <p
        className={`nums font-display mt-2 text-[clamp(1.9rem,3.4vw,2.7rem)] leading-none ${
          onDark ? "text-white" : "text-ink-900"
        }`}
      >
        {value}
      </p>
      {note && (
        <p className={`mt-2 text-[13px] leading-snug ${onDark ? "text-white/50" : "text-ink-400"}`}>{note}</p>
      )}
    </div>
  );
}

/** Round step number used on numbered cards. */
export function StepNo({ n, tone = "dark" }: { n: number; tone?: "dark" | "light" | "ember" | "pine" }) {
  const tones = {
    dark: "bg-ink-900 text-white",
    light: "bg-white text-ink-900",
    ember: "bg-ember-500 text-white",
    pine: "bg-pine-500 text-white",
  };
  return (
    <span
      className={`nums inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[14px] font-semibold ${tones[tone]}`}
    >
      {String(n).padStart(2, "0")}
    </span>
  );
}

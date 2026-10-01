"use client";

import { useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Venus, UserRound, X, CalendarX2 } from "lucide-react";
import { Photo } from "@/components/site/Photo";
import { Pill } from "@/components/site/ui";
import { trekCover } from "@/data/photos";
import { DIFFICULTY_ORDER, type Departure, type Difficulty, type Trek } from "@/lib/types";

const DAYS = ["M", "T", "W", "T", "F", "S", "S"];

/** Availability is read from slots left, so the colours agree everywhere. */
function availability(left: number) {
  if (left <= 0) return { tone: "red" as const, label: "Full", dot: "bg-ember-600", bar: "bg-ember-600" };
  if (left <= 3) return { tone: "gold" as const, label: `${left} left`, dot: "bg-sun-400", bar: "bg-sun-400" };
  return { tone: "green" as const, label: "Open", dot: "bg-pine-500", bar: "bg-pine-500" };
}

function fmt(iso: string, opts: Intl.DateTimeFormatOptions) {
  return new Date(iso).toLocaleDateString("en-IN", { ...opts, timeZone: "UTC" });
}

export function DepartureCalendar({
  treks,
  departures,
}: {
  treks: Trek[];
  departures: Departure[];
}) {
  const first = departures[0] ? new Date(departures[0].start) : new Date();
  const [cursor, setCursor] = useState(
    new Date(Date.UTC(first.getUTCFullYear(), first.getUTCMonth(), 1))
  );
  const [grade, setGrade] = useState<Difficulty | "all">("all");
  const [region, setRegion] = useState<string>("all");
  const [onlyOpen, setOnlyOpen] = useState(true);
  const [greenOnly, setGreenOnly] = useState(false);
  const [day, setDay] = useState<number | null>(null);

  const trekMap = useMemo(() => new Map(treks.map((t) => [t.slug, t])), [treks]);
  const regions = useMemo(() => Array.from(new Set(treks.map((t) => t.state))).sort(), [treks]);

  const filtered = useMemo(
    () =>
      departures.filter((d) => {
        const t = trekMap.get(d.trek);
        if (!t) return false;
        if (grade !== "all" && t.difficulty !== grade) return false;
        if (region !== "all" && t.state !== region) return false;
        if (onlyOpen && d.status === "full") return false;
        if (greenOnly && !d.womenOnly) return false;
        return true;
      }),
    [departures, trekMap, grade, region, onlyOpen, greenOnly]
  );

  const monthKey = `${cursor.getUTCFullYear()}-${cursor.getUTCMonth()}`;
  const inMonth = filtered.filter((d) => {
    const s = new Date(d.start);
    return `${s.getUTCFullYear()}-${s.getUTCMonth()}` === monthKey;
  });

  const byDay = useMemo(() => {
    const m = new Map<number, Departure[]>();
    inMonth.forEach((d) => {
      const dd = new Date(d.start).getUTCDate();
      m.set(dd, [...(m.get(dd) ?? []), d]);
    });
    return m;
  }, [inMonth]);

  const daysInMonth = new Date(
    Date.UTC(cursor.getUTCFullYear(), cursor.getUTCMonth() + 1, 0)
  ).getUTCDate();
  // Monday-first offset
  const startOffset = (new Date(Date.UTC(cursor.getUTCFullYear(), cursor.getUTCMonth(), 1)).getUTCDay() + 6) % 7;

  const shift = (n: number) => {
    setDay(null);
    setCursor((c) => new Date(Date.UTC(c.getUTCFullYear(), c.getUTCMonth() + n, 1)));
  };

  const monthName = cursor.toLocaleDateString("en-IN", { month: "long", year: "numeric", timeZone: "UTC" });
  const shown = day === null ? inMonth : byDay.get(day) ?? [];
  const filtersOn = grade !== "all" || region !== "all" || !onlyOpen || greenOnly;

  const resetFilters = () => {
    setGrade("all");
    setRegion("all");
    setOnlyOpen(true);
    setGreenOnly(false);
  };

  return (
    <div className="space-y-3 sm:space-y-5">
      {/* Controls */}
      <div className="rounded-bento bg-white p-4 shadow-soft sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-1 rounded-full bg-mist-100 p-1">
            <button
              onClick={() => shift(-1)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink-900 transition-colors hover:bg-white"
              aria-label="Previous month"
            >
              <ChevronLeft size={18} />
            </button>
            <h2 className="min-w-[150px] px-2 text-center text-[17px] font-semibold tracking-[-0.02em] text-ink-900 sm:min-w-[180px] sm:text-[19px]" aria-live="polite">
              {monthName}
            </h2>
            <button
              onClick={() => shift(1)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink-900 transition-colors hover:bg-white"
              aria-label="Next month"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            <Toggle on={onlyOpen} onClick={() => setOnlyOpen((v) => !v)}>
              Open only
            </Toggle>
            <Toggle on={greenOnly} onClick={() => setGreenOnly((v) => !v)}>
              <Venus size={13} /> Women-only
            </Toggle>
          </div>
        </div>

        <div className="mt-5 space-y-3 border-t border-mist-200 pt-5">
          <PillRail label="Grade">
            <Toggle on={grade === "all"} onClick={() => setGrade("all")}>Any grade</Toggle>
            {DIFFICULTY_ORDER.map((d) => (
              <Toggle key={d} on={grade === d} onClick={() => setGrade(d)}>
                {d}
              </Toggle>
            ))}
          </PillRail>
          <PillRail label="Region">
            <Toggle on={region === "all"} onClick={() => setRegion("all")}>Any region</Toggle>
            {regions.map((r) => (
              <Toggle key={r} on={region === r} onClick={() => setRegion(r)}>
                {r}
              </Toggle>
            ))}
          </PillRail>
        </div>
      </div>

      <div className="grid items-start gap-3 sm:gap-5 lg:grid-cols-[360px_minmax(0,1fr)]">
        {/* Month at a glance */}
        <div className="rounded-bento bg-white p-4 shadow-soft sm:p-6 lg:sticky lg:top-28">
          <div className="grid grid-cols-7 gap-1 text-center">
            {DAYS.map((d, i) => (
              <div key={i} className="pb-1 text-[11.5px] font-medium text-ink-400">
                {d}
              </div>
            ))}
            {Array.from({ length: startOffset }).map((_, i) => (
              <div key={`pad${i}`} />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const d = i + 1;
              const list = byDay.get(d) ?? [];
              const selected = day === d;
              if (!list.length) {
                return (
                  <div key={d} className="nums flex aspect-square items-center justify-center rounded-xl text-[13px] text-ink-400/70">
                    {d}
                  </div>
                );
              }
              return (
                <button
                  key={d}
                  onClick={() => setDay(selected ? null : d)}
                  aria-pressed={selected}
                  aria-label={`${d} ${monthName}: ${list.length} ${list.length === 1 ? "departure" : "departures"}`}
                  className={[
                    "nums flex aspect-square flex-col items-center justify-center gap-1 rounded-xl text-[13.5px] font-semibold transition-colors",
                    selected ? "bg-ink-900 text-white" : "bg-mist-100 text-ink-900 hover:bg-mist-200",
                  ].join(" ")}
                >
                  {d}
                  <span className="flex gap-[3px]" aria-hidden="true">
                    {list.slice(0, 3).map((x) => (
                      <span key={x.id} className={`h-1 w-1 rounded-full ${availability(x.capacity - x.booked).dot}`} />
                    ))}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 border-t border-mist-200 pt-4 text-[12.5px] text-ink-500">
            {[
              ["bg-pine-500", "Slots open"],
              ["bg-sun-400", "Three or fewer"],
              ["bg-ember-600", "Full — waitlist"],
            ].map(([c, l]) => (
              <span key={l} className="flex items-center gap-1.5">
                <span className={`h-2 w-2 rounded-full ${c}`} />
                {l}
              </span>
            ))}
          </div>
        </div>

        {/* The departures themselves */}
        <div className="min-w-0">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2 px-1">
            <p className="nums text-[13.5px] text-ink-500">
              <span className="font-semibold text-ink-900">{shown.length}</span>{" "}
              {day === null ? `departures in ${monthName}` : `leaving on ${day} ${monthName}`}
              <span className="text-ink-400"> · {filtered.length} across the next fourteen months</span>
            </p>
            {day !== null && (
              <button
                onClick={() => setDay(null)}
                className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-[13px] text-ink-900 shadow-soft hover:bg-mist-50"
              >
                <X size={13} /> Whole month
              </button>
            )}
          </div>

          {shown.length === 0 ? (
            <div className="flex flex-col items-center rounded-bento bg-white px-6 py-14 text-center shadow-soft">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-mist-100 text-ink-500">
                <CalendarX2 size={20} />
              </span>
              <p className="mt-4 text-[17px] font-semibold text-ink-900">Nothing leaves in {monthName}</p>
              <p className="mt-1 text-[14px] text-ink-500">Try the next month, or loosen the filters.</p>
              <div className="mt-5 flex flex-wrap justify-center gap-2">
                <button onClick={() => shift(1)} className="rounded-full bg-ink-900 px-4 py-2 text-[13.5px] font-medium text-white hover:bg-ink-700">
                  Next month
                </button>
                {filtersOn && (
                  <button onClick={resetFilters} className="rounded-full border border-ink-900/15 px-4 py-2 text-[13.5px] font-medium text-ink-900 hover:border-ink-900">
                    Clear filters
                  </button>
                )}
              </div>
            </div>
          ) : (
            <ul className="space-y-2.5">
              {shown.map((d) => (
                <DepartureRow key={d.id} d={d} t={trekMap.get(d.trek)!} />
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

function DepartureRow({ d, t }: { d: Departure; t: Trek }) {
  const left = d.capacity - d.booked;
  const a = availability(left);
  const pct = Math.min(100, Math.round((d.booked / d.capacity) * 100));
  const full = left <= 0;

  return (
    <li className="grid grid-cols-[64px_minmax(0,1fr)] items-center gap-x-4 gap-y-3 rounded-[22px] bg-white p-3 shadow-soft sm:grid-cols-[76px_minmax(0,1fr)_170px_auto] sm:pr-4">
      <div className="relative aspect-square overflow-hidden rounded-2xl">
        <Photo name={trekCover(t.slug)} width={300} alt="" />
      </div>

      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
          <Link
            href={`/treks/${t.slug}`}
            className="truncate text-[16.5px] font-semibold tracking-[-0.02em] text-ink-900 hover:text-forest-600"
          >
            {t.name}
          </Link>
          <Pill tone={a.tone}>{a.label}</Pill>
          {d.womenOnly && (
            <span className="inline-flex text-pine-600" title="Women-only batch">
              <Venus size={13} />
              <span className="sr-only">Women-only batch</span>
            </span>
          )}
        </div>
        <p className="nums mt-1 text-[13.5px] text-ink-500">
          {fmt(d.start, { day: "numeric", month: "short" })} – {fmt(d.end, { day: "numeric", month: "short" })}
          <span className="text-ink-400"> · {t.days} days<span className="hidden sm:inline"> · {t.state}</span></span>
        </p>
        <p className="mt-0.5 flex items-center gap-1 text-[13px] text-ink-400">
          <UserRound size={12} /> {d.leader}
        </p>
      </div>

      <div className="col-span-2 flex items-center gap-4 sm:contents">
        <div className="min-w-0 flex-1">
          <div className="flex justify-between text-[12px] text-ink-500">
            <span>{full ? "No slots left" : `${left} of ${d.capacity} slots left`}</span>
          </div>
          <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-mist-200" aria-hidden="true">
            <div className={`h-full rounded-full ${a.bar}`} style={{ width: `${pct}%` }} />
          </div>
        </div>

        <Link
          href={`/treks/${t.slug}/book?d=${d.id}${full ? "&waitlist=1" : ""}`}
          title={`${t.name} · ${full ? "full" : `${left} slots left`} · led by ${d.leader}`}
          className={[
            "inline-flex shrink-0 items-center justify-center rounded-full px-5 py-2.5 text-[14px] font-medium whitespace-nowrap transition-colors sm:col-span-1",
            full
              ? "border border-ink-900/15 text-ink-900 hover:border-ink-900"
              : "bg-forest-500 text-white hover:bg-forest-600",
          ].join(" ")}
        >
          {full ? "Join waitlist" : "Book"}
          <span className="sr-only">
            {" "}
            {t.name}, {fmt(d.start, { day: "numeric", month: "long" })}
          </span>
        </Link>
      </div>
    </li>
  );
}

function Toggle({ on, onClick, children }: { on: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={on}
      className={[
        "inline-flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-2 text-[13.5px] whitespace-nowrap transition-colors",
        on ? "bg-ink-900 font-medium text-white" : "bg-mist-100 text-ink-600 hover:bg-mist-200 hover:text-ink-900",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

function PillRail({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div role="group" aria-label={`Filter by ${label.toLowerCase()}`} className="flex min-w-0 items-center gap-3">
      <span className="hidden w-14 shrink-0 text-[12.5px] font-medium text-ink-400 sm:block">{label}</span>
      <div className="no-scrollbar -mx-4 flex min-w-0 flex-1 gap-1.5 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0">
        {children}
      </div>
    </div>
  );
}

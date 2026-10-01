"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  LayoutGrid,
  Leaf,
  Rows3,
  Search,
  SlidersHorizontal,
  Snowflake,
  Sparkles,
  Users,
  X,
  MountainSnow,
} from "lucide-react";
import { TrekRow, TrekCard } from "@/components/site/TrekViews";
import { Photo } from "@/components/site/Photo";
import { Button, Eyebrow } from "@/components/site/ui";
import {
  DIFFICULTY_ORDER,
  MONTHS,
  inr,
  type Difficulty,
  type Month,
  type Trek,
} from "@/lib/types";

type Sort = "altitude" | "price" | "duration" | "rating";
type View = "grid" | "list";

const SORTS: { key: Sort; label: string }[] = [
  { key: "altitude", label: "Altitude" },
  { key: "duration", label: "Duration" },
  { key: "price", label: "Price" },
  { key: "rating", label: "Rating" },
];

const ALT_MIN = 11500;
const ALT_MAX = 15500;
const DAYS_MIN = 4;
const DAYS_MAX = 11;

export function TrekExplorer({
  treks,
  initial,
}: {
  treks: Trek[];
  initial: { difficulty?: string; snow?: boolean; family?: boolean; green?: boolean };
}) {
  const [view, setView] = useState<View>("grid");
  const [sort, setSort] = useState<Sort>("altitude");
  const [query, setQuery] = useState("");
  const [months, setMonths] = useState<Month[]>([]);
  const [states, setStates] = useState<string[]>([]);
  const [grades, setGrades] = useState<Difficulty[]>(
    initial.difficulty && DIFFICULTY_ORDER.includes(initial.difficulty as Difficulty)
      ? [initial.difficulty as Difficulty]
      : []
  );
  const [maxAlt, setMaxAlt] = useState(ALT_MAX);
  const [maxDays, setMaxDays] = useState(DAYS_MAX);
  const [snow, setSnow] = useState(!!initial.snow);
  const [family, setFamily] = useState(!!initial.family);
  const [green, setGreen] = useState(!!initial.green);
  const [firstTimer, setFirstTimer] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);

  // The mobile sheet closes on Escape and stops the page behind it scrolling.
  useEffect(() => {
    if (!panelOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setPanelOpen(false);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [panelOpen]);

  const allStates = useMemo(() => Array.from(new Set(treks.map((t) => t.state))).sort(), [treks]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const out = treks.filter((t) => {
      if (q && !`${t.name} ${t.state} ${t.region} ${t.basecamp}`.toLowerCase().includes(q)) return false;
      if (grades.length && !grades.includes(t.difficulty)) return false;
      if (states.length && !states.includes(t.state)) return false;
      if (months.length && !months.some((m) => t.seasons.includes(m))) return false;
      if (t.maxAltFt > maxAlt) return false;
      if (t.days > maxDays) return false;
      if (snow && !t.snow) return false;
      if (family && !t.familyFriendly) return false;
      if (green && !t.greenTrails) return false;
      if (firstTimer && !t.firstTimer) return false;
      return true;
    });
    const by: Record<Sort, (a: Trek, b: Trek) => number> = {
      altitude: (a, b) => a.maxAltFt - b.maxAltFt,
      price: (a, b) => a.price - b.price,
      duration: (a, b) => a.days - b.days,
      rating: (a, b) => b.rating - a.rating || b.reviews - a.reviews,
    };
    return out.sort(by[sort]);
  }, [treks, query, grades, states, months, maxAlt, maxDays, snow, family, green, firstTimer, sort]);

  const activeCount =
    grades.length + states.length + months.length +
    (maxAlt < ALT_MAX ? 1 : 0) + (maxDays < DAYS_MAX ? 1 : 0) +
    [snow, family, green, firstTimer].filter(Boolean).length;

  function clearAll() {
    setGrades([]); setStates([]); setMonths([]);
    setMaxAlt(ALT_MAX); setMaxDays(DAYS_MAX);
    setSnow(false); setFamily(false); setGreen(false); setFirstTimer(false);
    setQuery("");
  }

  const toggle = <T,>(list: T[], set: (v: T[]) => void, v: T) =>
    set(list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

  const lowAlt = results.length ? Math.min(...results.map((r) => r.maxAltFt)) : 0;
  const highAlt = results.length ? Math.max(...results.map((r) => r.maxAltFt)) : 0;
  const fromPrice = results.length ? Math.min(...results.map((r) => r.price)) : 0;

  /* Chips for the filters that are switched on, so they can be undone in place. */
  const chips: { label: string; clear: () => void }[] = [
    ...grades.map((g) => ({ label: g, clear: () => toggle(grades, setGrades, g) })),
    ...(maxAlt < ALT_MAX ? [{ label: `≤ ${maxAlt.toLocaleString("en-IN")} ft`, clear: () => setMaxAlt(ALT_MAX) }] : []),
    ...(maxDays < DAYS_MAX ? [{ label: `≤ ${maxDays} days`, clear: () => setMaxDays(DAYS_MAX) }] : []),
    ...months.map((m) => ({ label: m, clear: () => toggle(months, setMonths, m) })),
    ...states.map((s) => ({ label: s, clear: () => toggle(states, setStates, s) })),
    ...(firstTimer ? [{ label: "First trek", clear: () => setFirstTimer(false) }] : []),
    ...(snow ? [{ label: "Snow", clear: () => setSnow(false) }] : []),
    ...(family ? [{ label: "With children", clear: () => setFamily(false) }] : []),
    ...(green ? [{ label: "Green Trails", clear: () => setGreen(false) }] : []),
  ];

  const filters = (
    <div className="space-y-7">
      <FilterBlock title="Grade">
        <div className="flex flex-wrap gap-1.5">
          {DIFFICULTY_ORDER.map((d) => (
            <Toggle
              key={d}
              on={grades.includes(d)}
              onClick={() => toggle(grades, setGrades, d)}
              count={treks.filter((t) => t.difficulty === d).length}
            >
              {d}
            </Toggle>
          ))}
        </div>
      </FilterBlock>

      <FilterBlock
        title="Highest point"
        value={maxAlt < ALT_MAX ? `up to ${maxAlt.toLocaleString("en-IN")} ft` : "Any"}
      >
        <input
          type="range"
          min={ALT_MIN}
          max={ALT_MAX}
          step={250}
          value={maxAlt}
          onChange={(e) => setMaxAlt(Number(e.target.value))}
          aria-label="Maximum altitude in feet"
          aria-valuetext={`${maxAlt.toLocaleString("en-IN")} feet`}
        />
        <div className="mt-1.5 flex justify-between nums text-[12px] text-ink-400">
          <span>11,500 ft</span>
          <span>15,500 ft</span>
        </div>
      </FilterBlock>

      <FilterBlock title="Length" value={maxDays < DAYS_MAX ? `up to ${maxDays} days` : "Any"}>
        <input
          type="range"
          min={DAYS_MIN}
          max={DAYS_MAX}
          step={1}
          value={maxDays}
          onChange={(e) => setMaxDays(Number(e.target.value))}
          aria-label="Maximum number of days"
          aria-valuetext={`${maxDays} days`}
        />
        <div className="mt-1.5 flex justify-between nums text-[12px] text-ink-400">
          <span>4 days</span>
          <span>11 days</span>
        </div>
      </FilterBlock>

      <FilterBlock title="Month you can go">
        <div className="grid grid-cols-4 gap-1.5 rounded-[20px] bg-mist-100 p-1.5">
          {MONTHS.map((m) => {
            const on = months.includes(m);
            const available = treks.some((t) => t.seasons.includes(m));
            return (
              <button
                key={m}
                type="button"
                onClick={() => toggle(months, setMonths, m)}
                disabled={!available}
                aria-pressed={on}
                className={[
                  "nums rounded-full py-1.5 text-[13px] transition-colors",
                  on
                    ? "bg-ink-900 font-medium text-white shadow-sm"
                    : "text-ink-600 hover:bg-white disabled:opacity-30 disabled:hover:bg-transparent",
                ].join(" ")}
              >
                {m}
              </button>
            );
          })}
        </div>
      </FilterBlock>

      <FilterBlock title="Region">
        <div className="flex flex-wrap gap-1.5">
          {allStates.map((s) => (
            <Toggle
              key={s}
              on={states.includes(s)}
              onClick={() => toggle(states, setStates, s)}
              count={treks.filter((t) => t.state === s).length}
            >
              {s}
            </Toggle>
          ))}
        </div>
      </FilterBlock>

      <FilterBlock title="Suits">
        <div className="flex flex-wrap gap-1.5">
          <Toggle on={firstTimer} onClick={() => setFirstTimer(!firstTimer)} count={treks.filter((t) => t.firstTimer).length}>
            <Sparkles size={13} aria-hidden="true" /> A first Himalayan trek
          </Toggle>
          <Toggle on={snow} onClick={() => setSnow(!snow)} count={treks.filter((t) => t.snow).length}>
            <Snowflake size={13} aria-hidden="true" /> Walking on snow
          </Toggle>
          <Toggle on={family} onClick={() => setFamily(!family)} count={treks.filter((t) => t.familyFriendly).length}>
            <Users size={13} aria-hidden="true" /> Going with children
          </Toggle>
          <Toggle on={green} onClick={() => setGreen(!green)} count={treks.filter((t) => t.greenTrails).length}>
            <Leaf size={13} aria-hidden="true" /> Green Trails departures
          </Toggle>
        </div>
      </FilterBlock>
    </div>
  );

  return (
    <div>
      {/* ── Hero band ── */}
      <section className="relative isolate overflow-hidden rounded-bento bg-ink-900 text-white">
        <div className="absolute inset-0 -z-10">
          <Photo name="snowRanges" width={1800} priority />
          <div className="scrim-b absolute inset-0" />
        </div>
        <div className="flex min-h-[340px] flex-col justify-end gap-6 p-5 sm:min-h-[400px] sm:p-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[640px]">
            <Eyebrow onDark>All treks</Eyebrow>
            <h1 className="mt-3 font-display text-[clamp(2.2rem,5vw,3.8rem)] leading-[1.02]">
              Fifteen routes, sorted by how high they go
            </h1>
            <p className="mt-3 max-w-[48ch] text-[15.5px] leading-relaxed text-white/75 sm:text-[16.5px]">
              Grade says how hard. Altitude says what it will do to you. Months say when you can
              actually go.
            </p>
          </div>

          <div
            className="glass grid w-full grid-cols-[0.9fr_1.25fr_1fr] rounded-[22px] px-1 py-3.5 sm:w-auto sm:min-w-[420px]"
            aria-live="polite"
          >
            <HeroStat label="Matching" value={`${results.length}`} sub={`of ${treks.length}`} />
            <HeroStat
              label="Altitude"
              value={results.length ? `${(lowAlt / 1000).toFixed(1)}–${(highAlt / 1000).toFixed(1)}k` : "—"}
              sub="ft"
            />
            <HeroStat label="From" value={results.length ? inr(fromPrice) : "—"} />
          </div>
        </div>
      </section>

      <div className="mt-4 grid gap-4 lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-5">
        {/* Filters — a white panel on desktop, a sheet on mobile */}
        <aside className="hidden lg:block" aria-label="Trek filters">
          <div className="no-scrollbar sticky top-[100px] max-h-[calc(100vh-116px)] overflow-y-auto rounded-bento bg-white p-6 shadow-soft">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="inline-flex items-center gap-2 text-[17px] font-semibold tracking-[-0.02em]">
                <SlidersHorizontal size={16} aria-hidden="true" /> Narrow it down
              </h2>
              {activeCount > 0 && (
                <button
                  type="button"
                  onClick={clearAll}
                  className="rounded-full bg-ember-500/10 px-3 py-1 text-[12.5px] font-medium text-ember-600 transition-colors hover:bg-ember-500/20"
                >
                  Clear {activeCount}
                </button>
              )}
            </div>
            {filters}
          </div>
        </aside>

        <div className="min-w-0">
          {/* Toolbar */}
          <div className="flex flex-wrap items-center gap-2 rounded-bento bg-white p-2 shadow-soft">
            <label className="relative flex min-w-0 flex-[1_1_220px] items-center">
              <Search size={16} className="pointer-events-none absolute left-4 text-ink-400" aria-hidden="true" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search a trek, state or basecamp"
                aria-label="Search treks"
                type="search"
                className="w-full rounded-full bg-mist-100 py-2.5 pl-10 pr-4 text-[15px] outline-none transition-colors placeholder:text-ink-400 focus:bg-mist-200 focus-visible:rounded-full!"
              />
            </label>

            <button
              type="button"
              onClick={() => setPanelOpen(true)}
              className="inline-flex items-center gap-2 rounded-full bg-ink-900 px-4 py-2.5 text-[14px] font-medium text-white lg:hidden"
            >
              <SlidersHorizontal size={15} aria-hidden="true" />
              Filters
              {activeCount > 0 && (
                <span className="nums inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-ember-500 px-1.5 text-[11.5px]">
                  {activeCount}
                </span>
              )}
            </button>

            <div className="flex w-full items-center gap-2 sm:w-auto">
              <div
                role="group"
                aria-label="Sort by"
                className="no-scrollbar flex min-w-0 flex-1 items-center gap-0.5 overflow-x-auto rounded-full bg-mist-100 p-1"
              >
                {SORTS.map((s) => (
                  <button
                    key={s.key}
                    type="button"
                    onClick={() => setSort(s.key)}
                    aria-pressed={sort === s.key}
                    className={[
                      "flex-1 whitespace-nowrap rounded-full px-2 py-1.5 text-[12.5px] transition-all sm:px-3 sm:text-[13.5px]",
                      sort === s.key
                        ? "bg-white font-medium text-ink-900 shadow-[0_2px_8px_-2px_rgb(16_24_40/0.18)]"
                        : "text-ink-500 hover:text-ink-900",
                    ].join(" ")}
                  >
                    {s.label}
                  </button>
                ))}
              </div>

              <div role="group" aria-label="Layout" className="flex shrink-0 items-center gap-0.5 rounded-full bg-mist-100 p-1">
                {(
                  [
                    ["grid", "Grid", LayoutGrid],
                    ["list", "List", Rows3],
                  ] as const
                ).map(([key, label, Icon]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setView(key)}
                    aria-pressed={view === key}
                    aria-label={`${label} view`}
                    className={[
                      "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[13.5px] transition-all sm:px-3",
                      view === key
                        ? "bg-ink-900 font-medium text-white"
                        : "text-ink-500 hover:text-ink-900",
                    ].join(" ")}
                  >
                    <Icon size={15} aria-hidden="true" />
                    <span className="hidden sm:inline">{label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Result summary + active chips */}
          <div className="flex flex-wrap items-center gap-2 px-2 py-4">
            <p className="nums mr-1 text-[13.5px] text-ink-500" aria-live="polite">
              <span className="font-semibold text-ink-900">{results.length}</span> of {treks.length} treks
              {results.length > 0 && (
                <span className="hidden sm:inline">
                  {" · "}
                  {lowAlt.toLocaleString("en-IN")}–{highAlt.toLocaleString("en-IN")} ft · from {inr(fromPrice)}
                </span>
              )}
            </p>
            {chips.map((c) => (
              <button
                key={c.label}
                type="button"
                onClick={c.clear}
                aria-label={`Remove filter: ${c.label}`}
                className="nums inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-[12.5px] font-medium text-ink-700 shadow-soft transition-colors hover:bg-ink-900 hover:text-white"
              >
                {c.label} <X size={12} aria-hidden="true" />
              </button>
            ))}
            {chips.length > 1 && (
              <button
                type="button"
                onClick={clearAll}
                className="text-[12.5px] font-medium text-ember-600 hover:underline"
              >
                Clear all
              </button>
            )}
          </div>

          {results.length === 0 ? (
            <div className="flex flex-col items-center rounded-bento bg-white px-6 py-14 text-center shadow-soft sm:py-20">
              <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-ice-100 text-ice-500">
                <MountainSnow size={28} aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-[22px] font-semibold tracking-[-0.02em] text-ink-900">
                No trek sits inside those limits
              </h3>
              <p className="mx-auto mt-2.5 max-w-[44ch] text-[15px] leading-relaxed text-ink-500">
                The altitude ceiling and the month are the two that usually collide. Raise one of
                them and the list comes back.
              </p>
              <Button onClick={clearAll} variant="dark" className="mt-6">
                Clear all filters
              </Button>
            </div>
          ) : view === "list" ? (
            <div className="space-y-3">
              {results.map((t, i) => (
                <TrekRow key={t.slug} trek={t} index={i} />
              ))}
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3">
              {results.map((t, i) => (
                <TrekCard key={t.slug} trek={t} priority={i < 3} />
              ))}
            </div>
          )}
        </div>
      </div>

      {panelOpen && (
        <div
          className="fixed inset-0 z-[60] flex flex-col justify-end lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Trek filters"
        >
          <button
            type="button"
            className="absolute inset-0 bg-ink-950/50 backdrop-blur-[2px]"
            onClick={() => setPanelOpen(false)}
            aria-label="Close filters"
          />
          <div className="relative flex max-h-[88vh] flex-col rounded-t-bento bg-white shadow-soft">
            <div className="flex items-center justify-between px-6 pb-3 pt-5">
              <h2 className="text-[19px] font-semibold tracking-[-0.02em]">Narrow it down</h2>
              <button
                type="button"
                onClick={() => setPanelOpen(false)}
                aria-label="Close filters"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-mist-100"
              >
                <X size={18} />
              </button>
            </div>
            <div className="overflow-y-auto px-6 pb-4 pt-2">{filters}</div>
            <div className="flex gap-3 border-t border-mist-200 px-6 py-4">
              <Button onClick={clearAll} variant="outline" className="flex-1">
                Clear
              </Button>
              <Button onClick={() => setPanelOpen(false)} variant="dark" className="flex-1">
                Show {results.length}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function HeroStat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="min-w-0 border-l border-white/20 px-3 first:border-l-0 sm:px-5">
      <p className="truncate text-[11.5px] text-white/65">{label}</p>
      <p className="nums mt-1 truncate text-[16px] font-semibold leading-none tracking-[-0.02em] sm:text-[24px]">
        {value}
        {sub && <span className="ml-1 text-[12px] font-normal text-white/60">{sub}</span>}
      </p>
    </div>
  );
}

function FilterBlock({ title, value, children }: { title: string; value?: string; children: ReactNode }) {
  return (
    <div>
      <div className="mb-3 flex items-baseline justify-between gap-3">
        <h3 className="text-[13px] font-semibold text-ink-900">{title}</h3>
        {value && <span className="nums text-[12.5px] text-ink-500">{value}</span>}
      </div>
      {children}
    </div>
  );
}

function Toggle({
  on,
  onClick,
  count,
  children,
}: {
  on: boolean;
  onClick: () => void;
  count: number;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={on}
      disabled={!on && count === 0}
      className={[
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[13px] transition-colors disabled:cursor-not-allowed disabled:opacity-40",
        on
          ? "border-ink-900 bg-ink-900 text-white"
          : "border-mist-200 bg-white text-ink-700 enabled:hover:border-ink-900/40",
      ].join(" ")}
    >
      {children}
      <span className={`nums text-[11.5px] ${on ? "text-white/60" : "text-ink-400"}`}>{count}</span>
    </button>
  );
}

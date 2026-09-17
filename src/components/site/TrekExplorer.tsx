"use client";

import { useMemo, useState } from "react";
import { LayoutGrid, Rows3, SlidersHorizontal, X } from "lucide-react";
import { TrekRow, TrekCard } from "@/components/site/TrekViews";
import { Button } from "@/components/site/ui";
import {
  DIFFICULTY_ORDER,
  MONTHS,
  inr,
  type Difficulty,
  type Month,
  type Trek,
} from "@/lib/types";

type Sort = "altitude" | "price" | "duration" | "rating";

const SORTS: { key: Sort; label: string }[] = [
  { key: "altitude", label: "Altitude" },
  { key: "duration", label: "Duration" },
  { key: "price", label: "Price" },
  { key: "rating", label: "Rating" },
];

export function TrekExplorer({
  treks,
  initial,
}: {
  treks: Trek[];
  initial: { difficulty?: string; snow?: boolean; family?: boolean; green?: boolean };
}) {
  const [view, setView] = useState<"register" | "gallery">("register");
  const [sort, setSort] = useState<Sort>("altitude");
  const [query, setQuery] = useState("");
  const [months, setMonths] = useState<Month[]>([]);
  const [states, setStates] = useState<string[]>([]);
  const [grades, setGrades] = useState<Difficulty[]>(
    initial.difficulty && DIFFICULTY_ORDER.includes(initial.difficulty as Difficulty)
      ? [initial.difficulty as Difficulty]
      : []
  );
  const [maxAlt, setMaxAlt] = useState(15500);
  const [maxDays, setMaxDays] = useState(11);
  const [snow, setSnow] = useState(!!initial.snow);
  const [family, setFamily] = useState(!!initial.family);
  const [green, setGreen] = useState(!!initial.green);
  const [firstTimer, setFirstTimer] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);

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
    (maxAlt < 15500 ? 1 : 0) + (maxDays < 11 ? 1 : 0) +
    [snow, family, green, firstTimer].filter(Boolean).length;

  function clearAll() {
    setGrades([]); setStates([]); setMonths([]);
    setMaxAlt(15500); setMaxDays(11);
    setSnow(false); setFamily(false); setGreen(false); setFirstTimer(false);
    setQuery("");
  }

  const toggle = <T,>(list: T[], set: (v: T[]) => void, v: T) =>
    set(list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

  const filters = (
    <div className="space-y-8">
      <FilterBlock title="Grade">
        <div className="space-y-2">
          {DIFFICULTY_ORDER.map((d) => (
            <Check
              key={d}
              checked={grades.includes(d)}
              onChange={() => toggle(grades, setGrades, d)}
              label={d}
              count={treks.filter((t) => t.difficulty === d).length}
            />
          ))}
        </div>
      </FilterBlock>

      <FilterBlock title={`Highest point — up to ${maxAlt.toLocaleString("en-IN")} ft`}>
        <input
          type="range"
          min={11500}
          max={15500}
          step={250}
          value={maxAlt}
          onChange={(e) => setMaxAlt(Number(e.target.value))}
          aria-label="Maximum altitude in feet"
        />
        <div className="flex justify-between nums text-[12px] text-snow-500 mt-2">
          <span>11,500 ft</span>
          <span>15,500 ft</span>
        </div>
      </FilterBlock>

      <FilterBlock title={`Length — up to ${maxDays} days`}>
        <input
          type="range"
          min={4}
          max={11}
          step={1}
          value={maxDays}
          onChange={(e) => setMaxDays(Number(e.target.value))}
          aria-label="Maximum number of days"
        />
        <div className="flex justify-between nums text-[12px] text-snow-500 mt-2">
          <span>4 days</span>
          <span>11 days</span>
        </div>
      </FilterBlock>

      <FilterBlock title="Month you can go">
        <div className="grid grid-cols-4 gap-1.5">
          {MONTHS.map((m) => {
            const on = months.includes(m);
            const available = treks.some((t) => t.seasons.includes(m));
            return (
              <button
                key={m}
                onClick={() => toggle(months, setMonths, m)}
                disabled={!available}
                aria-pressed={on}
                className={[
                  "nums py-1.5 text-[13px] border transition-colors",
                  on
                    ? "bg-spruce-800 text-snow-50 border-spruce-800"
                    : "border-snow-300 hover:border-spruce-800 disabled:opacity-30",
                ].join(" ")}
              >
                {m}
              </button>
            );
          })}
        </div>
      </FilterBlock>

      <FilterBlock title="Region">
        <div className="space-y-2">
          {allStates.map((s) => (
            <Check
              key={s}
              checked={states.includes(s)}
              onChange={() => toggle(states, setStates, s)}
              label={s}
              count={treks.filter((t) => t.state === s).length}
            />
          ))}
        </div>
      </FilterBlock>

      <FilterBlock title="Suits">
        <div className="space-y-2">
          <Check checked={firstTimer} onChange={() => setFirstTimer(!firstTimer)} label="A first Himalayan trek" count={treks.filter((t) => t.firstTimer).length} />
          <Check checked={snow} onChange={() => setSnow(!snow)} label="Walking on snow" count={treks.filter((t) => t.snow).length} />
          <Check checked={family} onChange={() => setFamily(!family)} label="Going with children" count={treks.filter((t) => t.familyFriendly).length} />
          <Check checked={green} onChange={() => setGreen(!green)} label="Green Trails departures" count={treks.filter((t) => t.greenTrails).length} />
        </div>
      </FilterBlock>
    </div>
  );

  return (
    <div className="grid lg:grid-cols-[264px_minmax(0,1fr)] gap-x-12">
      {/* Filters — a column on desktop, a sheet on mobile */}
      <aside className="hidden lg:block">
        <div className="sticky top-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display-tight text-[19px]">Narrow it down</h2>
            {activeCount > 0 && (
              <button onClick={clearAll} className="text-[13px] text-rhodo-600 hover:underline">
                Clear {activeCount}
              </button>
            )}
          </div>
          {filters}
        </div>
      </aside>

      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-3 pb-5 border-b border-snow-300">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search a trek, state or basecamp"
            aria-label="Search treks"
            className="flex-1 min-w-[200px] border border-snow-300 bg-snow-50 px-3.5 py-2.5 text-[15px] placeholder:text-snow-400 focus:border-spruce-800 outline-none transition-colors"
          />

          <button
            onClick={() => setPanelOpen(true)}
            className="lg:hidden inline-flex items-center gap-2 border border-snow-300 px-3.5 py-2.5 text-[14px]"
          >
            <SlidersHorizontal size={15} />
            Filters{activeCount ? ` (${activeCount})` : ""}
          </button>

          <div className="flex items-center gap-1 border border-snow-300 p-1">
            {SORTS.map((s) => (
              <button
                key={s.key}
                onClick={() => setSort(s.key)}
                aria-pressed={sort === s.key}
                className={[
                  "px-2.5 py-1.5 text-[13.5px] transition-colors",
                  sort === s.key ? "bg-spruce-800 text-snow-50" : "hover:bg-snow-200",
                ].join(" ")}
              >
                {s.label}
              </button>
            ))}
          </div>

          <div className="flex border border-snow-300">
            <button
              onClick={() => setView("register")}
              aria-label="Register view"
              aria-pressed={view === "register"}
              className={`p-2.5 ${view === "register" ? "bg-spruce-800 text-snow-50" : "hover:bg-snow-200"}`}
            >
              <Rows3 size={16} />
            </button>
            <button
              onClick={() => setView("gallery")}
              aria-label="Gallery view"
              aria-pressed={view === "gallery"}
              className={`p-2.5 ${view === "gallery" ? "bg-spruce-800 text-snow-50" : "hover:bg-snow-200"}`}
            >
              <LayoutGrid size={16} />
            </button>
          </div>
        </div>

        <p className="nums text-[13.5px] text-snow-500 py-4">
          {results.length} of {treks.length} treks
          {results.length > 0 && (
            <>
              {" · "}
              {Math.min(...results.map((r) => r.maxAltFt)).toLocaleString("en-IN")}–
              {Math.max(...results.map((r) => r.maxAltFt)).toLocaleString("en-IN")} ft
              {" · from "}
              {inr(Math.min(...results.map((r) => r.price)))}
            </>
          )}
        </p>

        {results.length === 0 ? (
          <div className="border border-snow-300 bg-snow-50 p-12 text-center">
            <h3 className="font-display-tight text-[22px]">No trek sits inside those limits</h3>
            <p className="mt-2.5 text-[15px] text-spruce-800/65 max-w-[44ch] mx-auto leading-relaxed">
              The altitude ceiling and the month are the two that usually collide. Raise one of
              them and the list comes back.
            </p>
            <Button onClick={clearAll} variant="dark" className="mt-6">
              Clear all filters
            </Button>
          </div>
        ) : view === "register" ? (
          <div className="border-t border-snow-300">
            {results.map((t, i) => (
              <TrekRow key={t.slug} trek={t} index={i} />
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-x-7 gap-y-10 pt-2">
            {results.map((t) => (
              <TrekCard key={t.slug} trek={t} />
            ))}
          </div>
        )}
      </div>

      {panelOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <button
            className="flex-1 bg-spruce-900/50"
            onClick={() => setPanelOpen(false)}
            aria-label="Close filters"
          />
          <div className="w-[min(360px,88vw)] bg-snow-100 overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display-tight text-[20px]">Narrow it down</h2>
              <button onClick={() => setPanelOpen(false)} aria-label="Close filters" className="p-1">
                <X size={20} />
              </button>
            </div>
            {filters}
            <div className="sticky bottom-0 pt-5 pb-1 bg-snow-100 flex gap-3">
              <Button onClick={clearAll} variant="outline" className="flex-1">Clear</Button>
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

function FilterBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-[13.5px] font-semibold mb-3">{title}</h3>
      {children}
    </div>
  );
}

function Check({
  checked,
  onChange,
  label,
  count,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
  count: number;
}) {
  return (
    <label className="flex items-center gap-2.5 cursor-pointer group">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="appearance-none w-[15px] h-[15px] border border-snow-400 checked:bg-spruce-800 checked:border-spruce-800 shrink-0 relative after:content-[''] after:absolute after:left-[4px] after:top-[1px] after:w-[4px] after:h-[8px] after:border-r-2 after:border-b-2 after:border-snow-50 after:rotate-45 after:opacity-0 checked:after:opacity-100"
      />
      <span className="text-[14px] group-hover:text-deodar-600 transition-colors flex-1">{label}</span>
      <span className="nums text-[12px] text-snow-400">{count}</span>
    </label>
  );
}

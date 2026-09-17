"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Leaf } from "lucide-react";
import { DIFFICULTY_ORDER, type Departure, type Difficulty, type Trek } from "@/lib/types";

const DAYS = ["M", "T", "W", "T", "F", "S", "S"];

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
        if (greenOnly && !d.greenTrails) return false;
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
      const day = new Date(d.start).getUTCDate();
      m.set(day, [...(m.get(day) ?? []), d]);
    });
    return m;
  }, [inMonth]);

  const daysInMonth = new Date(
    Date.UTC(cursor.getUTCFullYear(), cursor.getUTCMonth() + 1, 0)
  ).getUTCDate();
  // Monday-first offset
  const startOffset = (new Date(Date.UTC(cursor.getUTCFullYear(), cursor.getUTCMonth(), 1)).getUTCDay() + 6) % 7;

  const shift = (n: number) =>
    setCursor((c) => new Date(Date.UTC(c.getUTCFullYear(), c.getUTCMonth() + n, 1)));

  const monthName = cursor.toLocaleDateString("en-IN", { month: "long", year: "numeric", timeZone: "UTC" });

  return (
    <div>
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3 pb-6 border-b border-snow-300">
        <div className="flex items-center gap-1">
          <button
            onClick={() => shift(-1)}
            className="p-2.5 border border-snow-300 hover:border-spruce-800 transition-colors"
            aria-label="Previous month"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => shift(1)}
            className="p-2.5 border border-snow-300 hover:border-spruce-800 transition-colors"
            aria-label="Next month"
          >
            <ChevronRight size={16} />
          </button>
        </div>
        <h2 className="font-display text-[26px] leading-none min-w-[210px]">{monthName}</h2>

        <div className="flex-1" />

        <select
          value={grade}
          onChange={(e) => setGrade(e.target.value as Difficulty | "all")}
          className="border border-snow-300 bg-snow-50 px-3 py-2.5 text-[14px]"
          aria-label="Filter by grade"
        >
          <option value="all">Any grade</option>
          {DIFFICULTY_ORDER.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>

        <select
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          className="border border-snow-300 bg-snow-50 px-3 py-2.5 text-[14px]"
          aria-label="Filter by region"
        >
          <option value="all">Any region</option>
          {regions.map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>

        <label className="flex items-center gap-2 text-[14px] cursor-pointer">
          <input type="checkbox" checked={onlyOpen} onChange={(e) => setOnlyOpen(e.target.checked)} />
          Open only
        </label>
        <label className="flex items-center gap-2 text-[14px] cursor-pointer">
          <input type="checkbox" checked={greenOnly} onChange={(e) => setGreenOnly(e.target.checked)} />
          Green Trails
        </label>
      </div>

      <p className="nums text-[13.5px] text-snow-500 py-4">
        {inMonth.length} departures in {monthName} · {filtered.length} across the next fourteen months
      </p>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-px bg-snow-300 border border-snow-300">
        {DAYS.map((d, i) => (
          <div key={i} className="bg-snow-100 px-2 py-2 text-[12px] text-snow-500 text-center">
            {d}
          </div>
        ))}
        {Array.from({ length: startOffset }).map((_, i) => (
          <div key={`pad${i}`} className="bg-snow-100/40 min-h-[104px]" />
        ))}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const list = byDay.get(day) ?? [];
          return (
            <div key={day} className="bg-snow-50 min-h-[104px] p-2">
              <span className={`nums text-[12px] ${list.length ? "text-spruce-800 font-semibold" : "text-snow-400"}`}>
                {day}
              </span>
              <div className="mt-1.5 space-y-1">
                {list.slice(0, 3).map((d) => {
                  const t = trekMap.get(d.trek)!;
                  const left = d.capacity - d.booked;
                  return (
                    <Link
                      key={d.id}
                      href={`/treks/${t.slug}/book?d=${d.id}`}
                      title={`${t.name} · ${left} slots left · led by ${d.leader}`}
                      className="block border-l-2 pl-1.5 py-0.5 text-[11.5px] leading-tight hover:bg-snow-200 transition-colors"
                      style={{
                        borderLeftColor:
                          left === 0 ? "#b23a48" : left <= 3 ? "#d4a22b" : "#2f6350",
                      }}
                    >
                      <span className="block truncate font-semibold">{t.name}</span>
                      <span className="nums text-snow-500 flex items-center gap-1">
                        {left === 0 ? "Full" : `${left} left`}
                        {d.greenTrails && <Leaf size={9} className="text-deodar-600" />}
                      </span>
                    </Link>
                  );
                })}
                {list.length > 3 && (
                  <span className="nums block text-[11px] text-snow-500 pl-1.5">
                    +{list.length - 3} more
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-6 mt-5 text-[13px] text-snow-500">
        {[
          ["#2f6350", "Slots open"],
          ["#d4a22b", "Three or fewer left"],
          ["#b23a48", "Full — waitlist only"],
        ].map(([c, l]) => (
          <span key={l} className="flex items-center gap-2">
            <span className="w-3 h-3 block" style={{ background: c }} />
            {l}
          </span>
        ))}
      </div>
    </div>
  );
}

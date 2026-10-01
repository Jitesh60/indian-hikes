"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search, Gauge, Snowflake, Users } from "lucide-react";
import { DIFFICULTY_ORDER } from "@/lib/types";

/** Airbnb-style finder that hands off to the trek explorer's URL filters. */
export function HeroFinder() {
  const router = useRouter();
  const [difficulty, setDifficulty] = useState("");
  const [season, setSeason] = useState("");
  const [group, setGroup] = useState("");

  function go(e: React.FormEvent) {
    e.preventDefault();
    const q = new URLSearchParams();
    if (difficulty) q.set("difficulty", difficulty);
    if (season === "snow") q.set("snow", "1");
    if (group === "family") q.set("family", "1");
    if (group === "green") q.set("green", "1");
    const s = q.toString();
    router.push(s ? `/treks?${s}` : "/treks");
  }

  const fieldCls =
    "w-full appearance-none bg-transparent text-[14.5px] font-medium text-ink-900 outline-none cursor-pointer";

  return (
    <form
      onSubmit={go}
      role="search"
      aria-label="Find a trek"
      className="grid w-full max-w-[640px] grid-cols-1 gap-1 rounded-[26px] bg-white p-2 text-left shadow-[0_24px_60px_-24px_rgb(16_40_30/0.35)] sm:grid-cols-[1fr_1fr_1fr_auto] sm:items-center sm:rounded-full"
    >
      <label className="flex items-center gap-3 rounded-full px-4 py-2 transition-colors hover:bg-mist-100 sm:px-4">
        <Gauge size={18} className="shrink-0 text-forest-500" aria-hidden="true" />
        <span className="min-w-0 flex-1">
          <span className="block text-[11.5px] uppercase tracking-[0.12em] text-ink-400">Grade</span>
          <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className={fieldCls}>
            <option value="">Any grade</option>
            {DIFFICULTY_ORDER.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </span>
      </label>
      <label className="flex items-center gap-3 rounded-full px-4 py-2 transition-colors hover:bg-mist-100 sm:border-l sm:border-mist-200 sm:px-4">
        <Snowflake size={18} className="shrink-0 text-forest-500" aria-hidden="true" />
        <span className="min-w-0 flex-1">
          <span className="block text-[11.5px] uppercase tracking-[0.12em] text-ink-400">Season</span>
          <select value={season} onChange={(e) => setSeason(e.target.value)} className={fieldCls}>
            <option value="">Any time</option>
            <option value="snow">Winter snow</option>
          </select>
        </span>
      </label>
      <label className="flex items-center gap-3 rounded-full px-4 py-2 transition-colors hover:bg-mist-100 sm:border-l sm:border-mist-200 sm:px-4">
        <Users size={18} className="shrink-0 text-forest-500" aria-hidden="true" />
        <span className="min-w-0 flex-1">
          <span className="block text-[11.5px] uppercase tracking-[0.12em] text-ink-400">Travelling</span>
          <select value={group} onChange={(e) => setGroup(e.target.value)} className={fieldCls}>
            <option value="">Anyone</option>
            <option value="family">With children</option>
            <option value="green">Women-only batch</option>
          </select>
        </span>
      </label>
      <button
        type="submit"
        aria-label="Search treks"
        className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-forest-500 px-6 text-[14.5px] font-medium text-white transition-colors hover:bg-forest-600 sm:w-12 sm:px-0"
      >
        <Search size={18} />
        <span className="sm:sr-only">Search treks</span>
      </button>
    </form>
  );
}

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
      className="grid w-full max-w-[860px] grid-cols-1 gap-1 rounded-[26px] bg-white p-2 text-left shadow-[0_30px_60px_-30px_rgb(0_0_0/0.6)] sm:grid-cols-[1fr_1fr_1fr_auto] sm:rounded-full"
    >
      <label className="flex items-center gap-3 rounded-full px-4 py-2.5 transition-colors hover:bg-mist-100 sm:px-5">
        <Gauge size={18} className="shrink-0 text-ember-500" aria-hidden="true" />
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
      <label className="flex items-center gap-3 rounded-full px-4 py-2.5 transition-colors hover:bg-mist-100 sm:border-l sm:border-mist-200 sm:px-5">
        <Snowflake size={18} className="shrink-0 text-ember-500" aria-hidden="true" />
        <span className="min-w-0 flex-1">
          <span className="block text-[11.5px] uppercase tracking-[0.12em] text-ink-400">Season</span>
          <select value={season} onChange={(e) => setSeason(e.target.value)} className={fieldCls}>
            <option value="">Any time</option>
            <option value="snow">Winter snow</option>
          </select>
        </span>
      </label>
      <label className="flex items-center gap-3 rounded-full px-4 py-2.5 transition-colors hover:bg-mist-100 sm:border-l sm:border-mist-200 sm:px-5">
        <Users size={18} className="shrink-0 text-ember-500" aria-hidden="true" />
        <span className="min-w-0 flex-1">
          <span className="block text-[11.5px] uppercase tracking-[0.12em] text-ink-400">Travelling</span>
          <select value={group} onChange={(e) => setGroup(e.target.value)} className={fieldCls}>
            <option value="">Anyone</option>
            <option value="family">With children</option>
            <option value="green">Green Trails group</option>
          </select>
        </span>
      </label>
      <button
        type="submit"
        className="inline-flex items-center justify-center gap-2 rounded-full bg-ink-900 px-6 py-3.5 text-[14.5px] font-medium text-white transition-colors hover:bg-ink-700"
      >
        <Search size={17} /> Search treks
      </button>
    </form>
  );
}

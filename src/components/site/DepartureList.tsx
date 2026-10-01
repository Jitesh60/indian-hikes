"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, CalendarX2, Leaf, UserRound } from "lucide-react";
import type { Departure } from "@/lib/types";

const MONTH_LABEL = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IN", { month: "long", year: "numeric" });

const fmt = (iso: string, o: Intl.DateTimeFormatOptions) => new Date(iso).toLocaleDateString("en-IN", o);

function status(left: number, pct: number) {
  if (left === 0) return { label: "Full", cls: "bg-ink-900 text-white" };
  if (left <= 3) return { label: `Last ${left}`, cls: "bg-ember-500/12 text-ember-600" };
  if (pct >= 60) return { label: "Filling fast", cls: "bg-sun-400/35 text-ink-800" };
  return { label: "Open", cls: "bg-pine-500/12 text-pine-600" };
}

export function DepartureList({
  departures,
  slug,
  price,
}: {
  departures: Departure[];
  slug: string;
  price: number;
}) {
  const months = Array.from(new Set(departures.map((d) => MONTH_LABEL(d.start))));
  const [month, setMonth] = useState(months[0]);
  const shown = departures.filter((d) => MONTH_LABEL(d.start) === month);

  if (!departures.length) {
    return (
      <div className="flex flex-col items-start gap-4 rounded-[22px] bg-mist-100 p-6 sm:flex-row sm:items-center sm:p-8">
        <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-ink-700">
          <CalendarX2 size={20} aria-hidden="true" />
        </span>
        <div>
          <h3 className="text-[18px] font-semibold tracking-[-0.02em] text-ink-900">This season has closed</h3>
          <p className="mt-1.5 max-w-[60ch] text-[14.5px] leading-relaxed text-ink-500">
            Dates for the next window open about five months ahead. Leave your email on the
            trek page and we will write when they do.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div
        role="group"
        aria-label="Departure month"
        className="no-scrollbar mb-5 flex w-full gap-1 overflow-x-auto rounded-full bg-mist-100 p-1 sm:w-fit"
      >
        {months.map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMonth(m)}
            aria-pressed={m === month}
            className={[
              "shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-[13.5px] transition-all",
              m === month
                ? "bg-ink-900 font-medium text-white"
                : "text-ink-500 hover:bg-white hover:text-ink-900",
            ].join(" ")}
          >
            {m}
          </button>
        ))}
      </div>

      <ul className="space-y-2.5">
        {shown.map((d) => {
          const left = d.capacity - d.booked;
          const pct = Math.round((d.booked / d.capacity) * 100);
          const st = status(left, pct);
          return (
            <li
              key={d.id}
              className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-3 rounded-[22px] border border-mist-200 bg-mist-50 p-4 sm:p-3 sm:pr-4 transition-colors hover:border-mist-300 hover:bg-white sm:grid-cols-[auto_1.3fr_1fr_auto] sm:gap-x-6"
            >
              {/* Date tile */}
              <div className="hidden h-14 w-14 flex-col items-center justify-center rounded-2xl bg-white text-center shadow-soft sm:flex">
                <span className="nums text-[20px] font-semibold leading-none tracking-[-0.02em] text-ink-900">
                  {fmt(d.start, { day: "numeric" })}
                </span>
                <span className="mt-0.5 text-[11px] uppercase tracking-[0.08em] text-ink-400">
                  {fmt(d.start, { month: "short" })}
                </span>
              </div>

              <div className="min-w-0">
                <p className="nums whitespace-nowrap text-[16px] font-semibold tracking-[-0.01em] text-ink-900">
                  {fmt(d.start, { day: "numeric", month: "short" })}
                  {" – "}
                  {fmt(d.end, { day: "numeric", month: "short" })}
                </p>
                <p className="mt-1 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[12.5px] text-ink-500">
                  <span className="inline-flex items-center gap-1">
                    <UserRound size={12} aria-hidden="true" /> Led by {d.leader}
                  </span>
                  {d.greenTrails && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-pine-500/12 px-2 py-0.5 font-medium text-pine-600">
                      <Leaf size={11} aria-hidden="true" /> Green Trails
                    </span>
                  )}
                </p>
              </div>

              <div className="col-span-2 w-full sm:col-span-1 sm:max-w-[220px]">
                <div className="flex items-center justify-between gap-3">
                  <span className={`rounded-full px-2.5 py-1 text-[11.5px] font-medium leading-none ${st.cls}`}>
                    {st.label}
                  </span>
                  <span className={`nums text-[12.5px] ${left <= 3 ? "text-ember-600" : "text-ink-500"}`}>
                    {left === 0 ? "Join the waitlist" : `${left} of ${d.capacity} open`}
                  </span>
                </div>
                <div
                  className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-mist-200"
                  role="progressbar"
                  aria-label="Slots booked"
                  aria-valuemin={0}
                  aria-valuemax={d.capacity}
                  aria-valuenow={d.booked}
                >
                  <div
                    className={`h-full rounded-full ${pct >= 85 ? "bg-ember-500" : "bg-ink-900"}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>

              <div className="col-start-2 row-start-1 justify-self-end sm:col-auto sm:row-auto">
                {left === 0 ? (
                  <Link
                    href={`/treks/${slug}/book?d=${d.id}&waitlist=1`}
                    className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-ink-900/15 bg-white px-4 py-2.5 text-[14px] font-medium text-ink-900 transition-colors hover:border-ink-900"
                  >
                    Waitlist
                  </Link>
                ) : (
                  <Link
                    href={`/treks/${slug}/book?d=${d.id}`}
                    className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-ember-500 px-4 py-2.5 text-[14px] font-medium text-white shadow-[0_8px_20px_-8px_rgb(255_106_43/0.6)] transition-colors hover:bg-ember-600"
                  >
                    Book
                    <span className="nums hidden sm:inline">· ₹{price.toLocaleString("en-IN")}</span>
                    <ArrowUpRight size={15} aria-hidden="true" />
                  </Link>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { Leaf } from "lucide-react";
import type { Departure } from "@/lib/types";

const MONTH_LABEL = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IN", { month: "long", year: "numeric" });

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
      <div className="border border-snow-300 bg-snow-50 p-8">
        <h3 className="font-display-tight text-[20px]">This season has closed</h3>
        <p className="mt-2 text-[15px] text-spruce-800/65 leading-relaxed measure">
          Dates for the next window open about five months ahead. Leave your email on the
          trek page and we will write when they do.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex gap-1.5 overflow-x-auto thin-scroll pb-2 mb-5">
        {months.map((m) => (
          <button
            key={m}
            onClick={() => setMonth(m)}
            aria-pressed={m === month}
            className={[
              "px-3.5 py-2 text-[13.5px] whitespace-nowrap border transition-colors",
              m === month
                ? "bg-spruce-800 text-snow-50 border-spruce-800"
                : "border-snow-300 hover:border-spruce-800",
            ].join(" ")}
          >
            {m}
          </button>
        ))}
      </div>

      <div className="border-t border-snow-300">
        {shown.map((d) => {
          const left = d.capacity - d.booked;
          const pct = Math.round((d.booked / d.capacity) * 100);
          return (
            <div
              key={d.id}
              className="grid grid-cols-[1fr_auto] sm:grid-cols-[1.4fr_1fr_auto] items-center gap-x-6 gap-y-3 py-4 border-b border-snow-300"
            >
              <div>
                <p className="nums text-[16.5px] font-semibold">
                  {new Date(d.start).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                  {" – "}
                  {new Date(d.end).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                </p>
                <p className="text-[13px] text-snow-500 mt-0.5 flex items-center gap-2 flex-wrap">
                  <span>Led by {d.leader}</span>
                  {d.greenTrails && (
                    <span className="inline-flex items-center gap-1 text-deodar-600">
                      <Leaf size={11} /> Green Trails
                    </span>
                  )}
                </p>
              </div>

              <div className="col-span-2 sm:col-span-1 sm:max-w-[190px] w-full">
                <div className="h-1.5 bg-snow-300 w-full" aria-hidden="true">
                  <div
                    className={pct >= 85 ? "h-full bg-rhodo-600" : "h-full bg-deodar-500"}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <p className={`nums text-[12.5px] mt-1.5 ${left <= 3 ? "text-rhodo-600" : "text-snow-500"}`}>
                  {left === 0
                    ? "Full — join the waitlist"
                    : `${left} of ${d.capacity} slots open`}
                </p>
              </div>

              <div className="row-start-1 col-start-2 sm:row-auto sm:col-auto justify-self-end">
                {left === 0 ? (
                  <Link
                    href={`/treks/${slug}/book?d=${d.id}&waitlist=1`}
                    className="inline-block border border-snow-300 px-4 py-2.5 text-[14px] font-semibold hover:border-spruce-800 transition-colors"
                  >
                    Waitlist
                  </Link>
                ) : (
                  <Link
                    href={`/treks/${slug}/book?d=${d.id}`}
                    className="inline-block bg-bugyal-500 text-spruce-900 px-4 py-2.5 text-[14px] font-semibold hover:bg-bugyal-400 transition-colors"
                  >
                    Book · ₹{price.toLocaleString("en-IN")}
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

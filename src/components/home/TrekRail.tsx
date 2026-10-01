"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { TrekCard } from "@/components/site/TrekViews";
import type { Trek } from "@/lib/types";

const BANDS = [
  { key: "all", label: "All heights", lo: 0, hi: 99999 },
  { key: "low", label: "Below 12,000 ft", lo: 0, hi: 11999 },
  { key: "mid", label: "12,000 – 13,500 ft", lo: 12000, hi: 13499 },
  { key: "high", label: "13,500 – 15,000 ft", lo: 13500, hi: 14999 },
  { key: "top", label: "Above 15,000 ft", lo: 15000, hi: 99999 },
];

/** Altitude-band pills over a swipeable rail of trek cards. */
export function TrekRail({ treks }: { treks: Trek[] }) {
  const [band, setBand] = useState("all");
  const b = BANDS.find((x) => x.key === band)!;
  const list = treks
    .filter((t) => t.maxAltFt >= b.lo && t.maxAltFt <= b.hi)
    .sort((x, y) => x.maxAltFt - y.maxAltFt);

  const [ref, api] = useEmblaCarousel({ align: "start", containScroll: "trimSnaps", dragFree: true });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const sync = useCallback(() => {
    if (!api) return;
    setCanPrev(api.canScrollPrev());
    setCanNext(api.canScrollNext());
  }, [api]);

  useEffect(() => {
    if (!api) return;
    // Listen first: reInit() emits "reInit", which syncs the arrow state.
    api.on("select", sync).on("reInit", sync).on("scroll", sync);
    api.reInit();
    api.scrollTo(0, true);
    return () => {
      api.off("select", sync).off("reInit", sync).off("scroll", sync);
    };
  }, [api, sync, band]);

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div
          role="tablist"
          aria-label="Filter by maximum altitude"
          className="no-scrollbar -mx-1 flex max-w-full gap-1 overflow-x-auto rounded-full bg-white p-1 shadow-soft"
        >
          {BANDS.map((x) => (
            <button
              key={x.key}
              role="tab"
              aria-selected={band === x.key}
              onClick={() => setBand(x.key)}
              className={`nums shrink-0 rounded-full px-4 py-2 text-[13.5px] transition-colors ${
                band === x.key ? "bg-ink-900 font-medium text-white" : "text-ink-500 hover:bg-mist-100 hover:text-ink-900"
              }`}
            >
              {x.label}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => api?.scrollPrev()}
            disabled={!canPrev}
            aria-label="Previous treks"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink-900/15 bg-white transition-colors hover:border-ink-900 disabled:opacity-30"
          >
            <ArrowLeft size={18} />
          </button>
          <button
            onClick={() => api?.scrollNext()}
            disabled={!canNext}
            aria-label="Next treks"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-ink-900 text-white transition-colors hover:bg-ink-700 disabled:opacity-30"
          >
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      <div ref={ref} className="-mx-3 overflow-hidden px-3 py-2">
        <div className="flex gap-4">
          {list.map((t) => (
            <div key={t.slug} className="min-w-0 shrink-0 basis-[84%] sm:basis-[46%] lg:basis-[31.5%] xl:basis-[24%]">
              <TrekCard trek={t} />
            </div>
          ))}
        </div>
      </div>
      <p className="nums mt-4 text-[13px] text-ink-400" aria-live="polite">
        {list.length} {list.length === 1 ? "trek" : "treks"} · drag or use the arrows
      </p>
    </div>
  );
}

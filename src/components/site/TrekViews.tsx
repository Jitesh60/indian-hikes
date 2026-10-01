import Link from "next/link";
import { ArrowUpRight, Venus, Snowflake, Users, Mountain, CalendarDays } from "lucide-react";
import { AltitudeSpark } from "@/components/viz/AltitudeProfile";
import { Photo } from "@/components/site/Photo";
import { DifficultyMeter, Pill, Stars } from "@/components/site/ui";
import { trekCover } from "@/data/photos";
import { inr, type Trek } from "@/lib/types";

/**
 * List view: one trek per row with a thumbnail and the numbers that
 * matter for choosing — altitude, difficulty, days, price.
 */
export function TrekRow({ trek, index }: { trek: Trek; index: number }) {
  return (
    <Link
      href={`/treks/${trek.slug}`}
      className="group grid grid-cols-[88px_1fr] items-center gap-x-5 gap-y-3 rounded-[22px] bg-white p-3 pr-5 shadow-soft transition-shadow hover:shadow-[0_20px_40px_-20px_rgb(16_24_40/0.25)] md:grid-cols-[120px_1.7fr_150px_170px_auto]"
    >
      <div className="relative row-span-2 aspect-square overflow-hidden rounded-2xl md:row-span-1">
        <Photo name={trekCover(trek.slug)} width={400} alt="" imgClassName="transition-transform duration-700 group-hover:scale-105" />
        <span className="glass absolute left-1.5 top-1.5 rounded-full px-2 py-0.5 text-[11px] text-white nums">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div className="min-w-0">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 className="text-[19px] font-semibold leading-tight tracking-[-0.02em] text-ink-900">
            {trek.name}
          </h3>
          <span className="text-[13px] text-ink-400">{trek.state}</span>
        </div>
        <p className="mt-1 max-w-[52ch] text-[14px] leading-snug text-ink-500">{trek.tagline}</p>
        <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
          {trek.womenOnly && (
            <Pill tone="green">
              <Venus size={11} /> Women-only batches
            </Pill>
          )}
          {trek.snow && (
            <Pill tone="ice">
              <Snowflake size={11} /> Snow
            </Pill>
          )}
          {trek.familyFriendly && (
            <Pill tone="neutral">
              <Users size={11} /> Families
            </Pill>
          )}
        </div>
      </div>

      <div className="col-start-2 text-ink-700 md:col-start-3">
        <AltitudeSpark profile={trek.profile} />
        <p className="nums mt-0.5 text-[12.5px] text-ink-400">
          {trek.maxAltFt.toLocaleString("en-IN")} ft · {trek.trailKm} km
        </p>
      </div>

      <div className="col-start-2 md:col-start-4">
        <DifficultyMeter difficulty={trek.difficulty} />
        <p className="nums mt-1.5 text-[12.5px] text-ink-400">
          {trek.days} days · {trek.seasons.slice(0, 4).join(" ")}
          {trek.seasons.length > 4 ? "…" : ""}
        </p>
      </div>

      <div className="col-start-2 flex items-center justify-between gap-4 md:col-start-5 md:block md:text-right">
        <p className="nums text-[18px] font-semibold text-ink-900">{inr(trek.price)}</p>
        <div className="md:mt-1">
          <Stars rating={trek.rating} />
        </div>
      </div>
    </Link>
  );
}

/**
 * Photo card: image on top with glass chips over it, details below.
 * Modelled on a booking-app tile — the photo sells it, the numbers close it.
 */
export function TrekCard({ trek, priority = false }: { trek: Trek; priority?: boolean }) {
  return (
    <Link
      href={`/treks/${trek.slug}`}
      className="group flex h-full flex-col rounded-bento bg-white p-2.5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_50px_-24px_rgb(16_24_40/0.35)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-[20px]">
        <Photo
          name={trekCover(trek.slug)}
          width={900}
          priority={priority}
          imgClassName="transition-transform duration-700 group-hover:scale-[1.06]"
        />
        <div className="absolute inset-x-2.5 top-2.5 flex items-start justify-between gap-2">
          <span className="glass-dark nums inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[12px] text-white">
            <Mountain size={12} /> {trek.maxAltFt.toLocaleString("en-IN")} ft
          </span>
          {trek.womenOnly && (
            <span className="glass inline-flex h-7 w-7 items-center justify-center rounded-full text-white" title="Women-only batches">
              <Venus size={13} />
              <span className="sr-only">Women-only batches available</span>
            </span>
          )}
        </div>
        <span className="glass-dark nums absolute bottom-2.5 right-2.5 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[12px] text-white">
          <CalendarDays size={12} /> {trek.days} days
        </span>
      </div>

      <div className="flex flex-1 flex-col px-2.5 pb-2 pt-4">
        <div className="flex items-center justify-between gap-3">
          <Stars rating={trek.rating} reviews={trek.reviews} />
          <span className="text-[12.5px] text-ink-400">{trek.state}</span>
        </div>
        <h3 className="mt-2 text-[20px] font-semibold leading-tight tracking-[-0.02em] text-ink-900">
          {trek.name}
        </h3>
        <p className="mt-1.5 line-clamp-2 text-[14px] leading-snug text-ink-500">{trek.tagline}</p>
        <div className="mt-auto flex items-end justify-between gap-3 pt-5">
          <div>
            <DifficultyMeter difficulty={trek.difficulty} />
            <p className="mt-2 text-[13px] text-ink-400">
              <span className="nums text-[17px] font-semibold text-ink-900">{inr(trek.price)}</span> / person
            </p>
          </div>
          <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink-900/10 text-ink-900 transition-colors group-hover:border-ink-900 group-hover:bg-ink-900 group-hover:text-white">
            <ArrowUpRight size={17} />
            <span className="sr-only">View {trek.name}</span>
          </span>
        </div>
      </div>
    </Link>
  );
}

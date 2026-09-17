import Link from "next/link";
import { Leaf, Snowflake, Users } from "lucide-react";
import { AltitudeSpark } from "@/components/viz/AltitudeProfile";
import { RidgeArt } from "@/components/viz/RidgeArt";
import { DifficultyMeter, Pill } from "@/components/site/ui";
import { inr, type Trek } from "@/lib/types";

/**
 * Register view: one trek per row, the way a field ledger would list them.
 * Deliberately not a grid of identical cards.
 */
export function TrekRow({ trek, index }: { trek: Trek; index: number }) {
  return (
    <Link
      href={`/treks/${trek.slug}`}
      className="group grid grid-cols-[auto_1fr] md:grid-cols-[52px_1.7fr_150px_170px_auto] items-center gap-x-5 gap-y-3 py-5 border-b border-snow-300 hover:bg-snow-50 transition-colors -mx-3 px-3"
    >
      <span className="nums text-[13px] text-snow-400 self-start md:self-center pt-1 md:pt-0">
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="min-w-0">
        <div className="flex items-baseline gap-3 flex-wrap">
          <h3 className="font-display-tight text-[21px] leading-tight group-hover:text-deodar-600 transition-colors">
            {trek.name}
          </h3>
          <span className="text-[13px] text-snow-500">{trek.state}</span>
        </div>
        <p className="mt-1 text-[14.5px] text-spruce-800/65 leading-snug measure">{trek.tagline}</p>
        <div className="mt-2.5 flex flex-wrap items-center gap-2">
          {trek.greenTrails && (
            <Pill tone="green">
              <Leaf size={11} className="inline -mt-px mr-1" />
              Green Trails
            </Pill>
          )}
          {trek.snow && (
            <Pill tone="ice">
              <Snowflake size={11} className="inline -mt-px mr-1" />
              Snow
            </Pill>
          )}
          {trek.familyFriendly && (
            <Pill tone="neutral">
              <Users size={11} className="inline -mt-px mr-1" />
              Families
            </Pill>
          )}
        </div>
      </div>

      <div className="col-start-2 md:col-start-3 text-spruce-800/70">
        <AltitudeSpark profile={trek.profile} />
        <p className="nums text-[12.5px] text-snow-500 mt-0.5">
          {trek.maxAltFt.toLocaleString("en-IN")} ft · {trek.trailKm} km
        </p>
      </div>

      <div className="col-start-2 md:col-start-4">
        <DifficultyMeter difficulty={trek.difficulty} />
        <p className="nums text-[12.5px] text-snow-500 mt-1.5">
          {trek.days} days · {trek.seasons.slice(0, 4).join(" ")}
          {trek.seasons.length > 4 ? "…" : ""}
        </p>
      </div>

      <div className="col-start-2 md:col-start-5 md:text-right">
        <p className="nums text-[17px] font-semibold">{inr(trek.price)}</p>
        <p className="nums text-[12.5px] text-snow-500 mt-0.5">
          ★ {trek.rating} · {trek.reviews.toLocaleString("en-IN")}
        </p>
      </div>
    </Link>
  );
}

/** Gallery view: used when someone wants to browse by feel rather than by data. */
export function TrekCard({ trek }: { trek: Trek }) {
  return (
    <Link href={`/treks/${trek.slug}`} className="group block">
      <div className="relative overflow-hidden aspect-[4/3] bg-spruce-800">
        <RidgeArt
          seed={trek.slug}
          tone={trek.snow ? "cool" : "warm"}
          className="absolute inset-0 w-full h-full transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <div className="absolute left-0 top-0 bg-spruce-900/85 text-snow-50 px-3 py-1.5 nums text-[12.5px]">
          {trek.maxAltFt.toLocaleString("en-IN")} ft
        </div>
        {trek.greenTrails && (
          <div className="absolute right-0 top-0 bg-deodar-600 text-snow-50 px-2.5 py-1.5">
            <Leaf size={13} />
          </div>
        )}
      </div>
      <div className="pt-3.5">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-display-tight text-[20px] leading-tight group-hover:text-deodar-600 transition-colors">
            {trek.name}
          </h3>
          <span className="nums text-[15px] font-semibold whitespace-nowrap">{inr(trek.price)}</span>
        </div>
        <p className="mt-1 text-[14px] text-spruce-800/65 leading-snug">{trek.tagline}</p>
        <div className="mt-3 flex items-center justify-between gap-3 text-[13px]">
          <DifficultyMeter difficulty={trek.difficulty} />
          <span className="nums text-snow-500">{trek.days} days</span>
        </div>
      </div>
    </Link>
  );
}

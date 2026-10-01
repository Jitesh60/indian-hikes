"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import {
  ArrowUpRight, Check, Download, Leaf, Mountain, Route, CalendarDays, Gauge, Upload, Heart, FileText,
} from "lucide-react";
import { AltitudeProfile } from "@/components/viz/AltitudeProfile";
import { Photo } from "@/components/site/Photo";
import { Avatar, Button, DifficultyMeter, Pill } from "@/components/site/ui";
import { trekCover } from "@/data/photos";
import { daysUntil, inr, type Trek, type Departure } from "@/lib/types";

const RUNS: [string, number, string][] = [
  ["12 Sep", 5.0, "8:24"],
  ["9 Sep", 5.2, "8:38"],
  ["6 Sep", 4.4, "8:51"],
  ["3 Sep", 5.0, "9:02"],
  ["31 Aug", 4.0, "9:16"],
  ["28 Aug", 3.6, "9:40"],
];

const UPLOADS: [string, string, boolean][] = [
  ["Photo ID", "Verified 2 Sep", true],
  ["Medical declaration", "Signed 4 Sep", true],
  ["Fitness record", "Not uploaded", false],
  ["Insurance certificate", "Not uploaded", false],
];

const DOWNLOADS = ["Kit list", "Route map and campsite notes", "Cancellation policy", "Trek invoice"];

function fmt(iso: string, opts: Intl.DateTimeFormatOptions) {
  return new Date(iso).toLocaleDateString("en-IN", { ...opts, timeZone: "UTC" });
}

/** Pace "m:ss" to seconds — used only to scale the run bars. */
function paceSecs(p: string) {
  const [m, s] = p.split(":").map(Number);
  return m * 60 + s;
}

export function AccountDashboard({
  email,
  name,
  booked,
  saved,
  past,
}: {
  email: string;
  name: string;
  booked: { trek: Trek; departure: Departure }[];
  saved: Trek[];
  past: { trek: Trek; date: string; summited: boolean }[];
}) {
  const next = booked[0];
  // Measured from the dataset's fixed reference date, not the live clock, so
  // the server and the browser always render the same number.
  const daysTo = next ? daysUntil(next.departure.start) : 0;

  const [checklist, setChecklist] = useState<Record<string, boolean>>({
    "Pay the balance": false,
    "Upload photo ID": true,
    "Submit the medical form": true,
    "Book your train or flight": false,
    "Hit the fitness target": false,
    "Collect rented gear": false,
  });
  const doneCount = Object.values(checklist).filter(Boolean).length;
  const totalCount = Object.keys(checklist).length;

  const summits = past.filter((p) => p.summited);
  const highest = summits.length ? Math.max(...summits.map((p) => p.trek.maxAltFt)) : 0;

  // Faster pace = taller bar; scaled between the slowest and fastest run.
  const paces = RUNS.map((r) => paceSecs(r[2]));
  const slow = Math.max(...paces);
  const fast = Math.min(...paces);

  return (
    <div className="grid gap-3 sm:gap-5 md:grid-cols-2 lg:grid-cols-12">
      {/* Greeting */}
      <Card className="flex flex-col justify-between gap-8 lg:col-span-4">
        <div>
          <div className="flex items-center gap-3">
            <Avatar name={name} size={44} tone="ink" />
            <div className="min-w-0">
              <p className="text-[13px] text-ink-400">Signed in as</p>
              <p className="truncate text-[14px] text-ink-700">{email}</p>
            </div>
          </div>
          <h1 className="mt-7 font-display text-[clamp(2rem,4vw,2.8rem)] leading-[1.02] text-ink-900">
            Hello, {name}.
            <span className="block text-ink-400">Your treks.</span>
          </h1>
        </div>
        <dl className="grid grid-cols-3 gap-2">
          <Stat label="Booked" value={String(booked.length)} />
          <Stat label="Summits" value={String(summits.length)} />
          <Stat label="Highest" value={highest ? `${(highest / 1000).toFixed(1)}k` : "—"} unit="ft" />
        </dl>
      </Card>

      {/* Next trek — the one thing this page is really for */}
      {next && (
        <section
          aria-label="Your next trek"
          className="relative min-h-[460px] overflow-hidden rounded-bento bg-ink-900 text-white md:order-first md:col-span-2 lg:order-none lg:col-span-8 lg:row-span-2 lg:min-h-[560px]"
        >
          <Photo name={trekCover(next.trek.slug)} width={1600} priority alt="" />
          <div className="scrim-b absolute inset-0" aria-hidden="true" />
          <div className="scrim-t absolute inset-0" aria-hidden="true" />

          <div className="relative flex h-full min-h-[inherit] flex-col justify-between gap-10 p-5 sm:p-7">
            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                <Pill tone="glass">Next trek</Pill>
                <Pill tone="glass">
                  <Check size={12} /> Confirmed
                </Pill>
                {next.departure.greenTrails && (
                  <Pill tone="glass">
                    <Leaf size={12} /> Green Trails
                  </Pill>
                )}
              </div>
              <div className="glass shrink-0 rounded-[20px] px-4 py-3 text-right sm:px-5 sm:py-4">
                <p className="nums text-[clamp(2.2rem,5vw,3.4rem)] font-semibold leading-none tracking-[-0.04em]">
                  {daysTo > 0 ? daysTo : 0}
                </p>
                <p className="mt-1 text-[12.5px] text-white/75">{daysTo > 0 ? "days to go" : "Leaving now"}</p>
              </div>
            </div>

            <div>
              <h2 className="font-display text-[clamp(2.2rem,5.5vw,4rem)] leading-[0.98]">{next.trek.name}</h2>
              <p className="nums mt-3 text-[14.5px] text-white/75 sm:text-[15.5px]">
                {fmt(next.departure.start, { day: "numeric", month: "long", year: "numeric" })}
                {" – "}
                {fmt(next.departure.end, { day: "numeric", month: "long" })}
                {" · led by "}
                {next.departure.leader}
              </p>

              <dl className="glass mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-[20px] sm:grid-cols-4">
                <GlassStat icon={CalendarDays} label="Days to go" value={String(Math.max(daysTo, 0))} />
                <GlassStat icon={Mountain} label="Max altitude" value={next.trek.maxAltFt.toLocaleString("en-IN")} unit="ft" />
                <GlassStat icon={Route} label="Distance" value={String(next.trek.trailKm)} unit="km" />
                <GlassStat icon={Gauge} label="Duration" value={String(next.trek.days)} unit="days" />
              </dl>

              <div className="mt-5 flex flex-wrap gap-2.5">
                <Button href={`/treks/${next.trek.slug}`} variant="light">
                  Open the trek page <ArrowUpRight size={16} />
                </Button>
                <Button variant="glass">
                  <Download size={16} /> Kit list
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Fitness */}
      {next && (
        <section
          aria-labelledby="fitness-title"
          className="flex flex-col rounded-bento bg-ink-900 p-6 text-white on-dark lg:col-span-4"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p id="fitness-title" className="text-[13px] text-white/55">Fitness target</p>
              <p className="nums mt-1.5 text-[22px] font-semibold leading-tight tracking-[-0.02em]">
                {next.trek.fitnessTarget}
              </p>
            </div>
            <span className="nums inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-ember-500 text-[15px] font-semibold">
              82%
            </span>
          </div>

          <div className="mt-5">
            <div className="flex justify-between text-[12.5px] text-white/55">
              <span>Current best</span>
              <span className="nums text-white">5 km · 42:00</span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10" aria-hidden="true">
              <div className="h-full rounded-full bg-ember-500" style={{ width: "82%" }} />
            </div>
          </div>

          <figure className="mt-6 flex-1">
            <figcaption className="mb-3 flex justify-between text-[12px] text-white/45">
              <span>Your last six runs</span>
              <span>Pace per km</span>
            </figcaption>
            <ol className="flex h-[118px] items-end gap-2">
              {[...RUNS].reverse().map(([d, km, pace], i, arr) => {
                const h = 34 + ((slow - paceSecs(pace)) / Math.max(slow - fast, 1)) * 66;
                const latest = i === arr.length - 1;
                return (
                  <li key={d} className="flex h-full flex-1 flex-col items-center justify-end gap-1.5">
                    <span className={`nums text-[11px] ${latest ? "text-white" : "text-white/55"}`}>{pace}</span>
                    <span
                      className={`w-full rounded-lg ${latest ? "bg-ember-500" : "bg-white/15"}`}
                      style={{ height: `${h}%` }}
                      title={`${d}: ${km.toFixed(1)} km at ${pace} per km`}
                    />
                    <span className="nums text-[10.5px] whitespace-nowrap text-white/45">{d}</span>
                    <span className="sr-only">{`${km.toFixed(1)} km at ${pace} per km`}</span>
                  </li>
                );
              })}
            </ol>
          </figure>
          <p className="mt-4 text-[13px] leading-relaxed text-white/60">
            About fifteen seconds faster per km each week — on track to clear the target three
            weeks before you leave.
          </p>
          <Link
            href="/fitness"
            className="mt-4 inline-flex items-center gap-1.5 self-start text-[13.5px] font-medium text-white hover:text-ember-300"
          >
            How to train for altitude <ArrowUpRight size={14} />
          </Link>
        </section>
      )}

      {/* Before you go */}
      <Card className="flex flex-col lg:col-span-4" labelledBy="checklist-title">
        <CardHead
          id="checklist-title"
          title="Before you go"
          aside={
            <span className="nums text-[13px] text-ink-500">
              {doneCount} of {totalCount} done
            </span>
          }
        />
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-mist-200" aria-hidden="true">
          <div
            className="h-full rounded-full bg-ink-900 transition-all duration-500"
            style={{ width: `${(doneCount / totalCount) * 100}%` }}
          />
        </div>
        <ul className="mt-4 space-y-1">
          {Object.entries(checklist).map(([item, done]) => (
            <li key={item}>
              <button
                onClick={() => setChecklist((c) => ({ ...c, [item]: !c[item] }))}
                aria-pressed={done}
                className="group flex w-full items-center gap-3 rounded-2xl px-2 py-2 text-left transition-colors hover:bg-mist-100"
              >
                <span
                  className={`inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-colors ${
                    done ? "border-ink-900 bg-ink-900 text-white" : "border-mist-300 text-transparent group-hover:border-ink-400"
                  }`}
                  aria-hidden="true"
                >
                  <Check size={13} strokeWidth={3} />
                </span>
                <span className={`text-[14.5px] ${done ? "text-ink-400 line-through" : "text-ink-900"}`}>{item}</span>
              </button>
            </li>
          ))}
        </ul>
        <div className="mt-auto pt-5">
          <p className="rounded-2xl bg-mist-100 px-4 py-3 text-[13px] leading-relaxed text-ink-500">
            {doneCount === totalCount
              ? "All done. See you at basecamp."
              : `${totalCount - doneCount} left — your trek leader goes through this list with you at basecamp.`}
          </p>
        </div>
      </Card>

      {/* Documents */}
      <Card className="lg:col-span-4" labelledBy="docs-title">
        <CardHead id="docs-title" title="Documents" aside={<FileText size={17} className="text-ink-400" />} />
        <p className="mt-4 text-[12px] font-medium uppercase tracking-[0.12em] text-ink-400">Yours to upload</p>
        <ul className="mt-2 space-y-1.5">
          {UPLOADS.map(([n, s, done]) => (
            <li key={n} className="flex items-center justify-between gap-3 rounded-2xl bg-mist-100 px-3.5 py-2.5">
              <div className="min-w-0">
                <p className="truncate text-[14px] font-medium text-ink-900">{n}</p>
                <p className="text-[12px] text-ink-400">{s}</p>
              </div>
              {done ? (
                <Pill tone="green">
                  <Check size={11} /> Received
                </Pill>
              ) : (
                <button className="inline-flex shrink-0 items-center gap-1 rounded-full bg-ink-900 px-3 py-1.5 text-[12.5px] font-medium text-white transition-colors hover:bg-ink-700">
                  <Upload size={12} /> Upload
                </button>
              )}
            </li>
          ))}
        </ul>
        <p className="mt-5 text-[12px] font-medium uppercase tracking-[0.12em] text-ink-400">Ours to give you</p>
        <ul className="mt-1">
          {DOWNLOADS.map((n) => (
            <li key={n} className="flex items-center justify-between gap-3 border-b border-mist-200 py-2 last:border-b-0">
              <span className="text-[14px] text-ink-700">{n}</span>
              <button className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-[12.5px] text-ink-500 transition-colors hover:bg-mist-100 hover:text-ink-900">
                <Download size={13} /> PDF
              </button>
            </li>
          ))}
        </ul>
      </Card>

      {/* Saved */}
      <Card className="md:col-span-2 lg:col-span-4" labelledBy="saved-title">
        <CardHead
          id="saved-title"
          title="Saved"
          aside={
            <Link href="/treks" className="text-[13px] text-ink-500 hover:text-ink-900">
              Browse all
            </Link>
          }
        />
        {saved.length === 0 ? (
          <div className="mt-4 flex flex-col items-center rounded-[20px] bg-mist-100 px-6 py-10 text-center">
            <Heart size={20} className="text-ink-400" />
            <p className="mt-3 text-[16px] font-semibold text-ink-900">Nothing saved yet</p>
            <p className="mt-1 text-[13.5px] text-ink-500">Tap the heart on any trek and it will wait for you here.</p>
            <Button href="/treks" variant="dark" size="sm" className="mt-5">
              Browse treks
            </Button>
          </div>
        ) : (
          <ul className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-2">
            {saved.map((t, i) => (
              <li key={t.slug} className={i === 0 ? "col-span-2 sm:col-span-1 lg:col-span-2" : ""}>
                <Link
                  href={`/treks/${t.slug}`}
                  className={`group relative block overflow-hidden rounded-[20px] ${
                    i === 0 ? "aspect-[16/9] sm:aspect-[4/5] lg:aspect-[16/8]" : "aspect-[4/5]"
                  }`}
                >
                  <Photo
                    name={trekCover(t.slug)}
                    width={600}
                    alt=""
                    imgClassName="transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="scrim-b absolute inset-0" aria-hidden="true" />
                  <span className="glass absolute right-2 top-2 inline-flex h-7 w-7 items-center justify-center rounded-full text-white">
                    <Heart size={13} className="fill-white" />
                  </span>
                  <div className="absolute inset-x-3 bottom-3 text-white">
                    <p className="text-[14.5px] font-semibold leading-tight">{t.name}</p>
                    <div className="mt-1 text-white/80">
                      <DifficultyMeter difficulty={t.difficulty} onDark />
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Card>

      {/* Trips: booked and finished */}
      <Card className="md:col-span-2 lg:col-span-7" labelledBy="trips-title">
        <CardHead id="trips-title" title="Booked" aside={<span className="nums text-[13px] text-ink-500">{booked.length} trips</span>} />
        <ul className="mt-4 space-y-2">
          {booked.map(({ trek, departure }) => (
            <li
              key={departure.id}
              className="grid grid-cols-[56px_minmax(0,1fr)] items-center gap-x-4 gap-y-2 rounded-[20px] bg-mist-100 p-2.5 pr-4 sm:grid-cols-[56px_minmax(0,1fr)_auto]"
            >
              <div className="relative aspect-square overflow-hidden rounded-2xl">
                <Photo name={trekCover(trek.slug)} width={240} alt="" />
              </div>
              <div className="min-w-0">
                <Link
                  href={`/treks/${trek.slug}`}
                  className="text-[16px] font-semibold tracking-[-0.01em] text-ink-900 hover:text-ember-600"
                >
                  {trek.name}
                </Link>
                <p className="nums mt-0.5 text-[13px] text-ink-500">
                  {fmt(departure.start, { day: "numeric", month: "short", year: "numeric" })}
                  {" · "}
                  {trek.days} days · {departure.leader}
                  {departure.greenTrails && (
                    <span className="ml-2 inline-flex items-center gap-1 text-pine-600">
                      <Leaf size={11} /> Green Trails
                    </span>
                  )}
                </p>
              </div>
              <div className="col-start-2 flex items-center gap-3 sm:col-start-3">
                <Pill tone="green">Confirmed</Pill>
                <span className="nums text-[15px] font-semibold text-ink-900">{inr(trek.price)}</span>
              </div>
            </li>
          ))}
        </ul>

        <h3 className="mt-7 text-[16px] font-semibold text-ink-900">Finished</h3>
        <ul className="mt-2">
          {past.map((p) => (
            <li
              key={`${p.trek.slug}${p.date}`}
              className="flex items-center justify-between gap-4 border-b border-mist-200 py-3 last:border-b-0"
            >
              <div className="min-w-0">
                <Link href={`/treks/${p.trek.slug}`} className="text-[15px] font-medium text-ink-900 hover:text-ember-600">
                  {p.trek.name}
                </Link>
                <p className="nums mt-0.5 text-[12.5px] text-ink-400">
                  {fmt(p.date, { month: "long", year: "numeric" })}
                  {" · "}
                  {p.trek.maxAltFt.toLocaleString("en-IN")} ft
                </p>
              </div>
              <Pill tone={p.summited ? "gold" : "neutral"}>{p.summited ? "Reached the top" : "Turned back"}</Pill>
            </li>
          ))}
        </ul>
      </Card>

      {/* Altitude profile of the next trek */}
      {next && (
        <Card className="md:col-span-2 lg:col-span-5" labelledBy="profile-title">
          <CardHead id="profile-title" title={`What ${next.trek.name} looks like`} />
          <p className="mt-2 text-[13.5px] leading-relaxed text-ink-500">
            The two nights above 13,000 ft are the ones that decide how the summit day goes.
          </p>
          <div className="mt-4 text-ink-800">
            <div className="sm:hidden">
              <AltitudeProfile profile={next.trek.profile} height={660} fontScale={2.2} />
            </div>
            <div className="hidden sm:block lg:hidden">
              <AltitudeProfile profile={next.trek.profile} height={300} />
            </div>
            <div className="hidden lg:block">
              <AltitudeProfile profile={next.trek.profile} height={620} fontScale={1.9} />
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}

function Card({
  children,
  className = "",
  labelledBy,
}: {
  children: ReactNode;
  className?: string;
  labelledBy?: string;
}) {
  return (
    <section aria-labelledby={labelledBy} className={`rounded-bento bg-white p-5 shadow-soft sm:p-6 ${className}`}>
      {children}
    </section>
  );
}

function CardHead({ id, title, aside }: { id: string; title: string; aside?: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <h2 id={id} className="text-[18px] font-semibold tracking-[-0.02em] text-ink-900">
        {title}
      </h2>
      {aside}
    </div>
  );
}

function Stat({ label, value, unit }: { label: string; value: string; unit?: string }) {
  return (
    <div className="rounded-2xl bg-mist-100 px-3 py-3">
      <dt className="text-[12px] text-ink-500">{label}</dt>
      <dd className="nums mt-1 text-[22px] font-semibold leading-none tracking-[-0.03em] text-ink-900">
        {value}
        {unit && <span className="ml-0.5 text-[12px] font-normal text-ink-400">{unit}</span>}
      </dd>
    </div>
  );
}

function GlassStat({
  icon: Icon,
  label,
  value,
  unit,
}: {
  icon: typeof Mountain;
  label: string;
  value: string;
  unit?: string;
}) {
  return (
    <div className="bg-white/[0.04] px-4 py-3">
      <dt className="flex items-center gap-1.5 text-[12px] text-white/65">
        <Icon size={12} /> {label}
      </dt>
      <dd className="nums mt-1 text-[20px] font-semibold leading-none tracking-[-0.02em]">
        {value}
        {unit && <span className="ml-1 text-[12px] font-normal text-white/65">{unit}</span>}
      </dd>
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CalendarDays, FileText, Activity, Heart, Download, Check, Circle, Leaf,
} from "lucide-react";
import { AltitudeProfile, AltitudeSpark } from "@/components/viz/AltitudeProfile";
import { RidgeArt } from "@/components/viz/RidgeArt";
import { Button, Pill, DifficultyMeter } from "@/components/site/ui";
import { daysUntil, inr, type Trek, type Departure } from "@/lib/types";

const TABS = [
  { key: "upcoming", label: "Upcoming", icon: CalendarDays },
  { key: "fitness", label: "Fitness", icon: Activity },
  { key: "documents", label: "Documents", icon: FileText },
  { key: "saved", label: "Saved", icon: Heart },
] as const;

type TabKey = (typeof TABS)[number]["key"];

export function AccountDashboard({
  booked,
  saved,
  past,
}: {
  booked: { trek: Trek; departure: Departure }[];
  saved: Trek[];
  past: { trek: Trek; date: string; summited: boolean }[];
}) {
  const [tab, setTab] = useState<TabKey>("upcoming");
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

  return (
    <div>
      {/* Next trek — the one thing this page is really for */}
      {next && (
        <div className="relative overflow-hidden bg-spruce-900 text-snow-100 mb-12">
          <div className="absolute inset-0 opacity-40">
            <RidgeArt seed={next.trek.slug} tone="dark" className="w-full h-full" snowline={false} />
          </div>
          <div className="relative grid lg:grid-cols-[1.15fr_1fr] gap-x-12 gap-y-8 p-7 sm:p-10">
            <div>
              <p className="text-bugyal-400 text-[14px]">
                {daysTo > 0 ? `${daysTo} days until you leave` : "Leaving now"}
              </p>
              <h2 className="font-display text-[clamp(2rem,4.5vw,3rem)] leading-[1.02] text-snow-50 mt-2">
                {next.trek.name}
              </h2>
              <p className="nums text-[15.5px] text-glacier-200/75 mt-3">
                {new Date(next.departure.start).toLocaleDateString("en-IN", {
                  day: "numeric", month: "long", year: "numeric",
                })}
                {" – "}
                {new Date(next.departure.end).toLocaleDateString("en-IN", {
                  day: "numeric", month: "long",
                })}
                {" · led by "}
                {next.departure.leader}
              </p>
              <div className="flex flex-wrap gap-3 mt-7">
                <Link
                  href={`/treks/${next.trek.slug}`}
                  className="bg-bugyal-500 text-spruce-900 px-5 py-3 font-semibold hover:bg-bugyal-400 transition-colors"
                >
                  Open the trek page
                </Link>
                <button className="border border-glacier-700/60 px-5 py-3 font-semibold hover:border-glacier-400 transition-colors inline-flex items-center gap-2">
                  <Download size={16} /> Kit list
                </button>
              </div>
            </div>

            <div className="on-dark">
              <p className="text-[13px] text-glacier-400 mb-3">Before you go</p>
              <ul className="space-y-1">
                {Object.entries(checklist).map(([item, done]) => (
                  <li key={item}>
                    <button
                      onClick={() => setChecklist((c) => ({ ...c, [item]: !c[item] }))}
                      className="flex items-center gap-2.5 w-full text-left py-1.5 group"
                    >
                      {done ? (
                        <Check size={16} className="text-bugyal-400 shrink-0" />
                      ) : (
                        <Circle size={16} className="text-glacier-700 shrink-0" />
                      )}
                      <span
                        className={
                          done
                            ? "text-[14.5px] text-glacier-400 line-through"
                            : "text-[14.5px] text-snow-100 group-hover:text-bugyal-400 transition-colors"
                        }
                      >
                        {item}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
              <p className="nums text-[12.5px] text-glacier-400/70 mt-3">
                {Object.values(checklist).filter(Boolean).length} of{" "}
                {Object.keys(checklist).length} done
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-1 border-b border-snow-300 mb-8 overflow-x-auto thin-scroll">
        {TABS.map((t) => {
          const Icon = t.icon;
          const on = tab === t.key;
          return (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              aria-current={on ? "page" : undefined}
              className={[
                "flex items-center gap-2 px-4 py-3 text-[15px] border-b-2 -mb-px whitespace-nowrap transition-colors",
                on ? "border-bugyal-500 font-semibold" : "border-transparent text-spruce-800/60 hover:text-spruce-800",
              ].join(" ")}
            >
              <Icon size={16} />
              {t.label}
            </button>
          );
        })}
      </div>

      {tab === "upcoming" && (
        <div className="space-y-10">
          <div>
            <h3 className="font-display-tight text-[21px] mb-5">Booked</h3>
            <div className="border-t border-snow-300">
              {booked.map(({ trek, departure }) => (
                <div
                  key={departure.id}
                  className="grid sm:grid-cols-[1fr_auto_auto] items-center gap-x-8 gap-y-3 py-5 border-b border-snow-300"
                >
                  <div>
                    <Link
                      href={`/treks/${trek.slug}`}
                      className="font-display-tight text-[20px] hover:text-deodar-600 transition-colors"
                    >
                      {trek.name}
                    </Link>
                    <p className="nums text-[13.5px] text-snow-500 mt-1">
                      {new Date(departure.start).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                      {" · "}{trek.days} days · {departure.leader}
                      {departure.greenTrails && (
                        <span className="text-deodar-600 inline-flex items-center gap-1 ml-2">
                          <Leaf size={11} /> Green Trails
                        </span>
                      )}
                    </p>
                  </div>
                  <div className="text-spruce-800/60"><AltitudeSpark profile={trek.profile} /></div>
                  <div className="flex items-center gap-3">
                    <Pill tone="green">Confirmed</Pill>
                    <span className="nums text-[15px] font-semibold">{inr(trek.price)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-display-tight text-[21px] mb-5">Finished</h3>
            <div className="border-t border-snow-300">
              {past.map((p) => (
                <div key={`${p.trek.slug}${p.date}`} className="flex items-center justify-between gap-6 py-4 border-b border-snow-300">
                  <div>
                    <Link href={`/treks/${p.trek.slug}`} className="text-[16.5px] font-semibold hover:text-deodar-600 transition-colors">
                      {p.trek.name}
                    </Link>
                    <p className="nums text-[13px] text-snow-500 mt-0.5">
                      {new Date(p.date).toLocaleDateString("en-IN", { month: "long", year: "numeric" })}
                      {" · "}{p.trek.maxAltFt.toLocaleString("en-IN")} ft
                    </p>
                  </div>
                  <Pill tone={p.summited ? "gold" : "neutral"}>
                    {p.summited ? "Reached the top" : "Turned back"}
                  </Pill>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === "fitness" && next && (
        <div className="grid lg:grid-cols-[1fr_320px] gap-x-12 gap-y-8">
          <div>
            <h3 className="font-display-tight text-[21px]">
              {next.trek.name} asks for {next.trek.fitnessTarget}
            </h3>
            <p className="mt-3 text-[16px] leading-relaxed text-spruce-800/70 measure">
              {next.trek.fitnessNote}
            </p>

            <div className="mt-8 border border-snow-300">
              <div className="px-5 py-3.5 border-b border-snow-300 bg-snow-50 flex justify-between text-[13px] text-snow-500">
                <span>Your last six runs</span>
                <span>Pace per km</span>
              </div>
              {[
                ["12 Sep", "5.0 km", "8:24"],
                ["9 Sep", "5.2 km", "8:38"],
                ["6 Sep", "4.4 km", "8:51"],
                ["3 Sep", "5.0 km", "9:02"],
                ["31 Aug", "4.0 km", "9:16"],
                ["28 Aug", "3.6 km", "9:40"],
              ].map(([d, km, pace]) => (
                <div key={d} className="px-5 py-3 border-b border-snow-300 last:border-b-0 flex justify-between text-[14.5px]">
                  <span className="nums text-snow-500 w-20">{d}</span>
                  <span className="nums flex-1">{km}</span>
                  <span className="nums font-semibold">{pace}</span>
                </div>
              ))}
            </div>
            <p className="text-[14px] text-spruce-800/65 mt-4 measure leading-relaxed">
              You are improving by about fifteen seconds per kilometre a week. At that
              rate you clear the target three weeks before you leave.
            </p>
          </div>

          <aside className="border border-snow-300 bg-snow-50 p-6 self-start">
            <p className="text-[13px] text-snow-500">Target</p>
            <p className="nums font-display text-[28px] leading-none mt-1.5">
              {next.trek.fitnessTarget}
            </p>
            <div className="mt-6">
              <div className="flex justify-between text-[13px] mb-2">
                <span className="text-snow-500">Current best</span>
                <span className="nums">5 km · 42:00</span>
              </div>
              <div className="h-2 bg-snow-300" aria-hidden="true">
                <div className="h-full bg-deodar-500" style={{ width: "82%" }} />
              </div>
              <p className="nums text-[12.5px] text-snow-500 mt-2">82% of the way there</p>
            </div>
            <Button href="/fitness" variant="outline" className="mt-6 w-full">
              How to train for altitude
            </Button>
          </aside>
        </div>
      )}

      {tab === "documents" && (
        <div className="grid md:grid-cols-2 gap-x-10 gap-y-8">
          <div>
            <h3 className="font-display-tight text-[21px] mb-5">Yours to upload</h3>
            <div className="space-y-px bg-snow-300 border border-snow-300">
              {[
                ["Photo ID", "Verified 2 Sep", true],
                ["Medical declaration", "Signed 4 Sep", true],
                ["Fitness record", "Not uploaded", false],
                ["Insurance certificate", "Not uploaded", false],
              ].map(([n, s, done]) => (
                <div key={n as string} className="bg-snow-50 px-5 py-4 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[15.5px] font-semibold">{n}</p>
                    <p className="text-[13px] text-snow-500 mt-0.5">{s}</p>
                  </div>
                  {done ? (
                    <Pill tone="green">Received</Pill>
                  ) : (
                    <button className="text-[14px] font-semibold border-b-2 border-bugyal-500 pb-0.5 hover:border-spruce-800 transition-colors">
                      Upload
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-display-tight text-[21px] mb-5">Ours to give you</h3>
            <div className="space-y-px bg-snow-300 border border-snow-300">
              {["Kit list", "Route map and campsite notes", "Cancellation policy", "Trek invoice"].map((n) => (
                <div key={n} className="bg-snow-50 px-5 py-4 flex items-center justify-between gap-4">
                  <p className="text-[15.5px]">{n}</p>
                  <button className="inline-flex items-center gap-1.5 text-[14px] text-snow-500 hover:text-spruce-800 transition-colors">
                    <Download size={15} /> PDF
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === "saved" && (
        <div>
          {saved.length === 0 ? (
            <div className="border border-snow-300 bg-snow-50 p-12 text-center">
              <h3 className="font-display-tight text-[22px]">Nothing saved yet</h3>
              <p className="mt-2 text-[15px] text-spruce-800/65">
                Tap the heart on any trek and it will wait for you here.
              </p>
              <Button href="/treks" variant="dark" className="mt-6">Browse treks</Button>
            </div>
          ) : (
            <div className="border-t border-snow-300">
              {saved.map((t) => (
                <div key={t.slug} className="grid sm:grid-cols-[1fr_auto_auto] items-center gap-x-8 gap-y-3 py-5 border-b border-snow-300">
                  <div>
                    <Link href={`/treks/${t.slug}`} className="font-display-tight text-[20px] hover:text-deodar-600 transition-colors">
                      {t.name}
                    </Link>
                    <p className="text-[13.5px] text-snow-500 mt-1">{t.tagline}</p>
                  </div>
                  <DifficultyMeter difficulty={t.difficulty} />
                  <Link
                    href={`/treks/${t.slug}`}
                    className="bg-bugyal-500 text-spruce-900 px-4 py-2.5 text-[14px] font-semibold hover:bg-bugyal-400 transition-colors whitespace-nowrap"
                  >
                    See dates
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {tab === "upcoming" && next && (
        <section className="mt-14 pt-10 border-t border-snow-300">
          <h3 className="font-display-tight text-[21px] mb-2">
            What {next.trek.name} looks like
          </h3>
          <p className="text-[15px] text-spruce-800/65 mb-6">
            Worth knowing before you pack — the two nights above 13,000 ft are the ones
            that decide how the summit day goes.
          </p>
          <div className="text-spruce-800">
            <div className="sm:hidden">
              <AltitudeProfile profile={next.trek.profile} height={500} fontScale={2.4} />
            </div>
            <div className="hidden sm:block">
              <AltitudeProfile profile={next.trek.profile} height={280} />
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

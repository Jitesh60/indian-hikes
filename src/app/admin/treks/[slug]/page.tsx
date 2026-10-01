"use client";

import { use, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Eye, Save, Trash2, GripVertical, Plus } from "lucide-react";
import { AdminShell, AdminButton, Card } from "@/components/admin/AdminShell";
import { AltitudeProfile } from "@/components/viz/AltitudeProfile";
import { trekBySlug, departuresFor } from "@/data/treks";
import { DIFFICULTY_ORDER, MONTHS, inr } from "@/lib/types";

const TABS = ["Details", "Itinerary", "Pricing", "Departures", "Publishing"] as const;

const input =
  "w-full border border-snow-300 bg-snow-100 px-3 py-2 text-[14px] focus:border-spruce-800 outline-none transition-colors";

export default function AdminTrekEditor({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const trek = trekBySlug(slug);
  const [tab, setTab] = useState<(typeof TABS)[number]>("Details");
  const [dirty, setDirty] = useState(false);

  if (!trek) notFound();
  const deps = departuresFor(slug);

  const touch = () => setDirty(true);

  return (
    <AdminShell
      title={trek.name}
      subtitle={`${trek.state} · ${trek.maxAltFt.toLocaleString("en-IN")} ft · ${trek.difficulty}`}
      actions={
        <>
          <AdminButton href="/admin/treks" variant="outline">
            <ArrowLeft size={15} /> All treks
          </AdminButton>
          <AdminButton href={`/treks/${trek.slug}`} variant="outline">
            <Eye size={15} /> View live page
          </AdminButton>
          <AdminButton onClick={() => setDirty(false)}>
            <Save size={15} /> {dirty ? "Save changes" : "Saved"}
          </AdminButton>
        </>
      }
    >
      <div className="flex gap-1 border-b border-snow-300 mb-6 overflow-x-auto thin-scroll">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            aria-current={tab === t ? "page" : undefined}
            className={[
              "px-4 py-2.5 text-[14px] border-b-2 -mb-px whitespace-nowrap transition-colors",
              tab === t ? "border-bugyal-500 font-semibold" : "border-transparent text-spruce-800/55 hover:text-spruce-800",
            ].join(" ")}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "Details" && (
        <div className="grid xl:grid-cols-[1fr_340px] gap-6">
          <Card>
            <div className="grid sm:grid-cols-2 gap-5">
              <Labelled label="Trek name">
                <input className={input} defaultValue={trek.name} onChange={touch} />
              </Labelled>
              <Labelled label="URL slug">
                <input className={input} defaultValue={trek.slug} onChange={touch} />
              </Labelled>
              <Labelled label="State">
                <input className={input} defaultValue={trek.state} onChange={touch} />
              </Labelled>
              <Labelled label="Region">
                <input className={input} defaultValue={trek.region} onChange={touch} />
              </Labelled>
              <Labelled label="Basecamp">
                <input className={input} defaultValue={trek.basecamp} onChange={touch} />
              </Labelled>
              <Labelled label="Nearest railhead">
                <input className={input} defaultValue={trek.railhead} onChange={touch} />
              </Labelled>
              <Labelled label="Grade">
                <select className={input} defaultValue={trek.difficulty} onChange={touch}>
                  {DIFFICULTY_ORDER.map((d) => (
                    <option key={d}>{d}</option>
                  ))}
                </select>
              </Labelled>
              <Labelled label="Fitness target">
                <input className={input} defaultValue={trek.fitnessTarget} onChange={touch} />
              </Labelled>
            </div>

            <div className="mt-5">
              <Labelled label="Tagline" hint="One line, shown under the name everywhere">
                <input className={input} defaultValue={trek.tagline} onChange={touch} />
              </Labelled>
            </div>
            <div className="mt-5">
              <Labelled label="Summary" hint="Two or three sentences on the trek page">
                <textarea rows={5} className={input} defaultValue={trek.summary} onChange={touch} />
              </Labelled>
            </div>

            <div className="mt-6">
              <p className="text-[13px] font-semibold mb-2.5">Season</p>
              <div className="flex flex-wrap gap-1.5">
                {MONTHS.map((m) => {
                  const on = trek.seasons.includes(m);
                  return (
                    <button
                      key={m}
                      onClick={touch}
                      className={`nums px-3 py-1.5 text-[13px] border transition-colors ${
                        on ? "bg-spruce-800 text-snow-50 border-spruce-800" : "border-snow-300 hover:border-spruce-800"
                      }`}
                    >
                      {m}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-6">
              <p className="text-[13px] font-semibold mb-2.5">Flags</p>
              <div className="grid sm:grid-cols-2 gap-2.5">
                {[
                  ["Women-only batches", trek.womenOnly],
                  ["Suitable for families", trek.familyFriendly],
                  ["Good first Himalayan trek", trek.firstTimer],
                  ["Involves walking on snow", trek.snow],
                ].map(([l, v]) => (
                  <label key={l as string} className="flex items-center gap-2.5 text-[14px] cursor-pointer">
                    <input type="checkbox" defaultChecked={v as boolean} onChange={touch} />
                    {l}
                  </label>
                ))}
              </div>
            </div>
          </Card>

          <div className="space-y-6">
            <Card>
              <h3 className="font-display-tight text-[17px] mb-4">Altitude profile</h3>
              <div className="text-spruce-800">
                <AltitudeProfile profile={trek.profile} height={230} showLabels={false} />
              </div>
              <p className="text-[12.5px] text-snow-500 mt-3 leading-relaxed">
                Generated from the itinerary. Edit a day&apos;s altitude and this redraws.
              </p>
            </Card>
            <Card>
              <h3 className="font-display-tight text-[17px] mb-4">At a glance</h3>
              <dl className="space-y-2.5 text-[13.5px]">
                {[
                  ["Rating", `${trek.rating} from ${trek.reviews.toLocaleString("en-IN")}`],
                  ["Trail length", `${trek.trailKm} km`],
                  ["Days", String(trek.days)],
                  ["Open departures", String(deps.filter((d) => d.status !== "full").length)],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4">
                    <dt className="text-snow-500">{k}</dt>
                    <dd className="nums">{v}</dd>
                  </div>
                ))}
              </dl>
            </Card>
          </div>
        </div>
      )}

      {tab === "Itinerary" && (
        <Card pad={false}>
          <div className="p-5 border-b border-snow-300 flex items-center justify-between gap-4">
            <div>
              <h3 className="font-display-tight text-[18px]">Day by day</h3>
              <p className="text-[13px] text-snow-500 mt-0.5">
                Drag to reorder. Altitude here drives the profile chart and the colour bands.
              </p>
            </div>
            <AdminButton size="sm" variant="outline">
              <Plus size={14} /> Add a day
            </AdminButton>
          </div>
          {trek.profile.map((d) => (
            <div key={d.day} className="grid grid-cols-[28px_60px_1fr_110px_90px_36px] gap-3 items-center px-5 py-3 border-b border-snow-300 last:border-b-0">
              <GripVertical size={15} className="text-snow-400 cursor-grab" />
              <span className="nums text-[13px] text-snow-500">Day {d.day}</span>
              <input className={input} defaultValue={d.label} onChange={touch} aria-label={`Day ${d.day} campsite`} />
              <input className={`${input} nums`} defaultValue={d.altFt} onChange={touch} aria-label={`Day ${d.day} altitude`} />
              <input className={`${input} nums`} defaultValue={d.km} onChange={touch} aria-label={`Day ${d.day} distance`} />
              <button className="text-snow-400 hover:text-rhodo-600 transition-colors justify-self-center" aria-label={`Remove day ${d.day}`}>
                <Trash2 size={15} />
              </button>
            </div>
          ))}
        </Card>
      )}

      {tab === "Pricing" && (
        <div className="grid xl:grid-cols-2 gap-6">
          <Card>
            <h3 className="font-display-tight text-[18px] mb-5">Trek fee</h3>
            <div className="grid sm:grid-cols-2 gap-5">
              <Labelled label="Fee per person">
                <input className={`${input} nums`} defaultValue={trek.price} onChange={touch} />
              </Labelled>
              <Labelled label="GST rate">
                <input className={`${input} nums`} defaultValue="5%" onChange={touch} />
              </Labelled>
              <Labelled label="Deposit to hold a slot">
                <input className={`${input} nums`} defaultValue="25%" onChange={touch} />
              </Labelled>
              <Labelled label="Group size cap">
                <input className={`${input} nums`} defaultValue={trek.difficulty === "Difficult" ? 15 : 20} onChange={touch} />
              </Labelled>
            </div>
            <p className="nums text-[13px] text-snow-500 mt-5">
              A trekker pays {inr(Math.round(trek.price * 1.05))} including GST, of which{" "}
              {inr(Math.round(trek.price * 1.05 * 0.25))} is due at booking.
            </p>
          </Card>

          <Card pad={false}>
            <div className="p-5 border-b border-snow-300">
              <h3 className="font-display-tight text-[18px]">Add-ons offered</h3>
            </div>
            {[
              [`Transport from ${trek.railhead}`, 2400],
              ["Backpack offloading", 1650],
              ["Gear rental bundle", 1200],
              ["Trek insurance", 520],
            ].map(([l, p]) => (
              <div key={l as string} className="flex items-center justify-between gap-4 px-5 py-3 border-b border-snow-300 last:border-b-0">
                <label className="flex items-center gap-2.5 text-[14px] cursor-pointer">
                  <input type="checkbox" defaultChecked onChange={touch} />
                  {l}
                </label>
                <input className={`${input} nums w-28`} defaultValue={p as number} onChange={touch} aria-label={`${l} price`} />
              </div>
            ))}
          </Card>
        </div>
      )}

      {tab === "Departures" && (
        <Card pad={false}>
          <div className="p-5 border-b border-snow-300 flex items-center justify-between gap-4">
            <h3 className="font-display-tight text-[18px]">{deps.length} departures</h3>
            <AdminButton size="sm">
              <Plus size={14} /> Add departure
            </AdminButton>
          </div>
          <div className="overflow-x-auto thin-scroll">
            <table className="w-full text-[13.5px]">
              <thead>
                <tr className="text-left text-[12px] text-snow-500 border-b border-snow-300">
                  <th className="font-normal px-5 py-2.5">Starts</th>
                  <th className="font-normal px-5 py-2.5">Leader</th>
                  <th className="font-normal px-5 py-2.5 text-right">Booked</th>
                  <th className="font-normal px-5 py-2.5 text-right">Capacity</th>
                  <th className="font-normal px-5 py-2.5">Fill</th>
                </tr>
              </thead>
              <tbody>
                {deps.slice(0, 14).map((d) => (
                  <tr key={d.id} className="border-b border-snow-300 last:border-b-0 hover:bg-snow-100 transition-colors">
                    <td className="nums px-5 py-3">
                      {new Date(d.start).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </td>
                    <td className="px-5 py-3">{d.leader}</td>
                    <td className="nums px-5 py-3 text-right">{d.booked}</td>
                    <td className="nums px-5 py-3 text-right text-snow-500">{d.capacity}</td>
                    <td className="px-5 py-3">
                      <div className="h-1.5 bg-snow-200 w-24">
                        <div
                          className={d.booked / d.capacity > 0.85 ? "h-full bg-rhodo-600" : "h-full bg-deodar-500"}
                          style={{ width: `${(d.booked / d.capacity) * 100}%` }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {tab === "Publishing" && (
        <div className="grid xl:grid-cols-2 gap-6">
          <Card>
            <h3 className="font-display-tight text-[18px] mb-5">Visibility</h3>
            <div className="space-y-3">
              {[
                ["Published on the site", true],
                ["Shown in the departure calendar", true],
                ["Listed on the homepage ladder", true],
                ["Accepting new bookings", true],
                ["Hidden while the season is closed", false],
              ].map(([l, v]) => (
                <label key={l as string} className="flex items-center gap-3 text-[14px] cursor-pointer">
                  <input type="checkbox" defaultChecked={v as boolean} onChange={touch} />
                  {l}
                </label>
              ))}
            </div>
          </Card>
          <Card>
            <h3 className="font-display-tight text-[18px] mb-5">Search listing</h3>
            <Labelled label="Page title">
              <input className={input} defaultValue={`${trek.name} · HeyHikers`} onChange={touch} />
            </Labelled>
            <div className="mt-5">
              <Labelled label="Meta description" hint="Around 155 characters">
                <textarea rows={3} className={input} defaultValue={trek.tagline} onChange={touch} />
              </Labelled>
            </div>
            <Link
              href={`/treks/${trek.slug}`}
              className="inline-block mt-5 text-[13.5px] text-snow-500 hover:text-spruce-800 transition-colors"
            >
              heyhikers.com/treks/{trek.slug}
            </Link>
          </Card>
        </div>
      )}
    </AdminShell>
  );
}

function Labelled({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-[13px] font-semibold mb-1.5">{label}</label>
      {children}
      {hint && <p className="text-[12px] text-snow-500 mt-1.5">{hint}</p>}
    </div>
  );
}

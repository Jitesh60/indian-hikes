"use client";

import { useMemo, useState } from "react";
import { Plus, Download, X } from "lucide-react";
import { AdminShell, AdminButton, Card } from "@/components/admin/AdminShell";
import { DataTable, selectCls, type Column } from "@/components/admin/DataTable";
import { RankBars } from "@/components/admin/Charts";
import { wasteLogs, type WasteLog } from "@/data/admin";
import { treks } from "@/data/treks";

const input =
  "w-full border border-snow-300 bg-snow-100 px-3 py-2 text-[14px] focus:border-spruce-800 outline-none transition-colors";

export default function AdminGreenTrailsPage() {
  const [camp, setCamp] = useState("all");
  const [logging, setLogging] = useState(false);

  const camps = useMemo(() => Array.from(new Set(wasteLogs.map((w) => w.basecamp))).sort(), []);
  const rows = useMemo(
    () => wasteLogs.filter((w) => camp === "all" || w.basecamp === camp),
    [camp]
  );

  const total = wasteLogs.reduce((s, w) => s + w.kg, 0);
  const byCamp = camps
    .map((c) => ({
      label: c,
      value: Math.round(wasteLogs.filter((w) => w.basecamp === c).reduce((s, w) => s + w.kg, 0)),
      sub: `${wasteLogs.filter((w) => w.basecamp === c).length} collections`,
    }))
    .sort((a, b) => b.value - a.value);

  const trekName = (slug: string) => treks.find((t) => t.slug === slug)?.name ?? slug;

  const columns: Column<WasteLog>[] = [
    { key: "id", header: "Log", cell: (w) => <span className="nums text-snow-500">{w.id}</span> },
    {
      key: "date",
      header: "Collected",
      sortable: true,
      value: (w) => w.date,
      cell: (w) => (
        <span className="nums">
          {new Date(w.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "2-digit" })}
        </span>
      ),
    },
    { key: "basecamp", header: "Basecamp", sortable: true, value: (w) => w.basecamp, cell: (w) => <span className="font-semibold">{w.basecamp}</span> },
    { key: "trek", header: "Trek", cell: (w) => trekName(w.trek) },
    {
      key: "kg",
      header: "Total",
      align: "right",
      sortable: true,
      value: (w) => w.kg,
      cell: (w) => <span className="nums font-semibold">{w.kg} kg</span>,
    },
    { key: "plastic", header: "Plastic", align: "right", sortable: true, value: (w) => w.plastic, cell: (w) => <span className="nums">{w.plastic}</span> },
    { key: "glass", header: "Glass", align: "right", cell: (w) => <span className="nums">{w.glass}</span> },
    { key: "metal", header: "Metal", align: "right", cell: (w) => <span className="nums">{w.metal}</span> },
    { key: "other", header: "Other", align: "right", cell: (w) => <span className="nums">{w.other}</span> },
    { key: "coordinator", header: "Logged by", cell: (w) => <span className="text-[13px]">{w.coordinator}</span> },
  ];

  return (
    <AdminShell
      title="Green Trails"
      subtitle="Waste recovered, weighed at basecamp and sorted into five streams."
      actions={
        <>
          <AdminButton variant="outline">
            <Download size={15} /> Export
          </AdminButton>
          <AdminButton onClick={() => setLogging(true)}>
            <Plus size={15} /> Log a collection
          </AdminButton>
        </>
      }
    >
      <div className="grid xl:grid-cols-[1fr_340px] gap-6 mb-6">
        <div className="grid sm:grid-cols-3 gap-px bg-snow-300 border border-snow-300 self-start">
          {[
            ["Collected this season", `${total.toFixed(1)} kg`, `${wasteLogs.length} collections logged`],
            ["Multi-layer plastic", `${Math.round((wasteLogs.reduce((s, w) => s + w.plastic, 0) / total) * 100)}%`, "The share nobody recycles"],
            ["Basecamps reporting", String(camps.length), "All with a sorting shed"],
          ].map(([l, v, s]) => (
            <div key={l} className="bg-snow-50 p-5">
              <p className="text-[12.5px] text-snow-500">{l}</p>
              <p className="nums font-display text-[clamp(1.5rem,2.4vw,1.95rem)] leading-none mt-2">{v}</p>
              <p className="text-[12px] text-snow-400 mt-2">{s}</p>
            </div>
          ))}
        </div>

        <Card>
          <h2 className="font-display-tight text-[18px] mb-4">By basecamp</h2>
          <RankBars rows={byCamp} unit=" kg" />
        </Card>
      </div>

      <DataTable
        rows={rows}
        columns={columns}
        pageSize={12}
        searchKeys={(w) => `${w.id} ${w.basecamp} ${trekName(w.trek)} ${w.coordinator}`}
        filters={
          <select value={camp} onChange={(e) => setCamp(e.target.value)} className={selectCls} aria-label="Filter by basecamp">
            <option value="all">Any basecamp</option>
            {camps.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        }
      />

      {logging && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-5">
          <button className="absolute inset-0 bg-spruce-900/45" onClick={() => setLogging(false)} aria-label="Close" />
          <Card className="relative w-full max-w-[520px] max-h-[88dvh] overflow-y-auto">
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <h2 className="font-display text-[24px] leading-tight">Log a collection</h2>
                <p className="text-[13.5px] text-snow-500 mt-1">
                  Weigh each stream separately. The total is worked out for you.
                </p>
              </div>
              <button onClick={() => setLogging(false)} className="p-1.5 -mr-1.5" aria-label="Close">
                <X size={19} />
              </button>
            </div>
            <div className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[13px] font-semibold mb-1.5">Basecamp</label>
                  <select className={input}>
                    {camps.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[13px] font-semibold mb-1.5">Date collected</label>
                  <input type="date" className={input} defaultValue="2026-09-17" />
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {["Plastic", "Glass", "Metal", "Other"].map((s) => (
                  <div key={s}>
                    <label className="block text-[13px] font-semibold mb-1.5">{s}</label>
                    <input className={`${input} nums`} placeholder="kg" />
                  </div>
                ))}
              </div>
              <div>
                <label className="block text-[13px] font-semibold mb-1.5">Notes</label>
                <textarea rows={3} className={input} placeholder="Where most of it came from, anything unusual" />
              </div>
            </div>
            <div className="flex gap-2.5 mt-7 pt-5 border-t border-snow-300">
              <AdminButton onClick={() => setLogging(false)}>Save the log</AdminButton>
              <AdminButton variant="outline" onClick={() => setLogging(false)}>Cancel</AdminButton>
            </div>
          </Card>
        </div>
      )}
    </AdminShell>
  );
}

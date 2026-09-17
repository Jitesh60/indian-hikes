"use client";

import { useMemo, useState } from "react";
import { Plus, X, Download } from "lucide-react";
import { AdminShell, AdminButton, StatusTag, Card } from "@/components/admin/AdminShell";
import { DataTable, selectCls, type Column } from "@/components/admin/DataTable";
import { treks, departures } from "@/data/treks";
import { leaders } from "@/data/admin";
import { inr, type Departure } from "@/lib/types";

const input =
  "w-full border border-snow-300 bg-snow-100 px-3 py-2 text-[14px] focus:border-spruce-800 outline-none transition-colors";

export default function AdminDeparturesPage() {
  const [trek, setTrek] = useState("all");
  const [status, setStatus] = useState("all");
  const [creating, setCreating] = useState(false);

  const rows = useMemo(
    () =>
      departures.filter((d) => {
        if (trek !== "all" && d.trek !== trek) return false;
        if (status !== "all" && d.status !== status) return false;
        return true;
      }),
    [trek, status]
  );

  const trekName = (slug: string) => treks.find((t) => t.slug === slug)?.name ?? slug;

  const columns: Column<Departure>[] = [
    {
      key: "trek",
      header: "Trek",
      sortable: true,
      value: (d) => trekName(d.trek),
      cell: (d) => <span className="font-semibold">{trekName(d.trek)}</span>,
    },
    {
      key: "start",
      header: "Starts",
      sortable: true,
      nowrap: true,
      value: (d) => d.start,
      cell: (d) => (
        <span className="nums">
          {new Date(d.start).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
        </span>
      ),
    },
    {
      key: "end",
      header: "Ends",
      cell: (d) => (
        <span className="nums text-snow-500">
          {new Date(d.end).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
        </span>
      ),
    },
    { key: "leader", header: "Leader", sortable: true, value: (d) => d.leader, cell: (d) => d.leader },
    {
      key: "fill",
      header: "Filled",
      cell: (d) => {
        const pct = Math.round((d.booked / d.capacity) * 100);
        return (
          <div className="flex items-center gap-2.5">
            <div className="h-1.5 bg-snow-200 w-20 shrink-0">
              <div
                className={pct > 85 ? "h-full bg-rhodo-600" : pct > 60 ? "h-full bg-bugyal-500" : "h-full bg-deodar-500"}
                style={{ width: `${pct}%` }}
              />
            </div>
            <span className="nums text-[12.5px] text-snow-500">{pct}%</span>
          </div>
        );
      },
    },
    {
      key: "booked",
      header: "Booked",
      align: "right",
      sortable: true,
      value: (d) => d.booked,
      cell: (d) => (
        <span className="nums">
          {d.booked}
          <span className="text-snow-400"> / {d.capacity}</span>
        </span>
      ),
    },
    {
      key: "value",
      header: "Value",
      align: "right",
      sortable: true,
      nowrap: true,
      value: (d) => d.booked * (treks.find((t) => t.slug === d.trek)?.price ?? 0),
      cell: (d) => (
        <span className="nums font-semibold">
          {inr(d.booked * (treks.find((t) => t.slug === d.trek)?.price ?? 0))}
        </span>
      ),
    },
    { key: "status", header: "Status", sortable: true, value: (d) => d.status, cell: (d) => <StatusTag status={d.status} /> },
    {
      key: "gt",
      header: "Green Trails",
      cell: (d) => (d.greenTrails ? <StatusTag status="published" /> : <span className="text-[12px] text-snow-400">—</span>),
    },
  ];

  return (
    <AdminShell
      title="Departures"
      subtitle={`${departures.length} scheduled departures across the next fourteen months.`}
      actions={
        <>
          <AdminButton variant="outline">
            <Download size={15} /> Export
          </AdminButton>
          <AdminButton onClick={() => setCreating(true)}>
            <Plus size={15} /> New departure
          </AdminButton>
        </>
      }
    >
      <DataTable
        rows={rows}
        columns={columns}
        pageSize={14}
        searchKeys={(d) => `${trekName(d.trek)} ${d.leader} ${d.start}`}
        filters={
          <>
            <select value={trek} onChange={(e) => setTrek(e.target.value)} className={selectCls} aria-label="Filter by trek">
              <option value="all">Any trek</option>
              {treks.map((t) => (
                <option key={t.slug} value={t.slug}>{t.name}</option>
              ))}
            </select>
            <select value={status} onChange={(e) => setStatus(e.target.value)} className={selectCls} aria-label="Filter by status">
              <option value="all">Any status</option>
              <option value="open">Open</option>
              <option value="filling">Filling</option>
              <option value="full">Full</option>
            </select>
          </>
        }
      />

      {creating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-5">
          <button className="absolute inset-0 bg-spruce-900/45" onClick={() => setCreating(false)} aria-label="Close" />
          <Card className="relative w-full max-w-[560px] max-h-[88dvh] overflow-y-auto">
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <h2 className="font-display text-[24px] leading-tight">Schedule a departure</h2>
                <p className="text-[13.5px] text-snow-500 mt-1">
                  The end date is worked out from the trek length.
                </p>
              </div>
              <button onClick={() => setCreating(false)} className="p-1.5 -mr-1.5" aria-label="Close">
                <X size={19} />
              </button>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-[13px] font-semibold mb-1.5">Trek</label>
                <select className={input} defaultValue={treks[0].slug}>
                  {treks.map((t) => (
                    <option key={t.slug} value={t.slug}>
                      {t.name} — {t.days} days
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[13px] font-semibold mb-1.5">Start date</label>
                  <input type="date" className={input} defaultValue="2026-12-12" />
                </div>
                <div>
                  <label className="block text-[13px] font-semibold mb-1.5">Capacity</label>
                  <input className={`${input} nums`} defaultValue={20} />
                </div>
              </div>
              <div>
                <label className="block text-[13px] font-semibold mb-1.5">Trek leader</label>
                <select className={input}>
                  {leaders
                    .filter((l) => l.status !== "on leave")
                    .map((l) => (
                      <option key={l.name}>
                        {l.name} — {l.grades}
                      </option>
                    ))}
                </select>
              </div>
              <label className="flex items-center gap-2.5 text-[14px] cursor-pointer">
                <input type="checkbox" />
                Run this as a Green Trails departure
              </label>
              <p className="text-[12.5px] text-snow-500 leading-relaxed">
                Green Trails departures cap at twelve trekkers and need a coordinator
                assigned before they can be published.
              </p>
            </div>

            <div className="flex gap-2.5 mt-7 pt-5 border-t border-snow-300">
              <AdminButton onClick={() => setCreating(false)}>Schedule it</AdminButton>
              <AdminButton variant="outline" onClick={() => setCreating(false)}>Cancel</AdminButton>
            </div>
          </Card>
        </div>
      )}
    </AdminShell>
  );
}

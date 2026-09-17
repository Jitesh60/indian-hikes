"use client";

import { useMemo, useState } from "react";
import { Download, X, Mail, Check, TriangleAlert } from "lucide-react";
import { AdminShell, StatusTag, AdminButton } from "@/components/admin/AdminShell";
import { DataTable, selectCls, type Column } from "@/components/admin/DataTable";
import { bookings, type Booking, type BookingStatus } from "@/data/admin";
import { treks } from "@/data/treks";
import { inr } from "@/lib/types";

const STATUSES: BookingStatus[] = ["confirmed", "pending", "waitlist", "cancelled"];

export default function AdminBookingsPage() {
  const [status, setStatus] = useState<BookingStatus | "all">("all");
  const [trek, setTrek] = useState("all");
  const [flag, setFlag] = useState<"all" | "fitness" | "docs">("all");
  const [open, setOpen] = useState<Booking | null>(null);

  const rows = useMemo(
    () =>
      bookings.filter((b) => {
        if (status !== "all" && b.status !== status) return false;
        if (trek !== "all" && b.trek !== trek) return false;
        if (flag === "fitness" && !b.fitnessFlag) return false;
        if (flag === "docs" && b.docsComplete) return false;
        return true;
      }),
    [status, trek, flag]
  );

  const columns: Column<Booking>[] = [
    {
      key: "id",
      header: "Reference",
      sortable: true,
      nowrap: true,
      value: (b) => b.id,
      cell: (b) => <span className="nums text-snow-500">{b.id}</span>,
    },
    {
      key: "trekker",
      header: "Trekker",
      sortable: true,
      value: (b) => b.trekker,
      cell: (b) => (
        <div className="flex items-center gap-2">
          <div>
            <span className="block">{b.trekker}</span>
            <span className="block text-[12px] text-snow-400">{b.city}</span>
          </div>
          {b.fitnessFlag && (
            <TriangleAlert size={14} className="text-rhodo-600 shrink-0" aria-label="Fitness record missing" />
          )}
        </div>
      ),
    },
    {
      key: "trekName",
      header: "Trek",
      sortable: true,
      value: (b) => b.trekName,
      cell: (b) => b.trekName,
    },
    {
      key: "start",
      header: "Departs",
      sortable: true,
      nowrap: true,
      value: (b) => b.start,
      cell: (b) => (
        <span className="nums text-snow-500">
          {new Date(b.start).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "2-digit" })}
        </span>
      ),
    },
    {
      key: "people",
      header: "People",
      align: "right",
      sortable: true,
      value: (b) => b.people,
      cell: (b) => <span className="nums">{b.people}</span>,
    },
    {
      key: "amount",
      header: "Amount",
      align: "right",
      sortable: true,
      nowrap: true,
      value: (b) => b.amount,
      cell: (b) => (
        <div>
          <span className="nums font-semibold block">{inr(b.amount)}</span>
          {b.paid < b.amount && b.status !== "cancelled" && (
            <span className="nums block text-[11.5px] text-bugyal-600">
              {inr(b.amount - b.paid)} due
            </span>
          )}
        </div>
      ),
    },
    {
      key: "docs",
      header: "Docs",
      cell: (b) =>
        b.docsComplete ? (
          <Check size={15} className="text-deodar-500" aria-label="Documents complete" />
        ) : (
          <span className="text-[12px] text-snow-400">Missing</span>
        ),
    },
    {
      key: "status",
      header: "Status",
      sortable: true,
      value: (b) => b.status,
      cell: (b) => <StatusTag status={b.status} />,
    },
  ];

  return (
    <AdminShell
      title="Bookings"
      subtitle="Every booking across the season. Click a row to open it."
      actions={
        <>
          <AdminButton variant="outline">
            <Mail size={15} /> Email selection
          </AdminButton>
          <AdminButton variant="outline">
            <Download size={15} /> Export CSV
          </AdminButton>
        </>
      }
    >
      <DataTable
        rows={rows}
        columns={columns}
        pageSize={14}
        onRowClick={setOpen}
        searchKeys={(b) => `${b.id} ${b.trekker} ${b.email} ${b.city} ${b.trekName}`}
        empty="No booking matches those filters."
        filters={
          <>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as BookingStatus | "all")}
              className={selectCls}
              aria-label="Filter by status"
            >
              <option value="all">Any status</option>
              {STATUSES.map((s) => (
                <option key={s} value={s}>{s[0].toUpperCase() + s.slice(1)}</option>
              ))}
            </select>
            <select
              value={trek}
              onChange={(e) => setTrek(e.target.value)}
              className={selectCls}
              aria-label="Filter by trek"
            >
              <option value="all">Any trek</option>
              {treks.map((t) => (
                <option key={t.slug} value={t.slug}>{t.name}</option>
              ))}
            </select>
            <select
              value={flag}
              onChange={(e) => setFlag(e.target.value as "all" | "fitness" | "docs")}
              className={selectCls}
              aria-label="Filter by outstanding item"
            >
              <option value="all">No outstanding filter</option>
              <option value="fitness">Fitness record missing</option>
              <option value="docs">Documents incomplete</option>
            </select>
          </>
        }
      />

      {/* Detail drawer */}
      {open && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <button
            className="flex-1 bg-spruce-900/40"
            onClick={() => setOpen(null)}
            aria-label="Close booking"
          />
          <div className="w-[min(480px,92vw)] bg-snow-50 border-l border-snow-300 overflow-y-auto">
            <div className="sticky top-0 bg-snow-50 border-b border-snow-300 px-6 py-4 flex items-start justify-between gap-4">
              <div>
                <p className="nums text-[12.5px] text-snow-500">{open.id}</p>
                <h2 className="font-display text-[24px] leading-tight mt-0.5">{open.trekker}</h2>
              </div>
              <button onClick={() => setOpen(null)} className="p-1.5 -mr-1.5" aria-label="Close booking">
                <X size={19} />
              </button>
            </div>

            <div className="px-6 py-5">
              <StatusTag status={open.status} />

              <dl className="mt-5 space-y-3 text-[14px]">
                {[
                  ["Trek", open.trekName],
                  ["Departure", new Date(open.start).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })],
                  ["Trekkers", String(open.people)],
                  ["Email", open.email],
                  ["City", open.city],
                  ["Booked on", new Date(open.bookedOn).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })],
                  ["Add-ons", open.addOns.length ? open.addOns.join(", ") : "None"],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-6 border-b border-snow-200 pb-3">
                    <dt className="text-snow-500 shrink-0">{k}</dt>
                    <dd className="nums text-right">{v}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-6 border border-snow-300 p-4">
                <div className="flex justify-between text-[14px]">
                  <span className="text-snow-500">Total</span>
                  <span className="nums font-semibold">{inr(open.amount)}</span>
                </div>
                <div className="flex justify-between text-[14px] mt-2">
                  <span className="text-snow-500">Received</span>
                  <span className="nums">{inr(open.paid)}</span>
                </div>
                <div className="flex justify-between text-[14px] mt-2 pt-2 border-t border-snow-300">
                  <span className="font-semibold">Outstanding</span>
                  <span className={`nums font-semibold ${open.amount - open.paid > 0 ? "text-rhodo-600" : ""}`}>
                    {inr(open.amount - open.paid)}
                  </span>
                </div>
              </div>

              {(open.fitnessFlag || !open.docsComplete) && (
                <div className="mt-5 border border-rhodo-600/30 bg-rhodo-600/5 p-4">
                  <p className="text-[13.5px] font-semibold text-rhodo-600 mb-2">
                    Cannot be cleared for departure yet
                  </p>
                  <ul className="text-[13.5px] text-spruce-800/75 space-y-1">
                    {open.fitnessFlag && <li>Fitness record not received for a Difficult trek</li>}
                    {!open.docsComplete && <li>Photo ID or medical declaration is missing</li>}
                  </ul>
                </div>
              )}

              <div className="mt-6 flex flex-wrap gap-2">
                <AdminButton size="sm">Send reminder</AdminButton>
                <AdminButton size="sm" variant="outline">Move to another date</AdminButton>
                <AdminButton size="sm" variant="outline">Add a note</AdminButton>
                <AdminButton size="sm" variant="danger">Cancel booking</AdminButton>
              </div>

              <p className="text-[12.5px] text-snow-500 mt-6 leading-relaxed">
                Front-end demonstration — these actions are not wired to a backend.
              </p>
            </div>
          </div>
        </div>
      )}
    </AdminShell>
  );
}

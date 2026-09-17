"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Plus, Download, Pencil } from "lucide-react";
import { AdminShell, AdminButton, StatusTag } from "@/components/admin/AdminShell";
import { DataTable, selectCls, type Column } from "@/components/admin/DataTable";
import { AltitudeSpark } from "@/components/viz/AltitudeProfile";
import { treks, departures } from "@/data/treks";
import { bookings } from "@/data/admin";
import { DIFFICULTY_ORDER, inr, type Trek } from "@/lib/types";

export default function AdminTreksPage() {
  const [grade, setGrade] = useState("all");
  const [state, setState] = useState("all");

  const states = useMemo(() => Array.from(new Set(treks.map((t) => t.state))).sort(), []);

  const rows = useMemo(
    () =>
      treks.filter((t) => {
        if (grade !== "all" && t.difficulty !== grade) return false;
        if (state !== "all" && t.state !== state) return false;
        return true;
      }),
    [grade, state]
  );

  const columns: Column<Trek & { id?: string }>[] = [
    {
      key: "name",
      header: "Trek",
      sortable: true,
      value: (t) => t.name,
      cell: (t) => (
        <div>
          <Link
            href={`/admin/treks/${t.slug}`}
            className="font-semibold hover:text-deodar-600 transition-colors"
          >
            {t.name}
          </Link>
          <span className="block text-[12px] text-snow-400">
            {t.state} · {t.basecamp}
          </span>
        </div>
      ),
    },
    {
      key: "profile",
      header: "Profile",
      cell: (t) => (
        <span className="text-spruce-800/60 inline-block">
          <AltitudeSpark profile={t.profile} width={90} height={26} />
        </span>
      ),
    },
    {
      key: "maxAltFt",
      header: "Highest",
      align: "right",
      sortable: true,
      value: (t) => t.maxAltFt,
      cell: (t) => <span className="nums">{t.maxAltFt.toLocaleString("en-IN")} ft</span>,
    },
    {
      key: "difficulty",
      header: "Grade",
      sortable: true,
      value: (t) => t.difficulty,
      cell: (t) => t.difficulty,
    },
    {
      key: "days",
      header: "Days",
      align: "right",
      sortable: true,
      value: (t) => t.days,
      cell: (t) => <span className="nums">{t.days}</span>,
    },
    {
      key: "price",
      header: "Fee",
      align: "right",
      sortable: true,
      value: (t) => t.price,
      cell: (t) => <span className="nums font-semibold">{inr(t.price)}</span>,
    },
    {
      key: "deps",
      header: "Departures",
      align: "right",
      sortable: true,
      value: (t) => departures.filter((d) => d.trek === t.slug).length,
      cell: (t) => {
        const list = departures.filter((d) => d.trek === t.slug);
        const open = list.filter((d) => d.status !== "full").length;
        return (
          <div>
            <span className="nums block">{list.length}</span>
            <span className="nums block text-[11.5px] text-snow-400">{open} open</span>
          </div>
        );
      },
    },
    {
      key: "booked",
      header: "Trekkers",
      align: "right",
      sortable: true,
      value: (t) => bookings.filter((b) => b.trek === t.slug && b.status !== "cancelled").reduce((s, b) => s + b.people, 0),
      cell: (t) => (
        <span className="nums">
          {bookings
            .filter((b) => b.trek === t.slug && b.status !== "cancelled")
            .reduce((s, b) => s + b.people, 0)}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      cell: () => <StatusTag status="published" />,
    },
    {
      key: "edit",
      header: "",
      align: "right",
      cell: (t) => (
        <Link
          href={`/admin/treks/${t.slug}`}
          className="inline-flex items-center gap-1.5 text-[12.5px] text-snow-500 hover:text-spruce-800 transition-colors"
        >
          <Pencil size={13} /> Edit
        </Link>
      ),
    },
  ];

  return (
    <AdminShell
      title="Treks"
      subtitle={`${treks.length} published routes across ${states.length} states.`}
      actions={
        <>
          <AdminButton variant="outline">
            <Download size={15} /> Export
          </AdminButton>
          <AdminButton>
            <Plus size={15} /> Add a trek
          </AdminButton>
        </>
      }
    >
      <DataTable
        rows={rows}
        columns={columns}
        pageSize={15}
        searchKeys={(t) => `${t.name} ${t.state} ${t.region} ${t.basecamp}`}
        filters={
          <>
            <select value={grade} onChange={(e) => setGrade(e.target.value)} className={selectCls} aria-label="Filter by grade">
              <option value="all">Any grade</option>
              {DIFFICULTY_ORDER.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
            <select value={state} onChange={(e) => setState(e.target.value)} className={selectCls} aria-label="Filter by state">
              <option value="all">Any state</option>
              {states.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </>
        }
      />
    </AdminShell>
  );
}

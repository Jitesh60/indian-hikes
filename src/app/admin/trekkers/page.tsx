"use client";

import { useMemo } from "react";
import { Download, Mail } from "lucide-react";
import { AdminShell, AdminButton, StatusTag } from "@/components/admin/AdminShell";
import { DataTable, type Column } from "@/components/admin/DataTable";
import { bookings } from "@/data/admin";
import { inr } from "@/lib/types";

type Trekker = {
  id: string;
  name: string;
  email: string;
  city: string;
  treks: number;
  people: number;
  spend: number;
  lastTrek: string;
  lastDate: string;
  status: string;
};

export default function AdminTrekkersPage() {
  const rows = useMemo<Trekker[]>(() => {
    const map = new Map<string, Trekker>();
    bookings.forEach((b) => {
      const key = b.trekker;
      const cur = map.get(key);
      if (cur) {
        cur.treks += 1;
        cur.people += b.people;
        if (b.status !== "cancelled") cur.spend += b.amount;
        if (b.start > cur.lastDate) {
          cur.lastDate = b.start;
          cur.lastTrek = b.trekName;
        }
      } else {
        map.set(key, {
          id: key,
          name: b.trekker,
          email: b.email,
          city: b.city,
          treks: 1,
          people: b.people,
          spend: b.status === "cancelled" ? 0 : b.amount,
          lastTrek: b.trekName,
          lastDate: b.start,
          status: b.status,
        });
      }
    });
    return [...map.values()].sort((a, b) => b.spend - a.spend);
  }, []);

  const repeat = rows.filter((r) => r.treks > 1).length;

  const columns: Column<Trekker>[] = [
    {
      key: "name",
      header: "Trekker",
      sortable: true,
      value: (r) => r.name,
      cell: (r) => (
        <div className="flex items-center gap-2.5">
          <span className="w-7 h-7 bg-snow-200 text-spruce-800 flex items-center justify-center text-[11px] font-bold shrink-0">
            {r.name.split(" ").map((p) => p[0]).join("")}
          </span>
          <div>
            <span className="block font-semibold">{r.name}</span>
            <span className="block text-[12px] text-snow-400">{r.email}</span>
          </div>
        </div>
      ),
    },
    { key: "city", header: "City", sortable: true, value: (r) => r.city, cell: (r) => r.city },
    {
      key: "treks",
      header: "Bookings",
      align: "right",
      sortable: true,
      value: (r) => r.treks,
      cell: (r) => (
        <span className={`nums ${r.treks > 1 ? "font-semibold text-deodar-600" : ""}`}>{r.treks}</span>
      ),
    },
    {
      key: "people",
      header: "Seats",
      align: "right",
      sortable: true,
      value: (r) => r.people,
      cell: (r) => <span className="nums">{r.people}</span>,
    },
    {
      key: "spend",
      header: "Lifetime value",
      align: "right",
      sortable: true,
      nowrap: true,
      value: (r) => r.spend,
      cell: (r) => <span className="nums font-semibold">{inr(r.spend)}</span>,
    },
    { key: "lastTrek", header: "Most recent trek", sortable: true, value: (r) => r.lastTrek, cell: (r) => r.lastTrek },
    {
      key: "lastDate",
      header: "Date",
      sortable: true,
      value: (r) => r.lastDate,
      cell: (r) => (
        <span className="nums text-snow-500">
          {new Date(r.lastDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "2-digit" })}
        </span>
      ),
    },
    { key: "status", header: "Latest status", cell: (r) => <StatusTag status={r.status} /> },
  ];

  return (
    <AdminShell
      title="Trekkers"
      subtitle={`${rows.length.toLocaleString("en-IN")} people have booked this season. ${repeat} of them more than once.`}
      actions={
        <>
          <AdminButton variant="outline">
            <Mail size={15} /> Start a campaign
          </AdminButton>
          <AdminButton variant="outline">
            <Download size={15} /> Export
          </AdminButton>
        </>
      }
    >
      <DataTable
        rows={rows}
        columns={columns}
        pageSize={14}
        searchKeys={(r) => `${r.name} ${r.email} ${r.city} ${r.lastTrek}`}
      />
    </AdminShell>
  );
}

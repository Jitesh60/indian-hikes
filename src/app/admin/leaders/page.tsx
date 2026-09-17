"use client";

import { Plus, Award } from "lucide-react";
import { AdminShell, AdminButton, StatusTag, Card } from "@/components/admin/AdminShell";
import { DataTable, type Column } from "@/components/admin/DataTable";
import { leaders, type Leader } from "@/data/admin";

export default function AdminLeadersPage() {
  const onTrek = leaders.filter((l) => l.status === "on trek").length;
  const available = leaders.filter((l) => l.status === "available").length;

  const columns: Column<Leader & { id?: string }>[] = [
    {
      key: "name",
      header: "Leader",
      sortable: true,
      value: (l) => l.name,
      cell: (l) => (
        <div className="flex items-center gap-2.5">
          <span className="w-8 h-8 bg-deodar-600 text-snow-50 flex items-center justify-center text-[11.5px] font-bold shrink-0">
            {l.name.split(" ").map((p) => p[0]).join("")}
          </span>
          <div>
            <span className="block font-semibold">{l.name}</span>
            <span className="nums block text-[12px] text-snow-400">Leading since {l.since}</span>
          </div>
        </div>
      ),
    },
    { key: "home", header: "Basecamp", sortable: true, value: (l) => l.home, cell: (l) => l.home },
    { key: "grades", header: "Cleared for", cell: (l) => <span className="text-[13px]">{l.grades}</span> },
    {
      key: "certifications",
      header: "Certifications",
      cell: (l) => (
        <div className="flex flex-wrap gap-1">
          {l.certifications.map((c) => (
            <span key={c} className="border border-snow-300 px-1.5 py-[1px] text-[11px] text-snow-500">
              {c}
            </span>
          ))}
        </div>
      ),
    },
    {
      key: "treksLed",
      header: "Treks led",
      align: "right",
      sortable: true,
      value: (l) => l.treksLed,
      cell: (l) => <span className="nums font-semibold">{l.treksLed}</span>,
    },
    {
      key: "rating",
      header: "Rating",
      align: "right",
      sortable: true,
      value: (l) => l.rating,
      cell: (l) => <span className="nums">★ {l.rating}</span>,
    },
    {
      key: "nextDeparture",
      header: "Next out",
      cell: (l) => (
        <span className="nums text-[13px] text-snow-500">{l.nextDeparture ?? "Not scheduled"}</span>
      ),
    },
    { key: "status", header: "Status", sortable: true, value: (l) => l.status, cell: (l) => <StatusTag status={l.status} /> },
  ];

  return (
    <AdminShell
      title="Trek leaders"
      subtitle={`${leaders.length} on the roster — ${onTrek} out on a trek, ${available} available to assign.`}
      actions={
        <AdminButton>
          <Plus size={15} /> Add a leader
        </AdminButton>
      }
    >
      <div className="grid sm:grid-cols-3 gap-px bg-snow-300 border border-snow-300 mb-6">
        {[
          ["Out on a trek", onTrek, "Unavailable until they come down"],
          ["Available", available, "Can be assigned to a departure now"],
          ["Cleared for Difficult grade", leaders.filter((l) => l.grades === "All grades").length, "Rope rescue certified"],
        ].map(([l, v, s]) => (
          <div key={l as string} className="bg-snow-50 p-5">
            <p className="text-[12.5px] text-snow-500">{l}</p>
            <p className="nums font-display text-[30px] leading-none mt-2">{v as number}</p>
            <p className="text-[12px] text-snow-400 mt-2">{s}</p>
          </div>
        ))}
      </div>

      <DataTable
        rows={leaders}
        columns={columns}
        pageSize={12}
        searchKeys={(l) => `${l.name} ${l.home} ${l.grades} ${l.certifications.join(" ")}`}
      />

      <Card className="mt-6">
        <div className="flex items-start gap-3">
          <Award size={18} className="text-bugyal-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-display-tight text-[17px]">Certification renewals due</h3>
            <p className="text-[13.5px] text-spruce-800/70 mt-1.5 leading-relaxed measure">
              Wilderness first responder certification lapses after three years. Four
              leaders need to re-sit before the winter season opens in December.
            </p>
          </div>
        </div>
      </Card>
    </AdminShell>
  );
}

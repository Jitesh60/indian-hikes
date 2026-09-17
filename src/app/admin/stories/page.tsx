"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Eye, Pencil } from "lucide-react";
import { AdminShell, AdminButton, StatusTag, Card } from "@/components/admin/AdminShell";
import { DataTable, selectCls, type Column } from "@/components/admin/DataTable";
import { stories, type Story } from "@/data/stories";
import { treks } from "@/data/treks";

export default function AdminStoriesPage() {
  const [category, setCategory] = useState("all");
  const categories = Array.from(new Set(stories.map((s) => s.category)));
  const rows = stories.filter((s) => category === "all" || s.category === category);
  const trekName = (slug: string) => treks.find((t) => t.slug === slug)?.name ?? "—";

  const columns: Column<Story & { id?: string }>[] = [
    {
      key: "title",
      header: "Story",
      sortable: true,
      value: (s) => s.title,
      cell: (s) => (
        <div className="max-w-[380px]">
          <Link href={`/stories/${s.slug}`} className="font-semibold hover:text-deodar-600 transition-colors">
            {s.title}
          </Link>
          <p className="text-[12px] text-snow-400 truncate mt-0.5">{s.standfirst}</p>
        </div>
      ),
    },
    { key: "category", header: "Category", sortable: true, value: (s) => s.category, cell: (s) => s.category },
    { key: "author", header: "Author", sortable: true, value: (s) => s.author, cell: (s) => (
      <div>
        <span className="block">{s.author}</span>
        <span className="block text-[12px] text-snow-400">{s.role}</span>
      </div>
    ) },
    { key: "trek", header: "Trek", cell: (s) => trekName(s.trek) },
    {
      key: "date",
      header: "Published",
      sortable: true,
      value: (s) => s.date,
      cell: (s) => (
        <span className="nums text-snow-500">
          {new Date(s.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "2-digit" })}
        </span>
      ),
    },
    {
      key: "minutes",
      header: "Length",
      align: "right",
      sortable: true,
      value: (s) => s.minutes,
      cell: (s) => <span className="nums">{s.minutes} min</span>,
    },
    { key: "status", header: "Status", cell: () => <StatusTag status="published" /> },
    {
      key: "actions",
      header: "",
      align: "right",
      cell: (s) => (
        <div className="flex items-center gap-3 justify-end">
          <Link href={`/stories/${s.slug}`} className="text-snow-400 hover:text-spruce-800 transition-colors" aria-label={`View ${s.title}`}>
            <Eye size={14} />
          </Link>
          <button className="text-snow-400 hover:text-spruce-800 transition-colors" aria-label={`Edit ${s.title}`}>
            <Pencil size={14} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <AdminShell
      title="Stories"
      subtitle={`${stories.length} published pieces across ${categories.length} categories.`}
      actions={
        <AdminButton>
          <Plus size={15} /> Write a story
        </AdminButton>
      }
    >
      <DataTable
        rows={rows}
        columns={columns}
        pageSize={10}
        searchKeys={(s) => `${s.title} ${s.author} ${s.category} ${trekName(s.trek)}`}
        filters={
          <select value={category} onChange={(e) => setCategory(e.target.value)} className={selectCls} aria-label="Filter by category">
            <option value="all">Any category</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        }
      />

      <Card className="mt-6">
        <h3 className="font-display-tight text-[17px]">Waiting on a trek leader</h3>
        <p className="text-[13.5px] text-spruce-800/70 mt-1.5 leading-relaxed measure">
          Three trek reports have been filed from Kashmir this month but not yet edited
          into stories. Reports sit in the queue for two weeks before they are archived.
        </p>
        <AdminButton size="sm" variant="outline">Open the report queue</AdminButton>
      </Card>
    </AdminShell>
  );
}

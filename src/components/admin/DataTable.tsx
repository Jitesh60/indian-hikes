"use client";

import { useMemo, useState, type ReactNode } from "react";
import { ArrowDown, ArrowUp, ChevronLeft, ChevronRight, Search } from "lucide-react";

export type Column<T> = {
  key: string;
  header: string;
  align?: "left" | "right";
  width?: string;
  sortable?: boolean;
  /** Keep the cell on one line — references, dates, money. */
  nowrap?: boolean;
  value?: (row: T) => string | number;
  cell: (row: T) => ReactNode;
};

export function DataTable<T extends { id?: string }>({
  rows,
  columns,
  searchKeys,
  filters,
  pageSize = 12,
  onRowClick,
  empty = "Nothing matches those filters.",
}: {
  rows: T[];
  columns: Column<T>[];
  searchKeys: (row: T) => string;
  filters?: ReactNode;
  pageSize?: number;
  onRowClick?: (row: T) => void;
  empty?: string;
}) {
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<{ key: string; dir: 1 | -1 } | null>(null);
  const [page, setPage] = useState(0);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    let out = needle ? rows.filter((r) => searchKeys(r).toLowerCase().includes(needle)) : rows;
    if (sort) {
      const col = columns.find((c) => c.key === sort.key);
      if (col?.value) {
        out = [...out].sort((a, b) => {
          const av = col.value!(a);
          const bv = col.value!(b);
          if (typeof av === "number" && typeof bv === "number") return (av - bv) * sort.dir;
          return String(av).localeCompare(String(bv)) * sort.dir;
        });
      }
    }
    return out;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rows, q, sort, columns]);

  const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const current = Math.min(page, pages - 1);
  const slice = filtered.slice(current * pageSize, current * pageSize + pageSize);

  function toggleSort(key: string) {
    setSort((s) => (s?.key === key ? { key, dir: s.dir === 1 ? -1 : 1 } : { key, dir: 1 }));
    setPage(0);
  }

  return (
    <div className="border border-snow-300 bg-snow-50">
      <div className="p-4 border-b border-snow-300 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-[320px]">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-snow-400" />
          <input
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setPage(0);
            }}
            placeholder="Search this table"
            aria-label="Search this table"
            className="w-full border border-snow-300 bg-snow-100 pl-9 pr-3 py-2 text-[13.5px] placeholder:text-snow-400 focus:border-spruce-800 outline-none transition-colors"
          />
        </div>
        {filters}
        <div className="flex-1" />
        <span className="nums text-[12.5px] text-snow-500">
          {filtered.length.toLocaleString("en-IN")} rows
        </span>
      </div>

      <div className="overflow-x-auto thin-scroll">
        <table className="w-full text-[13.5px]">
          <thead>
            <tr className="text-[12px] text-snow-500 border-b border-snow-300">
              {columns.map((c) => (
                <th
                  key={c.key}
                  style={c.width ? { width: c.width } : undefined}
                  className={`font-normal px-4 py-2.5 ${c.align === "right" ? "text-right" : "text-left"}`}
                >
                  {c.sortable && c.value ? (
                    <button
                      onClick={() => toggleSort(c.key)}
                      className={`inline-flex items-center gap-1 hover:text-spruce-800 transition-colors ${
                        c.align === "right" ? "flex-row-reverse" : ""
                      }`}
                    >
                      {c.header}
                      {sort?.key === c.key &&
                        (sort.dir === 1 ? <ArrowUp size={12} /> : <ArrowDown size={12} />)}
                    </button>
                  ) : (
                    c.header
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {slice.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="px-4 py-14 text-center text-snow-500 text-[14px]">
                  {empty}
                </td>
              </tr>
            )}
            {slice.map((row, i) => (
              <tr
                key={row.id ?? i}
                onClick={onRowClick ? () => onRowClick(row) : undefined}
                className={`border-b border-snow-300 last:border-b-0 transition-colors ${
                  onRowClick ? "cursor-pointer hover:bg-snow-100" : "hover:bg-snow-100"
                }`}
              >
                {columns.map((c) => (
                  <td
                    key={c.key}
                    className={`px-4 py-3 align-top ${c.align === "right" ? "text-right" : ""} ${c.nowrap ? "whitespace-nowrap" : ""}`}
                  >
                    {c.cell(row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {pages > 1 && (
        <div className="p-3 border-t border-snow-300 flex items-center justify-between gap-4">
          <span className="nums text-[12.5px] text-snow-500">
            Page {current + 1} of {pages}
          </span>
          <div className="flex gap-1.5">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={current === 0}
              className="p-2 border border-snow-300 hover:border-spruce-800 disabled:opacity-30 transition-colors"
              aria-label="Previous page"
            >
              <ChevronLeft size={15} />
            </button>
            <button
              onClick={() => setPage((p) => Math.min(pages - 1, p + 1))}
              disabled={current >= pages - 1}
              className="p-2 border border-snow-300 hover:border-spruce-800 disabled:opacity-30 transition-colors"
              aria-label="Next page"
            >
              <ChevronRight size={15} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export const selectCls =
  "border border-snow-300 bg-snow-100 px-2.5 py-2 text-[13px] focus:border-spruce-800 outline-none transition-colors";

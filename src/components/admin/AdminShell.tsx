"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Mountain, CalendarRange, Receipt, Users, Compass,
  Leaf, FileText, Settings, Menu, X, Search, Bell, ChevronLeft,
} from "lucide-react";

const NAV = [
  { group: "Overview", items: [{ href: "/admin", label: "Dashboard", icon: LayoutDashboard }] },
  {
    group: "Operations",
    items: [
      { href: "/admin/treks", label: "Treks", icon: Mountain },
      { href: "/admin/departures", label: "Departures", icon: CalendarRange },
      { href: "/admin/leaders", label: "Trek leaders", icon: Compass },
    ],
  },
  {
    group: "Commerce",
    items: [
      { href: "/admin/bookings", label: "Bookings", icon: Receipt },
      { href: "/admin/trekkers", label: "Trekkers", icon: Users },
    ],
  },
  {
    group: "Programmes",
    items: [
      { href: "/admin/green-trails", label: "Trail clean-up", icon: Leaf },
      { href: "/admin/stories", label: "Stories", icon: FileText },
      { href: "/admin/settings", label: "Settings", icon: Settings },
    ],
  },
];

export function AdminShell({
  children,
  title,
  subtitle,
  actions,
}: {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const sidebar = (
    <div className="flex flex-col h-full">
      <div className="px-5 h-[60px] flex items-center justify-between border-b border-glacier-700/25 shrink-0">
        <Link href="/admin" className="flex items-center gap-2.5 text-snow-50">
          <Mountain className="text-bugyal-400" size={21} strokeWidth={1.75} />
          <span className="font-display text-[19px] leading-none">HeyHikers</span>
        </Link>
        <button className="lg:hidden text-snow-300" onClick={() => setOpen(false)} aria-label="Close menu">
          <X size={19} />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto py-5 px-3 thin-scroll" aria-label="Admin">
        {NAV.map((g) => (
          <div key={g.group} className="mb-6">
            <p className="px-2.5 mb-1.5 text-[11px] text-glacier-400/60">{g.group}</p>
            {g.items.map((it) => {
              const Icon = it.icon;
              const on = it.href === "/admin" ? pathname === "/admin" : pathname.startsWith(it.href);
              return (
                <Link
                  key={it.href}
                  href={it.href}
                  onClick={() => setOpen(false)}
                  className={[
                    "flex items-center gap-2.5 px-2.5 py-2 text-[14px] transition-colors",
                    on
                      ? "bg-glacier-700/25 text-snow-50 border-l-2 border-bugyal-500 -ml-[2px] pl-[12px]"
                      : "text-glacier-200/65 hover:text-snow-50 hover:bg-glacier-700/15",
                  ].join(" ")}
                >
                  <Icon size={16} strokeWidth={1.75} />
                  {it.label}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      <div className="px-3 pb-4 shrink-0">
        <Link
          href="/"
          className="flex items-center gap-2 px-2.5 py-2 text-[13.5px] text-glacier-400/70 hover:text-snow-50 transition-colors"
        >
          <ChevronLeft size={15} />
          Back to the site
        </Link>
        <div className="mt-2 px-2.5 py-3 border-t border-glacier-700/25 flex items-center gap-2.5">
          <span className="w-7 h-7 bg-bugyal-500 text-spruce-900 flex items-center justify-center text-[12px] font-bold shrink-0">
            JB
          </span>
          <div className="min-w-0">
            <p className="text-[13px] text-snow-100 truncate">Jitesh Bhatt</p>
            <p className="text-[11.5px] text-glacier-400/60 truncate">Operations lead</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-dvh bg-snow-100 lg:grid lg:grid-cols-[236px_minmax(0,1fr)]">
      <aside className="hidden lg:block on-dark bg-spruce-900">
        <div className="sticky top-0 h-dvh">{sidebar}</div>
      </aside>

      {open && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="on-dark w-[248px] bg-spruce-900">{sidebar}</div>
          <button className="flex-1 bg-spruce-900/50" onClick={() => setOpen(false)} aria-label="Close menu" />
        </div>
      )}

      <div className="min-w-0">
        <header className="sticky top-0 z-30 bg-snow-50 border-b border-snow-300">
          <div className="h-[60px] px-4 sm:px-6 flex items-center gap-4">
            <button className="lg:hidden p-1.5 -ml-1.5" onClick={() => setOpen(true)} aria-label="Open menu">
              <Menu size={20} />
            </button>

            <div className="relative flex-1 max-w-[380px]">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-snow-400" />
              <input
                placeholder="Search bookings, trekkers, departures"
                aria-label="Search the admin panel"
                className="w-full border border-snow-300 bg-snow-100 pl-9 pr-3 py-2 text-[13.5px] placeholder:text-snow-400 focus:border-spruce-800 outline-none transition-colors"
              />
            </div>

            <div className="flex-1" />

            <button className="relative p-2 hover:bg-snow-200 transition-colors" aria-label="3 notifications">
              <Bell size={17} />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-rhodo-600" />
            </button>
            <span className="nums hidden sm:block text-[13px] text-snow-500 border-l border-snow-300 pl-4">
              Season 2026–27
            </span>
          </div>
        </header>

        <div className="p-4 sm:p-6 lg:p-8">
          <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4 mb-7">
            <div>
              <h1 className="font-display text-[clamp(1.7rem,3vw,2.2rem)] leading-tight">{title}</h1>
              {subtitle && <p className="mt-1.5 text-[15px] text-spruce-800/65 measure">{subtitle}</p>}
            </div>
            {actions && <div className="flex flex-wrap items-center gap-2.5">{actions}</div>}
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

/* ── Shared admin primitives ───────────────────────────────────────── */

export function Card({
  children,
  className = "",
  pad = true,
}: {
  children: React.ReactNode;
  className?: string;
  pad?: boolean;
}) {
  return (
    <div className={`border border-snow-300 bg-snow-50 ${pad ? "p-5" : ""} ${className}`}>
      {children}
    </div>
  );
}

export function StatusTag({ status }: { status: string }) {
  const map: Record<string, string> = {
    confirmed: "border-deodar-500/40 text-deodar-600 bg-deodar-400/10",
    open: "border-deodar-500/40 text-deodar-600 bg-deodar-400/10",
    available: "border-deodar-500/40 text-deodar-600 bg-deodar-400/10",
    published: "border-deodar-500/40 text-deodar-600 bg-deodar-400/10",
    pending: "border-bugyal-600/40 text-bugyal-600 bg-bugyal-500/10",
    filling: "border-bugyal-600/40 text-bugyal-600 bg-bugyal-500/10",
    training: "border-bugyal-600/40 text-bugyal-600 bg-bugyal-500/10",
    draft: "border-snow-300 text-snow-500",
    waitlist: "border-glacier-600/40 text-glacier-700 bg-glacier-600/10",
    "on trek": "border-glacier-600/40 text-glacier-700 bg-glacier-600/10",
    "on leave": "border-snow-300 text-snow-500",
    cancelled: "border-rhodo-600/40 text-rhodo-600 bg-rhodo-600/8",
    full: "border-rhodo-600/40 text-rhodo-600 bg-rhodo-600/8",
  };
  return (
    <span className={`inline-block border px-2 py-[2px] text-[11.5px] leading-[1.5] whitespace-nowrap ${map[status] ?? map.draft}`}>
      {status[0].toUpperCase() + status.slice(1)}
    </span>
  );
}

export function AdminButton({
  children,
  onClick,
  href,
  variant = "primary",
  size = "md",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: "primary" | "outline" | "danger";
  size?: "sm" | "md";
}) {
  const cls = [
    "inline-flex items-center gap-2 font-semibold transition-colors whitespace-nowrap",
    size === "sm" ? "px-3 py-1.5 text-[13px]" : "px-4 py-2.5 text-[14px]",
    variant === "primary"
      ? "bg-spruce-800 text-snow-50 hover:bg-spruce-700"
      : variant === "danger"
        ? "border border-rhodo-600/50 text-rhodo-600 hover:bg-rhodo-600/8"
        : "border border-snow-300 hover:border-spruce-800",
  ].join(" ");
  if (href) return <Link href={href} className={cls}>{children}</Link>;
  return <button onClick={onClick} className={cls}>{children}</button>;
}

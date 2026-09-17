"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Mountain } from "lucide-react";

const NAV = [
  { href: "/treks", label: "Treks" },
  { href: "/departures", label: "Departures" },
  { href: "/green-trails", label: "Green Trails" },
  { href: "/stories", label: "Stories" },
  { href: "/about", label: "About" },
];

export function SiteHeader({ variant = "paper" }: { variant?: "paper" | "dark" }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const dark = variant === "dark";

  return (
    <header
      className={
        dark
          ? "on-dark relative z-30 border-b border-glacier-700/30 text-snow-100"
          : "relative z-30 border-b border-snow-300 bg-snow-100 text-spruce-800"
      }
    >
      <div className="mx-auto max-w-[1360px] px-5 sm:px-8">
        <div className="flex h-[70px] items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-2.5 shrink-0" aria-label="Indiahikes home">
            <Mountain
              className={dark ? "text-bugyal-400" : "text-deodar-600"}
              size={24}
              strokeWidth={1.75}
            />
            <span className="font-display text-[23px] leading-none">Indiahikes</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1" aria-label="Main">
            {NAV.map((n) => {
              const on = pathname.startsWith(n.href);
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  className={[
                    "px-3.5 py-2 text-[15px] transition-colors",
                    on
                      ? dark
                        ? "text-bugyal-400"
                        : "text-deodar-600 font-semibold"
                      : dark
                        ? "text-snow-200/80 hover:text-snow-50"
                        : "text-spruce-800/75 hover:text-spruce-800",
                  ].join(" ")}
                >
                  {n.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/admin"
              className={
                dark
                  ? "text-[14px] text-glacier-400 hover:text-snow-100 transition-colors"
                  : "text-[14px] text-snow-500 hover:text-spruce-800 transition-colors"
              }
            >
              Admin
            </Link>
            <Link
              href="/account"
              className={
                dark
                  ? "text-[15px] px-4 py-2 border border-glacier-700/60 hover:border-glacier-400 transition-colors"
                  : "text-[15px] px-4 py-2 border border-snow-300 hover:border-spruce-800 transition-colors"
              }
            >
              My treks
            </Link>
            <Link
              href="/treks"
              className="text-[15px] font-semibold px-4 py-2 bg-bugyal-500 text-spruce-900 hover:bg-bugyal-400 transition-colors"
            >
              Book a trek
            </Link>
          </div>

          <button
            className="lg:hidden p-2 -mr-2"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div
          className={
            dark
              ? "lg:hidden border-t border-glacier-700/30 bg-spruce-900"
              : "lg:hidden border-t border-snow-300 bg-snow-50"
          }
        >
          <nav className="mx-auto max-w-[1360px] px-5 py-3 flex flex-col" aria-label="Main">
            {[...NAV, { href: "/account", label: "My treks" }, { href: "/admin", label: "Admin panel" }].map(
              (n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="py-3 border-b last:border-b-0 border-current/10 text-[16px]"
                >
                  {n.label}
                </Link>
              )
            )}
            <Link
              href="/treks"
              onClick={() => setOpen(false)}
              className="mt-4 mb-2 text-center font-semibold px-4 py-3 bg-bugyal-500 text-spruce-900"
            >
              Book a trek
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

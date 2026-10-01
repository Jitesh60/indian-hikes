"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, Mountain, ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

const NAV = [
  { href: "/treks", label: "Treks" },
  { href: "/departures", label: "Departures" },
  { href: "/custom-treks", label: "Custom treks" },
  { href: "/stories", label: "Stories" },
  { href: "/about", label: "About" },
];

/**
 * Floating pill navigation.
 * `dark` is for pages that open on a full-bleed photo: the bar starts as
 * clear glass over the image and turns into light glass once you scroll.
 * `paper` pages get light glass from the start, plus a spacer so content
 * isn't hidden underneath the fixed bar. `light` is light glass with no
 * spacer, for pages that open on a bright full-bleed photo.
 */
export function SiteHeader({ variant = "paper" }: { variant?: "paper" | "dark" | "light" }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const overImage = variant === "dark" && !scrolled && !open;

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
        <div
          className={[
            "mx-auto max-w-[1320px] rounded-full transition-all duration-300",
            overImage
              ? "glass text-white"
              : "glass-light text-ink-900 shadow-[0_8px_30px_-12px_rgb(16_24_40/0.18)]",
          ].join(" ")}
        >
          <div className="flex h-[58px] items-center justify-between gap-4 pl-5 pr-2">
            <Link href="/" className="flex shrink-0 items-center gap-2" aria-label="HeyHikers home">
              <span
                className={`inline-flex h-8 w-8 items-center justify-center rounded-full ${
                  overImage ? "bg-white text-ink-900" : "bg-ink-900 text-white"
                }`}
              >
                <Mountain size={17} strokeWidth={2} />
              </span>
              <span className="text-[17px] font-semibold tracking-[-0.02em]">HeyHikers</span>
            </Link>

            <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Main">
              {NAV.map((n) => {
                const on = pathname.startsWith(n.href);
                return (
                  <Link
                    key={n.href}
                    href={n.href}
                    aria-current={on ? "page" : undefined}
                    className={[
                      "rounded-full px-4 py-2 text-[14px] transition-colors",
                      on
                        ? overImage
                          ? "bg-white/20 font-medium"
                          : "bg-ink-900 font-medium text-white"
                        : overImage
                          ? "text-white/80 hover:bg-white/10 hover:text-white"
                          : "text-ink-600 hover:bg-mist-200 hover:text-ink-900",
                    ].join(" ")}
                  >
                    {n.label}
                  </Link>
                );
              })}
            </nav>

            <div className="hidden items-center gap-1.5 lg:flex">
              <Link
                href="/admin"
                className={`rounded-full px-3 py-2 text-[13.5px] transition-colors ${
                  overImage ? "text-white/60 hover:text-white" : "text-ink-400 hover:text-ink-900"
                }`}
              >
                Admin
              </Link>
              <Link
                href="/account"
                className={`rounded-full px-4 py-2 text-[14px] transition-colors ${
                  overImage ? "hover:bg-white/10" : "hover:bg-mist-200"
                }`}
              >
                My treks
              </Link>
              <Link
                href="/treks"
                className={`inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-[14px] font-medium transition-colors ${
                  overImage ? "bg-white text-ink-900 hover:bg-mist-100" : "bg-ink-900 text-white hover:bg-ink-700"
                }`}
              >
                Book a trek <ArrowUpRight size={15} />
              </Link>
            </div>

            <button
              className={`inline-flex h-10 w-10 items-center justify-center rounded-full lg:hidden ${
                overImage ? "bg-white/15" : "bg-mist-200"
              }`}
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.nav
              id="mobile-nav"
              aria-label="Main"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="glass-light mx-auto mt-2 flex max-w-[1320px] flex-col rounded-[24px] p-3 text-ink-900 shadow-soft lg:hidden"
            >
              {[...NAV, { href: "/account", label: "My treks" }, { href: "/admin", label: "Admin panel" }].map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="rounded-2xl px-4 py-3 text-[16px] hover:bg-mist-200"
                >
                  {n.label}
                </Link>
              ))}
              <Link
                href="/treks"
                onClick={() => setOpen(false)}
                className="mt-2 rounded-full bg-ink-900 px-4 py-3 text-center font-medium text-white"
              >
                Book a trek
              </Link>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>
      {variant === "paper" && <div className="h-[82px] sm:h-[90px]" aria-hidden="true" />}
    </>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";

/**
 * Glass pill tab bar for a trek page. Each tab is an in-page anchor; the
 * active one follows the section you're reading. Sticks under the header.
 */
export function TrekTabs({
  tabs,
  cta,
}: {
  tabs: { id: string; label: string }[];
  cta?: { href: string; label: string };
}) {
  const [active, setActive] = useState(tabs[0]?.id);
  const railRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = tabs
      .map((t) => document.getElementById(t.id))
      .filter((el): el is HTMLElement => !!el);
    if (!els.length) return;

    // The section whose top has most recently passed the tab bar is "current".
    const pick = () => {
      const line = 200;
      let current = els[0].id;
      for (const el of els) {
        if (el.getBoundingClientRect().top - line <= 0) current = el.id;
      }
      // At the very bottom of the page the last section may never reach the line.
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        const last = els[els.length - 1];
        if (last.getBoundingClientRect().top < window.innerHeight) current = last.id;
      }
      setActive(current);
    };
    pick();
    window.addEventListener("scroll", pick, { passive: true });
    window.addEventListener("resize", pick);
    return () => {
      window.removeEventListener("scroll", pick);
      window.removeEventListener("resize", pick);
    };
  }, [tabs]);

  // Keep the active tab visible when the rail scrolls sideways on phones.
  useEffect(() => {
    const rail = railRef.current;
    const el = rail?.querySelector<HTMLElement>(`[data-tab="${active}"]`);
    if (!rail || !el) return;
    const left = el.offsetLeft - rail.offsetLeft;
    if (left < rail.scrollLeft || left + el.offsetWidth > rail.scrollLeft + rail.clientWidth) {
      rail.scrollTo({ left: left - 8, behavior: "smooth" });
    }
  }, [active]);

  return (
    <nav
      aria-label="On this page"
      className="glass-light mx-auto flex max-w-fit items-center gap-1 rounded-full p-1.5 shadow-[0_10px_30px_-14px_rgb(16_24_40/0.3)]"
    >
      <div ref={railRef} className="no-scrollbar flex min-w-0 items-center gap-0.5 overflow-x-auto">
        {tabs.map((t) => {
          const on = t.id === active;
          return (
            <a
              key={t.id}
              href={`#${t.id}`}
              data-tab={t.id}
              aria-current={on ? "location" : undefined}
              onClick={() => setActive(t.id)}
              className={[
                "shrink-0 whitespace-nowrap rounded-full px-3.5 py-2 text-[13.5px] transition-colors sm:px-4 sm:text-[14px]",
                on ? "bg-ink-900 font-medium text-white" : "text-ink-600 hover:bg-white hover:text-ink-900",
              ].join(" ")}
            >
              {t.label}
            </a>
          );
        })}
      </div>
      {cta && (
        <a
          href={cta.href}
          className="ml-1 hidden shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full bg-ember-500 px-4 py-2 text-[14px] font-medium text-white transition-colors hover:bg-ember-600 sm:inline-flex"
        >
          {cta.label} <ArrowUpRight size={15} aria-hidden="true" />
        </a>
      )}
    </nav>
  );
}

import type { ReactNode } from "react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";

export function InfoShell({
  title,
  intro,
  children,
}: {
  title: string;
  intro: string;
  children: ReactNode;
}) {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-[1360px] px-5 sm:px-8 py-12 sm:py-16">
        <header className="mb-12 max-w-[56ch]">
          <h1 className="font-display text-[clamp(2.3rem,5vw,3.4rem)] leading-[1.03]">{title}</h1>
          <p className="mt-5 text-[17px] leading-relaxed text-spruce-800/70">{intro}</p>
        </header>
        {children}
      </main>
      <SiteFooter />
    </>
  );
}

export function Prose({ children }: { children: ReactNode }) {
  return <div className="space-y-5 text-[17px] leading-[1.68] text-spruce-800/85 measure">{children}</div>;
}

export function H2({ children }: { children: ReactNode }) {
  return (
    <h2 className="font-display text-[clamp(1.6rem,3vw,2.2rem)] leading-tight mt-14 mb-5 first:mt-0">
      {children}
    </h2>
  );
}

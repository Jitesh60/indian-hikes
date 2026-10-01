import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Photo } from "@/components/site/Photo";
import { Reveal } from "@/components/site/motion";
import { Avatar, Eyebrow } from "@/components/site/ui";
import { StoryCard, storyDate, storyPhoto } from "@/components/site/content/stories";
import { stories } from "@/data/stories";
import { treks } from "@/data/treks";
import { brand } from "@/data/brand";

export const metadata: Metadata = {
  title: "Stories",
  description: `Planning guides, fitness plans and field notes from the ${brand.name} team.`,
};

export default function StoriesPage() {
  const [lead, ...rest] = stories;
  const leadTrek = treks.find((t) => t.slug === lead.trek);

  return (
    <>
      <SiteHeader />
      <main className="px-3 pb-16 sm:px-5 sm:pb-24">
        <div className="mx-auto max-w-[1320px]">
          <header className="grid gap-x-10 gap-y-5 px-2 pb-8 pt-6 sm:pb-12 sm:pt-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-end">
            <div>
              <div className="mb-4">
                <Eyebrow>Stories and field notes</Eyebrow>
              </div>
              <h1 className="font-display text-[clamp(2.4rem,6vw,4.4rem)] leading-[1.0] text-ink-900">
                What we know, written down
              </h1>
            </div>
            <p className="max-w-[52ch] text-[16.5px] leading-relaxed text-ink-500 sm:text-[17px] lg:justify-self-end">
              When to go, how to train, what to pack and how altitude works — guidance from
              the {brand.name} team for anyone heading up next.
            </p>
          </header>

          {/* Lead story */}
          <Link
            href={`/stories/${lead.slug}`}
            className="group relative flex min-h-[540px] items-end overflow-hidden rounded-bento bg-ink-900 p-3 sm:p-5 sm:min-h-[560px] lg:aspect-[21/9] lg:min-h-0"
          >
            <Photo
              name={storyPhoto(lead)}
              width={2000}
              priority
              alt=""
              imgClassName="transition-transform duration-[1200ms] group-hover:scale-[1.04]"
            />
            <div className="scrim-b absolute inset-0" aria-hidden="true" />
            <div className="glass relative w-full max-w-[640px] rounded-[24px] p-5 sm:p-8">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-white px-3 py-1.5 text-[12px] font-medium leading-none text-ink-900">
                  {lead.category}
                </span>
                <span className="nums text-[13px] text-white/75">
                  <time dateTime={lead.date}>{storyDate(lead.date)}</time> · {lead.minutes} min read
                </span>
              </div>
              <h2 className="font-display mt-4 text-[clamp(1.7rem,3.6vw,2.8rem)] leading-[1.05] text-white">
                {lead.title}
              </h2>
              <p className="mt-3 line-clamp-3 text-[15.5px] leading-relaxed text-white/80 sm:text-[16.5px]">
                {lead.standfirst}
              </p>
              <div className="mt-6 flex items-center justify-between gap-4">
                <div className="flex min-w-0 items-center gap-3">
                  <Avatar name={lead.author} size={40} tone="ice" />
                  <div className="min-w-0">
                    <p className="truncate text-[14px] font-medium text-white">{lead.author}</p>
                    <p className="truncate text-[12.5px] text-white/65">
                      {lead.role}
                      {leadTrek ? ` · ${leadTrek.name}` : ""}
                    </p>
                  </div>
                </div>
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-ink-900 transition-colors group-hover:bg-forest-500 group-hover:text-white">
                  <ArrowUpRight size={18} />
                  <span className="sr-only">Read the story</span>
                </span>
              </div>
            </div>
          </Link>

          {/* The rest */}
          <section aria-labelledby="latest" className="pt-14 sm:pt-20">
            <div className="mb-8 flex items-end justify-between gap-4 px-2">
              <h2 id="latest" className="font-display text-[clamp(1.8rem,3.4vw,2.6rem)] leading-tight text-ink-900">
                Latest from the trail
              </h2>
              <span className="nums text-[13px] text-ink-400">{rest.length} stories</span>
            </div>
            {/* Two featured cards, then the rest three across */}
            <div className="grid gap-3 sm:gap-5 md:grid-cols-2">
              {rest.slice(0, 2).map((s, i) => (
                <Reveal key={s.slug} delay={i * 0.07} className="h-full">
                  <StoryCard story={s} wide />
                </Reveal>
              ))}
            </div>
            {rest.length > 2 && (
              <div className="mt-3 grid gap-3 sm:mt-5 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
                {rest.slice(2).map((s, i) => (
                  <Reveal key={s.slug} delay={i * 0.07} className="h-full">
                    <StoryCard story={s} />
                  </Reveal>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

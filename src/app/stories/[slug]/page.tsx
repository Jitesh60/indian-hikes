import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Photo } from "@/components/site/Photo";
import { TrekCard } from "@/components/site/TrekViews";
import { Reveal } from "@/components/site/motion";
import { Avatar, Button } from "@/components/site/ui";
import { StoryCard, storyDate, storyPhoto } from "@/components/site/content/stories";
import { stories, storyBySlug } from "@/data/stories";
import { trekBySlug } from "@/data/treks";

export function generateStaticParams() {
  return stories.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const s = storyBySlug(slug);
  return s ? { title: s.title, description: s.standfirst } : { title: "Story not found" };
}

export default async function StoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const story = storyBySlug(slug);
  if (!story) notFound();
  const trek = trekBySlug(story.trek);
  const more = stories.filter((s) => s.slug !== story.slug).slice(0, 3);

  return (
    <>
      <SiteHeader variant="dark" />
      <main className="px-3 pb-16 pt-3 sm:px-5 sm:pb-24 sm:pt-4">
        <div className="mx-auto max-w-[1320px]">
          {/* Hero */}
          <header className="relative flex min-h-[580px] items-end overflow-hidden rounded-bento bg-ink-900 sm:min-h-[620px] lg:min-h-[680px]">
            <Photo name={storyPhoto(story)} width={2000} priority alt="" />
            <div className="absolute inset-0 bg-ink-950/25" aria-hidden="true" />
            <div className="scrim-b absolute inset-0" aria-hidden="true" />
            <div className="relative w-full px-5 pb-7 pt-[130px] sm:px-10 sm:pb-12 lg:px-14">
              <Link
                href="/stories"
                className="glass inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12.5px] font-medium text-white hover:bg-white/25"
              >
                <ArrowLeft size={14} /> Stories
              </Link>
              <p className="mt-6 text-[13px] font-medium uppercase tracking-[0.16em] text-white/70">
                <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-ember-500 align-middle" aria-hidden="true" />
                {story.category}
              </p>
              <h1 className="font-display mt-3 max-w-[20ch] text-[clamp(2.2rem,5.6vw,4.4rem)] leading-[1.02] text-white">
                {story.title}
              </h1>
              <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
                <div className="flex items-center gap-3">
                  <Avatar name={story.author} size={44} tone="ice" />
                  <div>
                    <p className="text-[15px] font-medium text-white">{story.author}</p>
                    <p className="text-[13px] text-white/65">{story.role}</p>
                  </div>
                </div>
                <div className="glass nums inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-[13px] text-white">
                  <time dateTime={story.date}>{storyDate(story.date, "long")}</time>
                  <span className="text-white/40">·</span>
                  <Clock size={13} /> {story.minutes} min read
                </div>
              </div>
            </div>
          </header>

          {/* Article + trek */}
          <div className="mt-3 grid gap-3 sm:mt-5 sm:gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
            <article className="min-w-0 rounded-bento bg-white px-5 py-9 shadow-soft sm:px-10 sm:py-14 lg:px-16">
              <div className="mx-auto max-w-[68ch]">
                <p className="text-[20px] font-medium leading-[1.55] tracking-[-0.01em] text-ink-900 sm:text-[22px]">
                  {story.standfirst}
                </p>
                <div className="my-8 h-px bg-mist-200 sm:my-10" />
                {story.body.map((para, i) => (
                  <p key={i} className={`text-[17px] leading-[1.75] text-ink-700 sm:text-[18px] ${i ? "mt-6" : ""}`}>
                    {para}
                  </p>
                ))}

                <div className="mt-12 flex items-start gap-4 rounded-[22px] bg-mist-100 p-5 sm:p-6">
                  <Avatar name={story.author} size={48} tone="ink" />
                  <p className="text-[14.5px] leading-relaxed text-ink-600">
                    Written by <span className="font-medium text-ink-900">{story.author}</span>,{" "}
                    {story.role.toLowerCase()}. Field notes are published as they were filed, with
                    names of trekkers changed unless they asked us to keep them.
                  </p>
                </div>
              </div>
            </article>

            {trek && (
              <aside className="min-w-0">
                <div className="grid gap-3 lg:sticky lg:top-28">
                  <p className="px-2 pt-1 text-[13px] font-medium uppercase tracking-[0.14em] text-ink-500 lg:pt-0">
                    This story came off
                  </p>
                  <TrekCard trek={trek} />
                </div>
              </aside>
            )}
          </div>

          {/* More stories */}
          <section aria-labelledby="read-next" className="pt-14 sm:pt-20">
            <div className="mb-8 flex items-end justify-between gap-4 px-2">
              <h2 id="read-next" className="font-display text-[clamp(1.8rem,3.4vw,2.6rem)] leading-tight text-ink-900">
                Read next
              </h2>
              <Button href="/stories" variant="outline" size="sm">
                All stories
              </Button>
            </div>
            <div className="grid gap-3 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
              {more.map((s, i) => (
                <Reveal key={s.slug} delay={i * 0.07} className={`h-full ${i === 2 ? "md:hidden xl:block" : ""}`}>
                  <StoryCard story={s} />
                </Reveal>
              ))}
            </div>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

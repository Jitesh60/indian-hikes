import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { RidgeArt } from "@/components/viz/RidgeArt";
import { AltitudeSpark } from "@/components/viz/AltitudeProfile";
import { Pill } from "@/components/site/ui";
import { stories, storyBySlug } from "@/data/stories";
import { trekBySlug } from "@/data/treks";
import { inr } from "@/lib/types";

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
  const more = stories.filter((s) => s.slug !== story.slug).slice(0, 2);

  return (
    <>
      <SiteHeader />
      <main>
        <article className="mx-auto max-w-[1360px] px-5 sm:px-8 py-12 sm:py-16">
          <div className="max-w-[720px]">
            <Pill tone={story.category === "Green Trails" ? "green" : story.category === "Safety" ? "red" : "neutral"}>
              {story.category}
            </Pill>
            <h1 className="font-display text-[clamp(2.2rem,5vw,3.4rem)] leading-[1.03] mt-5">
              {story.title}
            </h1>
            <p className="mt-5 text-[19px] leading-relaxed text-spruce-800/70">{story.standfirst}</p>
            <div className="nums mt-7 pt-5 border-t border-snow-300 flex flex-wrap gap-x-6 gap-y-1 text-[13.5px] text-snow-500">
              <span className="text-spruce-800">{story.author}</span>
              <span>{story.role}</span>
              <span>
                {new Date(story.date).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <span>{story.minutes} min read</span>
            </div>
          </div>

          <div className="relative aspect-[21/9] overflow-hidden bg-spruce-800 my-12">
            <RidgeArt seed={story.slug} tone="warm" className="w-full h-full" />
          </div>

          <div className="grid lg:grid-cols-[minmax(0,720px)_minmax(0,1fr)] gap-x-16">
            <div>
              {story.body.map((para, i) => (
                <p
                  key={i}
                  className={`text-[18px] leading-[1.72] text-spruce-800/88 ${i ? "mt-6" : ""}`}
                >
                  {para}
                </p>
              ))}

              <div className="mt-12 pt-8 border-t border-snow-300">
                <p className="text-[15px] text-spruce-800/70 leading-relaxed measure">
                  Written by {story.author}, {story.role.toLowerCase()}. Field notes are
                  published as they were filed, with names of trekkers changed unless they
                  asked us to keep them.
                </p>
              </div>
            </div>

            {trek && (
              <aside className="mt-12 lg:mt-0">
                <div className="lg:sticky lg:top-6 border border-snow-300 bg-snow-50">
                  <div className="relative aspect-[16/9] bg-spruce-800">
                    <RidgeArt seed={trek.slug} tone="cool" className="w-full h-full" />
                  </div>
                  <div className="p-5">
                    <p className="text-[12.5px] text-snow-500">This story came off</p>
                    <h2 className="font-display-tight text-[22px] leading-tight mt-1">{trek.name}</h2>
                    <div className="text-spruce-800/60 my-3">
                      <AltitudeSpark profile={trek.profile} width={200} height={40} />
                    </div>
                    <p className="nums text-[13.5px] text-snow-500">
                      {trek.maxAltFt.toLocaleString("en-IN")} ft · {trek.days} days · {trek.difficulty}
                    </p>
                    <Link
                      href={`/treks/${trek.slug}`}
                      className="block text-center mt-5 bg-bugyal-500 text-spruce-900 px-4 py-3 font-semibold hover:bg-bugyal-400 transition-colors"
                    >
                      Open the trek · {inr(trek.price)}
                    </Link>
                  </div>
                </div>
              </aside>
            )}
          </div>
        </article>

        <section className="border-t border-snow-300">
          <div className="mx-auto max-w-[1360px] px-5 sm:px-8 py-14">
            <h2 className="font-display text-[26px] mb-7">Read next</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {more.map((s) => (
                <Link key={s.slug} href={`/stories/${s.slug}`} className="group flex gap-5 items-start">
                  <div className="relative w-[130px] aspect-[4/3] shrink-0 overflow-hidden bg-spruce-800">
                    <RidgeArt seed={s.slug} tone="warm" className="w-full h-full" />
                  </div>
                  <div>
                    <h3 className="font-display-tight text-[19px] leading-tight group-hover:text-deodar-600 transition-colors">
                      {s.title}
                    </h3>
                    <p className="nums mt-2 text-[13px] text-snow-500">
                      {s.author} · {s.minutes} min
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

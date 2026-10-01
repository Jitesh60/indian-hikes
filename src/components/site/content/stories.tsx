import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Photo } from "@/components/site/Photo";
import { trekCover, type PhotoKey } from "@/data/photos";
import type { Story } from "@/data/stories";

/** A fitting photograph per story; anything unmapped falls back to its trek's cover. */
const STORY_PHOTOS: Record<string, PhotoKey> = {
  "best-time-to-trek-himalayas-month-by-month": "kanchenjunga",
  "how-to-train-for-himalayan-trek-8-weeks": "ridgeWalkers",
  "what-12000-feet-does-to-you": "snowTrekkers",
  "reading-a-himalayan-weather-window": "silhouette",
  "what-actually-goes-in-the-backpack": "gearFlatlay",
};

export function storyPhoto(story: Story): PhotoKey {
  return STORY_PHOTOS[story.slug] ?? trekCover(story.trek);
}

export function storyDate(date: string, month: "short" | "long" = "short") {
  return new Date(date).toLocaleDateString("en-IN", { day: "numeric", month, year: "numeric", timeZone: "UTC" });
}

/** Blog card: rounded photo with a category pill, then date, title, standfirst and "Read more". */
export function StoryCard({ story, wide = false }: { story: Story; wide?: boolean }) {
  return (
    <Link
      href={`/stories/${story.slug}`}
      className="group flex h-full flex-col rounded-bento bg-white p-2.5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_50px_-24px_rgb(16_24_40/0.35)]"
    >
      <div className={`relative overflow-hidden rounded-[20px] ${wide ? "aspect-[4/3] sm:aspect-[16/10]" : "aspect-[4/3]"}`}>
        <Photo
          name={storyPhoto(story)}
          width={900}
          alt=""
          imgClassName="transition-transform duration-700 group-hover:scale-[1.06]"
        />
        <span className="glass-dark absolute left-2.5 top-2.5 rounded-full px-3 py-1.5 text-[12px] font-medium leading-none text-white">
          {story.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col px-2.5 pb-3 pt-4 sm:px-3.5">
        <p className="nums text-[13px] text-ink-400">
          <time dateTime={story.date}>{storyDate(story.date)}</time> · {story.minutes} min read
        </p>
        <h3
          className={`mt-2 font-semibold leading-[1.2] tracking-[-0.02em] text-ink-900 ${
            wide ? "text-[20px] sm:text-[24px]" : "text-[20px]"
          }`}
        >
          {story.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-[14.5px] leading-snug text-ink-500">{story.standfirst}</p>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-[14px] font-medium text-ink-900">
          Read more
          <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

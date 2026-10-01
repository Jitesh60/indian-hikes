"use client";

import { useEffect, useRef, useState } from "react";
import { photos, photoUrl, type PhotoKey } from "@/data/photos";

/**
 * A real photograph that fills its parent (the parent must be positioned
 * and sized). While it loads, a softened preview decoded from the photo's
 * own BlurHash sits underneath — the same colours and composition, just
 * out of focus — and the sharp image fades in over it.
 */
export function Photo({
  name,
  width = 1600,
  className = "",
  imgClassName = "",
  priority = false,
  alt,
  position = "center",
  sizes,
}: {
  name: PhotoKey;
  width?: number;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  /** Override the registry alt text; pass "" for purely decorative use. */
  alt?: string;
  position?: string;
  sizes?: string;
}) {
  const def = photos[name] as (typeof photos)[PhotoKey] | undefined;
  const ref = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);

  // The image can finish loading before hydration attaches onLoad.
  useEffect(() => {
    const img = ref.current;
    if (img?.complete && img.naturalWidth > 0) setLoaded(true);
  }, []);

  if (!def) {
    if (process.env.NODE_ENV !== "production") console.warn(`<Photo>: unknown photo "${String(name)}"`);
    return <div className={`absolute inset-0 bg-mist-200 ${className}`} aria-hidden="true" />;
  }

  const w = Math.min(width, 2400);
  const srcSet = [0.5, 1, 1.5]
    .map((f) => Math.round(w * f))
    .filter((x) => x >= 240 && x <= Math.min(3200, def.width))
    .map((x) => `${photoUrl(name, x)} ${x}w`)
    .join(", ");

  return (
    <div
      className={`absolute inset-0 overflow-hidden ${def.tone === "dark" ? "bg-ink-900" : "bg-mist-200"} ${className}`}
    >
      <div
        aria-hidden="true"
        className={`absolute inset-0 scale-110 bg-cover bg-center blur-xl transition-opacity duration-700 ${
          loaded ? "opacity-0" : "opacity-100"
        }`}
        style={{ backgroundImage: `url(${def.blur})`, backgroundPosition: position }}
      />
      {/* Plain <img>: Unsplash's CDN already resizes and negotiates format,
          so there's nothing for next/image to add. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={ref}
        src={photoUrl(name, w)}
        srcSet={srcSet || undefined}
        sizes={sizes ?? `(max-width: 768px) 100vw, ${Math.round(w / 1.6)}px`}
        alt={alt ?? def.alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        decoding="async"
        onLoad={() => setLoaded(true)}
        style={{ objectPosition: position }}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
          loaded ? "opacity-100" : "opacity-0"
        } ${imgClassName}`}
      />
    </div>
  );
}

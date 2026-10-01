"use client";

import { useEffect, useRef, useState } from "react";
import { photos, photoUrl, type PhotoKey } from "@/data/photos";
import { RidgeArt } from "@/components/viz/RidgeArt";

/**
 * A photograph that fills its parent (the parent must be positioned and
 * sized). Generated ridge artwork sits underneath, so the slot is never
 * empty: it shows while the photo loads, and stays if the photo fails.
 */
export function Photo({
  name,
  width = 1600,
  className = "",
  imgClassName = "",
  priority = false,
  alt,
  position = "center",
}: {
  name: PhotoKey;
  width?: number;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  /** Override the registry alt text; pass "" for purely decorative use. */
  alt?: string;
  position?: string;
}) {
  const def = photos[name];
  const ref = useRef<HTMLImageElement>(null);
  const [state, setState] = useState<"loading" | "loaded" | "error">("loading");

  // The image can finish loading before hydration attaches onLoad.
  useEffect(() => {
    const img = ref.current;
    if (img?.complete) setState(img.naturalWidth > 0 ? "loaded" : "error");
  }, []);

  return (
    <div className={`absolute inset-0 overflow-hidden ${def.tone === "dark" ? "bg-ink-900" : "bg-mist-200"} ${className}`}>
      {state !== "loaded" && (
        <RidgeArt
          seed={def.id}
          tone={def.tone ?? "cool"}
          className="absolute inset-0 h-full w-full"
        />
      )}
      {state !== "error" && (
        // Plain <img>: Unsplash serves through a redirect, which next/image
        // cannot optimise, and we want the browser to fetch it directly.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          ref={ref}
          src={photoUrl(name, width)}
          alt={alt ?? def.alt}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : undefined}
          decoding="async"
          referrerPolicy="no-referrer"
          onLoad={() => setState("loaded")}
          onError={() => setState("error")}
          style={{ objectPosition: position }}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            state === "loaded" ? "opacity-100" : "opacity-0"
          } ${imgClassName}`}
        />
      )}
    </div>
  );
}

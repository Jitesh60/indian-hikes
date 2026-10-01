import { CompassLoader } from "@/components/fx";

/** Shown while a route's server content streams in. */
export default function Loading() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <CompassLoader size={64} tone="light" label="Loading the trail…" />
    </div>
  );
}

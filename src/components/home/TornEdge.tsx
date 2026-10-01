/**
 * A torn-paper edge: a ragged strip filled with the page colour, laid over
 * the bottom (or top) of a photo so the image looks ripped out of the page.
 * The path is generated from a fixed seed, so server and client agree.
 */
function tornPath(seed: number, w: number, h: number) {
  let s = seed;
  const rand = () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
  const pts: string[] = [`M0,${h}`, `L0,${(h * 0.55).toFixed(1)}`];
  let x = 0;
  while (x < w) {
    x = Math.min(w, x + 6 + rand() * 22);
    // big slow waves plus small jagged teeth
    const wave = Math.sin((x / w) * Math.PI * 3.2 + seed) * h * 0.18;
    const tooth = (rand() - 0.5) * h * 0.32;
    const y = h * 0.5 + wave + tooth;
    pts.push(`L${x.toFixed(1)},${Math.max(2, Math.min(h - 2, y)).toFixed(1)}`);
  }
  pts.push(`L${w},${h}`, "Z");
  return pts.join(" ");
}

export function TornEdge({
  className = "",
  flip = false,
  seed = 7,
  fill = "var(--page)",
}: {
  className?: string;
  /** Tear along the top of a section instead of the bottom. */
  flip?: boolean;
  seed?: number;
  fill?: string;
}) {
  const w = 1440;
  const h = 70;
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="none"
      aria-hidden="true"
      className={`pointer-events-none absolute inset-x-0 h-[46px] w-full sm:h-[70px] ${
        flip ? "top-0 -translate-y-px rotate-180" : "bottom-0 translate-y-px"
      } ${className}`}
    >
      {/* a soft shadow line under the paper lip */}
      <path d={tornPath(seed, w, h)} fill="rgb(0 0 0 / 0.08)" transform="translate(0,-3)" />
      <path d={tornPath(seed, w, h)} fill={fill} />
    </svg>
  );
}

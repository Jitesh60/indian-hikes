import { ft2m, type ProfilePoint } from "@/lib/types";

/** The single warm accent (forest-500 / forest-600 in globals.css). */
const EMBER = "#1f6b4a";
const EMBER_DEEP = "#17563b";

/**
 * The day-by-day altitude profile of a trek, drawn from real numbers.
 * Line and type take `currentColor` (set it with a text colour on the
 * parent); the summit is picked out in ember. Built to sit on a white card.
 */
export function AltitudeProfile({
  profile,
  height = 300,
  showLabels = true,
  fontScale = 1,
}: {
  profile: ProfilePoint[];
  height?: number;
  showLabels?: boolean;
  /** The SVG scales to its container, so type must be scaled up on narrow
   *  viewports or the axis labels render at four or five pixels. */
  fontScale?: number;
}) {
  const fs = (n: number) => (n * fontScale).toFixed(1);
  const W = 1000;
  const H = height;
  const padL = 56 * fontScale;
  const padR = 22 * fontScale;
  const padT = 46 * fontScale;

  // How the day labels fit under the points. Rough text widths in viewBox
  // units: a full label (name + "Day N · m") needs ~125, "Day N" ~50.
  const spacing = (W - padL - padR) / Math.max(profile.length - 1, 1);
  const fits = (w: number) => spacing >= w * fontScale;
  const mode: "full" | "stagger" | "compact" | "compact-stagger" = fits(125)
    ? "full"
    : spacing * 2 >= 125 * fontScale
      ? "stagger"
      : fits(50)
        ? "compact"
        : "compact-stagger";
  const staggered = mode === "stagger" || mode === "compact-stagger";
  const padB = (showLabels ? (staggered ? 100 : 62) : 26) * fontScale;

  const alts = profile.map((d) => d.altFt);
  const peak = Math.max(...alts);
  const peakIdx = alts.indexOf(peak);
  const lo = Math.floor(Math.min(...alts) / 1000) * 1000;
  const hi = Math.ceil(peak / 1000) * 1000;
  const span = Math.max(hi - lo, 1000);

  const x = (i: number) => padL + (i / Math.max(profile.length - 1, 1)) * (W - padL - padR);
  const y = (a: number) => padT + (1 - (a - lo) / span) * (H - padT - padB);

  const pts = profile.map((d, i) => [x(i), y(d.altFt)] as const);
  const line = pts.map(([px, py], i) => `${i ? "L" : "M"}${px.toFixed(1)},${py.toFixed(1)}`).join(" ");
  const area = `${line} L${pts[pts.length - 1][0].toFixed(1)},${H - padB} L${pts[0][0].toFixed(1)},${H - padB} Z`;

  const gridLines: number[] = [];
  // Space the gridlines so their labels never touch, whatever the height.
  const plotH = H - padT - padB;
  const step =
    [1000, 2000, 4000, 5000].find((st) => (plotH * st) / span >= 26 * fontScale) ?? 5000;
  for (let a = lo; a <= hi; a += step) gridLines.push(a);

  // Several copies of the chart can share a page (e.g. a phone and a desktop
  // version, one hidden). Gradients in a display:none SVG don't paint, so
  // each copy needs its own id.
  const gid = `alt-fill-${H}-${String(fontScale).replace(".", "_")}-${showLabels ? 1 : 0}-${alts.join("")}`;

  const peakLabel = `${peak.toLocaleString("en-IN")} ft`;
  const peakLabelW = (peakLabel.length * 7.4 + 22) * fontScale;
  const peakLabelH = 24 * fontScale;
  // Keep the summit tag inside the chart when the summit is the first or last day.
  const peakLabelX = Math.min(Math.max(x(peakIdx), padL + peakLabelW / 2), W - padR - peakLabelW / 2);
  const peakLabelY = y(peak) - 16 * fontScale - peakLabelH;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="h-auto w-full overflow-visible"
      role="img"
      aria-label={`Altitude profile: ${profile
        .map((d) => `day ${d.day} ${d.label} at ${d.altFt} feet`)
        .join(", ")}`}
    >
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.14" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.01" />
        </linearGradient>
        <linearGradient id={`${gid}-ember`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={EMBER} stopOpacity="0.5" />
          <stop offset="100%" stopColor={EMBER} stopOpacity="0" />
        </linearGradient>
      </defs>

      {gridLines.map((a) => (
        <g key={a}>
          <line
            x1={padL}
            x2={W - padR}
            y1={y(a)}
            y2={y(a)}
            stroke="currentColor"
            strokeOpacity="0.1"
            strokeDasharray={`${2 * fontScale} ${6 * fontScale}`}
          />
          <text
            x={padL - 12 * fontScale}
            y={y(a) + 4 * fontScale}
            textAnchor="end"
            className="nums"
            fontSize={fs(12)}
            fill="currentColor"
            fillOpacity="0.45"
          >
            {(a / 1000).toFixed(0)}k
          </text>
        </g>
      ))}

      <path d={area} fill={`url(#${gid})`} />

      {/* Ember drop from the summit to the baseline */}
      <rect
        x={x(peakIdx) - 1 * fontScale}
        y={y(peak)}
        width={2 * fontScale}
        height={Math.max(H - padB - y(peak), 0)}
        fill={`url(#${gid}-ember)`}
      />

      <path
        d={line}
        fill="none"
        stroke="currentColor"
        strokeWidth={2.5 * Math.max(fontScale * 0.75, 1)}
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {profile.map((d, i) => {
        const isPeak = i === peakIdx;
        return (
          <g key={d.day}>
            {!isPeak && (
              <line
                x1={x(i)}
                x2={x(i)}
                y1={y(d.altFt) + 6 * fontScale}
                y2={H - padB}
                stroke="currentColor"
                strokeOpacity="0.08"
              />
            )}
            {isPeak && (
              <circle cx={x(i)} cy={y(d.altFt)} r={13 * fontScale} fill={EMBER} fillOpacity="0.16" />
            )}
            <circle
              cx={x(i)}
              cy={y(d.altFt)}
              r={(isPeak ? 6.5 : 4.5) * fontScale}
              fill={isPeak ? EMBER : "#ffffff"}
              stroke={isPeak ? "#ffffff" : "currentColor"}
              strokeWidth={(isPeak ? 2.5 : 2) * fontScale}
            />
            {showLabels && (
              <>
                <text
                  x={x(i)}
                  y={H - padB + (22 + (staggered && i % 2 ? 38 : 0)) * fontScale}
                  textAnchor="middle"
                  fontSize={fs(12.5)}
                  fontWeight="600"
                  fill={isPeak ? EMBER_DEEP : "currentColor"}
                  fillOpacity={isPeak ? 1 : 0.85}
                >
                  {mode === "full" || mode === "stagger"
                    ? d.label.length > 17
                      ? d.label.slice(0, 16) + "…"
                      : d.label
                    : `Day ${d.day}`}
                </text>
                <text
                  x={x(i)}
                  y={H - padB + (40 + (staggered && i % 2 ? 38 : 0)) * fontScale}
                  textAnchor="middle"
                  className="nums"
                  fontSize={fs(11.5)}
                  fill="currentColor"
                  fillOpacity="0.45"
                >
                  {mode === "full" || mode === "stagger"
                    ? `Day ${d.day} · ${ft2m(d.altFt).toLocaleString("en-IN")} m`
                    : `${(d.altFt / 1000).toFixed(1)}k ft`}
                </text>
              </>
            )}
          </g>
        );
      })}

      {/* Summit tag */}
      <g>
        <rect
          x={peakLabelX - peakLabelW / 2}
          y={peakLabelY}
          width={peakLabelW}
          height={peakLabelH}
          rx={peakLabelH / 2}
          fill="currentColor"
        />
        <text
          x={peakLabelX}
          y={peakLabelY + peakLabelH / 2 + 4.3 * fontScale}
          textAnchor="middle"
          className="nums"
          fontSize={fs(12.5)}
          fontWeight="600"
          fill="#ffffff"
        >
          {peakLabel}
        </text>
      </g>
    </svg>
  );
}

/** Compact inline version used in the trek register rows. */
export function AltitudeSpark({
  profile,
  width = 132,
  height = 34,
}: {
  profile: ProfilePoint[];
  width?: number;
  height?: number;
}) {
  const alts = profile.map((d) => d.altFt);
  const lo = Math.min(...alts);
  const hi = Math.max(...alts);
  const span = Math.max(hi - lo, 1);
  const x = (i: number) => (i / Math.max(profile.length - 1, 1)) * (width - 6) + 3;
  const y = (a: number) => height - 3 - ((a - lo) / span) * (height - 8);
  const pts = profile.map((d, i) => [x(i), y(d.altFt)] as const);
  const line = pts.map(([px, py], i) => `${i ? "L" : "M"}${px.toFixed(1)},${py.toFixed(1)}`).join(" ");
  const peakIdx = alts.indexOf(hi);

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} aria-hidden="true">
      <path
        d={`${line} L${x(pts.length - 1)},${height} L${x(0)},${height} Z`}
        fill="currentColor"
        fillOpacity="0.08"
      />
      <path
        d={line}
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.6"
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <circle cx={x(peakIdx)} cy={y(hi)} r="3" fill={EMBER} />
    </svg>
  );
}

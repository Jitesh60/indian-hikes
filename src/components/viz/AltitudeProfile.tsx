import { band, ft2m, type ProfilePoint } from "@/lib/types";

/**
 * The day-by-day altitude profile of a trek, drawn from real numbers.
 * This is the primary illustration on every trek page — the trek's signature.
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
  const padR = 18 * fontScale;
  const padT = 34 * fontScale;
  const padB = (showLabels ? 62 : 26) * fontScale;

  const alts = profile.map((d) => d.altFt);
  const lo = Math.floor(Math.min(...alts) / 1000) * 1000;
  const hi = Math.ceil(Math.max(...alts) / 1000) * 1000;
  const span = Math.max(hi - lo, 1000);

  const x = (i: number) => padL + (i / Math.max(profile.length - 1, 1)) * (W - padL - padR);
  const y = (a: number) => padT + (1 - (a - lo) / span) * (H - padT - padB);

  const pts = profile.map((d, i) => [x(i), y(d.altFt)] as const);
  const line = pts.map(([px, py], i) => `${i ? "L" : "M"}${px.toFixed(1)},${py.toFixed(1)}`).join(" ");
  const area = `${line} L${pts[pts.length - 1][0].toFixed(1)},${H - padB} L${pts[0][0].toFixed(1)},${H - padB} Z`;

  const gridLines: number[] = [];
  const step = span > 6000 ? 2000 : 1000;
  for (let a = lo; a <= hi; a += step) gridLines.push(a);

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full h-auto"
      role="img"
      aria-label={`Altitude profile: ${profile
        .map((d) => `day ${d.day} ${d.label} at ${d.altFt} feet`)
        .join(", ")}`}
    >
      <defs>
        {/* The fill is the altitude gradient itself: forest at the bottom,
            snow at the top. Not decoration — it is the legend. */}
        <linearGradient id="altband" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#1f4438" stopOpacity="0.16" />
          <stop offset="40%" stopColor="#4c8770" stopOpacity="0.18" />
          <stop offset="68%" stopColor="#d4a22b" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#6e93a6" stopOpacity="0.3" />
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
            strokeOpacity="0.14"
            strokeDasharray="2 6"
          />
          <text
            x={padL - 10 * fontScale}
            y={y(a) + 4 * fontScale}
            textAnchor="end"
            className="nums"
            fontSize={fs(12)}
            fill="currentColor"
            fillOpacity="0.5"
          >
            {(a / 1000).toFixed(0)}k
          </text>
        </g>
      ))}

      <path d={area} fill="url(#altband)" />
      <path
        d={line}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {profile.map((d, i) => {
        const b = band(d.altFt);
        const isPeak = d.altFt === Math.max(...alts);
        return (
          <g key={d.day}>
            <line
              x1={x(i)}
              x2={x(i)}
              y1={y(d.altFt)}
              y2={H - padB}
              stroke="currentColor"
              strokeOpacity="0.16"
            />
            <circle
              cx={x(i)}
              cy={y(d.altFt)}
              r={(isPeak ? 6.5 : 4.5) * fontScale}
              fill={b.color}
              stroke="var(--page)"
              strokeWidth={2 * fontScale}
            />
            {isPeak && (
              <text
                x={x(i)}
                y={y(d.altFt) - 14 * fontScale}
                textAnchor="middle"
                className="nums"
                fontSize={fs(13)}
                fontWeight="700"
                fill="currentColor"
              >
                {d.altFt.toLocaleString("en-IN")} ft
              </text>
            )}
            {showLabels && (
              <>
                <text
                  x={x(i)}
                  y={H - padB + 20 * fontScale}
                  textAnchor="middle"
                  fontSize={fs(12.5)}
                  fontWeight="600"
                  fill="currentColor"
                  fillOpacity="0.85"
                >
                  {d.label.length > 17 ? d.label.slice(0, 16) + "…" : d.label}
                </text>
                <text
                  x={x(i)}
                  y={H - padB + 38 * fontScale}
                  textAnchor="middle"
                  className="nums"
                  fontSize={fs(11.5)}
                  fill="currentColor"
                  fillOpacity="0.45"
                >
                  Day {d.day} · {ft2m(d.altFt).toLocaleString("en-IN")} m
                </text>
              </>
            )}
          </g>
        );
      })}
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
  const x = (i: number) => (i / Math.max(profile.length - 1, 1)) * (width - 2) + 1;
  const y = (a: number) => height - 3 - ((a - lo) / span) * (height - 8);
  const pts = profile.map((d, i) => [x(i), y(d.altFt)] as const);
  const line = pts.map(([px, py], i) => `${i ? "L" : "M"}${px.toFixed(1)},${py.toFixed(1)}`).join(" ");
  const peakIdx = alts.indexOf(hi);

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} aria-hidden="true">
      <path d={`${line} L${width - 1},${height} L1,${height} Z`} fill={band(hi).color} fillOpacity="0.14" />
      <path d={line} fill="none" stroke="currentColor" strokeOpacity="0.55" strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx={x(peakIdx)} cy={y(hi)} r="3" fill={band(hi).color} />
    </svg>
  );
}

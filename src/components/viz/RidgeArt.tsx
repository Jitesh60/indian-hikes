/**
 * Deterministic ridge-line artwork generated per trek.
 * Used everywhere a photograph would normally sit: layered silhouettes
 * drawn in the trek's own altitude colours, seeded by its slug so the
 * same trek always looks the same on the server and the client.
 */

function hashSeed(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function rng(seed: number) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function ridgePath(rand: () => number, W: number, H: number, baseY: number, amp: number) {
  const steps = 9;
  const pts: [number, number][] = [];
  for (let i = 0; i <= steps; i++) {
    const px = (i / steps) * W;
    const jag = Math.sin((i / steps) * Math.PI * 1.4) * amp;
    const py = baseY - jag * (0.55 + rand() * 0.75);
    pts.push([px, py]);
  }
  const d = pts.map(([px, py], i) => `${i ? "L" : "M"}${px.toFixed(1)},${py.toFixed(1)}`).join(" ");
  return `${d} L${W},${H} L0,${H} Z`;
}

export function RidgeArt({
  seed,
  className = "",
  tone = "cool",
  snowline = true,
}: {
  seed: string;
  className?: string;
  tone?: "cool" | "warm" | "dark";
  snowline?: boolean;
}) {
  const W = 800;
  const H = 480;
  const rand = rng(hashSeed(seed));

  const palettes = {
    cool: ["#d4e2e8", "#a6c2cf", "#6e93a6", "#2f6350", "#1f4438"],
    warm: ["#f2e0ac", "#e6bd5a", "#d4a22b", "#4c8770", "#173328"],
    dark: ["#2b3d55", "#202f44", "#182434", "#111a26", "#0b121b"],
  } as const;
  const colors = palettes[tone];

  const layers = [
    { baseY: H * 0.46, amp: H * 0.3, color: colors[0] },
    { baseY: H * 0.58, amp: H * 0.27, color: colors[1] },
    { baseY: H * 0.7, amp: H * 0.24, color: colors[2] },
    { baseY: H * 0.84, amp: H * 0.18, color: colors[3] },
    { baseY: H * 0.96, amp: H * 0.12, color: colors[4] },
  ];

  const skyId = `sky-${hashSeed(seed)}`;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={className}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={skyId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={tone === "dark" ? "#070b12" : "#f4f7f7"} />
          <stop offset="100%" stopColor={tone === "dark" ? "#22324a" : colors[0]} />
        </linearGradient>
      </defs>
      <rect width={W} height={H} fill={`url(#${skyId})`} />

      {/* a night sky gets stars */}
      {tone === "dark" &&
        Array.from({ length: 70 }, (_, i) => (
          <circle
            key={i}
            cx={rand() * W}
            cy={rand() * H * 0.55}
            r={0.5 + rand() * 1.3}
            fill="#ffffff"
            opacity={0.25 + rand() * 0.6}
          />
        ))}

      {/* sun or moon, placed off-centre by the seed */}
      <circle
        cx={W * (0.2 + rand() * 0.6)}
        cy={H * (0.13 + rand() * 0.1)}
        r={20 + rand() * 12}
        fill={tone === "warm" ? "#e6bd5a" : "#ffffff"}
        opacity={tone === "dark" ? 0.5 : 0.75}
      />

      {layers.map((l, i) => (
        <path key={i} d={ridgePath(rand, W, H, l.baseY, l.amp)} fill={l.color} />
      ))}

      {snowline && (
        <line
          x1="0"
          x2={W}
          y1={H * 0.42}
          y2={H * 0.42}
          stroke={tone === "dark" ? "#6e93a6" : "#ffffff"}
          strokeOpacity="0.28"
          strokeDasharray="1 9"
        />
      )}
    </svg>
  );
}

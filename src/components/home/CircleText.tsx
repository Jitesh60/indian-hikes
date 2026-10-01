/** Text set around a circle, slowly rotating — a ring around a photo. */
export function CircleText({ text, size = 420 }: { text: string; size?: number }) {
  const id = "circle-text-path";
  return (
    <svg
      viewBox="0 0 400 400"
      width={size}
      height={size}
      aria-hidden="true"
      className="spin-slow pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
    >
      <defs>
        <path id={id} d="M200,200 m-176,0 a176,176 0 1,1 352,0 a176,176 0 1,1 -352,0" />
      </defs>
      <text fill="rgb(255 255 255 / 0.55)" fontSize="13" letterSpacing="6" fontWeight="500">
        <textPath href={`#${id}`}>{text}</textPath>
      </text>
    </svg>
  );
}

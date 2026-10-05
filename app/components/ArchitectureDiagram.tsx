import type { Layer } from "../projects";

const BOX_W = 520;
const BOX_H = 60;
const GAP = 30;
const PAD = 14;
const WIDTH = BOX_W + PAD * 2;
const LIME = "#c6ff3d";

/** Vertical stage diagram: hairline boxes, lime ticks, mono labels. */
export default function ArchitectureDiagram({ layers, title }: { layers: Layer[]; title: string }) {
  const height = PAD * 2 + layers.length * BOX_H + (layers.length - 1) * GAP;
  const cx = PAD + 54;
  const c = 8;

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${height}`}
      role="img"
      aria-label={`${title} architecture: ${layers.map((l) => l.name).join(", then ")}`}
      className="h-auto w-full max-w-2xl"
    >
      {layers.map((layer, i) => {
        const y = PAD + i * (BOX_H + GAP);
        const x = PAD;
        const r = x + BOX_W;
        const b = y + BOX_H;
        return (
          <g key={layer.name}>
            <rect x={x} y={y} width={BOX_W} height={BOX_H} fill="#0a0a0a" stroke="#ffffff" strokeOpacity="0.14" />
            {/* detection-box corner brackets */}
            <path
              d={`M${x} ${y + c} V${y} H${x + c} M${r - c} ${y} H${r} V${y + c} M${x} ${b - c} V${b} H${x + c} M${r - c} ${b} H${r} V${b - c}`}
              fill="none"
              stroke={LIME}
              strokeWidth="1.5"
            />
            <text x={x + 18} y={y + BOX_H / 2 + 5} fill={LIME} fontSize="12" fontFamily="var(--font-dm-mono), monospace" letterSpacing="1.5">
              {String(i + 1).padStart(2, "0")}
            </text>
            <text x={x + 54} y={y + 26} fill="#ededed" fontSize="17" fontWeight="300" fontFamily="var(--font-inter), sans-serif" letterSpacing="-0.3">
              {layer.name}
            </text>
            <text x={x + 54} y={y + 46} fill="#8d8d8d" fontSize="11" fontFamily="var(--font-dm-mono), monospace" letterSpacing="1">
              {layer.tech.toUpperCase()}
            </text>
            {i < layers.length - 1 && (
              <g stroke={LIME} strokeWidth="1.5" fill="none">
                <line x1={cx} y1={b + 4} x2={cx} y2={b + GAP - 4} strokeDasharray="3 3" />
                <path d={`M${cx - 4} ${b + GAP - 9} L${cx} ${b + GAP - 3} L${cx + 4} ${b + GAP - 9}`} />
              </g>
            )}
          </g>
        );
      })}
    </svg>
  );
}

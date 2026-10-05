import type { Layer } from "../projects";

const BOX_W = 480;
const BOX_H = 64;
const GAP = 34;
const PAD = 12;
const WIDTH = BOX_W + PAD * 2;

export default function ArchitectureDiagram({ layers, title }: { layers: Layer[]; title: string }) {
  const height = PAD * 2 + layers.length * BOX_H + (layers.length - 1) * GAP;
  const cx = WIDTH / 2;

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${height}`}
      role="img"
      aria-label={`${title} architecture: ${layers.map((l) => l.name).join(", then ")}`}
      className="mx-auto mt-6 h-auto w-full max-w-xl"
    >
      <defs>
        <linearGradient id="arch-box" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#34d399" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#0b1d18" stopOpacity="0.9" />
        </linearGradient>
        <marker id="arch-arrow" viewBox="0 0 10 10" refX="5" refY="8" markerWidth="8" markerHeight="8" orient="auto">
          <path d="M0 0 L5 9 L10 0 Z" fill="#6ee7b7" />
        </marker>
      </defs>

      {layers.map((layer, i) => {
        const y = PAD + i * (BOX_H + GAP);
        return (
          <g key={layer.name}>
            <rect
              x={PAD}
              y={y}
              width={BOX_W}
              height={BOX_H}
              rx={16}
              fill="url(#arch-box)"
              stroke="#6ee7b7"
              strokeOpacity="0.35"
            />
            <text x={PAD + 20} y={y + 28} fill="#ffffff" fontSize="17" fontWeight="600">
              {layer.name}
            </text>
            <text x={PAD + 20} y={y + 48} fill="#a7f3d0" fontSize="13" fontFamily="monospace">
              {layer.tech}
            </text>
            <text x={PAD + BOX_W - 20} y={y + 38} fill="#6ee7b7" fillOpacity="0.5" fontSize="22" fontFamily="monospace" textAnchor="end">
              {String(i + 1).padStart(2, "0")}
            </text>
            {i < layers.length - 1 && (
              <line
                x1={cx}
                y1={y + BOX_H + 3}
                x2={cx}
                y2={y + BOX_H + GAP - 3}
                stroke="#6ee7b7"
                strokeOpacity="0.7"
                strokeWidth="2"
                markerEnd="url(#arch-arrow)"
              />
            )}
          </g>
        );
      })}
    </svg>
  );
}

"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import BBox from "../ui/BBox";

type Sample = { id: number; kind: string; label: string; score?: number };

// Labels and scores are read off the overlay images (real pipeline output).
// Score is omitted where the source label is too blurred to read reliably.
const SAMPLES: Sample[] = [
  { id: 1, kind: "Wall crack", label: "cracks" },
  { id: 2, kind: "Wall crack", label: "segment cracks", score: 0.37 },
  { id: 3, kind: "Wall crack", label: "cracks" },
  { id: 4, kind: "Drywall seam", label: "dry wall", score: 0.52 },
  { id: 5, kind: "Drywall seam", label: "dry wall", score: 0.42 },
  { id: 6, kind: "Drywall seam", label: "dry wall", score: 0.28 },
];

const LAYERS = [
  { key: "input", name: "RGB", file: "input" },
  { key: "mask", name: "MASK", file: "mask" },
  { key: "overlay", name: "DETECT", file: "overlay" },
] as const;

type LayerKey = (typeof LAYERS)[number]["key"];

const src = (n: number, f: string) => `/vision/crack-${n}-${f}.jpg`;
const pad = (n: number) => String(n).padStart(2, "0");

export default function VisionDemo() {
  const [sampleIdx, setSampleIdx] = useState(0);
  const [layer, setLayer] = useState<LayerKey>("overlay");

  const stageRef = useRef<HTMLDivElement>(null);
  const clipRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const rangeRef = useRef<HTMLInputElement>(null);
  const readRef = useRef<HTMLSpanElement>(null);

  const pos = useRef(38);
  const dir = useRef(1);
  const holds = useRef(0);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dragging = useRef(false);

  const apply = useCallback((p: number) => {
    pos.current = p;
    if (clipRef.current) clipRef.current.style.clipPath = `inset(0 ${100 - p}% 0 0)`;
    if (lineRef.current) lineRef.current.style.left = `${p}%`;
    if (rangeRef.current) rangeRef.current.value = String(Math.round(p));
    if (readRef.current) readRef.current.textContent = `${String(Math.round(p)).padStart(3, "0")}%`;
  }, []);

  // preload every layer so switching never flashes
  useEffect(() => {
    SAMPLES.forEach((s) =>
      LAYERS.forEach((l) => {
        const i = new Image();
        i.src = src(s.id, l.file);
      }),
    );
  }, []);

  // automatic sweep, off entirely under reduced motion
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      apply(50);
      return;
    }
    apply(pos.current);
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(64, now - last) / 1000;
      last = now;
      if (holds.current === 0) {
        let p = pos.current + dir.current * dt * 13;
        if (p >= 100) {
          p = 100;
          dir.current = -1;
        }
        if (p <= 0) {
          p = 0;
          dir.current = 1;
        }
        apply(p);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [apply]);

  const hold = () => {
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    holds.current = 1;
  };
  const release = (delay = 0) => {
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => {
      holds.current = 0;
    }, delay);
  };

  const fromPointer = (e: React.PointerEvent) => {
    const r = stageRef.current!.getBoundingClientRect();
    apply(Math.max(0, Math.min(100, ((e.clientX - r.left) / r.width) * 100)));
  };

  const sample = SAMPLES[sampleIdx];
  const L = LAYERS.find((l) => l.key === layer)!;

  return (
    <div className="w-full">
      <div className="mb-8 flex items-center justify-between gap-4">
        <p className="label flex items-center gap-2">
          <span aria-hidden className="pulse-dot inline-block h-1.5 w-1.5 bg-accent" />
          Live / Grounding DINO + SAM
        </p>
        <div role="group" aria-label="Layer" className="flex border border-line">
          {LAYERS.map((l, i) => (
            <button
              key={l.key}
              type="button"
              aria-pressed={layer === l.key}
              onClick={() => setLayer(l.key)}
              className={`label px-3 py-1.5 transition-colors ${i > 0 ? "border-l border-line" : ""} ${
                layer === l.key ? "bg-accent !text-accent-ink" : "hover:!text-fg"
              }`}
            >
              {l.name}
            </button>
          ))}
        </div>
      </div>

      <BBox label={sample.label} score={sample.score}>
        <div
          ref={stageRef}
          onPointerEnter={(e) => {
            if (e.pointerType === "mouse") hold();
          }}
          onPointerLeave={(e) => {
            if (e.pointerType === "mouse" && !dragging.current) release(0);
          }}
          onPointerDown={(e) => {
            hold();
            dragging.current = true;
            e.currentTarget.setPointerCapture(e.pointerId);
            fromPointer(e);
          }}
          onPointerMove={(e) => {
            if (dragging.current) fromPointer(e);
          }}
          onPointerUp={(e) => {
            dragging.current = false;
            release(e.pointerType === "mouse" ? 0 : 2200);
          }}
          onFocus={hold}
          onBlur={() => release(600)}
          className="relative aspect-square w-full cursor-ew-resize touch-pan-y select-none overflow-hidden bg-surface has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-4 has-[:focus-visible]:outline-accent"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src(sample.id, "input")}
            alt={`${sample.kind} photograph, sample ${sample.id}`}
            draggable={false}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div ref={clipRef} className="absolute inset-0" style={{ clipPath: "inset(0 62% 0 0)" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src(sample.id, L.file)}
              alt=""
              draggable={false}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>

          <div ref={lineRef} className="pointer-events-none absolute inset-y-0 w-px bg-accent" style={{ left: "38%" }}>
            <span
              aria-hidden
              className="absolute left-1/2 top-1/2 flex h-9 w-5 -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-accent text-accent-ink"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 2 1 6l3 4M8 2l3 4-3 4" />
              </svg>
            </span>
          </div>

          <input
            ref={rangeRef}
            type="range"
            min={0}
            max={100}
            defaultValue={38}
            aria-label="Reveal position of the selected layer"
            onChange={(e) => apply(Number(e.target.value))}
            className="sr-only"
          />
        </div>
      </BBox>

      <dl className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 border-t border-line pt-4 font-mono text-[11px] uppercase tracking-[0.14em] sm:grid-cols-4">
        <Tele k="Layer" v={L.name} accent />
        <Tele k="Sample" v={`${pad(sample.id)} / 06`} />
        <Tele k="Class" v={sample.score === undefined ? sample.label : `${sample.label} ${sample.score.toFixed(2)}`} />
        <div>
          <dt className="text-muted">Sweep</dt>
          <dd className="mt-1 text-fg">
            <span ref={readRef}>038%</span>
          </dd>
        </div>
      </dl>

      <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2" role="group" aria-label="Sample">
        <span className="label mr-1">Sample</span>
        {SAMPLES.map((s, i) => (
          <button
            key={s.id}
            type="button"
            aria-pressed={i === sampleIdx}
            aria-label={`Sample ${s.id}, ${s.kind}`}
            onClick={() => setSampleIdx(i)}
            className={`px-0.5 py-1.5 font-mono text-xs tracking-[0.14em] transition-colors ${
              i === sampleIdx
                ? "text-accent underline decoration-accent underline-offset-[6px]"
                : "text-muted hover:text-fg"
            }`}
          >
            {pad(s.id)}
          </button>
        ))}
        <span className="label ml-auto hidden sm:inline">{sample.kind}</span>
      </div>
    </div>
  );
}

function Tele({ k, v, accent = false }: { k: string; v: string; accent?: boolean }) {
  return (
    <div>
      <dt className="text-muted">{k}</dt>
      <dd className={`mt-1 ${accent ? "text-accent" : "text-fg"}`}>{v}</dd>
    </div>
  );
}

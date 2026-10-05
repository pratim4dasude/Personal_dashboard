"use client";

import { useId, useState } from "react";

/**
 * Draggable before/after comparison. Keyboard accessible via a range input.
 * Both images must share the same aspect ratio. Plain <img> is used on purpose
 * so the clip-path comparison stays pixel aligned.
 */
export default function BeforeAfter({
  before,
  after,
  beforeLabel = "Input",
  afterLabel = "Output",
  alt,
  aspect = "1 / 1",
  className = "",
}: {
  before: string;
  after: string;
  beforeLabel?: string;
  afterLabel?: string;
  alt: string;
  aspect?: string;
  className?: string;
}) {
  const [pos, setPos] = useState(50);
  const id = useId();

  return (
    <div className={`relative select-none overflow-hidden border border-line bg-surface ${className}`} style={{ aspectRatio: aspect }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={after} alt={`${alt} (${afterLabel})`} className="absolute inset-0 h-full w-full object-cover" draggable={false} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={before}
        alt={`${alt} (${beforeLabel})`}
        className="absolute inset-0 h-full w-full object-cover"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        draggable={false}
      />

      <span className="pointer-events-none absolute left-3 top-3 bg-bg/80 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-fg">
        {beforeLabel}
      </span>
      <span className="pointer-events-none absolute right-3 top-3 bg-accent px-2 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-accent-ink">
        {afterLabel}
      </span>

      <div aria-hidden className="pointer-events-none absolute inset-y-0 w-px bg-accent" style={{ left: `${pos}%` }}>
        <span className="absolute left-1/2 top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center border border-accent bg-bg font-mono text-xs text-accent">
          &#8596;
        </span>
      </div>

      <label htmlFor={id} className="sr-only">
        Compare {beforeLabel} and {afterLabel}
      </label>
      <input
        id={id}
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
      />
    </div>
  );
}

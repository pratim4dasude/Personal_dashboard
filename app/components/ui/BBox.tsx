import type { ReactNode } from "react";

/**
 * Detection-box frame: corner brackets plus an optional "label score" tag.
 * The core visual motif of the site. Wrap images, stats or headings.
 */
export default function BBox({
  children,
  label,
  score,
  className = "",
  color = "var(--accent)",
}: {
  children: ReactNode;
  label?: string;
  score?: number;
  className?: string;
  color?: string;
}) {
  const corner = "pointer-events-none absolute h-3 w-3 border-[1.5px]";
  return (
    <div className={`relative ${className}`} style={{ ["--bb" as string]: color }}>
      {children}
      <span aria-hidden className={`${corner} left-0 top-0 border-b-0 border-r-0`} style={{ borderColor: color }} />
      <span aria-hidden className={`${corner} right-0 top-0 border-b-0 border-l-0`} style={{ borderColor: color }} />
      <span aria-hidden className={`${corner} bottom-0 left-0 border-r-0 border-t-0`} style={{ borderColor: color }} />
      <span aria-hidden className={`${corner} bottom-0 right-0 border-l-0 border-t-0`} style={{ borderColor: color }} />
      {label && (
        <span
          className="absolute -top-[22px] left-0 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-accent-ink"
          style={{ background: color }}
        >
          {label}
          {score !== undefined && <span className="ml-2 opacity-70">{score.toFixed(2)}</span>}
        </span>
      )}
    </div>
  );
}

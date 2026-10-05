import type { ReactNode } from "react";

/** Numbered mono eyebrow, e.g. "04 / Publications". */
export default function Label({
  index,
  children,
  accent = false,
}: {
  index?: string;
  children: ReactNode;
  accent?: boolean;
}) {
  return (
    <p className="label flex items-center gap-3">
      {index && <span className={accent ? "text-accent" : "text-fg"}>{index}</span>}
      <span aria-hidden className="h-px w-8 bg-line-strong" />
      <span>{children}</span>
    </p>
  );
}

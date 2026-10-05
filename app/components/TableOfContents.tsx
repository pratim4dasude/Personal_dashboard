"use client";

import { useEffect, useState } from "react";

export type TocItem = { id: string; label: string };

export default function TableOfContents({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const els = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => el !== null);

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) {
          visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
          setActive(visible[0].target.id);
        }
      },
      { rootMargin: "-20% 0px -65% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items]);

  return (
    <nav aria-label="On this page">
      <p className="label mb-4">Contents</p>
      <ul className="border-t border-line">
        {items.map((item, i) => {
          const on = active === item.id;
          return (
            <li key={item.id} className="border-b border-line">
              <a
                href={`#${item.id}`}
                aria-current={on ? "location" : undefined}
                className={`flex items-baseline gap-3 py-2.5 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors ${
                  on ? "text-accent" : "text-muted hover:text-fg"
                }`}
              >
                <span className="w-5 opacity-70">{String(i + 1).padStart(2, "0")}</span>
                <span>{item.label}</span>
                <span aria-hidden className={`ml-auto h-1.5 w-1.5 ${on ? "bg-accent" : "bg-transparent"}`} />
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

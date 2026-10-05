"use client";

import Link from "next/link";
import { useState } from "react";
import type { Project } from "../../projects";
import BBox from "../ui/BBox";

function Preview({ p }: { p: Project }) {
  return (
    <BBox label={p.cover ? "cracks" : p.tags[0]?.toLowerCase()} score={p.cover ? undefined : undefined} className="w-full">
      <div className="relative aspect-square w-full overflow-hidden bg-surface">
        {p.cover ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={p.cover} alt="" className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full flex-col justify-between p-6">
            <span className="label">{p.stack}</span>
            <p className="font-display text-4xl text-fg">{p.title}</p>
          </div>
        )}
      </div>
    </BBox>
  );
}

export default function ProjectList({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState(0);

  return (
    <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-16 xl:grid-cols-[minmax(0,1fr)_420px]">
      <ul className="border-t border-line" onMouseLeave={() => setActive(0)}>
        {projects.map((p, i) => (
          <li key={p.slug} className="border-b border-line">
            <Link
              href={`/projects/${p.slug}`}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              className="group block py-8 sm:py-10"
            >
              <div className="flex items-baseline justify-between gap-4">
                <span className="flex flex-wrap items-center gap-x-4 gap-y-2">
                  <span className="label">
                    <span className={active === i ? "text-accent" : "text-fg"}>{String(i + 1).padStart(2, "0")}</span>
                    <span className="mx-2 text-muted">/</span>
                    {p.tags[0]}
                  </span>
                  {p.package && (
                    <span
                      title={`Published on PyPI: ${p.package.name}`}
                      className="inline-flex items-center gap-1.5 bg-accent px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-accent-ink"
                    >
                      <span aria-hidden className="h-1.5 w-1.5 bg-accent-ink" />
                      PyPI
                      <span className="sr-only">: published package {p.package.name}</span>
                    </span>
                  )}
                </span>
                <span className="label hidden sm:block">{p.stack.split(",").slice(0, 3).join(" / ")}</span>
              </div>
              <h2
                className={`font-display mt-5 text-[clamp(2.1rem,5.2vw,4.6rem)] transition-all duration-300 group-hover:translate-x-2 ${
                  active === i ? "text-fg" : "text-fg/55"
                }`}
              >
                {p.title}
                <span aria-hidden className="font-emph ml-3 inline-block text-accent opacity-0 transition-opacity group-hover:opacity-100">
                  &rarr;
                </span>
              </h2>
              <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <p className="max-w-md text-[15px] leading-relaxed text-muted">{p.tagline}</p>
                <p className="label shrink-0 text-right leading-relaxed">{p.tags.join("  ·  ")}</p>
              </div>
              {p.cover && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.cover} alt="" className="mt-6 aspect-[16/9] w-full object-cover lg:hidden" />
              )}
            </Link>
          </li>
        ))}
      </ul>
      <aside className="hidden lg:block" aria-hidden>
        <div className="sticky top-28 pt-8">
          <p className="label mb-8">Preview / {String(active + 1).padStart(2, "0")}</p>
          <Preview p={projects[active]} />
          <p className="mt-5 text-sm leading-relaxed text-muted">{projects[active].outcomeLine ?? projects[active].description}</p>
        </div>
      </aside>
    </div>
  );
}

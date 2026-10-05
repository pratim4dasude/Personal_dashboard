import Link from "next/link";
import type { Project } from "../../projects";
import BBox from "../ui/BBox";
import Reveal from "../Reveal";

const pad = (n: number) => String(n).padStart(2, "0");

function isVision(p: Project) {
  return /crack|segmentation/i.test(p.slug);
}

function VisionMedia() {
  return (
    <BBox label="cracks" className="mt-6 lg:mt-0">
      <div className="relative aspect-[5/4] w-full overflow-hidden bg-surface-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/vision/crack-1-input.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover grayscale-[0.4] transition duration-700 group-hover:grayscale-0"
        />
        <div
          className="absolute inset-0 transition-[clip-path] duration-[900ms] ease-[cubic-bezier(0.65,0,0.2,1)] [clip-path:inset(0_58%_0_0)] group-hover:[clip-path:inset(0_0_0_0)]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/vision/crack-1-overlay.jpg" alt="Crack segmentation overlay" className="absolute inset-0 h-full w-full object-cover" />
        </div>
        <span
          aria-hidden
          className="absolute inset-y-0 left-[42%] w-px bg-accent transition-[left,opacity] duration-[900ms] ease-[cubic-bezier(0.65,0,0.2,1)] group-hover:left-full group-hover:opacity-0"
        />
      </div>
    </BBox>
  );
}

function TypeMedia({ p, index }: { p: Project; index: number }) {
  const stack = p.stack.split(",").map((s) => s.trim());
  return (
    <BBox className="mt-6 lg:mt-0">
      <div className="relative flex aspect-[5/4] w-full flex-col justify-between overflow-hidden border border-line bg-surface p-5 transition-colors duration-500 group-hover:bg-surface-2 sm:p-6">
        <ul className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
          {stack.map((s) => (
            <li key={s} className="flex items-center gap-2 py-0.5">
              <span aria-hidden className="h-1 w-1 bg-line-strong transition-colors group-hover:bg-accent" />
              {s}
            </li>
          ))}
        </ul>
        <span
          aria-hidden
          className="font-display select-none self-end text-[7rem] leading-[0.8] text-transparent transition-colors duration-500 [-webkit-text-stroke:1px_var(--line-strong)] group-hover:[-webkit-text-stroke:1px_var(--accent)] sm:text-[9rem]"
        >
          {pad(index + 1)}
        </span>
      </div>
    </BBox>
  );
}

export default function WorkRows({ projects }: { projects: Project[] }) {
  return (
    <ol className="border-b border-line">
      {projects.map((p, i) => (
        <li key={p.slug}>
          <Reveal>
            <Link
              href={`/projects/${p.slug}`}
              className="group relative grid gap-x-8 border-t border-line py-9 transition-colors duration-500 hover:bg-white/[0.015] lg:grid-cols-12 lg:items-center lg:py-14"
            >
              <span
                aria-hidden
                className="absolute inset-x-0 top-[-1px] h-px origin-left scale-x-0 bg-accent transition-transform duration-700 ease-out group-hover:scale-x-100"
              />
              <div className="lg:col-span-7 lg:pr-6">
                <p className="label flex items-center gap-3">
                  <span className="text-fg">{pad(i + 1)}</span>
                  <span aria-hidden className="h-px w-8 bg-line-strong" />
                  <span>{isVision(p) ? "Flagship / Vision" : "Project"}</span>
                  {p.year && <span className="ml-auto lg:ml-4">{p.year}</span>}
                </p>
                <h3 className="font-display mt-6 text-[clamp(2.4rem,5.2vw,5rem)] transition-transform duration-500 group-hover:translate-x-2">
                  {p.title}
                </h3>
                <p className="mt-5 max-w-lg text-base leading-relaxed text-muted sm:text-lg">{p.tagline}</p>
                <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
                  {p.tags.map((t) => (
                    <span key={t} className="label !text-[10px]">
                      {t}
                    </span>
                  ))}
                </div>
                <span className="mt-8 inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-fg">
                  Read the case study
                  <span aria-hidden className="inline-block transition-transform duration-500 group-hover:translate-x-2 group-hover:text-accent">
                    &rarr;
                  </span>
                </span>
              </div>
              <div className="lg:col-span-5">{isVision(p) ? <VisionMedia /> : <TypeMedia p={p} index={i} />}</div>
            </Link>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}

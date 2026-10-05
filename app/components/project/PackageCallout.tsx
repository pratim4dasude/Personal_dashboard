import type { Project } from "../../projects";

type Pkg = NonNullable<Project["package"]>;

/** Highlighted "published on PyPI" callout for a project. Accent-green on purpose: it is proof of shipping. */
export default function PackageCallout({ pkg }: { pkg: Pkg }) {
  return (
    <aside
      aria-label={`Published package: ${pkg.name}`}
      className="relative mt-10 border border-accent bg-accent/[0.06] p-6 sm:p-8"
    >
      <span aria-hidden className="absolute -left-px -top-px h-4 w-4 border-l-2 border-t-2 border-accent" />
      <span aria-hidden className="absolute -right-px -top-px h-4 w-4 border-r-2 border-t-2 border-accent" />
      <span aria-hidden className="absolute -bottom-px -left-px h-4 w-4 border-b-2 border-l-2 border-accent" />
      <span aria-hidden className="absolute -bottom-px -right-px h-4 w-4 border-b-2 border-r-2 border-accent" />

      <div className="flex flex-wrap items-center gap-3">
        <span className="bg-accent px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-accent-ink">
          Published on PyPI
        </span>
        <span className="label !text-accent">
          v{pkg.version} / {pkg.license} / Python {pkg.python} / {pkg.released}
        </span>
      </div>

      <h3 className="font-display mt-5 break-words text-[clamp(1.6rem,3.4vw,2.75rem)] !leading-[1.1] text-accent">
        {pkg.name}
      </h3>
      <p className="mt-4 max-w-3xl leading-7 text-fg/85">{pkg.summary}</p>

      <code className="mt-6 block overflow-x-auto border border-accent/40 bg-bg px-4 py-3 font-mono text-sm text-accent">
        $ {pkg.install}
      </code>

      <div className="mt-6 flex flex-wrap gap-3">
        <a
          href={pkg.pypi}
          target="_blank"
          rel="noopener noreferrer"
          className="label inline-flex items-center gap-2 bg-accent px-4 py-2.5 !text-accent-ink transition-opacity hover:opacity-85"
        >
          View on PyPI <span aria-hidden>&#8599;</span>
        </a>
        <a
          href={pkg.github}
          target="_blank"
          rel="noopener noreferrer"
          className="label inline-flex items-center gap-2 border border-accent px-4 py-2.5 !text-accent transition-colors hover:bg-accent hover:!text-accent-ink"
        >
          Package source <span aria-hidden>&#8599;</span>
        </a>
      </div>
    </aside>
  );
}

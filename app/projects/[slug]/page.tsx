import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ArchitectureDiagram from "../../components/ArchitectureDiagram";
import ReadingProgress from "../../components/ReadingProgress";
import SectionLabel from "../../components/SectionLabel";
import TableOfContents, { type TocItem } from "../../components/TableOfContents";
import { getProject, projects, readingTime } from "../../projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return { title: `${project.title} | Pratim Dasude`, description: project.tagline };
}

const card = "scroll-mt-24 rounded-[2rem] border border-white/10 bg-white/6 p-6 backdrop-blur";

const toc: TocItem[] = [
  { id: "overview", label: "Overview" },
  { id: "problem", label: "The problem" },
  { id: "build", label: "What I built" },
  { id: "architecture", label: "Architecture" },
  { id: "features", label: "Key features" },
  { id: "challenges", label: "Challenges and fixes" },
  { id: "results", label: "Outcomes and learnings" },
  { id: "next", label: "What's next" },
];

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === slug);
  const prev = projects[index - 1];
  const next = projects[index + 1];

  return (
    <main id="main" className="text-stone-100">
      <ReadingProgress />
      <div className="relative mx-auto w-full max-w-6xl px-6 py-8 sm:px-8">
        <Link
          href="/projects"
          className="inline-flex rounded-full border border-white/10 px-4 py-2 text-sm text-stone-300 transition hover:border-emerald-300/40 hover:text-white"
        >
          &larr; All projects
        </Link>

        <header className="pb-10 pt-10">
          <SectionLabel>Project 0{index + 1}</SectionLabel>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            {project.title}
          </h1>
          <p className="mt-4 text-lg leading-8 text-stone-300">{project.tagline}</p>
          <p className="mt-4 text-sm text-emerald-100">
            {project.stack} <span className="text-stone-400">&middot; {readingTime(project)} min read</span>
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-emerald-200/15 bg-emerald-100/8 px-3 py-1 text-xs text-emerald-50/90"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        <div className="xl:grid xl:grid-cols-[minmax(0,1fr)_14rem] xl:gap-12">
        <article className="min-w-0 max-w-4xl space-y-6">
          <section id="overview" className={card}>
            <SectionLabel>Overview</SectionLabel>
            <p className="mt-4 leading-8 text-stone-300">{project.overview}</p>
          </section>

          <section id="problem" className={card}>
            <SectionLabel>The problem</SectionLabel>
            <p className="mt-4 leading-8 text-stone-300">{project.problem}</p>
          </section>

          <section id="build" className={card}>
            <SectionLabel>What I built</SectionLabel>
            <ol className="mt-5 space-y-5">
              {project.approach.map((step, i) => (
                <li key={step.title} className="flex gap-4">
                  <span className="font-mono text-sm text-emerald-200/80">0{i + 1}</span>
                  <div>
                    <h2 className="font-semibold text-white">{step.title}</h2>
                    <p className="mt-1 text-sm leading-7 text-stone-300 sm:text-base">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section id="architecture" className={card}>
            <SectionLabel>Architecture</SectionLabel>
            <p className="mt-4 leading-8 text-stone-300">{project.architecture.summary}</p>
            <ArchitectureDiagram layers={project.architecture.layers} title={project.title} />
            <h2 className="mt-8 text-sm font-semibold uppercase tracking-[0.18em] text-white/80">Layer details</h2>
            <ol className="mt-4" aria-label={`${project.title} architecture layers`}>
              {project.architecture.layers.map((layer, i, all) => (
                <li key={layer.name}>
                  <div className="rounded-2xl border border-emerald-200/15 bg-stone-950/40 p-4">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h2 className="font-semibold text-white">{layer.name}</h2>
                      <span className="font-mono text-xs text-emerald-200/80">{layer.tech}</span>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-stone-300">{layer.detail}</p>
                  </div>
                  {i < all.length - 1 && (
                    <div aria-hidden className="py-1 text-center text-emerald-200/50">
                      &darr;
                    </div>
                  )}
                </li>
              ))}
            </ol>
          </section>

          <section id="features" className={card}>
            <SectionLabel>Key features</SectionLabel>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-stone-300 marker:text-emerald-300/60">
              {project.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </section>

          <section id="challenges" className={card}>
            <SectionLabel>Challenges and fixes</SectionLabel>
            <div className="mt-5 space-y-5">
              {project.challenges.map((c) => (
                <div key={c.problem}>
                  <h2 className="font-semibold text-white">{c.problem}</h2>
                  <p className="mt-1 text-sm leading-7 text-stone-300 sm:text-base">{c.solution}</p>
                </div>
              ))}
            </div>
          </section>

          <div id="results" className="grid scroll-mt-24 gap-6 sm:grid-cols-2">
            <section className={card}>
              <SectionLabel>Outcomes</SectionLabel>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-stone-300 marker:text-emerald-300/60">
                {project.outcomes.map((o) => (
                  <li key={o}>{o}</li>
                ))}
              </ul>
            </section>
            <section className={card}>
              <SectionLabel>What I learned</SectionLabel>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-stone-300 marker:text-emerald-300/60">
                {project.learnings.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
            </section>
          </div>

          <section id="next" className={card}>
            <SectionLabel>What&apos;s next</SectionLabel>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-stone-300 marker:text-emerald-300/60">
              {project.next.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          </section>
        </article>

        <aside className="hidden xl:block">
          <div className="sticky top-24">
            <TableOfContents items={toc} />
          </div>
        </aside>
        </div>

        <nav aria-label="Other projects" className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-between">
          {prev ? (
            <Link href={`/projects/${prev.slug}`} className="text-emerald-200 transition hover:text-white">
              &larr; {prev.title}
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link href={`/projects/${next.slug}`} className="text-emerald-200 transition hover:text-white">
              {next.title} &rarr;
            </Link>
          )}
        </nav>
      </div>
    </main>
  );
}

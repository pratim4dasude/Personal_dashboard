import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import ArchitectureDiagram from "../../components/ArchitectureDiagram";
import PackageCallout from "../../components/project/PackageCallout";
import ReadingProgress from "../../components/ReadingProgress";
import TableOfContents, { type TocItem } from "../../components/TableOfContents";
import BBox from "../../components/ui/BBox";
import BeforeAfter from "../../components/ui/BeforeAfter";
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

function Section({ id, n, title, children }: { id: string; n: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-line py-14 md:py-20">
      <div className="grid gap-8 md:grid-cols-[170px_minmax(0,1fr)] md:gap-10">
        <h2 className="label flex items-baseline gap-3 md:block md:space-y-2">
          <span className="text-accent">{n}</span>
          <span className="block text-fg">{title}</span>
        </h2>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  );
}

const lead = "text-[clamp(1.2rem,1.9vw,1.6rem)] font-light leading-snug tracking-tight text-fg";
const navTitle =
  "font-display mt-6 block text-[clamp(1.8rem,3.6vw,3.2rem)] text-fg/60 transition-colors group-hover:text-fg";
const navBox = "group px-6 py-12 transition-colors hover:bg-surface lg:px-10 lg:py-16";

/** Split the title so the last word(s) get the serif italic emphasis. */
function splitTitle(title: string) {
  const words = title.split(" ");
  const k = words.length > 4 ? 2 : 1;
  return [words.slice(0, -k).join(" "), words.slice(-k).join(" ")] as const;
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === slug);
  const prev = projects[index - 1];
  const next = projects[index + 1];
  const [head, tail] = splitTitle(project.title);
  const gallery = project.gallery ?? [];
  const pipeline = project.pipeline ?? [];
  const num = (i: number) => String(i).padStart(2, "0");

  const toc: TocItem[] = [
    { id: "problem", label: "Problem" },
    { id: "approach", label: "Approach" },
    { id: "pipeline", label: pipeline.length ? "Pipeline" : "Architecture" },
    ...(gallery.length ? [{ id: "results", label: "Results" }] : []),
    { id: "challenges", label: "Challenges" },
    { id: "learnings", label: "Learnings" },
    { id: "next", label: "Next" },
  ];
  const n = (id: string) => num(toc.findIndex((t) => t.id === id) + 1);

  return (
    <main id="main">
      <ReadingProgress />

      {/* Title block */}
      <header className="mx-auto w-full max-w-[1400px] px-6 pb-12 pt-10 lg:px-10 lg:pt-14">
        <div className="flex items-baseline justify-between gap-6">
          <Link href="/projects" className="label transition-colors hover:text-accent">
            <span className="text-fg">{num(index + 1)}</span>
            <span className="mx-2">/</span>
            {project.tags[0]}
          </Link>
          <span className="label">
            {project.year ? `${project.year} · ` : ""}
            {readingTime(project)} min read
          </span>
        </div>
        <h1 className="font-display mt-10 max-w-[18ch] text-[clamp(2.8rem,8.4vw,8.5rem)] lg:mt-14">
          {head} <span className="font-emph text-accent">{tail}</span>
        </h1>
        <div className="mt-10 grid gap-6 border-t border-line pt-6 md:grid-cols-[170px_minmax(0,1fr)_220px] md:gap-10">
          <p className="label">Outcome</p>
          <p className={`${lead} max-w-3xl`}>{project.outcomeLine ?? project.tagline}</p>
          <div className="label flex flex-wrap gap-x-5 gap-y-2 md:flex-col md:gap-y-1.5 md:text-right">
            {project.tags.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        </div>
        <p className="label mt-6 md:pl-[210px]">{project.stack}</p>
      </header>

      {/* Cover */}
      {project.cover ? (
        <div className="mx-auto w-full max-w-[1400px] px-6 lg:px-10">
          <div className="grid gap-8 md:grid-cols-2 md:gap-4">
            <BBox label="input" className="mt-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={gallery[0]?.input ?? project.cover} alt="Source photo" className="aspect-square w-full object-cover" />
            </BBox>
            <BBox label={gallery[0]?.prompt ?? "output"} className="mt-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={project.cover} alt={`${project.title} output`} className="aspect-square w-full object-cover" />
            </BBox>
          </div>
        </div>
      ) : (
        <div className="mx-auto w-full max-w-[1400px] px-6 lg:px-10">
          <div className="relative overflow-hidden border border-line bg-surface px-6 py-16 sm:px-12 sm:py-24">
            <p className="label mb-6">Built with</p>
            <p className="font-display max-w-4xl text-[clamp(1.8rem,4.2vw,3.6rem)] text-fg/90">{project.stack}</p>
            <span aria-hidden className="absolute right-4 top-4 h-3 w-3 border-r-[1.5px] border-t-[1.5px] border-accent" />
            <span aria-hidden className="absolute bottom-4 left-4 h-3 w-3 border-b-[1.5px] border-l-[1.5px] border-accent" />
          </div>
        </div>
      )}

      {/* Body */}
      <div className="mx-auto w-full max-w-[1400px] px-6 pt-16 lg:px-10 xl:grid xl:grid-cols-[190px_minmax(0,1fr)] xl:gap-14">
        <aside className="hidden xl:block">
          <div className="sticky top-28">
            <TableOfContents items={toc} />
          </div>
        </aside>

        <article className="min-w-0">
          <div className="pb-14 md:pb-16">
            <p className="label mb-6 text-accent">Draft write-up</p>
            <p className="max-w-3xl leading-relaxed text-muted">{project.overview}</p>
            {(project.repo || project.links?.length) && (
              <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
                {project.repo && (
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noreferrer"
                    className="label inline-block border-b border-line-strong pb-1 text-fg transition-colors hover:border-accent hover:text-accent"
                  >
                    Source on GitHub &#8599;
                  </a>
                )}
                {project.links?.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    className="label inline-block border-b border-line-strong pb-1 text-fg transition-colors hover:border-accent hover:text-accent"
                  >
                    {l.label}{" "}&#8599;
                  </a>
                ))}
              </div>
            )}
            {project.package && <PackageCallout pkg={project.package} />}
          </div>

          <Section id="problem" n={n("problem")} title="Problem">
            <p className={`${lead} max-w-3xl`}>{project.problem}</p>
          </Section>

          <Section id="approach" n={n("approach")} title="Approach">
            <ol className="border-t border-line">
              {project.approach.map((step, i) => (
                <li key={step.title} className="grid gap-3 border-b border-line py-7 sm:grid-cols-[64px_minmax(0,1fr)] sm:gap-6">
                  <span className="font-emph text-4xl leading-none text-accent">{num(i + 1)}</span>
                  <div>
                    <h3 className="text-xl font-light tracking-tight text-fg">{step.title}</h3>
                    <p className="mt-2 max-w-2xl leading-relaxed text-muted">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Section>

          <Section id="pipeline" n={n("pipeline")} title={pipeline.length ? "Pipeline" : "Architecture"}>
            <p className={`${lead} max-w-3xl`}>{project.architecture.summary}</p>

            {pipeline.length > 0 && (
              <div className="mt-12 grid gap-10 sm:grid-cols-3 sm:gap-5">
                {pipeline.map((s, i) => (
                  <figure key={s.name} className="relative">
                    <p className="label flex items-baseline gap-2">
                      <span className="text-accent">{num(i + 1)}</span>
                      <span className="text-fg">{s.name}</span>
                    </p>
                    {s.image && (
                      <BBox label={s.caption} className="mt-8">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={s.image} alt={`${s.name}: ${s.caption ?? ""}`} className="aspect-square w-full object-cover" />
                      </BBox>
                    )}
                    <figcaption className="mt-4 text-sm leading-relaxed text-muted">{s.detail}</figcaption>
                    {i < pipeline.length - 1 && (
                      <span aria-hidden className="absolute -right-4 top-1/2 z-10 hidden -translate-y-1/2 font-mono text-accent sm:block">
                        &rarr;
                      </span>
                    )}
                  </figure>
                ))}
              </div>
            )}

            <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-12">
              <ArchitectureDiagram layers={project.architecture.layers} title={project.title} />
              <ol aria-label={`${project.title} architecture layers`} className="border-t border-line">
                {project.architecture.layers.map((layer, i) => (
                  <li key={layer.name} className="border-b border-line py-4">
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="font-light tracking-tight text-fg">
                        <span className="label mr-3 text-accent">{num(i + 1)}</span>
                        {layer.name}
                      </h3>
                      <span className="label text-right">{layer.tech}</span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{layer.detail}</p>
                  </li>
                ))}
              </ol>
            </div>

            <ul className="mt-12 grid gap-x-10 border-t border-line sm:grid-cols-2">
              {project.features.map((f) => (
                <li key={f} className="flex gap-3 border-b border-line py-3 text-sm text-fg/90">
                  <span aria-hidden className="mt-[7px] h-1.5 w-1.5 shrink-0 bg-accent" />
                  {f}
                </li>
              ))}
            </ul>
          </Section>

          {gallery.length > 0 && (
            <Section id="results" n={n("results")} title="Results">
              <p className={`${lead} max-w-3xl`}>
                Six real outputs, unfiltered. Drag each image: input on the left, prediction on the right.
              </p>
              <div className="mt-12 grid gap-x-6 gap-y-14 sm:grid-cols-2">
                {gallery.map((g, i) => (
                  <figure key={g.overlay}>
                    <BBox label={g.prompt} score={g.score} className="mt-6">
                      <BeforeAfter before={g.input} after={g.overlay} beforeLabel="Input" afterLabel="Overlay" alt={g.caption} />
                    </BBox>
                    <figcaption className="mt-4 flex items-start justify-between gap-4">
                      <p className="text-sm leading-relaxed text-fg/90">
                        <span className="label mr-3 text-accent">{num(i + 1)}</span>
                        {g.caption}
                      </p>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={g.mask} alt={`Binary mask for ${g.caption}`} className="h-14 w-14 shrink-0 border border-line object-cover" />
                    </figcaption>
                  </figure>
                ))}
              </div>
            </Section>
          )}

          <Section id="challenges" n={n("challenges")} title="Challenges">
            <ul className="border-t border-line">
              {project.challenges.map((c) => (
                <li key={c.problem} className="grid gap-3 border-b border-line py-7 lg:grid-cols-2 lg:gap-10">
                  <h3 className="text-xl font-light leading-snug tracking-tight text-fg">{c.problem}</h3>
                  <p className="leading-relaxed text-muted">
                    <span className="label mr-3 text-accent">Fix</span>
                    {c.solution}
                  </p>
                </li>
              ))}
            </ul>
          </Section>

          <Section id="learnings" n={n("learnings")} title="Learnings">
            <div className="grid gap-12 md:grid-cols-2">
              <div>
                <p className="label mb-4">Outcomes</p>
                <ul className="border-t border-line">
                  {project.outcomes.map((o) => (
                    <li key={o} className="border-b border-line py-4 leading-relaxed text-fg/90">
                      {o}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="label mb-4">What I learned</p>
                <ul className="border-t border-line">
                  {project.learnings.map((l) => (
                    <li key={l} className="font-emph border-b border-line py-4 text-xl leading-snug text-fg">
                      {l}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Section>

          <Section id="next" n={n("next")} title="Next">
            <ul className="border-t border-line">
              {project.next.map((x, i) => (
                <li key={x} className="flex gap-5 border-b border-line py-4 text-fg/90">
                  <span className="label pt-1">{num(i + 1)}</span>
                  {x}
                </li>
              ))}
            </ul>
          </Section>
        </article>
      </div>

      {/* Prev / next */}
      <nav aria-label="Other projects" className="mt-10 border-t border-line">
        <div className="mx-auto grid w-full max-w-[1400px] md:grid-cols-2">
          <Link
            href={prev ? `/projects/${prev.slug}` : "/projects"}
            className={`${navBox} border-b border-line md:border-b-0 md:border-r`}
          >
            <span className="label">&larr; {prev ? "Previous" : "Index"}</span>
            <span className={navTitle}>{prev ? prev.title : "All projects"}</span>
          </Link>
          <Link href={`/projects/${(next ?? projects[0]).slug}`} className={`${navBox} md:text-right`}>
            <span className="label">{next ? "Next" : "Start over"} &rarr;</span>
            <span className={navTitle}>{(next ?? projects[0]).title}</span>
          </Link>
        </div>
      </nav>
    </main>
  );
}

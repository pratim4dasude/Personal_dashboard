import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Shell from "../../components/pages/Shell";
import Label from "../../components/ui/Label";
import { authorName, getPaper, ieeeCitation, papers, scholar } from "../../papers";

export function generateStaticParams() {
  return papers.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/publications/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const paper = getPaper(slug);
  if (!paper) return {};
  return { title: `${paper.title} | Pratim Dasude`, description: paper.abstract.slice(0, 200) };
}

const fmtLong = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

const linkClass =
  "label inline-flex items-center gap-2 border border-line-strong px-4 py-2.5 !text-fg transition-colors hover:border-accent hover:!text-accent";

export default async function PaperPage({ params }: PageProps<"/publications/[slug]">) {
  const { slug } = await params;
  const paper = getPaper(slug);
  if (!paper) notFound();

  const index = papers.findIndex((p) => p.slug === slug);
  const prev = papers[index - 1];
  const next = papers[index + 1];

  return (
    <Shell>
      <header className="border-b border-line pb-12 pt-10 sm:pb-16">
        <Link href="/publications" className="label transition-colors hover:text-accent">
          &larr; All publications
        </Link>
        <div className="mt-14">
          <Label index={String(index + 1).padStart(2, "0")} accent>
            {paper.topic} / {fmtLong(paper.date)}
          </Label>
        </div>
        <h1 className="font-display mt-8 max-w-6xl text-[clamp(2rem,5vw,4.5rem)] !leading-[1.05]">{paper.title}</h1>
        <p className="font-emph mt-8 max-w-4xl text-2xl text-muted sm:text-3xl">{paper.venue}</p>
        <p className="mt-6 max-w-3xl text-[15px] leading-7 text-muted">
          {paper.authors.map((a, k) => (
            <span key={a}>
              <span className={a === authorName ? "text-fg" : undefined}>{a}</span>
              {k < paper.authors.length - 1 && ", "}
            </span>
          ))}
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <a href={paper.ieeeUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
            Read on IEEE Xplore <span aria-hidden>&#8599;</span>
          </a>
          <a href={`https://doi.org/${paper.doi}`} target="_blank" rel="noopener noreferrer" className={linkClass}>
            DOI <span aria-hidden>&#8599;</span>
          </a>
          <a href={paper.scholarUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
            Google Scholar <span aria-hidden>&#8599;</span>
          </a>
        </div>
      </header>

      <section className="grid gap-8 border-b border-line py-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <Label index="01">Abstract</Label>
        </div>
        <p className="font-display max-w-4xl text-[clamp(1.25rem,2vw,1.75rem)] !leading-[1.5] text-fg/90 lg:col-span-8">
          {paper.abstract}
        </p>
      </section>

      <section className="grid gap-8 border-b border-line py-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <Label index="02">At a glance</Label>
          <p className="label mt-4 normal-case tracking-normal">Taken directly from the abstract.</p>
        </div>
        <dl className="lg:col-span-8">
          {paper.glance.map((g) => (
            <div key={g.k} className="grid gap-2 border-t border-line py-5 first:border-t-0 first:pt-0 sm:grid-cols-[10rem_1fr]">
              <dt className="label">{g.k}</dt>
              <dd className="text-lg font-light leading-7 tracking-tight">{g.v}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="grid gap-8 border-b border-line py-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <Label index="03">Details</Label>
        </div>
        <dl className="grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:col-span-8">
          {[
            ["Publisher", paper.publisher],
            ["Published", fmtLong(paper.date)],
            ["Pages", paper.pages],
            ["DOI", paper.doi],
            ["Cited by", `${paper.citations} (Google Scholar, ${scholar.asOf})`],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className="label">{k}</dt>
              <dd className="mt-2 break-words font-mono text-sm text-fg/90">{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="grid gap-8 border-b border-line py-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <Label index="04">Cite this paper</Label>
          <p className="label mt-4 normal-case tracking-normal">IEEE style.</p>
        </div>
        <p className="font-mono text-sm leading-7 text-fg/85 lg:col-span-8">{ieeeCitation(paper)}</p>
      </section>

      <nav aria-label="Other publications" className="grid sm:grid-cols-2">
        {prev ? (
          <Link href={`/publications/${prev.slug}`} className="group border-b border-line py-12 sm:border-r sm:pr-8">
            <span className="label">&larr; Previous</span>
            <span className="font-display mt-4 block text-2xl !leading-tight transition-colors group-hover:text-accent sm:text-3xl">
              {prev.title}
            </span>
          </Link>
        ) : (
          <span className="hidden border-b border-line sm:block sm:border-r" />
        )}
        {next ? (
          <Link href={`/publications/${next.slug}`} className="group border-b border-line py-12 sm:pl-8 sm:text-right">
            <span className="label">Next &rarr;</span>
            <span className="font-display mt-4 block text-2xl !leading-tight transition-colors group-hover:text-accent sm:text-3xl">
              {next.title}
            </span>
          </Link>
        ) : (
          <span className="hidden border-b border-line sm:block" />
        )}
      </nav>
    </Shell>
  );
}

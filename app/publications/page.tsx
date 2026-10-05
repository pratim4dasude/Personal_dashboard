import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "../components/pages/PageHero";
import Shell from "../components/pages/Shell";
import { authorName, papers, scholar } from "../papers";

export const metadata: Metadata = {
  title: "Publications | Pratim Dasude",
  description: "Peer-reviewed conference papers on speech emotion recognition, stress detection and spam detection.",
};

const fmt = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "UTC" });

export default function PublicationsPage() {
  return (
    <Shell>
      <PageHero
        index="04"
        label="Publications"
        intro="Three peer-reviewed IEEE conference papers from my undergraduate years, on speech and language models. Open one for the abstract, key facts and the paper itself."
      >
        Peer-reviewed, <span className="font-emph text-accent">in print.</span>
      </PageHero>

      <dl className="grid max-w-xl grid-cols-3 gap-6 border-b border-line pb-10">
        <div>
          <dd className="font-display text-5xl">{papers.length}</dd>
          <dt className="label mt-2">Papers</dt>
        </div>
        <div>
          <dd className="font-display text-5xl">{scholar.citations}</dd>
          <dt className="label mt-2">Citations</dt>
        </div>
        <div>
          <dd className="font-display text-5xl">{scholar.hIndex}</dd>
          <dt className="label mt-2">h-index</dt>
        </div>
      </dl>

      <ol>
        {papers.map((p, i) => (
          <li key={p.slug} className="border-b border-line">
            <Link href={`/publications/${p.slug}`} className="group grid gap-8 py-12 sm:py-16 lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-3">
                <p className="label flex gap-4">
                  <span className="text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <span>{fmt(p.date)}</span>
                </p>
                <p className="label mt-3">{p.topic}</p>
              </div>
              <div className="lg:col-span-9">
                <h2 className="font-display text-[clamp(1.75rem,3.6vw,3.25rem)] !leading-[1.08] transition-colors group-hover:text-accent">
                  {p.title}
                </h2>
                <p className="mt-5 text-[15px] leading-6 text-muted">
                  {p.authors.map((a, k) => (
                    <span key={a}>
                      <span className={a === authorName ? "text-fg" : undefined}>{a}</span>
                      {k < p.authors.length - 1 && ", "}
                    </span>
                  ))}
                </p>
                <p className="font-emph mt-3 text-xl text-fg/80">{p.venue}</p>
                <p className="label mt-6 flex flex-wrap gap-x-6 gap-y-1">
                  <span>{p.publisher}</span>
                  <span>Cited by {p.citations}</span>
                  <span className="text-fg transition-colors group-hover:text-accent">
                    Abstract and details <span aria-hidden>&rarr;</span>
                  </span>
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ol>

      <p className="label mt-8">
        Source:{" "}
        <a
          href={scholar.profile}
          target="_blank"
          rel="noopener noreferrer"
          className="text-fg transition-colors hover:text-accent"
        >
          Google Scholar <span aria-hidden>&#8599;</span>
        </a>{" "}
        &middot; as of {scholar.asOf}
      </p>
    </Shell>
  );
}

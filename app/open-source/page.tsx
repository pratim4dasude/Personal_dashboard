import type { Metadata } from "next";
import { Card } from "../components/Card";
import PageHeader from "../components/PageHeader";
import Reveal from "../components/Reveal";
import SectionLabel from "../components/SectionLabel";
import Tag from "../components/Tag";
import { contributions, featuredRepos, githubStats, packages } from "../opensource";

export const metadata: Metadata = {
  title: "Open Source | Pratim Dasude",
  description: "Open-source contributions, public repositories and packages.",
};

const statusStyle: Record<string, string> = {
  Open: "border-emerald-300/40 bg-emerald-300/15 text-emerald-100",
  Merged: "border-violet-300/40 bg-violet-300/15 text-violet-100",
  Closed: "border-white/15 bg-white/5 text-stone-300",
};

export default function OpenSourcePage() {
  return (
    <main id="main" className="mx-auto w-full max-w-5xl px-6 py-10 sm:px-8">
      <PageHeader
        label="Open Source"
        title="Contributions and public work"
        intro="Pull requests to projects I use, plus the repositories I build in the open."
      />

      <section aria-labelledby="stats" className="grid gap-4 sm:grid-cols-3">
        <h2 id="stats" className="sr-only">
          GitHub at a glance
        </h2>
        {[
          { value: String(githubStats.publicRepos), label: "public repositories" },
          { value: String(contributions.length), label: "upstream pull requests" },
          { value: String(githubStats.followers), label: "followers" },
        ].map((s) => (
          <Card key={s.label} className="bg-stone-950/35">
            <p className="text-3xl font-semibold text-white">{s.value}</p>
            <p className="mt-2 text-sm text-stone-300">{s.label}</p>
          </Card>
        ))}
      </section>

      <section className="mt-12">
        <SectionLabel>Upstream contributions</SectionLabel>
        <div className="mt-5 space-y-4">
          {contributions.map((c) => (
            <Reveal key={c.url}>
              <a href={c.url} target="_blank" rel="noopener noreferrer" className="group block">
                <Card className="transition duration-300 group-hover:-translate-y-1 group-hover:border-emerald-300/40">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="font-mono text-sm text-emerald-100">{c.repo}</p>
                    <span className={`rounded-full border px-3 py-1 text-xs ${statusStyle[c.status]}`}>{c.status}</span>
                  </div>
                  <h3 className="mt-3 text-lg font-semibold text-white">{c.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-stone-300">{c.description}</p>
                  <span className="mt-4 inline-block text-sm text-emerald-200 transition group-hover:translate-x-1">
                    View pull request &rarr;
                  </span>
                </Card>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {packages.length > 0 && (
        <section className="mt-12">
          <SectionLabel>Packages</SectionLabel>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {packages.map((p) => (
              <Card key={p.name}>
                <h3 className="text-lg font-semibold text-white">{p.name}</h3>
                <p className="mt-2 text-sm leading-7 text-stone-300">{p.description}</p>
                <code className="mt-4 block rounded-xl bg-stone-950/60 px-4 py-2 font-mono text-sm text-emerald-100">
                  {p.install}
                </code>
                <div className="mt-4 flex gap-4 text-sm">
                  <a className="text-emerald-200 hover:text-white" href={p.pypi} target="_blank" rel="noopener noreferrer">
                    PyPI
                  </a>
                  {p.github && (
                    <a className="text-emerald-200 hover:text-white" href={p.github} target="_blank" rel="noopener noreferrer">
                      GitHub
                    </a>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </section>
      )}

      <section className="mt-12">
        <SectionLabel>Featured repositories</SectionLabel>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {featuredRepos.map((r) => (
            <Reveal key={r.name}>
              <a href={r.url} target="_blank" rel="noopener noreferrer" className="group block h-full">
                <Card className="h-full transition duration-300 group-hover:-translate-y-1 group-hover:border-emerald-300/40">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="break-all font-mono text-sm text-emerald-100">{r.name}</h3>
                    <span className="shrink-0 text-xs text-stone-400">{r.language}</span>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-stone-300">{r.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {r.tags.map((t) => (
                      <Tag key={t}>{t}</Tag>
                    ))}
                  </div>
                </Card>
              </a>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 text-sm text-stone-400">
          More on{" "}
          <a className="text-emerald-200 hover:text-white" href={githubStats.profile} target="_blank" rel="noopener noreferrer">
            github.com/{githubStats.username}
          </a>
          .
        </p>
      </section>
    </main>
  );
}

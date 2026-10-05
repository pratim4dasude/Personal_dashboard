import type { Metadata } from "next";
import Label from "../components/ui/Label";
import PageHero from "../components/pages/PageHero";
import Shell from "../components/pages/Shell";
import { contributions, featuredRepos, githubStats, packages } from "../opensource";

export const metadata: Metadata = {
  title: "Open Source | Pratim Dasude",
  description: "Open-source contributions, public repositories and packages.",
};

export default function OpenSourcePage() {
  const stats = [
    { value: String(githubStats.publicRepos), label: "public repositories" },
    { value: String(contributions.length), label: "upstream pull requests" },
    { value: String(githubStats.followers), label: "followers" },
  ];

  return (
    <Shell>
      <PageHero
        index="03"
        label="Open Source"
        intro="Pull requests to projects I use, plus the repositories I build in the open."
        aside={
          <dl className="flex gap-8 sm:gap-10">
            {stats.map((s) => (
              <div key={s.label}>
                <dd className="font-display text-5xl">{s.value}</dd>
                <dt className="label mt-2 max-w-[7rem]">{s.label}</dt>
              </div>
            ))}
          </dl>
        }
      >
        Work done <span className="font-emph">in the open</span>.
      </PageHero>

      <section className="grid gap-8 border-b border-line py-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <Label index="01">Upstream</Label>
        </div>
        <ul className="lg:col-span-8 [&>li:first-child>a]:pt-0">
          {contributions.map((c) => (
            <li key={c.url} className="border-b border-line last:border-b-0">
              <a href={c.url} target="_blank" rel="noopener noreferrer" className="group block py-8">
                <p className="label flex items-center justify-between gap-4">
                  <span className="normal-case tracking-normal text-fg">{c.repo}</span>
                  <span className={c.status === "Open" ? "text-accent" : ""}>{c.status}</span>
                </p>
                <h2 className="mt-4 text-2xl font-light leading-snug tracking-tight transition-colors group-hover:text-accent sm:text-3xl">
                  {c.title}
                </h2>
                <p className="mt-3 max-w-2xl leading-7 text-muted">{c.description}</p>
                <p className="label mt-5 text-fg">
                  View pull request <span aria-hidden>&#8599;</span>
                </p>
              </a>
            </li>
          ))}
        </ul>
      </section>

      {packages.length > 0 && (
        <section className="grid gap-8 border-b border-line py-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <Label index="02">Packages</Label>
          </div>
          <ul className="lg:col-span-8">
            {packages.map((p) => (
              <li key={p.name} className="border-b border-line py-6 first:pt-0 last:border-b-0">
                <h3 className="text-2xl font-light tracking-tight">{p.name}</h3>
                <p className="mt-2 leading-7 text-muted">{p.description}</p>
                <code className="mt-4 block font-mono text-sm text-accent">{p.install}</code>
                <p className="label mt-4 flex gap-6">
                  <a className="hover:text-accent" href={p.pypi} target="_blank" rel="noopener noreferrer">
                    PyPI
                  </a>
                  {p.github && (
                    <a className="hover:text-accent" href={p.github} target="_blank" rel="noopener noreferrer">
                      GitHub
                    </a>
                  )}
                </p>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="grid gap-8 py-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <Label index={packages.length > 0 ? "03" : "02"}>Repositories</Label>
        </div>
        <div className="lg:col-span-8">
          <ul className="border-t border-line">
            {featuredRepos.map((r) => (
              <li key={r.name} className="border-b border-line">
                <a
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group grid gap-3 py-7 sm:grid-cols-[1fr_1.2fr] sm:gap-8"
                >
                  <div>
                    <h3 className="break-all font-mono text-sm text-fg transition-colors group-hover:text-accent">
                      {r.name} <span aria-hidden>&#8599;</span>
                    </h3>
                    <p className="label mt-2">{r.language}</p>
                  </div>
                  <div>
                    <p className="leading-7 text-muted">{r.description}</p>
                    <p className="mt-3 font-mono text-xs text-muted/70">{r.tags.join(", ")}</p>
                  </div>
                </a>
              </li>
            ))}
          </ul>
          <p className="label mt-8">
            More on{" "}
            <a className="text-fg hover:text-accent" href={githubStats.profile} target="_blank" rel="noopener noreferrer">
              github.com/{githubStats.username} <span aria-hidden>&#8599;</span>
            </a>
          </p>
        </div>
      </section>
    </Shell>
  );
}

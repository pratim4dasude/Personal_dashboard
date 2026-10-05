import type { Metadata } from "next";
import { CardLink } from "../components/Card";
import PageHeader from "../components/PageHeader";
import Tag from "../components/Tag";
import { projects } from "../projects";

export const metadata: Metadata = {
  title: "Projects | Pratim Dasude",
  description: "Detailed write-ups of applied ML projects: problem, approach and architecture.",
};

export default function ProjectsIndex() {
  return (
    <main id="main" className="mx-auto w-full max-w-4xl px-6 py-10 sm:px-8 text-stone-100">
      <PageHeader
        label="Projects"
        title="Systems built around applied ML"
        intro="Pick a project for the full write-up: problem, approach, architecture and lessons."
      />
      <div className="space-y-4">
        {projects.map((p) => (
          <CardLink key={p.slug} href={`/projects/${p.slug}`}>
            <h2 className="text-xl font-semibold text-white">{p.title}</h2>
            <p className="mt-1 text-sm text-emerald-100">{p.stack}</p>
            <p className="mt-3 text-sm leading-7 text-stone-300">{p.tagline}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {p.tags.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
          </CardLink>
        ))}
      </div>
    </main>
  );
}

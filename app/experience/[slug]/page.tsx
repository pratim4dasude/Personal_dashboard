import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Card } from "../../components/Card";
import SectionLabel from "../../components/SectionLabel";
import Tag from "../../components/Tag";
import { experience, getExperience } from "../../data";

export function generateStaticParams() {
  return experience.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/experience/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const item = getExperience(slug);
  if (!item) return {};
  return { title: `${item.role} at ${item.company} | Pratim Dasude`, description: item.summary };
}

export default async function ExperiencePage({ params }: PageProps<"/experience/[slug]">) {
  const { slug } = await params;
  const item = getExperience(slug);
  if (!item) notFound();

  const index = experience.findIndex((e) => e.slug === slug);
  const prev = experience[index - 1];
  const next = experience[index + 1];

  return (
    <main id="main" className="mx-auto w-full max-w-4xl px-6 py-10 sm:px-8 text-stone-100">
      <Link
        href="/experience"
        className="inline-flex rounded-full border border-white/10 px-4 py-2 text-sm text-stone-300 transition hover:border-emerald-300/40 hover:text-white"
      >
        &larr; All experience
      </Link>

      <header className="pb-10 pt-10">
        <SectionLabel>{item.period}</SectionLabel>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">{item.role}</h1>
        <p className="mt-3 text-lg text-emerald-100">{item.company}</p>
        <p className="mt-5 max-w-3xl leading-8 text-stone-300">{item.summary}</p>
      </header>

      <div className="space-y-6">
        <Card>
          <SectionLabel>What I did</SectionLabel>
          <div className="mt-5 space-y-5">
            {item.responsibilities.map((r) => (
              <div key={r.title}>
                <h2 className="font-semibold text-white">{r.title}</h2>
                <p className="mt-1 text-sm leading-7 text-stone-300 sm:text-base">{r.body}</p>
              </div>
            ))}
          </div>
        </Card>

        <div className="grid gap-6 sm:grid-cols-2">
          <Card>
            <SectionLabel>Impact</SectionLabel>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-stone-300 marker:text-emerald-300/60">
              {item.impact.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </Card>
          <Card>
            <SectionLabel>Tech used</SectionLabel>
            <div className="mt-4 flex flex-wrap gap-2">
              {item.tech.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
          </Card>
        </div>
      </div>

      <nav aria-label="Other roles" className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-between">
        {prev ? (
          <Link href={`/experience/${prev.slug}`} className="text-emerald-200 transition hover:text-white">
            &larr; {prev.role}
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link href={`/experience/${next.slug}`} className="text-emerald-200 transition hover:text-white">
            {next.role} &rarr;
          </Link>
        )}
      </nav>
    </main>
  );
}

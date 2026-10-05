import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Label from "../../components/ui/Label";
import Shell from "../../components/pages/Shell";
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

export default async function ExperienceDetailPage({ params }: PageProps<"/experience/[slug]">) {
  const { slug } = await params;
  const item = getExperience(slug);
  if (!item) notFound();

  const index = experience.findIndex((e) => e.slug === slug);
  const prev = experience[index - 1];
  const next = experience[index + 1];

  return (
    <Shell>
      <header className="border-b border-line pb-12 pt-10 sm:pb-16">
        <Link href="/experience" className="label transition-colors hover:text-accent">
          &larr; All experience
        </Link>
        <div className="mt-14">
          <Label index={String(index + 1).padStart(2, "0")} accent>
            {item.period}
          </Label>
        </div>
        <h1 className="font-display mt-8 text-[clamp(2.75rem,8vw,7.5rem)]">{item.role}</h1>
        <p className="font-emph mt-6 text-3xl text-muted sm:text-4xl">{item.company}</p>
        <p className="mt-10 max-w-2xl text-lg leading-8 text-fg/80">{item.summary}</p>
      </header>

      <section className="grid gap-8 border-b border-line py-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <Label index="01">What I did</Label>
        </div>
        <ol className="lg:col-span-8">
          {item.responsibilities.map((r, i) => (
            <li
              key={r.title}
              className="grid gap-3 border-t border-line py-7 first:border-t-0 first:pt-0 sm:grid-cols-[3rem_1fr]"
            >
              <span className="font-mono text-xs text-muted">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h2 className="text-2xl font-light tracking-tight">{r.title}</h2>
                <p className="mt-3 max-w-2xl leading-7 text-muted">{r.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="grid gap-8 border-b border-line py-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <Label index="02">Impact</Label>
        </div>
        <ul className="lg:col-span-8">
          {item.impact.map((t) => (
            <li
              key={t}
              className="font-display border-t border-line py-5 text-[clamp(1.4rem,2.6vw,2.25rem)] leading-tight first:border-t-0 first:pt-0"
            >
              {t}
            </li>
          ))}
        </ul>
      </section>

      <section className="grid gap-8 border-b border-line py-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <Label index="03">Tech</Label>
        </div>
        <p className="font-mono text-sm leading-8 text-fg/85 lg:col-span-8">{item.tech.join(", ")}</p>
      </section>

      <nav aria-label="Other roles" className="grid sm:grid-cols-2">
        {prev ? (
          <Link href={`/experience/${prev.slug}`} className="group border-b border-line py-12 sm:border-r sm:pr-8">
            <span className="label">&larr; Previous</span>
            <span className="font-display mt-4 block text-4xl transition-colors group-hover:text-accent sm:text-5xl">
              {prev.role}
            </span>
          </Link>
        ) : (
          <span className="hidden border-b border-line sm:block sm:border-r" />
        )}
        {next ? (
          <Link href={`/experience/${next.slug}`} className="group border-b border-line py-12 sm:pl-8 sm:text-right">
            <span className="label">Next &rarr;</span>
            <span className="font-display mt-4 block text-4xl transition-colors group-hover:text-accent sm:text-5xl">
              {next.role}
            </span>
          </Link>
        ) : (
          <span className="hidden border-b border-line sm:block" />
        )}
      </nav>
    </Shell>
  );
}

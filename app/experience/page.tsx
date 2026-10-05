import type { Metadata } from "next";
import Link from "next/link";
import { Card } from "../components/Card";
import PageHeader from "../components/PageHeader";
import Reveal from "../components/Reveal";
import Tag from "../components/Tag";
import { experience } from "../data";

export const metadata: Metadata = {
  title: "Experience | Pratim Dasude",
  description: "Work history in machine learning engineering and data science.",
};

export default function ExperiencePage() {
  return (
    <main id="main" className="mx-auto w-full max-w-4xl px-6 py-10 sm:px-8">
      <PageHeader
        label="Experience"
        title="Recent work"
        intro="Where I have built and shipped ML systems. Open a role for the full breakdown."
      />

      <ol className="relative space-y-6 border-l border-emerald-200/20 pl-8">
        {experience.map((item, i) => (
          <li key={item.slug} className="relative">
            <span
              aria-hidden
              className="absolute -left-[2.45rem] top-8 h-3 w-3 rounded-full bg-emerald-300 shadow-[0_0_14px_rgba(110,231,183,0.8)]"
            />
            <Reveal delay={i * 100}>
              <Link href={`/experience/${item.slug}`} className="group block">
                <Card className="transition duration-300 group-hover:-translate-y-1 group-hover:border-emerald-300/40 group-hover:shadow-[0_0_40px_-10px_rgba(110,231,183,0.35)]">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h2 className="text-xl font-semibold text-white">{item.role}</h2>
                      <p className="mt-1 text-sm text-emerald-100">{item.company}</p>
                    </div>
                    <p className="font-mono text-xs uppercase tracking-[0.22em] text-stone-400">{item.period}</p>
                  </div>
                  <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-stone-300 marker:text-emerald-300/60 sm:text-base">
                    {item.highlights.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.tech.map((t) => (
                      <Tag key={t}>{t}</Tag>
                    ))}
                  </div>
                  <span className="mt-5 inline-block text-sm font-medium text-emerald-200 transition group-hover:translate-x-1">
                    Full details &rarr;
                  </span>
                </Card>
              </Link>
            </Reveal>
          </li>
        ))}
      </ol>
    </main>
  );
}

import type { Metadata } from "next";
import { Card } from "../components/Card";
import PageHeader from "../components/PageHeader";
import Reveal from "../components/Reveal";
import SectionLabel from "../components/SectionLabel";
import Tag from "../components/Tag";
import { research } from "../research";

export const metadata: Metadata = {
  title: "Research | Pratim Dasude",
  description: "Applied research and experiments in computer vision, generative AI and forecasting.",
};

export default function ResearchPage() {
  return (
    <main id="main" className="mx-auto w-full max-w-5xl px-6 py-10 sm:px-8">
      <PageHeader
        label="Research"
        title="Research and experiments"
        intro="Applied experiments in vision, generative models and forecasting. Each one links to its open code."
      />

      <div className="space-y-6">
        {research.map((item, i) => (
          <Reveal key={item.slug} delay={i * 60}>
            <Card>
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-emerald-200/70">{item.area}</p>
              <h2 className="mt-3 text-2xl font-semibold text-white">{item.title}</h2>
              <p className="mt-3 leading-8 text-stone-300">{item.summary}</p>

              <div className="mt-6 grid gap-6 md:grid-cols-2">
                <div>
                  <SectionLabel>Question</SectionLabel>
                  <p className="mt-3 text-sm leading-7 text-stone-300">{item.question}</p>
                </div>
                <div>
                  <SectionLabel>Approach</SectionLabel>
                  <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-stone-300 marker:text-emerald-300/60">
                    {item.method.map((m) => (
                      <li key={m}>{m}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>
                <a
                  href={item.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-emerald-200 transition hover:text-white"
                >
                  View code on GitHub &rarr;
                </a>
              </div>
            </Card>
          </Reveal>
        ))}
      </div>
    </main>
  );
}

import type { Metadata } from "next";
import Label from "../components/ui/Label";
import PageHero from "../components/pages/PageHero";
import Shell from "../components/pages/Shell";
import { education, focusAreas, highlights, metrics, profile } from "../data";

export const metadata: Metadata = {
  title: "About | Pratim Dasude",
  description: "Background, focus areas and education of Pratim Dasude, ML engineer.",
};

export default function AboutPage() {
  return (
    <Shell>
      <PageHero index="01" label="About">
        Engineering with an <span className="font-emph">ML product</span> mindset.
      </PageHero>

      <section className="grid gap-8 border-b border-line py-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <Label index="01">Approach</Label>
        </div>
        <div className="lg:col-span-8">
          <p className="max-w-3xl text-xl leading-9 text-fg/85 sm:text-2xl sm:leading-10">
            My work sits between model experimentation and shipping systems that other teams can depend on. That includes
            training loops, evaluation pipelines, retrieval quality, backend APIs, and the product surface that exposes
            model capabilities cleanly.
          </p>
          <p className="label mt-8">
            Based in {profile.location}. Focused on {profile.focus}.
          </p>
          <p className="mt-6 font-mono text-xs leading-6 text-muted">{highlights.join(", ")}</p>
        </div>
      </section>

      <section className="grid gap-8 border-b border-line py-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <Label index="02">Focus</Label>
        </div>
        <ol className="lg:col-span-8">
          {focusAreas.map((a, i) => (
            <li
              key={a.title}
              className="grid gap-4 border-b border-line py-8 first:pt-0 last:border-b-0 last:pb-0 sm:grid-cols-[3rem_1fr_1.1fr] sm:gap-8"
            >
              <span className="font-mono text-xs text-muted">{String(i + 1).padStart(2, "0")}</span>
              <h2 className="font-display text-3xl sm:text-4xl">{a.title}</h2>
              <p className="leading-7 text-muted">{a.description}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="grid gap-8 border-b border-line py-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <Label index="03">In numbers</Label>
        </div>
        <dl className="grid grid-cols-1 sm:grid-cols-3 lg:col-span-8">
          {metrics.map((m) => (
            <div key={m.label} className="flex flex-col border-b border-line py-6 last:border-b-0 sm:border-b-0 sm:py-0 sm:pr-6">
              <dt className="label order-2 mt-3">{m.label}</dt>
              <dd className="font-display order-1 text-6xl sm:text-7xl">{m.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="grid gap-8 border-b border-line py-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <Label index="04">Education</Label>
        </div>
        <div className="lg:col-span-8">
          <div className="grid gap-6 sm:grid-cols-[1fr_auto] sm:items-start">
            <div>
              <h2 className="font-display text-3xl sm:text-5xl">{education.school}</h2>
              <p className="font-emph mt-4 text-2xl text-muted">{education.degree}</p>
              <p className="mt-6 max-w-xl leading-7 text-muted">{education.summary}</p>
            </div>
            <div className="sm:text-right">
              <p className="label">{education.period}</p>
              <p className="font-display mt-3 text-6xl text-accent">{education.cgpa}</p>
              <p className="label mt-2">CGPA</p>
            </div>
          </div>
        </div>
      </section>
    </Shell>
  );
}

import type { Metadata } from "next";
import { Card } from "../components/Card";
import PageHeader from "../components/PageHeader";
import SectionLabel from "../components/SectionLabel";
import Tag from "../components/Tag";
import { education, focusAreas, highlights, profile } from "../data";

export const metadata: Metadata = {
  title: "About | Pratim Dasude",
  description: "Background, focus areas and education of Pratim Dasude, ML engineer.",
};

export default function AboutPage() {
  return (
    <main id="main" className="mx-auto w-full max-w-5xl px-6 py-10 sm:px-8">
      <PageHeader
        label="About"
        title="Engineering with an ML product mindset"
        intro="My work sits between model experimentation and shipping systems that other teams can depend on."
      />

      <div className="space-y-6">
        <Card>
          <p className="leading-8 text-stone-300">
            That includes training loops, evaluation pipelines, retrieval quality, backend APIs, and the product surface that exposes model capabilities cleanly. I am based in {profile.location} and currently focused on {profile.focus}.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {highlights.map((h) => (
              <Tag key={h}>{h}</Tag>
            ))}
          </div>
        </Card>

        <div className="grid gap-4 md:grid-cols-3">
          {focusAreas.map((a) => (
            <Card key={a.title} className="bg-stone-950/35">
              <h2 className="text-lg font-semibold text-white">{a.title}</h2>
              <p className="mt-3 text-sm leading-7 text-stone-300">{a.description}</p>
            </Card>
          ))}
        </div>

        <Card>
          <SectionLabel>Education</SectionLabel>
          <h2 className="mt-4 text-2xl font-semibold text-white">{education.school}</h2>
          <p className="mt-3 text-stone-300">
            {education.degree}, {education.period}
          </p>
          <p className="mt-1 text-stone-300">CGPA: {education.cgpa}</p>
          <p className="mt-4 leading-7 text-stone-300">{education.summary}</p>
        </Card>
      </div>
    </main>
  );
}

import type { Metadata } from "next";
import { Card } from "../components/Card";
import FloatingChips from "../components/FloatingChips";
import PageHeader from "../components/PageHeader";
import Reveal from "../components/Reveal";
import SectionLabel from "../components/SectionLabel";
import SkillGlobe, { GROUP_COLORS } from "../components/SkillGlobe";
import { skillGroups } from "../data";

export const metadata: Metadata = {
  title: "Skills | Pratim Dasude",
  description: "Machine learning, generative AI, LLM and product engineering skills.",
};

export default function SkillsPage() {
  return (
    <main id="main" className="mx-auto w-full max-w-6xl px-6 py-10 sm:px-8">
      <PageHeader
        label="Skills"
        title="Tools I work with"
        intro="Drag the globe to spin it. Each colour is a category, broken down below."
      />

      <SkillGlobe groups={skillGroups} />

      <section className="mt-16">
        <SectionLabel>By category</SectionLabel>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {skillGroups.map((group, i) => {
            const color = GROUP_COLORS[i % GROUP_COLORS.length];
            return (
              <Reveal key={group.label} delay={i * 80}>
                <Card className="h-full bg-stone-950/35">
                  <h2 className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.18em] text-white/90">
                    <span aria-hidden className="h-2.5 w-2.5 rounded-full" style={{ background: color }} />
                    {group.label}
                  </h2>
                  <div className="mt-5">
                    <FloatingChips items={group.items} color={color} />
                  </div>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </section>
    </main>
  );
}

import type { Metadata } from "next";
import SkillsExplorer from "../components/skills/SkillsExplorer";
import Label from "../components/ui/Label";
import { skillGroups } from "../data";

export const metadata: Metadata = {
  title: "Skills | Pratim Dasude",
  description: "Machine learning, generative AI, LLM and product engineering skills, mapped as an embedding space.",
};

export default function SkillsPage() {
  return (
    <main id="main" className="mx-auto w-full max-w-[1400px] px-5 pb-24 pt-12 sm:px-8 sm:pt-20">
      <Label index="03" accent>
        Skills
      </Label>
      <h1 className="font-display mt-6 max-w-5xl text-[clamp(2.75rem,8vw,7.5rem)] text-fg">
        A map of what I <span className="font-emph text-accent">actually</span> reach for.
      </h1>
      <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
        Every tool I use, embedded and clustered. Related skills sit close together. Drag to turn the space, hover a
        point to inspect it.
      </p>

      <div className="mt-12 sm:mt-16">
        <SkillsExplorer groups={skillGroups} />
      </div>
    </main>
  );
}

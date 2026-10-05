import type { Metadata } from "next";
import ProjectList from "../components/project/ProjectList";
import Label from "../components/ui/Label";
import { projects } from "../projects";

export const metadata: Metadata = {
  title: "Projects | Pratim Dasude",
  description: "Case studies in segmentation, retrieval and applied ML: problem, approach, pipeline and results.",
};

export default function ProjectsIndex() {
  return (
    <main id="main" className="mx-auto w-full max-w-[1400px] px-6 pb-24 pt-14 lg:px-10 lg:pt-20">
      <Label index={String(projects.length).padStart(2, "0")}>Selected work</Label>
      <h1 className="font-display mt-8 max-w-5xl text-[clamp(3rem,9vw,8rem)]">
        Systems that <span className="font-emph text-accent">see</span>, retrieve and predict.
      </h1>
      <p className="mt-8 max-w-xl leading-relaxed text-muted">
        Each project is written up as a case study: the problem, the approach, the pipeline, and what went wrong on the way.
      </p>
      <div className="mt-20">
        <ProjectList projects={projects} />
      </div>
    </main>
  );
}

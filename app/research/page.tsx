import type { Metadata } from "next";
import BBox from "../components/ui/BBox";
import BeforeAfter from "../components/ui/BeforeAfter";
import PageHero from "../components/pages/PageHero";
import Reveal from "../components/Reveal";
import Publications from "../components/pages/Publications";
import Shell from "../components/pages/Shell";
import { research } from "../research";

export const metadata: Metadata = {
  title: "Research | Pratim Dasude",
  description: "Applied research and experiments in computer vision, generative AI and forecasting.",
};

const samples = [1, 2, 3, 4, 5, 6];

export default function ResearchPage() {
  return (
    <Shell>
      <PageHero
        index="02"
        label="Research"
        intro="Applied experiments in vision, generative models and forecasting, plus peer-reviewed papers. Experiments link to open code."
      >
        Experiments that <span className="font-emph">ask</span> a question.
      </PageHero>

      <div>
        {research.map((item, i) => {
          const isDino = item.slug === "grounded-dino-sam-finetuning";
          return (
            <Reveal key={item.slug}>
              <article className="border-b border-line py-14 sm:py-20">
                <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
                  <div className="lg:col-span-4">
                    <p className="label flex gap-4">
                      <span className="text-accent">{String(i + 1).padStart(2, "0")}</span>
                      <span>{item.area}</span>
                    </p>
                  </div>
                  <div className="lg:col-span-8">
                    <h2 className="font-display text-[clamp(2rem,4.6vw,4.25rem)]">{item.title}</h2>
                    <p className="mt-6 max-w-2xl text-lg leading-8 text-fg/80">{item.summary}</p>
                  </div>
                </div>

                <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-10">
                  <div className="lg:col-span-4 lg:col-start-5">
                    <p className="label border-t border-line pt-4">Question</p>
                    <p className="font-emph mt-4 text-2xl leading-snug text-fg/90">{item.question}</p>
                  </div>
                  <div className="lg:col-span-4">
                    <p className="label border-t border-line pt-4">Approach</p>
                    <ol className="mt-2">
                      {item.method.map((m, k) => (
                        <li
                          key={m}
                          className="grid grid-cols-[2rem_1fr] border-b border-line py-3 text-[15px] leading-6 text-muted last:border-b-0"
                        >
                          <span className="font-mono text-xs leading-6 text-muted/70">{k + 1}</span>
                          {m}
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>

                {isDino && (
                  <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-10">
                    <div className="lg:col-span-5 lg:col-start-5">
                      <BBox label="crack" className="mt-6">
                        <BeforeAfter
                          before="/vision/crack-1-input.jpg"
                          after="/vision/crack-1-overlay.jpg"
                          beforeLabel="Input"
                          afterLabel="Box + mask"
                          alt="Wall crack segmentation by fine-tuned Grounded DINO and SAM"
                        />
                      </BBox>
                      <p className="label mt-4">Drag to compare. Real pipeline output.</p>
                    </div>
                    <div className="lg:col-span-3">
                      <p className="label border-t border-line pt-4">More outputs</p>
                      <div className="mt-4 grid grid-cols-3 gap-2">
                        {samples.map((n) => (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            key={n}
                            src={`/vision/crack-${n}-overlay.jpg`}
                            alt={`${n <= 3 ? "Wall crack" : "Drywall seam"} segmentation output ${n}`}
                            loading="lazy"
                            className="aspect-square w-full border border-line object-cover"
                          />
                        ))}
                      </div>
                      <p className="label mt-3">Cracks 1-3, drywall seams 4-6</p>
                    </div>
                  </div>
                )}

                <div className="mt-12 grid gap-4 lg:grid-cols-12 lg:gap-10">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between lg:col-span-8 lg:col-start-5">
                    <p className="font-mono text-xs leading-6 text-muted">{item.tags.join(", ")}</p>
                    <a
                      href={item.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="label text-fg transition-colors hover:text-accent"
                    >
                      View code <span aria-hidden>&#8599;</span>
                    </a>
                  </div>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>

      <Publications />
    </Shell>
  );
}

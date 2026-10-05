import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "../components/pages/PageHero";
import Shell from "../components/pages/Shell";
import { experience } from "../data";

export const metadata: Metadata = {
  title: "Experience | Pratim Dasude",
  description: "Work history in machine learning engineering and data science.",
};

export default function ExperiencePage() {
  return (
    <Shell>
      <PageHero
        index="04"
        label="Experience"
        intro="Where I have built and shipped ML systems. Open a role for the full breakdown."
      >
        Recent <span className="font-emph">work</span>, in production.
      </PageHero>

      <ol>
        {experience.map((item, i) => (
          <li key={item.slug} className="border-b border-line">
            <Link
              href={`/experience/${item.slug}`}
              className="group grid gap-8 py-12 sm:py-16 lg:grid-cols-12 lg:gap-10"
            >
              <div className="lg:col-span-7">
                <p className="label flex gap-4">
                  <span className="text-fg">{String(i + 1).padStart(2, "0")}</span>
                  <span>{item.period}</span>
                </p>
                <h2 className="font-display mt-6 text-[clamp(2.25rem,5.5vw,5rem)] transition-colors group-hover:text-accent">
                  {item.role}
                </h2>
                <p className="font-emph mt-4 text-2xl text-muted sm:text-3xl">{item.company}</p>
              </div>
              <div className="lg:col-span-5 lg:pt-9">
                <ul className="border-t border-line">
                  {item.highlights.map((h) => (
                    <li key={h} className="border-b border-line py-3 text-[15px] leading-6 text-fg/85">
                      {h}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 font-mono text-xs leading-6 text-muted">{item.tech.join(", ")}</p>
                <p className="label mt-6 text-fg transition-colors group-hover:text-accent">
                  Case study <span aria-hidden>&rarr;</span>
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ol>
    </Shell>
  );
}

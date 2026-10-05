import Link from "next/link";
import type { ReactNode } from "react";
import Reveal from "./components/Reveal";
import VisionDemo from "./components/home/VisionDemo";
import WorkRows from "./components/home/WorkRows";
import Label from "./components/ui/Label";
import { education, experience, profile, skillGroups } from "./data";
import { contributions, featuredRepos, githubStats } from "./opensource";
import { projects } from "./projects";
import { publications, scholar } from "./publications";
import { research } from "./research";

const stack = [
  "PyTorch",
  "Grounding DINO",
  "SAM",
  "YOLO",
  "U-Net",
  "Diffusers",
  "Flux",
  "ControlNet",
  "CLIP",
  "LangChain",
  "FastAPI",
  "Docker",
];

const facts = [
  { v: "2+", k: "Years in ML" },
  { v: String(githubStats.publicRepos), k: "Public repos" },
  { v: String(contributions.length), k: "Upstream PRs" },
];

const wrap = "mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12";

function Head({ index, label, href, cta }: { index: string; label: string; href?: string; cta?: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <Label index={index} accent>
        {label}
      </Label>
      {href && (
        <Link href={href} className="label transition-colors hover:!text-accent">
          {cta} &rarr;
        </Link>
      )}
    </div>
  );
}

function Section({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`${wrap} ${className}`}>{children}</section>;
}

export default function Home() {
  return (
    <main id="main" className="overflow-x-clip">
      {/* HERO */}
      <Section className="pt-8 sm:pt-10 lg:pt-12">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="label inline-flex items-center gap-2.5 border border-line px-3 py-1.5 !text-fg">
            <span aria-hidden className="pulse-dot h-1.5 w-1.5 bg-accent" />
            Available for work
          </p>
          <p className="label">
            {profile.location} / {new Date().getFullYear()}
          </p>
        </div>

        <h1 className="font-display mt-10 text-[clamp(3.2rem,9.6vw,9.25rem)] sm:mt-10">
          <span className="block">Machines that</span>
          <span className="block">
            <span className="font-emph pr-[0.06em] text-accent">see</span> what matters.
          </span>
        </h1>

        <div className="mt-14 grid gap-14 lg:mt-20 lg:grid-cols-12 lg:gap-12">
          <div className="flex flex-col justify-between gap-12 lg:col-span-5">
            <div>
              <p className="label !text-fg">Computer vision &amp; AI engineer</p>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-muted sm:text-xl">
                I fine-tune detectors, segmenters and diffusion models on narrow, unglamorous targets, then wrap them in
                APIs that other people can rely on.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
                <Link
                  href="/projects"
                  className="group inline-flex items-center gap-3 bg-accent px-5 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-accent-ink transition-transform hover:-translate-y-0.5"
                >
                  See the work
                  <span aria-hidden className="transition-transform group-hover:translate-x-1">
                    &rarr;
                  </span>
                </Link>
                <Link
                  href="/contact"
                  className="font-mono text-[11px] uppercase tracking-[0.18em] text-fg underline decoration-line-strong underline-offset-[8px] transition-colors hover:decoration-accent"
                >
                  Get in touch
                </Link>
              </div>
            </div>

            <dl className="grid grid-cols-3 border-t border-line">
              {facts.map((f, i) => (
                <div key={f.k} className={`pt-5 ${i > 0 ? "border-l border-line pl-4 sm:pl-6" : ""}`}>
                  <dd className="font-display text-5xl sm:text-6xl">{f.v}</dd>
                  <dt className="label mt-3 !text-[10px]">{f.k}</dt>
                </div>
              ))}
            </dl>
          </div>

          <div className="lg:col-span-7 lg:pl-6 xl:pl-12">
            <div className="mx-auto max-w-[640px] lg:mx-0 lg:ml-auto">
              <VisionDemo />
            </div>
          </div>
        </div>
      </Section>

      {/* STACK LINE */}
      <div className="mt-20 border-y border-line lg:mt-28">
        <p className={`${wrap} py-5 font-mono text-[11px] uppercase leading-loose tracking-[0.2em] text-muted`}>
          {stack.map((s, i) => (
            <span key={s}>
              {s}
              {i < stack.length - 1 && <span className="mx-3 text-accent sm:mx-4">/</span>}
            </span>
          ))}
        </p>
      </div>

      {/* ABOUT */}
      <Section className="pt-24 lg:pt-36">
        <Head index="01" label="About" href="/about" cta="More" />
        <Reveal>
          <p className="font-display mt-10 max-w-6xl text-[clamp(1.9rem,4.6vw,4.4rem)] !leading-[1.08] text-muted">
            <span className="text-fg">I work where models meet messy reality:</span> segmenting cracks and drywall seams
            with fine-tuned Grounding DINO and SAM, adapting diffusion models, and building the{" "}
            <span className="font-emph text-accent">retrieval and APIs</span> around them so they ship.
          </p>
        </Reveal>
        <p className="label mt-10">
          {education.degree} / KIIT / {education.period}
        </p>
      </Section>

      {/* EXPERIENCE */}
      <Section className="pt-20 lg:pt-32">
        <Head index="02" label="Experience" href="/experience" cta="Full experience" />
        <ul className="mt-8 border-b border-line">
          {experience.map((e) => (
            <li key={e.slug}>
              <Link
                href={`/experience/${e.slug}`}
                className="group grid gap-2 border-t border-line py-6 sm:grid-cols-12 sm:items-baseline sm:gap-6"
              >
                <p className="label sm:col-span-3">{e.period}</p>
                <p className="text-xl font-light tracking-tight transition-transform duration-500 group-hover:translate-x-1.5 sm:col-span-4 sm:text-2xl">
                  {e.role}
                </p>
                <p className="text-muted sm:col-span-4">{e.company}</p>
                <span aria-hidden className="label hidden text-right transition-transform group-hover:translate-x-1 group-hover:!text-accent sm:col-span-1 sm:block">
                  &rarr;
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      {/* WORK */}
      <Section className="pt-24 lg:pt-36">
        <Head index="03" label="Projects" href="/projects" cta="All projects" />
        <h2 className="font-display mt-8 max-w-4xl text-[clamp(2.4rem,6vw,5.5rem)]">
          Models that leave the <span className="font-emph text-accent">notebook</span>.
        </h2>
        <div className="mt-14 lg:mt-20">
          <WorkRows projects={projects} />
        </div>
      </Section>

      {/* RESEARCH */}
      <Section className="pt-24 lg:pt-40">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <Head index="04" label="Research" />
              <h2 className="font-display mt-8 text-[clamp(2.4rem,4.6vw,4.4rem)]">
                Questions I keep <span className="font-emph text-accent">testing</span>.
              </h2>
              <p className="mt-6 max-w-xs text-muted">
                Applied experiments and open implementations. Not papers, and labelled that way.
              </p>
              <Link href="/research" className="label mt-8 inline-block transition-colors hover:!text-accent">
                All research &rarr;
              </Link>
            </div>
          </div>
          <ul className="border-b border-line lg:col-span-8">
            {research.map((r, i) => (
              <li key={r.slug}>
                <Reveal>
                  <a
                    href={r.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group grid gap-3 border-t border-line py-7 transition-colors hover:bg-white/[0.015] sm:grid-cols-[3rem_1fr_auto] sm:gap-6"
                  >
                    <span className="label">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <p className="label !text-accent">{r.area}</p>
                      <h3 className="mt-2 text-xl font-light tracking-tight transition-transform duration-500 group-hover:translate-x-1.5 sm:text-2xl">
                        {r.title}
                      </h3>
                      <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">{r.summary}</p>
                      <p className="label mt-4 !text-[10px]">{r.tags.join("  /  ")}</p>
                    </div>
                    <span
                      aria-hidden
                      className="label hidden transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:!text-accent sm:block"
                    >
                      &#8599;
                    </span>
                  </a>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>

        {/* Publications preview */}
        <div className="mt-20 border-t border-line pt-10">
          <div className="flex items-center justify-between gap-4">
            <p className="label !text-fg">
              Publications <span className="text-muted">/ {publications.length} papers / {scholar.citations} citations</span>
            </p>
            <Link href="/research#publications" className="label transition-colors hover:!text-accent">
              All &rarr;
            </Link>
          </div>
          <ul className="mt-6 border-b border-line">
            {publications.map((p) => (
              <li key={p.slug}>
                <Link
                  href="/research#publications"
                  className="group grid gap-2 border-t border-line py-5 sm:grid-cols-12 sm:items-baseline sm:gap-6"
                >
                  <p className="label sm:col-span-2">{p.venueShort}</p>
                  <p className="text-lg font-light leading-snug tracking-tight transition-transform duration-500 group-hover:translate-x-1.5 sm:col-span-9">
                    {p.title}
                  </p>
                  <span aria-hidden className="label hidden text-right group-hover:!text-accent sm:col-span-1 sm:block">
                    &rarr;
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* OPEN SOURCE */}
      <Section className="pt-24 lg:pt-40">
        <Head index="05" label="Open source" href="/open-source" cta="All contributions" />
        <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-5">
            <p className="font-display text-[clamp(7rem,20vw,16rem)] leading-[0.8] text-accent">{githubStats.publicRepos}</p>
            <p className="label mt-6 !text-fg">Public repositories</p>
            <a
              href={githubStats.profile}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block font-mono text-[11px] uppercase tracking-[0.18em] text-muted underline decoration-line-strong underline-offset-[6px] transition-colors hover:text-fg hover:decoration-accent"
            >
              github.com/{githubStats.username}
            </a>
          </Reveal>

          <div className="lg:col-span-7">
            <p className="label mb-4">Upstream pull requests</p>
            <ul className="mb-14 border-b border-line">
              {contributions.map((c) => (
                <li key={c.url}>
                  <a
                    href={c.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group grid gap-2 border-t border-line py-5 sm:grid-cols-[1fr_auto] sm:gap-8"
                  >
                    <div>
                      <p className="font-mono text-[12px] tracking-[0.04em] text-accent">{c.repo}</p>
                      <p className="mt-2 text-base font-light leading-snug transition-transform duration-500 group-hover:translate-x-1.5">
                        {c.title}
                      </p>
                    </div>
                    <p className="label sm:text-right">{c.status}</p>
                  </a>
                </li>
              ))}
            </ul>

            <p className="label mb-4">Selected repositories</p>
            <ul className="border-b border-line">
              {featuredRepos.map((r) => (
                <li key={r.name}>
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-baseline justify-between gap-4 border-t border-line py-3.5"
                  >
                    <span className="break-all font-mono text-[13px] transition-colors group-hover:text-accent">{r.name}</span>
                    <span className="label hidden shrink-0 !text-[10px] sm:block">{r.tags.join(" / ")}</span>
                    <span aria-hidden className="label shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                      &#8599;
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* SKILLS */}
      <Section className="pt-24 lg:pt-40">
        <Head index="06" label="Skills" href="/skills" cta="Explore the map" />
        <ul className="mt-8 border-b border-line">
          {skillGroups.map((g) => (
            <li key={g.label}>
              <Link
                href="/skills"
                className="group grid gap-3 border-t border-line py-6 sm:grid-cols-12 sm:items-baseline sm:gap-6"
              >
                <p className="text-xl font-light tracking-tight transition-transform duration-500 group-hover:translate-x-1.5 sm:col-span-4 sm:text-2xl">
                  {g.label}
                </p>
                <p className="font-mono text-xs leading-7 text-muted sm:col-span-8">{g.items.join(", ")}</p>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      {/* CLOSING */}
      <Section className="py-24 lg:py-36">
        <Reveal>
          <p className="font-display max-w-4xl text-[clamp(2rem,5vw,4.6rem)]">
            Have a vision problem worth <span className="font-emph text-accent">solving</span>?
          </p>
          <a
            href={`mailto:${profile.email}`}
            className="mt-8 inline-block font-mono text-sm tracking-[0.06em] underline decoration-line-strong underline-offset-[8px] transition-colors hover:text-accent hover:decoration-accent sm:text-base"
          >
            {profile.email}
          </a>
        </Reveal>
      </Section>
    </main>
  );
}

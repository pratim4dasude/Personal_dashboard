import Link from "next/link";
import { Card, CardLink } from "./components/Card";
import Marquee from "./components/Marquee";
import Reveal from "./components/Reveal";
import SectionLabel from "./components/SectionLabel";
import Tag from "./components/Tag";
import { education, experience, focusAreas, highlights, metrics, profile, skillGroups } from "./data";
import { contributions, featuredRepos, githubStats } from "./opensource";
import { projects } from "./projects";
import { research } from "./research";

const buttonPrimary =
  "rounded-full bg-emerald-300 px-6 py-3 text-sm font-semibold text-stone-950 transition hover:bg-emerald-200";
const buttonGhost =
  "rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:border-emerald-300/50";

function SectionHead({
  label,
  title,
  href,
  cta,
}: {
  label: string;
  title: string;
  href: string;
  cta: string;
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <SectionLabel>{label}</SectionLabel>
        <h2 className="mt-3 text-3xl font-semibold text-white">{title}</h2>
      </div>
      <Link className="text-sm text-emerald-200 transition hover:text-white" href={href}>
        {cta} &rarr;
      </Link>
    </div>
  );
}

export default function Home() {
  const allSkills = skillGroups.flatMap((g) => g.items);
  const half = Math.ceil(allSkills.length / 2);

  return (
    <main id="main" className="relative overflow-hidden text-stone-100">
      <div
        aria-hidden
        className="hero-glow pointer-events-none absolute inset-x-0 top-0 h-[40rem] bg-[radial-gradient(ellipse_50%_55%_at_70%_30%,rgba(52,211,153,0.22),transparent_70%)]"
      />
      <div className="relative mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Hero */}
        <section className="grid gap-10 pb-16 pt-16 lg:grid-cols-[1.3fr_0.7fr] lg:items-end lg:pt-24">
          <div className="space-y-6">
            <p className="font-mono text-sm uppercase tracking-[0.35em] text-emerald-200/75">{profile.role}</p>
            <h1 className="max-w-4xl bg-gradient-to-br from-white via-white to-emerald-200 bg-clip-text text-5xl font-semibold tracking-tight text-transparent sm:text-6xl lg:text-7xl">
              Building AI products that move from research to production.
            </h1>
            <p className="max-w-2xl text-base leading-8 text-stone-300 sm:text-lg">
              I work across multimodal learning, retrieval systems, and deployment-focused ML engineering. The goal is straightforward: make advanced models useful, measurable, and reliable in real products.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/projects" className={buttonPrimary}>
                View projects
              </Link>
              <Link href="/contact" className={buttonGhost}>
                Get in touch
              </Link>
              <a href={profile.github.href} target="_blank" rel="noopener noreferrer" className={buttonGhost}>
                GitHub
              </a>
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
              {highlights.map((item) => (
                <Tag key={item}>{item}</Tag>
              ))}
            </div>
          </div>

          <Card className="bg-stone-950/35 shadow-2xl shadow-black/20">
            <SectionLabel>Snapshot</SectionLabel>
            <dl className="mt-6 space-y-5">
              <div>
                <dt className="text-sm text-stone-400">Location</dt>
                <dd className="mt-1 text-lg text-white">{profile.location}</dd>
              </div>
              <div>
                <dt className="text-sm text-stone-400">Current focus</dt>
                <dd className="mt-1 text-lg text-white">{profile.focus}</dd>
              </div>
              <div>
                <dt className="text-sm text-stone-400">Email</dt>
                <dd className="mt-1 text-emerald-100">
                  <a className="transition hover:text-white" href={`mailto:${profile.email}`}>
                    {profile.email}
                  </a>
                </dd>
              </div>
            </dl>
          </Card>
        </section>

        {/* Tech ticker */}
        <div className="space-y-3 pb-12" aria-label="Technologies I use">
          <Marquee items={allSkills.slice(0, half)} />
          <Marquee items={allSkills.slice(half)} reverse />
        </div>

        {/* Metrics */}
        <section className="grid gap-4 border-y border-white/10 py-8 sm:grid-cols-3">
          {metrics.map((metric, i) => (
            <Reveal key={metric.label} delay={i * 100}>
              <div className="rounded-[1.5rem] border border-white/8 bg-white/5 p-5">
                <p className="text-3xl font-semibold text-white">{metric.value}</p>
                <p className="mt-2 text-sm leading-6 text-stone-300">{metric.label}</p>
              </div>
            </Reveal>
          ))}
        </section>

        {/* About */}
        <Reveal>
          <section className="grid gap-6 pt-16 lg:grid-cols-[0.9fr_1.1fr]">
            <Card>
              <SectionLabel>About</SectionLabel>
              <h2 className="mt-4 text-2xl font-semibold text-white">Engineering with an ML product mindset</h2>
              <p className="mt-4 text-sm leading-7 text-stone-300 sm:text-base">
                My work sits between model experimentation and shipping systems that other teams can depend on: training loops, evaluation pipelines, retrieval quality, backend APIs, and the product surface that exposes model capabilities cleanly.
              </p>
              <p className="mt-4 text-sm text-stone-400">
                {education.degree}, {education.school} ({education.period}), CGPA {education.cgpa}.
              </p>
              <Link href="/about" className="mt-5 inline-block text-sm text-emerald-200 transition hover:text-white">
                More about me &rarr;
              </Link>
            </Card>
            <div className="grid gap-4 sm:grid-cols-3">
              {focusAreas.map((area) => (
                <Card key={area.title} className="bg-stone-950/35">
                  <h3 className="text-lg font-semibold text-white">{area.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-stone-300">{area.description}</p>
                </Card>
              ))}
            </div>
          </section>
        </Reveal>

        {/* Experience */}
        <Reveal>
          <section className="pt-16">
            <SectionHead label="Experience" title="Where I have worked" href="/experience" cta="Full experience" />
            <div className="mt-6 grid gap-4 lg:grid-cols-2">
              {experience.map((item) => (
                <CardLink key={item.slug} href={`/experience/${item.slug}`}>
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-white">{item.role}</h3>
                      <p className="mt-1 text-sm text-emerald-100">{item.company}</p>
                    </div>
                    <p className="font-mono text-xs uppercase tracking-[0.22em] text-stone-400">{item.period}</p>
                  </div>
                  <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-stone-300 marker:text-emerald-300/60">
                    {item.highlights.slice(0, 3).map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                  <span className="mt-5 inline-block text-sm font-medium text-emerald-200 transition group-hover:translate-x-1">
                    Full details &rarr;
                  </span>
                </CardLink>
              ))}
            </div>
          </section>
        </Reveal>

        {/* Projects */}
        <Reveal>
          <section className="pt-16">
            <SectionHead label="Selected Projects" title="Systems built around applied ML" href="/projects" cta="All projects" />
            <div className="mt-6 grid gap-4 lg:grid-cols-3">
              {projects.map((project, index) => (
                <CardLink key={project.slug} href={`/projects/${project.slug}`}>
                  <p className="font-mono text-xs uppercase tracking-[0.25em] text-emerald-200/65">Project 0{index + 1}</p>
                  <h3 className="mt-4 text-xl font-semibold text-white">{project.title}</h3>
                  <p className="mt-2 text-sm text-emerald-100">{project.stack}</p>
                  <p className="mt-4 text-sm leading-7 text-stone-300">{project.tagline}</p>
                  <span className="mt-6 inline-block text-sm font-medium text-emerald-200 transition group-hover:translate-x-1">
                    Read the full write-up &rarr;
                  </span>
                </CardLink>
              ))}
            </div>
          </section>
        </Reveal>

        {/* Research */}
        <Reveal>
          <section className="pt-16">
            <SectionHead label="Research" title="Experiments and applied research" href="/research" cta="All research" />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {research.slice(0, 4).map((item) => (
                <CardLink key={item.slug} href="/research">
                  <p className="font-mono text-xs uppercase tracking-[0.25em] text-emerald-200/65">{item.area}</p>
                  <h3 className="mt-3 text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-stone-300">{item.summary}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.tags.slice(0, 3).map((t) => (
                      <Tag key={t}>{t}</Tag>
                    ))}
                  </div>
                </CardLink>
              ))}
            </div>
          </section>
        </Reveal>

        {/* Open source */}
        <Reveal>
          <section className="pt-16">
            <SectionHead label="Open Source" title="Contributions and public work" href="/open-source" cta="See all" />
            <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_1fr]">
              <div className="space-y-4">
                {contributions.map((c) => (
                  <a key={c.url} href={c.url} target="_blank" rel="noopener noreferrer" className="group block">
                    <Card className="transition duration-300 group-hover:-translate-y-1 group-hover:border-emerald-300/40">
                      <div className="flex items-center justify-between gap-3">
                        <p className="font-mono text-sm text-emerald-100">{c.repo}</p>
                        <span className="rounded-full border border-white/15 px-3 py-1 text-xs text-stone-300">{c.status}</span>
                      </div>
                      <h3 className="mt-3 text-base font-semibold text-white">{c.title}</h3>
                    </Card>
                  </a>
                ))}
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {featuredRepos.slice(0, 4).map((r) => (
                  <a key={r.name} href={r.url} target="_blank" rel="noopener noreferrer" className="group block">
                    <Card className="h-full bg-stone-950/35 transition duration-300 group-hover:-translate-y-1 group-hover:border-emerald-300/40">
                      <h3 className="break-all font-mono text-sm text-emerald-100">{r.name}</h3>
                      <p className="mt-2 line-clamp-3 text-sm leading-6 text-stone-300">{r.description}</p>
                    </Card>
                  </a>
                ))}
              </div>
            </div>
            <a
              className="mt-4 inline-block text-sm text-emerald-200 transition hover:text-white"
              href={githubStats.profile}
              target="_blank"
              rel="noopener noreferrer"
            >
              Browse all {githubStats.publicRepos} repositories on GitHub &rarr;
            </a>
          </section>
        </Reveal>

        {/* Skills */}
        <Reveal>
          <section className="pt-16">
            <SectionHead label="Skills" title="Tools I work with" href="/skills" cta="Explore skills" />
            <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {skillGroups.map((group) => (
                <Card key={group.label} className="bg-stone-950/35">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/90">{group.label}</h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {group.items.slice(0, 5).map((s) => (
                      <Tag key={s}>{s}</Tag>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </section>
        </Reveal>

        {/* CTA */}
        <Reveal>
          <section className="pt-16">
            <Card className="flex flex-col items-start gap-4 bg-emerald-300/10 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-white">Let&apos;s build something.</h2>
                <p className="mt-2 text-stone-300">Open to ML engineering roles and interesting collaborations.</p>
              </div>
              <Link href="/contact" className={buttonPrimary}>
                Contact me
              </Link>
            </Card>
          </section>
        </Reveal>
      </div>
    </main>
  );
}

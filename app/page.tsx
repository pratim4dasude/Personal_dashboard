const highlights = [
  "Multimodal AI systems",
  "Computer vision pipelines",
  "RAG and LLM applications",
  "Production ML deployment",
];

const focusAreas = [
  {
    title: "Vision + GenAI",
    description:
      "Training, evaluation, and adaptation of vision-language and diffusion models for applied product use cases.",
  },
  {
    title: "ML Platforms",
    description:
      "FastAPI, Docker, and cloud-backed serving workflows for experiments that need to survive real production constraints.",
  },
  {
    title: "Retrieval Systems",
    description:
      "Embedding pipelines, ranking, and multimodal retrieval flows built for speed, relevance, and measurable business impact.",
  },
];

const metrics = [
  { value: "2+", label: "years building ML systems" },
  { value: "100+", label: "SKUs improved in model workflows" },
  { value: "3", label: "flagship projects showcased" },
];

const experience = [
  {
    company: "AiLusion, Merosa Technologies Pvt. Ltd",
    role: "Machine Learning Engineer",
    period: "Jan 2025 - Present",
    summary:
      "Built and fine-tuned large-scale VLMs and diffusion models with PyTorch, Flux-Dev, and CLIP-style embeddings. Improved training and retrieval workflows with mixed precision, distributed evaluation, and targeted adaptation techniques including LoRA, QLoRA, and DreamBooth.",
  },
  {
    company: "Highradius Technologies",
    role: "Data Science Intern",
    period: "Jul 2023 - Nov 2023",
    summary:
      "Developed deduction classification models with XGBoost and LightGBM, improved accuracy through feature engineering, and automated monitoring pipelines to reduce drift-driven prediction failures.",
  },
];

const projects = [
  {
    title: "EchoSeek",
    stack: "Llama 3.1, LangChain, FastAPI, Docker, Next.js",
    description:
      "A multimodal product discovery platform using retrieval-augmented generation for intelligent search, comparison, and real-time response quality.",
  },
  {
    title: "White Balance Regression Model",
    stack: "EfficientNetV2-S, Computer Vision",
    description:
      "A vision model for estimating color temperature and tint, designed to improve automatic white balance correction accuracy in image pipelines.",
  },
  {
    title: "Order Amount Prediction",
    stack: "Random Forest, XGBoost, Forecasting",
    description:
      "A business forecasting workflow with feature engineering and tuned ensemble models to strengthen downstream planning decisions.",
  },
];

const skillGroups = [
  {
    label: "Core ML",
    items: ["Python", "PyTorch", "TensorFlow", "Computer Vision", "Generative AI"],
  },
  {
    label: "LLM Stack",
    items: ["LLMs", "RAG", "LangChain", "NVIDIA NIM", "Prompt Workflows"],
  },
  {
    label: "Product Engineering",
    items: ["FastAPI", "Next.js", "React", "Docker", "AWS SageMaker"],
  },
];

export default function Home() {
  return (
    <main className="relative overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.16),_transparent_32%),linear-gradient(180deg,_#1f4b3f_0%,_#10241f_46%,_#091310_100%)] text-stone-100">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:72px_72px] opacity-15" />

      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-8 sm:px-8 lg:px-12">
        <header className="flex flex-col gap-6 rounded-[2rem] border border-white/10 bg-white/6 px-6 py-5 backdrop-blur md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.35em] text-emerald-200/80">
              Personal Dashboard
            </p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Pratim Dasude
            </h1>
          </div>

          <nav className="flex flex-wrap gap-3 text-sm text-stone-300">
            <a className="rounded-full border border-white/10 px-4 py-2 transition hover:border-emerald-300/40 hover:text-white" href="#work">
              Work
            </a>
            <a className="rounded-full border border-white/10 px-4 py-2 transition hover:border-emerald-300/40 hover:text-white" href="#projects">
              Projects
            </a>
            <a className="rounded-full border border-white/10 px-4 py-2 transition hover:border-emerald-300/40 hover:text-white" href="#skills">
              Skills
            </a>
            <a className="rounded-full border border-emerald-300/30 bg-emerald-300/10 px-4 py-2 text-emerald-100 transition hover:bg-emerald-300/20" href="mailto:pratim4dasude@gmail.com">
              Contact
            </a>
          </nav>
        </header>

        <section className="grid gap-8 pb-12 pt-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
          <div className="space-y-6">
            <p className="font-mono text-sm uppercase tracking-[0.35em] text-emerald-200/75">
              Machine Learning Engineer
            </p>
            <div className="space-y-4">
              <h2 className="max-w-4xl text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
                Building AI products that move from research to production.
              </h2>
              <p className="max-w-2xl text-base leading-8 text-stone-300 sm:text-lg">
                I work across multimodal learning, retrieval systems, and deployment-focused ML engineering. The goal is straightforward: make advanced models useful, measurable, and reliable in real products.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {highlights.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-emerald-200/15 bg-emerald-100/8 px-4 py-2 text-sm text-emerald-50/90"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <aside className="rounded-[2rem] border border-white/10 bg-stone-950/35 p-6 shadow-2xl shadow-black/20 backdrop-blur">
            <p className="font-mono text-xs uppercase tracking-[0.35em] text-emerald-200/70">
              Snapshot
            </p>
            <div className="mt-6 space-y-5">
              <div>
                <p className="text-sm text-stone-400">Location</p>
                <p className="mt-1 text-lg text-white">Bengaluru, Karnataka</p>
              </div>
              <div>
                <p className="text-sm text-stone-400">Current focus</p>
                <p className="mt-1 text-lg text-white">
                  VLMs, diffusion workflows, RAG systems
                </p>
              </div>
              <div>
                <p className="text-sm text-stone-400">Links</p>
                <div className="mt-2 flex flex-col gap-2 text-sm text-emerald-100">
                  <a className="transition hover:text-white" href="mailto:pratim4dasude@gmail.com">
                    pratim4dasude@gmail.com
                  </a>
                  <span>linkedin/pratim-dasude</span>
                  <span>github/pratim4dasude</span>
                </div>
              </div>
            </div>
          </aside>
        </section>

        <section className="grid gap-4 border-y border-white/10 py-8 sm:grid-cols-3">
          {metrics.map((metric) => (
            <div key={metric.label} className="rounded-[1.5rem] border border-white/8 bg-white/5 p-5">
              <p className="text-3xl font-semibold text-white">{metric.value}</p>
              <p className="mt-2 text-sm leading-6 text-stone-300">{metric.label}</p>
            </div>
          ))}
        </section>

        <section className="grid gap-6 py-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/6 p-6 backdrop-blur">
            <p className="font-mono text-xs uppercase tracking-[0.35em] text-emerald-200/70">
              About
            </p>
            <h3 className="mt-4 text-2xl font-semibold text-white">Engineering with an ML product mindset</h3>

          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {focusAreas.map((area) => (
              <article
                key={area.title}
                className="rounded-[2rem] border border-white/10 bg-stone-950/35 p-6 backdrop-blur"
              >
                <h3 className="text-lg font-semibold text-white">{area.title}</h3>
                <p className="mt-3 text-sm leading-7 text-stone-300">{area.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="work" className="grid gap-6 py-6 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.35em] text-emerald-200/70">
              Experience
            </p>
            <h3 className="mt-4 text-3xl font-semibold text-white">Recent work</h3>
          </div>

          <div className="space-y-4">
            {experience.map((item) => (
              <article
                key={`${item.company}-${item.role}`}
                className="rounded-[2rem] border border-white/10 bg-white/6 p-6 backdrop-blur"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h4 className="text-xl font-semibold text-white">{item.role}</h4>
                    <p className="mt-1 text-sm text-emerald-100">{item.company}</p>
                  </div>
                  <p className="font-mono text-xs uppercase tracking-[0.22em] text-stone-400">
                    {item.period}
                  </p>
                </div>
                <p className="mt-4 text-sm leading-7 text-stone-300 sm:text-base">
                  {item.summary}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section id="projects" className="py-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.35em] text-emerald-200/70">
                Selected Projects
              </p>
              <h3 className="mt-3 text-3xl font-semibold text-white">Systems built around applied ML</h3>
            </div>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {projects.map((project, index) => (
              <article
                key={project.title}
                className="group rounded-[2rem] border border-white/10 bg-white/6 p-6 transition hover:-translate-y-1 hover:border-emerald-300/30 hover:bg-white/8"
              >
                <p className="font-mono text-xs uppercase tracking-[0.25em] text-emerald-200/65">
                  Project 0{index + 1}
                </p>
                <h4 className="mt-4 text-xl font-semibold text-white">{project.title}</h4>
                <p className="mt-2 text-sm text-emerald-100">{project.stack}</p>
                <p className="mt-4 text-sm leading-7 text-stone-300">{project.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="skills" className="grid gap-6 py-8 lg:grid-cols-[1fr_0.7fr]">
          <div className="rounded-[2rem] border border-white/10 bg-stone-950/35 p-6 backdrop-blur">
            <p className="font-mono text-xs uppercase tracking-[0.35em] text-emerald-200/70">
              Skills
            </p>
            <div className="mt-6 space-y-5">
              {skillGroups.map((group) => (
                <div key={group.label}>
                  <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/90">
                    {group.label}
                  </h4>
                  <div className="mt-3 flex flex-wrap gap-3">
                    {group.items.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full border border-white/10 bg-white/6 px-4 py-2 text-sm text-stone-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/6 p-6 backdrop-blur">
            <p className="font-mono text-xs uppercase tracking-[0.35em] text-emerald-200/70">
              Education
            </p>
            <h3 className="mt-4 text-2xl font-semibold text-white">
              Kalinga Institute of Industrial Technology
            </h3>
            <p className="mt-3 text-sm leading-7 text-stone-300 sm:text-base">
              B.Tech in Computer Science and Engineering, 2020 - 2024
            </p>
            <p className="mt-2 text-sm leading-7 text-stone-300 sm:text-base">
              CGPA: 9.15
            </p>
            <p className="mt-4 text-sm leading-7 text-stone-300 sm:text-base">
              Strong academic grounding in machine learning, deep learning, computer vision, and software systems.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

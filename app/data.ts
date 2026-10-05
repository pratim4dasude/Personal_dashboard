import { projects } from "./projects";

export const highlights = [
  "Multimodal AI systems",
  "Computer vision pipelines",
  "RAG and LLM applications",
  "Production ML deployment",
];

export const focusAreas = [
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

export const metrics = [
  { value: "2+", label: "years building ML systems" },
  { value: "100+", label: "SKUs improved in model workflows" },
  { value: String(projects.length), label: "selected projects, written up" },
];

export type ExperienceItem = {
  slug: string;
  company: string;
  role: string;
  period: string;
  summary: string;
  tech: string[];
  highlights: string[];
  responsibilities: { title: string; body: string }[];
  impact: string[];
};

// NOTE: The detailed fields (highlights, responsibilities, impact) are drafted from the
// one-paragraph summaries. Replace them with exact projects, numbers and outcomes.
export const experience: ExperienceItem[] = [
  {
    slug: "ailusion-ml-engineer",
    company: "AiLusion, Merosa Technologies Pvt. Ltd",
    role: "Machine Learning Engineer",
    period: "Jan 2025 - Present",
    tech: ["PyTorch", "Flux-Dev", "CLIP", "Diffusers", "LoRA", "QLoRA", "DreamBooth"],
    summary:
      "Built and fine-tuned large-scale VLMs and diffusion models with PyTorch, Flux-Dev, and CLIP-style embeddings. Improved training and retrieval workflows with mixed precision, distributed evaluation, and targeted adaptation techniques including LoRA, QLoRA, and DreamBooth.",
    highlights: [
      "Fine-tuned vision-language and diffusion models for applied product use cases",
      "Sped up training with mixed precision and parallel evaluation",
      "Adapted models cheaply with LoRA, QLoRA and DreamBooth",
      "Improved multimodal retrieval with CLIP-style embeddings",
    ],
    responsibilities: [
      {
        title: "Model training and adaptation",
        body: "Trained and fine-tuned large VLMs and diffusion models (including Flux-Dev) in PyTorch, choosing the lightest adaptation method that meets the quality bar: LoRA and QLoRA for parameter-efficient tuning, DreamBooth for subject-specific personalisation.",
      },
      {
        title: "Training efficiency",
        body: "Used mixed-precision training and distributed evaluation to shorten experiment cycles, so more ideas could be tested per week on the same hardware.",
      },
      {
        title: "Retrieval and embeddings",
        body: "Built and tuned CLIP-style embedding workflows for multimodal retrieval, improving how well text and image queries match the right items.",
      },
      {
        title: "Evaluation",
        body: "Set up repeatable evaluation so model changes could be compared on the same footing before they reached a product.",
      },
    ],
    impact: [
      "Faster experiment turnaround through mixed precision and distributed evaluation",
      "Lower fine-tuning cost using parameter-efficient adaptation",
      "Better retrieval quality from improved embedding workflows",
    ],
  },
  {
    slug: "highradius-data-science-intern",
    company: "Highradius Technologies",
    role: "Data Science Intern",
    period: "Jul 2023 - Nov 2023",
    tech: ["XGBoost", "LightGBM", "Python", "Feature engineering", "Drift monitoring"],
    summary:
      "Developed deduction classification models with XGBoost and LightGBM, improved accuracy through feature engineering, and automated monitoring pipelines to reduce drift-driven prediction failures.",
    highlights: [
      "Built deduction classification models with XGBoost and LightGBM",
      "Raised accuracy through targeted feature engineering",
      "Automated monitoring to catch drift before it caused failures",
    ],
    responsibilities: [
      {
        title: "Classification modelling",
        body: "Developed gradient-boosted models (XGBoost, LightGBM) to classify payment deductions, comparing them against baselines to pick the best performer.",
      },
      {
        title: "Feature engineering",
        body: "Designed features from transaction and customer history that lifted model accuracy over the raw-column baseline.",
      },
      {
        title: "Monitoring automation",
        body: "Automated monitoring pipelines that watch input and prediction distributions, reducing failures caused by data drift.",
      },
    ],
    impact: [
      "Higher classification accuracy from engineered features",
      "Fewer drift-driven prediction failures through automated monitoring",
    ],
  },
];

export function getExperience(slug: string) {
  return experience.find((e) => e.slug === slug);
}

export type SkillGroup = {
  label: string;
  /** Everything, shown in the written list. */
  items: string[];
  /** The most representative subset, shown in the plot and on the landing page. */
  plot: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    label: "Core ML",
    items: [
      "Python",
      "PyTorch",
      "TensorFlow",
      "Scikit-learn",
      "XGBoost",
      "LightGBM",
      "SARIMAX",
      "Hugging Face Transformers",
      "PEFT",
      "Embeddings",
      "Transfer Learning",
      "Feature Engineering",
      "Model Evaluation",
    ],
    plot: ["Python", "PyTorch", "TensorFlow", "Scikit-learn", "XGBoost", "Transformers", "Embeddings"],
  },
  {
    label: "Vision & Generative AI",
    items: [
      "Computer Vision",
      "Diffusers",
      "FLUX",
      "ControlNet",
      "Grounding DINO",
      "SAM",
      "YOLO",
      "U-Net",
      "LoRA",
      "QLoRA",
      "DreamBooth",
      "SDXL",
      "Stable Diffusion 3",
      "IP-Adapter",
      "Florence-2",
      "LLaVA",
      "Vision-Language Models",
      "Image Segmentation",
      "Inpainting",
      "Pose Estimation",
      "Depth Estimation",
      "Virtual Try-On",
    ],
    plot: [
      "Computer Vision",
      "Diffusers",
      "FLUX",
      "ControlNet",
      "Grounding DINO",
      "SAM",
      "YOLO",
      "U-Net",
      "LoRA",
      "IP-Adapter",
      "VLMs",
    ],
  },
  {
    label: "LLMs & Agents",
    items: [
      "LLMs",
      "RAG",
      "LangChain",
      "LangGraph",
      "LlamaIndex",
      "Pinecone",
      "Multi-agent systems",
      "Agentic AI",
      "MCP",
      "Hybrid Search",
      "Reranking",
      "Vector Search",
      "Prompt Engineering",
      "Structured Outputs",
      "Multimodal AI",
      "Human-in-the-loop",
      "Evidence Grounding",
      "Citation Validation",
      "Azure OpenAI",
      "NVIDIA NIM",
    ],
    plot: ["LLMs", "RAG", "LangChain", "LangGraph", "LlamaIndex", "Pinecone", "Multi-agent systems", "MCP", "Reranking"],
  },
  {
    label: "Engineering & MLOps",
    items: [
      "FastAPI",
      "Async Python",
      "REST APIs",
      "Next.js",
      "React",
      "TypeScript",
      "Docker",
      "Docker Compose",
      "Kubernetes",
      "Argo CD",
      "Temporal",
      "PostgreSQL",
      "Redis",
      "Elasticsearch",
      "MinIO / S3",
      "AWS SageMaker",
      "Model Serving",
      "CI/CD",
      "Git",
      "Vercel",
    ],
    plot: ["FastAPI", "Docker", "Kubernetes", "Temporal", "PostgreSQL", "Redis", "AWS SageMaker", "Next.js"],
  },
];

export const profile = {
  name: "Pratim Dasude",
  role: "Machine Learning Engineer",
  location: "Bengaluru, Karnataka",
  focus: "VLMs, diffusion workflows, RAG systems",
  email: "pratim4dasude@gmail.com",
  github: { label: "github/pratim4dasude", href: "https://github.com/pratim4dasude" },
  // TODO: add the real LinkedIn URL as `href` to make this a link.
  linkedin: { label: "linkedin/pratim-dasude", href: null as string | null },
};

export const navLinks = [
  { label: "About", href: "/about" },
  { label: "Experience", href: "/experience" },
  { label: "Projects", href: "/projects" },
  { label: "Publications", href: "/publications" },
  { label: "Open Source", href: "/open-source" },
  { label: "Skills", href: "/skills" },
  { label: "Contact", href: "/contact" },
];

export const education = {
  school: "Kalinga Institute of Industrial Technology",
  degree: "B.Tech in Computer Science and Engineering",
  period: "2020 - 2024",
  cgpa: "9.15",
  summary:
    "Strong academic grounding in machine learning, deep learning, computer vision, and software systems.",
};

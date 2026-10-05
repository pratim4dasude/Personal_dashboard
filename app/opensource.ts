export type Contribution = {
  repo: string;
  title: string;
  status: "Open" | "Closed" | "Merged";
  url: string;
  description: string;
};

export type Repo = {
  name: string;
  description: string;
  language: string;
  url: string;
  tags: string[];
};

export type Pkg = {
  name: string;
  description: string;
  pypi: string;
  github?: string;
  install: string;
};

// Pull requests authored on other people's repos (verified from the GitHub API).
export const contributions: Contribution[] = [
  {
    repo: "huggingface/diffusers",
    title: "New Pipeline: FluxFillControlNetInpaintPipeline for FLUX Fill-Based Inpainting with ControlNet",
    status: "Merged",
    url: "https://github.com/huggingface/diffusers/pull/12649",
    description:
      "Added ControlNet conditioning to FLUX Fill inpainting. Merged into huggingface/diffusers as a community pipeline on 19 Nov 2025.",
  },
  {
    repo: "lllyasviel/IC-Light",
    title: "Fix compatibility issues between huggingface_hub, diffusers, and transformers versioning",
    status: "Open",
    url: "https://github.com/lllyasviel/IC-Light/pull/121",
    description:
      "Fixes version incompatibilities so the relighting project runs with current library releases.",
  },
];

// Selected public repositories (descriptions from GitHub).
export const featuredRepos: Repo[] = [
  {
    name: "Wardrobe_Recommendation_Engine",
    description:
      "Agentic AI stylist that understands clothing images and style intent to recommend compatible outfits using multimodal search and hybrid retrieval.",
    language: "Python",
    url: "https://github.com/pratim4dasude/Wardrobe_Recommendation_Engine",
    tags: ["Agents", "Multimodal", "Retrieval"],
  },
  {
    name: "Ai_Builder",
    description:
      "Multi-agent AI system for logistics, finance, and growth marketing intelligence using FastAPI, LLM orchestration, memory, and real-time streaming.",
    language: "Python",
    url: "https://github.com/pratim4dasude/Ai_Builder",
    tags: ["Multi-agent", "FastAPI", "Streaming"],
  },
  {
    name: "PDReader",
    description: "Turn PDFs into searchable, conversational knowledge using AI.",
    language: "Python",
    url: "https://github.com/pratim4dasude/PDReader",
    tags: ["RAG", "PDF"],
  },
  {
    name: "oRobotics",
    description: "Prompt-based crack and drywall segmentation using fine-tuned Grounding DINO and SAM.",
    language: "Jupyter Notebook",
    url: "https://github.com/pratim4dasude/oRobotics",
    tags: ["Segmentation", "Grounding DINO", "SAM"],
  },
  {
    name: "EchoSeek",
    description: "AI-driven fashion discovery platform enabling smart outfit search through natural language and visual queries.",
    language: "TypeScript",
    url: "https://github.com/pratim4dasude/EchoSeek",
    tags: ["Multimodal", "Next.js", "Search"],
  },
  {
    name: "pipline_flux_fill_controlnet_Inpaint",
    description:
      "Flux Fill + ControlNet Inpaint pipeline built on Hugging Face Diffusers for structured mask-based image editing.",
    language: "Python",
    url: "https://github.com/pratim4dasude/pipline_flux_fill_controlnet_Inpaint",
    tags: ["Diffusers", "Flux", "ControlNet"],
  },
];

// PyPI packages (verified against the PyPI JSON API). The section hides itself when empty.
// Example entry:
// { name: "my-package", description: "...", pypi: "https://pypi.org/project/my-package/", install: "pip install my-package" }
export const packages: Pkg[] = [
  {
    name: "finetuning-grounding-dino-sam",
    description:
      "A command-line tool to fine-tune Grounding DINO (text-conditioned detection) and Segment Anything (segmentation) on custom COCO-format datasets, with mixed precision and automatic checkpoints.",
    pypi: "https://pypi.org/project/finetuning-grounding-dino-sam/",
    github: "https://github.com/pratim4dasude/finetuning_grounded_dino_sam",
    install: "pip install finetuning-grounding-dino-sam",
  },
];

export const githubStats = {
  username: "pratim4dasude",
  profile: "https://github.com/pratim4dasude",
  publicRepos: 47,
  followers: 9,
};

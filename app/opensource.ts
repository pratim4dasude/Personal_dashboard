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
    status: "Closed",
    url: "https://github.com/huggingface/diffusers/pull/12649",
    description:
      "Proposed a pipeline that adds ControlNet conditioning to FLUX Fill inpainting in Diffusers.",
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
    name: "Finance_AI_Assistant",
    description:
      "AI-powered financial assistant microservice with multi-agent routing, safety checks, portfolio insights, and real-time streaming responses.",
    language: "Python",
    url: "https://github.com/pratim4dasude/Finance_AI_Assistant",
    tags: ["Multi-agent", "Safety", "Streaming"],
  },
  {
    name: "PDReader",
    description: "Turn PDFs into searchable, conversational knowledge using AI.",
    language: "Python",
    url: "https://github.com/pratim4dasude/PDReader",
    tags: ["RAG", "PDF"],
  },
  {
    name: "CustomerChat",
    description:
      "RAG-powered IT chatbot using Pinecone + GPT-4 with semantic search, session management, and sentiment analysis.",
    language: "TypeScript",
    url: "https://github.com/pratim4dasude/CustomerChat",
    tags: ["RAG", "Pinecone", "GPT-4"],
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

// PyPI packages. Empty until real package names are added; the section hides itself when empty.
// Example entry:
// { name: "my-package", description: "...", pypi: "https://pypi.org/project/my-package/", install: "pip install my-package" }
export const packages: Pkg[] = [];

export const githubStats = {
  username: "pratim4dasude",
  profile: "https://github.com/pratim4dasude",
  publicRepos: 47,
  followers: 9,
};

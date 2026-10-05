export type ResearchItem = {
  slug: string;
  title: string;
  area: string;
  summary: string;
  question: string;
  method: string[];
  tags: string[];
  repo: string;
};

// Research and experiments, taken from public repos at github.com/pratim4dasude.
// These are applied experiments and open implementations, not peer-reviewed papers.
// Add paper links or results under each item as they become available.
export const research: ResearchItem[] = [
  {
    slug: "grounded-dino-sam-finetuning",
    title: "Prompt-guided detection and segmentation",
    area: "Computer Vision",
    summary:
      "Fine-tuning Grounded DINO together with SAM so a text prompt produces both a bounding box and a pixel-accurate mask.",
    question:
      "Can an open-vocabulary detector plus a promptable segmenter be adapted to narrow, domain-specific targets (such as cracks and drywall) without training a segmentation model from scratch?",
    method: [
      "Fine-tune Grounded DINO to localise targets from text prompts",
      "Feed its boxes into SAM to get masks",
      "Evaluate segmentation quality on the target domain",
    ],
    tags: ["Grounded DINO", "SAM", "Segmentation", "PyTorch"],
    repo: "https://github.com/pratim4dasude/finetuning_grounded_dino_sam",
  },
  {
    slug: "flux-fill-controlnet-inpainting",
    title: "Flux Fill + ControlNet inpainting pipeline",
    area: "Generative AI",
    summary:
      "A Diffusers pipeline that combines FLUX Fill with ControlNet conditioning for structured, mask-based image editing. Proposed upstream to Hugging Face Diffusers.",
    question:
      "How can structural control (edges, depth, pose) be combined with fill-based inpainting in Flux so edits follow the layout of the original image?",
    method: [
      "Extend the Diffusers Flux Fill pipeline with ControlNet inputs",
      "Support mask-based edits with structural guidance",
      "Package it as a pipeline class and submit a pull request to huggingface/diffusers",
    ],
    tags: ["Flux", "ControlNet", "Diffusers", "Inpainting"],
    repo: "https://github.com/pratim4dasude/pipline_flux_fill_controlnet_Inpaint",
  },
  {
    slug: "retina-vein-segmentation",
    title: "Retina vein segmentation with U-Net",
    area: "Medical Imaging",
    summary: "Segmenting blood vessels in retinal images with a U-Net.",
    question: "How accurately can a U-Net trace the fine vessel structure in retinal fundus images?",
    method: [
      "Train a U-Net for pixel-wise vessel segmentation",
      "Evaluate overlap between predicted and annotated vessels",
    ],
    tags: ["U-Net", "Segmentation", "Medical imaging"],
    repo: "https://github.com/pratim4dasude/Retina-Vein-Segmentation-using-UNET",
  },
  {
    slug: "retail-demand-forecasting",
    title: "Retail demand forecasting on M5 Walmart data",
    area: "Forecasting",
    summary:
      "Multi-level retail sales analysis and future demand prediction on the M5 Walmart dataset using SARIMAX.",
    question:
      "How well do classical statistical models with exogenous signals forecast demand across store, department and item levels?",
    method: [
      "Explore seasonality and trend across hierarchy levels",
      "Fit SARIMAX models with exogenous features",
      "Evaluate forecasts on held-out periods",
    ],
    tags: ["SARIMAX", "Time series", "M5 Walmart"],
    repo: "https://github.com/pratim4dasude/Retail_Demand_Forecasting",
  },
];

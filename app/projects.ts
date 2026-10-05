export type Layer = { name: string; tech: string; detail: string };

export type PipelineStep = { name: string; detail: string; image?: string; caption?: string };
export type GalleryItem = { input: string; mask: string; overlay: string; caption: string; prompt?: string; score?: number };

export type Project = {
  slug: string;
  year?: string;
  cover?: string;
  outcomeLine?: string;
  gallery?: GalleryItem[];
  pipeline?: PipelineStep[];
  repo?: string;
  title: string;
  stack: string;
  description: string;
  tagline: string;
  tags: string[];
  overview: string;
  problem: string;
  approach: { title: string; body: string }[];
  architecture: { summary: string; layers: Layer[] };
  features: string[];
  challenges: { problem: string; solution: string }[];
  outcomes: string[];
  learnings: string[];
  next: string[];
};

// NOTE: The detailed sections below are a first draft written from the project
// summaries. Review each one and replace it with exact decisions, numbers and links.
export const projects: Project[] = [
  {
    slug: "site-crack-segmentation",
    repo: "https://github.com/pratim4dasude/oRobotics",
    cover: "/vision/crack-1-overlay.jpg",
    title: "Prompt-guided crack and drywall segmentation",
    stack: "Grounding DINO, SAM, PyTorch, Colab",
    description:
      "Text-prompted segmentation of wall cracks and drywall seams: a fine-tuned Grounding DINO proposes the box, a fine-tuned SAM draws the mask.",
    tagline: "Type what you want to find. Get a box, then a pixel mask.",
    outcomeLine: "One text prompt in, one box and one clean binary mask out, on wall cracks and drywall seams.",
    tags: ["Segmentation", "Grounding DINO", "SAM", "Fine-tuning"],
    overview:
      "A two-stage, prompt-based segmentation pipeline for construction-site inspection. A text prompt such as \"cracks\" or \"dry wall\" goes into a fine-tuned Grounding DINO, which returns a bounding box with a confidence score. That box prompts a fine-tuned Segment Anything model, which returns the binary mask. Both models were adapted to the crack and drywall-seam domain.",
    problem:
      "Cracks and drywall seams are thin, low-contrast and look different on every surface: rough plaster, painted board, grayscale captures. Off-the-shelf zero-shot detectors miss them or box the whole wall, and a generic SAM given a loose box fills the wrong region. Inspection needs a mask that follows the defect, not a rectangle around it.",
    approach: [
      {
        title: "Describe the target in words",
        body: "The user supplies a short text prompt. The same pipeline handles both tasks; only the prompt changes, for example \"cracks\" for walls and \"dry wall\" for drywall seams.",
      },
      {
        title: "Fine-tune Grounding DINO for the box",
        body: "Grounding DINO is fine-tuned on crack and drywall imagery so that the prompt grounds to the defect region with a usable confidence score, instead of the generic wall surface.",
      },
      {
        title: "Fine-tune SAM for the mask",
        body: "The predicted box becomes the prompt for SAM. Adapting SAM to thin structures keeps the mask tight to the crack edge rather than bleeding into surrounding texture.",
      },
      {
        title: "Evaluate on masks, not boxes",
        body: "Quality is judged on the segmentation output against ground-truth masks, since a good box can still produce a poor mask on a hairline crack.",
      },
    ],
    architecture: {
      summary:
        "Language prompt to box to mask. Each stage hands one artefact to the next, so any stage can be inspected or swapped on its own.",
      layers: [
        { name: "Input image", tech: "RGB, 640 x 640", detail: "Site photo of a wall or drywall surface, resized for the detector." },
        { name: "Text prompt", tech: "\"cracks\" / \"dry wall\"", detail: "Plain-language description of the region to find." },
        { name: "Grounding DINO", tech: "Fine-tuned detector", detail: "Grounds the prompt to a bounding box with a confidence score." },
        { name: "SAM", tech: "Fine-tuned segmenter", detail: "Takes the box as a prompt and produces the binary mask." },
        { name: "Overlay", tech: "Mask + box on input", detail: "Mask tinted over the photo with the labelled box for review." },
      ],
    },
    pipeline: [
      { name: "Input", detail: "Raw 640 x 640 photo with a text prompt attached.", image: "/vision/crack-2-input.jpg", caption: "input" },
      { name: "Grounding DINO + SAM", detail: "The prompt grounds to a box; the box prompts the mask.", image: "/vision/crack-2-mask.jpg", caption: "binary mask" },
      { name: "Overlay", detail: "Mask and labelled box composited on the input.", image: "/vision/crack-2-overlay.jpg", caption: "segment cracks 0.37" },
    ],
    gallery: [
      { input: "/vision/crack-1-input.jpg", mask: "/vision/crack-1-mask.jpg", overlay: "/vision/crack-1-overlay.jpg", caption: "Wall crack on rough plaster", prompt: "cracks" },
      { input: "/vision/crack-2-input.jpg", mask: "/vision/crack-2-mask.jpg", overlay: "/vision/crack-2-overlay.jpg", caption: "Wide crack on a bright, overexposed wall", prompt: "segment cracks", score: 0.37 },
      { input: "/vision/crack-3-input.jpg", mask: "/vision/crack-3-mask.jpg", overlay: "/vision/crack-3-overlay.jpg", caption: "Hairline crack on textured render", prompt: "cracks" },
      { input: "/vision/crack-4-input.jpg", mask: "/vision/crack-4-mask.jpg", overlay: "/vision/crack-4-overlay.jpg", caption: "Drywall seam, rotated capture", prompt: "dry wall", score: 0.52 },
      { input: "/vision/crack-5-input.jpg", mask: "/vision/crack-5-mask.jpg", overlay: "/vision/crack-5-overlay.jpg", caption: "Drywall seams, grayscale panel", prompt: "dry wall", score: 0.42 },
      { input: "/vision/crack-6-input.jpg", mask: "/vision/crack-6-mask.jpg", overlay: "/vision/crack-6-overlay.jpg", caption: "Panel joints meeting the floor", prompt: "dry wall", score: 0.28 },
    ],
    features: [
      "One pipeline for two defect types, switched by the text prompt",
      "Box with confidence score and pixel-level binary mask per image",
      "Overlay output for fast visual review",
      "Notebook-based, runs on a Colab GPU",
    ],
    challenges: [
      {
        problem: "Thin cracks produce very small, low-confidence boxes.",
        solution: "Fine-tuned the detector on the domain so the prompt grounds to the defect, and kept box confidence visible in the output so weak detections are easy to spot.",
      },
      {
        problem: "Drywall seams share a box with the whole panel, so the mask can spread over the panel.",
        solution: "Fine-tuned SAM so the mask hugs the seam, and reviewed overlays to catch cases where it still over-segments, such as the lower-confidence samples.",
      },
      {
        problem: "Capture conditions vary: overexposure, grayscale, rotated frames.",
        solution: "Tested across mixed samples rather than a single clean set, and kept the results gallery unfiltered.",
      },
    ],
    outcomes: [
      "Working prompt-to-mask pipeline on real wall-crack and drywall-seam photos",
      "Masks that follow the defect outline on both tasks, with weaker cases kept visible in the gallery",
    ],
    learnings: [
      "A good box is not a good mask: judge segmentation on the mask itself.",
      "Confidence scores on thin structures stay low even when the mask is right, so treat them as a flag, not a verdict.",
    ],
    next: [
      "Report mask metrics (IoU and Dice) per task on a held-out split",
      "Add post-processing to remove drywall false positives on panel edges",
      "Export to a faster inference path for on-site use",
    ],
  },
  {
    slug: "echoseek",
    outcomeLine: "Product search that answers from the catalog instead of from the model's imagination.",
    title: "EchoSeek",
    stack: "Llama 3.1, LangChain, FastAPI, Docker, Next.js",
    description:
      "A multimodal product discovery platform using retrieval-augmented generation for intelligent search, comparison, and real-time response quality.",
    tagline: "Ask for a product in plain language, get grounded answers and comparisons.",
    tags: ["RAG", "LLM", "Multimodal", "Full stack"],
    overview:
      "EchoSeek is a product discovery platform where shoppers describe what they want in natural language (or with an image) and receive ranked results, side-by-side comparisons and answers grounded in the catalog rather than in the model's imagination.",
    problem:
      "Keyword search fails on how people actually shop: vague intent, attribute-heavy queries and visual taste. Plain LLM chat fixes the language problem but invents specs and prices. The goal was an experience that understands intent and stays factual.",
    approach: [
      {
        title: "Index the catalog as embeddings",
        body: "Product text and images are embedded into a shared vector space so a text query can match either description or look. Metadata (price, brand, category) is kept alongside for filtering.",
      },
      {
        title: "Retrieve, then rerank",
        body: "A fast vector search pulls candidates, structured filters narrow them, and a rerank step orders the final shortlist so the context sent to the LLM is small and relevant.",
      },
      {
        title: "Generate grounded answers",
        body: "Llama 3.1 is orchestrated with LangChain and prompted to answer only from the retrieved products, citing which item each claim comes from. Comparisons are produced from the same structured records.",
      },
      {
        title: "Stream to the UI",
        body: "FastAPI streams tokens to a Next.js front end so users see answers form in real time, with product cards rendered next to the text.",
      },
    ],
    architecture: {
      summary:
        "A retrieval-first pipeline: every answer is built from retrieved catalog records, and the front end talks to a single streaming API.",
      layers: [
        { name: "Client", tech: "Next.js", detail: "Chat and search UI, product cards, comparison view, streamed responses." },
        { name: "API", tech: "FastAPI", detail: "Query endpoint, request validation, streaming responses, session handling." },
        { name: "Orchestration", tech: "LangChain", detail: "Query rewriting, retrieval chain, prompt assembly and output parsing." },
        { name: "Retrieval", tech: "Embeddings + vector store", detail: "Hybrid text/image embeddings, metadata filters, reranking of candidates." },
        { name: "Generation", tech: "Llama 3.1", detail: "Grounded answer and comparison generation from retrieved context only." },
        { name: "Deployment", tech: "Docker", detail: "Containerised API and front end for reproducible local and cloud runs." },
      ],
    },
    features: [
      "Natural-language and image-assisted product search",
      "Side-by-side product comparison generated from structured data",
      "Streaming answers with source products attached",
      "Filters on price, brand and attributes combined with semantic search",
    ],
    challenges: [
      {
        problem: "The model stated specs that were not in the catalog.",
        solution:
          "Restricted the prompt to retrieved records, required item-level attribution, and returned 'not available' when a field was missing.",
      },
      {
        problem: "Retrieval returned near-duplicates, crowding out variety.",
        solution: "Added reranking and de-duplication before building the context window.",
      },
      {
        problem: "Slow first token hurt perceived quality.",
        solution: "Streamed the response end to end and rendered product cards as soon as retrieval finished.",
      },
    ],
    outcomes: [
      "Working end-to-end RAG product search with comparison and streaming UI",
      "Answers traceable to specific catalog items",
      "Containerised so the whole stack starts with one command",
    ],
    learnings: [
      "Retrieval quality moves answer quality more than prompt tweaks.",
      "Grounding rules need to be tested with adversarial queries, not just happy paths.",
    ],
    next: ["Offline retrieval evaluation set with recall@k tracking", "User feedback loop to tune ranking"],
  },
  {
    slug: "white-balance-regression",
    outcomeLine: "A learned estimator for color temperature and tint, judged on numeric error and on how the corrected image looks.",
    title: "White Balance Regression Model",
    stack: "EfficientNetV2-S, Computer Vision",
    description:
      "A vision model for estimating color temperature and tint, designed to improve automatic white balance correction accuracy in image pipelines.",
    tagline: "Predict the scene's color temperature and tint straight from pixels.",
    tags: ["Computer Vision", "Regression", "PyTorch"],
    overview:
      "This project trains a CNN to look at an image and regress two numbers: color temperature and tint. Those values drive white balance correction so a warm or cool cast can be neutralised automatically.",
    problem:
      "Classic auto white balance relies on heuristics such as gray-world that break on scenes dominated by one color. A learned estimator can use scene context to infer the true illuminant.",
    approach: [
      {
        title: "Frame it as regression",
        body: "Instead of classifying lighting presets, the model predicts continuous temperature and tint, which maps directly onto correction controls.",
      },
      {
        title: "Fine-tune EfficientNetV2-S",
        body: "A pretrained EfficientNetV2-S backbone gives strong features at a small compute budget. A compact regression head outputs the two targets.",
      },
      {
        title: "Augment without breaking labels",
        body: "Augmentations are chosen so they do not alter the illuminant the label describes. Color-shifting augmentations are avoided or paired with adjusted labels.",
      },
      {
        title: "Evaluate on error that matters",
        body: "Beyond MAE per target, results are judged on corrected-image quality, since small numeric errors can be visible or invisible depending on the scene.",
      },
    ],
    architecture: {
      summary:
        "A standard training and inference pipeline around a pretrained backbone with a two-output regression head.",
      layers: [
        { name: "Data", tech: "Image + (temperature, tint) labels", detail: "Dataset loading, normalisation, train/validation split across scenes." },
        { name: "Preprocess", tech: "Resize + label-safe augmentation", detail: "Resolution matched to the backbone; geometric augmentations only by default." },
        { name: "Backbone", tech: "EfficientNetV2-S", detail: "Pretrained feature extractor fine-tuned end to end." },
        { name: "Head", tech: "Regression layers", detail: "Pooled features mapped to two continuous outputs." },
        { name: "Loss & training", tech: "PyTorch", detail: "Regression loss on scaled targets, mixed precision, learning-rate schedule." },
        { name: "Inference", tech: "Correction module", detail: "Predicted values converted into a white balance adjustment on the image." },
      ],
    },
    features: [
      "Continuous temperature and tint prediction",
      "Lightweight backbone suitable for image pipelines",
      "Per-target error reporting and visual before/after checks",
    ],
    challenges: [
      {
        problem: "Targets sit on very different numeric scales.",
        solution: "Standardised both targets so the loss weights them evenly.",
      },
      {
        problem: "Color-based augmentation silently corrupted the labels.",
        solution: "Restricted augmentation to label-preserving transforms.",
      },
    ],
    outcomes: [
      "Trained regressor that estimates temperature and tint from a single image",
      "Evaluation covering both numeric error and visual correction quality",
    ],
    learnings: [
      "Label-aware augmentation matters as much as architecture choice.",
      "Numeric error alone is a weak proxy for perceived image quality.",
    ],
    next: ["Compare against gray-world and other baselines in a table", "Export to ONNX for fast inference"],
  },
  {
    slug: "order-amount-prediction",
    outcomeLine: "A leak-safe forecasting pipeline whose score reflects how the model is actually used.",
    title: "Order Amount Prediction",
    stack: "Random Forest, XGBoost, Forecasting",
    description:
      "A business forecasting workflow with feature engineering and tuned ensemble models to strengthen downstream planning decisions.",
    tagline: "Forecast how much an order will be worth, to plan with fewer surprises.",
    tags: ["Forecasting", "Tabular ML", "Ensembles"],
    overview:
      "A tabular ML workflow that predicts order amounts from historical order and customer data, using engineered features and tuned tree ensembles so planning teams get a dependable estimate.",
    problem:
      "Planning needs a number, not a guess. Order values are skewed and noisy, and simple averages miss customer and seasonal patterns.",
    approach: [
      {
        title: "Understand and clean the data",
        body: "Profile distributions, handle missing values and outliers, and fix leakage risks such as fields only known after the order is placed.",
      },
      {
        title: "Engineer features",
        body: "Add time features (month, weekday, trend), customer history aggregates and ratios that capture buying behaviour.",
      },
      {
        title: "Train a baseline, then ensembles",
        body: "Start with a simple baseline to set the bar, then Random Forest and XGBoost, tuned with cross-validation that respects time order.",
      },
      {
        title: "Select and validate",
        body: "Choose the model on held-out later periods rather than a random split, and inspect feature importance for sanity.",
      },
    ],
    architecture: {
      summary: "A reproducible batch pipeline from raw records to a validated forecasting model.",
      layers: [
        { name: "Ingest", tech: "Raw order data", detail: "Load, validate schema, remove leakage columns." },
        { name: "Features", tech: "Feature engineering", detail: "Temporal features, customer aggregates, ratios, encodings." },
        { name: "Models", tech: "Random Forest, XGBoost", detail: "Tuned tree ensembles compared against a naive baseline." },
        { name: "Validation", tech: "Time-aware CV", detail: "Rolling or forward-chained splits to avoid look-ahead." },
        { name: "Output", tech: "Predictions + report", detail: "Forecasts and feature-importance summary for planners." },
      ],
    },
    features: [
      "Leak-safe feature pipeline",
      "Hyperparameter-tuned Random Forest and XGBoost",
      "Time-ordered validation and baseline comparison",
    ],
    challenges: [
      {
        problem: "Random cross-validation looked great but overestimated real performance.",
        solution: "Switched to time-ordered splits that mirror how the model is used.",
      },
      {
        problem: "Heavy-tailed order values dominated the error.",
        solution: "Used robust handling of outliers and evaluated with metrics suited to skewed targets.",
      },
    ],
    outcomes: [
      "Tuned ensemble that outperforms the naive baseline on later-period data",
      "Clear feature-importance story to explain predictions to stakeholders",
    ],
    learnings: [
      "Validation design decides whether your score means anything.",
      "Good features beat extra tuning on tabular data.",
    ],
    next: ["Add prediction intervals", "Schedule retraining and drift monitoring"],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function readingTime(p: Project) {
  const text = [
    p.overview,
    p.problem,
    p.architecture.summary,
    ...p.approach.flatMap((a) => [a.title, a.body]),
    ...p.architecture.layers.flatMap((l) => [l.name, l.tech, l.detail]),
    ...p.features,
    ...p.challenges.flatMap((c) => [c.problem, c.solution]),
    ...p.outcomes,
    ...p.learnings,
    ...p.next,
  ].join(" ");
  return Math.max(1, Math.round(text.split(/\s+/).length / 200));
}

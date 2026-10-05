export type Layer = { name: string; tech: string; detail: string };

export type Project = {
  slug: string;
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
    slug: "echoseek",
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

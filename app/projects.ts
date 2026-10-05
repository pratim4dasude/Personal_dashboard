export type Layer = { name: string; tech: string; detail: string };

export type PipelineStep = { name: string; detail: string; image?: string; caption?: string };
export type GalleryItem = { input: string; mask: string; overlay: string; caption: string; prompt?: string; score?: number };

export type Project = {
  slug: string;
  year?: string;
  cover?: string;
  /** A single representative visual for projects that are not a crack-style input/output pair. */
  image?: { src: string; alt: string; label: string; caption: string };
  /** Extra full-width figures shown on the project page. */
  extra?: { src: string; alt: string; caption: string }[];
  outcomeLine?: string;
  gallery?: GalleryItem[];
  pipeline?: PipelineStep[];
  repo?: string;
  links?: { label: string; href: string }[];
  /** A package published on PyPI for this project. Shown as a highlighted callout. */
  package?: {
    name: string;
    version: string;
    license: string;
    python: string;
    released: string;
    summary: string;
    install: string;
    pypi: string;
    github: string;
  };
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
const allProjects: Project[] = [
  {
    slug: "site-crack-segmentation",
    repo: "https://github.com/pratim4dasude/oRobotics",
    package: {
      name: "finetuning-grounding-dino-sam",
      version: "0.1.2",
      license: "MIT",
      python: ">=3.9",
      released: "May 2026",
      summary:
        "The fine-tuning side of this project as a command-line tool. Train Grounding DINO for text-conditioned detection and SAM for segmentation on your own COCO-format dataset, with mixed precision, balanced sampling and automatic checkpoints.",
      install: "pip install finetuning-grounding-dino-sam",
      pypi: "https://pypi.org/project/finetuning-grounding-dino-sam/",
      github: "https://github.com/pratim4dasude/finetuning_grounded_dino_sam",
    },
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
    image: {
      src: "/projects/echoseek.jpg",
      alt: "The EchoSeek search prototype with the query formal mens wear",
      label: "prototype",
      caption: "The EchoSeek search prototype, with a natural-language query.",
    },
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
    image: {
      src: "/projects/white-balance-regression.jpg",
      alt: "Histograms of absolute error for color temperature and tint",
      label: "error",
      caption: "Absolute error distributions for color temperature and tint, from the project repository.",
    },
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
    image: {
      src: "/projects/order-amount-prediction.jpg",
      alt: "Line chart of order amount in USD over time",
      label: "eda",
      caption: "Order amount in USD over time, from the exploratory analysis.",
    },
    extra: [
      {
        src: "/projects/order-currency.jpg",
        alt: "Pie chart of order share by currency",
        caption: "Share of orders by currency, from the exploratory analysis.",
      },
    ],
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
  {
    slug: "flux-fill-controlnet-inpainting",
    image: {
      src: "/projects/flux-fill-controlnet-inpainting.jpg",
      alt: "A golden retriever sitting on a wooden bench on a path through golden fields under a galaxy sky, generated by the Flux Fill ControlNet pipeline from a canny edge map",
      label: "canny-guided",
      caption: "Pipeline output, guided by a canny edge map so the bench keeps its shape. Sample from the pull request.",
    },
    extra: [
      {
        src: "/projects/flux-depth.jpg",
        alt: "Depth-guided inpainting: source photo, depth map and result",
        caption: "Depth-guided. Source photo, depth map, then the inpainted result.",
      },
      {
        src: "/projects/flux-pose.jpg",
        alt: "Pose-guided inpainting: source photo, pose skeleton and result",
        caption: "Pose-guided. Source photo, pose skeleton, then the inpainted result.",
      },
      {
        src: "/projects/flux-canny.jpg",
        alt: "Canny-guided inpainting: source photo, edge map and result",
        caption: "Canny-guided. Source photo, edge map, then the inpainted result.",
      },
    ],
    year: "2025",
    repo: "https://github.com/pratim4dasude/pipline_flux_fill_controlnet_Inpaint",
    title: "Flux Fill ControlNet inpainting pipeline",
    stack: "Diffusers, FLUX Fill, ControlNet, PyTorch",
    description:
      "A Diffusers pipeline that adds ControlNet conditioning to FLUX Fill inpainting, merged into huggingface/diffusers as a community pipeline.",
    tagline: "Edit inside a mask, and keep the edit faithful to depth, edges or pose.",
    outcomeLine: "Merged into huggingface/diffusers as a community pipeline (pull request #12649).",
    tags: ["Diffusers", "FLUX Fill", "ControlNet", "Open source"],
    overview:
      "FLUX Fill edits the region inside a mask, but it has no way to follow structure such as depth, edges or pose. This project adds separate ControlNet conditioning to FLUX Fill inside the Hugging Face Diffusers library, so the filled region follows the layout of the control image. It was contributed upstream as FluxFillControlNetInpaintPipeline and merged into huggingface/diffusers as a community pipeline on 19 November 2025.",
    problem:
      "Mask-based inpainting alone lets the model invent geometry inside the hole. For structured edits, such as replacing an object while keeping a pose or a depth layout, you want a second signal that pins the structure down. Diffusers had Flux Fill and had ControlNet, but no pipeline that combined the two.",
    approach: [
      {
        title: "Start from the Flux Fill pipeline",
        body: "Reuse the existing FLUX Fill inpainting pipeline in Diffusers as the base, so mask handling, scheduling and the transformer stay consistent with the library.",
      },
      {
        title: "Add ControlNet inputs",
        body: "Accept separate condition images (depth, canny edges, pose) alongside the image and mask, run them through a ControlNet and feed the residuals into the transformer.",
      },
      {
        title: "Package it as a pipeline class",
        body: "Expose it as FluxFillControlNetInpaintPipeline with the same call pattern as other Diffusers pipelines, plus documentation with usage examples.",
      },
      {
        title: "Share sample outputs and iterate with the maintainers",
        body: "Post sample results for review. The maintainers noted the quality was not ahead of newer editing models, suggested the community-pipeline route, and the pipeline was merged there.",
      },
    ],
    architecture: {
      summary:
        "A Diffusers pipeline: image, mask and a control image go in; a ControlNet turns the control image into guidance for the FLUX Fill transformer.",
      layers: [
        { name: "Inputs", tech: "Image + mask + control image", detail: "The source image, the region to edit, and a depth, canny or pose map." },
        { name: "Text and image encoding", tech: "Flux text encoders, VAE", detail: "Prompt embeddings and latent encoding of the masked image." },
        { name: "ControlNet", tech: "Flux ControlNet", detail: "Converts the control image into residuals that guide each transformer block." },
        { name: "Denoising", tech: "FLUX Fill transformer", detail: "Fills the masked region while following the ControlNet guidance." },
        { name: "Decode", tech: "VAE", detail: "Latents decoded back to the edited image." },
      ],
    },
    features: [
      "ControlNet conditioning on top of FLUX Fill inpainting",
      "Separate depth, canny and pose control inputs",
      "Follows the standard Diffusers pipeline interface",
      "Ships with a README section and usage examples",
    ],
    challenges: [
      {
        problem: "Combining two conditioning paths without breaking the base pipeline.",
        solution: "Kept the Flux Fill code path intact and injected ControlNet residuals at the same points other Flux ControlNet pipelines use.",
      },
      {
        problem: "Result quality compared with newer editing models.",
        solution: "Treated it as a niche tool for structure-controlled edits and moved it to the community pipelines, where people can try it for their own cases.",
      },
    ],
    outcomes: [
      "Merged into huggingface/diffusers as a community pipeline on 19 November 2025",
      "About 1,400 lines added across the pipeline file and its README",
      "A reusable starting point for structure-controlled inpainting with Flux",
    ],
    learnings: [
      "Upstream reviews push you to show outputs early, not just working code.",
      "A pipeline can be useful to a niche even when it is not state of the art overall.",
    ],
    next: ["Add side-by-side outputs for depth, canny and pose to the case study", "Compare against newer editing models in a fixed test set"],
  },
  {
    slug: "retina-vein-segmentation",
    image: {
      src: "/projects/retina-vein-segmentation.jpg",
      alt: "A retinal fundus photograph next to its binary vessel map",
      label: "fundus",
      caption: "A retinal fundus image and its vessel map, from the project notebook.",
    },
    extra: [
      {
        src: "/projects/retina-ground-truth.jpg",
        alt: "Ground truth vessel maps for four retinal images",
        caption: "Ground truth vessel maps.",
      },
      {
        src: "/projects/retina-prediction.jpg",
        alt: "Model predicted vessel maps for the same four retinal images",
        caption: "Model predictions for the same images.",
      },
    ],
    repo: "https://github.com/pratim4dasude/Retina-Vein-Segmentation-using-UNET",
    title: "Retina vein segmentation with U-Net",
    stack: "U-Net, PyTorch, Medical imaging",
    description: "Pixel-wise segmentation of blood vessels in retinal images with a U-Net.",
    tagline: "Trace the fine vessel tree in a retinal photograph, pixel by pixel.",
    outcomeLine: "A U-Net trained to segment retinal vessels from fundus images.",
    tags: ["Segmentation", "U-Net", "Medical imaging"],
    overview:
      "A U-Net model that labels every pixel of a retinal fundus image as vessel or background. Retinal vessel maps are a standard input for screening and for tracking diseases that change the vascular tree.",
    problem:
      "Retinal vessels are thin, branch repeatedly and fade into the background near their tips. Simple thresholding breaks on uneven lighting, and a classifier that sees only whole images cannot say where the vessels are. The task needs dense, pixel-level prediction that keeps thin structures connected.",
    approach: [
      {
        title: "Frame it as pixel-wise segmentation",
        body: "Predict a binary vessel mask for every input image, trained against annotated vessel maps.",
      },
      {
        title: "Use a U-Net",
        body: "An encoder-decoder with skip connections, which keeps fine spatial detail from early layers available to the decoder. That matters for thin vessels.",
      },
      {
        title: "Evaluate overlap with the annotations",
        body: "Compare predicted masks with annotated vessels using overlap-based measures, since plain pixel accuracy is dominated by the background.",
      },
    ],
    architecture: {
      summary: "Image in, vessel mask out, through a standard U-Net encoder-decoder.",
      layers: [
        { name: "Input", tech: "Fundus image", detail: "Retinal photograph, preprocessed and resized." },
        { name: "Encoder", tech: "U-Net contracting path", detail: "Convolution and downsampling blocks that build context." },
        { name: "Decoder", tech: "U-Net expanding path", detail: "Upsampling with skip connections that restore fine detail." },
        { name: "Output", tech: "Per-pixel probability", detail: "Thresholded into a binary vessel mask." },
      ],
    },
    features: ["Pixel-level vessel masks", "Skip connections for thin structures", "Overlap-based evaluation"],
    challenges: [
      {
        problem: "Vessels are a tiny fraction of pixels, so a model can score well by predicting background.",
        solution: "Judge the model on mask overlap with the annotations instead of pixel accuracy.",
      },
    ],
    outcomes: ["A trained U-Net for retinal vessel segmentation", "A repeatable notebook workflow from images to masks"],
    learnings: ["Class imbalance decides which metric is honest.", "Skip connections are what keep thin structures intact."],
    next: ["Add the dataset name, split and overlap scores", "Show predicted masks next to the annotations"],
  },
  {
    slug: "retail-demand-forecasting",
    image: {
      src: "/projects/retail-demand-forecasting.jpg",
      alt: "Line chart of final SARIMAX forecast against actual sales for store CA_1",
      label: "forecast",
      caption: "Final SARIMAX forecast against actual sales for store CA_1, from the project notebooks.",
    },
    extra: [
      {
        src: "/projects/retail-foods-forecast.jpg",
        alt: "Tuned SARIMAX forecast against actual sales for the FOODS category",
        caption: "Tuned SARIMAX forecast against actual sales, FOODS category.",
      },
      {
        src: "/projects/retail-mape-by-level.jpg",
        alt: "Bar chart of average MAPE by forecasting level",
        caption: "Average error (MAPE) by forecasting level: category, department, store and item.",
      },
    ],
    repo: "https://github.com/pratim4dasude/Retail_Demand_Forecasting",
    title: "Retail demand forecasting on M5 Walmart data",
    stack: "SARIMAX, Python, Time series",
    description:
      "Multi-level retail sales analysis and demand prediction on the M5 Walmart dataset using SARIMAX.",
    tagline: "Forecast demand across store, department and item levels.",
    outcomeLine: "SARIMAX forecasts of retail demand on the M5 Walmart dataset, across hierarchy levels.",
    tags: ["Forecasting", "SARIMAX", "Time series"],
    overview:
      "A forecasting study on the M5 Walmart dataset. It explores sales across the store, department and item hierarchy and fits SARIMAX models, which combine seasonality with external signals, to predict future demand.",
    problem:
      "Retail demand is seasonal, noisy and arranged in a hierarchy: a forecast that is right for a whole store can be wrong for a single item. Planning needs forecasts at several levels that agree with the patterns in the data.",
    approach: [
      {
        title: "Explore trend and seasonality by level",
        body: "Look at sales at store, department and item level to see weekly, yearly and event-driven patterns before choosing a model.",
      },
      {
        title: "Fit SARIMAX with exogenous signals",
        body: "Use seasonal ARIMA with external regressors, such as calendar events and prices, so the model can explain demand spikes.",
      },
      {
        title: "Evaluate on held-out periods",
        body: "Forecast later periods that the model has not seen and compare against the actuals.",
      },
    ],
    architecture: {
      summary: "A notebook pipeline from raw sales files to per-level forecasts.",
      layers: [
        { name: "Data", tech: "M5 Walmart files", detail: "Sales, calendar and price tables joined into one series per level." },
        { name: "Exploration", tech: "pandas", detail: "Trend, seasonality and event effects at each hierarchy level." },
        { name: "Model", tech: "SARIMAX", detail: "Seasonal ARIMA with exogenous regressors." },
        { name: "Forecast", tech: "Held-out evaluation", detail: "Predictions for later periods compared with actual sales." },
      ],
    },
    features: ["Multi-level analysis", "Seasonal model with exogenous signals", "Held-out period evaluation"],
    challenges: [
      {
        problem: "Item-level series are sparse and intermittent.",
        solution: "Compare behaviour at higher levels first and treat sparse items separately.",
      },
    ],
    outcomes: ["Forecasts at multiple hierarchy levels on the M5 data", "A documented exploration of seasonality and events"],
    learnings: ["Aggregation level changes which model is appropriate.", "Exogenous calendar signals explain much of the spikes."],
    next: ["Add error metrics per level", "Compare against gradient-boosted baselines"],
  },
  {
    slug: "wardrobe-recommendation-engine",
    repo: "https://github.com/pratim4dasude/Wardrobe_Recommendation_Engine",
    title: "Wardrobe Recommendation Engine",
    stack: "GPT-4.1-mini, CLIP, pgvector, BM25, Python",
    description:
      "An agentic AI stylist that builds complete outfits using only the clothes that exist in your wardrobe, with multimodal search and hybrid retrieval.",
    tagline: "An AI stylist that only recommends clothes you actually own.",
    outcomeLine: "Outfits are built from retrieved wardrobe items and validated in code before anything is shown.",
    tags: ["Agentic AI", "RAG", "Multimodal", "Fashion"],
    image: {
      src: "/projects/wardrobe-recommendation-engine.jpg",
      alt: "A grid of twenty garment photos from the wardrobe dataset: shirts, jackets, trousers, shorts and tops",
      label: "wardrobe",
      caption: "A sample of the wardrobe items the engine retrieves from, taken from the project repository.",
    },
    overview:
      "A personal stylist you talk to in plain English. Describe an occasion, point at a garment, or share an outside photo, and the system returns complete, wearable outfits assembled only from items in the wardrobe. The language model is never allowed to invent clothing: the engine retrieves real items first, asks the model to compose outfits strictly from those, and validates every outfit in code before it is shown.",
    problem:
      "A language model asked to style an outfit will happily recommend clothes you do not own. For a wardrobe assistant that makes every answer useless. The task needed retrieval over the real closet, outfit rules the model cannot break, and memory so follow-ups like \"smart clean look\" attach to the earlier request.",
    approach: [
      {
        title: "Understand the request",
        body: "A language model turns the raw message into structured intent: occasion, vibe, item id, image path and whether a follow-up question is needed. A rule-based layer repairs edge cases and stops stale conversation context from leaking into a fresh request.",
      },
      {
        title: "Remember the session",
        body: "Per-session memory merges new information with earlier turns, so a short follow-up attaches to the right occasion.",
      },
      {
        title: "Retrieve with hybrid search",
        body: "For the chosen garment, compatible candidates are pulled per role (top, bottom, outerwear) by combining semantic embeddings in pgvector, a metadata bonus for color and style, and BM25 keyword scoring.",
      },
      {
        title: "Compose, then validate in code",
        body: "The model assembles three outfits (minimal, layered, alternative) strictly from the retrieved item identifiers. Incomplete or rule-breaking outfits are removed in code instead of being trusted to the model, and two more calls write the intro and a final stylist note.",
      },
    ],
    architecture: {
      summary:
        "A retrieval-first pipeline: the model parses and composes, but the closet, the rules and the final check all live outside the model.",
      layers: [
        { name: "Message", tech: "Text, item id or outside photo", detail: "Three ways in: describe an occasion, style a specific garment, or pair an outside photo with the wardrobe." },
        { name: "Query understanding", tech: "LLM + rule repair", detail: "Structured intent, with rules that fix edge cases and block stale context." },
        { name: "Chat memory", tech: "Session context", detail: "Occasion, vibe, item id, image and history carried across turns." },
        { name: "Hybrid retrieval", tech: "pgvector + metadata + BM25", detail: "Cosine similarity on embeddings, a color and style bonus, then exact keyword reranking." },
        { name: "Outfit composer", tech: "GPT-4.1-mini", detail: "Three outfits built only from retrieved identifiers, following hard pairing rules." },
        { name: "Validation", tech: "Code", detail: "Outfits that are incomplete or break the rules are dropped before display." },
      ],
    },
    features: [
      "Three full outfits per request, each with a reason, styling notes and a confidence level",
      "Style around one specific garment, with alternatives from similar items already owned",
      "Outside photos are captioned and embedded with CLIP, then treated as a temporary garment",
      "\"Find similar items\" through CLIP image similarity",
    ],
    challenges: [
      {
        problem: "The model could recommend clothes that are not in the wardrobe.",
        solution: "Retrieval comes first, composition uses only retrieved identifiers, and every outfit is validated in code.",
      },
      {
        problem: "Old conversation context leaked into new requests.",
        solution: "Per-session memory merges follow-ups deliberately, and a rule-based layer resets context for a fresh request.",
      },
    ],
    outcomes: [
      "A working RAG pipeline for fashion with grounded, validated outfits",
      "Every recommendation carries a reason, styling notes and a confidence level",
      "A written production and scaling roadmap in the repository",
    ],
    learnings: [
      "Do the checking in code. A prompt asking the model to behave is not a guarantee.",
      "Hybrid retrieval keeps exact attributes that embeddings alone blur.",
    ],
    next: ["Follow the production and scaling roadmap in the repository", "Add an offline evaluation set of requests with expected outfits"],
  },
  {
    slug: "ai-builder",
    repo: "https://github.com/pratim4dasude/Ai_Builder",
    title: "AI Builder: multi-agent workers",
    stack: "FastAPI, Gradio, XGBoost, SQLite, OpenAI",
    description:
      "Three composable agent workers for finance, growth marketing and logistics, behind one control panel. Each is a FastAPI service wrapping a multi-agent pipeline.",
    tagline: "Three domain agents behind one control panel, built on one shared shape.",
    outcomeLine: "Three FastAPI agent workers that turn CSV data into structured decision memos.",
    tags: ["Multi-agent", "FastAPI", "Streaming", "Forecasting"],
    image: {
      src: "/projects/ai-builder.jpg",
      alt: "The AI Builder system overview diagram: a Gradio frontend launching three FastAPI workers for finance, logistics and growth",
      label: "architecture",
      caption: "The system overview from the project README: one control panel, three workers, one shared layer shape.",
    },
    overview:
      "AI Builder is three self-contained agent workers behind a single Gradio control panel. Each worker is a FastAPI service that wraps a multi-agent pipeline over a domain CSV bundle and returns a structured memo plus the raw analytical data. A finance worker acts as a CFO copilot, a growth worker as a growth strategist, and a logistics worker as a dispatch planner.",
    problem:
      "Operations teams sit on ledgers, orders and campaign data and need a clear recommendation, not a spreadsheet. A model alone should not be trusted with the numbers, and three separate agent apps would drift apart into three codebases nobody can reason about.",
    approach: [
      {
        title: "One shape for every worker",
        body: "The workers share no code but share the same layered shape: API, supervisor, planner or orchestrator, agents, tools, services, CSV connectors, memory and a response formatter with streaming. Understand one and you understand all three.",
      },
      {
        title: "Numbers from analyzers, words from the model",
        body: "Deterministic services compute the analytics, for example reconciliation, margin and revenue forecasting. The language model writes the memo, while risk flags in the finance worker stay deterministic.",
      },
      {
        title: "Specialist agents that run together",
        body: "A supervisor and planner hand work to specialist agents, which run concurrently with asyncio, and each worker keeps its own SQLite memory.",
      },
      {
        title: "Stream the result",
        body: "Each worker exposes chat endpoints including a streaming one (server-sent events), and the control panel launches the workers and health-checks them.",
      },
    ],
    architecture: {
      summary:
        "A Gradio panel starts three FastAPI workers. Inside each worker the same layers repeat, from the API down to its own CSV data and memory.",
      layers: [
        { name: "Control panel", tech: "Gradio", detail: "Launches each worker as a subprocess and checks its health." },
        { name: "Worker API", tech: "FastAPI", detail: "Chat, raw-data and streaming endpoints, one service per domain." },
        { name: "Supervisor and planner", tech: "Agents", detail: "Plans the task and delegates to specialist agents." },
        { name: "Agents, tools and services", tech: "asyncio", detail: "Specialists call a tool registry and deterministic analyzers, running concurrently." },
        { name: "Connectors and ML", tech: "CSV, XGBoost", detail: "Domain CSV data, and a persisted XGBoost model for the 7-day revenue forecast." },
        { name: "Memory and output", tech: "SQLite, memo formatter", detail: "Per-worker memory, then a structured memo with streaming." },
      ],
    },
    features: [
      "Finance worker: revenue forecast, invoice reconciliation, leakage, margin and risk flags, as a CFO memo",
      "Growth worker: promotion scoring, posting time, segments and six content variants, as a Growth Action Memo",
      "Logistics worker: warehouse assignment, clustering, routing and risk, as a Markdown dispatch memo",
      "Falls back gracefully when no API key is set",
    ],
    challenges: [
      {
        problem: "Three agent apps can drift apart over time.",
        solution: "They follow one fixed layered shape, so each worker is structured the same way and can be read the same way.",
      },
      {
        problem: "Model-written memos should not invent numbers.",
        solution: "The figures come from deterministic analyzers and models, and the model only writes up the result.",
      },
    ],
    outcomes: [
      "Three working agent workers, each producing a structured memo from its own data",
      "One control panel that starts and monitors all of them",
    ],
    learnings: [
      "A shared structure matters more than shared code when several agents must stay maintainable.",
      "Keep calculations deterministic and let the model explain them.",
    ],
    next: ["Add an evaluation set that checks memo claims against the analyzer output", "Move worker memory from SQLite to a shared store"],
  },
  {
    slug: "finance-ai-assistant",
    repo: "https://github.com/pratim4dasude/Finance_AI_Assistant",
    title: "Finance AI Assistant",
    stack: "FastAPI, OpenAI, SSE, pytest",
    description:
      "An AI financial assistant microservice with multi-agent routing, safety checks, portfolio insights and real-time streaming responses.",
    tagline: "A financial assistant that classifies, checks safety, then answers.",
    outcomeLine: "Routes each question to a specialist agent behind a safety guard, and streams the answer.",
    tags: ["Multi-agent", "Safety", "Streaming", "FastAPI"],
    overview:
      "A microservice that helps a novice investor understand and protect their portfolio. Every message is classified, passed through a safety guard and routed to a specialist agent: portfolio health, risk analysis, predictive analysis, market research, recommendations, a finance calculator, support or general questions. Answers stream back in real time.",
    problem:
      "Financial questions come in many shapes, and some should never be answered naively. A single prompt cannot reliably tell a portfolio question from a market question, and it has no built-in way to refuse unsafe requests. The assistant needed explicit classification, a safety layer and specialists with narrow jobs.",
    approach: [
      {
        title: "Classify the intent first",
        body: "A classifier decides what the user is asking, including multi-intent and ambiguous messages, before any specialist runs.",
      },
      {
        title: "Guard safety explicitly",
        body: "A dedicated safety guard checks requests, tested against pairs of safe and unsafe queries, so refusal behaviour is covered by tests rather than hoped for.",
      },
      {
        title: "Route to narrow specialists",
        body: "A router sends the request to one specialist agent, each with a single responsibility, such as portfolio health or risk, and a memory layer carries the conversation.",
      },
      {
        title: "Stream responses and test without the model",
        body: "Responses stream over server-sent events, and the test suite runs without an API key by mocking the language model.",
      },
    ],
    architecture: {
      summary: "Classify, guard, route, answer. Each step is a separate module, so each can be tested on its own.",
      layers: [
        { name: "API", tech: "FastAPI, SSE", detail: "Chat endpoint with streaming responses." },
        { name: "Classifier", tech: "Intent classification", detail: "Decides the intent, with fixtures for ambiguous, follow-up and multi-intent conversations." },
        { name: "Safety guard", tech: "Rules and checks", detail: "Screens requests before they reach a specialist." },
        { name: "Router", tech: "Agent routing", detail: "Chooses the specialist for the request." },
        { name: "Specialist agents", tech: "Portfolio, risk, market, advice", detail: "Portfolio health, risk analysis, predictive analysis, market research, recommendations, calculator, support and general queries." },
        { name: "Memory and market data", tech: "Session memory", detail: "Conversation history and market data access." },
      ],
    },
    features: [
      "Specialist agents for portfolio health, risk, prediction, research and advice",
      "Safety guard covered by safe and unsafe query pairs",
      "Server-sent event streaming",
      "Test fixtures for several investor profiles, such as an active trader, a retiree and an empty portfolio",
    ],
    challenges: [
      {
        problem: "Classifying ambiguous and multi-intent messages.",
        solution: "Dedicated conversation fixtures for ambiguous, follow-up and multi-intent sessions drive the classifier and router tests.",
      },
      {
        problem: "Testing an LLM-backed service reliably.",
        solution: "The model is mocked, so tests pass without an API key and do not depend on live model output.",
      },
    ],
    outcomes: [
      "A routed multi-agent service with a safety layer and streaming answers",
      "A test suite for classification, routing, portfolio health and safety",
    ],
    learnings: [
      "Make safety a separate, testable component, not a line in a prompt.",
      "Fixtures that describe realistic users find routing bugs early.",
    ],
    next: ["Publish the behaviour of each specialist with example conversations", "Extend market data beyond the current source"],
  },
  {
    slug: "pdreader",
    repo: "https://github.com/pratim4dasude/PDReader",
    title: "PDReader",
    stack: "React, FastAPI, PostgreSQL + pgvector, Redis, LangGraph",
    description:
      "A local-first PDF study assistant with hybrid retrieval and an agentic chat pipeline. Upload books, ask anything, and get cited answers.",
    tagline: "Turn PDFs into searchable, conversational knowledge, with citations.",
    outcomeLine: "Answers are grounded in the book text and link back to the source page.",
    tags: ["RAG", "LangGraph", "pgvector", "Full stack"],
    image: {
      src: "/projects/pdreader.jpg",
      alt: "The PDReader chat interface summarising three uploaded engineering books",
      label: "chat",
      caption: "PDReader answering a summary question across three uploaded PDFs.",
    },
    overview:
      "PDReader lets you upload several PDFs through a React interface and chat with them. Ingestion runs in the background so large books never block a request. Retrieval combines vector similarity with full-text search, and a LangGraph agent decides how to handle each question. Answers show collapsible source snippets linked to the original page.",
    problem:
      "A basic RAG demo breaks on real books: big files time out on upload, and exact terms such as API names and acronyms get lost when you rely on embeddings alone. A single retrieval step is also wasteful for questions that do not need it, such as greetings or a request for an overview.",
    approach: [
      {
        title: "Ingest in the background",
        body: "Uploads are validated and persisted, then a Redis queue hands them to a worker that extracts, chunks and embeds the text, and generates a summary and topic map for each document.",
      },
      {
        title: "Hybrid retrieval",
        body: "Cosine similarity in pgvector is combined with PostgreSQL full-text search using reciprocal-rank fusion, so exact terms are not missed.",
      },
      {
        title: "Route questions with an agent",
        body: "A LangGraph agent classifies intent first. Greetings stay cheap, overview and study questions reuse the precomputed summary and topic map, and code or search questions run the full retrieval pipeline.",
      },
      {
        title: "Guard the citations",
        body: "A citation guard flags answers that have no supporting source, and answers expose source snippets linked back to the page.",
      },
    ],
    architecture: {
      summary: "A React client, a FastAPI backend, a background worker, and Postgres with pgvector for both search modes.",
      layers: [
        { name: "Client", tech: "React, TypeScript, Vite", detail: "Upload, document list, chat and polling for ingestion status." },
        { name: "API", tech: "FastAPI", detail: "Validates uploads, enqueues ingestion and runs the chat agent." },
        { name: "Queue and worker", tech: "Redis (RQ)", detail: "Background ingestion: extract, chunk, embed, summarise." },
        { name: "Storage and search", tech: "PostgreSQL + pgvector", detail: "Documents, chunks and jobs, with vector and full-text search." },
        { name: "Agent", tech: "LangGraph", detail: "Intent routing between cheap replies, precomputed summaries and full retrieval." },
        { name: "Models", tech: "OpenAI", detail: "text-embedding-3-small for embeddings and GPT-4o-mini for answers." },
      ],
    },
    features: [
      "Multiple PDFs, with non-blocking background ingestion",
      "Hybrid vector and full-text retrieval with rank fusion",
      "Intent-aware chat that avoids retrieval when it is not needed",
      "Per-document summaries and topic maps, plus cited source snippets",
    ],
    challenges: [
      {
        problem: "Large books timed out on upload.",
        solution: "Ingestion moved to a background queue so the request returns immediately and the UI polls for progress.",
      },
      {
        problem: "Embeddings alone missed exact terms like API names and acronyms.",
        solution: "Added PostgreSQL full-text search and fused the two rankings.",
      },
    ],
    outcomes: [
      "A local-first study assistant with cited answers across several books",
      "A containerised stack: React, FastAPI, Postgres, Redis and Docker",
    ],
    learnings: [
      "Routing by intent saves cost and latency before retrieval even starts.",
      "Hybrid search is a cheap fix for exact-term misses.",
    ],
    next: ["Add an evaluation set of questions with known page answers", "Support more file types beyond PDF"],
  },
  {
    slug: "customerchat",
    repo: "https://github.com/pratim4dasude/CustomerChat",
    title: "CustomerChat: IT support RAG chatbot",
    stack: "FastAPI, Next.js, Pinecone, GPT-4",
    description:
      "A RAG-powered IT support chatbot using Pinecone and GPT-4, with semantic search, session management and sentiment analysis.",
    tagline: "Answers from your knowledge base, with sources and a frustration meter.",
    outcomeLine: "Contextual IT support answers grounded in knowledge base articles, with the sources shown.",
    tags: ["RAG", "Pinecone", "GPT-4", "Full stack"],
    overview:
      "CustomerChat is a full-stack IT support chatbot. It finds the knowledge base articles most relevant to a question with semantic search in Pinecone, and GPT-4 writes a contextual answer from them. Sessions keep conversation history, each answer lists the articles it used, and the system scores how frustrated the user sounds.",
    problem:
      "Support teams answer the same questions repeatedly, and a bare chatbot either hallucinates or ignores the company's own articles. The bot needed to answer from the knowledge base, show where the answer came from, remember the conversation and notice when a user is getting frustrated.",
    approach: [
      {
        title: "Index the knowledge base",
        body: "Articles are embedded and stored in Pinecone, with an admin endpoint to re-index the whole knowledge base when it changes.",
      },
      {
        title: "Retrieve, then generate",
        body: "A question is matched to the most relevant articles by vector similarity, and GPT-4 answers using that context.",
      },
      {
        title: "Keep sessions and show sources",
        body: "Chat sessions persist with their history, and every answer is shown with the knowledge base articles that were used.",
      },
      {
        title: "Measure frustration",
        body: "A sentiment step scores user frustration from 0 to 1 in real time, so a conversation that is going badly can be spotted.",
      },
    ],
    architecture: {
      summary: "A Next.js chat client over a FastAPI backend, with Pinecone for retrieval and GPT-4 for the answer.",
      layers: [
        { name: "Client", tech: "Next.js, Tailwind", detail: "Responsive chat interface with Markdown rendering." },
        { name: "API", tech: "FastAPI", detail: "Chat, session and admin re-index endpoints." },
        { name: "Retrieval", tech: "Pinecone", detail: "Semantic search over embedded knowledge base articles." },
        { name: "Generation", tech: "GPT-4", detail: "Answers written from the retrieved articles." },
        { name: "Sessions and sentiment", tech: "Session store", detail: "Conversation history and a 0 to 1 frustration score." },
      ],
    },
    features: [
      "Semantic search across knowledge base articles",
      "Persistent chat sessions with history",
      "Real-time frustration score from 0 to 1",
      "Source tracking for each answer, plus Markdown-formatted replies",
      "Admin endpoint to re-index the knowledge base",
    ],
    challenges: [
      {
        problem: "Keeping answers tied to the knowledge base.",
        solution: "Generation uses the retrieved articles as context, and each answer displays the sources it used.",
      },
    ],
    outcomes: [
      "A working support chatbot with retrieval, sessions, sources and sentiment",
      "A re-indexing path so the knowledge base can change without redeploying",
    ],
    learnings: [
      "Showing sources is what makes a support bot trustworthy.",
      "A simple sentiment score is a useful escalation signal.",
    ],
    next: ["Use the frustration score to hand over to a human agent", "Evaluate answer quality against known support tickets"],
  },
  {
    slug: "autodocx",
    repo: "https://github.com/pratim4dasude/AutoDocX",
    title: "AutoDocX: documentation from code",
    stack: "Python, FastAPI, Streamlit, OpenAI or Anthropic",
    description:
      "A developer-documentation engine that scans a codebase, analyses it with an LLM and generates versioned, self-contained HTML docs.",
    tagline: "Stop writing documentation. Start shipping code.",
    outcomeLine: "Documentation generated from the code on every sync, so it always matches what the code does.",
    tags: ["LLM", "Developer tools", "FastAPI", "Automation"],
    image: {
      src: "/projects/autodocx.jpg",
      alt: "An AutoDocX generated documentation page with navigation, overview and project statistics",
      label: "docs",
      caption: "An auto-generated documentation page: overview, navigation and project statistics.",
    },
    overview:
      "AutoDocX reads every file in a project, extracts structure, and parses Python with the AST to find classes, functions, routes, imports and dependencies. An LLM then writes human-readable summaries, flow explanations and risk notes, and the tool renders a self-contained HTML documentation site with navigation, a table of contents and an API reference.",
    problem:
      "Code changes fast and documentation does not. Within weeks the docs are wrong: functions are renamed, routes are added and the architecture shifts while nobody updates the README. Documentation has to be generated from the code, on every sync, to stay true.",
    approach: [
      {
        title: "Scan and parse the project",
        body: "Walk the project, record file hashes as change signatures, and use Python's AST to extract the structure: routes, classes, functions and imports.",
      },
      {
        title: "Let an LLM explain it",
        body: "Send the extracted structure to an LLM (OpenAI or Anthropic) to produce summaries, flow explanations and risk notes in plain language.",
      },
      {
        title: "Detect what changed",
        body: "Compare the current state against the last documented state with file hashes, so only real changes trigger a new version.",
      },
      {
        title: "Generate and version the docs",
        body: "Render one self-contained HTML file with navigation and an API reference, and keep every sync as a version so older docs are never overwritten. Pasted runtime screenshots can enrich the context.",
      },
    ],
    architecture: {
      summary: "A scanner and parser feed an LLM, and a renderer writes versioned HTML. A Streamlit app drives it through a FastAPI backend.",
      layers: [
        { name: "Scanner", tech: "File hashing", detail: "Reads the project and computes change signatures." },
        { name: "Parser", tech: "Python AST", detail: "Extracts classes, functions, routes, imports and dependencies." },
        { name: "Analysis", tech: "OpenAI or Anthropic", detail: "Summaries, flow explanations and risk notes." },
        { name: "Renderer", tech: "HTML", detail: "A self-contained documentation page with navigation and API reference." },
        { name: "App", tech: "Streamlit + FastAPI", detail: "A UI to scan, review and sync, with version history on disk." },
      ],
    },
    features: [
      "AST-based understanding of Python code",
      "Change detection through file hashes",
      "Self-contained HTML output with table of contents and API reference",
      "Version history for every sync",
      "Screenshot context blocks for richer documentation",
    ],
    challenges: [
      {
        problem: "Regenerating everything on every run is slow and noisy.",
        solution: "File hashes detect what actually changed, so a sync produces a new version only when the code has changed.",
      },
    ],
    outcomes: [
      "A working docs generator with a UI, an API and versioned HTML output",
      "One-click launchers for Windows and macOS",
    ],
    learnings: [
      "Parse structure with code first, then let the model explain it.",
      "Versioning generated docs makes them safe to regenerate.",
    ],
    next: ["Support more languages than Python", "Add a diff view between documentation versions"],
  },
  {
    slug: "ppe-detection",
    repo: "https://github.com/pratim4dasude/Site_Safety_equipments",
    title: "Site safety PPE detection",
    stack: "YOLO, OpenCV, Python",
    description:
      "A YOLO-based video detector that flags whether people on a site are wearing the right safety equipment.",
    tagline: "Spot missing hard hats, vests and masks in video.",
    outcomeLine: "Draws green boxes for compliant equipment and red boxes for missing equipment, on live video.",
    tags: ["Object detection", "YOLO", "OpenCV", "Safety"],
    overview:
      "A detector built while learning YOLO. It runs a YOLO model with ten safety classes over a video or webcam stream and draws a labelled box on each detection: green for equipment that is worn, red for equipment that is missing, and blue for everything else. The repository also includes the SORT tracker for following people between frames.",
    problem:
      "On a work site, whether a person is wearing a hard hat, a vest or a mask is a safety question, and checking it by eye does not scale. A detector that separates \"wearing\" from \"missing\" for each person turns video into something a safety team can act on.",
    approach: [
      {
        title: "Use a YOLO model with PPE classes",
        body: "The model detects ten classes: Hardhat, Mask, Safety Vest, their \"NO-\" counterparts, Person, Safety Cone, machinery and vehicle.",
      },
      {
        title: "Threshold on confidence",
        body: "Only detections above 0.5 confidence are drawn, to keep the display readable.",
      },
      {
        title: "Colour by compliance",
        body: "Worn equipment is green, missing equipment is red and other objects are blue, so a violation stands out at a glance.",
      },
      {
        title: "Read from video or webcam",
        body: "OpenCV reads frames from a video file or a webcam, and the box and label are drawn on each frame in real time.",
      },
    ],
    architecture: {
      summary: "Frames in, detections out, coloured by whether the equipment is worn.",
      layers: [
        { name: "Video input", tech: "OpenCV", detail: "Frames from a video file or webcam." },
        { name: "Detector", tech: "YOLO (Ultralytics)", detail: "Ten safety classes with a confidence score." },
        { name: "Rules", tech: "Class and threshold", detail: "Keep detections above 0.5 and group them as worn, missing or other." },
        { name: "Overlay", tech: "cvzone", detail: "Coloured boxes with class and confidence labels." },
        { name: "Tracking", tech: "SORT", detail: "A tracker included in the repository for following people across frames." },
      ],
    },
    features: [
      "Ten safety classes, including explicit \"NO-Hardhat\", \"NO-Mask\" and \"NO-Safety Vest\"",
      "Colour-coded boxes: green worn, red missing, blue other",
      "Runs on video files or a live webcam",
    ],
    challenges: [
      {
        problem: "Telling worn equipment from missing equipment.",
        solution: "The model has separate classes for missing items, and the display colours them red so a violation is obvious.",
      },
    ],
    outcomes: [
      "A working real-time PPE detector over video",
      "A clear visual convention for compliance versus violation",
    ],
    learnings: [
      "Explicit negative classes make compliance checks simpler than inferring absence.",
      "A confidence threshold is the simplest lever for a cleaner display.",
    ],
    next: ["Count violations per person with the SORT tracker", "Add a sample output clip with detections drawn"],
  },
];

// Display order: vision flagship first, then the work with the strongest public proof, then the rest.
const ORDER = [
  "site-crack-segmentation",
  "wardrobe-recommendation-engine",
  "flux-fill-controlnet-inpainting",
  "echoseek",
  "ai-builder",
  "pdreader",
  "finance-ai-assistant",
  "customerchat",
  "autodocx",
  "ppe-detection",
  "retina-vein-segmentation",
  "white-balance-regression",
  "retail-demand-forecasting",
  "order-amount-prediction",
];
const rank = (slug: string) => {
  const i = ORDER.indexOf(slug);
  return i === -1 ? ORDER.length : i;
};

export const projects: Project[] = [...allProjects].sort((a, b) => rank(a.slug) - rank(b.slug));

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

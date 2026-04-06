export default function Home() {
  const skills = [
    "Python",
    "PyTorch",
    "TensorFlow",
    "FastAPI",
    "Next.js",
    "React",
    "LangChain",
    "Docker",
    "AWS SageMaker",
    "NVIDIA NIM",
    "Computer Vision",
    "Generative AI",
    "LLMs",
    "RAG",
  ];

  const projects = [
    {
      title: "EchoSeek",
      description:
        "A multimodal RAG-based product discovery platform built with Llama 3.1, NV-Embed-QA, LangChain, FastAPI, Docker, and Next.js for intelligent real-time retrieval.",
    },
    {
      title: "White Balance Regression Model",
      description:
        "A computer vision model using EfficientNetV2-S to estimate color temperature and tint, improving automatic white balance correction accuracy.",
    },
    {
      title: "Order Amount Prediction",
      description:
        "A forecasting system using Random Forest and XGBoost with feature engineering and hyperparameter tuning for stronger business prediction accuracy.",
    },
  ];

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(to bottom right, #0f172a, #111827, #1e293b)",
        color: "#f8fafc",
        fontFamily: "Arial, sans-serif",
        padding: "40px 20px",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        <section
          style={{
            textAlign: "center",
            padding: "60px 20px 40px",
          }}
        >
          <p
            style={{
              color: "#93c5fd",
              letterSpacing: "2px",
              textTransform: "uppercase",
              fontSize: "0.9rem",
              marginBottom: "12px",
            }}
          >
            Machine Learning Engineer
          </p>

          <h1
            style={{
              fontSize: "3.5rem",
              margin: "0 0 16px",
              lineHeight: "1.1",
            }}
          >
            Pratim Dasude
          </h1>

          <p
            style={{
              maxWidth: "750px",
              margin: "0 auto",
              fontSize: "1.15rem",
              lineHeight: "1.8",
              color: "#cbd5e1",
            }}
          >
            I build AI systems across computer vision, generative AI, multimodal
            learning, and retrieval-based applications with a focus on real-world
            deployment and scalable ML workflows.
          </p>

          <div
            style={{
              marginTop: "28px",
              display: "flex",
              gap: "12px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                padding: "10px 16px",
                borderRadius: "999px",
                background: "rgba(59,130,246,0.15)",
                border: "1px solid rgba(147,197,253,0.25)",
                color: "#bfdbfe",
              }}
            >
              Bengaluru, Karnataka
            </span>
            <span
              style={{
                padding: "10px 16px",
                borderRadius: "999px",
                background: "rgba(59,130,246,0.15)",
                border: "1px solid rgba(147,197,253,0.25)",
                color: "#bfdbfe",
              }}
            >
              ML • CV • GenAI • RAG
            </span>
          </div>
        </section>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 0.8fr",
            gap: "24px",
            marginTop: "30px",
          }}
        >
          <div
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "24px",
              padding: "28px",
              backdropFilter: "blur(8px)",
            }}
          >
            <h2 style={{ fontSize: "1.6rem", marginBottom: "14px" }}>
              About Me
            </h2>
            <p style={{ color: "#cbd5e1", lineHeight: "1.9" }}>
              I am a Machine Learning Engineer currently working on large-scale
              vision language models, diffusion models, multimodal pipelines,
              and production-focused AI systems. My work includes training,
              evaluation, fine-tuning, and deployment of deep learning models
              using tools like PyTorch, FastAPI, LangChain, AWS SageMaker, and
              Next.js.
            </p>
          </div>

          <div
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "24px",
              padding: "28px",
              backdropFilter: "blur(8px)",
            }}
          >
            <h2 style={{ fontSize: "1.6rem", marginBottom: "14px" }}>
              Contact
            </h2>
            <p style={{ color: "#cbd5e1", lineHeight: "1.9", margin: 0 }}>
              pratim4dasude@gmail.com
            </p>

            <p style={{ color: "#cbd5e1", lineHeight: "1.9", margin: 0 }}>
              linkedin/pratim-dasude
            </p>
            <p style={{ color: "#cbd5e1", lineHeight: "1.9", margin: 0 }}>
              github/pratim4dasude
            </p>
          </div>
        </section>

        <section style={{ marginTop: "28px" }}>
          <div
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "24px",
              padding: "28px",
            }}
          >
            <h2 style={{ fontSize: "1.8rem", marginBottom: "20px" }}>
              Experience
            </h2>

            <div style={{ marginBottom: "28px" }}>
              <h3 style={{ marginBottom: "6px", fontSize: "1.2rem" }}>
                AiLusion — Merosa Technologies Pvt. Ltd
              </h3>
              <p style={{ color: "#93c5fd", marginBottom: "10px" }}>
                Machine Learning Engineer • Jan 2025 - Current
              </p>
              <p style={{ color: "#cbd5e1", lineHeight: "1.9" }}>
                Developed and fine-tuned large-scale VLMs and diffusion models
                using PyTorch, Flux-Dev, and CLIP-style embeddings. Built
                scalable training and evaluation pipelines with mixed precision,
                distributed workflows, and automated ablations, reducing
                training latency and improving retrieval and draping quality
                across 100+ SKUs. Worked with LoRA, QLoRA, and DreamBooth for
                domain-specific model adaptation.
              </p>
            </div>

            <div>
              <h3 style={{ marginBottom: "6px", fontSize: "1.2rem" }}>
                Highradius Technologies
              </h3>
              <p style={{ color: "#93c5fd", marginBottom: "10px" }}>
                Data Science Intern • July 2023 - November 2023
              </p>
              <p style={{ color: "#cbd5e1", lineHeight: "1.9" }}>
                Built and optimized a deduction classification model using
                XGBoost and LightGBM. Improved accuracy through feature
                engineering and hyperparameter tuning, and automated monitoring
                and drift detection pipelines to reduce mispredictions across
                large-scale workflows.
              </p>
            </div>
          </div>
        </section>

        <section style={{ marginTop: "28px" }}>
          <h2 style={{ fontSize: "1.8rem", marginBottom: "18px" }}>Projects</h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "20px",
            }}
          >
            {projects.map((project) => (
              <div
                key={project.title}
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "20px",
                  padding: "22px",
                }}
              >
                <h3 style={{ marginBottom: "10px", fontSize: "1.15rem" }}>
                  {project.title}
                </h3>
                <p style={{ color: "#cbd5e1", lineHeight: "1.8" }}>
                  {project.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginTop: "28px" }}>
          <div
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "24px",
              padding: "28px",
            }}
          >
            <h2 style={{ fontSize: "1.8rem", marginBottom: "18px" }}>Skills</h2>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "12px",
              }}
            >
              {skills.map((skill) => (
                <span
                  key={skill}
                  style={{
                    padding: "10px 14px",
                    borderRadius: "999px",
                    background: "rgba(59,130,246,0.12)",
                    border: "1px solid rgba(147,197,253,0.18)",
                    color: "#dbeafe",
                    fontSize: "0.95rem",
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section style={{ marginTop: "28px", marginBottom: "30px" }}>
          <div
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "24px",
              padding: "28px",
            }}
          >
            <h2 style={{ fontSize: "1.8rem", marginBottom: "18px" }}>
              Education
            </h2>
            <p style={{ color: "#cbd5e1", lineHeight: "1.9", marginBottom: "10px" }}>
              <strong style={{ color: "#f8fafc" }}>
                Kalinga Institute of Industrial Technologies
              </strong>
              <br />
              B.Tech in Computer Science and Engineering • 2020 - 2024 • CGPA:
              9.15
            </p>
            <p style={{ color: "#cbd5e1", lineHeight: "1.9", margin: 0 }}>
              Strong academic background with focus on AI, machine learning,
              deep learning, and software systems.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
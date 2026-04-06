import Image from "next/image";

export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f7fa",
        color: "#111827",
        fontFamily: "Arial, sans-serif",
        padding: "40px 20px",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        <section
          style={{
            textAlign: "center",
            marginBottom: "50px",
          }}
        >
          <h1
            style={{
              fontSize: "3rem",
              marginBottom: "10px",
            }}
          >
            Pratim Mangaldas Dasude
          </h1>

          <p
            style={{
              fontSize: "1.15rem",
              color: "#4b5563",
              marginBottom: "10px",
            }}
          >
            Machine Learning Engineer building AI, Computer Vision, Generative AI, and Multimodal systems
          </p>

          <p
            style={{
              fontSize: "1rem",
              color: "#6b7280",
              lineHeight: "1.7",
            }}
          >
            Bengaluru, Karnataka | +91 8582994074 | pratim4dasude@gmail.com
          </p>
        </section>

        <section
          style={{
            backgroundColor: "#ffffff",
            padding: "30px",
            borderRadius: "16px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            marginBottom: "30px",
          }}
        >
          <h2 style={{ marginBottom: "15px", fontSize: "1.8rem" }}>About Me</h2>
          <p
            style={{
              lineHeight: "1.8",
              color: "#374151",
              fontSize: "1rem",
            }}
          >
            I am a Machine Learning Engineer with experience in building and fine tuning large scale vision language
            models, diffusion models, and multimodal AI systems. I work with PyTorch, FastAPI, Next.js, LangChain,
            AWS SageMaker, NVIDIA NIM, and modern deep learning workflows to create scalable real world AI products.
          </p>
        </section>

        <section
          style={{
            backgroundColor: "#ffffff",
            padding: "30px",
            borderRadius: "16px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            marginBottom: "30px",
          }}
        >
          <h2 style={{ marginBottom: "20px", fontSize: "1.8rem" }}>Experience</h2>

          <div style={{ marginBottom: "25px" }}>
            <h3 style={{ marginBottom: "5px" }}>
              AiLusion — Merosa Technologies Pvt. Ltd
            </h3>
            <p style={{ color: "#6b7280", marginBottom: "10px" }}>
              Machine Learning Engineer | Jan 2025 - Current | Bengaluru, Karnataka
            </p>
            <p style={{ lineHeight: "1.8", color: "#374151" }}>
              Developed and fine tuned large scale VLMs and diffusion models using PyTorch, Flux Dev, and CLIP style
              embeddings to improve multimodal alignment, visual reasoning, and photorealistic garment body draping.
              Built scalable training and evaluation pipelines with mixed precision, distributed workflows, and
              automated ablations, reducing training latency by 30 percent and improving downstream quality across
              100 plus SKUs. Applied PEFT methods such as LoRA, QLoRA, and DreamBooth for domain specific adaptation.
            </p>
          </div>

          <div>
            <h3 style={{ marginBottom: "5px" }}>Highradius Technologies</h3>
            <p style={{ color: "#6b7280", marginBottom: "10px" }}>
              Data Science Intern | July 2023 - November 2023 | Bhubaneswar, Odisha
            </p>
            <p style={{ lineHeight: "1.8", color: "#374151" }}>
              Built and optimized a deduction classification model using XGBoost and LightGBM. Improved validity
              assessment accuracy by 20 percent through feature engineering and hyperparameter tuning while reducing
              processing time by 15 percent. Also automated monitoring and drift detection pipelines, reducing
              mispredictions by 30 percent for 100 plus clients.
            </p>
          </div>
        </section>

        <section
          style={{
            backgroundColor: "#ffffff",
            padding: "30px",
            borderRadius: "16px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            marginBottom: "30px",
          }}
        >
          <h2 style={{ marginBottom: "20px", fontSize: "1.8rem" }}>Projects</h2>

          <div style={{ marginBottom: "20px" }}>
            <h3 style={{ marginBottom: "8px" }}>EchoSeek</h3>
            <p style={{ lineHeight: "1.8", color: "#374151" }}>
              Built a multimodal RAG based product discovery platform using Llama 3.1, NV Embed QA, LangChain,
              NVIDIA NIM, AWS SageMaker, FastAPI, Docker, and Next.js to enable intelligent real time product
              retrieval and context aware recommendations.
            </p>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <h3 style={{ marginBottom: "8px" }}>White Balance Regression Model</h3>
            <p style={{ lineHeight: "1.8", color: "#374151" }}>
              Built a computer vision regression model using EfficientNetV2 S to estimate color temperature and tint
              from images, improving automatic white balance correction accuracy by 25 to 30 percent through multi
              stage fine tuning.
            </p>
          </div>

          <div>
            <h3 style={{ marginBottom: "8px" }}>Order Amount Prediction</h3>
            <p style={{ lineHeight: "1.8", color: "#374151" }}>
              Worked on a time series and ensemble learning based prediction system using Random Forest and XGBoost,
              achieving 75 percent prediction accuracy and reducing mean absolute error by 20 percent with feature
              engineering and tuning.
            </p>
          </div>
        </section>

        <section
          style={{
            backgroundColor: "#ffffff",
            padding: "30px",
            borderRadius: "16px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            marginBottom: "30px",
          }}
        >
          <h2 style={{ marginBottom: "20px", fontSize: "1.8rem" }}>Skills</h2>

          <p style={{ lineHeight: "1.9", color: "#374151", marginBottom: "12px" }}>
            <strong>Languages:</strong> Python, Java, JavaScript, TypeScript, C/C++, HTML/CSS, SQL, MongoDB, Bash
          </p>

          <p style={{ lineHeight: "1.9", color: "#374151", marginBottom: "12px" }}>
            <strong>Technologies:</strong> TensorFlow, PyTorch, Keras, scikit learn, FastAPI, React.js, Next.js,
            Docker, FAISS, LangChain
          </p>

          <p style={{ lineHeight: "1.9", color: "#374151", marginBottom: "12px" }}>
            <strong>Concepts:</strong> AI, ML, Neural Networks, Deep Learning, Computer Vision, Generative AI, LLMs,
            RAG, Agentic AI, MCP, LoRA Fine Tuning, Hyperparameter Tuning, Feature Engineering, Model Training and
            Evaluation
          </p>

          <p style={{ lineHeight: "1.9", color: "#374151" }}>
            <strong>Tools:</strong> ComfyUI, Fooocus, Hugging Face Transformers, Hugging Face Diffusers, Git, Jira,
            Google Colab, Firebase, MS Excel, Kaggle Datasets, AWS SageMaker, NVIDIA NIM, Postman
          </p>
        </section>

        <section
          style={{
            backgroundColor: "#ffffff",
            padding: "30px",
            borderRadius: "16px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            marginBottom: "30px",
          }}
        >
          <h2 style={{ marginBottom: "20px", fontSize: "1.8rem" }}>Education</h2>

          <div style={{ marginBottom: "15px" }}>
            <h3 style={{ marginBottom: "5px" }}>Kalinga Institute of Industrial Technologies</h3>
            <p style={{ color: "#374151" }}>
              B.Tech in Computer Science and Engineering | 2020 - 2024 | CGPA: 9.15
            </p>
          </div>

          <div style={{ marginBottom: "15px" }}>
            <h3 style={{ marginBottom: "5px" }}>Julien Day School, Kalyani</h3>
            <p style={{ color: "#374151" }}>
              ISC Board | 2017 - 2019 | Percentage: 84.00
            </p>
          </div>

          <div>
            <h3 style={{ marginBottom: "5px" }}>ICSE Board</h3>
            <p style={{ color: "#374151" }}>
              2015 - 2017 | Percentage: 81.83
            </p>
          </div>
        </section>

        <section
          style={{
            textAlign: "center",
            color: "#6b7280",
            fontSize: "0.95rem",
            paddingBottom: "20px",
          }}
        >
          <p>LinkedIn: linkedin/pratim-dasude</p>
          <p>GitHub: github/pratim4dasude</p>
        </section>
      </div>
    </main>
  );
}

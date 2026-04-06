import Image from "next/image";

export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#f8f9fa",
        color: "#111",
        fontFamily: "Arial, sans-serif",
        padding: "60px 20px",
      }}
    >
      <section
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "3rem",
            marginBottom: "10px",
          }}
        >
          Pratim Dasude
        </h1>

        <p
          style={{
            fontSize: "1.2rem",
            color: "#555",
            marginBottom: "30px",
          }}
        >
          Machine Learning Engineer building AI, computer vision, and generative AI solutions.
        </p>

        <img
          src="https://via.placeholder.com/150"
          alt="Profile"
          style={{
            width: "150px",
            height: "150px",
            borderRadius: "50%",
            objectFit: "cover",
            marginBottom: "30px",
          }}
        />

        <div
          style={{
            textAlign: "left",
            backgroundColor: "#fff",
            padding: "30px",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          }}
        >
          <h2 style={{ marginBottom: "10px" }}>About Me</h2>
          <p style={{ lineHeight: "1.7", color: "#444" }}>
            I am passionate about machine learning, deep learning, and generative AI.
            I enjoy building real-world AI systems, working on computer vision projects,
            and creating products that solve meaningful problems.
          </p>

          <h2 style={{ marginTop: "30px", marginBottom: "10px" }}>Skills</h2>
          <p style={{ lineHeight: "1.7", color: "#444" }}>
            Python, PyTorch, TensorFlow, OpenCV, FastAPI, Next.js, React, SQL, Docker
          </p>

          <h2 style={{ marginTop: "30px", marginBottom: "10px" }}>Projects</h2>
          <p style={{ lineHeight: "1.7", color: "#444" }}>
            Built AI-powered solutions in virtual try-on, fashion cataloging, computer vision,
            and LLM-based applications.
          </p>

          <h2 style={{ marginTop: "30px", marginBottom: "10px" }}>Contact</h2>
          <p style={{ lineHeight: "1.7", color: "#444" }}>
            Email: pratim@example.com
          </p>
        </div>
      </section>
    </main>
  );
}

import React, { useState } from "react";
import HyperChatbot from "./HyperChatbot";

const HyperShowcase = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [tab, setTab] = useState("features");

  const features = [
    { title: "Voice AI Agent", desc: "Explains your product in natural human voice." },
    { title: "Instant Integration", desc: "Embed in any website with one script." },
    { title: "Enterprise Ready", desc: "Scalable for SaaS, apps, and support systems." },
    { title: "Smart Context", desc: "Understands your website and responds accordingly." }
  ];

  const useCases = [
    { title: "SaaS Companies", desc: "Explain product features to users automatically." },
    { title: "E-commerce", desc: "Voice-based product guidance & support." },
    { title: "Startups", desc: "Convert visitors into customers using voice AI." },
    { title: "Enterprise", desc: "Automate onboarding and support flows." }
  ];

  return (
    <>
      <section
        style={{
          padding: "80px 24px",
          background: "#ffffff",
          color: "#000000",
          fontFamily: "Inter, sans-serif"
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

          {/* HEADER */}
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <div
              style={{
                display: "inline-block",
                padding: "4px 12px",
                borderRadius: "100px",
                border: "1px solid #e5e7eb",
                fontSize: "12px",
                color: "#6b7280",
                fontFamily: "Inter, sans-serif",
                marginBottom: "16px"
              }}
            >
              AI VOICE AGENT PLATFORM
            </div>

            <h2
              style={{
                fontSize: "2.5rem",
                fontWeight: 600,
                fontFamily: "Playfair Display, serif",
                letterSpacing: "-0.02em",
                marginTop: "0",
                marginBottom: "16px",
                color: "#000000"
              }}
            >
              Meet{" "}
              <span style={{ color: "#000000", borderBottom: "2px solid #000000" }}>
                Hyper Voice AI
              </span>
            </h2>

            <p
              style={{
                fontSize: "15px",
                color: "#6b7280",
                maxWidth: "600px",
                margin: "0 auto",
                fontFamily: "Inter, sans-serif",
                lineHeight: "1.6"
              }}
            >
              A plug-and-play voice assistant that explains your website, product, and services to users in real-time.
            </p>
          </div>

          {/* GRID */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "24px"
            }}
          >

            {/* LEFT - DEMO CARD */}
            <div
              style={{
                background: "#f9fafb",
                borderRadius: "24px",
                padding: "24px",
                border: "1px solid #e5e7eb"
              }}
            >
              <div style={{ 
                fontSize: "11px", 
                color: "#6b7280",
                fontFamily: "Inter, sans-serif",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                marginBottom: "16px"
              }}>
                LIVE VOICE AGENT
              </div>

              <div
                style={{
                  marginBottom: "20px",
                  padding: "16px",
                  borderRadius: "16px",
                  background: "#ffffff",
                  border: "1px solid #e5e7eb",
                  fontSize: "13px",
                  lineHeight: "1.6",
                  color: "#1f2937",
                  fontFamily: "Inter, sans-serif"
                }}
              >
                “Hi! I am your AI voice assistant. I can explain this product, its features, pricing, and integration steps.”
              </div>

              <button
                onClick={() => setIsOpen(true)}
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "12px",
                  background: "#000000",
                  border: "none",
                  color: "#ffffff",
                  fontWeight: 600,
                  fontSize: "14px",
                  cursor: "pointer",
                  fontFamily: "Inter, sans-serif",
                  transition: "all 0.2s ease"
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.1)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "none";
                }}
              >
                Try Voice Demo →
              </button>
            </div>

            {/* RIGHT SIDE */}
            <div>

              {/* TABS */}
              <div
                style={{
                  display: "flex",
                  gap: "16px",
                  borderBottom: "1px solid #e5e7eb",
                  marginBottom: "20px"
                }}
              >
                {["features", "use"].map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    style={{
                      padding: "8px 0",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: tab === t ? "#000000" : "#9ca3af",
                      fontSize: "14px",
                      fontWeight: tab === t ? 600 : 400,
                      fontFamily: "Inter, sans-serif",
                      borderBottom: tab === t ? "2px solid #000000" : "none",
                      transition: "all 0.2s ease"
                    }}
                  >
                    {t === "features" ? "Features" : "Use Cases"}
                  </button>
                ))}
              </div>

              {/* CARDS */}
              <div style={{ display: "grid", gap: "12px" }}>
                {(tab === "features" ? features : useCases).map((item, i) => (
                  <div
                    key={i}
                    style={{
                      padding: "16px",
                      borderRadius: "16px",
                      border: "1px solid #e5e7eb",
                      background: "#ffffff",
                      transition: "all 0.2s ease",
                      cursor: "pointer"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "#000000";
                      e.currentTarget.style.transform = "translateX(4px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "#e5e7eb";
                      e.currentTarget.style.transform = "translateX(0)";
                    }}
                  >
                    <div style={{ 
                      fontWeight: 600, 
                      fontSize: "15px",
                      color: "#000000",
                      fontFamily: "Inter, sans-serif",
                      marginBottom: "4px"
                    }}>
                      {item.title}
                    </div>
                    <div style={{ 
                      fontSize: "13px", 
                      color: "#6b7280",
                      fontFamily: "Inter, sans-serif",
                      lineHeight: "1.5"
                    }}>
                      {item.desc}
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <button
                onClick={() => setIsOpen(true)}
                style={{
                  marginTop: "20px",
                  width: "100%",
                  padding: "12px",
                  borderRadius: "12px",
                  background: "transparent",
                  border: "1px solid #e5e7eb",
                  color: "#000000",
                  fontWeight: 600,
                  fontSize: "14px",
                  cursor: "pointer",
                  fontFamily: "Inter, sans-serif",
                  transition: "all 0.2s ease"
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "#f9fafb";
                  e.target.style.borderColor = "#000000";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "transparent";
                  e.target.style.borderColor = "#e5e7eb";
                }}
              >
                Integrate Voice AI →
              </button>
            </div>
          </div>
        </div>
      </section>

      <HyperChatbot isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default HyperShowcase;
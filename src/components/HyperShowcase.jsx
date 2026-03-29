import React, { useState, useEffect } from "react";
import HyperChatbot from "./HyperChatbot";

const HyperShowcase = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [tab, setTab] = useState("features");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
          padding: isMobile ? "60px 20px" : "80px 24px",
          background: "#ffffff",
          color: "#000000",
          fontFamily: "Inter, sans-serif"
        }}
      >
        <div style={{ 
          maxWidth: "1100px", 
          margin: "0 auto",
          width: "100%"
        }}>

          {/* HEADER */}
          <div style={{ textAlign: "center", marginBottom: isMobile ? "40px" : "48px" }}>
            <div
              style={{
                display: "inline-block",
                padding: isMobile ? "4px 10px" : "4px 12px",
                borderRadius: "100px",
                border: "1px solid #e5e7eb",
                fontSize: isMobile ? "11px" : "12px",
                color: "#6b7280",
                fontFamily: "Inter, sans-serif",
                marginBottom: "16px"
              }}
            >
              AI VOICE AGENT PLATFORM
            </div>

            <h2
              style={{
                fontSize: isMobile ? "1.8rem" : "2.5rem",
                fontWeight: 600,
                fontFamily: "Playfair Display, serif",
                letterSpacing: "-0.02em",
                marginTop: "0",
                marginBottom: "16px",
                color: "#000000",
                lineHeight: "1.2"
              }}
            >
              Meet{" "}
              <span style={{ 
                color: "#000000", 
                borderBottom: "2px solid #000000",
                display: isMobile ? "inline-block" : "inline"
              }}>
                Hyper Voice AI
              </span>
            </h2>

            <p
              style={{
                fontSize: isMobile ? "14px" : "15px",
                color: "#6b7280",
                maxWidth: "600px",
                margin: "0 auto",
                fontFamily: "Inter, sans-serif",
                lineHeight: "1.6",
                padding: isMobile ? "0 16px" : "0"
              }}
            >
              A plug-and-play voice assistant that explains your website, product, and services to users in real-time.
            </p>
          </div>

          {/* GRID - Responsive */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
              gap: isMobile ? "24px" : "24px"
            }}
          >

            {/* LEFT - DEMO CARD */}
            <div
              style={{
                background: "#f9fafb",
                borderRadius: "20px",
                padding: isMobile ? "20px" : "24px",
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
                  padding: isMobile ? "14px" : "16px",
                  borderRadius: "14px",
                  background: "#ffffff",
                  border: "1px solid #e5e7eb",
                  fontSize: isMobile ? "12px" : "13px",
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
                  padding: isMobile ? "12px" : "12px",
                  borderRadius: "12px",
                  background: "#000000",
                  border: "none",
                  color: "#ffffff",
                  fontWeight: 600,
                  fontSize: isMobile ? "13px" : "14px",
                  cursor: "pointer",
                  fontFamily: "Inter, sans-serif",
                  transition: "all 0.2s ease"
                }}
                onMouseEnter={(e) => {
                  if (!isMobile) {
                    e.target.style.transform = "translateY(-2px)";
                    e.target.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.1)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isMobile) {
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow = "none";
                  }
                }}
                onTouchStart={(e) => {
                  e.target.style.opacity = "0.8";
                }}
                onTouchEnd={(e) => {
                  e.target.style.opacity = "1";
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
                  gap: isMobile ? "24px" : "16px",
                  justifyContent: isMobile ? "center" : "flex-start",
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
                      fontSize: isMobile ? "13px" : "14px",
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
                      padding: isMobile ? "14px" : "16px",
                      borderRadius: "14px",
                      border: "1px solid #e5e7eb",
                      background: "#ffffff",
                      transition: "all 0.2s ease",
                      cursor: "pointer"
                    }}
                    onMouseEnter={(e) => {
                      if (!isMobile) {
                        e.currentTarget.style.borderColor = "#000000";
                        e.currentTarget.style.transform = "translateX(4px)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isMobile) {
                        e.currentTarget.style.borderColor = "#e5e7eb";
                        e.currentTarget.style.transform = "translateX(0)";
                      }
                    }}
                    onTouchStart={(e) => {
                      e.currentTarget.style.borderColor = "#000000";
                      e.currentTarget.style.backgroundColor = "#f9fafb";
                    }}
                    onTouchEnd={(e) => {
                      e.currentTarget.style.borderColor = "#e5e7eb";
                      e.currentTarget.style.backgroundColor = "#ffffff";
                    }}
                  >
                    <div style={{ 
                      fontWeight: 600, 
                      fontSize: isMobile ? "14px" : "15px",
                      color: "#000000",
                      fontFamily: "Inter, sans-serif",
                      marginBottom: "4px"
                    }}>
                      {item.title}
                    </div>
                    <div style={{ 
                      fontSize: isMobile ? "12px" : "13px", 
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
                  padding: isMobile ? "12px" : "12px",
                  borderRadius: "12px",
                  background: "transparent",
                  border: "1px solid #e5e7eb",
                  color: "#000000",
                  fontWeight: 600,
                  fontSize: isMobile ? "13px" : "14px",
                  cursor: "pointer",
                  fontFamily: "Inter, sans-serif",
                  transition: "all 0.2s ease"
                }}
                onMouseEnter={(e) => {
                  if (!isMobile) {
                    e.target.style.background = "#f9fafb";
                    e.target.style.borderColor = "#000000";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isMobile) {
                    e.target.style.background = "transparent";
                    e.target.style.borderColor = "#e5e7eb";
                  }
                }}
                onTouchStart={(e) => {
                  e.target.style.background = "#f9fafb";
                  e.target.style.borderColor = "#000000";
                }}
                onTouchEnd={(e) => {
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
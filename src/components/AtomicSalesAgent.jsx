import React, { useState, useEffect } from "react";

const AtomicSalesAgent = () => {
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
    { title: "AI-Powered Cold Calling", desc: "Automated outbound calls that sound human and convert leads." },
    { title: "Smart Lead Qualification", desc: "Identifies high-intent prospects and scores them automatically." },
    { title: "Real-time Objection Handling", desc: "Responds to customer concerns with intelligent rebuttals." },
    { title: "CRM Integration", desc: "Syncs seamlessly with Salesforce, HubSpot, and Pipedrive." }
  ];

  const useCases = [
    { title: "B2B Sales Teams", desc: "Scale outreach without hiring more SDRs." },
    { title: "Real Estate", desc: "Follow up with leads and schedule property viewings." },
    { title: "Insurance", desc: "Qualify leads and book appointments with agents." },
    { title: "SaaS Companies", desc: "Demo scheduling and lead nurturing at scale." }
  ];

  const pricingPlans = [
    { name: "Starter", price: "$299", calls: "500 calls/month", features: ["Basic Analytics", "Email Support", "Standard Integration"] },
    { name: "Professional", price: "$599", calls: "2,000 calls/month", features: ["Advanced Analytics", "Priority Support", "Full CRM Sync", "Custom Scripts"] },
    { name: "Enterprise", price: "Custom", calls: "Unlimited calls", features: ["Dedicated Account Manager", "Custom Integration", "SLA Guarantee", "White-label"] }
  ];

  return (
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
            AI SALES AUTOMATION PLATFORM
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
              Atomic Sales Agent
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
            An AI-powered sales agent that calls, qualifies, and converts leads automatically — scaling your outreach without scaling your team.
          </p>
        </div>

        {/* MAIN GRID */}
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
              LIVE SALES DEMO
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
              “Hi! I'm your Atomic Sales Agent. I can help qualify leads, answer product questions, and schedule demos. How can I assist your sales team today?”
            </div>

            <div style={{ display: "flex", gap: "12px" }}>
              <button
                style={{
                  flex: 1,
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
              >
                Start Free Trial →
              </button>
            </div>

            <div style={{ marginTop: "16px", textAlign: "center" }}>
              <span style={{ fontSize: "11px", color: "#6b7280", fontFamily: "Inter, sans-serif" }}>
                No credit card required
              </span>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div>

            {/* TABS */}
            <div
              style={{
                display: "flex",
                gap: isMobile ? "24px" : "32px",
                justifyContent: isMobile ? "center" : "flex-start",
                borderBottom: "1px solid #e5e7eb",
                marginBottom: "20px"
              }}
            >
              <div
                style={{
                  padding: "8px 0",
                  color: "#000000",
                  fontSize: isMobile ? "13px" : "14px",
                  fontWeight: 600,
                  fontFamily: "Inter, sans-serif",
                  borderBottom: "2px solid #000000"
                }}
              >
                Features
              </div>
              <div
                style={{
                  padding: "8px 0",
                  color: "#9ca3af",
                  fontSize: isMobile ? "13px" : "14px",
                  fontWeight: 400,
                  fontFamily: "Inter, sans-serif",
                  borderBottom: "none"
                }}
              >
                Use Cases
              </div>
            </div>

            {/* FEATURES CARDS */}
            <div style={{ display: "grid", gap: "12px" }}>
              {features.map((item, i) => (
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
          </div>
        </div>

        {/* PRICING SECTION */}
        <div style={{ marginTop: isMobile ? "48px" : "64px" }}>
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <h3
              style={{
                fontSize: isMobile ? "1.5rem" : "1.8rem",
                fontWeight: 600,
                fontFamily: "Playfair Display, serif",
                letterSpacing: "-0.02em",
                color: "#000000",
                marginBottom: "8px"
              }}
            >
              Simple, transparent pricing
            </h3>
            <p
              style={{
                fontSize: isMobile ? "13px" : "14px",
                color: "#6b7280",
                fontFamily: "Inter, sans-serif"
              }}
            >
              Choose the plan that fits your sales volume
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
              gap: isMobile ? "16px" : "20px"
            }}
          >
            {pricingPlans.map((plan, i) => (
              <div
                key={i}
                style={{
                  background: i === 1 ? "#f9fafb" : "#ffffff",
                  borderRadius: "20px",
                  padding: isMobile ? "20px" : "24px",
                  border: i === 1 ? "2px solid #000000" : "1px solid #e5e7eb",
                  transition: "all 0.2s ease"
                }}
                onMouseEnter={(e) => {
                  if (!isMobile) {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.08)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isMobile) {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }
                }}
              >
                {i === 1 && (
                  <div
                    style={{
                      display: "inline-block",
                      padding: "4px 12px",
                      borderRadius: "100px",
                      background: "#000000",
                      color: "#ffffff",
                      fontSize: "10px",
                      fontWeight: 600,
                      fontFamily: "Inter, sans-serif",
                      marginBottom: "12px"
                    }}
                  >
                    MOST POPULAR
                  </div>
                )}
                <div
                  style={{
                    fontSize: isMobile ? "18px" : "20px",
                    fontWeight: 600,
                    color: "#000000",
                    fontFamily: "Playfair Display, serif",
                    marginBottom: "8px"
                  }}
                >
                  {plan.name}
                </div>
                <div
                  style={{
                    fontSize: isMobile ? "28px" : "32px",
                    fontWeight: 700,
                    color: "#000000",
                    fontFamily: "Inter, sans-serif",
                    marginBottom: "4px"
                  }}
                >
                  {plan.price}
                  {plan.price !== "Custom" && (
                    <span style={{ fontSize: "14px", fontWeight: 400, color: "#6b7280" }}>/month</span>
                  )}
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    color: "#6b7280",
                    fontFamily: "Inter, sans-serif",
                    marginBottom: "16px"
                  }}
                >
                  {plan.calls}
                </div>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {plan.features.map((feature, idx) => (
                    <li
                      key={idx}
                      style={{
                        fontSize: "12px",
                        color: "#4b5563",
                        fontFamily: "Inter, sans-serif",
                        padding: "6px 0",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px"
                      }}
                    >
                      <span style={{ color: "#10b981", fontSize: "14px" }}>✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  style={{
                    width: "100%",
                    marginTop: "20px",
                    padding: "10px",
                    borderRadius: "10px",
                    background: i === 1 ? "#000000" : "transparent",
                    border: i === 1 ? "none" : "1px solid #e5e7eb",
                    color: i === 1 ? "#ffffff" : "#000000",
                    fontWeight: 600,
                    fontSize: "13px",
                    cursor: "pointer",
                    fontFamily: "Inter, sans-serif",
                    transition: "all 0.2s ease"
                  }}
                  onMouseEnter={(e) => {
                    if (!isMobile) {
                      if (i === 1) {
                        e.target.style.opacity = "0.9";
                      } else {
                        e.target.style.background = "#f9fafb";
                        e.target.style.borderColor = "#000000";
                      }
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isMobile) {
                      if (i === 1) {
                        e.target.style.opacity = "1";
                      } else {
                        e.target.style.background = "transparent";
                        e.target.style.borderColor = "#e5e7eb";
                      }
                    }
                  }}
                >
                  {plan.price === "Custom" ? "Contact Sales" : "Get Started"}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* CTA BANNER */}
        <div
          style={{
            marginTop: isMobile ? "48px" : "64px",
            background: "#000000",
            borderRadius: "24px",
            padding: isMobile ? "32px 20px" : "48px",
            textAlign: "center"
          }}
        >
          <h3
            style={{
              fontSize: isMobile ? "1.5rem" : "1.8rem",
              fontWeight: 600,
              fontFamily: "Playfair Display, serif",
              letterSpacing: "-0.02em",
              color: "#ffffff",
              marginBottom: "12px"
            }}
          >
            Ready to 10x your sales outreach?
          </h3>
          <p
            style={{
              fontSize: isMobile ? "13px" : "14px",
              color: "#9ca3af",
              fontFamily: "Inter, sans-serif",
              maxWidth: "500px",
              margin: "0 auto 24px"
            }}
          >
            Join hundreds of companies scaling their sales with Atomic AI agents
          </p>
          <button
            style={{
              padding: isMobile ? "12px 24px" : "14px 32px",
              borderRadius: "12px",
              background: "#ffffff",
              border: "none",
              color: "#000000",
              fontWeight: 600,
              fontSize: isMobile ? "13px" : "14px",
              cursor: "pointer",
              fontFamily: "Inter, sans-serif",
              transition: "all 0.2s ease"
            }}
            onMouseEnter={(e) => {
              if (!isMobile) {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 4px 12px rgba(255, 255, 255, 0.2)";
              }
            }}
            onMouseLeave={(e) => {
              if (!isMobile) {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "none";
              }
            }}
          >
            Start Free Trial →
          </button>
        </div>
      </div>
    </section>
  );
};

export default AtomicSalesAgent;
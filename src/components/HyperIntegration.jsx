import React, { useState } from 'react';
import HyperChatbot from './HyperChatbot';

const HyperIntegration = () => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('quick');
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const integrationCode = `<script>
  (function() {
    // Hyper AI Voice Agent Integration
    const script = document.createElement('script');
    script.src = 'https://hyper-ai.yourdomain.com/embed.js';
    script.async = true;
    script.setAttribute('data-agent-id', 'YOUR_AGENT_ID');
    script.setAttribute('data-api-key', 'YOUR_API_KEY');
    document.head.appendChild(script);
    
    window.HyperAI = {
      init: function(config) {
        console.log('Hyper AI initialized', config);
      }
    };
  })();
</script>

<!-- Or with React -->
import { HyperAgent } from '@hyper-ai/react';

function App() {
  return (
    <HyperAgent 
      apiKey="YOUR_API_KEY"
      agentId="YOUR_AGENT_ID"
      position="bottom-right"
      theme="dark"
    />
  );
}`;

  const pricingPlans = [
    {
      name: "Starter",
      price: "$99",
      period: "/month",
      features: [
        "Up to 10,000 conversations/month",
        "Basic voice agent",
        "Email support",
        "API access",
        "Basic analytics"
      ],
      buttonText: "Start Free Trial",
      popular: false
    },
    {
      name: "Professional",
      price: "$299",
      period: "/month",
      features: [
        "Up to 50,000 conversations/month",
        "Advanced voice AI",
        "Priority support",
        "Custom voice training",
        "Advanced analytics",
        "Multi-language support",
        "White-label option"
      ],
      buttonText: "Start Free Trial",
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      features: [
        "Unlimited conversations",
        "Dedicated account manager",
        "Custom model training",
        "On-premise deployment",
        "SLA 99.99% uptime",
        "SOC2 compliance",
        "24/7 enterprise support",
        "Custom integrations"
      ],
      buttonText: "Contact Sales",
      popular: false
    }
  ];

  const industries = [
    { name: "SaaS", icon: "☁️", description: "Product demos, onboarding, support" },
    { name: "E-commerce", icon: "🛍️", description: "Shopping assistance, order tracking" },
    { name: "Healthcare", icon: "🏥", description: "Appointment scheduling, patient support" },
    { name: "Finance", icon: "💰", description: "Account inquiries, fraud alerts" },
    { name: "Real Estate", icon: "🏠", description: "Property inquiries, scheduling" },
    { name: "Education", icon: "📚", description: "Student support, course guidance" }
  ];

  return (
    <>
      <section style={{
        minHeight: '100vh',
        background: '#ffffff',
        fontFamily: 'Inter, sans-serif'
      }}>
        {/* Hero Section */}
        <div style={{
          background: 'linear-gradient(135deg, #f9fafb 0%, #ffffff 100%)',
          padding: '80px 24px',
          textAlign: 'center',
          borderBottom: '1px solid #e5e7eb'
        }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div style={{
              display: 'inline-block',
              padding: '4px 12px',
              borderRadius: '100px',
              background: '#f3f4f6',
              fontSize: '12px',
              color: '#6b7280',
              marginBottom: '20px'
            }}>
              ENTERPRISE INTEGRATION
            </div>
            <h1 style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 600,
              fontFamily: 'Playfair Display, serif',
              letterSpacing: '-0.02em',
              marginBottom: '20px',
              color: '#000000'
            }}>
              Integrate Hyper Voice AI
              <br />
              <span style={{ borderBottom: '2px solid #000000' }}>In Minutes</span>
            </h1>
            <p style={{
              fontSize: '18px',
              color: '#6b7280',
              maxWidth: '600px',
              margin: '0 auto 32px',
              lineHeight: '1.6'
            }}>
              Add intelligent voice AI to your website with a single line of code. 
              Let Hyper explain your product, answer questions, and convert visitors.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={() => setIsChatbotOpen(true)}
                style={{
                  padding: '14px 32px',
                  background: '#000000',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
              >
                Try Live Demo →
              </button>
              <button
                onClick={() => document.getElementById('integration-code').scrollIntoView({ behavior: 'smooth' })}
                style={{
                  padding: '14px 32px',
                  background: 'transparent',
                  color: '#000000',
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = '#f9fafb';
                  e.target.style.borderColor = '#000000';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                  e.target.style.borderColor = '#e5e7eb';
                }}
              >
                View Documentation
              </button>
            </div>
          </div>
        </div>

        {/* Quick Integration */}
        <div id="integration-code" style={{ padding: '80px 24px', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{
              fontSize: '2rem',
              fontWeight: 600,
              fontFamily: 'Playfair Display, serif',
              marginBottom: '16px',
              color: '#000000'
            }}>
              Quick Integration
            </h2>
            <p style={{ fontSize: '16px', color: '#6b7280' }}>
              Add to any website with one line of code
            </p>
          </div>

          <div style={{
            background: '#f9fafb',
            borderRadius: '24px',
            border: '1px solid #e5e7eb',
            overflow: 'hidden'
          }}>
            <div style={{
              display: 'flex',
              borderBottom: '1px solid #e5e7eb',
              background: '#ffffff'
            }}>
              {['quick', 'react', 'api'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    padding: '14px 24px',
                    background: activeTab === tab ? '#ffffff' : 'transparent',
                    border: 'none',
                    color: activeTab === tab ? '#000000' : '#6b7280',
                    fontSize: '14px',
                    fontWeight: activeTab === tab ? 600 : 400,
                    cursor: 'pointer',
                    borderBottom: activeTab === tab ? '2px solid #000000' : 'none',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {tab === 'quick' ? 'Quick Script' : tab === 'react' ? 'React Component' : 'API Integration'}
                </button>
              ))}
            </div>
            <div style={{ padding: '24px', position: 'relative' }}>
              <pre style={{
                background: '#1a1a1a',
                color: '#e5e7eb',
                padding: '20px',
                borderRadius: '12px',
                overflowX: 'auto',
                fontSize: '13px',
                fontFamily: 'Monaco, monospace',
                margin: 0
              }}>
                <code>{integrationCode}</code>
              </pre>
              <button
                onClick={() => copyToClipboard(integrationCode)}
                style={{
                  position: 'absolute',
                  top: '32px',
                  right: '32px',
                  padding: '6px 12px',
                  background: '#ffffff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {copied ? '✓ Copied!' : 'Copy Code'}
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Plans */}
        <div style={{ padding: '80px 24px', background: '#f9fafb' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <h2 style={{
                fontSize: '2rem',
                fontWeight: 600,
                fontFamily: 'Playfair Display, serif',
                marginBottom: '16px',
                color: '#000000'
              }}>
                Choose Your Plan
              </h2>
              <p style={{ fontSize: '16px', color: '#6b7280' }}>
                Flexible pricing for businesses of all sizes
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '24px'
            }}>
              {pricingPlans.map((plan, index) => (
                <div
                  key={index}
                  style={{
                    background: '#ffffff',
                    borderRadius: '24px',
                    padding: '32px',
                    border: plan.popular ? '2px solid #000000' : '1px solid #e5e7eb',
                    position: 'relative',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {plan.popular && (
                    <div style={{
                      position: 'absolute',
                      top: '-12px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: '#000000',
                      color: '#ffffff',
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: 600
                    }}>
                      MOST POPULAR
                    </div>
                  )}
                  <h3 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '8px' }}>{plan.name}</h3>
                  <div style={{ marginBottom: '24px' }}>
                    <span style={{ fontSize: '36px', fontWeight: 700 }}>{plan.price}</span>
                    <span style={{ color: '#6b7280' }}>{plan.period}</span>
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, marginBottom: '32px' }}>
                    {plan.features.map((feature, i) => (
                      <li key={i} style={{ padding: '8px 0', color: '#4b5563', fontSize: '14px' }}>
                        ✓ {feature}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => plan.name === 'Enterprise' ? window.location.href = '/contact' : setIsChatbotOpen(true)}
                    style={{
                      width: '100%',
                      padding: '12px',
                      background: plan.popular ? '#000000' : 'transparent',
                      border: plan.popular ? 'none' : '1px solid #e5e7eb',
                      borderRadius: '12px',
                      color: plan.popular ? '#ffffff' : '#000000',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {plan.buttonText}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Industries */}
        <div style={{ padding: '80px 24px', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{
              fontSize: '2rem',
              fontWeight: 600,
              fontFamily: 'Playfair Display, serif',
              marginBottom: '16px',
              color: '#000000'
            }}>
              Trusted by Industry Leaders
            </h2>
            <p style={{ fontSize: '16px', color: '#6b7280' }}>
              Used by companies across every sector
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px'
          }}>
            {industries.map((industry, index) => (
              <div
                key={index}
                style={{
                  padding: '24px',
                  background: '#ffffff',
                  borderRadius: '16px',
                  border: '1px solid #e5e7eb',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#000000';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#e5e7eb';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{ fontSize: '32px', marginBottom: '16px' }}>{industry.icon}</div>
                <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>{industry.name}</h3>
                <p style={{ fontSize: '14px', color: '#6b7280' }}>{industry.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Enterprise Features */}
        <div style={{ padding: '80px 24px', background: '#f9fafb' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{
              fontSize: '2rem',
              fontWeight: 600,
              fontFamily: 'Playfair Display, serif',
              marginBottom: '16px',
              color: '#000000'
            }}>
              Enterprise-Ready Features
            </h2>
            <p style={{ fontSize: '16px', color: '#6b7280', marginBottom: '48px' }}>
              Built for scale, security, and performance
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '32px'
            }}>
              {[
                { title: '99.99% Uptime SLA', desc: 'Guaranteed reliability for mission-critical applications' },
                { title: 'SOC2 Type II', desc: 'Enterprise-grade security and compliance' },
                { title: 'Custom Deployment', desc: 'On-premise or cloud, your choice' },
                { title: 'White Label', desc: 'Fully branded as your product' },
                { title: 'Dedicated Support', desc: '24/7 enterprise support team' },
                { title: 'Custom Training', desc: 'Train on your specific data' }
              ].map((feature, index) => (
                <div key={index}>
                  <div style={{ fontSize: '24px', marginBottom: '12px' }}>✓</div>
                  <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>{feature.title}</h3>
                  <p style={{ fontSize: '13px', color: '#6b7280' }}>{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div style={{ padding: '80px 24px', textAlign: 'center' }}>
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{
              fontSize: '2rem',
              fontWeight: 600,
              fontFamily: 'Playfair Display, serif',
              marginBottom: '16px',
              color: '#000000'
            }}>
              Ready to Get Started?
            </h2>
            <p style={{ fontSize: '16px', color: '#6b7280', marginBottom: '32px' }}>
              Join hundreds of companies using Hyper Voice AI
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={() => setIsChatbotOpen(true)}
                style={{
                  padding: '14px 32px',
                  background: '#000000',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Start Free Trial →
              </button>
              <button
                onClick={() => window.location.href = '/contact'}
                style={{
                  padding: '14px 32px',
                  background: 'transparent',
                  color: '#000000',
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      <HyperChatbot isOpen={isChatbotOpen} onClose={() => setIsChatbotOpen(false)} />
    </>
  );
};

export default HyperIntegration;
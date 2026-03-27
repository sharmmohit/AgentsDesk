import React, { useState, useEffect, useRef } from 'react';
import HyperChatbot from './HyperChatbot';

const VoiceAssistant = () => {
  const [isHyperOpen, setIsHyperOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [spokenText, setSpokenText] = useState('');
  
  const synthRef = useRef(window.speechSynthesis);
  const sectionRefs = useRef({});

  // Hero section fonts and styles
  const heroFonts = {
    heading: {
      fontFamily: 'Playfair Display, serif',
      letterSpacing: '-0.03em'
    },
    body: {
      fontFamily: 'Inter, sans-serif'
    },
    accent: {
      fontFamily: 'Inter, sans-serif',
      letterSpacing: '0.12em'
    }
  };

  // Voice content for each section
  const voiceContent = {
    overview: {
      title: "What is AgentDesk?",
      content: "AgentDesk is a cutting-edge AI Agent Marketplace that enables businesses to discover, deploy, and manage intelligent AI agents in minutes. From voice calling to customer support, restaurant reservations to sales automation — we provide the infrastructure for the next generation of AI-powered customer interaction.",
      stats: ["2,400+ Agents", "98% Uptime", "<200ms Latency", "150+ Integrations"]
    },
    voiceAgents: {
      title: "Voice AI Agents",
      content: "Our Voice AI Agents deliver natural, human-like conversations with sub-200 millisecond response times. They handle inbound and outbound calls, qualify leads, schedule appointments, and provide 24/7 customer support. Enterprises using our voice agents see a 37% reduction in response times and a 40% reduction in missed appointments.",
      features: ["Natural conversation flow", "Multi-language support (50+ languages)", "Real-time speech synthesis", "Custom voice training"]
    },
    healthcare: {
      title: "Healthcare & Patient Engagement",
      content: "Transform patient communication with AI voice agents that handle appointment scheduling, prescription refills, insurance verification, and after-hours triage. Healthcare providers using AgentDesk report a 40% reduction in missed appointments and significant improvement in patient satisfaction scores.",
      stats: ["40% fewer missed appointments", "24/7 patient support", "HIPAA-ready infrastructure"]
    },
    enterprise: {
      title: "Enterprise Solutions",
      content: "Deploy AI agents at scale with our enterprise-grade infrastructure. Features include white-label solutions, custom AI model training on your data, SOC2 Type II compliance, and dedicated account management. Most enterprise clients see ROI within 3 months and reduce operational costs by up to 60%.",
      features: ["99.99% uptime SLA", "On-premise deployment", "Custom SSO", "Dedicated support"]
    },
    integration: {
      title: "Seamless Integration",
      content: "Connect AgentDesk with your existing tools in under an hour. We offer RESTful APIs, SDKs for React, Python, and Node.js, plus native integrations with Salesforce, HubSpot, Shopify, and 150+ other platforms. No code changes required — our agents work with your existing workflows.",
      integrations: ["Salesforce", "HubSpot", "Slack", "Zapier", "Shopify", "WordPress"]
    }
  };

  // Text-to-speech function
  const speakText = (text, onEnd = null) => {
    if (!synthRef.current) return;
    
    synthRef.current.cancel();
    
    const cleanText = text.replace(/[^\w\s.,!?]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;
    
    const voices = synthRef.current.getVoices();
    const preferredVoice = voices.find(voice => 
      voice.name.includes('Google') || 
      voice.name.includes('Natural') ||
      voice.lang === 'en-US'
    );
    if (preferredVoice) utterance.voice = preferredVoice;
    
    utterance.onstart = () => {
      setIsSpeaking(true);
      setSpokenText(text.substring(0, 100) + '...');
    };
    utterance.onend = () => {
      setIsSpeaking(false);
      setSpokenText('');
      if (onEnd) onEnd();
    };
    utterance.onerror = () => setIsSpeaking(false);
    
    synthRef.current.speak(utterance);
  };

  const stopSpeaking = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
    }
    setIsSpeaking(false);
    setSpokenText('');
  };

  const playSection = (sectionKey) => {
    setActiveSection(sectionKey);
    const content = voiceContent[sectionKey];
    let fullText = `${content.title}. ${content.content}`;
    if (content.features) {
      fullText += ` Key features include: ${content.features.join(', ')}.`;
    }
    if (content.stats) {
      fullText += ` Results: ${content.stats.join(', ')}.`;
    }
    if (content.integrations) {
      fullText += ` Integrates with: ${content.integrations.join(', ')}.`;
    }
    speakText(fullText);
  };

  const playFullOverview = () => {
    let fullText = "Welcome to AgentDesk. ";
    Object.values(voiceContent).forEach((section, i) => {
      fullText += `${section.title}. ${section.content} `;
      if (section.features) fullText += `Features: ${section.features.join(', ')}. `;
      if (section.stats) fullText += `Results: ${section.stats.join(', ')}. `;
    });
    fullText += "Ready to transform your business with AI agents? Click Try Hyper AI to start a conversation with me!";
    speakText(fullText);
  };

  // Sections for the voice assistant
  const sections = [
    { key: 'overview', icon: '🎯', title: 'What is AgentDesk?', color: '#00ff9d' },
    { key: 'voiceAgents', icon: '🎤', title: 'Voice AI Agents', color: '#00b8ff' },
    { key: 'healthcare', icon: '🏥', title: 'Healthcare', color: '#ff6b6b' },
    { key: 'enterprise', icon: '🏢', title: 'Enterprise', color: '#ffd93d' },
    { key: 'integration', icon: '🔌', title: 'Integration', color: '#c084fc' }
  ];

  return (
    <>
      <section
        id="voice-assistant"
        style={{
          position: 'relative',
          padding: '100px 0',
          background: 'linear-gradient(135deg, #0a0a1a 0%, #0f0f1a 100%)',
          overflow: 'hidden'
        }}
      >
        {/* Animated Background */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(circle at 20% 50%, rgba(0,255,157,0.03) 0%, transparent 50%),
                      radial-gradient(circle at 80% 80%, rgba(0,184,255,0.03) 0%, transparent 50%)`,
          pointerEvents: 'none'
        }} />

        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 40px',
          position: 'relative',
          zIndex: 2
        }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              background: 'rgba(0,255,157,0.1)',
              padding: '8px 20px',
              borderRadius: '100px',
              marginBottom: '24px',
              border: '1px solid rgba(0,255,157,0.3)'
            }}>
              <span style={{ fontSize: '20px' }}>🎙️</span>
              <span style={{
                ...heroFonts.accent,
                fontSize: '12px',
                fontWeight: 500,
                color: '#00ff9d',
                textTransform: 'uppercase'
              }}>
                Voice AI Assistant
              </span>
            </div>
            
            <h2 style={{
              ...heroFonts.heading,
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              fontWeight: 600,
              color: '#fff',
              marginBottom: '20px'
            }}>
              Meet Your{' '}
              <span style={{
                background: 'linear-gradient(135deg, #00ff9d, #00b8ff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Voice AI Assistant
              </span>
            </h2>
            
            <p style={{
              ...heroFonts.body,
              fontSize: '18px',
              color: '#9ca3af',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              I'm Hyper — your intelligent voice agent. Click any card below and I'll explain
              how AgentDesk can transform your business. Or start a conversation with me directly.
            </p>
          </div>

          {/* Voice Status Bar */}
          {isSpeaking && (
            <div style={{
              maxWidth: '800px',
              margin: '0 auto 40px',
              background: 'rgba(0,255,157,0.1)',
              borderRadius: '60px',
              padding: '12px 24px',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              border: '1px solid rgba(0,255,157,0.3)',
              animation: 'slideUp 0.3s ease-out'
            }}>
              <div style={{
                width: '32px',
                height: '32px',
                background: 'linear-gradient(135deg, #00ff9d, #00b8ff)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                animation: 'pulse 1s infinite'
              }}>
                <span style={{ fontSize: '14px' }}>🔊</span>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: '11px',
                  color: '#00ff9d',
                  fontFamily: 'JetBrains Mono',
                  marginBottom: '4px'
                }}>
                  HYPER IS SPEAKING
                </div>
                <div style={{
                  fontSize: '13px',
                  color: '#fff',
                  fontFamily: 'Inter, sans-serif'
                }}>
                  {spokenText}
                </div>
              </div>
              <button
                onClick={stopSpeaking}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.1)',
                  border: 'none',
                  color: '#fff',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                ⏹️
              </button>
            </div>
          )}

          {/* Play All Button */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '48px' }}>
            <button
              onClick={playFullOverview}
              disabled={isSpeaking}
              style={{
                ...heroFonts.body,
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '14px 32px',
                background: 'linear-gradient(135deg, #00ff9d, #00b8ff)',
                border: 'none',
                borderRadius: '60px',
                color: '#0a0a1a',
                fontSize: '14px',
                fontWeight: 600,
                cursor: isSpeaking ? 'not-allowed' : 'pointer',
                opacity: isSpeaking ? 0.6 : 1,
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                if (!isSpeaking) e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
              }}
            >
              <span>🎙️</span>
              Play Full Overview
              <span>▶️</span>
            </button>
          </div>

          {/* Voice Assistant Cards Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
            marginBottom: '60px'
          }}>
            {sections.map((section) => (
              <div
                key={section.key}
                onClick={() => playSection(section.key)}
                style={{
                  background: activeSection === section.key 
                    ? `linear-gradient(135deg, ${section.color}15, transparent)`
                    : 'rgba(255,255,255,0.02)',
                  border: activeSection === section.key 
                    ? `1px solid ${section.color}`
                    : '1px solid rgba(255,255,255,0.05)',
                  borderRadius: '24px',
                  padding: '28px',
                  cursor: isSpeaking ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s ease',
                  opacity: isSpeaking ? 0.7 : 1,
                  backdropFilter: 'blur(10px)'
                }}
                onMouseEnter={(e) => {
                  if (!isSpeaking) {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.background = `linear-gradient(135deg, ${section.color}20, rgba(255,255,255,0.05))`;
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  if (activeSection !== section.key) {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                  }
                }}
              >
                <div style={{
                  width: '56px',
                  height: '56px',
                  background: `linear-gradient(135deg, ${section.color}30, ${section.color}10)`,
                  borderRadius: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '28px',
                  marginBottom: '20px'
                }}>
                  {section.icon}
                </div>
                <h3 style={{
                  ...heroFonts.heading,
                  fontSize: '20px',
                  fontWeight: 600,
                  color: '#fff',
                  marginBottom: '12px'
                }}>
                  {section.title}
                </h3>
                <p style={{
                  ...heroFonts.body,
                  fontSize: '14px',
                  color: '#9ca3af',
                  lineHeight: '1.5',
                  marginBottom: '20px'
                }}>
                  {voiceContent[section.key].content.substring(0, 100)}...
                </p>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: section.color,
                  fontSize: '13px',
                  fontWeight: 500
                }}>
                  <span>🔊</span>
                  <span>Click to hear explanation</span>
                  <span>→</span>
                </div>
              </div>
            ))}
          </div>

          {/* Stats Row */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '48px',
            flexWrap: 'wrap',
            padding: '32px 0',
            borderTop: '1px solid rgba(255,255,255,0.05)',
            borderBottom: '1px solid rgba(255,255,255,0.05)',
            marginBottom: '48px'
          }}>
            {[
              { value: '37%', label: 'Faster Response Time', icon: '⚡' },
              { value: '40%', label: 'Fewer Missed Appointments', icon: '📅' },
              { value: '60%', label: 'Cost Reduction', icon: '💰' },
              { value: '24/7', label: 'Always Available', icon: '🕒' }
            ].map((stat, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '28px', marginBottom: '8px' }}>{stat.icon}</div>
                <div style={{
                  ...heroFonts.heading,
                  fontSize: '28px',
                  fontWeight: 700,
                  color: '#00ff9d'
                }}>
                  {stat.value}
                </div>
                <div style={{
                  ...heroFonts.body,
                  fontSize: '12px',
                  color: '#9ca3af'
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div style={{ textAlign: 'center' }}>
            <button
              onClick={() => setIsHyperOpen(true)}
              style={{
                ...heroFonts.body,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                padding: '16px 40px',
                background: '#fff',
                border: 'none',
                borderRadius: '60px',
                color: '#0a0a1a',
                fontSize: '15px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 10px 30px rgba(255,255,255,0.2)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              <span>💬</span>
              Start a Conversation with Hyper
              <span>→</span>
            </button>
            <p style={{
              ...heroFonts.body,
              fontSize: '12px',
              color: '#6b7280',
              marginTop: '16px'
            }}>
              Click to chat — I can answer questions, explain features, or help you get started
            </p>
          </div>
        </div>

        <style>{`
          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes pulse {
            0%, 100% {
              transform: scale(1);
              opacity: 1;
            }
            50% {
              transform: scale(1.1);
              opacity: 0.8;
            }
          }
        `}</style>
      </section>

      {/* Hyper Chatbot Modal - Existing functionality untouched */}
      <HyperChatbot 
        isOpen={isHyperOpen}
        onClose={() => setIsHyperOpen(false)}
      />
    </>
  );
};

export default VoiceAssistant;
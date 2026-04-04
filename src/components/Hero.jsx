import React, { useState, useEffect } from 'react';
import HyperChatbot from './HyperChatbot';

const Hero = () => {
  const [isHyperOpen, setIsHyperOpen] = useState(false);
  
  const words = [
    'Voice Agents',
    'Calling Agents',
    'Restaurant Bots',
    'Appointment AI',
    'Support Agents',
    'Sales Agents'
  ];

  const [wordIndex, setWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex];
    let timer;

    if (!deleting && displayText === current) {
      timer = setTimeout(() => setDeleting(true), 1500);
    } else if (deleting && displayText === '') {
      setDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
    } else {
      timer = setTimeout(() => {
        setDisplayText(prev =>
          deleting ? prev.slice(0, -1) : current.slice(0, prev.length + 1)
        );
      }, deleting ? 40 : 70);
    }

    return () => clearTimeout(timer);
  }, [displayText, deleting, wordIndex]);

  const scrollToAgents = () => {
    const element = document.getElementById('agents');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToHow = () => {
    const element = document.getElementById('how');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  // Add keyframes for blink animation
  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.textContent = `
      @keyframes blink {
        0%, 100% { opacity: 1; }
        50% { opacity: 0; }
      }
    `;
    document.head.appendChild(styleSheet);
    return () => document.head.removeChild(styleSheet);
  }, []);

  return (
    <>
      <section
        id="hero"
        style={{
          position: 'relative',
          minHeight: '85vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: '80px',
          overflow: 'hidden'
        }}
      >
        {/* 🎥 VIDEO BACKGROUND */}
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0
          }}
        >
          <source src="/videos/sky.mp4" type="video/mp4" />
        </video>

        {/* 🔥 OVERLAY (for readability) */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.85))',
            zIndex: 1
          }}
        />

        {/* CONTENT */}
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            maxWidth: '900px',
            width: '100%',
            padding: '0 20px',
            textAlign: 'center'
          }}
        >
          

          {/* HEADING */}
          <h1 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(2.4rem, 5vw, 4.5rem)',
            lineHeight: '1.05',
            letterSpacing: '-0.03em',
            fontWeight: 600,
            color: '#fff',
            marginBottom: '16px'
          }}>
            Deploy Your <br />

            <span style={{
              background: 'linear-gradient(135deg, #fff, #bbb)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              {displayText || 'Voice Agents'}
            </span>

            <span style={{
              display: 'inline-block',
              width: '2px',
              height: '1em',
              background: '#fff',
              marginLeft: '4px',
              animation: 'blink 1s infinite'
            }} />

            <br />

            <span style={{
              color: '#9ca3af',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 500
            }}>
              In Minutes
            </span>
          </h1>

          {/* Subtitle */}
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '15px',
            color: '#d1d5db',
            maxWidth: '480px',
            margin: '0 auto 28px',
            lineHeight: '1.6'
          }}>
            AgentsDesk lets you discover, deploy, and scale AI agents instantly —
            from customer support to sales automation.
          </p>

          {/* Buttons */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '12px',
            flexWrap: 'wrap'
          }}>
            <button
              onClick={scrollToAgents}
              style={{
                fontFamily: 'Inter, sans-serif',
                padding: '12px 22px',
                borderRadius: '12px',
                background: '#fff',
                color: '#000',
                fontSize: '13px',
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
            >
              Browse Agents →
            </button>

            <button
              onClick={scrollToHow}
              style={{
                fontFamily: 'Inter, sans-serif',
                padding: '12px 22px',
                borderRadius: '12px',
                border: '1px solid rgba(255,255,255,.2)',
                color: '#fff',
                background: 'transparent',
                fontSize: '13px',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(255,255,255,0.1)';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'transparent';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              ▶ See how it works
            </button>

            {/* Try Hyper Button */}
          <button
  onClick={() => setIsHyperOpen(true)}
  style={{
    fontFamily: 'Inter, sans-serif',
    padding: '12px 22px',
    borderRadius: '12px',
    background: 'linear-gradient(135deg, #00ff9d, #00b8ff)',
    color: '#1e1e2e',
    fontSize: '13px',
    fontWeight: 600,
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'all 0.3s ease'
  }}
  onMouseEnter={(e) => {
    e.target.style.transform = 'translateY(-2px)';
    e.target.style.boxShadow = '0 10px 20px rgba(0, 255, 157, 0.3)';
  }}
  onMouseLeave={(e) => {
    e.target.style.transform = 'translateY(0)';
    e.target.style.boxShadow = 'none';
  }}
>
  <i className="icons8-ai" style={{ fontSize: '18px' }}></i>
  Try Hyper AI →
</button>
          </div>

          {/* Stats */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '30px',
            flexWrap: 'wrap',
            marginTop: '40px',
            paddingTop: '24px',
            borderTop: '1px solid rgba(255,255,255,.1)'
          }}>
            {[
              ['2,400+', 'Agents'],
              ['98%', 'Uptime'],
              ['<200ms', 'Latency'],
              ['150+', 'Integrations']
            ].map(([num, label]) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <div style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '20px',
                  fontWeight: 700,
                  color: '#fff'
                }}>
                  {num}
                </div>
                <div style={{
                  fontSize: '10px',
                  color: '#9ca3af',
                  fontFamily: 'Inter, sans-serif'
                }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hyper AI Chatbot Modal */}
      <HyperChatbot 
        isOpen={isHyperOpen}
        onClose={() => setIsHyperOpen(false)}
      />
    </>
  );
};

export default Hero;
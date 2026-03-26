import React, { useState, useEffect } from 'react';

const Hero = () => {
  const words = ['Voice Agents', 'Calling Agents', 'Restaurant Bots', 'Appointment AI', 'Support Agents', 'Sales Agents'];
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

  return (
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
      {/* Background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage:
          'linear-gradient(rgba(255,255,255,.01) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.01) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />

      <div style={{
        position: 'absolute',
        inset: 0,
        background:
          'radial-gradient(ellipse 60% 60% at 50% 50%, transparent, var(--void) 100%)'
      }} />

      {/* Content */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        maxWidth: '900px',
        width: '100%',
        padding: '0 20px',
        textAlign: 'center'
      }}>

        {/* Badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '5px 14px',
          borderRadius: '100px',
          border: '1px solid rgba(255,255,255,.2)',
          background: 'rgba(255,255,255,.05)',
          marginBottom: '20px'
        }}>
          <span style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: '#fff'
          }} />
          <span style={{
            fontSize: '10px',
            fontFamily: 'Inter, sans-serif',
            color: '#fff',
            letterSpacing: '.12em'
          }}>
            AI AGENT MARKETPLACE
          </span>
        </div>

        {/* 🔥 HEADING (Premium Font Applied) */}
        <h1 style={{
          fontFamily: 'Playfair Display, serif', // ✅ MAIN CHANGE
          fontSize: 'clamp(2.4rem, 5vw, 4.5rem)',
          lineHeight: '1.05',
          letterSpacing: '-0.03em',
          fontWeight: 600,
          color: '#fff',
          marginBottom: '16px'
        }}>
          Deploy Your <br />
          <span className="grad-white">
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
            fontFamily: 'Inter, sans-serif', // mix serif + sans 🔥
            fontWeight: 500
          }}>
            In Minutes
          </span>
        </h1>

        {/* Subtitle */}
        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '15px',
          color: '#9ca3af',
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
              cursor: 'pointer'
            }}
          >
            Browse Agents →
          </button>

          <button
            onClick={scrollToHow}
            style={{
              fontFamily: 'Inter, sans-serif',
              padding: '12px 22px',
              borderRadius: '12px',
              border: '1px solid rgba(255,255,255,.15)',
              color: '#e5e7eb',
              background: 'transparent',
              fontSize: '13px',
              cursor: 'pointer'
            }}
          >
            ▶ See how it works
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
          borderTop: '1px solid rgba(255,255,255,.05)'
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
                color: '#6b7280',
                fontFamily: 'Inter, sans-serif'
              }}>
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
import React, { useState } from 'react';
import { agentsData, categories } from '../data/Data';

const AgentsSection = () => {
  const [activeCat, setActiveCat] = useState('All');
  const filtered =
    activeCat === 'All'
      ? agentsData
      : agentsData.filter((a) => a.cat === activeCat);

  return (
    <section
      id="agents"
      style={{
        padding: '60px 0',
        background: '#ffffff'
      }}
    >
      <div className="inner">

        {/* HEADER */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: '30px',
            flexWrap: 'wrap'
          }}
        >
          <div>
            <div className="section-label">
              <span style={{
                color: '#111827',
                fontFamily: 'Inter, sans-serif',
                fontSize: '12px'
              }}>
                Marketplace
              </span>
            </div>

            {/* 🔥 Premium Heading */}
            <h2
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 'clamp(1.9rem, 3vw, 2.6rem)',
                fontWeight: 600,
                color: '#111827',
                lineHeight: '1.2',
                letterSpacing: '-0.02em'
              }}
            >
              Browse AI <br />
              <span
                style={{
                  background: 'linear-gradient(135deg, #000, #444)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                Agents
              </span>
            </h2>
          </div>

          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '13px',
              color: '#6b7280',
              maxWidth: '260px',
              textAlign: 'right',
              lineHeight: '1.6'
            }}
          >
            Pre-built agents ready to deploy. Customize to fit your workflow in minutes.
          </p>
        </div>

        {/* FILTERS */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
            marginBottom: '28px'
          }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCat(cat)}
              style={{
                padding: '6px 14px',
                borderRadius: '100px',
                fontSize: '11px',
                fontFamily: 'Inter, sans-serif', // ✅ updated
                border: '1px solid #e5e7eb',
                color: activeCat === cat ? '#fff' : '#111827',
                background: activeCat === cat ? '#111827' : '#fff',
                cursor: 'pointer',
                transition: '0.2s'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* GRID */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '18px'
          }}
        >
          {filtered.map((agent) => (
            <div
              key={agent.id}
              style={{
                background: '#0a0a0f',
                borderRadius: '16px',
                padding: '20px',
                border: '1px solid rgba(0,0,0,0.08)',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* TOP */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '14px'
                }}
              >
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px',
                    background: 'rgba(255,255,255,0.08)'
                  }}
                >
                  {agent.icon}
                </div>

                <span style={{
                  fontSize: '10px',
                  color: '#9ca3af',
                  fontFamily: 'Inter, sans-serif'
                }}>
                  {agent.cat}
                </span>
              </div>

              {/* NAME */}
              <div
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '16px',
                  fontWeight: 600,
                  color: '#fff',
                  marginBottom: '6px'
                }}
              >
                {agent.name}
              </div>

              {/* DESC */}
              <div
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '12px',
                  color: '#9ca3af',
                  marginBottom: '12px',
                  lineHeight: '1.5'
                }}
              >
                {agent.desc}
              </div>

              {/* TAGS */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '6px',
                  marginBottom: '14px'
                }}
              >
                {agent.tags.map((t) => (
                  <span
                    key={t}
                    style={{
                      fontSize: '9px',
                      padding: '3px 7px',
                      borderRadius: '20px',
                      background: 'rgba(255,255,255,0.05)',
                      color: '#9ca3af',
                      fontFamily: 'JetBrains Mono'
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* FOOTER */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderTop: '1px solid rgba(255,255,255,0.08)',
                  paddingTop: '10px'
                }}
              >
                <span style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '12px',
                  color: '#fff'
                }}>
                  ⭐ {agent.rating}
                </span>

                <span
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#fff'
                  }}
                >
                  {agent.price}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AgentsSection;
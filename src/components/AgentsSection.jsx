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
        padding: '60px 0', // ✅ reduced from 100px
        background: '#ffffff' // ✅ white smooth background
      }}
    >
      <div className="inner">
        {/* Header */}
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
              <span style={{ color: '#111827' }}>Marketplace</span>
            </div>

            <h2
              style={{
                fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
                fontWeight: 700,
                color: '#111827'
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

        {/* Filters */}
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
                fontFamily: 'JetBrains Mono',
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

        {/* Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', // ✅ responsive
            gap: '18px'
          }}
        >
          {filtered.map((agent) => (
            <div
              key={agent.id}
              style={{
                background: '#0a0a0f', // ✅ black premium card
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
              {/* Top */}
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

                <span style={{ fontSize: '10px', color: '#9ca3af' }}>
                  {agent.cat}
                </span>
              </div>

              {/* Name */}
              <div
                style={{
                  fontSize: '16px',
                  fontWeight: 600,
                  color: '#fff',
                  marginBottom: '6px'
                }}
              >
                {agent.name}
              </div>

              {/* Desc */}
              <div
                style={{
                  fontSize: '12px',
                  color: '#9ca3af',
                  marginBottom: '12px'
                }}
              >
                {agent.desc}
              </div>

              {/* Tags */}
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
                      color: '#9ca3af'
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Footer */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderTop: '1px solid rgba(255,255,255,0.08)',
                  paddingTop: '10px'
                }}
              >
                <span style={{ fontSize: '12px', color: '#fff' }}>
                  ⭐ {agent.rating}
                </span>

                <span
                  style={{
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
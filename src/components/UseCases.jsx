import React, { useState } from 'react';
import { useCasesData } from '../data/Data';

const UseCases = () => {
  const [active, setActive] = useState(useCasesData[0]);

  const scrollToAgents = () => {
    const element = document.getElementById('agents');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="usecases"
      style={{
        padding: '60px 0', // ✅ reduced spacing
        background: '#ffffff' // ✅ white flow
      }}
    >
      <div className="inner">

        {/* HEADER */}
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <span style={{
            fontSize: '11px',
            fontFamily: 'JetBrains Mono',
            color: '#6b7280'
          }}>
            Use Cases
          </span>

          <h2 style={{
            fontSize: 'clamp(1.8rem,3vw,2.5rem)',
            fontWeight: 700,
            color: '#111827',
            marginTop: '10px'
          }}>
            Built for every <br />
            <span style={{
              background: 'linear-gradient(135deg,#000,#444)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              industry
            </span>
          </h2>
        </div>

        {/* TABS */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '8px',
          marginBottom: '36px'
        }}>
          {useCasesData.map(uc => (
            <button
              key={uc.id}
              onClick={() => setActive(uc)}
              style={{
                padding: '8px 16px',
                borderRadius: '10px',
                fontSize: '12px',
                border: '1px solid #e5e7eb',
                background: active.id === uc.id ? '#111827' : '#fff',
                color: active.id === uc.id ? '#fff' : '#111827',
                cursor: 'pointer'
              }}
            >
              {uc.icon} {uc.label}
            </button>
          ))}
        </div>

        {/* MAIN GRID */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '36px',
          alignItems: 'center'
        }}>

          {/* LEFT */}
          <div>
            <h3 style={{
              fontSize: '1.6rem',
              fontWeight: 700,
              color: '#111827',
              marginBottom: '12px'
            }}>
              {active.headline}
            </h3>

            <p style={{
              fontSize: '14px',
              color: '#6b7280',
              lineHeight: '1.6',
              marginBottom: '20px'
            }}>
              {active.desc}
            </p>

            {/* METRICS */}
            <div style={{
              display: 'flex',
              gap: '24px',
              marginBottom: '20px'
            }}>
              {[{ n: active.m1, l: active.ml1 }, { n: active.m2, l: active.ml2 }].map((m, i) => (
                <div key={i}>
                  <div style={{ fontSize: '26px', fontWeight: 700, color: '#111827' }}>
                    {m.n}
                  </div>
                  <div style={{ fontSize: '10px', color: '#6b7280', fontFamily: 'JetBrains Mono' }}>
                    {m.l}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={scrollToAgents}
              style={{
                padding: '10px 20px',
                borderRadius: '10px',
                background: '#111827',
                color: '#fff',
                fontSize: '13px',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Get {active.label} Agent →
            </button>
          </div>

          {/* RIGHT CARD */}
          <div style={{
            background: '#0a0a0f', // ✅ black premium card
            borderRadius: '16px',
            padding: '22px',
            color: '#fff'
          }}>
            <div style={{
              fontSize: '22px',
              marginBottom: '10px'
            }}>
              {active.icon}
            </div>

            <h4 style={{ marginBottom: '12px' }}>
              {active.label} Features
            </h4>

            <ul style={{ marginBottom: '16px' }}>
              {active.feats.map(f => (
                <li key={f} style={{
                  fontSize: '12px',
                  color: '#9ca3af',
                  marginBottom: '8px'
                }}>
                  • {f}
                </li>
              ))}
            </ul>

            {/* CHAT PREVIEW */}
            <div style={{
              background: '#111118',
              padding: '12px',
              borderRadius: '10px',
              fontSize: '11px'
            }}>
              <div style={{ marginBottom: '6px', color: '#9ca3af' }}>
                🤖 {active.label} AI
              </div>

              <div style={{
                background: '#1a1a24',
                padding: '6px 10px',
                borderRadius: '8px',
                marginBottom: '6px'
              }}>
                Hi! How can I help you?
              </div>

              <div style={{
                textAlign: 'right',
                marginBottom: '6px'
              }}>
                <span style={{
                  background: '#333',
                  padding: '6px 10px',
                  borderRadius: '8px'
                }}>
                  Book appointment
                </span>
              </div>

              <div style={{
                background: '#1a1a24',
                padding: '6px 10px',
                borderRadius: '8px'
              }}>
                Sure, done!
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default UseCases;
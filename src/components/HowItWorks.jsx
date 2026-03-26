import React from 'react';
import { stepsData } from '../data/Data';

const HowItWorks = () => {
  return (
    <section
      id="how"
      style={{
        padding: '60px 0', // ✅ reduced spacing
        background: '#ffffff' // ✅ white smooth flow
      }}
    >
      <div className="inner">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '40px', // ✅ reduced gap
            alignItems: 'start'
          }}
        >
          {/* LEFT */}
          <div>
            <div className="section-label">
              <span style={{ color: '#111827' }}>Process</span>
            </div>

            <h2
              style={{
                fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
                fontWeight: 700,
                color: '#111827'
              }}
            >
              How it <br />
              <span
                style={{
                  background: 'linear-gradient(135deg, #000, #444)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                works
              </span>
            </h2>

            <p
              style={{
                fontSize: '14px',
                color: '#6b7280',
                marginTop: '14px',
                maxWidth: '320px',
                lineHeight: '1.6'
              }}
            >
              From zero to deployed AI agent in under 10 minutes. No code, no ML expertise.
            </p>

            {/* TERMINAL */}
            <div
              style={{
                marginTop: '24px',
                background: '#0a0a0f', // ✅ black card
                borderRadius: '12px',
                border: '1px solid rgba(0,0,0,0.1)',
                overflow: 'hidden'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '10px 14px',
                  borderBottom: '1px solid rgba(255,255,255,.08)'
                }}
              >
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ff5f57' }} />
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#febc2e' }} />
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#28c840' }} />
                <span style={{
                  fontSize: '10px',
                  fontFamily: 'JetBrains Mono',
                  color: 'rgba(255,255,255,.3)',
                  marginLeft: '8px'
                }}>
                  agent-deploy
                </span>
              </div>

              <div
                style={{
                  padding: '14px',
                  fontFamily: 'JetBrains Mono',
                  fontSize: '11px',
                  lineHeight: '1.8'
                }}
              >
                <div><span style={{ color: '#fff' }}>$ </span><span style={{ color: '#e5e7eb' }}>deploy agent</span></div>
                <div style={{ color: '#9ca3af' }}>✓ Loading config</div>
                <div style={{ color: '#9ca3af' }}>✓ Connecting APIs</div>
                <div style={{ color: '#9ca3af' }}>✓ Syncing data</div>
                <div style={{ color: '#fff' }}>✓ Agent deployed</div>
                <div style={{ color: '#6b7280', fontSize: '10px' }}>🟢 Live · 180ms</div>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div>
            {stepsData.map((step, i) => (
              <div
                key={step.num}
                style={{
                  display: 'flex',
                  gap: '16px',
                  paddingBottom: '28px'
                }}
              >
                {/* ICON */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '10px',
                      background: '#0a0a0f',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      fontSize: '16px'
                    }}
                  >
                    {step.icon}
                  </div>

                  {i < stepsData.length - 1 && (
                    <div
                      style={{
                        width: '1px',
                        height: '30px',
                        marginTop: '6px',
                        background: '#e5e7eb'
                      }}
                    />
                  )}
                </div>

                {/* TEXT */}
                <div>
                  <div
                    style={{
                      fontSize: '10px',
                      fontFamily: 'JetBrains Mono',
                      color: '#6b7280',
                      marginBottom: '3px'
                    }}
                  >
                    {step.num}
                  </div>

                  <div
                    style={{
                      fontSize: '15px',
                      fontWeight: 600,
                      color: '#111827',
                      marginBottom: '4px'
                    }}
                  >
                    {step.title}
                  </div>

                  <div
                    style={{
                      fontSize: '13px',
                      color: '#6b7280',
                      lineHeight: '1.5'
                    }}
                  >
                    {step.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
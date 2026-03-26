import React, { useState } from 'react';
import { plansData } from '../data/Data';

const Pricing = () => {
  const [annual, setAnnual] = useState(false);

  return (
    <section
      id="pricing"
      style={{
        padding: '60px 0', // ✅ reduced spacing
        background: '#ffffff' // ✅ clean white
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
            Pricing
          </span>

          <h2 style={{
            fontSize: 'clamp(1.8rem,3vw,2.5rem)',
            fontWeight: 700,
            color: '#111827',
            marginTop: '10px'
          }}>
            Simple, <br />
            <span style={{
              background: 'linear-gradient(135deg,#000,#444)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              transparent pricing
            </span>
          </h2>

          <p style={{
            fontSize: '13px',
            color: '#6b7280',
            marginTop: '10px'
          }}>
            Start free, scale as you grow. No hidden fees.
          </p>

          {/* TOGGLE */}
          <div style={{
            display: 'inline-flex',
            marginTop: '20px',
            borderRadius: '10px',
            border: '1px solid #e5e7eb',
            overflow: 'hidden'
          }}>
            <button
              onClick={() => setAnnual(false)}
              style={{
                padding: '8px 18px',
                background: !annual ? '#111827' : '#fff',
                color: !annual ? '#fff' : '#111827',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Monthly
            </button>

            <button
              onClick={() => setAnnual(true)}
              style={{
                padding: '8px 18px',
                background: annual ? '#111827' : '#fff',
                color: annual ? '#fff' : '#111827',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Annual
            </button>
          </div>
        </div>

        {/* PRICING GRID */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '20px'
        }}>
          {plansData.map(plan => (
            <div
              key={plan.name}
              style={{
                background: '#0a0a0f', // ✅ black premium card
                borderRadius: '16px',
                padding: '22px',
                color: '#fff',
                transform: plan.hi ? 'scale(1.03)' : 'none',
                border: plan.hi ? '2px solid #111827' : '1px solid rgba(255,255,255,0.08)'
              }}
            >
              {plan.badge && (
                <div style={{
                  fontSize: '10px',
                  background: '#fff',
                  color: '#000',
                  padding: '4px 10px',
                  borderRadius: '20px',
                  display: 'inline-block',
                  marginBottom: '12px'
                }}>
                  {plan.badge}
                </div>
              )}

              <h3 style={{ fontSize: '18px', marginBottom: '6px' }}>
                {plan.name}
              </h3>

              <p style={{
                fontSize: '12px',
                color: '#9ca3af',
                marginBottom: '16px'
              }}>
                {plan.desc}
              </p>

              {/* PRICE */}
              <div style={{ marginBottom: '16px' }}>
                <span style={{ fontSize: '36px', fontWeight: 700 }}>
                  ${annual ? plan.an : plan.mo}
                </span>
                <span style={{ fontSize: '12px', color: '#9ca3af' }}>
                  /mo
                </span>
              </div>

              <button
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '10px',
                  background: plan.hi ? '#fff' : 'transparent',
                  color: plan.hi ? '#000' : '#fff',
                  border: plan.hi ? 'none' : '1px solid rgba(255,255,255,0.3)',
                  cursor: 'pointer',
                  marginBottom: '18px'
                }}
              >
                {plan.cta}
              </button>

              {/* FEATURES */}
              <ul>
                {plan.feats.map(f => (
                  <li key={f} style={{
                    fontSize: '12px',
                    color: '#9ca3af',
                    marginBottom: '8px'
                  }}>
                    ✓ {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p style={{
          textAlign: 'center',
          fontSize: '11px',
          color: '#6b7280',
          marginTop: '20px'
        }}>
          14-day free trial · No credit card required
        </p>
      </div>
    </section>
  );
};

export default Pricing;
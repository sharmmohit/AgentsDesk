import React from 'react';
import { testimonialsData } from '../data/Data';

const Testimonials = () => {
  return (
    <section id="testimonials" style={{ padding: '80px 0' }}>
      <div className="inner">
        <div style={{ textAlign: 'center', marginBottom: '48px' }} className="reveal">
          <div className="uc-label" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <span style={{ fontSize: '11px', fontFamily: 'JetBrains Mono', color: '#fff' }}>Testimonials</span>
          </div>
          <h2 className="section-title">
            Loved by<br />
            <span className="grad-white">businesses</span>
          </h2>
        </div>

        <div className="testi-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '16px'
        }}>
          {testimonialsData.map(t => (
            <div key={t.name} className="testi-card" style={{
              background: '#111118',
              border: '1px solid rgba(255,255,255,.06)',
              borderRadius: '16px',
              padding: '24px',
              transition: 'transform 0.3s'
            }}>
              <div className="testi-stars" style={{ color: '#fff', fontSize: '12px', marginBottom: '14px' }}>
                {'★'.repeat(t.stars)}
              </div>
              <p className="testi-text" style={{
                fontSize: '13px',
                color: '#9ca3af',
                lineHeight: '1.7',
                marginBottom: '18px',
                fontStyle: 'italic'
              }}>
                {t.text}
              </p>
              <div className="testi-author" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div className="testi-avatar" style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: '#1a1a24',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '15px'
                }}>
                  {t.avatar}
                </div>
                <div>
                  <div className="testi-name" style={{ fontSize: '13px', fontWeight: 600, color: '#fff' }}>
                    {t.name}
                  </div>
                  <div className="testi-role" style={{ fontSize: '10px', color: '#9ca3af', fontFamily: 'JetBrains Mono' }}>
                    {t.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
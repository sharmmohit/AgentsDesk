import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer style={{
      padding: '60px 40px 30px',
      borderTop: '1px solid rgba(255,255,255,.04)',
      background: 'var(--carbon)'
    }}>
      <div className="footer-grid" style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr 1fr 1fr',
        gap: '40px',
        marginBottom: '48px'
      }}>
        {/* Brand Column */}
        <div className="footer-brand">
          <button 
            onClick={scrollToTop}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              textDecoration: 'none',
              marginBottom: '14px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              transition: 'transform 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.02)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          >
            <div className="logo-icon" style={{
              width: '32px',
              height: '32px',
              background: 'linear-gradient(135deg, #fff, #c0c0c0)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '10px',
              fontFamily: 'JetBrains Mono',
              fontWeight: 700,
              color: '#020205'
            }}>
              AD
            </div>
            <span className="logo-name" style={{ 
              fontSize: '17px', 
              fontWeight: 700, 
              color: '#fff' 
            }}>
              Agents<span style={{ color: '#fff' }}>Desk</span>
            </span>
          </button>
          
          <p className="footer-tagline" style={{
            fontSize: '12px',
            color: '#9ca3af',
            maxWidth: '240px',
            marginBottom: '20px',
            lineHeight: '1.6'
          }}>
            The AI Agent Marketplace. Deploy voice, calling, restaurant, and appointment agents in minutes.
          </p>
          
          <div className="social-row" style={{ display: 'flex', gap: '12px' }}>
            <a 
              href="#" 
              className="social-btn"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                border: '1px solid rgba(255,255,255,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '16px',
                cursor: 'pointer',
                transition: 'all 0.3s',
                textDecoration: 'none',
                color: '#9ca3af'
              }}
              onMouseEnter={(e) => {
                e.target.style.borderColor = '#fff';
                e.target.style.color = '#fff';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.borderColor = 'rgba(255,255,255,0.1)';
                e.target.style.color = '#9ca3af';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              𝕏
            </a>
            <a 
              href="#" 
              className="social-btn"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                border: '1px solid rgba(255,255,255,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '16px',
                cursor: 'pointer',
                transition: 'all 0.3s',
                textDecoration: 'none',
                color: '#9ca3af'
              }}
              onMouseEnter={(e) => {
                e.target.style.borderColor = '#fff';
                e.target.style.color = '#fff';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.borderColor = 'rgba(255,255,255,0.1)';
                e.target.style.color = '#9ca3af';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              in
            </a>
            <a 
              href="#" 
              className="social-btn"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                border: '1px solid rgba(255,255,255,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '16px',
                cursor: 'pointer',
                transition: 'all 0.3s',
                textDecoration: 'none',
                color: '#9ca3af'
              }}
              onMouseEnter={(e) => {
                e.target.style.borderColor = '#fff';
                e.target.style.color = '#fff';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.borderColor = 'rgba(255,255,255,0.1)';
                e.target.style.color = '#9ca3af';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              gh
            </a>
            <a 
              href="#" 
              className="social-btn"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                border: '1px solid rgba(255,255,255,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '16px',
                cursor: 'pointer',
                transition: 'all 0.3s',
                textDecoration: 'none',
                color: '#9ca3af'
              }}
              onMouseEnter={(e) => {
                e.target.style.borderColor = '#fff';
                e.target.style.color = '#fff';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.borderColor = 'rgba(255,255,255,0.1)';
                e.target.style.color = '#9ca3af';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              ▶
            </a>
          </div>
        </div>

        {/* Product Column */}
        <div>
          <div className="footer-col-title" style={{
            fontSize: '12px',
            fontWeight: 600,
            color: '#fff',
            marginBottom: '16px',
            textTransform: 'uppercase',
            letterSpacing: '.08em',
            fontFamily: 'JetBrains Mono'
          }}>
            Product
          </div>
          <ul className="footer-links" style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ marginBottom: '10px' }}>
              <button 
                onClick={() => scrollToSection('agents')}
                style={{
                  fontSize: '12px',
                  color: '#9ca3af',
                  textDecoration: 'none',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'color 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.color = '#fff'}
                onMouseLeave={(e) => e.target.style.color = '#9ca3af'}
              >
                Marketplace
              </button>
            </li>
            <li style={{ marginBottom: '10px' }}>
              <button 
                onClick={() => scrollToSection('pricing')}
                style={{
                  fontSize: '12px',
                  color: '#9ca3af',
                  textDecoration: 'none',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'color 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.color = '#fff'}
                onMouseLeave={(e) => e.target.style.color = '#9ca3af'}
              >
                Pricing
              </button>
            </li>
            <li style={{ marginBottom: '10px' }}>
              <a 
                href="#" 
                style={{
                  fontSize: '12px',
                  color: '#9ca3af',
                  textDecoration: 'none',
                  transition: 'color 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.color = '#fff'}
                onMouseLeave={(e) => e.target.style.color = '#9ca3af'}
              >
                Integrations
              </a>
            </li>
            <li style={{ marginBottom: '10px' }}>
              <a 
                href="#" 
                style={{
                  fontSize: '12px',
                  color: '#9ca3af',
                  textDecoration: 'none',
                  transition: 'color 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.color = '#fff'}
                onMouseLeave={(e) => e.target.style.color = '#9ca3af'}
              >
                Changelog
              </a>
            </li>
            <li style={{ marginBottom: '10px' }}>
              <a 
                href="#" 
                style={{
                  fontSize: '12px',
                  color: '#9ca3af',
                  textDecoration: 'none',
                  transition: 'color 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.color = '#fff'}
                onMouseLeave={(e) => e.target.style.color = '#9ca3af'}
              >
                API Docs
              </a>
            </li>
          </ul>
        </div>

        {/* Company Column */}
        <div>
          <div className="footer-col-title" style={{
            fontSize: '12px',
            fontWeight: 600,
            color: '#fff',
            marginBottom: '16px',
            textTransform: 'uppercase',
            letterSpacing: '.08em',
            fontFamily: 'JetBrains Mono'
          }}>
            Company
          </div>
          <ul className="footer-links" style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ marginBottom: '10px' }}>
              <a 
                href="#" 
                style={{
                  fontSize: '12px',
                  color: '#9ca3af',
                  textDecoration: 'none',
                  transition: 'color 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.color = '#fff'}
                onMouseLeave={(e) => e.target.style.color = '#9ca3af'}
              >
                About Us
              </a>
            </li>
            <li style={{ marginBottom: '10px' }}>
              <a 
                href="#" 
                style={{
                  fontSize: '12px',
                  color: '#9ca3af',
                  textDecoration: 'none',
                  transition: 'color 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.color = '#fff'}
                onMouseLeave={(e) => e.target.style.color = '#9ca3af'}
              >
                Blog
              </a>
            </li>
            <li style={{ marginBottom: '10px' }}>
              <a 
                href="#" 
                style={{
                  fontSize: '12px',
                  color: '#9ca3af',
                  textDecoration: 'none',
                  transition: 'color 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.color = '#fff'}
                onMouseLeave={(e) => e.target.style.color = '#9ca3af'}
              >
                Careers
                <span style={{
                  marginLeft: '8px',
                  fontSize: '9px',
                  background: '#fff',
                  color: '#020205',
                  padding: '2px 6px',
                  borderRadius: '20px',
                  fontWeight: 500
                }}>
                  We're hiring!
                </span>
              </a>
            </li>
            <li style={{ marginBottom: '10px' }}>
              <a 
                href="#" 
                style={{
                  fontSize: '12px',
                  color: '#9ca3af',
                  textDecoration: 'none',
                  transition: 'color 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.color = '#fff'}
                onMouseLeave={(e) => e.target.style.color = '#9ca3af'}
              >
                Press Kit
              </a>
            </li>
            <li style={{ marginBottom: '10px' }}>
              <a 
                href="#" 
                style={{
                  fontSize: '12px',
                  color: '#9ca3af',
                  textDecoration: 'none',
                  transition: 'color 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.color = '#fff'}
                onMouseLeave={(e) => e.target.style.color = '#9ca3af'}
              >
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Resources/Legal Column */}
        <div>
          <div className="footer-col-title" style={{
            fontSize: '12px',
            fontWeight: 600,
            color: '#fff',
            marginBottom: '16px',
            textTransform: 'uppercase',
            letterSpacing: '.08em',
            fontFamily: 'JetBrains Mono'
          }}>
            Resources
          </div>
          <ul className="footer-links" style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ marginBottom: '10px' }}>
              <a 
                href="#" 
                style={{
                  fontSize: '12px',
                  color: '#9ca3af',
                  textDecoration: 'none',
                  transition: 'color 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.color = '#fff'}
                onMouseLeave={(e) => e.target.style.color = '#9ca3af'}
              >
                Documentation
              </a>
            </li>
            <li style={{ marginBottom: '10px' }}>
              <a 
                href="#" 
                style={{
                  fontSize: '12px',
                  color: '#9ca3af',
                  textDecoration: 'none',
                  transition: 'color 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.color = '#fff'}
                onMouseLeave={(e) => e.target.style.color = '#9ca3af'}
              >
                Tutorials
              </a>
            </li>
            <li style={{ marginBottom: '10px' }}>
              <a 
                href="#" 
                style={{
                  fontSize: '12px',
                  color: '#9ca3af',
                  textDecoration: 'none',
                  transition: 'color 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.color = '#fff'}
                onMouseLeave={(e) => e.target.style.color = '#9ca3af'}
              >
                Support
              </a>
            </li>
            <li style={{ marginBottom: '10px' }}>
              <a 
                href="#" 
                style={{
                  fontSize: '12px',
                  color: '#9ca3af',
                  textDecoration: 'none',
                  transition: 'color 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.color = '#fff'}
                onMouseLeave={(e) => e.target.style.color = '#9ca3af'}
              >
                Privacy Policy
              </a>
            </li>
            <li style={{ marginBottom: '10px' }}>
              <a 
                href="#" 
                style={{
                  fontSize: '12px',
                  color: '#9ca3af',
                  textDecoration: 'none',
                  transition: 'color 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.color = '#fff'}
                onMouseLeave={(e) => e.target.style.color = '#9ca3af'}
              >
                Terms of Service
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: '28px',
        borderTop: '1px solid rgba(255,255,255,.04)',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <span className="footer-copy" style={{
          fontSize: '11px',
          color: '#6b7280',
          fontFamily: 'JetBrains Mono'
        }}>
          © {currentYear} AgentsDesk, Inc. All rights reserved.
        </span>
        
        <div className="footer-status" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '11px',
          fontFamily: 'JetBrains Mono',
          color: '#9ca3af'
        }}>
          <span className="status-dot" style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: '#22c55e',
            animation: 'pulse 2s ease-in-out infinite',
            display: 'inline-block'
          }}></span>
          <span>All systems operational</span>
          <span style={{ color: '#6b7280', marginLeft: '4px' }}>•</span>
          <span>99.9% uptime</span>
        </div>
      </div>

      {/* Newsletter Signup (Optional) */}
      <div style={{
        marginTop: '32px',
        paddingTop: '32px',
        borderTop: '1px solid rgba(255,255,255,.04)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <div>
          <h4 style={{
            fontSize: '13px',
            fontWeight: 600,
            color: '#fff',
            marginBottom: '4px'
          }}>
            Stay updated on new agents
          </h4>
          <p style={{
            fontSize: '11px',
            color: '#6b7280'
          }}>
            Get the latest AI agents and features delivered to your inbox.
          </p>
        </div>
        <div style={{
          display: 'flex',
          gap: '10px'
        }}>
          <input
            type="email"
            placeholder="Enter your email"
            style={{
              padding: '10px 14px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '10px',
              color: '#fff',
              fontSize: '12px',
              fontFamily: 'Syne',
              outline: 'none',
              transition: 'all 0.2s',
              width: '240px'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#fff';
              e.target.style.background = 'rgba(255, 255, 255, 0.08)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
              e.target.style.background = 'rgba(255, 255, 255, 0.05)';
            }}
          />
          <button
            style={{
              padding: '10px 20px',
              background: '#fff',
              color: '#020205',
              border: 'none',
              borderRadius: '10px',
              fontSize: '12px',
              fontWeight: 600,
              fontFamily: 'Syne',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => {
              e.target.style.boxShadow = '0 0 20px rgba(255,255,255,0.3)';
              e.target.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.boxShadow = 'none';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            Subscribe
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
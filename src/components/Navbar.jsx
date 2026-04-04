import React, { useState, useRef, useEffect } from 'react';
import AuthModal from './AuthModal';
import logo from '../assets/logo.png';

const industries = [
  { label: 'Debt Collection', desc: 'Collections and support at scale' },
  { label: 'Healthcare', desc: 'HIPAA-compliant agents for hospitals' },
  { label: 'Real Estate', desc: 'Never miss a lead again' },
  { label: 'Small Business', desc: 'Handle every call, automatically' },
  { label: 'E-Commerce', desc: 'Always-on voice support for customers' },
  { label: 'Banking', desc: 'KYC, fraud detection & support bots' },
  { label: 'Restaurant', desc: 'Orders, reservations & menu Q&A' },
  { label: 'Appointments', desc: 'Smart booking & reminder agents' },
];

const Navbar = ({ user, onOpenAuth, onLogout }) => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [menuOpen, setMenuOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [hoveredIndustry, setHoveredIndustry] = useState(null);
  const megaRef = useRef(null);
  const agentsBtnRef = useRef(null);

  console.log('🔷 Navbar rendering - user:', user ? user.email : 'No user');

  // Close mega menu on outside click
  useEffect(() => {
    const handler = (e) => {
      if (
        megaRef.current &&
        !megaRef.current.contains(e.target) &&
        agentsBtnRef.current &&
        !agentsBtnRef.current.contains(e.target)
      ) {
        setMegaOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMenuOpen(false);
      setMegaOpen(false);
    }
  };

  const openAuthModal = (mode) => {
    if (onOpenAuth) {
      onOpenAuth(mode);
    } else {
      setAuthMode(mode);
      setIsAuthOpen(true);
    }
    setMenuOpen(false);
    setMegaOpen(false);
  };

  const handleLogout = () => {
    console.log('🚪 Logout clicked');
    if (onLogout) onLogout();
    setMenuOpen(false);
  };

  const handleAuthSuccess = (userData) => {
    console.log('✅ Auth success in Navbar, dispatching event');
    window.dispatchEvent(new CustomEvent('userLogin', { detail: userData }));
    setIsAuthOpen(false);
  };

  return (
    <>
      <nav style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 500,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 20px',
        height: '68px',
        background: 'rgba(2,2,5,.88)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,.04)'
      }}>

        {/* LOGO + WORDMARK */}
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <img
            src={logo}
            alt="agentsdesk logo"
            style={{
              height: '32px',
              width: '32px',
              objectFit: 'contain',
              borderRadius: '7px',
            }}
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          <span style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: '22px',
            fontWeight: 600,
            letterSpacing: '-0.02em',
            color: '#fff'
          }}>
            agentsdesk
          </span>
        </a>

        {/* DESKTOP LINKS */}
        <div className="nav-links" style={{ display: 'flex', gap: '28px', alignItems: 'center' }}>
          {/* AGENTS with mega menu trigger */}
          <div style={{ position: 'relative' }}>
            <button
              ref={agentsBtnRef}
              onClick={() => setMegaOpen((prev) => !prev)}
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '13px',
                color: megaOpen ? '#fff' : '#9ca3af',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                transition: 'color 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
              onMouseLeave={(e) => { if (!megaOpen) e.currentTarget.style.color = '#9ca3af'; }}
            >
              Agents
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                style={{
                  transform: megaOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.25s',
                  marginTop: '1px',
                }}
              >
                <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* OTHER NAV LINKS */}
          {['how', 'pricing', 'usecases'].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item)}
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '13px',
                color: '#9ca3af',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                transition: 'color 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.color = '#fff'}
              onMouseLeave={(e) => e.target.style.color = '#9ca3af'}
            >
              {item === 'how' ? 'How it works' : item === 'usecases' ? 'Use Cases' : item.charAt(0).toUpperCase() + item.slice(1)}
            </button>
          ))}
        </div>

        {/* RIGHT CTA DESKTOP */}
        <div className="nav-cta" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {user ? (
            <>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '6px 12px',
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '30px',
                border: '1px solid rgba(255,255,255,0.1)'
              }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #fff, #aaa)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#020205',
                  overflow: 'hidden'
                }}>
                  {user.avatar && user.avatar !== '👤' && user.avatar.startsWith('http') ? (
                    <img src={user.avatar} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    user.name?.charAt(0).toUpperCase() || 'U'
                  )}
                </div>
                <span style={{
                  fontSize: '13px',
                  color: '#fff',
                  fontWeight: 500,
                  fontFamily: 'Inter, sans-serif'
                }}>
                  {user.name?.split(' ')[0] || user.email?.split('@')[0]}
                </span>
              </div>

              <button
                onClick={handleLogout}
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '13px',
                  color: '#9ca3af',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '8px 16px',
                  transition: 'all 0.2s',
                  borderRadius: '8px'
                }}
                onMouseEnter={(e) => { e.target.style.color = '#fff'; e.target.style.background = 'rgba(255,255,255,0.1)'; }}
                onMouseLeave={(e) => { e.target.style.color = '#9ca3af'; e.target.style.background = 'transparent'; }}
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => openAuthModal('login')}
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '13px',
                  color: '#9ca3af',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'color 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.color = '#fff'}
                onMouseLeave={(e) => e.target.style.color = '#9ca3af'}
              >
                Sign in
              </button>

              <button
                onClick={() => openAuthModal('signup')}
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#020205',
                  background: '#fff',
                  border: 'none',
                  padding: '10px 18px',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => { e.target.style.boxShadow = '0 0 20px rgba(255,255,255,0.3)'; e.target.style.transform = 'translateY(-1px)'; }}
                onMouseLeave={(e) => { e.target.style.boxShadow = 'none'; e.target.style.transform = 'translateY(0)'; }}
              >
                Get Started
              </button>
            </>
          )}
        </div>

        {/* MOBILE HAMBURGER / CLOSE */}
        <div
          onClick={() => setMenuOpen(!menuOpen)}
          className="hamburger"
          style={{
            display: 'none',
            width: '36px',
            height: '36px',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            position: 'relative',
          }}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          {/* Line 1 */}
          <span style={{
            position: 'absolute',
            width: '22px',
            height: '2px',
            background: '#fff',
            borderRadius: '2px',
            transition: 'transform 0.3s ease, opacity 0.3s ease',
            transform: menuOpen
              ? 'translateY(0) rotate(45deg)'
              : 'translateY(-6px) rotate(0deg)',
          }} />
          {/* Line 2 */}
          <span style={{
            position: 'absolute',
            width: '22px',
            height: '2px',
            background: '#fff',
            borderRadius: '2px',
            transition: 'opacity 0.2s ease',
            opacity: menuOpen ? 0 : 1,
          }} />
          {/* Line 3 */}
          <span style={{
            position: 'absolute',
            width: '22px',
            height: '2px',
            background: '#fff',
            borderRadius: '2px',
            transition: 'transform 0.3s ease, opacity 0.3s ease',
            transform: menuOpen
              ? 'translateY(0) rotate(-45deg)'
              : 'translateY(6px) rotate(0deg)',
          }} />
        </div>
      </nav>

      {/* ── MEGA MENU ─────────────────────────────────────────── */}
      <div
        ref={megaRef}
        style={{
          position: 'fixed',
          top: '68px',
          left: 0,
          right: 0,
          zIndex: 490,
          background: 'rgba(6,6,14,0.97)',
          backdropFilter: 'blur(28px)',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
          overflow: 'hidden',
          maxHeight: megaOpen ? '480px' : '0',
          opacity: megaOpen ? 1 : 0,
          transition: 'max-height 0.38s cubic-bezier(0.4,0,0.2,1), opacity 0.28s ease',
          pointerEvents: megaOpen ? 'auto' : 'none',
        }}
      >
        <div style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '20px 40px 24px',
        }}>
          {/* Header row */}
          <div style={{ marginBottom: '12px' }}>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.12em',
              color: '#6b7280',
              textTransform: 'uppercase',
              margin: 0,
            }}>
              Industries powered by AI Agents
            </p>
          </div>

          {/* Vertical list — two columns */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            columnGap: '48px',
            rowGap: '0px',
          }}>
            {industries.map((ind) => (
              <button
                key={ind.label}
                onClick={() => { scrollToSection('agents'); }}
                onMouseEnter={() => setHoveredIndustry(ind.label)}
                onMouseLeave={() => setHoveredIndustry(null)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  padding: '12px 10px',
                  borderRadius: '6px',
                  background: hoveredIndustry === ind.label
                    ? 'rgba(255,255,255,0.04)'
                    : 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'background 0.15s ease',
                  width: '100%',
                }}
              >
                <span style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '13.5px',
                  fontWeight: 600,
                  color: hoveredIndustry === ind.label ? '#fff' : '#e5e7eb',
                  marginBottom: '3px',
                  transition: 'color 0.15s',
                }}>
                  {ind.label}
                </span>
                <span style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '12px',
                  color: '#6b7280',
                  lineHeight: 1.4,
                }}>
                  {ind.desc}
                </span>
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* MEGA MENU BACKDROP */}
      {megaOpen && (
        <div
          onClick={() => setMegaOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            top: '68px',
            zIndex: 480,
            background: 'transparent',
          }}
        />
      )}

      {/* ── MOBILE MENU ───────────────────────────────────────── */}
      <div style={{
        position: 'fixed',
        top: '68px', left: 0, right: 0,
        background: 'rgba(2,2,5,.97)',
        backdropFilter: 'blur(20px)',
        padding: menuOpen ? '24px' : '0 24px',
        display: 'flex',
        flexDirection: 'column',
        gap: menuOpen ? '4px' : '0',
        zIndex: 400,
        borderBottom: menuOpen ? '1px solid rgba(255,255,255,.1)' : 'none',
        maxHeight: menuOpen ? '600px' : '0',
        opacity: menuOpen ? 1 : 0,
        overflow: 'hidden',
        transition: 'max-height 0.38s cubic-bezier(0.4,0,0.2,1), opacity 0.25s ease, padding 0.3s ease',
        pointerEvents: menuOpen ? 'auto' : 'none',
      }}>
        {/* Agents with sub-items in mobile */}
        <div>
          <button
            onClick={() => scrollToSection('agents')}
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '16px',
              color: '#fff',
              background: 'none',
              border: 'none',
              textAlign: 'left',
              padding: '10px 0',
              cursor: 'pointer',
              width: '100%',
            }}
          >
            Agents
          </button>

          {/* Mobile industry pills */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
            padding: '4px 0 12px 0',
          }}>
            {industries.map((ind) => (
              <button
                key={ind.label}
                onClick={() => scrollToSection('agents')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 12px',
                  borderRadius: '20px',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: '#d1d5db',
                  fontSize: '12px',
                  fontFamily: 'Inter, sans-serif',
                  cursor: 'pointer',
                }}
              >
                <span>{ind.label}</span>
              </button>
            ))}
          </div>
        </div>

        {['how', 'pricing', 'usecases'].map((item) => (
          <button
            key={item}
            onClick={() => scrollToSection(item)}
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '16px',
              color: '#fff',
              background: 'none',
              border: 'none',
              textAlign: 'left',
              padding: '10px 0',
              cursor: 'pointer'
            }}
          >
            {item === 'how' ? 'How it works' : item === 'usecases' ? 'Use Cases' : item.charAt(0).toUpperCase() + item.slice(1)}
          </button>
        ))}

        <hr style={{ borderColor: 'rgba(255,255,255,.1)', margin: '8px 0' }} />

        {user ? (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 0' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #fff, #aaa)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '16px',
                fontWeight: 600,
                color: '#020205',
                overflow: 'hidden'
              }}>
                {user.avatar && user.avatar !== '👤' && user.avatar.startsWith('http') ? (
                  <img src={user.avatar} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  user.name?.charAt(0).toUpperCase() || 'U'
                )}
              </div>
              <span style={{ fontSize: '14px', color: '#fff', fontWeight: 500 }}>
                {user.name || user.email?.split('@')[0]}
              </span>
            </div>

            <button
              onClick={handleLogout}
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '14px',
                padding: '10px',
                borderRadius: '10px',
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#fff',
                cursor: 'pointer'
              }}
            >
              Sign out
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => openAuthModal('login')}
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '14px',
                background: 'none',
                border: 'none',
                color: '#9ca3af',
                textAlign: 'left',
                padding: '8px 0',
                cursor: 'pointer'
              }}
            >
              Sign in
            </button>

            <button
              onClick={() => openAuthModal('signup')}
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '14px',
                fontWeight: 600,
                padding: '10px',
                borderRadius: '10px',
                background: '#fff',
                border: 'none',
                color: '#000',
                cursor: 'pointer'
              }}
            >
              Get Started
            </button>
          </>
        )}
      </div>

      {/* FALLBACK LOCAL AUTH MODAL */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLogin={handleAuthSuccess}
        initialMode={authMode}
      />

      <style>{`
        @media (max-width: 768px) {
          .nav-links, .nav-cta { display: none !important; }
          .hamburger { display: flex !important; }
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </>
  );
};

export default Navbar;
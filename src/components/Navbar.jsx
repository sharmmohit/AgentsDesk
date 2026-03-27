import React, { useState } from 'react';
import AuthModal from './AuthModal';

const Navbar = () => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [menuOpen, setMenuOpen] = useState(false); // ✅ mobile menu

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMenuOpen(false); // close menu on click
    }
  };

  const openAuthModal = (mode) => {
    setAuthMode(mode);
    setIsAuthOpen(true);
    setMenuOpen(false);
  };

  return (
    <>
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
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

        {/* LOGO */}
        <a href="#" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          textDecoration: 'none'
        }}>
         
           
            
        

          {/* 🔥 Premium Logo Font */}
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
        <div className="nav-links" style={{
          display: 'flex',
          gap: '28px'
        }}>

          {['agents', 'how', 'pricing', 'usecases'].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item)}
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '13px',
                color: '#9ca3af',
                background: 'none',
                border: 'none',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => e.target.style.color = '#fff'}
              onMouseLeave={(e) => e.target.style.color = '#9ca3af'}
            >
              {item === 'how'
                ? 'How it works'
                : item === 'usecases'
                ? 'Use Cases'
                : item.charAt(0).toUpperCase() + item.slice(1)}
            </button>
          ))}
        </div>

        {/* RIGHT CTA (DESKTOP) */}
        <div className="nav-cta" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <button
            onClick={() => openAuthModal('login')}
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '13px',
              color: '#9ca3af',
              background: 'none',
              border: 'none',
              cursor: 'pointer'
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
              cursor: 'pointer'
            }}
          >
            Get Started
          </button>
        </div>

        {/* MOBILE MENU BUTTON */}
        <div
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: 'none',
            flexDirection: 'column',
            gap: '4px',
            cursor: 'pointer'
          }}
          className="hamburger"
        >
          <span style={{ width: '20px', height: '2px', background: '#fff' }}></span>
          <span style={{ width: '20px', height: '2px', background: '#fff' }}></span>
          <span style={{ width: '20px', height: '2px', background: '#fff' }}></span>
        </div>
      </nav>

      {/* ✅ MOBILE MENU */}
      {menuOpen && (
        <div style={{
          position: 'fixed',
          top: '68px',
          left: 0,
          right: 0,
          background: '#020205',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          zIndex: 400
        }}>
          {['agents', 'how', 'pricing', 'usecases'].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item)}
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '14px',
                color: '#fff',
                background: 'none',
                border: 'none',
                textAlign: 'left'
              }}
            >
              {item === 'how'
                ? 'How it works'
                : item === 'usecases'
                ? 'Use Cases'
                : item.charAt(0).toUpperCase() + item.slice(1)}
            </button>
          ))}

          <hr style={{ borderColor: 'rgba(255,255,255,.1)' }} />

          <button onClick={() => openAuthModal('login')} style={{
            fontFamily: 'Inter, sans-serif',
            background: 'none',
            border: 'none',
            color: '#9ca3af',
            textAlign: 'left'
          }}>
            Sign in
          </button>

          <button onClick={() => openAuthModal('signup')} style={{
            fontFamily: 'Inter, sans-serif',
            padding: '10px',
            borderRadius: '10px',
            background: '#fff',
            border: 'none',
            color: '#000'
          }}>
            Get Started
          </button>
        </div>
      )}

      {/* AUTH MODAL */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        initialMode={authMode}
      />

      {/* ✅ RESPONSIVE CSS */}
      <style>
        {`
        @media (max-width: 768px) {
          .nav-links, .nav-cta {
            display: none !important;
          }
          .hamburger {
            display: flex !important;
          }
        }
        `}
      </style>
    </>
  );
};

export default Navbar;
import React, { useState } from 'react';
import AuthModal from './AuthModal';

const Navbar = () => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openAuthModal = (mode) => {
    setAuthMode(mode);
    setIsAuthOpen(true);
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
        padding: '0 40px',
        height: '68px',
        background: 'rgba(2,2,5,.88)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,.04)'
      }}>
        <a href="#" className="nav-logo" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          textDecoration: 'none'
        }}>
          <div style={{
            width: '34px',
            height: '34px',
            background: 'linear-gradient(135deg, #fff, #aaa)',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'JetBrains Mono',
            fontSize: '11px',
            fontWeight: 700,
            color: '#020205'
          }}>AD</div>
          <span style={{ fontSize: '18px', fontWeight: 700, color: '#fff' }}>
            Agents<span style={{ color: '#fff' }}>Desk</span>
          </span>
        </a>

        <div className="nav-links" style={{ display: 'flex', gap: '32px' }}>
          <button onClick={() => scrollToSection('agents')} style={{
            fontSize: '13px',
            color: '#9ca3af',
            textDecoration: 'none',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            transition: 'color 0.2s'
          }}
          onMouseEnter={(e) => e.target.style.color = '#fff'}
          onMouseLeave={(e) => e.target.style.color = '#9ca3af'}>
            Agents
          </button>
          <button onClick={() => scrollToSection('how')} style={{
            fontSize: '13px',
            color: '#9ca3af',
            textDecoration: 'none',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            transition: 'color 0.2s'
          }}
          onMouseEnter={(e) => e.target.style.color = '#fff'}
          onMouseLeave={(e) => e.target.style.color = '#9ca3af'}>
            How it works
          </button>
          <button onClick={() => scrollToSection('pricing')} style={{
            fontSize: '13px',
            color: '#9ca3af',
            textDecoration: 'none',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            transition: 'color 0.2s'
          }}
          onMouseEnter={(e) => e.target.style.color = '#fff'}
          onMouseLeave={(e) => e.target.style.color = '#9ca3af'}>
            Pricing
          </button>
          <button onClick={() => scrollToSection('usecases')} style={{
            fontSize: '13px',
            color: '#9ca3af',
            textDecoration: 'none',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            transition: 'color 0.2s'
          }}
          onMouseEnter={(e) => e.target.style.color = '#fff'}
          onMouseLeave={(e) => e.target.style.color = '#9ca3af'}>
            Use Cases
          </button>
        </div>

        <div className="nav-cta" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button 
            onClick={() => openAuthModal('login')}
            className="btn-ghost"
            style={{
              fontSize: '13px',
              color: '#9ca3af',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px 16px',
              transition: 'color 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.color = '#fff'}
            onMouseLeave={(e) => e.target.style.color = '#9ca3af'}>
            Sign in
          </button>
          <button 
            onClick={() => openAuthModal('signup')}
            className="btn-primary"
            style={{
              fontSize: '13px',
              fontWeight: 600,
              fontFamily: 'Syne',
              color: '#020205',
              background: '#fff',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '10px',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => {
              e.target.style.boxShadow = '0 0 28px rgba(255,255,255,0.6)';
              e.target.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.boxShadow = 'none';
              e.target.style.transform = 'translateY(0)';
            }}>
            Get Started Free
          </button>
        </div>
      </nav>

      <AuthModal 
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        initialMode={authMode}
      />
    </>
  );
};

export default Navbar;
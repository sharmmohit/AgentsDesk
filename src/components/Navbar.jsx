import React, { useState } from 'react';
import AuthModal from './AuthModal';

const Navbar = ({ user, onOpenAuth, onLogout }) => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [menuOpen, setMenuOpen] = useState(false);

  console.log('🔷 Navbar rendering - user:', user ? user.email : 'No user');

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMenuOpen(false);
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

        {/* LOGO */}
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
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
        <div className="nav-links" style={{ display: 'flex', gap: '28px' }}>
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

        {/* MOBILE HAMBURGER */}
        <div
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ display: 'none', flexDirection: 'column', gap: '4px', cursor: 'pointer' }}
          className="hamburger"
        >
          <span style={{ width: '20px', height: '2px', background: '#fff', transition: '0.3s' }}></span>
          <span style={{ width: '20px', height: '2px', background: '#fff', transition: '0.3s' }}></span>
          <span style={{ width: '20px', height: '2px', background: '#fff', transition: '0.3s' }}></span>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div style={{
          position: 'fixed',
          top: '68px', left: 0, right: 0,
          background: 'rgba(2,2,5,.95)',
          backdropFilter: 'blur(20px)',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          zIndex: 400,
          borderBottom: '1px solid rgba(255,255,255,.1)'
        }}>
          {['agents', 'how', 'pricing', 'usecases'].map((item) => (
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
                padding: '8px 0',
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
      )}

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
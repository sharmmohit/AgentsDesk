import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const AuthModal = ({ isOpen, onClose, onLogin, initialMode = 'login' }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleGoogleAuth = () => {
    setLoading(true);
    setError('');
    const backendUrl = API_URL.replace('/api', '');
    window.location.href = `${backendUrl}/api/auth/google`;
  };

  return createPortal(
    <div 
      className="auth-overlay"
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(8px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        overflowY: 'auto'
      }}
    >
      <div 
        className="auth-modal"
        onClick={(e) => e.stopPropagation()}
        style={{
          display: 'flex',
          maxWidth: '1000px',
          width: '100%',
          background: '#ffffff',
          borderRadius: '32px',
          overflow: 'hidden',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          position: 'relative'
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: '#f3f4f6',
            border: 'none',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#6b7280',
            fontSize: '18px',
            zIndex: 10,
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = '#e5e7eb';
            e.target.style.color = '#374151';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = '#f3f4f6';
            e.target.style.color = '#6b7280';
          }}
        >
          ✕
        </button>

        {/* Left Side - Image */}
        <div style={{
          flex: 1,
          background: '#f8fafc',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Decorative background circles */}
          <div style={{
            position: 'absolute',
            top: '-20%',
            right: '-20%',
            width: '250px',
            height: '250px',
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, transparent 70%)',
            borderRadius: '50%'
          }} />
          <div style={{
            position: 'absolute',
            bottom: '-20%',
            left: '-20%',
            width: '200px',
            height: '200px',
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.06) 0%, transparent 70%)',
            borderRadius: '50%'
          }} />
          
          {/* Image */}
          <img 
            src="/images/image.jpg"
            alt="Team collaborating on AI"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              position: 'absolute',
              top: 0,
              left: 0
            }}
          />
        </div>

        {/* Right Side - Form */}
        <div style={{
          flex: 1,
          padding: '48px',
          background: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          <div style={{ marginBottom: '32px', textAlign: 'center' }}>
            <h3 style={{
              fontSize: '28px',
              fontWeight: 600,
              color: '#111827',
              marginBottom: '12px',
              fontFamily: 'Syne, sans-serif',
              letterSpacing: '-0.01em'
            }}>
              Welcome back
            </h3>
            <p style={{
              fontSize: '15px',
              color: '#6b7280',
              lineHeight: '1.5'
            }}>
              Sign in to continue to AgentsDesk
            </p>
          </div>

          {error && (
            <div style={{
              background: '#fef2f2',
              border: '1px solid #fecaca',
              borderRadius: '12px',
              padding: '12px',
              marginBottom: '24px',
              color: '#dc2626',
              fontSize: '13px',
              textAlign: 'center'
            }}>
              {error}
            </div>
          )}

          {/* Google Sign In Button - Colorful */}
          <button
            onClick={handleGoogleAuth}
            disabled={loading}
            style={{
              width: '100%',
              padding: '14px 20px',
              borderRadius: '12px',
              background: '#fff',
              border: '1px solid #e5e7eb',
              color: '#374151',
              fontSize: '15px',
              fontWeight: 500,
              cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              transition: 'all 0.2s',
              fontFamily: 'Inter, sans-serif',
              opacity: loading ? 0.6 : 1,
              boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.target.style.background = '#f9fafb';
                e.target.style.borderColor = '#d1d5db';
                e.target.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.target.style.background = '#fff';
                e.target.style.borderColor = '#e5e7eb';
                e.target.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.05)';
              }
            }}
          >
            {/* Official Google Color Icon */}
            <svg width="22" height="22" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            {loading ? 'Connecting...' : 'Continue with Google'}
          </button>

          {/* Divider */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            margin: '32px 0 24px'
          }}>
            <div style={{
              flex: 1,
              height: '1px',
              background: '#e5e7eb'
            }} />
            <span style={{
              fontSize: '12px',
              color: '#9ca3af',
              fontFamily: 'Inter, sans-serif'
            }}>
              Secure Access
            </span>
            <div style={{
              flex: 1,
              height: '1px',
              background: '#e5e7eb'
            }} />
          </div>

          {/* Features List */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            marginBottom: '24px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '13px',
              color: '#6b7280'
            }}>
              <span style={{ color: '#10b981', fontSize: '16px' }}>✓</span>
              <span>Access to 2,400+ AI agents</span>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '13px',
              color: '#6b7280'
            }}>
              <span style={{ color: '#10b981', fontSize: '16px' }}>✓</span>
              <span>Enterprise-grade security</span>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '13px',
              color: '#6b7280'
            }}>
              <span style={{ color: '#10b981', fontSize: '16px' }}>✓</span>
              <span>24/7 AI support included</span>
            </div>
          </div>

          {/* Terms */}
          <p style={{
            fontSize: '11px',
            color: '#9ca3af',
            textAlign: 'center',
            fontFamily: 'Inter, sans-serif',
            lineHeight: '1.5'
          }}>
            By continuing, you agree to our{' '}
            <a href="#" style={{ color: '#4f46e5', textDecoration: 'none', fontWeight: 500 }}>
              Terms of Service
            </a>
            {' '}and{' '}
            <a href="#" style={{ color: '#4f46e5', textDecoration: 'none', fontWeight: 500 }}>
              Privacy Policy
            </a>
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .auth-modal {
            flex-direction: column;
            max-width: 95%;
          }
          .auth-modal > div:first-child {
            display: none;
          }
        }
      `}</style>
    </div>,
    document.body
  );
};

export default AuthModal;
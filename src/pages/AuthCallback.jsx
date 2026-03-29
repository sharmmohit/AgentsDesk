import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthCallback = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState('Processing your login...');

  useEffect(() => {
    // Get token and user from URL
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const userParam = params.get('user');

    if (token && userParam) {
      try {
        const user = JSON.parse(decodeURIComponent(userParam));
        
        // Store in localStorage
        localStorage.setItem('agentsdesk_token', token);
        localStorage.setItem('agentsdesk_user', JSON.stringify(user));
        
        setStatus('Success! Redirecting to dashboard...');
        
        // Redirect to home after 2 seconds
        setTimeout(() => {
          window.location.href = '/';
        }, 1500);
      } catch (error) {
        setStatus('Error processing authentication');
        setTimeout(() => {
          window.location.href = '/';
        }, 2000);
      }
    } else if (params.get('error')) {
      setStatus('Authentication failed. Please try again.');
      setTimeout(() => {
        window.location.href = '/';
      }, 2000);
    } else {
      setStatus('No authentication data found');
      setTimeout(() => {
        window.location.href = '/';
      }, 2000);
    }
  }, []);

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      background: 'linear-gradient(135deg, #111118 0%, #0a0a0f 100%)',
      color: '#fff',
      fontFamily: 'Syne, sans-serif'
    }}>
      <div style={{
        textAlign: 'center',
        padding: '40px',
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '20px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        maxWidth: '400px',
        width: '90%'
      }}>
        <div style={{
          width: '60px',
          height: '60px',
          margin: '0 auto 20px',
          border: '3px solid #fff',
          borderTopColor: 'transparent',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
        <h2 style={{ fontSize: '20px', marginBottom: '12px' }}>{status}</h2>
        <p style={{ fontSize: '14px', color: '#9ca3af' }}>Please wait while we redirect you...</p>
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </div>
  );
};

export default AuthCallback;
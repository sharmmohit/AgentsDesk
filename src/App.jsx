import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import AgentsSection from './components/AgentsSection'
import './App.css'
import HowItWorks from './components/HowItWorks'
import UseCases from './components/UseCases'
import Pricing from './components/Pricing'
import Testimonials from './components/Testimonials'
import AuthModal from './components/AuthModal'
import Footer from './components/Footer'
import HyperShowcase from './components/HyperShowcase'
import HyperIntegration from './components/HyperIntegration'
import AtomicSalesAgent from './components/AtomicSalesAgent'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

function App() {
  const [isAuthOpen, setIsAuthOpen] = useState(false)
  const [authMode, setAuthMode] = useState('login')
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Check for stored user session on mount
  useEffect(() => {
    const token = localStorage.getItem('agentsdesk_token')
    const storedUser = localStorage.getItem('agentsdesk_user')

    console.log('🔍 Checking stored session...', {
      tokenExists: !!token,
      storedUserExists: !!storedUser
    })

    if (token && storedUser) {
      try {
        const userData = JSON.parse(storedUser)
        console.log('📦 Found stored user:', userData.email)
        setUser(userData)
      } catch (error) {
        console.error('❌ Error parsing stored user:', error)
        localStorage.removeItem('agentsdesk_user')
        localStorage.removeItem('agentsdesk_token')
      }
    }
    setLoading(false)
  }, [])

  // Handle Google OAuth callback — reads ?token=...&user=... from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const token = params.get('token')
    const userParam = params.get('user')
    const error = params.get('error')

    // Clean URL immediately
    if (token || error) {
      window.history.replaceState({}, document.title, window.location.pathname)
    }

    if (error) {
      console.error('❌ OAuth error from backend:', error)
      return
    }

    if (token && userParam) {
      try {
        console.log('🔐 OAuth callback detected, parsing user...')
        const parsedUser = JSON.parse(decodeURIComponent(userParam))
        const userData = { ...parsedUser, token }

        console.log('✅ Google OAuth login successful:', userData.email)
        setUser(userData)
        localStorage.setItem('agentsdesk_token', token)
        localStorage.setItem('agentsdesk_user', JSON.stringify(userData))
      } catch (err) {
        console.error('❌ Failed to parse OAuth callback data:', err)
      }
    }
  }, [])

  // Listen for login events from Navbar/AuthModal
  useEffect(() => {
    const handleUserLogin = (event) => {
      console.log('📢 Received userLogin event:', event.detail)
      const userData = event.detail
      setUser(userData)
      localStorage.setItem('agentsdesk_token', userData.token)
      localStorage.setItem('agentsdesk_user', JSON.stringify(userData))
    }

    window.addEventListener('userLogin', handleUserLogin)
    return () => window.removeEventListener('userLogin', handleUserLogin)
  }, [])

  // Scroll reveal + navbar scroll effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 }
    )

    const revealElements = document.querySelectorAll('.reveal')
    revealElements.forEach((el) => observer.observe(el))

    const handleScroll = () => {
      const nav = document.querySelector('nav')
      if (nav) {
        nav.style.background = window.scrollY > 40
          ? 'rgba(2,2,5,.92)'
          : 'rgba(2,2,5,.88)'
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const openAuthModal = (mode) => {
    setAuthMode(mode)
    setIsAuthOpen(true)
  }

  const closeAuthModal = () => {
    setIsAuthOpen(false)
  }

  const handleLogin = (userData) => {
    console.log('🎉 User logged in:', userData.email)
    setUser(userData)
    localStorage.setItem('agentsdesk_token', userData.token)
    localStorage.setItem('agentsdesk_user', JSON.stringify(userData))
    closeAuthModal()
  }

  const handleLogout = () => {
    console.log('👋 Logging out...')
    localStorage.removeItem('agentsdesk_token')
    localStorage.removeItem('agentsdesk_user')
    setUser(null)
  }

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'var(--void)',
        color: '#fff',
        fontFamily: 'Syne, sans-serif'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '3px solid rgba(255,255,255,0.1)',
            borderTopColor: '#fff',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 16px'
          }}></div>
          <p>Loading AgentsDesk...</p>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      </div>
    )
  }

  console.log('🏠 App rendering with user:', user ? user.email : 'Not logged in')

  return (
    <>
      <div className="scanline"></div>

      <Navbar
        user={user}
        onOpenAuth={openAuthModal}
        onLogout={handleLogout}
      />

      <Hero
        user={user}
        onOpenAuth={openAuthModal}
      />

      <Marquee />

      <HyperShowcase />
      <AtomicSalesAgent/>

      <AgentsSection user={user} />

      <HowItWorks />

      <UseCases />

      <Pricing />

      <Testimonials />


      <Footer />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={closeAuthModal}
        onLogin={handleLogin}
        initialMode={authMode}
      />
    </>
  )
}

export default App
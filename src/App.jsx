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
function App() {
  const [isAuthOpen, setIsAuthOpen] = useState(false)
  const [authMode, setAuthMode] = useState('login')
  const [user, setUser] = useState(null)

  // Check for stored user session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('agentsdesk_user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  // Scroll reveal animation
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

    // Navbar background change on scroll
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
    setUser(userData)
    localStorage.setItem('agentsdesk_user', JSON.stringify(userData))
    closeAuthModal()
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('agentsdesk_user')
  }

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
      <HyperShowcase/>
      <AgentsSection user={user} />
      <HowItWorks />
      <UseCases />
      <Pricing />
      <Testimonials />
      <Footer/>
      
      
      
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
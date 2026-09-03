import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { useTheme } from './hooks/useTheme'
import Navbar   from './components/Navbar'
import Hero     from './components/Hero'
import About    from './components/About'
import Skills   from './components/Skills'
import Projects from './components/Projects'
import Timeline from './components/Timeline'
import Contact  from './components/Contact'
import Footer   from './components/Footer'

// Cursor-follow dot
function CursorGlow() {
  useEffect(() => {
    const dot = document.getElementById('cursor-glow')
    if (!dot) return
    const move = e => {
      dot.style.left = `${e.clientX}px`
      dot.style.top  = `${e.clientY}px`
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  return (
    <div
      id="cursor-glow"
      aria-hidden="true"
      style={{
        position: 'fixed',
        width: '300px',
        height: '300px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%)',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        zIndex: 0,
        transition: 'left 0.12s ease-out, top 0.12s ease-out',
      }}
    />
  )
}

export default function App() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="app" data-theme={theme}>
      {/* Subtle noise texture */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* Cursor glow — desktop only */}
      <CursorGlow />

      <a href="#about" className="skip-link">Skip to main content</a>

      <Navbar theme={theme} toggleTheme={toggleTheme} />

      <main id="main-content">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Timeline />
        <Contact />
      </main>

      <Footer />

      <style>{`
        .skip-link {
          position: absolute;
          top: -999px; left: -999px;
          z-index: 9999;
          background: var(--accent-1);
          color: #000;
          padding: 0.5rem 1rem;
          border-radius: 0 0 var(--radius-sm) var(--radius-sm);
          font-weight: 700;
          font-size: 0.9rem;
          transition: top 0s;
        }
        .skip-link:focus {
          top: 0; left: 0;
          outline: 3px solid var(--accent-3);
        }
        .app { position: relative; min-height: 100vh; }
        /* Alternate section backgrounds */
        #about,
        #projects,
        #contact {
          background: var(--bg-secondary);
        }
      `}</style>
    </div>
  )
}

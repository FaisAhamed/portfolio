import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-scroll'
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi'
import { useScrollSpy } from '../hooks/useScrollSpy'
import profileImg from '../assets/profile.jpg'

const NAV_LINKS = [
  { id: 'about',      label: 'About'      },
  { id: 'skills',     label: 'Skills'     },
  { id: 'projects',   label: 'Projects'   },
  { id: 'timeline',   label: 'Experience' },
  { id: 'contact',    label: 'Contact'    },
]

export default function Navbar({ theme, toggleTheme }) {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)
  const activeId = useScrollSpy(NAV_LINKS.map(l => l.id), 100)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on resize
  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 768) setMenuOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <>
      <motion.nav
        className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="navbar__inner container">
          {/* Logo */}
          <Link to="hero" smooth duration={600} className="navbar__logo" aria-label="Go to top">
            <img src={profileImg} alt="Fais" className="navbar__avatar" />
            <span className="navbar__logo-text">
              <span className="gradient-text">Fais</span>
              <span className="navbar__logo-dot">.</span>
            </span>
          </Link>

          {/* Desktop links */}
          <ul className="navbar__links" role="list">
            {NAV_LINKS.map(link => (
              <li key={link.id}>
                <Link
                  to={link.id}
                  smooth
                  duration={600}
                  offset={-70}
                  className={`navbar__link ${activeId === link.id ? 'navbar__link--active' : ''}`}
                  aria-current={activeId === link.id ? 'page' : undefined}
                >
                  {link.label}
                  {activeId === link.id && (
                    <motion.span
                      className="navbar__link-indicator"
                      layoutId="nav-indicator"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      aria-hidden="true"
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="navbar__actions">
            <motion.button
              className="navbar__theme-btn"
              onClick={toggleTheme}
              whileTap={{ scale: 0.85 }}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={theme}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0,   opacity: 1 }}
                  exit={{   rotate:  90,  opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {theme === 'dark' ? <FiSun aria-hidden="true" /> : <FiMoon aria-hidden="true" />}
                </motion.span>
              </AnimatePresence>
            </motion.button>

            <motion.button
              className="navbar__hamburger"
              onClick={() => setMenuOpen(o => !o)}
              whileTap={{ scale: 0.9 }}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              {menuOpen ? <FiX aria-hidden="true" /> : <FiMenu aria-hidden="true" />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            className="navbar__mobile"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{   opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            role="dialog"
            aria-label="Mobile navigation menu"
          >
            <ul role="list">
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <Link
                    to={link.id}
                    smooth
                    duration={600}
                    offset={-70}
                    className={`navbar__mobile-link ${activeId === link.id ? 'navbar__mobile-link--active' : ''}`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .navbar {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 1000;
          background: transparent;
          transition: background var(--transition), box-shadow var(--transition);
        }
        .navbar--scrolled {
          background: var(--nav-bg);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          box-shadow: 0 1px 0 var(--border);
        }
        .navbar__inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: var(--nav-height);
        }
        .navbar__logo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1.3rem;
          font-weight: 800;
          letter-spacing: -0.02em;
          cursor: pointer;
        }
        .navbar__logo-icon {
          color: var(--accent-1);
          font-size: 1.4rem;
        }
        .navbar__avatar {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          object-fit: cover;
          object-position: top center;
          border: 2px solid var(--accent-1);
          flex-shrink: 0;
        }
        .navbar__logo-dot { color: var(--accent-1); }
        .navbar__links {
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }
        .navbar__link {
          position: relative;
          padding: 0.4rem 0.9rem;
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--text-secondary);
          cursor: pointer;
          border-radius: var(--radius-sm);
          transition: color var(--transition);
        }
        .navbar__link:hover { color: var(--text-primary); }
        .navbar__link--active { color: var(--accent-1); }
        .navbar__link-indicator {
          position: absolute;
          bottom: -2px; left: 0.9rem; right: 0.9rem;
          height: 2px;
          background: var(--accent-gradient);
          border-radius: 1px;
        }
        .navbar__actions {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .navbar__theme-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 38px; height: 38px;
          border-radius: var(--radius-sm);
          color: var(--text-secondary);
          font-size: 1.1rem;
          border: 1px solid var(--border);
          background: var(--bg-card);
          transition: all var(--transition);
        }
        .navbar__theme-btn:hover {
          color: var(--accent-1);
          border-color: var(--border-hover);
        }
        .navbar__hamburger {
          display: none;
          align-items: center;
          justify-content: center;
          width: 38px; height: 38px;
          border-radius: var(--radius-sm);
          color: var(--text-secondary);
          font-size: 1.2rem;
          border: 1px solid var(--border);
          background: var(--bg-card);
          transition: all var(--transition);
        }
        .navbar__hamburger:hover { color: var(--accent-1); border-color: var(--border-hover); }
        .navbar__mobile {
          position: fixed;
          top: var(--nav-height);
          left: 0; right: 0;
          z-index: 999;
          background: var(--bg-secondary);
          border-bottom: 1px solid var(--border);
          padding: 1.5rem;
          backdrop-filter: blur(16px);
        }
        .navbar__mobile ul { display: flex; flex-direction: column; gap: 0.5rem; }
        .navbar__mobile-link {
          display: block;
          padding: 0.75rem 1rem;
          border-radius: var(--radius-sm);
          color: var(--text-secondary);
          font-weight: 500;
          cursor: pointer;
          transition: all var(--transition);
        }
        .navbar__mobile-link:hover,
        .navbar__mobile-link--active {
          color: var(--accent-1);
          background: rgba(0,212,255,0.06);
        }
        @media (max-width: 768px) {
          .navbar__links { display: none; }
          .navbar__hamburger { display: flex; }
        }
      `}</style>
    </>
  )
}

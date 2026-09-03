import { motion } from 'framer-motion'
import { Link } from 'react-scroll'
import { FiGithub, FiLinkedin, FiMail, FiCode, FiHeart } from 'react-icons/fi'

const NAV_LINKS = [
  { id: 'about',    label: 'About'      },
  { id: 'skills',   label: 'Skills'     },
  { id: 'projects', label: 'Projects'   },
  { id: 'timeline', label: 'Experience' },
  { id: 'contact',  label: 'Contact'    },
]

const SOCIALS = [
  { href: 'https://github.com/',                 icon: <FiGithub />,   label: 'GitHub'   },
  { href: 'https://linkedin.com/in/Fais_Ahamed', icon: <FiLinkedin />, label: 'LinkedIn' },
  { href: 'mailto:faisahamed43@gmail.com',        icon: <FiMail />,     label: 'Email'    },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer" role="contentinfo">
      {/* Animated wave divider */}
      <div className="footer__wave" aria-hidden="true">
        <svg
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor="var(--accent-1)"   stopOpacity="0.4" />
              <stop offset="50%"  stopColor="var(--accent-3)"   stopOpacity="0.3" />
              <stop offset="100%" stopColor="var(--accent-1)"   stopOpacity="0.4" />
            </linearGradient>
          </defs>
          <motion.path
            d="M0,40 C180,80 360,0 540,40 C720,80 900,0 1080,40 C1260,80 1350,20 1440,40 L1440,80 L0,80 Z"
            fill="url(#waveGrad)"
            initial={{ d: 'M0,40 C180,80 360,0 540,40 C720,80 900,0 1080,40 C1260,80 1350,20 1440,40 L1440,80 L0,80 Z' }}
            animate={{
              d: [
                'M0,40 C180,80 360,0 540,40 C720,80 900,0 1080,40 C1260,80 1350,20 1440,40 L1440,80 L0,80 Z',
                'M0,30 C200,10 400,70 600,30 C800,-10 1000,70 1200,30 C1320,10 1380,50 1440,30 L1440,80 L0,80 Z',
                'M0,40 C180,80 360,0 540,40 C720,80 900,0 1080,40 C1260,80 1350,20 1440,40 L1440,80 L0,80 Z',
              ],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </svg>
      </div>

      <div className="footer__body">
        <div className="container footer__inner">
          {/* Brand */}
          <div className="footer__brand">
            <Link to="hero" smooth duration={600} className="footer__logo" aria-label="Back to top">
              <FiCode aria-hidden="true" />
              <span className="gradient-text">Fais</span>
              <span className="footer__logo-dot">.</span>
            </Link>
            <p className="footer__tagline">
              Building the web, one component at a time.
            </p>
          </div>

          {/* Nav */}
          <nav className="footer__nav" aria-label="Footer navigation">
            <h3 className="footer__nav-heading">Navigate</h3>
            <ul role="list">
              {NAV_LINKS.map(link => (
                <li key={link.id}>
                  <Link
                    to={link.id}
                    smooth
                    duration={600}
                    offset={-70}
                    className="footer__nav-link"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="footer__contact">
            <h3 className="footer__nav-heading">Connect</h3>
            <div className="footer__socials" role="list">
              {SOCIALS.map(s => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer__social-btn"
                  role="listitem"
                  aria-label={s.label}
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>
            <p className="footer__availability">
              <span className="footer__availability-dot" aria-hidden="true" />
              Open to opportunities
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer__bottom">
          <div className="container footer__bottom-inner">
            <p className="footer__copy">
              © {year} Fais. All rights reserved.
            </p>
            <p className="footer__made-with">
              Made with <FiHeart className="footer__heart" aria-label="love" /> using React & Framer Motion
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .footer {
          position: relative;
          background: var(--bg-secondary);
          border-top: 1px solid var(--border);
        }
        .footer__wave {
          position: absolute;
          top: -79px; left: 0; right: 0;
          height: 80px;
          pointer-events: none;
          overflow: hidden;
        }
        .footer__wave svg {
          width: 100%; height: 100%;
          display: block;
        }
        .footer__body { padding: 4rem 0 0; }
        .footer__inner {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          gap: 3rem;
          padding-bottom: 3rem;
          border-bottom: 1px solid var(--border);
        }
        .footer__logo {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 1.4rem;
          font-weight: 800;
          cursor: pointer;
          margin-bottom: 0.75rem;
        }
        .footer__logo svg { color: var(--accent-1); }
        .footer__logo-dot { color: var(--accent-1); }
        .footer__tagline {
          color: var(--text-muted);
          font-size: 0.88rem;
          max-width: 240px;
          line-height: 1.6;
        }
        .footer__nav-heading {
          font-size: 0.78rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--text-muted);
          font-weight: 600;
          margin-bottom: 1rem;
        }
        .footer__nav ul { display: flex; flex-direction: column; gap: 0.6rem; }
        .footer__nav-link {
          font-size: 0.9rem;
          color: var(--text-secondary);
          cursor: pointer;
          transition: color var(--transition);
        }
        .footer__nav-link:hover { color: var(--accent-1); }
        .footer__socials {
          display: flex;
          gap: 0.6rem;
          margin-bottom: 1.25rem;
        }
        .footer__social-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px; height: 40px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border);
          background: var(--bg-card);
          color: var(--text-secondary);
          font-size: 1rem;
          transition: all var(--transition);
        }
        .footer__social-btn:hover {
          color: var(--accent-1);
          border-color: var(--border-hover);
        }
        .footer__availability {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.82rem;
          color: #28ca41;
          font-weight: 500;
        }
        .footer__availability-dot {
          width: 8px; height: 8px;
          background: #28ca41;
          border-radius: 50%;
          animation: pulse-dot 2s ease-in-out infinite;
        }
        @keyframes pulse-dot {
          0%,100%{ box-shadow: 0 0 0 0 rgba(40,202,65,0.4); }
          50%{ box-shadow: 0 0 0 5px rgba(40,202,65,0); }
        }
        .footer__bottom {
          padding: 1.25rem 0;
        }
        .footer__bottom-inner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .footer__copy {
          font-size: 0.82rem;
          color: var(--text-muted);
        }
        .footer__made-with {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          font-size: 0.82rem;
          color: var(--text-muted);
        }
        .footer__heart {
          color: #ff6b6b;
          animation: heartbeat 1.5s ease-in-out infinite;
        }
        @keyframes heartbeat {
          0%,100%{ transform: scale(1); }
          50%{ transform: scale(1.3); }
        }
        @media (max-width: 768px) {
          .footer__inner {
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
          }
          .footer__brand { grid-column: 1 / -1; }
        }
        @media (max-width: 480px) {
          .footer__inner { grid-template-columns: 1fr; }
          .footer__bottom-inner { flex-direction: column; text-align: center; }
        }
      `}</style>
    </footer>
  )
}

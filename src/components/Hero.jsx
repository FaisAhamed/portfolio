import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-scroll'
import { FiArrowDown, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import { useTypewriter } from '../hooks/useTypewriter'

const TITLES = ['Full-Stack Developer', 'React Enthusiast', 'Laravel Developer', 'Problem Solver']

// Particle canvas
function ParticleCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    let particles = []

    const resize = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    class Particle {
      constructor() { this.reset() }
      reset() {
        this.x  = Math.random() * canvas.width
        this.y  = Math.random() * canvas.height
        this.vx = (Math.random() - 0.5) * 0.4
        this.vy = (Math.random() - 0.5) * 0.4
        this.r  = Math.random() * 1.5 + 0.5
        this.alpha = Math.random() * 0.5 + 0.1
      }
      update() {
        this.x += this.vx; this.y += this.vy
        if (this.x < 0 || this.x > canvas.width)  this.vx *= -1
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1
      }
      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0,212,255,${this.alpha})`
        ctx.fill()
      }
    }

    for (let i = 0; i < 90; i++) particles.push(new Particle())

    const connect = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(0,212,255,${0.08 * (1 - dist / 120)})`
            ctx.lineWidth = 0.6
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
    }

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => { p.update(); p.draw() })
      connect()
      animId = requestAnimationFrame(loop)
    }
    loop()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="hero__canvas"
      aria-hidden="true"
    />
  )
}

// Mouse parallax orbs
function ParallaxOrbs() {
  const [pos, setPos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = e => {
      const x = (e.clientX / window.innerWidth  - 0.5) * 30
      const y = (e.clientY / window.innerHeight - 0.5) * 30
      setPos({ x, y })
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <div className="hero__orbs" aria-hidden="true">
      <motion.div
        className="hero__orb hero__orb--1"
        animate={{ x: pos.x * 1.2, y: pos.y * 1.2 }}
        transition={{ type: 'spring', stiffness: 60, damping: 20 }}
      />
      <motion.div
        className="hero__orb hero__orb--2"
        animate={{ x: -pos.x * 0.8, y: -pos.y * 0.8 }}
        transition={{ type: 'spring', stiffness: 50, damping: 20 }}
      />
      <motion.div
        className="hero__orb hero__orb--3"
        animate={{ x: pos.x * 0.5, y: -pos.y * 0.5 }}
        transition={{ type: 'spring', stiffness: 40, damping: 20 }}
      />
    </div>
  )
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}
const itemVariants = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
}

export default function Hero() {
  const typed = useTypewriter(TITLES)

  return (
    <section id="hero" className="hero" aria-label="Hero section">
      <ParticleCanvas />
      <ParallaxOrbs />

      {/* Grid overlay */}
      <div className="hero__grid" aria-hidden="true" />

      <div className="container hero__content">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="hero__text"
        >
          <motion.div variants={itemVariants} className="hero__greeting">
            <span className="hero__greeting-line" aria-hidden="true" />
            <span>Hey there, I'm</span>
          </motion.div>

          <motion.h1 variants={itemVariants} className="hero__name">
            <span className="gradient-text">Fais</span>
          </motion.h1>

          <motion.div variants={itemVariants} className="hero__title-wrap">
            <span className="hero__title-label">I'm a </span>
            <span className="hero__typewriter" aria-live="polite" aria-atomic="true">
              {typed}
              <span className="hero__cursor" aria-hidden="true">|</span>
            </span>
          </motion.div>

          <motion.p variants={itemVariants} className="hero__bio">
            HND Software Engineering student passionate about crafting sleek, 
            performant web applications. I build things for the web — from elegant 
            frontends to robust backends.
          </motion.p>

          <motion.div variants={itemVariants} className="hero__cta">
            <Link to="projects" smooth duration={700} offset={-70}>
              <motion.button
                className="btn btn-primary"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                View My Work
                <FiArrowDown aria-hidden="true" />
              </motion.button>
            </Link>
            <Link to="contact" smooth duration={700} offset={-70}>
              <motion.button
                className="btn btn-outline"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                Contact Me
              </motion.button>
            </Link>
          </motion.div>

          <motion.div variants={itemVariants} className="hero__socials">
            {[
              { href: 'https://github.com/', icon: <FiGithub />,   label: 'GitHub'   },
              { href: 'https://linkedin.com/in/Fais_Ahamed', icon: <FiLinkedin />, label: 'LinkedIn' },
              { href: 'mailto:faisahamed43@gmail.com', icon: <FiMail />,  label: 'Email'    },
            ].map(({ href, icon, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="hero__social-btn"
                aria-label={label}
                whileHover={{ scale: 1.15, y: -3 }}
                whileTap={{ scale: 0.9 }}
              >
                {icon}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Profile photo card */}
        <motion.div
          className="hero__photo-card"
          initial={{ opacity: 0, x: 60, rotateY: -15 }}
          animate={{ opacity: 1, x: 0,  rotateY: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Photo */}
          <div className="hero__photo-frame">
            <img
              src="/profile.jpg"
              alt="M.T. Fais Ahamed — Full Stack Developer"
              className="hero__photo"
            />
            {/* Glow ring */}
            <div className="hero__photo-glow" aria-hidden="true" />
          </div>

          {/* Floating status badge */}
          <motion.div
            className="hero__status-badge"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            aria-label="Available for work"
          >
            <span className="hero__status-dot" aria-hidden="true" />
            Available for hire
          </motion.div>

          {/* Floating experience badge */}
          <motion.div
            className="hero__exp-badge"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            aria-hidden="true"
          >
            <span className="hero__exp-icon">💼</span>
            <div>
              <div className="hero__exp-num">3+</div>
              <div className="hero__exp-label">Years Coding</div>
            </div>
          </motion.div>

          {/* Tech stack pill */}
          <motion.div
            className="hero__tech-pill"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            aria-hidden="true"
          >
            ⚛️ React &nbsp;·&nbsp; 🐘 Laravel &nbsp;·&nbsp; 🟨 JS
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="hero__scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        aria-hidden="true"
      >
        <motion.div
          className="hero__scroll-dot"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
        />
      </motion.div>

      <style>{`
        .hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          overflow: hidden;
          padding-top: var(--nav-height);
        }
        .hero__canvas {
          position: absolute;
          inset: 0;
          width: 100%; height: 100%;
          pointer-events: none;
        }
        .hero__grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
        }
        .hero__orbs { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }
        .hero__orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
        }
        .hero__orb--1 {
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(0,212,255,0.12), transparent 70%);
          top: -10%; left: -5%;
        }
        .hero__orb--2 {
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(123,47,247,0.1), transparent 70%);
          bottom: 0%; right: 5%;
        }
        .hero__orb--3 {
          width: 300px; height: 300px;
          background: radial-gradient(circle, rgba(0,153,204,0.08), transparent 70%);
          top: 50%; right: 30%;
        }
        .hero__content {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
          padding-top: 2rem;
          padding-bottom: 4rem;
        }
        .hero__greeting {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-family: var(--font-mono);
          font-size: 0.9rem;
          color: var(--accent-1);
          margin-bottom: 0.5rem;
        }
        .hero__greeting-line {
          width: 40px; height: 1px;
          background: var(--accent-1);
          display: inline-block;
        }
        .hero__name {
          font-size: clamp(3.5rem, 8vw, 6rem);
          font-weight: 900;
          line-height: 1;
          letter-spacing: -0.03em;
          margin-bottom: 0.75rem;
        }
        .hero__title-wrap {
          font-size: clamp(1.1rem, 2.5vw, 1.4rem);
          color: var(--text-secondary);
          margin-bottom: 1.5rem;
          min-height: 2rem;
        }
        .hero__typewriter {
          color: var(--text-primary);
          font-weight: 600;
        }
        .hero__cursor {
          color: var(--accent-1);
          animation: blink 1s step-end infinite;
        }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        .hero__bio {
          color: var(--text-secondary);
          font-size: 1.05rem;
          max-width: 500px;
          margin-bottom: 2rem;
          line-height: 1.8;
        }
        .hero__cta {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          margin-bottom: 2.5rem;
        }
        .hero__socials {
          display: flex;
          gap: 0.75rem;
        }
        .hero__social-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 42px; height: 42px;
          border-radius: var(--radius-sm);
          background: var(--bg-card);
          border: 1px solid var(--border);
          color: var(--text-secondary);
          font-size: 1.1rem;
          transition: all var(--transition);
        }
        .hero__social-btn:hover {
          color: var(--accent-1);
          border-color: var(--border-hover);
          box-shadow: var(--shadow-glow);
        }
        /* Code card */
        .hero__card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: var(--shadow-card);
          perspective: 1000px;
        }
        .hero__card-header {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.8rem 1rem;
          background: var(--bg-secondary);
          border-bottom: 1px solid var(--border);
        }
        .hero__card-dot {
          width: 12px; height: 12px;
          border-radius: 50%;
        }
        .hero__card-filename {
          font-family: var(--font-mono);
          font-size: 0.78rem;
          color: var(--text-muted);
          margin-left: 0.5rem;
        }
        .hero__code {
          font-family: var(--font-mono);
          font-size: 0.82rem;
          line-height: 1.7;
          color: var(--text-secondary);
          padding: 1.5rem;
          white-space: pre-wrap;
          word-break: break-word;
        }
        .hero__code .key   { color: #7b2ff7; }
        .hero__code .str   { color: #00d4ff; }
        .hero__code .bool  { color: #ff6b6b; }
        /* Scroll indicator */
        .hero__scroll-indicator {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          width: 24px; height: 38px;
          border: 2px solid var(--border-hover);
          border-radius: 12px;
          display: flex;
          justify-content: center;
          padding-top: 6px;
        }
        .hero__scroll-dot {
          width: 4px; height: 8px;
          background: var(--accent-1);
          border-radius: 2px;
        }
        /* ---- Photo card ---- */
        .hero__photo-card {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .hero__photo-frame {
          position: relative;
          width: 320px;
          height: 400px;
          border-radius: 28px;
          overflow: hidden;
          border: 2px solid var(--border);
          box-shadow: 0 24px 80px rgba(0,212,255,0.18), 0 0 0 1px var(--border);
        }
        .hero__photo {
          width: 100%; height: 100%;
          object-fit: cover;
          object-position: top center;
          display: block;
          transition: transform 0.6s ease;
        }
        .hero__photo-frame:hover .hero__photo { transform: scale(1.04); }
        .hero__photo-glow {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            transparent 55%,
            rgba(0,212,255,0.12) 100%
          );
          pointer-events: none;
        }
        /* Status badge — top right */
        .hero__status-badge {
          position: absolute;
          top: -14px;
          right: -14px;
          display: flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.45rem 0.9rem;
          background: var(--bg-card);
          border: 1px solid rgba(40,202,65,0.35);
          border-radius: 20px;
          font-size: 0.78rem;
          font-weight: 600;
          color: #28ca41;
          box-shadow: var(--shadow-card);
          z-index: 2;
          white-space: nowrap;
        }
        .hero__status-dot {
          width: 8px; height: 8px;
          background: #28ca41;
          border-radius: 50%;
          animation: pulse-dot 2s ease-in-out infinite;
        }
        @keyframes pulse-dot {
          0%,100%{ box-shadow: 0 0 0 0 rgba(40,202,65,0.5); }
          50%{ box-shadow: 0 0 0 6px rgba(40,202,65,0); }
        }
        /* Experience badge — bottom left */
        .hero__exp-badge {
          position: absolute;
          bottom: 24px;
          left: -20px;
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.6rem 0.9rem;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-card);
          z-index: 2;
        }
        .hero__exp-icon { font-size: 1.3rem; }
        .hero__exp-num {
          font-size: 1.1rem;
          font-weight: 800;
          background: var(--accent-gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1;
        }
        .hero__exp-label {
          font-size: 0.68rem;
          color: var(--text-muted);
          font-weight: 500;
          white-space: nowrap;
        }
        /* Tech pill — bottom */
        .hero__tech-pill {
          position: absolute;
          bottom: -18px;
          left: 50%;
          transform: translateX(-50%);
          padding: 0.45rem 1.1rem;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 20px;
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--text-secondary);
          box-shadow: var(--shadow-card);
          white-space: nowrap;
          z-index: 2;
        }
        @media (max-width: 900px) {
          .hero__content {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 2.5rem;
          }
          .hero__greeting { justify-content: center; }
          .hero__bio { margin-left: auto; margin-right: auto; }
          .hero__cta { justify-content: center; }
          .hero__socials { justify-content: center; }
          .hero__photo-frame { width: 260px; height: 320px; }
          .hero__photo-card { margin-bottom: 2rem; }
        }
        @media (max-width: 480px) {
          .hero__cta { flex-direction: column; align-items: center; }
          .hero__photo-frame { width: 220px; height: 280px; }
        }
      `}</style>
    </section>
  )
}

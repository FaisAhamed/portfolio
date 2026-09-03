import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { FiCode, FiLayers, FiAward, FiCoffee } from 'react-icons/fi'
import profileImg from '../assets/profile.jpg'

function useCountUp(target, duration = 1800, start = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!start) return
    let startTime = null
    const step = timestamp => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      // ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [target, duration, start])
  return count
}

const STATS = [
  { icon: <FiCode />,   label: 'Years Learning',  value: 3,  suffix: '+'  },
  { icon: <FiLayers />, label: 'Projects Built',   value: 12, suffix: '+'  },
  { icon: <FiAward />,  label: 'Tech Stack Items', value: 7,  suffix: ''   },
  { icon: <FiCoffee />, label: 'Cups of Coffee',   value: 999,suffix: '+'  },
]

function StatCard({ icon, label, value, suffix, animate }) {
  const count = useCountUp(value, 1600, animate)
  return (
    <div className="about__stat">
      <span className="about__stat-icon" aria-hidden="true">{icon}</span>
      <div className="about__stat-value">
        <span aria-label={`${value}${suffix} ${label}`}>{count}{suffix}</span>
      </div>
      <div className="about__stat-label">{label}</div>
    </div>
  )
}

const sectionVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}
const fadeUp = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
}

export default function About() {
  const sectionRef = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect() } },
      { threshold: 0.2 }
    )
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="about" className="section about" ref={sectionRef} aria-labelledby="about-title">
      <div className="container">
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <div className="section-header">
            <motion.span variants={fadeUp} className="section-tag">Get to know me</motion.span>
            <motion.h2 variants={fadeUp} className="section-title" id="about-title">
              About <span className="gradient-text">Me</span>
            </motion.h2>
            <motion.div variants={fadeUp} className="section-divider" aria-hidden="true" />
          </div>

          <div className="about__grid">
            {/* Photo */}
            <motion.div variants={fadeUp} className="about__photo-wrap">
              <div className="about__photo">
                <div className="about__photo-inner">
                  <img
                    src={profileImg}
                    alt="Fais — Full-Stack Developer"
                    className="about__photo-img"
                  />
                </div>
                <div className="about__photo-ring" aria-hidden="true" />
                {/* Floating tech badge — top right */}
                <motion.div
                  className="about__float-badge about__float-badge--tr"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  aria-hidden="true"
                >
                  <span className="about__float-icon">⚛️</span>
                  <span>React</span>
                </motion.div>
                {/* Floating tech badge — bottom left */}
                <motion.div
                  className="about__float-badge about__float-badge--bl"
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                  aria-hidden="true"
                >
                  <span className="about__float-icon">🚀</span>
                  <span>Laravel</span>
                </motion.div>
                {/* Available badge */}
                <div className="about__photo-badge" aria-label="Available for work">
                  <span className="about__photo-badge-dot" aria-hidden="true" />
                  Available for work
                </div>
              </div>
            </motion.div>

            {/* Text */}
            <div className="about__text-col">
              <motion.h3 variants={fadeUp} className="about__heading">
                Hi, I'm Fais — a Full Stack Developer from Sri Lanka
              </motion.h3>

              <motion.p variants={fadeUp} className="about__para">
                I'm <strong>M.T. Fais Ahamed</strong>, a dedicated Full Stack Developer 
                currently pursuing my <strong>Higher National Diploma in Information Technology</strong> 
                at SLIATE Sammanthurai (2022–2025). I have a strong foundation in modern 
                web development and real-world professional experience.
              </motion.p>

              <motion.p variants={fadeUp} className="about__para">
                I specialise in <strong>Laravel & PHP</strong> on the backend and 
                <strong> React, JavaScript & jQuery</strong> on the frontend, with solid 
                hands-on experience building production systems — including 
                <strong> NextHealth OS</strong> (a healthcare management platform) and 
                the <strong>CRAS College management system</strong>.
              </motion.p>

              <motion.p variants={fadeUp} className="about__para">
                I'm passionate about building efficient, scalable, and maintainable software. 
                I speak <strong>Tamil, English & Sinhala</strong> and am actively seeking 
                opportunities to contribute to a dynamic software development team.
              </motion.p>

              <motion.div variants={fadeUp} className="about__tags-row">
                {['React', 'Node.js', 'Laravel', 'PHP', 'Java', 'SQL'].map(t => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Stats */}
          <motion.div variants={fadeUp} className="about__stats">
            {STATS.map(s => (
              <StatCard key={s.label} {...s} animate={inView} />
            ))}
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        .about__grid {
          display: grid;
          grid-template-columns: 320px 1fr;
          gap: 4rem;
          align-items: center;
          margin-bottom: 3rem;
        }
        /* Photo */
        .about__photo-wrap { display: flex; justify-content: center; }
        .about__photo {
          position: relative;
          width: 280px; height: 340px;
        }
        .about__photo-inner {
          width: 100%; height: 100%;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0,212,255,0.2), 0 0 0 1px var(--border);
          position: relative;
          z-index: 1;
        }
        .about__photo-img {
          width: 100%; height: 100%;
          object-fit: cover;
          object-position: top center;
          display: block;
          transition: transform 0.5s ease;
        }
        .about__photo-inner:hover .about__photo-img {
          transform: scale(1.04);
        }
        /* Floating badges */
        .about__float-badge {
          position: absolute;
          z-index: 3;
          display: flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.45rem 0.85rem;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 20px;
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--text-primary);
          box-shadow: var(--shadow-card);
          white-space: nowrap;
        }
        .about__float-badge--tr { top: -12px; right: -18px; }
        .about__float-badge--bl { bottom: 48px; left: -22px; }
        .about__float-icon { font-size: 1rem; }
        .about__photo-ring {
          position: absolute;
          inset: -8px;
          border-radius: 32px;
          border: 2px dashed rgba(0,212,255,0.3);
          animation: spin 20s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .about__photo-badge {
          position: absolute;
          bottom: -14px;
          right: -10px;
          z-index: 2;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 0.4rem 0.9rem;
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          gap: 0.4rem;
          box-shadow: var(--shadow-card);
        }
        .about__photo-badge-dot {
          width: 8px; height: 8px;
          background: #28ca41;
          border-radius: 50%;
          animation: pulse-dot 2s ease-in-out infinite;
        }
        @keyframes pulse-dot {
          0%,100%{ box-shadow: 0 0 0 0 rgba(40,202,65,0.4); }
          50%{ box-shadow: 0 0 0 6px rgba(40,202,65,0); }
        }
        /* Text */
        .about__heading {
          font-size: 1.5rem;
          margin-bottom: 1.25rem;
          line-height: 1.4;
        }
        .about__para {
          color: var(--text-secondary);
          margin-bottom: 1rem;
          line-height: 1.8;
        }
        .about__para strong { color: var(--accent-1); font-weight: 600; }
        .about__tags-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-top: 1.5rem;
        }
        /* Stats */
        .about__stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.25rem;
          margin-top: 2rem;
        }
        .about__stat {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 1.5rem;
          text-align: center;
          transition: all var(--transition);
        }
        .about__stat:hover {
          border-color: var(--border-hover);
          transform: translateY(-4px);
          box-shadow: var(--shadow-glow);
        }
        .about__stat-icon {
          font-size: 1.5rem;
          color: var(--accent-1);
          display: block;
          margin-bottom: 0.75rem;
        }
        .about__stat-value {
          font-size: 2.2rem;
          font-weight: 800;
          background: var(--accent-gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1;
          margin-bottom: 0.4rem;
        }
        .about__stat-label {
          font-size: 0.82rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }
        @media (max-width: 900px) {
          .about__grid { grid-template-columns: 1fr; gap: 2.5rem; }
          .about__photo { margin: 0 auto; }
          .about__stats { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 480px) {
          .about__stats { grid-template-columns: 1fr 1fr; }
        }
      `}</style>
    </section>
  )
}

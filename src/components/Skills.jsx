import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import {
  FaReact, FaNodeJs, FaLaravel, FaPhp, FaJava, FaDatabase,
} from 'react-icons/fa'
import {
  SiMariadb, SiMysql, SiJavascript, SiTailwindcss, SiGit,
} from 'react-icons/si'

const SKILLS = [
  { name: 'React',      icon: <FaReact />,       level: 85, color: '#61dafb', category: 'Frontend' },
  { name: 'JavaScript', icon: <SiJavascript />,  level: 80, color: '#f7df1e', category: 'Frontend' },
  { name: 'Tailwind',   icon: <SiTailwindcss />, level: 75, color: '#06b6d4', category: 'Frontend' },
  { name: 'Node.js',    icon: <FaNodeJs />,      level: 78, color: '#68a063', category: 'Backend'  },
  { name: 'Laravel',    icon: <FaLaravel />,     level: 82, color: '#ff2d20', category: 'Backend'  },
  { name: 'PHP',        icon: <FaPhp />,         level: 80, color: '#8892bf', category: 'Backend'  },
  { name: 'Java',       icon: <FaJava />,        level: 70, color: '#ed8b00', category: 'Backend'  },
  { name: 'MySQL',      icon: <SiMysql />,       level: 78, color: '#4479a1', category: 'Database' },
  { name: 'MariaDB',    icon: <SiMariadb />,     level: 75, color: '#c0765a', category: 'Database' },
  { name: 'SQL',        icon: <FaDatabase />,    level: 76, color: '#00d4ff', category: 'Database' },
  { name: 'Git',        icon: <SiGit />,         level: 72, color: '#f05032', category: 'Tools'    },
]

const CATEGORIES = ['All', 'Frontend', 'Backend', 'Database', 'Tools']

function SkillBar({ skill, animate }) {
  const [width, setWidth] = useState(0)
  useEffect(() => {
    if (animate) {
      const t = setTimeout(() => setWidth(skill.level), 100)
      return () => clearTimeout(t)
    }
  }, [animate, skill.level])

  return (
    <motion.div
      className="skill-bar"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      role="listitem"
    >
      <div className="skill-bar__header">
        <div className="skill-bar__name">
          <span className="skill-bar__icon" style={{ color: skill.color }} aria-hidden="true">
            {skill.icon}
          </span>
          <span>{skill.name}</span>
        </div>
        <span className="skill-bar__pct" aria-label={`${skill.level} percent`}>{skill.level}%</span>
      </div>
      <div
        className="skill-bar__track"
        role="progressbar"
        aria-valuenow={skill.level}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={skill.name}
      >
        <div
          className="skill-bar__fill"
          style={{
            width: `${width}%`,
            background: `linear-gradient(90deg, ${skill.color}99, ${skill.color})`,
            transition: 'width 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: `0 0 12px ${skill.color}44`,
          }}
        />
      </div>
    </motion.div>
  )
}

function SkillIcon({ skill }) {
  return (
    <motion.div
      className="skill-icon"
      whileHover={{ scale: 1.12, y: -6 }}
      transition={{ type: 'spring', stiffness: 300 }}
      title={`${skill.name} — ${skill.level}%`}
      role="listitem"
      aria-label={`${skill.name}, proficiency ${skill.level}%`}
    >
      <div className="skill-icon__circle" style={{ '--icon-color': skill.color }}>
        <span className="skill-icon__glyph" style={{ color: skill.color }} aria-hidden="true">
          {skill.icon}
        </span>
      </div>
      <span className="skill-icon__name">{skill.name}</span>
    </motion.div>
  )
}

const sectionVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}
const fadeUp = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function Skills() {
  const sectionRef = useRef(null)
  const [inView, setInView]       = useState(false)
  const [activeCategory, setActive] = useState('All')
  const [view, setView]           = useState('bars') // 'bars' | 'icons'

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect() } },
      { threshold: 0.15 }
    )
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  const filtered = activeCategory === 'All'
    ? SKILLS
    : SKILLS.filter(s => s.category === activeCategory)

  return (
    <section id="skills" className="section skills" ref={sectionRef} aria-labelledby="skills-title">
      <div className="container">
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <div className="section-header">
            <motion.span variants={fadeUp} className="section-tag">What I work with</motion.span>
            <motion.h2 variants={fadeUp} className="section-title" id="skills-title">
              My <span className="gradient-text">Skills</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="section-subtitle">
              Technologies I've built real projects with
            </motion.p>
            <motion.div variants={fadeUp} className="section-divider" aria-hidden="true" />
          </div>

          {/* Controls */}
          <motion.div variants={fadeUp} className="skills__controls">
            <div className="skills__filters" role="group" aria-label="Filter by category">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  className={`skills__filter-btn ${activeCategory === cat ? 'skills__filter-btn--active' : ''}`}
                  onClick={() => setActive(cat)}
                  aria-pressed={activeCategory === cat}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="skills__view-toggle" role="group" aria-label="Toggle skill view">
              <button
                className={`skills__view-btn ${view === 'bars' ? 'skills__view-btn--active' : ''}`}
                onClick={() => setView('bars')}
                aria-pressed={view === 'bars'}
                aria-label="Bar view"
              >
                Bars
              </button>
              <button
                className={`skills__view-btn ${view === 'icons' ? 'skills__view-btn--active' : ''}`}
                onClick={() => setView('icons')}
                aria-pressed={view === 'icons'}
                aria-label="Icon view"
              >
                Icons
              </button>
            </div>
          </motion.div>

          {/* Bars view */}
          {view === 'bars' && (
            <motion.div
              className="skills__bars"
              initial="hidden"
              animate="visible"
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}
              role="list"
              aria-label="Skill proficiency bars"
            >
              {filtered.map(skill => (
                <SkillBar key={skill.name} skill={skill} animate={inView} />
              ))}
            </motion.div>
          )}

          {/* Icons view */}
          {view === 'icons' && (
            <motion.div
              className="skills__icons"
              initial="hidden"
              animate="visible"
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }}
              role="list"
              aria-label="Skill icons"
            >
              {filtered.map(skill => (
                <motion.div
                  key={skill.name}
                  variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } }}
                >
                  <SkillIcon skill={skill} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>

      <style>{`
        .skills__controls {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
          margin-bottom: 2.5rem;
        }
        .skills__filters {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .skills__filter-btn {
          padding: 0.4rem 1rem;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 500;
          border: 1px solid var(--border);
          background: var(--bg-card);
          color: var(--text-secondary);
          cursor: pointer;
          transition: all var(--transition);
        }
        .skills__filter-btn:hover { color: var(--accent-1); border-color: var(--border-hover); }
        .skills__filter-btn--active {
          background: rgba(0,212,255,0.1);
          border-color: var(--accent-1);
          color: var(--accent-1);
        }
        .skills__view-toggle {
          display: flex;
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          overflow: hidden;
        }
        .skills__view-btn {
          padding: 0.4rem 0.9rem;
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--text-secondary);
          background: var(--bg-card);
          cursor: pointer;
          transition: all var(--transition);
          border: none;
        }
        .skills__view-btn--active {
          background: rgba(0,212,255,0.12);
          color: var(--accent-1);
        }
        /* Bars */
        .skills__bars {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem 3rem;
        }
        .skill-bar { display: flex; flex-direction: column; gap: 0.5rem; }
        .skill-bar__header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .skill-bar__name {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 600;
          font-size: 0.92rem;
        }
        .skill-bar__icon { font-size: 1.1rem; }
        .skill-bar__pct {
          font-size: 0.8rem;
          font-family: var(--font-mono);
          color: var(--text-muted);
        }
        .skill-bar__track {
          height: 8px;
          background: var(--bg-secondary);
          border-radius: 4px;
          overflow: hidden;
          border: 1px solid var(--border);
        }
        .skill-bar__fill {
          height: 100%;
          border-radius: 4px;
          width: 0;
        }
        /* Icons */
        .skills__icons {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
          gap: 1.25rem;
        }
        .skill-icon {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.6rem;
          cursor: default;
        }
        .skill-icon__circle {
          width: 72px; height: 72px;
          border-radius: var(--radius-md);
          background: var(--bg-card);
          border: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          transition: all var(--transition);
          box-shadow: var(--shadow-card);
        }
        .skill-icon:hover .skill-icon__circle {
          border-color: var(--icon-color, var(--border-hover));
          box-shadow: 0 0 20px color-mix(in srgb, var(--icon-color, var(--accent-1)) 20%, transparent);
        }
        .skill-icon__name {
          font-size: 0.78rem;
          color: var(--text-secondary);
          font-weight: 500;
          text-align: center;
        }
        @media (max-width: 768px) {
          .skills__bars { grid-template-columns: 1fr; }
          .skills__controls { flex-direction: column; align-items: flex-start; }
        }
      `}</style>
    </section>
  )
}

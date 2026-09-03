import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { FiBook, FiBriefcase, FiCode, FiAward } from 'react-icons/fi'

const TIMELINE_ITEMS = [
  {
    id: 1,
    type: 'work',
    icon: <FiCode />,
    title: 'Full Stack Developer',
    organization: 'Alpha Health Group',
    period: 'Sep 2025 — Present',
    description:
      'Developed and maintained NextHealth OS, a web-based healthcare management system. Built system modules for CRAS (College of Royal Aesthetic Sri Lanka). Worked on both frontend and backend using Laravel and PHP. Developed dynamic, responsive UIs using JavaScript, jQuery, AJAX, HTML and CSS. Designed and managed databases using MySQL.',
    tags: ['Laravel', 'PHP', 'JavaScript', 'jQuery', 'MySQL', 'AJAX'],
    color: '#00d4ff',
    current: true,
  },
  {
    id: 2,
    type: 'education',
    icon: <FiBook />,
    title: 'Higher National Diploma in Information Technology',
    organization: 'SLIATE — Sammanthurai',
    period: '2022 — 2025',
    description:
      'Studied software engineering fundamentals including full stack web development, database design, object-oriented programming, system analysis, and software project management.',
    tags: ['Full Stack', 'OOP', 'Database Design', 'System Analysis'],
    color: '#7b2ff7',
    current: false,
  },
  {
    id: 3,
    type: 'work',
    icon: <FiBriefcase />,
    title: 'Administration Assistant',
    organization: 'Makkaiz (Pvt) Ltd',
    period: 'Jan 2023 — Jul 2023',
    description:
      'Assisted in daily administrative tasks and supported smooth office operations. Managed internal documentation, correspondence, and scheduling. Maintained communication records, coordinated with departments, supported front-desk operations and helped organise internal events and reports.',
    tags: ['Administration', 'Documentation', 'Coordination', 'MS Office'],
    color: '#28ca41',
    current: false,
  },
  {
    id: 4,
    type: 'work',
    icon: <FiBriefcase />,
    title: 'Data Entry Operator',
    organization: 'Noble Service (Pvt) Ltd',
    period: 'Jul 2022 — Aug 2023',
    description:
      'Performed high-volume, accurate data entry using spreadsheets and specialised software. Maintained and updated customer and business databases. Conducted routine checks for data consistency, completeness, and accuracy. Ensured timely submission of digital files and followed all data protection policies.',
    tags: ['Data Entry', 'Excel', 'Database', 'Data Validation'],
    color: '#ff9f43',
    current: false,
  },
  {
    id: 5,
    type: 'education',
    icon: <FiAward />,
    title: 'Diploma in English',
    organization: 'SLYC Sainthamaruthu',
    period: 'Mar 2024 — Aug 2024',
    description:
      'Completed an English language diploma focused on professional communication, writing, and presentation skills — strengthening ability to collaborate in international tech environments.',
    tags: ['English', 'Communication', 'Professional Writing'],
    color: '#fd79a8',
    current: false,
  },
]

function TimelineItem({ item, index, inView }) {
  const isLeft = index % 2 === 0
  return (
    <motion.div
      className={`timeline__item ${isLeft ? 'timeline__item--left' : 'timeline__item--right'}`}
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: isLeft ? -50 : 50 }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
      role="listitem"
    >
      {/* Connector dot */}
      <div
        className="timeline__dot"
        style={{ background: item.color, boxShadow: `0 0 16px ${item.color}66` }}
        aria-hidden="true"
      >
        {item.icon}
      </div>

      {/* Card */}
      <motion.div
        className="timeline__card"
        whileHover={{ scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 300 }}
        style={{ '--item-color': item.color }}
      >
        <div className="timeline__card-top">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            <span className="timeline__period">{item.period}</span>
            {item.current && (
              <span className="timeline__badge" aria-label="Currently ongoing">Current</span>
            )}
          </div>
          <span
            className="timeline__type-label"
            style={{ color: item.color }}
          >
            {item.type === 'work' ? 'Work' : item.type === 'education' ? 'Education' : 'Award'}
          </span>
        </div>

        <h3 className="timeline__title">{item.title}</h3>
        <p className="timeline__org">{item.organization}</p>
        <p className="timeline__desc">{item.description}</p>

        <div className="timeline__tags" aria-label="Related technologies">
          {item.tags.map(t => (
            <span key={t} className="tag">{t}</span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

const sectionVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}
const fadeUp = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function Timeline() {
  const sectionRef = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect() } },
      { threshold: 0.08 }
    )
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="timeline" className="section timeline-section" ref={sectionRef} aria-labelledby="timeline-title">
      <div className="container">
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <div className="section-header">
            <motion.span variants={fadeUp} className="section-tag">My journey</motion.span>
            <motion.h2 variants={fadeUp} className="section-title" id="timeline-title">
              Experience & <span className="gradient-text">Education</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="section-subtitle">
              The real-world roles and studies that shaped my skills
            </motion.p>
            <motion.div variants={fadeUp} className="section-divider" aria-hidden="true" />
          </div>

          {/* Legend */}
          <motion.div variants={fadeUp} className="timeline__legend" aria-label="Legend">
            {[
              { color: '#00d4ff', label: 'Work Experience' },
              { color: '#7b2ff7', label: 'Education'       },
              { color: '#fd79a8', label: 'Certification'   },
            ].map(l => (
              <div key={l.label} className="timeline__legend-item">
                <span className="timeline__legend-dot" style={{ background: l.color }} aria-hidden="true" />
                <span>{l.label}</span>
              </div>
            ))}
          </motion.div>

          <div className="timeline__wrapper">
            {/* Animated center line */}
            <div className="timeline__line" aria-hidden="true">
              <motion.div
                className="timeline__line-fill"
                initial={{ scaleY: 0 }}
                animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
                transition={{ duration: 1.8, ease: 'easeOut', delay: 0.2 }}
              />
            </div>

            <ol className="timeline__list" aria-label="Timeline of experience and education">
              {TIMELINE_ITEMS.map((item, i) => (
                <TimelineItem key={item.id} item={item} index={i} inView={inView} />
              ))}
            </ol>
          </div>
        </motion.div>
      </div>

      <style>{`
        .timeline__legend {
          display: flex;
          justify-content: center;
          gap: 1.5rem;
          flex-wrap: wrap;
          margin-bottom: 3rem;
        }
        .timeline__legend-item {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.82rem;
          color: var(--text-secondary);
          font-weight: 500;
        }
        .timeline__legend-dot {
          width: 10px; height: 10px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .timeline__wrapper {
          position: relative;
          max-width: 960px;
          margin: 0 auto;
        }
        .timeline__line {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          top: 0; bottom: 0;
          width: 2px;
          background: var(--border);
          overflow: hidden;
        }
        .timeline__line-fill {
          width: 100%; height: 100%;
          background: var(--accent-gradient);
          transform-origin: top;
        }
        .timeline__list { position: relative; padding-bottom: 2rem; }
        .timeline__item {
          display: flex;
          justify-content: flex-end;
          padding-bottom: 3rem;
          position: relative;
          width: 50%;
        }
        .timeline__item--left {
          left: 0;
          padding-right: 3.5rem;
        }
        .timeline__item--right {
          left: 50%;
          padding-left: 3.5rem;
          justify-content: flex-start;
        }
        .timeline__dot {
          position: absolute;
          right: -18px;
          top: 4px;
          width: 36px; height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-size: 0.9rem;
          z-index: 1;
          border: 3px solid var(--bg-primary);
          transition: transform var(--transition);
        }
        .timeline__item:hover .timeline__dot { transform: scale(1.15); }
        .timeline__item--right .timeline__dot {
          right: auto;
          left: -18px;
        }
        .timeline__card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 1.5rem;
          max-width: 400px;
          width: 100%;
          box-shadow: var(--shadow-card);
          transition: border-color var(--transition), box-shadow var(--transition);
          position: relative;
          overflow: hidden;
        }
        .timeline__card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: var(--item-color, var(--accent-1));
          opacity: 0;
          transition: opacity var(--transition);
        }
        .timeline__card:hover::before { opacity: 1; }
        .timeline__card:hover {
          border-color: var(--item-color, var(--border-hover));
          box-shadow: 0 8px 36px color-mix(in srgb, var(--item-color, var(--accent-1)) 15%, transparent);
        }
        .timeline__card-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 0.6rem;
          flex-wrap: wrap;
          gap: 0.4rem;
        }
        .timeline__period {
          font-size: 0.76rem;
          font-family: var(--font-mono);
          color: var(--text-muted);
        }
        .timeline__badge {
          display: inline-block;
          padding: 0.1rem 0.55rem;
          border-radius: 20px;
          font-size: 0.68rem;
          font-weight: 700;
          background: rgba(40,202,65,0.15);
          color: #28ca41;
          border: 1px solid rgba(40,202,65,0.35);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .timeline__type-label {
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }
        .timeline__title {
          font-size: 1rem;
          font-weight: 700;
          margin-bottom: 0.2rem;
          line-height: 1.35;
        }
        .timeline__org {
          font-size: 0.85rem;
          color: var(--accent-1);
          font-weight: 600;
          margin-bottom: 0.75rem;
        }
        .timeline__desc {
          font-size: 0.86rem;
          color: var(--text-secondary);
          line-height: 1.75;
          margin-bottom: 1rem;
        }
        .timeline__tags { display: flex; flex-wrap: wrap; gap: 0.35rem; }

        /* Mobile: single column */
        @media (max-width: 768px) {
          .timeline__line { left: 17px; }
          .timeline__item,
          .timeline__item--right {
            width: 100%;
            left: 0;
            padding-left: 3.5rem;
            padding-right: 0;
            justify-content: flex-start;
          }
          .timeline__dot,
          .timeline__item--right .timeline__dot {
            right: auto;
            left: 0;
          }
          .timeline__card { max-width: 100%; }
        }
      `}</style>
    </section>
  )
}

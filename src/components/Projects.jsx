import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiGithub, FiExternalLink, FiFolder } from 'react-icons/fi'

const PROJECTS = [
  {
    id: 1,
    title: 'NextHealth OS',
    description:
      'A web-based healthcare management system designed to streamline healthcare and organisational operations. Built and maintained various system modules, dynamic forms, workflows, and data management functionalities.',
    tags: ['Laravel', 'PHP', 'MySQL', 'JavaScript', 'jQuery', 'AJAX'],
    github: 'https://github.com/',
    live: null,
    featured: true,
    color: '#00d4ff',
  },
  {
    id: 2,
    title: 'CRAS — College Management System',
    description:
      'Developed and maintained a web-based management system for the College of Royal Aesthetic Sri Lanka. Built modules and features based on institutional requirements with responsive, user-friendly interfaces.',
    tags: ['Laravel', 'PHP', 'MySQL', 'HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/',
    live: null,
    featured: true,
    color: '#ff2d20',
  },
  {
    id: 3,
    title: 'Clothes Shop Management System',
    description:
      'A front-end system for a clothing shop allowing users to browse items, check availability, and view detailed product information with a clean, interactive UI.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/',
    live: null,
    featured: true,
    color: '#fd79a8',
  },
  {
    id: 4,
    title: 'Bus Booking System',
    description:
      'A Java desktop application for bus reservations with seat selection and route management. Used SQL Workbench (MySQL) for all backend database handling and reporting.',
    tags: ['Java', 'MySQL', 'SQL'],
    github: 'https://github.com/',
    live: null,
    featured: false,
    color: '#ed8b00',
  },
]

const ALL_TAGS = ['All', ...new Set(PROJECTS.flatMap(p => p.tags))]

function ProjectCard({ project, index }) {
  return (
    <motion.article
      className="project-card"
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
      whileHover={{ y: -8 }}
      style={{ '--card-color': project.color }}
      aria-label={`Project: ${project.title}`}
    >
      {/* Top accent bar */}
      <div className="project-card__accent" aria-hidden="true" />

      <div className="project-card__header">
        <FiFolder
          className="project-card__folder-icon"
          style={{ color: project.color }}
          aria-hidden="true"
        />
        <div className="project-card__links">
          {project.github && (
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card__link"
              aria-label={`${project.title} GitHub repository`}
              whileHover={{ scale: 1.2, y: -2 }}
              whileTap={{ scale: 0.9 }}
            >
              <FiGithub aria-hidden="true" />
            </motion.a>
          )}
          {project.live && (
            <motion.a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card__link"
              aria-label={`${project.title} live demo`}
              whileHover={{ scale: 1.2, y: -2 }}
              whileTap={{ scale: 0.9 }}
            >
              <FiExternalLink aria-hidden="true" />
            </motion.a>
          )}
        </div>
      </div>

      <h3 className="project-card__title">{project.title}</h3>
      <p className="project-card__desc">{project.description}</p>

      <div className="project-card__tags" aria-label="Technologies used">
        {project.tags.map(tag => (
          <span key={tag} className="tag">{tag}</span>
        ))}
      </div>
    </motion.article>
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

export default function Projects() {
  const sectionRef = useRef(null)
  const [inView, setInView]   = useState(false)
  const [activeTag, setActive] = useState('All')

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect() } },
      { threshold: 0.1 }
    )
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  const filtered = activeTag === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => p.tags.includes(activeTag))

  return (
    <section id="projects" className="section projects" ref={sectionRef} aria-labelledby="projects-title">
      <div className="container">
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <div className="section-header">
            <motion.span variants={fadeUp} className="section-tag">What I've built</motion.span>
            <motion.h2 variants={fadeUp} className="section-title" id="projects-title">
              My <span className="gradient-text">Projects</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="section-subtitle">
              A selection of things I've built — from full-stack apps to handy tools
            </motion.p>
            <motion.div variants={fadeUp} className="section-divider" aria-hidden="true" />
          </div>

          {/* Tag filters */}
          <motion.div
            variants={fadeUp}
            className="projects__filters"
            role="group"
            aria-label="Filter projects by technology"
          >
            {ALL_TAGS.map(tag => (
              <button
                key={tag}
                className={`projects__filter-btn ${activeTag === tag ? 'projects__filter-btn--active' : ''}`}
                onClick={() => setActive(tag)}
                aria-pressed={activeTag === tag}
              >
                {tag}
              </button>
            ))}
          </motion.div>

          {/* Grid */}
          <motion.div className="projects__grid" layout>
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty state */}
          {filtered.length === 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="projects__empty"
            >
              No projects found for this filter.
            </motion.p>
          )}

          {/* CTA */}
          <motion.div variants={fadeUp} className="projects__cta">
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
            >
              <FiGithub aria-hidden="true" />
              See More on GitHub
            </a>
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        .projects__filters {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 2.5rem;
          justify-content: center;
        }
        .projects__filter-btn {
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
        .projects__filter-btn:hover { color: var(--accent-1); border-color: var(--border-hover); }
        .projects__filter-btn--active {
          background: rgba(0,212,255,0.1);
          border-color: var(--accent-1);
          color: var(--accent-1);
        }
        .projects__grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 1.5rem;
        }
        .project-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 1.75rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          position: relative;
          overflow: hidden;
          box-shadow: var(--shadow-card);
          cursor: default;
          transition: border-color var(--transition), box-shadow var(--transition);
        }
        .project-card:hover {
          border-color: var(--card-color, var(--border-hover));
          box-shadow: 0 8px 40px color-mix(in srgb, var(--card-color, var(--accent-1)) 18%, transparent);
        }
        .project-card__accent {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, var(--card-color, var(--accent-1)), transparent);
          opacity: 0;
          transition: opacity var(--transition);
        }
        .project-card:hover .project-card__accent { opacity: 1; }
        .project-card__header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.25rem;
        }
        .project-card__folder-icon { font-size: 1.8rem; }
        .project-card__links { display: flex; gap: 0.5rem; }
        .project-card__link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 34px; height: 34px;
          border-radius: var(--radius-sm);
          color: var(--text-muted);
          font-size: 1rem;
          border: 1px solid var(--border);
          background: var(--bg-secondary);
          transition: all var(--transition);
        }
        .project-card__link:hover { color: var(--accent-1); border-color: var(--border-hover); }
        .project-card__title {
          font-size: 1.1rem;
          font-weight: 700;
          line-height: 1.3;
        }
        .project-card__desc {
          color: var(--text-secondary);
          font-size: 0.9rem;
          line-height: 1.7;
          flex: 1;
        }
        .project-card__tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          margin-top: 0.25rem;
        }
        .projects__empty {
          text-align: center;
          color: var(--text-muted);
          padding: 3rem 0;
        }
        .projects__cta {
          display: flex;
          justify-content: center;
          margin-top: 3rem;
        }
        @media (max-width: 480px) {
          .projects__grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  )
}

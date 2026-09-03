import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiGithub, FiLinkedin, FiMail, FiSend, FiCheckCircle, FiAlertCircle } from 'react-icons/fi'

const SOCIALS = [
  {
    icon: <FiGithub />,
    label: 'GitHub',
    handle: '@faisdev',
    href: 'https://github.com/',
    color: '#e8eaf6',
  },
  {
    icon: <FiLinkedin />,
    label: 'LinkedIn',
    handle: 'Fais_Ahamed',
    href: 'https://linkedin.com/in/Fais_Ahamed',
    color: '#0a66c2',
  },
  {
    icon: <FiMail />,
    label: 'Email',
    handle: 'faisahamed43@gmail.com',
    href: 'mailto:faisahamed43@gmail.com',
    color: '#00d4ff',
  },
]

function validate(fields) {
  const errs = {}
  if (!fields.name.trim())  errs.name  = 'Name is required'
  if (!fields.email.trim()) errs.email = 'Email is required'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))
    errs.email = 'Please enter a valid email'
  if (!fields.subject.trim()) errs.subject = 'Subject is required'
  if (fields.message.trim().length < 20) errs.message = 'Message must be at least 20 characters'
  return errs
}

function Field({ label, id, error, children }) {
  return (
    <div className="contact__field">
      <label className="contact__label" htmlFor={id}>{label}</label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.span
            className="contact__error"
            role="alert"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
          >
            <FiAlertCircle aria-hidden="true" /> {error}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
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

export default function Contact() {
  const sectionRef = useRef(null)
  const [inView, setInView] = useState(false)

  const [fields, setFields] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect() } },
      { threshold: 0.1 }
    )
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  const handleChange = e => {
    const { name, value } = e.target
    setFields(f => ({ ...f, [name]: value }))
    if (touched[name]) {
      const newErrors = validate({ ...fields, [name]: value })
      setErrors(prev => ({ ...prev, [name]: newErrors[name] }))
    }
  }

  const handleBlur = e => {
    const { name } = e.target
    setTouched(t => ({ ...t, [name]: true }))
    const newErrors = validate(fields)
    setErrors(prev => ({ ...prev, [name]: newErrors[name] }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const allTouched = { name: true, email: true, subject: true, message: true }
    setTouched(allTouched)
    const newErrors = validate(fields)
    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return

    setStatus('sending')
    // Simulate API call — swap for real endpoint
    await new Promise(r => setTimeout(r, 1500))
    setStatus('success')
    setFields({ name: '', email: '', subject: '', message: '' })
    setTouched({})
  }

  return (
    <section id="contact" className="section contact" ref={sectionRef} aria-labelledby="contact-title">
      <div className="container">
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <div className="section-header">
            <motion.span variants={fadeUp} className="section-tag">Get in touch</motion.span>
            <motion.h2 variants={fadeUp} className="section-title" id="contact-title">
              Contact <span className="gradient-text">Me</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="section-subtitle">
              Have a project in mind, or just want to say hi? I'd love to hear from you.
            </motion.p>
            <motion.div variants={fadeUp} className="section-divider" aria-hidden="true" />
          </div>

          <div className="contact__grid">
            {/* Info panel */}
            <motion.div variants={fadeUp} className="contact__info">
              <h3 className="contact__info-heading">Let's build something great together</h3>
              <p className="contact__info-text">
                I'm currently open to internship opportunities, freelance projects, and 
                collaborative work. Whether you have a question or a project brief — my 
                inbox is always open.
              </p>

              <div className="contact__socials" role="list" aria-label="Social links">
                {SOCIALS.map(s => (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact__social"
                    role="listitem"
                    aria-label={`${s.label}: ${s.handle}`}
                    whileHover={{ x: 6 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <span className="contact__social-icon" style={{ color: s.color }} aria-hidden="true">
                      {s.icon}
                    </span>
                    <div className="contact__social-text">
                      <span className="contact__social-label">{s.label}</span>
                      <span className="contact__social-handle">{s.handle}</span>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Form */}
            <motion.div variants={fadeUp} className="contact__form-wrap">
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    className="contact__success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    role="alert"
                    aria-live="polite"
                  >
                    <FiCheckCircle className="contact__success-icon" aria-hidden="true" />
                    <h3>Message Sent!</h3>
                    <p>Thanks for reaching out. I'll get back to you soon.</p>
                    <button
                      className="btn btn-outline"
                      onClick={() => setStatus('idle')}
                    >
                      Send Another
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    className="contact__form"
                    onSubmit={handleSubmit}
                    noValidate
                    aria-label="Contact form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="contact__form-row">
                      <Field label="Your Name" id="name" error={errors.name}>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          className={`contact__input ${errors.name ? 'contact__input--error' : ''}`}
                          placeholder="John Doe"
                          value={fields.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          autoComplete="name"
                          aria-describedby={errors.name ? 'name-error' : undefined}
                          aria-invalid={!!errors.name}
                        />
                      </Field>
                      <Field label="Email Address" id="email" error={errors.email}>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          className={`contact__input ${errors.email ? 'contact__input--error' : ''}`}
                          placeholder="john@example.com"
                          value={fields.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          autoComplete="email"
                          aria-invalid={!!errors.email}
                        />
                      </Field>
                    </div>

                    <Field label="Subject" id="subject" error={errors.subject}>
                      <input
                        id="subject"
                        name="subject"
                        type="text"
                        className={`contact__input ${errors.subject ? 'contact__input--error' : ''}`}
                        placeholder="Let's work together..."
                        value={fields.subject}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        aria-invalid={!!errors.subject}
                      />
                    </Field>

                    <Field label="Message" id="message" error={errors.message}>
                      <textarea
                        id="message"
                        name="message"
                        className={`contact__input contact__textarea ${errors.message ? 'contact__input--error' : ''}`}
                        placeholder="Tell me about your project or just say hi..."
                        rows={5}
                        value={fields.message}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        aria-invalid={!!errors.message}
                      />
                    </Field>

                    <motion.button
                      type="submit"
                      className="btn btn-primary contact__submit"
                      disabled={status === 'sending'}
                      whileHover={status !== 'sending' ? { scale: 1.02 } : {}}
                      whileTap={status !== 'sending' ? { scale: 0.98 } : {}}
                      aria-label={status === 'sending' ? 'Sending message…' : 'Send message'}
                    >
                      {status === 'sending' ? (
                        <>
                          <span className="contact__spinner" aria-hidden="true" />
                          Sending…
                        </>
                      ) : (
                        <>
                          <FiSend aria-hidden="true" />
                          Send Message
                        </>
                      )}
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <style>{`
        .contact__grid {
          display: grid;
          grid-template-columns: 1fr 1.4fr;
          gap: 4rem;
          align-items: start;
        }
        /* Info */
        .contact__info-heading {
          font-size: 1.4rem;
          margin-bottom: 1rem;
          line-height: 1.4;
        }
        .contact__info-text {
          color: var(--text-secondary);
          line-height: 1.8;
          margin-bottom: 2rem;
          font-size: 0.95rem;
        }
        .contact__socials { display: flex; flex-direction: column; gap: 1rem; }
        .contact__social {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          text-decoration: none;
          transition: all var(--transition);
        }
        .contact__social:hover {
          border-color: var(--border-hover);
          box-shadow: var(--shadow-glow);
        }
        .contact__social-icon {
          font-size: 1.4rem;
          flex-shrink: 0;
        }
        .contact__social-text { display: flex; flex-direction: column; }
        .contact__social-label { font-size: 0.78rem; color: var(--text-muted); font-weight: 500; }
        .contact__social-handle { font-size: 0.9rem; color: var(--text-primary); font-weight: 600; }
        /* Form */
        .contact__form-wrap {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 2rem;
        }
        .contact__form { display: flex; flex-direction: column; gap: 1.25rem; }
        .contact__form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; }
        .contact__field { display: flex; flex-direction: column; gap: 0.4rem; }
        .contact__label {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-secondary);
        }
        .contact__input {
          width: 100%;
          padding: 0.7rem 1rem;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border);
          background: var(--bg-input);
          color: var(--text-primary);
          font-family: var(--font-sans);
          font-size: 0.92rem;
          transition: all var(--transition);
          outline: none;
        }
        .contact__input:focus {
          border-color: var(--accent-1);
          box-shadow: 0 0 0 3px rgba(0,212,255,0.12);
        }
        .contact__input--error { border-color: #ff6b6b; }
        .contact__input--error:focus { box-shadow: 0 0 0 3px rgba(255,107,107,0.15); }
        .contact__textarea { resize: vertical; min-height: 120px; }
        .contact__error {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          font-size: 0.78rem;
          color: #ff6b6b;
          font-weight: 500;
        }
        .contact__submit {
          width: 100%;
          justify-content: center;
          padding: 0.85rem;
          font-size: 1rem;
        }
        .contact__submit:disabled { opacity: 0.6; cursor: not-allowed; }
        .contact__spinner {
          width: 16px; height: 16px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin-spinner 0.7s linear infinite;
          display: inline-block;
        }
        @keyframes spin-spinner { to { transform: rotate(360deg); } }
        /* Success */
        .contact__success {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          gap: 1rem;
          padding: 3rem 1rem;
        }
        .contact__success-icon {
          font-size: 3.5rem;
          color: #28ca41;
        }
        .contact__success h3 { font-size: 1.5rem; }
        .contact__success p { color: var(--text-secondary); }
        @media (max-width: 900px) {
          .contact__grid { grid-template-columns: 1fr; }
          .contact__form-row { grid-template-columns: 1fr; }
        }
        @media (max-width: 480px) {
          .contact__form-wrap { padding: 1.25rem; }
        }
      `}</style>
    </section>
  )
}

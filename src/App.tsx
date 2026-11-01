import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronRight,
  Mail,
  Menu,
  X,
} from 'lucide-react'
import { useCallback, useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react'
import {
  contactEmail,
  principles,
  processStages,
  projects,
  services,
  socialLinks,
  toolkit,
  type Project,
} from './portfolioData'
import './App.css'

const currentYear = new Date().getFullYear()

const navigation = [
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'Process', href: '#process' },
  { label: 'About', href: '#about' },
]

function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: reduceMotion ? 0 : 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

function ProjectVisual({ type }: { type: Project['visual'] }) {
  if (type === 'website') {
    return (
      <div className="visual visual-website" aria-label="Website concept preview">
        <div className="website-window">
          <div className="window-bar"><i /><i /><i /><span>north / studio</span></div>
          <div className="website-content">
            <div className="website-nav"><b>FIELDWORK</b><span>Services&nbsp;&nbsp; About&nbsp;&nbsp; Contact</span></div>
            <span className="tiny-label">LOCAL SERVICE · MADE SIMPLE</span>
            <strong>Make room<br />for better.</strong>
            <p>A considered service experience, from first click to finished project.</p>
            <span className="mini-cta">Explore services <ArrowRight size={12} /></span>
            <div className="website-orb" />
          </div>
        </div>
        <span className="concept-stamp">CONCEPT PROJECT</span>
      </div>
    )
  }

  if (type === 'tracking') {
    return (
      <div className="visual visual-tracking" aria-label="Asset tracking app concept preview">
        <div className="asset-phone">
          <div className="phone-notch" />
          <div className="phone-top"><span>9:41</span><span>•••</span></div>
          <span className="tiny-label">DIGIPAHCHAN · ASSETS</span>
          <strong>Good morning,<br />team.</strong>
          <div className="asset-stat"><span>Tracked assets</span><b>248 <small>↗</small></b></div>
          <div className="asset-row"><span className="asset-icon">▦</span><span><b>MacBook Pro</b><small>Office · #DP-0248</small></span><i>Active</i></div>
          <div className="asset-row"><span className="asset-icon">◈</span><span><b>Camera kit</b><small>Studio · #DP-0194</small></span><i>Active</i></div>
          <div className="phone-tabs">⌂　⌕　▦　◉</div>
        </div>
        <div className="scan-float"><span>⌗</span><b>Scan to identify</b><small>QR asset lookup</small></div>
      </div>
    )
  }

  if (type === 'booking') {
    return (
      <div className="visual visual-booking" aria-label="Service booking app concept preview">
        <div className="booking-phone">
          <div className="phone-notch" />
          <div className="phone-top"><span>9:41</span><span>•••</span></div>
          <div className="booking-greeting"><small>MONDAY, OCTOBER 21</small><b>Your day,<br />beautifully planned.</b></div>
          <div className="booking-card"><span>UP NEXT</span><b>Home refresh</b><small>Today · 2:30 PM</small><div className="booking-progress"><i /></div></div>
          <div className="booking-service-title">Explore services</div>
          <div className="booking-tiles"><span>✦<small>Cleaning</small></span><span>⌂<small>Repairs</small></span><span>◌<small>Wellness</small></span></div>
          <div className="phone-tabs">⌂　⌕　▦　◉</div>
        </div>
        <span className="concept-stamp">CONCEPT PROJECT</span>
      </div>
    )
  }

  return (
    <div className="visual visual-marketplace" aria-label="Freelance marketplace app preview">
      <div className="marketplace-phone">
        <div className="phone-notch" />
        <div className="phone-top"><span>9:41</span><span>•••</span></div>
        <div className="market-heading"><span>UNJOB<span className="lime-dot">.</span></span><b>Find your next<br />great opportunity.</b></div>
        <div className="search-pill">⌕ &nbsp; Search gigs and skills</div>
        <div className="phone-section"><b>Popular gigs</b><small>See all&nbsp; →</small></div>
        <div className="gig-card"><span className="gig-icon">✳</span><span><b>Mobile app UI design</b><small>Design · Remote</small><strong>$ 250 – 400</strong></span><i>↗</i></div>
        <div className="gig-card"><span className="gig-icon gig-purple">◈</span><span><b>Build a React website</b><small>Development · Remote</small><strong>$ 500 – 800</strong></span><i>↗</i></div>
        <div className="phone-tabs">⌂　⌕　▦　◉</div>
      </div>
      <div className="float-note"><span className="online-dot" /><b>Made for real work</b><small>Find your next connection</small></div>
    </div>
  )
}

function ProjectDialog({
  project,
  onClose,
}: {
  project: Project
  onClose: () => void
}) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  return (
    <motion.div
      className="dialog-backdrop"
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <motion.section
        className="project-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 18, scale: 0.98 }}
        transition={{ duration: reduceMotion ? 0 : 0.25 }}
      >
        <button ref={closeRef} type="button" className="dialog-close" onClick={onClose} aria-label="Close case study">
          <X size={19} />
        </button>
        <div className="dialog-preview"><ProjectVisual type={project.visual} /></div>
        <div className="dialog-copy">
          <span className="eyebrow">{project.category}{project.concept ? ' · CONCEPT' : ''}</span>
          <h2 id="dialog-title">{project.name}</h2>
          <p>{project.description}</p>
          <h3>My role</h3>
          <p>{project.role}</p>
          <h3>Selected contributions</h3>
          <ul className="dialog-highlights">
            {project.highlights.map((highlight) => <li key={highlight}><Check size={15} />{highlight}</li>)}
          </ul>
          <div className="technology-list">
            {project.technologies.map((technology) => <span key={technology}>{technology}</span>)}
          </div>
        </div>
      </motion.section>
    </motion.div>
  )
}

function App() {
  const reduceMotion = useReducedMotion()
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeProject, setActiveProject] = useState<Project | null>(null)
  const [formStatus, setFormStatus] = useState('')
  const closeProject = useCallback(() => setActiveProject(null), [])
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, skipInitialAnimation: true })

  const handleInquiry = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const name = String(formData.get('name') ?? '').trim()
    const email = String(formData.get('email') ?? '').trim()
    const company = String(formData.get('company') ?? '').trim()
    const service = String(formData.get('service') ?? '')
    const budget = String(formData.get('budget') ?? '')
    const description = String(formData.get('description') ?? '').trim()
    const contactMethod = String(formData.get('contactMethod') ?? '')
    const subject = `Project inquiry: ${service || 'New project'}`
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Business / company: ${company || 'Not provided'}`,
      `Interested in: ${service || 'Not specified'}`,
      `Estimated budget: ${budget || 'Not specified'}`,
      `Preferred contact: ${contactMethod || 'Not specified'}`,
      '',
      'Project details:',
      description,
    ].join('\n')
    window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setFormStatus('Your email app should open with this inquiry ready. It has not been sent yet — review it and press Send in your email app.')
  }

  return (
    <>
      <motion.div className="scroll-progress" style={{ scaleX: progress }} />
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Ayush Kumar home">AK<span>.</span></a>
        <nav id="mobile-navigation" className={menuOpen ? 'main-nav nav-open' : 'main-nav'} aria-label="Main navigation">
          {navigation.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}</a>
          ))}
          <a className="nav-cta" href="#contact" onClick={() => setMenuOpen(false)}>Let&apos;s talk <ArrowUpRight size={14} /></a>
        </nav>
        <button
          type="button"
          className="menu-toggle"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </header>

      <main id="top">
        <section className="hero-section" aria-labelledby="hero-title">
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-glow" aria-hidden="true" />
          <div className="hero-content">
            <motion.div
              className="availability"
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <span className="availability-mark" />
              INDEPENDENT DEVELOPER <i /> PROJECT INQUIRIES WELCOME
            </motion.div>
            <motion.h1
              id="hero-title"
              initial={reduceMotion ? false : 'hidden'}
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: reduceMotion ? 0 : 0.12, delayChildren: 0.16 } },
              }}
            >
              {['I turn business ideas', 'into digital experiences', 'that work.'].map((line) => (
                <span className="headline-line" key={line}>
                  <motion.span
                    variants={{
                      hidden: { y: '110%', opacity: 0 },
                      show: { y: '0%', opacity: 1, transition: { duration: reduceMotion ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] } },
                    }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </motion.h1>
            <motion.p
              className="hero-description"
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.65 }}
            >
              I build beautiful mobile apps and websites that help businesses launch faster, work smarter, and stand out online.
            </motion.p>
            <motion.div
              className="hero-actions"
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <a className="button button-primary" href="#contact">Let&apos;s build something <ArrowUpRight size={17} /></a>
              <a className="button button-quiet" href="#work">Explore my work <ArrowDown size={15} /></a>
            </motion.div>
            <div className="hero-meta"><span>BASED IN INDIA</span><span>FLUTTER · WEB · PRODUCT</span></div>
          </div>
          <motion.div
            className="hero-art"
            initial={reduceMotion ? false : { opacity: 0, x: 28, scale: 0.97 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 0.35, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="art-orbit orbit-one" />
            <div className="art-orbit orbit-two" />
            <div className="art-spark spark-one">✳</div>
            <div className="art-spark spark-two">✳</div>
            <div className="art-label"><span>PRODUCT</span><span>THINKING</span><span>✳</span></div>
            <div className="hero-device">
              <div className="device-top"><span>9:41</span><span>•••</span></div>
              <div className="device-brand">UNJOB<span>.</span></div>
              <div className="device-greeting">Good morning,<br /><b>Alexandra</b></div>
              <div className="device-search">⌕ &nbsp; Find your next gig</div>
              <div className="device-card-title">Picked for you <span>↗</span></div>
              <div className="device-gig"><div className="device-gig-icon">✳</div><div><b>Mobile app design</b><small>Product design · Remote</small></div></div>
              <div className="device-gig"><div className="device-gig-icon icon-violet">◈</div><div><b>Brand identity system</b><small>Creative · Remote</small></div></div>
              <div className="device-tab"><i /><i /><i /><i /></div>
            </div>
            <motion.div className="floating-chip chip-code" animate={reduceMotion ? {} : { y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
              <span>{'{ }'}</span><b>Thoughtful<br />engineering</b>
            </motion.div>
            <motion.div className="floating-chip chip-live" animate={reduceMotion ? {} : { y: [0, 7, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}>
              <span className="live-dot" /><b>Built for<br />real-world use</b>
            </motion.div>
          </motion.div>
          <a className="scroll-cue" href="#services"><span>SCROLL TO EXPLORE</span><i><ArrowDown size={14} /></i></a>
          <div className="hero-index">01 / 06</div>
        </section>

        <section className="trust-strip" aria-label="Experience highlights">
          <p>PRODUCT-MINDED DEVELOPMENT</p>
          <span>FLUTTER</span><b>✳</b><span>FIREBASE</span><b>✳</b><span>WEB EXPERIENCES</span><b>✳</b><span>REAL-WORLD PRODUCTS</span>
        </section>

        <section id="services" className="section services-section">
          <Reveal className="section-heading">
            <div><span className="eyebrow"><i /> WHAT I CAN BUILD</span><h2>Good ideas deserve<br /><em>great execution.</em></h2></div>
            <p>From the first sketch to the first customer, I help turn business needs into digital products people can actually use.</p>
          </Reveal>
          <div className="service-grid">
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <Reveal key={service.number} delay={index * 0.07}>
                  <article className={`service-card ${service.className}`}>
                    <div className="service-card-top"><span>{service.number} / SERVICE</span><Icon size={22} strokeWidth={1.5} /></div>
                    <h3>{service.title}</h3>
                    <p className="service-summary">{service.summary}</p>
                    <ul>{service.details.map((detail) => <li key={detail}><span />{detail}</li>)}</ul>
                    <a href="#contact" className="text-link">Discuss your project <ArrowUpRight size={15} /></a>
                    <div className="service-watermark" aria-hidden="true">{service.number}</div>
                  </article>
                </Reveal>
              )
            })}
          </div>
        </section>

        <section id="work" className="section work-section">
          <Reveal className="section-heading work-heading">
            <div><span className="eyebrow"><i /> SELECTED WORK</span><h2>Built to solve.<br /><em>Made to matter.</em></h2></div>
            <p>A look at production work I contributed to, alongside a couple of clearly marked concepts that show how I approach product design.</p>
          </Reveal>
          <div className="project-grid">
            {projects.map((project, index) => (
              <Reveal key={project.number} delay={index * 0.06}>
                <article className={`project-card project-${project.visual}`}>
                  <button type="button" className="project-open" onClick={() => setActiveProject(project)} aria-label={`View case study: ${project.name}`}>
                    <ProjectVisual type={project.visual} />
                    <span className="project-number">{project.number}</span>
                  </button>
                  <div className="project-info">
                    <div><span className="project-category">{project.category}{project.concept && <b>CONCEPT</b>}</span><h3>{project.name}</h3></div>
                    <button className="project-arrow" type="button" onClick={() => setActiveProject(project)} aria-label={`View case study: ${project.name}`}><ArrowUpRight size={19} /></button>
                    <p>{project.description}</p>
                    <button className="case-link" type="button" onClick={() => setActiveProject(project)}>View case study <ChevronRight size={15} /></button>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
          <div className="work-footnote"><span>✳</span> App previews are illustrative recreations, not supplied product screenshots. Concepts are labeled clearly; production descriptions reflect my contributions, not sole ownership.</div>
        </section>

        <section id="process" className="section process-section">
          <Reveal className="process-intro">
            <span className="eyebrow"><i /> THE WAY I WORK</span>
            <h2>From an idea<br />to a <em>working product.</em></h2>
            <p>A clear path from understanding the problem to getting the product into people&apos;s hands.</p>
            <a href="#contact" className="text-link">Start a conversation <ArrowUpRight size={15} /></a>
          </Reveal>
          <div className="process-list">
            <div className="process-rail"><motion.span initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, ease: 'easeOut' }} /></div>
            {processStages.map((stage, index) => {
              const Icon = stage.icon
              return (
                <motion.article
                  className="process-stage"
                  key={stage.number}
                  initial={reduceMotion ? false : { opacity: 0.35, x: 18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.45 }}
                  transition={{ duration: 0.55, delay: index * 0.04 }}
                >
                  <div className="stage-node"><Icon size={17} /></div>
                  <div className="stage-number">{stage.number}</div>
                  <div className="stage-content"><h3>{stage.title}</h3><p>{stage.description}</p></div>
                  <div className="stage-state">{index === 0 ? 'START HERE' : `STEP 0${index + 1}`}</div>
                </motion.article>
              )
            })}
          </div>
        </section>

        <section id="about" className="section about-section">
          <Reveal className="about-topline"><span className="eyebrow"><i /> A LITTLE ABOUT ME</span><span className="about-coordinate">28° 32&apos; N&nbsp; / &nbsp;77° 23&apos; E</span></Reveal>
          <div className="about-layout">
            <Reveal className="about-visual">
              <div className="about-graphic">
                <div className="graphic-grid" />
                <div className="graphic-circle"><span>AK</span><i /></div>
                <div className="graphic-caption">DESIGN<br />×<br />ENGINEERING</div>
                <span className="graphic-star">✳</span>
                <span className="graphic-coord">BUILT WITH INTENTION · 2026</span>
              </div>
              <div className="about-stat"><strong>1,300<span>+</span></strong><small>DSA problems solved<br />a practice in persistence.</small></div>
            </Reveal>
            <Reveal className="about-copy">
              <h2>Good code matters.<br />So does understanding<br /><em>the business behind it.</em></h2>
              <p>I&apos;m Ayush, a developer focused on building useful digital products for businesses and startups. My experience includes developing production Flutter applications, integrating backend services, and solving real product problems.</p>
              <p>I care about creating software that feels intuitive, performs reliably, and helps businesses move forward.</p>
              <div className="experience-list">
                <div><span>2025 — 2026</span><p><b>Flutter Developer Intern</b><small>UnJob.ai</small></p><ArrowUpRight size={15} /></div>
                <div><span>2025</span><p><b>Freelance Developer</b><small>DigiPahchan</small></p><ArrowUpRight size={15} /></div>
                <div><span>2023 — 2027</span><p><b>B.Tech, Computer Science (Data Science)</b><small>NIET · Expected 2027</small></p><ArrowUpRight size={15} /></div>
              </div>
            </Reveal>
          </div>
          <Reveal className="toolkit">
            <span className="eyebrow">MY TOOLKIT</span>
            <div className="toolkit-list">{toolkit.map((technology, index) => <span key={technology}><i>{String(index + 1).padStart(2, '0')}</i>{technology}</span>)}</div>
          </Reveal>
        </section>

        <section className="section principles-section">
          <Reveal className="principles-heading">
            <span className="eyebrow"><i /> WHAT YOU CAN EXPECT</span>
            <h2>Small details.<br /><em>Thoughtful execution.</em><br />Real solutions.</h2>
          </Reveal>
          <div className="principles-grid">
            {principles.map((principle, index) => (
              <Reveal key={principle.title} delay={index * 0.06}>
                <article className="principle"><span>0{index + 1}</span><h3>{principle.title}</h3><p>{principle.description}</p><div className="principle-line" /></article>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="contact" className="section contact-section">
          <Reveal className="contact-heading">
            <span className="eyebrow"><i /> HAVE A PROJECT IN MIND?</span>
            <h2>Have an idea?<br /><em>Let&apos;s make it real.</em></h2>
            <p>Tell me what you&apos;re building. Whether it&apos;s a mobile app, a business website, or an early-stage startup idea, let&apos;s explore how I can help.</p>
            <a className="contact-email" href={`mailto:${contactEmail}`}><Mail size={17} />{contactEmail}<ArrowUpRight size={15} /></a>
          </Reveal>
          <Reveal className="contact-form-wrap" delay={0.1}>
            <form className="contact-form" onSubmit={handleInquiry}>
              <div className="form-top"><span>PROJECT INQUIRY</span><span>01 — 06</span></div>
              <div className="form-row">
                <label>Your name<input name="name" autoComplete="name" placeholder="Jane Smith" required /></label>
                <label>Email address<input name="email" type="email" autoComplete="email" placeholder="jane@company.com" required /></label>
              </div>
              <label>Business or company <span className="optional">(OPTIONAL)</span><input name="company" autoComplete="organization" placeholder="Your business name" /></label>
              <div className="form-row">
                <label>What do you need?<select name="service" defaultValue="" required><option value="" disabled>Select a service</option><option>Mobile App</option><option>Website</option><option>Startup MVP</option><option>Business Automation</option><option>Other</option></select></label>
                <label>Estimated budget <span className="optional">(OPTIONAL)</span><select name="budget" defaultValue=""><option value="">Choose a range</option><option>Under ₹50,000</option><option>₹50,000 – ₹1,50,000</option><option>₹1,50,000 – ₹5,00,000</option><option>₹5,00,000+</option><option>Not sure yet</option></select></label>
              </div>
              <label>Tell me a little about the project<textarea name="description" rows={3} placeholder="What are you hoping to build or improve?" required /></label>
              <label>Preferred way to reach you<select name="contactMethod" defaultValue="Email"><option>Email</option><option>Phone (add your number in the project details)</option></select></label>
              <button className="button button-primary form-submit" type="submit">Prepare project inquiry <ArrowUpRight size={17} /></button>
              <p className="form-note">This opens your email app with a prepared message. Nothing is sent until you review and send it there.</p>
              <p className="form-status" role="status" aria-live="polite">{formStatus}</p>
            </form>
          </Reveal>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-main">
          <div className="footer-brand"><a className="wordmark" href="#top">AK<span>.</span></a><p>Building digital products<br />for ambitious businesses.</p></div>
          <div className="footer-column"><span>EXPLORE</span><a href="#services">Services</a><a href="#work">Selected work</a><a href="#process">My process</a><a href="#about">About Ayush</a></div>
          <div className="footer-column"><span>LET&apos;S CONNECT</span><a href="#contact">Start a project <ArrowUpRight size={13} /></a><a href={`mailto:${contactEmail}`}>{contactEmail} <ArrowUpRight size={13} /></a>{socialLinks.map((link) => link.href ? <a key={link.label} href={link.href} target="_blank" rel="noreferrer">{link.label} <ArrowUpRight size={13} /></a> : <span className="unlinked-social" key={link.label}>{link.label} profile link coming soon</span>)}</div>
          <a className="back-top" href="#top" aria-label="Back to top"><ArrowUpRight size={19} /></a>
        </div>
        <div className="footer-bottom"><span>© {currentYear} Ayush Kumar</span><span>DESIGNED WITH PURPOSE · BUILT WITH CARE</span><a href="#top">BACK TO TOP ↑</a></div>
      </footer>

      <AnimatePresence>{activeProject && <ProjectDialog project={activeProject} onClose={closeProject} />}</AnimatePresence>
    </>
  )
}

export default App

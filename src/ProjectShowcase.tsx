import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Check, X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import type { Project } from './portfolioData'

export function ProjectVisual({ type }: { type: Project['visual'] }) {
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

export function ProjectDialog({
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
      transition={{ duration: reduceMotion ? 0 : 0.2 }}
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

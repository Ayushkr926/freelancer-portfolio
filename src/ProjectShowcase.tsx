import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Check, X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import type { Project } from './portfolioData'

export function ProjectVisual({ type }: { type: Project['visual'] }) {
  if (type === 'website' || type === 'restaurant' || type === 'cafe' || type === 'pet-store') {
    const websiteConcepts = {
      website: {
        brand: 'FIELDWORK',
        label: 'LOCAL SERVICE · MADE SIMPLE',
        headline: <>Make room<br />for better.</>,
        description: 'A considered service experience, from first click to finished project.',
        action: 'Explore services',
      },
      restaurant: {
        brand: 'SAFFRON TABLE',
        label: 'SEASONAL · LOCAL · MADE WITH CARE',
        headline: <>A seat at<br />our table.</>,
        description: 'Thoughtful plates, warm hospitality, and evenings worth sharing.',
        action: 'View the menu',
      },
      cafe: {
        brand: 'MORROW COFFEE',
        label: 'YOUR NEIGHBORHOOD COFFEE STOP',
        headline: <>A little<br />more slow.</>,
        description: 'Good coffee, fresh pastries, and a cozy place to stay awhile.',
        action: 'Find your cup',
      },
      'pet-store': {
        brand: 'PAW & CO.',
        label: 'GOOD THINGS FOR GOOD PETS',
        headline: <>For the love<br />of paws.</>,
        description: 'Everyday essentials and little joys for the best members of your family.',
        action: 'Shop favorites',
      },
    } as const
    const concept = websiteConcepts[type]

    return (
      <div className={`visual visual-website visual-${type}`} aria-label={`${concept.brand} website concept preview`}>
        <div className="website-window">
          <div className="window-bar"><i /><i /><i /><span>{concept.brand.toLowerCase()}</span></div>
          <div className="website-content">
            <div className="website-nav"><b>{concept.brand}</b><span>Menu&nbsp;&nbsp; Our story&nbsp;&nbsp; Visit</span></div>
            <span className="tiny-label">{concept.label}</span>
            <strong>{concept.headline}</strong>
            <p>{concept.description}</p>
            <span className="mini-cta">{concept.action} <ArrowRight size={12} /></span>
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

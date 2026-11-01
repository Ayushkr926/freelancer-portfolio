import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowDown, ArrowLeft, ArrowUpRight, Mail } from 'lucide-react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { ProjectDialog, ProjectVisual } from './ProjectShowcase'
import { contactEmail, projects, type Project } from './portfolioData'

const filters = ['All projects', 'Mobile apps', 'Web', 'Concepts'] as const
type ProjectFilter = (typeof filters)[number]

export default function ProjectsPage() {
  const [filter, setFilter] = useState<ProjectFilter>('All projects')
  const [activeProject, setActiveProject] = useState<Project | null>(null)
  const reduceMotion = useReducedMotion()
  const closeProject = useCallback(() => setActiveProject(null), [])

  useEffect(() => {
    document.title = 'Selected Projects — Ayush Kumar'
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    if (description) {
      description.content = 'Explore production app development work and clearly labeled concept projects by Ayush Kumar, a freelance Flutter and web developer.'
    }
    return () => {
      document.title = 'Ayush Kumar — Freelance App & Web Developer'
      if (description) {
        description.content = 'Ayush Kumar is an independent Flutter and web developer building mobile apps, websites, and practical digital products for businesses and startups.'
      }
    }
  }, [])

  const filteredProjects = useMemo(() => projects.filter((project) => {
    if (filter === 'Concepts') return project.concept
    if (filter === 'Web') return project.visual === 'website'
    if (filter === 'Mobile apps') return project.visual !== 'website'
    return true
  }), [filter])

  return (
    <div className="projects-page">
      <header className="projects-header">
        <a className="wordmark" href="/" aria-label="Ayush Kumar home">AK<span>.</span></a>
        <nav aria-label="Portfolio navigation">
          <a href="/#services">Services</a>
          <a href="/projects" aria-current="page">Projects</a>
          <a href="/#about">About</a>
        </nav>
        <a className="projects-header-cta" href="/#contact">Start a project <ArrowUpRight size={14} /></a>
      </header>

      <main>
        <section className="projects-hero">
          <div className="projects-hero-grid" aria-hidden="true" />
          <a className="projects-back" href="/"><ArrowLeft size={14} /> Back to portfolio</a>
          <div className="projects-hero-copy">
            <span className="eyebrow"><i /> PROJECT INDEX&nbsp; / &nbsp;{String(projects.length).padStart(2, '0')} PROJECTS</span>
            <h1>A closer look<br />at the <em>work.</em></h1>
            <p>Production app development, thoughtful product concepts, and practical digital experiences — built around real business needs.</p>
            <a href="#project-library" className="projects-scroll">Explore the projects <ArrowDown size={14} /></a>
          </div>
          <div className="projects-hero-art" aria-hidden="true">
            <div className="project-orbit project-orbit-a" />
            <div className="project-orbit project-orbit-b" />
            <div className="project-hero-tile tile-back">02<span>ASSET TRACKING</span></div>
            <div className="project-hero-tile tile-front">01<span>MOBILE PRODUCT</span></div>
            <span className="projects-hero-spark">✳</span>
          </div>
          <span className="projects-hero-index">WORK / 2025—26</span>
        </section>

        <section id="project-library" className="project-library">
          <div className="project-library-heading">
            <div>
              <span className="eyebrow"><i /> SELECTED WORK</span>
              <h2>Built with a purpose.</h2>
            </div>
            <p>Every preview is illustrative. Concepts are labeled, and production work describes my contributions.</p>
          </div>

          <div className="project-filters" role="group" aria-label="Filter projects">
            {filters.map((item) => (
              <button
                type="button"
                key={item}
                aria-pressed={filter === item}
                className={filter === item ? 'project-filter filter-active' : 'project-filter'}
                onClick={() => setFilter(item)}
              >
                {item}
                <span>{item === 'All projects'
                  ? projects.length
                  : item === 'Concepts'
                    ? projects.filter((project) => project.concept).length
                    : item === 'Web'
                      ? projects.filter((project) => project.visual === 'website').length
                      : projects.filter((project) => project.visual !== 'website').length}</span>
              </button>
            ))}
            <span className="filter-result">{String(filteredProjects.length).padStart(2, '0')} RESULTS</span>
          </div>

          <motion.div layout className="all-projects-grid">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.article
                  layout
                  key={project.number}
                  className="all-project-card"
                  initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
                  transition={{ duration: reduceMotion ? 0 : 0.35, delay: reduceMotion ? 0 : index * 0.04 }}
                >
                  <button
                    className="all-project-visual"
                    type="button"
                    onClick={() => setActiveProject(project)}
                    aria-label={`View case study: ${project.name}`}
                  >
                    <ProjectVisual type={project.visual} />
                    <span className="all-project-number">{project.number}</span>
                    <span className="all-project-open" aria-hidden="true"><ArrowUpRight size={18} /></span>
                  </button>
                  <div className="all-project-copy">
                    <div className="all-project-meta">
                      <span>{project.category}</span>
                      {project.concept && <b>CONCEPT</b>}
                    </div>
                    <button className="all-project-title" type="button" onClick={() => setActiveProject(project)}>
                      <span>{project.name}</span><ArrowUpRight size={16} />
                    </button>
                    <p>{project.description}</p>
                    <div className="all-project-tags">
                      {project.technologies.map((technology) => <span key={technology}>{technology}</span>)}
                    </div>
                    <button className="all-project-case" type="button" onClick={() => setActiveProject(project)}>
                      View case study <ArrowUpRight size={14} />
                    </button>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        </section>

        <section className="projects-contact">
          <div>
            <span className="eyebrow"><i /> HAVE SOMETHING IN MIND?</span>
            <h2>Let&apos;s make your<br /><em>next project count.</em></h2>
          </div>
          <div className="projects-contact-action">
            <p>Have an idea that could use a thoughtful digital product? Tell me what you&apos;re working on.</p>
            <a className="button button-primary" href="/#contact">Start a project <ArrowUpRight size={16} /></a>
            <a className="projects-email" href={`mailto:${contactEmail}`}><Mail size={14} /> Or email me directly</a>
          </div>
        </section>
      </main>

      <footer className="projects-footer">
        <a className="wordmark" href="/">AK<span>.</span></a>
        <span>© {new Date().getFullYear()} Ayush Kumar</span>
        <a href="/">BACK TO PORTFOLIO ↑</a>
      </footer>

      <AnimatePresence>
        {activeProject && <ProjectDialog project={activeProject} onClose={closeProject} />}
      </AnimatePresence>
    </div>
  )
}

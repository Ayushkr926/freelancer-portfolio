import type { LucideIcon } from 'lucide-react'
import {
  AppWindow,
  Boxes,
  Braces,
  Code2,
  Layers3,
  Smartphone,
} from 'lucide-react'

export type Project = {
  number: string
  name: string
  category: string
  description: string
  role: string
  technologies: string[]
  concept?: boolean
  visual: 'marketplace' | 'tracking' | 'website' | 'restaurant' | 'cafe' | 'pet-store'
  highlights: string[]
}

export const services: {
  number: string
  title: string
  summary: string
  details: string[]
  icon: LucideIcon
  className: string
}[] = [
  {
    number: '01',
    title: 'Mobile apps',
    summary: 'From a first MVP to a production-ready application.',
    details: [
      'Android & iOS with Flutter',
      'Authentication and onboarding',
      'Firebase, APIs and real-time features',
      'Publishing and ongoing improvements',
    ],
    icon: Smartphone,
    className: 'service-lime',
  },
  {
    number: '02',
    title: 'Web experiences',
    summary: 'Modern websites that make it easier to choose you.',
    details: [
      'Business websites and landing pages',
      'Responsive web applications',
      'Interactive frontend experiences',
      'Backend-connected interfaces',
    ],
    icon: AppWindow,
    className: 'service-violet',
  },
  {
    number: '03',
    title: 'Startup MVPs',
    summary: 'A focused first product, built around what matters.',
    details: [
      'Feature prioritization',
      'User flows and interface implementation',
      'Authentication and database integration',
      'Testing and deployment preparation',
    ],
    icon: Layers3,
    className: 'service-blue',
  },
  {
    number: '04',
    title: 'Business tools',
    summary: 'Replace disconnected manual work with useful tools.',
    details: [
      'QR-based asset tracking',
      'Admin panels and dashboards',
      'Digital records and reporting',
      'Firebase-powered workflows',
    ],
    icon: Boxes,
    className: 'service-orange',
  },
]

export const projects: Project[] = [
  {
    number: '01',
    name: 'UnJob.ai',
    category: 'Production mobile application',
    description:
      'A freelance hiring platform connecting people who need work done with freelancers who can deliver it.',
    role:
      'Flutter Developer Intern. Contributed to production app development, authentication, user profiles, gig posting, user management, real-time chat, API integration, debugging, releases, and maintenance.',
    technologies: ['Flutter', 'Firebase Auth', 'Firestore', 'REST APIs'],
    visual: 'marketplace',
    highlights: [
      'Built and improved Flutter application features.',
      'Worked on authentication, user profiles, and gig posting flows.',
      'Integrated REST APIs and Firebase services, including real-time chat.',
      'Supported debugging, releases, and production maintenance.',
    ],
  },
  {
    number: '02',
    name: 'DigiPahchan',
    category: 'QR-based asset tracking',
    description:
      'A digital asset tracking solution designed to simplify identification, monitoring, and management.',
    role:
      'Freelance Developer. Built Flutter app functionality and worked on Firebase-backed asset workflows.',
    technologies: ['Flutter', 'Firebase', 'Authentication'],
    visual: 'tracking',
    highlights: [
      'Developed Flutter application features for asset management.',
      'Implemented authentication and Firebase integration.',
      'Supported real-time data synchronization and monitoring workflows.',
      'Designed around QR-based asset identification.',
    ],
  },
  {
    number: '03',
    name: 'morrow & thyme',
    category: 'Website design & development',
    description:
      'A restaurant website concept showcasing the menu, atmosphere, and an easy path to reserve a table.',
    role:
      'Concept project exploring responsive restaurant branding, menu presentation, and a reservation journey.',
    technologies: ['React', 'TypeScript', 'Responsive UI'],
    visual: 'restaurant',
    highlights: [
      'Responsive restaurant homepage with clear location and opening details.',
      'Menu highlights designed to make signature dishes easy to explore.',
      'Reservation call to action for a smoother guest journey.',
      'This is a concept project, not commissioned client work.',
    ],
  },
  {
    number: '04',
    name: 'MATCHAO™',
    category: 'Coffee shop website',
    description:
      'A coffee shop website concept built around a warm brand, featured drinks, and visiting the neighborhood cafe.',
    role:
      'Concept project exploring responsive cafe branding, product storytelling, and clear visit information.',
    technologies: ['React', 'TypeScript', 'Responsive UI'],
    concept: false,
    visual: 'cafe',
    highlights: [
      'Warm, responsive layout for a neighborhood coffee shop.',
      'Featured drinks and product highlights.',
      'Prominent location and opening hours for visitors.',
      'This is a concept project, not commissioned client work.',
    ],
  },
  {
    number: '05',
    name: 'Paw & Co.',
    category: 'Pet store website',
    description:
      'A friendly pet store website concept for browsing everyday essentials, discovering top picks, and finding store details.',
    role:
      'Concept project exploring an approachable pet retail experience with product discovery and responsive layouts.',
    technologies: ['React', 'TypeScript', 'Responsive UI'],
    concept: false,
    visual: 'pet-store',
    highlights: [
      'Friendly responsive storefront concept for pet owners.',
      'Featured product categories and popular essentials.',
      'Clear store information and shopping calls to action.',
      'This is a concept project, not commissioned client work.',
    ],
  },
]

export const processStages = [
  {
    number: '01',
    title: 'Discover',
    description:
      'Get clear on the business, its customers, and the problem worth solving.',
    icon: Braces,
  },
  {
    number: '02',
    title: 'Design',
    description:
      'Shape the experience and map the important screens and user flows.',
    icon: Layers3,
  },
  {
    number: '03',
    title: 'Develop',
    description:
      'Build the product, connect the services, and bring core features to life.',
    icon: Code2,
  },
  {
    number: '04',
    title: 'Launch',
    description:
      'Test the experience, prepare deployment, and identify what to improve next.',
    icon: AppWindow,
  },
]

export const principles = [
  {
    title: 'Clear communication',
    description: 'Know what is being built, and why.',
  },
  {
    title: 'Thoughtful design',
    description: 'Make the product intuitive and easy to use.',
  },
  {
    title: 'Reliable development',
    description: 'Focus on maintainable code and dependable functionality.',
  },
  {
    title: 'Collaborative delivery',
    description: 'Share progress, test thoroughly, and improve with feedback.',
  },
]

export const toolkit = [
  'Flutter',
  'Dart',
  'Firebase',
  'Firestore',
  'REST APIs',
  'JavaScript',
  'React',
  'SQL',
  'Git',
  'GitHub',
]

export const contactEmail = 'ayushkr282003@gmail.com'

export const socialLinks = [
  { label: 'GitHub', href: '' },
  { label: 'LinkedIn', href: '' },
  { label: 'LeetCode', href: '' },
]

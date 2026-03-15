import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Logo from '../components/ui/Logo'

const experiences = [
  { to: '/onboarding/login', title: 'Onboarding Experience', desc: 'See the setup flow for new firms and advisors', icon: 'M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z' },
  { to: '/email', title: 'Checking Experience', desc: 'Explore the email digest and R&D tax checking workflow', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
]

const devExperiences = [
  { to: '/mvp-onboarding/login', title: 'MVP Onboarding', desc: 'Scoped-down onboarding flow for initial release', icon: 'M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z' },
]

function ExperienceCard({ card }) {
  return (
    <Link
      to={card.to}
      className="block bg-white rounded-2xl p-8 border border-warmgrey/20 hover:shadow-lg hover:border-gold/40 transition-all text-center"
    >
      <div className="flex justify-center mb-4">
        <svg className="h-10 w-10 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d={card.icon} />
        </svg>
      </div>
      <h2 className="font-serif text-xl font-semibold text-nearblack">{card.title}</h2>
      <p className="text-sm text-charcoal/60 mt-2">{card.desc}</p>
    </Link>
  )
}

export default function Landing() {
  const [devOpen, setDevOpen] = useState(false)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cream px-4">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Logo size="lg" />
      </motion.div>
      <motion.p
        className="font-serif text-lg text-charcoal/70 mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        Proactive tax advisory intelligence
      </motion.p>

      <div className="flex gap-6 max-w-2xl mx-auto mt-12">
        {experiences.map((card, i) => (
          <motion.div
            key={card.to}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + i * 0.15, duration: 0.4 }}
            className="flex-1"
          >
            <ExperienceCard card={card} />
          </motion.div>
        ))}
      </div>

      {/* Development Experiences */}
      <motion.div
        className="w-full max-w-2xl mx-auto mt-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.4 }}
      >
        <button
          onClick={() => setDevOpen(!devOpen)}
          className="flex items-center gap-2 text-sm text-warmgrey hover:text-charcoal transition-colors mx-auto"
        >
          <svg
            className={`h-4 w-4 transition-transform duration-200 ${devOpen ? 'rotate-90' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
          Development Experiences
        </button>
        <AnimatePresence>
          {devOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="flex gap-6 mt-4">
                {devExperiences.map((card) => (
                  <div key={card.to} className="flex-1 max-w-xs">
                    <ExperienceCard card={card} />
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.p
        className="text-xs text-warmgrey mt-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        Internal prototype — March 2026
      </motion.p>
    </div>
  )
}

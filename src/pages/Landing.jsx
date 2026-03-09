import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Logo from '../components/ui/Logo'

export default function Landing() {
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
        {[
          { to: '/onboarding/login', title: 'Onboarding Experience', desc: 'See the setup flow for new firms and advisors', icon: 'M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z' },
          { to: '/email', title: 'Signals Experience', desc: 'Explore the email digest and Atlas signal feed', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
        ].map((card, i) => (
          <motion.div
            key={card.to}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + i * 0.15, duration: 0.4 }}
            className="flex-1"
          >
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
          </motion.div>
        ))}
      </div>

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

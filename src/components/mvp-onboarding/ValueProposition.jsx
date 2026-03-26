import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Logo from '../ui/Logo'
import { Button } from '../ui/Button'

export default function ValueProposition({ onNext }) {
  return (
    <div className="min-h-screen bg-cream flex flex-col items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Link to="/">
          <Logo size="lg" />
        </Link>
      </motion.div>

      <motion.div
        className="w-full max-w-lg mt-12 space-y-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <h1 className="font-serif text-3xl text-nearblack text-center leading-snug">
          Deeper checks on your R&D claims,<br />on demand
        </h1>

        <div className="space-y-4">
          {[
            { icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', text: 'Cross-reference reports against Companies House, CT600s, and management accounts' },
            { icon: 'M13 10V3L4 14h7v7l9-11h-7z', text: 'Catch critical errors, mismatches, and missing information before submission' },
            { icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', text: 'Get results in minutes — review detailed findings in the web dashboard' },
            { icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', text: 'Email your report and supporting files — we do the rest' },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="flex items-start gap-4"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.1, duration: 0.3 }}
            >
              <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center shrink-0 mt-0.5">
                <svg className="w-5 h-5 text-darkgold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                </svg>
              </div>
              <p className="text-charcoal/80 text-[15px] leading-relaxed">{item.text}</p>
            </motion.div>
          ))}
        </div>

        {/* Video placeholder */}
        <motion.div
          className="rounded-xl bg-charcoal/5 border border-warmgrey/20 flex items-center justify-center h-48 cursor-pointer group hover:bg-charcoal/8 transition-colors"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.4 }}
        >
          <div className="text-center">
            <div className="w-14 h-14 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-3 group-hover:bg-gold/30 transition-colors">
              <svg className="w-7 h-7 text-darkgold ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <span className="text-sm text-charcoal/50">See Atlas in action — 1 min demo</span>
          </div>
        </motion.div>

        {/* Security */}
        <motion.div
          className="flex items-center gap-3 bg-white rounded-lg border border-warmgrey/20 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.4 }}
        >
          <svg className="w-5 h-5 text-emerald-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
          </svg>
          <p className="text-sm text-charcoal/70">
            Same enterprise-grade security as Claimer. Your data is encrypted, access-controlled, and never shared.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.3 }}
          className="pt-2"
        >
          <Button onClick={onNext} className="w-full" size="lg">
            Get started — takes 30 seconds
          </Button>
        </motion.div>
      </motion.div>
    </div>
  )
}

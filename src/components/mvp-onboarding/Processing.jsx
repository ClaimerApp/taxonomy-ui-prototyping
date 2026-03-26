import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const STEPS = [
  'Connecting to Companies House...',
  'Analysing report...',
  'Running checks...',
  'Ready!',
]

export default function Processing() {
  const navigate = useNavigate()
  const [completedIndex, setCompletedIndex] = useState(-1)

  useEffect(() => {
    const timers = STEPS.map((_, i) =>
      setTimeout(() => setCompletedIndex(i), (i + 1) * 700),
    )
    const redirect = setTimeout(() => navigate('/app/checks'), 4000)
    return () => {
      timers.forEach(clearTimeout)
      clearTimeout(redirect)
    }
  }, [navigate])

  return (
    <div className="min-h-screen bg-cream flex flex-col items-center justify-center p-4">
      <div className="mb-8">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <circle cx="24" cy="24" r="20" fill="#FFC832" />
          <text
            x="24"
            y="30"
            textAnchor="middle"
            fill="#1A1412"
            fontSize="18"
            fontWeight="bold"
            fontFamily="serif"
          >
            A
          </text>
        </svg>
      </div>

      <h1 className="font-serif text-2xl text-nearblack mb-8">
        Preparing your checks...
      </h1>

      <div className="w-full max-w-sm space-y-3">
        <AnimatePresence>
          {STEPS.map((step, i) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.7, duration: 0.3 }}
              className="flex items-center gap-3"
            >
              {completedIndex >= i ? (
                <motion.svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="text-emerald-600 shrink-0"
                >
                  <path
                    d="M6 10l3 3 5-6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="2" />
                </motion.svg>
              ) : (
                <motion.div
                  className="w-5 h-5 rounded-full border-2 border-gold border-t-transparent shrink-0"
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
                />
              )}
              <span className={completedIndex >= i ? 'text-charcoal' : 'text-warmgrey'}>
                {step}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

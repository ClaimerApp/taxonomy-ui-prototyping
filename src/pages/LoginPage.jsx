import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import Logo from '../components/ui/Logo'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  if (sent) {
    return (
      <div className="min-h-screen bg-cream flex flex-col items-center justify-center p-4">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <Link to="/"><Logo size="lg" /></Link>
        </motion.div>

        <motion.div
          className="w-full max-w-sm mt-12 text-center space-y-4"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center mx-auto">
            <svg className="w-7 h-7 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h1 className="font-serif text-2xl text-nearblack">Check your email</h1>
          <p className="text-charcoal/70 text-sm">
            We've sent a sign-in link to <strong className="text-nearblack">{email}</strong>. It expires in 24 hours.
          </p>
          <button
            onClick={() => setSent(false)}
            className="text-sm text-darkgold hover:underline"
          >
            Use a different email
          </button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream flex flex-col items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <Link to="/"><Logo size="lg" /></Link>
      </motion.div>

      <motion.div
        className="w-full max-w-sm mt-12 space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h1 className="font-serif text-2xl text-nearblack text-center">Sign in to Atlas</h1>

        <div className="space-y-4">
          <Input
            label="Email address"
            type="email"
            placeholder="you@firm.co.uk"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <AnimatePresence>
            {isValid && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <Button onClick={() => setSent(true)} className="w-full">
                  Send magic link
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="relative py-4">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-warmgrey/30" /></div>
          <div className="relative flex justify-center"><span className="bg-cream px-3 text-xs text-warmgrey">or</span></div>
        </div>

        <button className="w-full flex items-center justify-center gap-3 px-4 py-2.5 rounded-lg border border-warmgrey/30 bg-white hover:bg-warmgrey/5 transition-colors">
          <svg className="w-5 h-5" viewBox="0 0 23 23" fill="none">
            <path fill="#f35325" d="M1 1h10v10H1z" />
            <path fill="#81bc06" d="M12 1h10v10H12z" />
            <path fill="#05a6f0" d="M1 12h10v10H1z" />
            <path fill="#ffba08" d="M12 12h10v10H12z" />
          </svg>
          <span className="text-sm font-medium text-charcoal">Sign in with Microsoft</span>
        </button>
        <p className="text-xs text-charcoal/50 text-center">May require approval from your organisation's IT administrator</p>

        <p className="text-xs text-warmgrey text-center pt-4">
          Your session lasts 24 hours for security.
        </p>
      </motion.div>
    </div>
  )
}

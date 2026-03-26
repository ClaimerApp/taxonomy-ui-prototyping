import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function CheckFeedback() {
  const [vote, setVote] = useState(null) // 'up' | 'down'
  const [comment, setComment] = useState('')
  const [submitted, setSubmitted] = useState(false)

  if (submitted) {
    return <p className="text-xs text-emerald-600 mt-2">Feedback sent</p>
  }

  return (
    <div className="mt-3 pt-3 border-t border-warmgrey/15">
      <div className="flex items-center gap-3">
        <span className="text-xs text-charcoal/50">Was this check useful?</span>
        <button
          onClick={() => setVote(v => v === 'up' ? null : 'up')}
          className={`p-1 rounded transition-colors ${
            vote === 'up' ? 'text-emerald-600 bg-emerald-50' : 'text-warmgrey hover:text-charcoal/70'
          }`}
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75 2.25 2.25 0 012.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904m7.723-9.072c.208.085.411.18.608.282" />
          </svg>
        </button>
        <button
          onClick={() => setVote(v => v === 'down' ? null : 'down')}
          className={`p-1 rounded transition-colors ${
            vote === 'down' ? 'text-red-600 bg-red-50' : 'text-warmgrey hover:text-charcoal/70'
          }`}
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.498 15.25H4.372c-1.026 0-1.945-.694-2.054-1.715A12.137 12.137 0 012.25 12c0-2.848.992-5.464 2.649-7.521C5.287 3.997 5.886 3.75 6.504 3.75h4.016a4.5 4.5 0 011.423.23l3.114 1.04a4.5 4.5 0 001.423.23h1.294M7.498 15.25c.618 0 .991.724.725 1.282A7.471 7.471 0 007.5 19.75a2.25 2.25 0 002.25 2.25.75.75 0 00.75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 002.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384" />
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {vote && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="flex items-center gap-2 mt-2">
              <input
                type="text"
                value={comment}
                onChange={e => setComment(e.target.value)}
                placeholder="Brief comment (optional)"
                className="flex-1 px-2.5 py-1 text-xs rounded border border-warmgrey/30 bg-cream focus:outline-none focus:ring-1 focus:ring-gold/50"
              />
              <button
                onClick={() => setSubmitted(true)}
                className="text-xs font-medium text-darkgold hover:underline shrink-0"
              >
                Send
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

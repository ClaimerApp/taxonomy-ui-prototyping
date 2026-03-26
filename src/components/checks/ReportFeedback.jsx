import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function ReportFeedback() {
  const [vote, setVote] = useState(null) // 'yes' | 'no'
  const [comment, setComment] = useState('')
  const [submitted, setSubmitted] = useState(false)

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-4 text-center"
      >
        <p className="text-sm text-emerald-700 font-medium">Thanks for your feedback</p>
      </motion.div>
    )
  }

  return (
    <div className="rounded-xl border border-warmgrey/20 bg-white p-4 space-y-3">
      <p className="text-sm font-medium text-nearblack">Did you find this report useful?</p>
      <div className="flex gap-2">
        <button
          onClick={() => setVote('yes')}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm border transition-colors ${
            vote === 'yes'
              ? 'border-emerald-300 bg-emerald-50 text-emerald-700'
              : 'border-warmgrey/20 text-charcoal/70 hover:bg-warmgrey/10'
          }`}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75 2.25 2.25 0 012.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904m7.723-9.072c.208.085.411.18.608.282" />
          </svg>
          Yes
        </button>
        <button
          onClick={() => setVote('no')}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm border transition-colors ${
            vote === 'no'
              ? 'border-red-300 bg-red-50 text-red-700'
              : 'border-warmgrey/20 text-charcoal/70 hover:bg-warmgrey/10'
          }`}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.498 15.25H4.372c-1.026 0-1.945-.694-2.054-1.715A12.137 12.137 0 012.25 12c0-2.848.992-5.464 2.649-7.521C5.287 3.997 5.886 3.75 6.504 3.75h4.016a4.5 4.5 0 011.423.23l3.114 1.04a4.5 4.5 0 001.423.23h1.294M7.498 15.25c.618 0 .991.724.725 1.282A7.471 7.471 0 007.5 19.75a2.25 2.25 0 002.25 2.25.75.75 0 00.75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 002.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384" />
          </svg>
          No
        </button>
      </div>

      <AnimatePresence>
        {vote && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-2 overflow-hidden"
          >
            <textarea
              value={comment}
              onChange={e => setComment(e.target.value)}
              placeholder="Any additional comments? (optional)"
              rows={2}
              className="w-full px-3 py-2 text-sm rounded-lg border border-warmgrey/30 bg-cream focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold resize-none"
            />
            <button
              onClick={() => setSubmitted(true)}
              className="text-sm font-medium text-darkgold hover:underline"
            >
              Submit feedback
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

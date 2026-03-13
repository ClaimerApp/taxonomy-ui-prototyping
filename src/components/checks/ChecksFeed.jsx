import { useState } from 'react'
import { motion } from 'framer-motion'
import { checkers, fileReviews } from '../../data/checks'
import { CheckFilters } from './CheckFilters'
import { CheckRow } from './CheckRow'
import { CheckerOverviewCard } from './CheckerOverviewCard'

function worstResult(checks) {
  if (checks.some(c => c.result === 'critical')) return 'critical'
  if (checks.some(c => c.result === 'warning')) return 'warning'
  return 'pass'
}

const severityOrder = { critical: 0, warning: 1, pass: 2 }

export default function ChecksFeed() {
  const [activeFilter, setActiveFilter] = useState('All')

  const reviewsWithSeverity = fileReviews.map(review => ({
    ...review,
    worst: worstResult(review.checks),
  }))

  const filtered = reviewsWithSeverity
    .filter(review => {
      if (activeFilter === 'All') return true
      if (activeFilter === 'Critical') return review.worst === 'critical'
      if (activeFilter === 'Warnings') return review.worst === 'warning'
      if (activeFilter === 'Passed') return review.worst === 'pass'
      return true
    })
    .sort((a, b) => {
      const sevDiff = severityOrder[a.worst] - severityOrder[b.worst]
      if (sevDiff !== 0) return sevDiff
      return new Date(b.reviewedAt) - new Date(a.reviewedAt)
    })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-bold text-nearblack">Checkers</h1>
        <p className="text-sm text-charcoal/60 mt-1">Automated review tools that check work before it reaches the partner.</p>
      </div>

      <CheckerOverviewCard checker={checkers[0]} />

      <div className="rounded-xl border border-dashed border-warmgrey/40 p-4 flex items-center justify-center">
        <p className="text-sm text-warmgrey">More checkers coming soon</p>
      </div>

      <div className="space-y-4">
        <h2 className="font-serif text-lg font-semibold text-nearblack">Review Queue</h2>
        <CheckFilters activeFilter={activeFilter} onFilterChange={setActiveFilter} />
        <div className="space-y-3">
          {filtered.length === 0 ? (
            <p className="text-sm text-charcoal/60">No reviews match this filter.</p>
          ) : (
            filtered.map((review, i) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04, duration: 0.3 }}
              >
                <CheckRow review={review} />
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

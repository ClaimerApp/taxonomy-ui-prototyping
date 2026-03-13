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

      <div className="bg-white rounded-xl border border-warmgrey/20 p-4 flex items-start gap-3">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-warmgrey shrink-0 mt-0.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
        </svg>
        <div>
          <p className="text-sm text-charcoal/80">Send a report for review by emailing <span className="font-medium text-nearblack">review@atlas.claimer.com</span></p>
          <p className="text-xs text-warmgrey mt-1">Attach the report as a PDF. You will be emailed the result of the check automatically.</p>
        </div>
      </div>

      <CheckerOverviewCard checker={checkers[0]} />

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

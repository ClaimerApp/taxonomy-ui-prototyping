import { useState } from 'react'
import { motion } from 'framer-motion'
import { signals } from '../../data/signals'
import { SignalFilters } from './SignalFilters'
import { SignalRow } from './SignalRow'

const urgencyOrder = { critical: 0, high: 1, medium: 2, low: 3 }

const statusMap = {
  'New': 'new',
  'In Progress': 'in_progress',
  'Resolved': 'resolved',
}

const categoryMap = {
  'Opportunity': 'opportunity',
  'Value': 'value',
  'Risk': 'risk',
}

function filterSignals(list, filter) {
  if (filter === 'All') return list
  if (statusMap[filter]) return list.filter((s) => s.status === statusMap[filter])
  if (categoryMap[filter]) return list.filter((s) => s.category === categoryMap[filter])
  return list
}

export default function SignalFeed() {
  const [activeFilter, setActiveFilter] = useState('All')

  const filtered = filterSignals(signals, activeFilter).sort(
    (a, b) => urgencyOrder[a.urgency] - urgencyOrder[b.urgency],
  )

  const newCount = signals.filter((s) => s.status === 'new').length

  return (
    <div className="space-y-4">
      <div>
        <h1 className="font-serif text-2xl font-bold text-nearblack">Signals</h1>
        <p className="text-sm text-charcoal/60 mt-1">
          {signals.length} signals &middot; {newCount} new
        </p>
      </div>

      <SignalFilters activeFilter={activeFilter} onFilterChange={setActiveFilter} />

      <div className="space-y-3">
        {filtered.map((signal, i) => (
          <motion.div
            key={signal.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04, duration: 0.3 }}
          >
            <SignalRow signal={signal} />
          </motion.div>
        ))}
        {filtered.length === 0 && (
          <p className="text-sm text-warmgrey text-center py-8">No signals match this filter.</p>
        )}
      </div>
    </div>
  )
}

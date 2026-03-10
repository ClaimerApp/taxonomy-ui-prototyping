import { useState } from 'react'
import { motion } from 'framer-motion'
import { checks } from '../../data/checks'
import { CheckFilters } from './CheckFilters'
import { CheckRow } from './CheckRow'

function worstResult(fileChecks) {
  if (fileChecks.some(c => c.result === 'critical')) return 'critical'
  if (fileChecks.some(c => c.result === 'warning')) return 'warning'
  return 'pass'
}

const severityOrder = { critical: 0, warning: 1, pass: 2 }

export default function ChecksFeed() {
  const [activeFilter, setActiveFilter] = useState('All')

  const filesWithSeverity = checks.map(file => ({
    ...file,
    worst: worstResult(file.checks),
  }))

  const counts = {
    total: filesWithSeverity.length,
    critical: filesWithSeverity.filter(f => f.worst === 'critical').length,
    warning: filesWithSeverity.filter(f => f.worst === 'warning').length,
  }

  const filtered = filesWithSeverity
    .filter(file => {
      if (activeFilter === 'All') return true
      if (activeFilter === 'Critical') return file.worst === 'critical'
      if (activeFilter === 'Warnings') return file.worst === 'warning'
      if (activeFilter === 'Passed') return file.worst === 'pass'
      return true
    })
    .sort((a, b) => {
      const sevDiff = severityOrder[a.worst] - severityOrder[b.worst]
      if (sevDiff !== 0) return sevDiff
      return new Date(b.reviewedAt) - new Date(a.reviewedAt)
    })

  const summaryParts = [`${counts.total} files`]
  if (counts.critical) summaryParts.push(`${counts.critical} critical`)
  if (counts.warning) summaryParts.push(`${counts.warning} warnings`)
  const summary = summaryParts.join(' \u00b7 ')

  return (
    <div className="space-y-4">
      <div>
        <h1 className="font-serif text-2xl font-bold text-nearblack">File Reviews</h1>
        <p className="text-sm text-charcoal/60 mt-1">{summary}</p>
      </div>
      <CheckFilters activeFilter={activeFilter} onFilterChange={setActiveFilter} />
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <p className="text-sm text-charcoal/60">No files match this filter.</p>
        ) : (
          filtered.map((file, i) => (
            <motion.div
              key={file.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04, duration: 0.3 }}
            >
              <CheckRow file={file} />
            </motion.div>
          ))
        )}
      </div>
    </div>
  )
}

import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { cn } from '../../lib/cn'
import { signals as allSignals } from '../../data/signals'
import { entities } from '../../data/entities'
import { SignalFilters } from './SignalFilters'
import { SignalRow } from './SignalRow'

const urgencyOrder = { critical: 0, high: 1, medium: 2, low: 3 }

const relationshipTabs = [
  { key: 'client', label: 'Clients' },
  { key: 'prospect', label: 'Prospects' },
  { key: 'former', label: 'Former' },
]

const entityRelationship = Object.fromEntries(entities.map((e) => [e.id, e.relationship]))

function countSignalsByRelationship(signals) {
  const counts = { client: 0, prospect: 0, former: 0 }
  for (const s of signals) {
    const rel = entityRelationship[s.entityId]
    if (rel && counts[rel] !== undefined) counts[rel]++
  }
  return counts
}

const categoryFilterFn = {
  All: () => true,
  'Critical Warnings': (s) => s.category === 'critical',
  Opportunities: (s) => s.category === 'opportunity',
  Information: (s) => s.category === 'info',
}

const statusFilterFn = {
  'In Progress': (s) => s.status !== 'resolved' && s.status !== 'dismissed',
  Resolved: (s) => s.status === 'resolved',
  Dismissed: (s) => s.status === 'dismissed',
}

export default function SignalFeed() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('client')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState(null)
  const [dismissedIds, setDismissedIds] = useState(new Set())

  const signalsWithDismissed = useMemo(
    () => allSignals.map((s) => (dismissedIds.has(s.id) ? { ...s, status: 'dismissed' } : s)),
    [dismissedIds],
  )

  const tabCounts = useMemo(() => countSignalsByRelationship(signalsWithDismissed), [signalsWithDismissed])

  const filtered = useMemo(() => {
    return signalsWithDismissed
      .filter((s) => entityRelationship[s.entityId] === activeTab)
      .filter(categoryFilterFn[categoryFilter] || (() => true))
      .filter((s) => {
        if (!statusFilter) return true
        return (statusFilterFn[statusFilter] || (() => true))(s)
      })
      .sort((a, b) => urgencyOrder[a.urgency] - urgencyOrder[b.urgency])
  }, [signalsWithDismissed, activeTab, categoryFilter, statusFilter])

  const handleDismiss = (signalId) => {
    setDismissedIds((prev) => new Set([...prev, signalId]))
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold text-nearblack">Signals</h1>
          <p className="text-sm text-charcoal/60 mt-1">
            {allSignals.length} signals &middot; {allSignals.filter((s) => s.status === 'new').length} new
          </p>
        </div>
        <button
          onClick={() => navigate('/app/sensors')}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-gold text-nearblack hover:bg-amber transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add Sensor
        </button>
      </div>

      {/* Primary tabs — relationship type */}
      <div className="flex gap-1 bg-warmgrey/15 rounded-xl p-1 w-fit">
        {relationshipTabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            className={cn(
              'px-4 py-2 text-sm font-medium rounded-lg transition-all',
              activeTab === t.key
                ? 'bg-white text-nearblack shadow-sm'
                : 'text-charcoal/60 hover:text-charcoal',
            )}
          >
            {t.label}
            <span
              className={cn(
                'ml-2 text-xs px-1.5 py-0.5 rounded-full',
                activeTab === t.key ? 'bg-gold/20 text-charcoal' : 'bg-warmgrey/20 text-charcoal/50',
              )}
            >
              {tabCounts[t.key]}
            </span>
          </button>
        ))}
      </div>

      {/* Secondary filters */}
      <SignalFilters
        categoryFilter={categoryFilter}
        statusFilter={statusFilter}
        onCategoryChange={setCategoryFilter}
        onStatusChange={setStatusFilter}
      />

      <div className="space-y-3">
        {filtered.map((signal, i) => (
          <motion.div
            key={signal.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04, duration: 0.3 }}
          >
            <SignalRow signal={signal} onDismiss={handleDismiss} />
          </motion.div>
        ))}
        {filtered.length === 0 && (
          <p className="text-sm text-warmgrey text-center py-8">No signals match this filter.</p>
        )}
      </div>
    </div>
  )
}

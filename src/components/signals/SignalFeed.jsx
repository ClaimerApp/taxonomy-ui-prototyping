import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { signals } from '../../data/signals'
import { entities } from '../../data/entities'
import { SignalFilters } from './SignalFilters'
import { SignalRow } from './SignalRow'

const urgencyOrder = { critical: 0, high: 1, medium: 2, low: 3 }

const primaryFilterFn = {
  'All': () => true,
  'Critical Warnings': (s) => s.category === 'critical',
  'Opportunities': (s) => s.category === 'opportunity',
  'Info': (s) => s.category === 'info',
}

const statusFilterMap = {
  'In Progress': 'in_progress',
  'Resolved': 'resolved',
}

function filterSignals(list, primary, status) {
  let result = list.filter(primaryFilterFn[primary] || (() => true))
  if (status && statusFilterMap[status]) {
    result = result.filter((s) => s.status === statusFilterMap[status])
  }
  return result
}

function groupSignalsByClient(filtered) {
  const groups = {}
  for (const signal of filtered) {
    if (!groups[signal.entityId]) groups[signal.entityId] = []
    groups[signal.entityId].push(signal)
  }
  return Object.entries(groups)
    .map(([entityId, sigs]) => {
      const entity = entities.find((e) => e.id === entityId)
      const bestUrgency = Math.min(...sigs.map((s) => urgencyOrder[s.urgency]))
      return { entityId, name: entity?.name || entityId, signals: sigs, bestUrgency }
    })
    .sort((a, b) => a.bestUrgency - b.bestUrgency)
}

export default function SignalFeed() {
  const navigate = useNavigate()
  const [activeFilter, setActiveFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState(null)
  const [groupByClient, setGroupByClient] = useState(false)

  const filtered = filterSignals(signals, activeFilter, statusFilter).sort(
    (a, b) => urgencyOrder[a.urgency] - urgencyOrder[b.urgency],
  )

  const groups = useMemo(
    () => (groupByClient ? groupSignalsByClient(filtered) : null),
    [groupByClient, filtered],
  )

  const newCount = signals.filter((s) => s.status === 'new').length

  let animIdx = 0

  return (
    <div className="space-y-4">
      <div>
        <h1 className="font-serif text-2xl font-bold text-nearblack">Signals</h1>
        <p className="text-sm text-charcoal/60 mt-1">
          {signals.length} signals &middot; {newCount} new
        </p>
      </div>

      <SignalFilters
        activeFilter={activeFilter}
        statusFilter={statusFilter}
        onFilterChange={setActiveFilter}
        onStatusFilterChange={setStatusFilter}
        groupByClient={groupByClient}
        onGroupByClientChange={setGroupByClient}
      />

      <div className="space-y-3">
        {groupByClient && groups ? (
          groups.map((group) => {
            const headerIdx = animIdx++
            return (
              <div key={group.entityId} className="space-y-3">
                <motion.button
                  onClick={() => navigate(`/app/entities/${group.entityId}`)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: headerIdx * 0.04, duration: 0.3 }}
                  className="w-full flex items-center justify-between px-4 py-2.5 mt-3 first:mt-0 border-b border-warmgrey/30 hover:bg-warmgrey/10 rounded-lg transition-colors group text-left"
                >
                  <span className="font-serif text-lg font-semibold text-nearblack group-hover:text-darkgold transition-colors">
                    {group.name}
                  </span>
                  <span className="text-xs text-charcoal/60 font-medium">
                    {group.signals.length} signal{group.signals.length !== 1 && 's'}
                  </span>
                </motion.button>
                {group.signals.map((signal) => {
                  const i = animIdx++
                  return (
                    <motion.div
                      key={signal.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.04, duration: 0.3 }}
                    >
                      <SignalRow signal={signal} />
                    </motion.div>
                  )
                })}
              </div>
            )
          })
        ) : (
          filtered.map((signal, i) => (
            <motion.div
              key={signal.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04, duration: 0.3 }}
            >
              <SignalRow signal={signal} />
            </motion.div>
          ))
        )}
        {filtered.length === 0 && (
          <p className="text-sm text-warmgrey text-center py-8">No signals match this filter.</p>
        )}
      </div>
    </div>
  )
}

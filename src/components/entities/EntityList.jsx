import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { cn } from '../../lib/cn'
import { entities } from '../../data/entities'
import { signals } from '../../data/signals'
import { Badge } from '../ui/Badge'

const FLAG_MAP = {
  GB: '🇬🇧', IE: '🇮🇪', DE: '🇩🇪', US: '🇺🇸', FR: '🇫🇷',
}

const CURRENT_USER = 'sarah-thompson'

const tabs = [
  { key: 'clients', label: 'Clients' },
  { key: 'prospects', label: 'Prospects' },
  { key: 'former', label: 'Former' },
]

function getOpenSignalCount(entityId) {
  return signals.filter(
    (s) => s.entityId === entityId && (s.status === 'new' || s.status === 'in_progress'),
  ).length
}

export function EntityList() {
  const [activeTab, setActiveTab] = useState('clients')
  const [myOnly, setMyOnly] = useState(false)

  const counts = useMemo(() => ({
    clients: entities.filter((e) => e.relationship === 'client').length,
    prospects: entities.filter((e) => e.relationship === 'prospect').length,
    former: entities.filter((e) => e.relationship === 'former').length,
  }), [])

  const myClientCount = useMemo(
    () => entities.filter((e) => e.relationship === 'client' && e.assignedTo === CURRENT_USER).length,
    [],
  )

  const filtered = useMemo(() => {
    return entities
      .filter((e) => {
        if (activeTab === 'clients') {
          if (e.relationship !== 'client') return false
          return myOnly ? e.assignedTo === CURRENT_USER : true
        }
        if (activeTab === 'prospects') return e.relationship === 'prospect'
        return e.relationship === 'former'
      })
      .map((e) => ({ ...e, openSignals: getOpenSignalCount(e.id) }))
      .sort((a, b) => b.openSignals - a.openSignals)
  }, [activeTab, myOnly])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-bold text-nearblack">Clients</h1>
        <p className="text-sm text-charcoal/60 mt-1">
          {counts.clients} clients &middot; {counts.prospects} prospects
          {counts.former > 0 && <> &middot; {counts.former} former</>}
        </p>
      </div>

      {/* Category tabs */}
      <div className="flex items-center gap-4">
        <div className="flex gap-1 bg-warmgrey/15 rounded-xl p-1">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => { setActiveTab(t.key); if (t.key !== 'clients') setMyOnly(false) }}
              className={cn(
                'px-4 py-2 text-sm font-medium rounded-lg transition-all',
                activeTab === t.key
                  ? 'bg-white text-nearblack shadow-sm'
                  : 'text-charcoal/60 hover:text-charcoal',
              )}
            >
              {t.label}
              <span className={cn(
                'ml-2 text-xs px-1.5 py-0.5 rounded-full',
                activeTab === t.key ? 'bg-gold/20 text-charcoal' : 'bg-warmgrey/20 text-charcoal/50',
              )}>
                {counts[t.key]}
              </span>
            </button>
          ))}
        </div>

        {/* My clients toggle — only visible on clients tab */}
        {activeTab === 'clients' && (
          <button
            onClick={() => setMyOnly((v) => !v)}
            className={cn(
              'flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg border transition-all',
              myOnly
                ? 'border-gold bg-gold/10 text-nearblack'
                : 'border-warmgrey/30 text-charcoal/60 hover:text-charcoal hover:border-warmgrey/50',
            )}
          >
            {/* User icon */}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0" />
            </svg>
            My clients
            <span className={cn(
              'text-xs px-1.5 py-0.5 rounded-full',
              myOnly ? 'bg-gold/20 text-charcoal' : 'bg-warmgrey/20 text-charcoal/50',
            )}>
              {myClientCount}
            </span>
          </button>
        )}
      </div>

      {/* Client list */}
      <div className="space-y-3">
        {filtered.map((entity, i) => {
          const primary = entity.contacts?.[0]
          return (
            <motion.div
              key={entity.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04, duration: 0.3 }}
            >
              <Link
                to={`/app/entities/${entity.id}`}
                className="block bg-white border border-warmgrey/30 rounded-xl p-4 hover:border-gold/50 hover:shadow-sm transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      {entity.country && (
                        <span className="text-base shrink-0">{FLAG_MAP[entity.country] || ''}</span>
                      )}
                      <h3 className="font-serif font-semibold text-nearblack truncate">
                        {entity.name}
                      </h3>
                      {entity.entityType && (
                        <Badge className="shrink-0">{entity.entityType}</Badge>
                      )}
                      {entity.relationship === 'prospect' && (
                        <span className="text-xs text-lavender bg-lavender/20 px-2 py-0.5 rounded-full shrink-0">
                          Prospect
                        </span>
                      )}
                      {entity.relationship === 'former' && (
                        <span className="text-xs text-warmgrey bg-warmgrey/20 px-2 py-0.5 rounded-full shrink-0">
                          Former
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-charcoal/60 mt-0.5 truncate">{entity.sector}</p>
                    {primary && (
                      <p className="text-xs text-warmgrey mt-1">
                        {primary.name} &middot; {primary.role}
                      </p>
                    )}
                  </div>
                  {entity.openSignals > 0 && (
                    <span className="shrink-0 text-xs bg-gold/20 text-charcoal px-2 py-0.5 rounded-full">
                      {entity.openSignals} open
                    </span>
                  )}
                </div>
              </Link>
            </motion.div>
          )
        })}
        {filtered.length === 0 && (
          <p className="text-sm text-warmgrey text-center py-8">No clients match this filter.</p>
        )}
      </div>
    </div>
  )
}

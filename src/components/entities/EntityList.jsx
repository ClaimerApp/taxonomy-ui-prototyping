import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { entities } from '../../data/entities'
import { signals } from '../../data/signals'

export function EntityList() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="font-serif text-2xl font-bold text-nearblack">Entities</h1>
        <p className="text-sm text-charcoal/60 mt-1">
          {entities.length} entities
        </p>
      </div>

      <div className="space-y-3">
        {entities.map((entity, i) => {
          const signalCount = signals.filter((s) => s.entityId === entity.id).length
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
                    <h3 className="font-serif font-semibold text-nearblack truncate">
                      {entity.name}
                    </h3>
                    <p className="text-sm text-charcoal/60 mt-0.5 truncate">{entity.sector}</p>
                    {primary && (
                      <p className="text-xs text-warmgrey mt-1">
                        {primary.name} &middot; {primary.role}
                      </p>
                    )}
                  </div>
                  <span className="shrink-0 text-xs bg-gold/20 text-charcoal px-2 py-0.5 rounded-full">
                    {signalCount} {signalCount === 1 ? 'signal' : 'signals'}
                  </span>
                </div>
              </Link>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

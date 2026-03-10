import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { cn } from '../../lib/cn'
import { signals } from '../../data/signals'
import { Card } from '../ui/Card'
import { Badge } from '../ui/Badge'
import { EntityChecksCard } from './EntityChecksCard'

export function EntitySignalsTab({ entityId }) {
  const entitySignals = signals.filter((s) => s.entityId === entityId)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-3">
        {entitySignals.length === 0 && (
          <Card className="p-8 text-center">
            <svg className="w-8 h-8 text-warmgrey/40 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
            </svg>
            <p className="text-sm text-warmgrey">No active signals</p>
          </Card>
        )}
        {entitySignals.map((signal, i) => (
          <motion.div
            key={signal.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04, duration: 0.3 }}
          >
            <Link to={`/app/signals/${signal.id}`} className="block">
              <Card hover className="p-4">
                <div className="flex items-start gap-3">
                  <Badge variant={signal.category}>{signal.category}</Badge>
                  <div className="min-w-0">
                    <p className="font-semibold text-nearblack">{signal.title}</p>
                    <p className="text-sm text-charcoal/70 mt-1 line-clamp-2">{signal.summary}</p>
                    {signal.impact && (
                      <p className={cn('text-sm font-medium mt-2', signal.category === 'opportunity' ? 'text-emerald-700' : 'text-orange-700')}>
                        {signal.impact}
                      </p>
                    )}
                  </div>
                </div>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
      <div>
        <EntityChecksCard entityId={entityId} />
      </div>
    </div>
  )
}

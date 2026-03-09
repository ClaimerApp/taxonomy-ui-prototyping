import { Link } from 'react-router-dom'
import { cn } from '../../lib/cn'
import { Badge } from '../ui/Badge'
import { entities } from '../../data/entities'

const urgencyColors = {
  critical: 'bg-red-500',
  high: 'bg-orange-400',
  medium: 'bg-amber-400',
  low: 'bg-warmgrey',
}

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const hours = Math.floor(diff / 3600000)
  if (hours < 1) return 'just now'
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  return `${days}d ago`
}

export function SignalRow({ signal }) {
  const entity = entities.find((e) => e.id === signal.entityId)
  return (
    <Link
      to={`/app/signals/${signal.id}`}
      className={cn(
        'flex items-stretch bg-white rounded-xl border border-warmgrey/20 overflow-hidden hover:shadow-md transition-all group',
        signal.urgency === 'critical' && 'border-red-200 bg-red-50/50',
      )}
    >
      <div className={cn('w-1 rounded-l shrink-0', urgencyColors[signal.urgency])} />

      <div className="flex-1 p-4 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <Badge variant={signal.category}>{signal.category}</Badge>
          <span className="text-xs text-warmgrey">{timeAgo(signal.detectedAt)}</span>
        </div>

        <h3 className="font-serif text-lg font-semibold text-nearblack">{signal.title}</h3>
        <p className="text-sm text-charcoal/70">{entity?.name || signal.entityId}</p>
        <p className="text-sm text-charcoal/60 line-clamp-2 mt-1">{signal.summary}</p>

        {signal.impact && (
          <p
            className={cn(
              'text-sm font-medium mt-2',
              signal.category === 'opportunity' ? 'text-emerald-700' : 'text-orange-700',
            )}
          >
            {signal.impact}
          </p>
        )}
      </div>

      <div className="flex items-center pr-4 text-warmgrey group-hover:text-charcoal transition-colors">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  )
}

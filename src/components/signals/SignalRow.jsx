import { Link } from 'react-router-dom'
import { cn } from '../../lib/cn'
import { Badge } from '../ui/Badge'
import { Tooltip } from '../ui/Tooltip'
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

function parseTitle(title, entityName) {
  // Strip entity name from existing title patterns like "Title — Entity" or "Title — Prospect: Entity"
  const cleaned = title
    .replace(new RegExp(`\\s*[—–-]\\s*(Prospect:\\s*)?${entityName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*$`, 'i'), '')
    .replace(new RegExp(`^${entityName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*[—–-]\\s*`, 'i'), '')
  return cleaned
}

export function SignalRow({ signal, onDismiss }) {
  const entity = entities.find((e) => e.id === signal.entityId)
  const entityName = entity?.name || signal.entityId
  const cleanTitle = parseTitle(signal.title, entityName)

  return (
    <div
      className={cn(
        'flex items-stretch bg-white rounded-xl border border-warmgrey/20 overflow-hidden hover:shadow-md transition-all group',
        signal.urgency === 'critical' && 'border-red-200 bg-red-50/50',
        signal.status === 'dismissed' && 'opacity-50',
      )}
    >
      <Link
        to={`/app/signals/${signal.id}`}
        className="flex items-stretch flex-1 min-w-0"
      >
        <div className={cn('w-1 rounded-l shrink-0', urgencyColors[signal.urgency])} />

        <div className="flex-1 p-4 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Badge variant={signal.category}>{signal.category}</Badge>
            <span className="text-xs text-warmgrey">{timeAgo(signal.detectedAt)}</span>
          </div>

          <h3 className="font-serif text-lg font-semibold text-nearblack">
            <span className="font-medium text-charcoal/60">{entityName}:</span>{' '}
            {cleanTitle}
          </h3>
          <p className="text-sm text-charcoal/60 line-clamp-2 mt-1">{signal.summary}</p>

          {signal.impact && (
            <p
              className={cn(
                'text-sm font-medium mt-2',
                signal.category === 'opportunity' ? 'text-emerald-700' : signal.category === 'critical' ? 'text-red-700' : 'text-orange-700',
              )}
            >
              {signal.impact}
            </p>
          )}
        </div>
      </Link>

      <div className="flex items-center gap-2 pr-4">
        {onDismiss && signal.status !== 'dismissed' && (
          <Tooltip content="Dismiss signal" placement="left">
            <button
              onClick={(e) => {
                e.preventDefault()
                onDismiss(signal.id)
              }}
              className="p-1.5 rounded-lg text-warmgrey hover:text-charcoal hover:bg-warmgrey/20 transition-colors opacity-0 group-hover:opacity-100"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0-3-3m3 3 3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
              </svg>
            </button>
          </Tooltip>
        )}
        <Link
          to={`/app/signals/${signal.id}`}
          className="text-warmgrey group-hover:text-charcoal transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  )
}

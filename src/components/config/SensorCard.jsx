import { useState } from 'react'
import { Card } from '../ui/Card'
import { Toggle } from '../ui/Toggle'
import { Tooltip } from '../ui/Tooltip'
import { sources } from '../../data/sensors'
import { cn } from '../../lib/cn'

const sourceIcons = {
  'companies-house': (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      {/* Crown top */}
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 8l2-4 2 2.5L12 4l2 2.5L16 4l2 4" />
      <rect x="6" y="8" width="12" height="2.5" rx="0.5" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth={1} />
      {/* Building columns */}
      <path strokeLinecap="round" d="M7.5 10.5v8M10.5 10.5v8M13.5 10.5v8M16.5 10.5v8" />
      {/* Base */}
      <rect x="5.5" y="18.5" width="13" height="2" rx="0.5" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth={1} />
    </svg>
  ),
  hmrc: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      {/* Pediment triangle */}
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 11l8-6 8 6" />
      <path d="M5 11h14" strokeLinecap="round" />
      {/* Columns */}
      <path strokeLinecap="round" d="M7 11v7.5M10 11v7.5M14 11v7.5M17 11v7.5" />
      {/* Entablature */}
      <rect x="5" y="9.5" width="14" height="1.5" rx="0.3" fill="currentColor" opacity="0.12" stroke="none" />
      {/* Base platform */}
      <rect x="4" y="18.5" width="16" height="2" rx="0.5" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth={1} />
    </svg>
  ),
  accounting: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      {/* Book cover */}
      <rect x="4" y="3" width="14" height="18" rx="1.5" stroke="currentColor" strokeWidth={1.5} />
      {/* Spine */}
      <path d="M4 3h2v18H4" fill="currentColor" opacity="0.15" />
      <line x1="6" y1="3" x2="6" y2="21" stroke="currentColor" strokeWidth={1} />
      {/* Ledger lines */}
      <path strokeLinecap="round" d="M8.5 8h7M8.5 11h7M8.5 14h7M8.5 17h4" strokeWidth={1} opacity="0.6" />
      {/* Numbers */}
      <text x="14" y="8.5" fontSize="3.5" fill="currentColor" opacity="0.5" fontFamily="sans-serif" stroke="none">$</text>
    </svg>
  ),
  payroll: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      {/* Person head */}
      <circle cx="10" cy="7" r="3" stroke="currentColor" strokeWidth={1.5} />
      {/* Person body */}
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 19.5c0-3.5 2.7-6 6-6s6 2.5 6 6" />
      {/* Coin/money */}
      <circle cx="18" cy="9" r="4" stroke="currentColor" strokeWidth={1.2} fill="currentColor" opacity="0.1" />
      <text x="18" y="10.8" fontSize="5" fill="currentColor" opacity="0.7" fontFamily="sans-serif" textAnchor="middle" stroke="none">&pound;</text>
    </svg>
  ),
  grants: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      {/* Lightbulb */}
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 21h6M10 17.5h4M12 3a6 6 0 0 0-4 10.5c.5.7.8 1.2 1 2h6c.2-.8.5-1.3 1-2A6 6 0 0 0 12 3Z" />
      <path d="M12 3a6 6 0 0 0-4 10.5c.5.7.8 1.2 1 2h6c.2-.8.5-1.3 1-2A6 6 0 0 0 12 3Z" fill="currentColor" opacity="0.08" stroke="none" />
      {/* Filament rays */}
      <path strokeLinecap="round" d="M12 7v3M10 9h4" strokeWidth={1.2} opacity="0.5" />
    </svg>
  ),
  gazette: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      {/* Newspaper body */}
      <rect x="3" y="4" width="15" height="17" rx="1.5" stroke="currentColor" strokeWidth={1.5} />
      {/* Fold/second sheet */}
      <path d="M18 8h2.5a1.5 1.5 0 0 1 1.5 1.5V19a2 2 0 0 1-2 2h-1" stroke="currentColor" strokeWidth={1.2} />
      {/* Headline block */}
      <rect x="5.5" y="6.5" width="10" height="3" rx="0.5" fill="currentColor" opacity="0.12" stroke="none" />
      {/* Text lines */}
      <path strokeLinecap="round" d="M5.5 12h10M5.5 14.5h10M5.5 17h6" strokeWidth={1} opacity="0.5" />
    </svg>
  ),
  pensions: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      {/* Shield */}
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l8 3.5v5c0 5.25-3.5 9.5-8 11-4.5-1.5-8-5.75-8-11v-5L12 3Z" />
      <path d="M12 3l8 3.5v5c0 5.25-3.5 9.5-8 11-4.5-1.5-8-5.75-8-11v-5L12 3Z" fill="currentColor" opacity="0.08" stroke="none" />
      {/* Umbrella inside shield */}
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9c-3 0-5 2.5-5 2.5h10S15 9 12 9Z" strokeWidth={1.2} />
      <path strokeLinecap="round" d="M12 11.5v4.5M12 16c0 1 .8 1.5 1.5 1.5" strokeWidth={1.2} />
    </svg>
  ),
  email: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      {/* Envelope body */}
      <rect x="2.5" y="5.5" width="19" height="13" rx="2" stroke="currentColor" strokeWidth={1.5} />
      <rect x="2.5" y="5.5" width="19" height="13" rx="2" fill="currentColor" opacity="0.06" stroke="none" />
      {/* Flap V */}
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 6.5l9 6.5 9-6.5" />
      {/* Bottom fold lines */}
      <path strokeLinecap="round" d="M3 17.5l6-4.5M21 17.5l-6-4.5" strokeWidth={1} opacity="0.3" />
    </svg>
  ),
}

const sourceAbbreviations = {
  'companies-house': 'CH',
  hmrc: 'HMRC',
  accounting: 'Xero',
  payroll: 'Pay',
  grants: 'Grant',
  gazette: 'Gaz',
  pensions: 'TPR',
  email: 'Mail',
}

function SourceBadge({ sourceId, connected }) {
  const source = sources.find((s) => s.id === sourceId)
  if (!source) return null

  return (
    <Tooltip
      content={
        <span>
          <span className="font-medium">{source.name}</span>
          <span className={connected ? 'text-emerald-300' : 'text-warmgrey'}>
            {' — '}{connected ? 'Connected' : 'Not connected'}
          </span>
        </span>
      }
    >
      <span
        className={cn(
          'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium border transition-colors',
          connected
            ? 'text-charcoal border-warmgrey/40 bg-white opacity-100'
            : 'text-warmgrey border-warmgrey/15 bg-warmgrey/5 opacity-50'
        )}
      >
        <span className="shrink-0">{sourceIcons[sourceId]}</span>
        <span className="leading-none">{sourceAbbreviations[sourceId] || source.abbr}</span>
      </span>
    </Tooltip>
  )
}

export function SensorCard({ sensor }) {
  const [enabled, setEnabled] = useState(sensor.enabled)

  const categoryColors = {
    opportunity: 'bg-emerald-400',
    critical: 'bg-red-400',
    info: 'bg-blue-400',
  }

  return (
    <Card className="p-4 space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-2.5 min-w-0">
          <span className={cn('mt-1.5 w-2 h-2 rounded-full shrink-0', categoryColors[sensor.category] || 'bg-warmgrey')} />
          <h3 className="font-semibold text-nearblack text-sm leading-snug">{sensor.name}</h3>
        </div>
        <Toggle enabled={enabled} onToggle={() => setEnabled(!enabled)} />
      </div>
      <p className="text-sm text-charcoal/70 leading-relaxed">{sensor.description}</p>
      <div className="flex flex-wrap items-center gap-1.5">
        {sensor.sourceIds.map((sid) => (
          <SourceBadge
            key={sid}
            sourceId={sid}
            connected={sensor.connectedSourceIds.includes(sid)}
          />
        ))}
      </div>
      <div className="text-xs text-warmgrey pt-0.5">
        {sensor.signalCount > 0 && <span>{sensor.signalCount} signals</span>}
        {sensor.signalCount > 0 && sensor.lastTriggered && <span> · </span>}
        {sensor.lastTriggered && <span>Last: {sensor.lastTriggered}</span>}
        {!sensor.signalCount && !sensor.lastTriggered && <span>Not yet triggered</span>}
      </div>
    </Card>
  )
}

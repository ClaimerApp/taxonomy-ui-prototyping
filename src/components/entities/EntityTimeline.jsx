import { useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/cn'

const typeConfig = {
  signal:        { bg: 'bg-gold/20',    text: 'text-gold',       icon: 'bell' },
  filing:        { bg: 'bg-slate-100',  text: 'text-slate-500',  icon: 'document' },
  hmrc:          { bg: 'bg-orange-100', text: 'text-orange-600', icon: 'banknotes' },
  deadline:      { bg: 'bg-orange-100', text: 'text-orange-600', icon: 'clock' },
  engagement:    { bg: 'bg-green-100',  text: 'text-green-600',  icon: 'chat' },
  communication: { bg: 'bg-blue-100',   text: 'text-blue-600',   icon: 'envelope' },
  milestone:     { bg: 'bg-slate-100',  text: 'text-slate-500',  icon: 'flag' },
  gazette:       { bg: 'bg-red-100',    text: 'text-red-600',    icon: 'newspaper' },
  admin:         { bg: 'bg-slate-100',  text: 'text-slate-500',  icon: 'cog' },
}

const sourceBadge = {
  private:  'bg-charcoal/10 text-charcoal/70',
  public:   'bg-blue-50 text-blue-700',
  hmrc:     'bg-orange-50 text-orange-700',
  deadline: 'bg-orange-50 text-orange-700',
}

function TypeIcon({ type }) {
  const cfg = typeConfig[type] || typeConfig.admin
  const iconClass = 'w-4 h-4'

  const icons = {
    bell: (
      <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
      </svg>
    ),
    document: (
      <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
      </svg>
    ),
    banknotes: (
      <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
      </svg>
    ),
    clock: (
      <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
    chat: (
      <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
      </svg>
    ),
    envelope: (
      <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
      </svg>
    ),
    flag: (
      <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v1.5M3 21v-6m0 0 2.77-.693a9 9 0 0 1 6.208.682l.108.054a9 9 0 0 0 6.086.71l3.114-.732a48.524 48.524 0 0 1-.005-10.499l-3.11.732a9 9 0 0 1-6.085-.711l-.108-.054a9 9 0 0 0-6.208-.682L3 4.5M3 15V4.5" />
      </svg>
    ),
    newspaper: (
      <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6V7.5Z" />
      </svg>
    ),
    cog: (
      <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      </svg>
    ),
  }

  return (
    <div className={cn('w-8 h-8 rounded-full flex items-center justify-center shrink-0', cfg.bg, cfg.text)}>
      {icons[cfg.icon]}
    </div>
  )
}

const sourceFilters = [
  { key: 'all', label: 'All' },
  { key: 'private', label: 'Private' },
  { key: 'public', label: 'Public' },
  { key: 'hmrc', label: 'HMRC' },
  { key: 'deadline', label: 'Deadlines' },
]

export function EntityTimeline({ timeline, showFilters = false }) {
  const [sourceFilter, setSourceFilter] = useState('all')

  if (!timeline?.length) return null

  const today = new Date().toISOString().slice(0, 10)

  const sorted = [...timeline].sort((a, b) => {
    const aFuture = a.date > today
    const bFuture = b.date > today
    if (aFuture && !bFuture) return -1
    if (!aFuture && bFuture) return 1
    if (aFuture && bFuture) return a.date.localeCompare(b.date)
    return b.date.localeCompare(a.date)
  })

  const filtered = sourceFilter === 'all'
    ? sorted
    : sorted.filter((item) => item.source === sourceFilter)

  let lastDate = null

  return (
    <div>
      {showFilters && (
        <div className="flex gap-2 mb-4">
          {sourceFilters.map((f) => (
            <button
              key={f.key}
              onClick={() => setSourceFilter(f.key)}
              className={cn(
                'px-3 py-1 text-xs font-medium rounded-full transition-colors',
                sourceFilter === f.key
                  ? 'bg-nearblack text-cream'
                  : 'bg-warmgrey/15 text-charcoal/60 hover:text-charcoal',
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      )}

      <div>
        {filtered.map((item, i) => {
          const isFuture = item.date > today
          const isLast = i === filtered.length - 1
          const showDateHeader = item.date !== lastDate
          lastDate = item.date

          return (
            <motion.div
              key={`${item.date}-${item.event}-${i}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04, duration: 0.3 }}
            >
              {showDateHeader && (
                <p className={cn(
                  'text-xs font-medium mb-1 pl-11',
                  i === 0 ? 'mt-0' : 'mt-4',
                  isFuture ? 'text-orange-600' : 'text-warmgrey',
                )}>
                  {formatDate(item.date)}
                  {isFuture && ' — upcoming'}
                </p>
              )}
              <div className={cn('flex gap-3', isFuture && 'opacity-80')}>
                {/* Icon column with connector line */}
                <div className="relative flex flex-col items-center">
                  <TypeIcon type={item.type} />
                  {!isLast && (
                    <div className={cn(
                      'flex-1 w-px mt-1',
                      isFuture
                        ? 'border-l border-dashed border-orange-300'
                        : 'bg-warmgrey/30',
                    )} />
                  )}
                </div>
                {/* Content */}
                <div className={cn('min-w-0 flex-1 pb-4', isLast && 'pb-0')}>
                  <div className="flex items-start gap-2">
                    <div className="min-w-0 flex-1">
                      <p className={cn('text-sm', isFuture ? 'text-orange-800' : 'text-charcoal')}>
                        {item.event}
                      </p>
                      {item.detail && (
                        <p className="text-xs text-warmgrey mt-0.5">{item.detail}</p>
                      )}
                    </div>
                    {item.source && (
                      <span className={cn(
                        'text-[10px] font-medium px-1.5 py-0.5 rounded-full shrink-0',
                        sourceBadge[item.source] || sourceBadge.private,
                      )}>
                        {item.source}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

function formatDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

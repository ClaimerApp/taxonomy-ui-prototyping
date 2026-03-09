import { cn } from '../../lib/cn'

const typeColors = {
  signal: 'bg-gold',
  email: 'bg-blue-400',
  filing: 'bg-slate-400',
  import: 'bg-green-400',
  milestone: 'bg-slate-400',
  admin: 'bg-slate-400',
  hmrc: 'bg-orange-400',
  gazette: 'bg-red-400',
  transaction: 'bg-slate-400',
  engagement: 'bg-green-400',
}

export function EntityTimeline({ timeline }) {
  if (!timeline?.length) return null

  return (
    <div className="relative pl-6">
      <div className="absolute left-2 top-1 bottom-1 w-px bg-warmgrey/30" />
      <div className="space-y-4">
        {timeline.map((item, i) => (
          <div key={i} className="relative">
            <div
              className={cn(
                'absolute -left-4 top-1 h-2.5 w-2.5 rounded-full ring-2 ring-white',
                typeColors[item.type] || 'bg-warmgrey',
              )}
            />
            <p className="text-xs text-warmgrey">{item.date}</p>
            <p className="text-sm text-charcoal">{item.event}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

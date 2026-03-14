import { cn } from '../../lib/cn'

export function ExternalRecord({ source, sourceUrl, records }) {
  return (
    <div className="bg-warmgrey/5 rounded-lg p-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs font-medium text-charcoal/70">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
          </svg>
          {source}
        </div>
        {sourceUrl && (
          <a href={sourceUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-darkgold hover:underline">
            View source →
          </a>
        )}
      </div>

      <div className="mt-2 space-y-1.5">
        {Object.entries(records).map(([key, value]) => (
          <div key={key} className="flex">
            <span className="text-xs text-charcoal/50 w-36 shrink-0">{key}</span>
            <span className={cn(
              'text-sm',
              value?.startsWith?.('Active') ? 'text-emerald-700' :
              (value?.includes?.('None') || value?.startsWith?.('No ')) ? 'text-charcoal/50 italic' :
              'text-nearblack'
            )}>
              {value}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

import { cn } from '../../lib/cn'

const categoryFilters = ['All', 'Critical Warnings', 'Opportunities', 'Information']
const statusFilters = ['In Progress', 'Resolved', 'Dismissed']

export function SignalFilters({ categoryFilter, statusFilter, onCategoryChange, onStatusChange }) {
  return (
    <div className="flex gap-2 items-center flex-wrap">
      {categoryFilters.map((filter) => (
        <button
          key={filter}
          onClick={() => {
            onCategoryChange(filter)
            onStatusChange(null)
          }}
          className={cn(
            'px-3 py-1.5 text-sm rounded-lg transition-colors',
            categoryFilter === filter && !statusFilter
              ? 'bg-charcoal text-cream'
              : 'text-charcoal hover:bg-warmgrey/20',
          )}
        >
          {filter}
        </button>
      ))}

      <div className="w-px h-5 bg-warmgrey/30" />

      {statusFilters.map((filter) => (
        <button
          key={filter}
          onClick={() => {
            onStatusChange(statusFilter === filter ? null : filter)
            onCategoryChange('All')
          }}
          className={cn(
            'px-3 py-1.5 text-sm rounded-lg transition-colors',
            statusFilter === filter
              ? 'bg-charcoal text-cream'
              : 'text-charcoal hover:bg-warmgrey/20',
          )}
        >
          {filter}
        </button>
      ))}
    </div>
  )
}

import { cn } from '../../lib/cn'

const statusFilters = ['All', 'New', 'In Progress', 'Resolved']
const categoryFilters = ['Opportunity', 'Value', 'Risk']

export function SignalFilters({ activeFilter, onFilterChange }) {
  return (
    <div className="flex gap-2 items-center">
      {statusFilters.map((filter) => (
        <button
          key={filter}
          onClick={() => onFilterChange(filter)}
          className={cn(
            'px-3 py-1.5 text-sm rounded-lg transition-colors',
            activeFilter === filter
              ? 'bg-charcoal text-cream'
              : 'text-charcoal hover:bg-warmgrey/20',
          )}
        >
          {filter}
        </button>
      ))}

      <div className="border-r border-warmgrey/30 h-6" />

      {categoryFilters.map((filter) => (
        <button
          key={filter}
          onClick={() => onFilterChange(filter)}
          className={cn(
            'px-3 py-1.5 text-sm rounded-lg transition-colors',
            activeFilter === filter
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

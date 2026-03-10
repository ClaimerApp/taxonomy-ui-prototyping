import { cn } from '../../lib/cn'

const filters = ['All', 'Critical', 'Warnings', 'Passed']

export function CheckFilters({ activeFilter, onFilterChange }) {
  return (
    <div className="flex gap-2 items-center">
      {filters.map((filter) => (
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

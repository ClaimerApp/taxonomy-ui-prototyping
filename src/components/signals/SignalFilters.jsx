import { cn } from '../../lib/cn'

const primaryFilters = ['All', 'Critical Warnings', 'Opportunities', 'Info']
const statusFilters = ['In Progress', 'Resolved']

export function SignalFilters({ activeFilter, statusFilter, onFilterChange, onStatusFilterChange, groupByClient, onGroupByClientChange }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex gap-2 items-center">
        {primaryFilters.map((filter) => (
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

      <div className="flex gap-2 items-center">
        <button
          onClick={() => onGroupByClientChange(!groupByClient)}
          className={cn(
            'px-3 py-1.5 text-sm rounded-lg transition-colors',
            groupByClient
              ? 'bg-charcoal text-cream'
              : 'text-charcoal hover:bg-warmgrey/20',
          )}
        >
          Group by client
        </button>

        <div className="w-px h-5 bg-warmgrey/30" />

        {statusFilters.map((filter) => (
          <button
            key={filter}
            onClick={() => onStatusFilterChange(statusFilter === filter ? null : filter)}
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
    </div>
  )
}

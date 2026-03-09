import { cn } from '../../lib/cn'

export function Input({ label, error, className, ...rest }) {
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-charcoal mb-1">
          {label}
        </label>
      )}
      <input
        className={cn(
          'w-full px-3 py-2 rounded-lg border bg-white text-charcoal',
          'focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold',
          error ? 'border-red-400' : 'border-warmgrey/40',
        )}
        {...rest}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  )
}

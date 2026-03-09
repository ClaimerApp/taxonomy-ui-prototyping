import { cn } from '../../lib/cn'

export function Toggle({ enabled, onToggle, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      onClick={onToggle}
      className="inline-flex items-center gap-3"
    >
      <span
        className={cn(
          'relative inline-flex h-6 w-11 shrink-0 rounded-full transition-colors',
          enabled ? 'bg-gold' : 'bg-warmgrey/40',
        )}
      >
        <span
          className={cn(
            'inline-block h-5 w-5 rounded-full bg-white shadow transform transition-transform mt-0.5',
            enabled ? 'translate-x-[22px]' : 'translate-x-0.5',
          )}
        />
      </span>
      {label && (
        <span className="text-sm text-charcoal">{label}</span>
      )}
    </button>
  )
}

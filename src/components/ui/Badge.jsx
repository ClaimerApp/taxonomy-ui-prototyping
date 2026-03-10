import { cn } from '../../lib/cn'

const variants = {
  opportunity: 'bg-emerald-100 text-emerald-800',
  info: 'bg-blue-100 text-blue-800',
  critical: 'bg-red-100 text-red-800 font-semibold',
  pass: 'bg-emerald-100 text-emerald-800',
  warning: 'bg-orange-100 text-orange-800',
  default: 'bg-warmgrey/20 text-charcoal',
}

export function Badge({ children, variant = 'default', className }) {
  return (
    <span
      className={cn(
        'px-2.5 py-0.5 text-xs font-medium rounded-full',
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  )
}

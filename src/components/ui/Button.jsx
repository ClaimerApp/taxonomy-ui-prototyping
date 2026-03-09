import { cn } from '../../lib/cn'

const variants = {
  primary: 'bg-gold text-nearblack hover:bg-amber font-medium',
  secondary: 'bg-charcoal text-cream hover:bg-nearblack',
  ghost: 'bg-transparent text-charcoal hover:bg-warmgrey/20',
  danger: 'bg-red-600 text-white hover:bg-red-700',
}

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2',
  lg: 'px-6 py-3 text-lg',
}

export function Button({ children, variant = 'primary', size = 'md', className, ...rest }) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-lg transition-colors',
        variants[variant],
        sizes[size],
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  )
}

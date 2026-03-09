import { cn } from '../../lib/cn'

export function Card({ children, className, hover = false, onClick, ...rest }) {
  return (
    <div
      className={cn(
        'bg-white rounded-xl border border-warmgrey/20',
        hover && 'hover:shadow-md hover:border-warmgrey/40 transition-all cursor-pointer',
        className,
      )}
      onClick={onClick}
      {...rest}
    >
      {children}
    </div>
  )
}

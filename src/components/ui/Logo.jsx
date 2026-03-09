import { cn } from '../../lib/cn'

const sizes = {
  sm: { mark: 'h-6', text: 'text-lg' },
  md: { mark: 'h-8', text: 'text-xl' },
  lg: { mark: 'h-12', text: 'text-3xl' },
}

export default function Logo({ size = 'md', showText = true }) {
  const s = sizes[size]

  return (
    <div className="inline-flex items-center gap-2">
      {/* Geometric A mark */}
      <svg
        className={cn(s.mark, 'aspect-square')}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M24 4 L42 44 H34 L30 34 H18 L14 44 H6 Z" fill="#FFC832" />
        <rect x="16" y="26" width="16" height="5" rx="1" fill="#FFFBF5" />
      </svg>
      {showText && (
        <span className={cn('font-serif font-bold text-nearblack', s.text)}>
          Atlas
        </span>
      )}
    </div>
  )
}

import { cn } from '../../lib/cn'

function CheckIcon() {
  return (
    <svg className="w-3.5 h-3.5 text-nearblack" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  )
}

export function Stepper({ steps, currentStep, onStepClick }) {
  return (
    <div className="flex items-start w-full">
      {steps.map((label, i) => {
        const completed = i < currentStep
        const active = i === currentStep
        const clickable = (completed || active) && onStepClick

        const content = (
          <>
            {/* Circle */}
            <div
              className={cn(
                'relative z-10 flex items-center justify-center w-8 h-8 rounded-full transition-transform',
                completed && 'bg-gold',
                active && 'bg-gold ring-4 ring-gold/20',
                !completed && !active && 'bg-warmgrey/30',
                clickable && 'cursor-pointer hover:scale-110',
              )}
            >
              {completed && <CheckIcon />}
            </div>

            {/* Label */}
            <span className="mt-2 text-xs text-charcoal text-center truncate max-w-full px-1">
              {label}
            </span>
          </>
        )

        return (
          <div key={i} className="flex-1 flex flex-col items-center relative">
            {/* Connector line */}
            {i > 0 && (
              <div
                className={cn(
                  'absolute top-4 right-1/2 w-full h-0.5',
                  completed ? 'bg-gold' : 'bg-warmgrey/30',
                )}
              />
            )}

            {clickable ? (
              <button
                type="button"
                onClick={() => onStepClick(i)}
                className="flex flex-col items-center bg-transparent border-none p-0"
              >
                {content}
              </button>
            ) : (
              <div className="flex flex-col items-center">{content}</div>
            )}
          </div>
        )
      })}
    </div>
  )
}

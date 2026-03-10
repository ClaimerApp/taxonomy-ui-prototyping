import { Button } from '../ui/Button'

const noop = () => alert('Demo action')

export function SignalActions({ signal }) {
  return (
    <div className="space-y-4">
      <h2 className="font-serif text-lg font-semibold text-nearblack">Actions</h2>

      {signal.recommendedAction && (
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-darkgold">Recommended</p>
          <p className="text-sm text-charcoal/80">{signal.recommendedAction}</p>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        <Button variant="primary" size="sm" onClick={noop}>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Draft email
        </Button>

        <Button variant="secondary" size="sm" onClick={noop}>
          Create CRM task
        </Button>

        <Button variant="ghost" size="sm" onClick={noop}>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          Mark resolved
        </Button>

        <Button variant="ghost" size="sm" onClick={noop}>
          Dismiss
        </Button>
      </div>

    </div>
  )
}

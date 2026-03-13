import { fileReviews } from '../../data/checks'

export function CheckerOverviewCard({ checker }) {
  const reviews = fileReviews.filter(r => r.checkerId === checker.id)
  const allChecks = reviews.flatMap(r => r.checks)
  const criticalCount = allChecks.filter(c => c.result === 'critical').length
  const warningCount = allChecks.filter(c => c.result === 'warning').length
  const passCount = allChecks.filter(c => c.result === 'pass').length

  return (
    <div className="bg-white rounded-xl border border-warmgrey/20 overflow-hidden">
      <div className="flex">
        <div className="w-1.5 bg-gold shrink-0" />
        <div className="p-5 flex-1">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gold">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-serif text-lg font-semibold text-nearblack">{checker.name}</h3>
              <p className="text-sm text-charcoal/70 mt-1">{checker.description}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full bg-warmgrey/15 text-charcoal/70">
              {reviews.length} reviews
            </span>
            {criticalCount > 0 && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full bg-red-100 text-red-700">
                {criticalCount} critical
              </span>
            )}
            {warningCount > 0 && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full bg-orange-100 text-orange-700">
                {warningCount} warnings
              </span>
            )}
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full bg-emerald-100 text-emerald-700">
              {passCount} passed
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

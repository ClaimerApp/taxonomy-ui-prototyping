import { Link } from 'react-router-dom'
import { fileReviews } from '../../data/checks'
import { Card } from '../ui/Card'
import { Badge } from '../ui/Badge'

function worstResult(fileChecks) {
  if (fileChecks.some((c) => c.result === 'critical')) return 'critical'
  if (fileChecks.some((c) => c.result === 'warning')) return 'warning'
  return 'pass'
}

export function EntityChecksCard({ entityId }) {
  const entityChecks = fileReviews.filter((c) => c.entityId === entityId)

  if (entityChecks.length === 0) {
    return (
      <Card className="p-4">
        <h3 className="font-serif font-semibold text-nearblack text-sm mb-3">Recent Checks</h3>
        <p className="text-xs text-warmgrey">No checks run for this entity.</p>
      </Card>
    )
  }

  return (
    <Card className="p-4">
      <h3 className="font-serif font-semibold text-nearblack text-sm mb-3">Recent Checks</h3>
      <div className="space-y-2">
        {entityChecks.map((file) => {
          const worst = worstResult(file.checks)
          return (
            <Link
              key={file.id}
              to={`/app/checks/${file.id}`}
              className="flex items-center gap-2 text-sm hover:bg-warmgrey/10 rounded-lg p-1.5 -mx-1.5 transition-colors"
            >
              <svg className="w-4 h-4 text-warmgrey shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
              </svg>
              <span className="truncate flex-1 text-charcoal">{file.fileName}</span>
              <Badge variant={worst} className="shrink-0">{worst}</Badge>
            </Link>
          )
        })}
      </div>
    </Card>
  )
}

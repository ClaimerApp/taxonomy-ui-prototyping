import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { checks } from '../../data/checks'
import { entities } from '../../data/entities'
import { Badge } from '../ui/Badge'
import { cn } from '../../lib/cn'

function worstResult(fileChecks) {
  if (fileChecks.some(c => c.result === 'critical')) return 'critical'
  if (fileChecks.some(c => c.result === 'warning')) return 'warning'
  return 'pass'
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

const statusIcon = {
  pass: <span className="text-emerald-600">✓</span>,
  warning: <span className="text-orange-500">⚠</span>,
  critical: <span className="text-red-600">✖</span>,
}

const fileTypeConfig = {
  pdf: {
    label: 'PDF',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
      </svg>
    ),
  },
  xlsx: {
    label: 'Excel',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0 1 12 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M10.875 12c-.621 0-1.125.504-1.125 1.125M12 12c.621 0 1.125.504 1.125 1.125m0 0v1.5c0 .621-.504 1.125-1.125 1.125m1.125-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M10.875 12c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125" />
      </svg>
    ),
  },
  filing: {
    label: 'HMRC Filing',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" />
      </svg>
    ),
  },
}

function FileTypePill({ fileType }) {
  const config = fileTypeConfig[fileType] || fileTypeConfig.pdf
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full bg-warmgrey/15 text-charcoal/70">
      {config.icon}
      {config.label}
    </span>
  )
}

export default function CheckDetail() {
  const { id } = useParams()
  const file = checks.find(f => f.id === id)
  const entity = entities.find(e => e.id === file?.entityId)
  const [expanded, setExpanded] = useState(new Set())

  if (!file) {
    return (
      <div className="text-center py-12">
        <p className="text-warmgrey">File not found.</p>
        <Link to="/app/checks" className="text-darkgold hover:underline text-sm mt-2 inline-block">
          Back to file reviews
        </Link>
      </div>
    )
  }

  const overall = worstResult(file.checks)

  function toggleCheck(checkId) {
    setExpanded(prev => {
      const next = new Set(prev)
      if (next.has(checkId)) next.delete(checkId)
      else next.add(checkId)
      return next
    })
  }

  return (
    <div className="space-y-6">
      <Link to="/app/checks" className="text-sm text-charcoal/60 hover:text-charcoal transition-colors">
        &larr; File Reviews
      </Link>

      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <FileTypePill fileType={file.fileType} />
          <Badge variant={overall}>{overall}</Badge>
        </div>

        <h1 className="font-serif text-2xl font-bold text-nearblack">{file.fileName}</h1>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
          <Link
            to={`/app/entities/${file.entityId}`}
            className="text-darkgold hover:underline font-medium"
          >
            {entity?.name || file.entityId}
          </Link>
          <span className="text-charcoal/50">Reviewed {formatDate(file.reviewedAt)}</span>
        </div>
      </div>

      <div className="space-y-3">
        {file.checks.map(check => {
          const isExpanded = expanded.has(check.id)
          return (
            <div
              key={check.id}
              className="bg-white rounded-xl border border-warmgrey/20 p-4"
            >
              <button
                onClick={() => toggleCheck(check.id)}
                className="flex items-center gap-3 w-full text-left"
              >
                <span className="text-lg shrink-0">{statusIcon[check.result]}</span>
                <span className="font-medium text-nearblack flex-1">{check.name}</span>
                <Badge variant={check.result}>{check.result}</Badge>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className={cn('w-5 h-5 text-warmgrey transition-transform shrink-0', isExpanded && 'rotate-180')}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              </button>

              {isExpanded && (
                <div className="mt-3 pl-8 space-y-3">
                  <p className="text-sm text-charcoal/80">{check.summary}</p>

                  {check.evidence && (
                    <div className="border-l-4 border-gold pl-4">
                      <p className="text-sm text-charcoal/70 italic">{check.evidence}</p>
                    </div>
                  )}

                  {check.regulatoryRef && (
                    <p className="text-xs text-charcoal/60">Ref: {check.regulatoryRef}</p>
                  )}

                  {check.suggestedFix && (
                    <div className="bg-cream rounded-lg p-3">
                      <p className="text-sm text-charcoal/80">Suggested fix: {check.suggestedFix}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

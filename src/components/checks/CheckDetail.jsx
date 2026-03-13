import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { fileReviews, checkCategories, timeAgo } from '../../data/checks'
import { entities } from '../../data/entities'
import { Badge } from '../ui/Badge'
import { cn } from '../../lib/cn'

const statusIcon = {
  pass: <span className="text-emerald-600">✓</span>,
  warning: <span className="text-orange-500">⚠</span>,
  critical: <span className="text-red-600">✖</span>,
}

const fileTypeConfig = {
  pdf: { label: 'PDF' },
  xlsx: { label: 'Excel' },
}

export default function CheckDetail() {
  const { id } = useParams()
  const review = fileReviews.find(r => r.id === id)
  const entity = entities.find(e => e.id === review?.entityId)
  const [expanded, setExpanded] = useState(new Set())
  const [collapsedCategories, setCollapsedCategories] = useState(new Set())

  if (!review) {
    return (
      <div className="text-center py-12">
        <p className="text-warmgrey">Review not found.</p>
        <Link to="/app/checks" className="text-darkgold hover:underline text-sm mt-2 inline-block">
          Back to checkers
        </Link>
      </div>
    )
  }

  function toggleCheck(checkId) {
    setExpanded(prev => {
      const next = new Set(prev)
      if (next.has(checkId)) next.delete(checkId)
      else next.add(checkId)
      return next
    })
  }

  function toggleCategory(catId) {
    setCollapsedCategories(prev => {
      const next = new Set(prev)
      if (next.has(catId)) next.delete(catId)
      else next.add(catId)
      return next
    })
  }

  const grouped = checkCategories.map(cat => {
    const checks = review.checks.filter(c => c.category === cat.id)
    const passCount = checks.filter(c => c.result === 'pass').length
    const hasNonPass = checks.some(c => c.result !== 'pass')
    return { ...cat, checks, passCount, total: checks.length, hasNonPass }
  })

  return (
    <div className="space-y-6">
      <Link to="/app/checks" className="text-sm text-charcoal/60 hover:text-charcoal transition-colors">
        &larr; Checkers
      </Link>

      {/* Routing info card */}
      <div className={cn(
        'rounded-xl border p-4',
        review.routing === 'back-to-junior'
          ? 'border-red-200 bg-red-50/50'
          : 'border-emerald-200 bg-emerald-50/50',
      )}>
        <div className="flex items-center gap-3 mb-2">
          {review.routing === 'back-to-junior' ? (
            <span className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full bg-red-100 text-red-700">
              Sent back for correction
            </span>
          ) : (
            <span className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full bg-emerald-100 text-emerald-700">
              Direct to partner
            </span>
          )}
          <span className="text-xs text-charcoal/50">{timeAgo(review.reviewedAt)}</span>
        </div>
        <p className="text-sm text-charcoal/80">{review.routingReason}</p>
        <p className="text-xs text-warmgrey mt-2">Submitted by {review.submittedBy}</p>
      </div>

      {/* File info */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full bg-warmgrey/15 text-charcoal/70">
            {fileTypeConfig[review.fileType]?.label || 'PDF'}
          </span>
        </div>
        <h1 className="font-serif text-2xl font-bold text-nearblack">{review.fileName}</h1>
        <Link
          to={`/app/entities/${review.entityId}`}
          className="text-darkgold hover:underline font-medium text-sm"
        >
          {entity?.name || review.entityId}
        </Link>
      </div>

      {/* Grouped checks */}
      {grouped.map(cat => {
        const isCollapsed = collapsedCategories.has(cat.id)
        return (
          <div key={cat.id} className="space-y-3">
            <button
              onClick={() => toggleCategory(cat.id)}
              className="flex items-center gap-2 w-full text-left group"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={cn('w-4 h-4 text-warmgrey transition-transform', !isCollapsed && 'rotate-90')}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
              <h2 className="font-serif text-lg font-semibold text-nearblack">
                {cat.label}
              </h2>
              <span className="text-sm text-charcoal/50">
                ({cat.passCount}/{cat.total} passed)
              </span>
            </button>

            {!isCollapsed && (
              <div className="space-y-3 ml-6">
                {cat.checks.map(check => {
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
                        {check.autoFixed && (
                          <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full bg-emerald-100 text-emerald-700">
                            Auto-corrected
                          </span>
                        )}
                        {check.confidence && (
                          <span className="text-xs text-warmgrey">{Math.round(check.confidence * 100)}%</span>
                        )}
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
                              <p className="text-xs font-medium text-charcoal/50 mb-1">Evidence</p>
                              <p className="text-sm text-charcoal/70 italic">{check.evidence}</p>
                            </div>
                          )}

                          {check.reasoning && (
                            <div className="border-l-4 border-warmgrey/40 pl-4">
                              <p className="text-xs font-medium text-charcoal/50 mb-1">Reasoning</p>
                              <p className="text-sm text-charcoal/70">{check.reasoning}</p>
                            </div>
                          )}

                          {check.autoFixed && (
                            <div className="bg-emerald-50 rounded-lg p-3 space-y-1">
                              <p className="text-xs font-medium text-emerald-700">Auto-corrected</p>
                              <div className="flex items-center gap-2 text-sm">
                                <span className="line-through text-charcoal/50">{check.originalValue}</span>
                                <span className="text-charcoal/40">&rarr;</span>
                                <span className="font-medium text-emerald-700">{check.correctedValue}</span>
                              </div>
                            </div>
                          )}

                          {check.regulatoryRef && (
                            <p className="text-xs text-charcoal/60">Ref: {check.regulatoryRef}</p>
                          )}

                          {check.suggestedFix && !check.autoFixed && (
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
            )}
          </div>
        )
      })}
    </div>
  )
}

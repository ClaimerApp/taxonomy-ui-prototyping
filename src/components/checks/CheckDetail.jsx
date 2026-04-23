import { useState, useCallback, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { fileReviews, checkCategories, timeAgo, legislationRefs } from '../../data/checks'
import { documentContent, getReviewDocuments, ct600Content, taxCompContent, workingPapersWorkbook } from '../../data/document-content'
import { entities } from '../../data/entities'
import { Badge } from '../ui/Badge'
import { cn } from '../../lib/cn'
import { DocumentTabs } from './DocumentTabs'
import { SubCheckRow } from './SubCheckRow'
import { LegislationPanel } from './LegislationPanel'
import { ReportFeedback } from './ReportFeedback'
import { CheckFeedback } from './CheckFeedback'

const statusIcon = {
  pass: <span className="text-emerald-600">✓</span>,
  warning: <span className="text-orange-500">⚠</span>,
  critical: <span className="text-red-600">✖</span>,
}

export default function CheckDetail() {
  const { id } = useParams()
  const review = fileReviews.find(r => r.id === id)
  const entity = entities.find(e => e.id === review?.entityId)

  const [collapsedCategories, setCollapsedCategories] = useState(new Set())
  const [expandedChecks, setExpandedChecks] = useState(new Set())
  const [activeSubCheck, setActiveSubCheck] = useState(null)
  const [activeDocTab, setActiveDocTab] = useState('rnd-report')
  const [legislationPanel, setLegislationPanel] = useState(null)
  const [docPanelWidth, setDocPanelWidth] = useState(40)
  const [isDragging, setIsDragging] = useState(false)

  const handleDragStart = useCallback((e) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  useEffect(() => {
    if (!isDragging) return
    const handleMove = (e) => {
      const container = document.querySelector('[data-check-layout]')
      if (!container) return
      const rect = container.getBoundingClientRect()
      const rightPct = ((rect.right - e.clientX) / rect.width) * 100
      setDocPanelWidth(Math.min(75, Math.max(25, rightPct)))
    }
    const handleUp = () => setIsDragging(false)
    document.addEventListener('mousemove', handleMove)
    document.addEventListener('mouseup', handleUp)
    return () => {
      document.removeEventListener('mousemove', handleMove)
      document.removeEventListener('mouseup', handleUp)
    }
  }, [isDragging])

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

  const doc = documentContent[review.id]

  function toggleCheck(checkId) {
    setExpandedChecks(prev => {
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
    return { ...cat, checks, passCount, total: checks.length }
  })

  return (
    <div className="flex flex-col" style={{ height: 'calc(100vh - 4rem)' }}>
      {/* Header */}
      <div className="shrink-0 pb-4">
        <div className="flex items-baseline gap-2 flex-wrap">
          <Link to="/app/checks" className="text-sm text-charcoal/60 hover:text-charcoal transition-colors">
            &larr; Checkers
          </Link>
          <span className="text-charcoal/30">/</span>
          <Link
            to={`/app/entities/${review.entityId}`}
            className="font-serif text-2xl font-bold text-darkgold hover:underline transition-colors"
          >
            {entity?.name || review.entityId}
          </Link>
          <span className="font-serif text-2xl font-bold text-nearblack">
            &middot; R&D Tax Claim {review.fileName.match(/FY(\d{4})/)?.[1] ? `FY ending ${review.fileName.match(/FY(\d{4})/)[1]}` : ''}
          </span>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full bg-warmgrey/15 text-charcoal/70">
            PDF
          </span>
          <span className="text-xs text-charcoal/50">{review.fileName}</span>
          <button
            type="button"
            className="inline-flex items-center gap-1 text-xs text-darkgold hover:underline"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            Download
          </button>
        </div>
      </div>

      {/* Two-column layout */}
      <div className="relative flex-1 min-h-0" data-check-layout>

        {/* Left column — checks */}
        <div
          className="absolute inset-y-0 left-0 overflow-y-auto space-y-6 pr-3"
          style={{ width: `calc(${100 - docPanelWidth}% - 4px)` }}
        >

          {/* Routing card */}
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
                  Direct to reviewer
                </span>
              )}
              <span className="text-xs text-charcoal/50">{timeAgo(review.reviewedAt)}</span>
            </div>
            <p className="text-sm text-charcoal/80">{review.routingReason}</p>
            <p className="text-xs text-warmgrey mt-2">Submitted by {review.submittedBy}</p>
          </div>

          {/* Category groups */}
          {/* Category groups */}
          {grouped.filter(cat => cat.checks.length > 0).map(cat => {
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
                      const isExpanded = expandedChecks.has(check.id)
                      return (
                        <div
                          key={check.id}
                          onClick={() => toggleCheck(check.id)}
                          className="bg-white rounded-xl border border-warmgrey/20 p-4 cursor-pointer"
                        >
                          {/* Check row */}
                          <div className="flex items-center gap-3">
                            <span className="text-lg shrink-0">{statusIcon[check.result]}</span>
                            <span className="font-medium text-nearblack flex-1">{check.name}</span>
                            {check.autoFixed && (
                              <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full bg-emerald-100 text-emerald-700">
                                Auto-corrected
                              </span>
                            )}
                            {check.subChecks?.length > 0 && (
                              <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full bg-warmgrey/15 text-charcoal/70">
                                {check.subChecks.filter(sc => sc.result === 'pass').length}/{check.subChecks.length}
                              </span>
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
                          </div>
                          {!isExpanded && check.result !== 'pass' && (
                            <p className="text-sm text-charcoal/60 mt-1.5 ml-8">{check.summary}</p>
                          )}

                          {/* Expanded content */}
                          {isExpanded && (
                            <div className="mt-3 pl-8 space-y-3" onClick={e => e.stopPropagation()}>
                              <p className="text-sm text-charcoal/80 mb-3">{check.summary}</p>

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

                              {check.suggestedFix && !check.autoFixed && (
                                <div className="bg-cream rounded-lg p-3">
                                  <p className="text-sm text-charcoal/80">Suggested fix: {check.suggestedFix}</p>
                                </div>
                              )}

                              {/* Sub-checks */}
                              {check.subChecks?.length > 0 && (
                                <div>
                                  <p className="text-xs font-medium text-charcoal/50 mb-2 mt-4">Sub-checks</p>
                                  <div className="space-y-2">
                                    {check.subChecks.map(sc => (
                                      <SubCheckRow
                                        key={sc.id}
                                        subCheck={sc}
                                        isActive={activeSubCheck?.id === sc.id}
                                        onClick={() => {
                                          const next = activeSubCheck?.id === sc.id ? null : sc
                                          setActiveSubCheck(next)
                                          if (next?.evidenceType === 'document_field') {
                                            setActiveDocTab(next.evidence?.documentId || 'rnd-report')
                                          }
                                        }}
                                      />
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Legislation references */}
                              {(check.basis || check.legislationRefIds?.length > 0) && (
                                <div className="pt-3 border-t border-warmgrey/15">
                                  <p className="text-xs font-medium text-charcoal/50 mb-2">Relevant legislation & guidance</p>
                                  {check.basis && (
                                    <p className="text-sm text-charcoal/80 mb-3">{check.basis}</p>
                                  )}
                                  {check.legislationRefIds?.length > 0 && (
                                    <div className="flex flex-wrap gap-x-4 gap-y-1">
                                      {check.legislationRefIds.map(refId => {
                                        const ref = legislationRefs[refId]
                                        if (!ref) return null
                                        return (
                                          <button
                                            key={refId}
                                            onClick={() => setLegislationPanel(ref)}
                                            className="inline-flex items-center gap-1.5 text-sm text-darkgold hover:underline"
                                          >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 shrink-0">
                                              <path strokeLinecap="round" strokeLinejoin="round" d={ref.type === 'legislation' ? 'M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.97zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.97z' : 'M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z'} />
                                            </svg>
                                            {ref.shortTitle}
                                          </button>
                                        )
                                      })}
                                    </div>
                                  )}
                                </div>
                              )}

                              <CheckFeedback />
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

          {/* Report-level feedback */}
          <ReportFeedback />
        </div>

        {/* Resize handle */}
        <div
          onMouseDown={handleDragStart}
          className={cn(
            'absolute inset-y-0 hidden lg:flex w-2 cursor-col-resize items-center justify-center group z-10',
            isDragging && 'select-none'
          )}
          style={{ left: `calc(${100 - docPanelWidth}% - 4px)` }}
        >
          <div className={cn(
            'w-0.5 h-8 rounded-full transition-colors',
            isDragging ? 'bg-gold' : 'bg-warmgrey/30 group-hover:bg-gold/50'
          )} />
        </div>

        {/* Right column — document panel */}
        <div
          className="absolute inset-y-0 right-0 overflow-hidden pl-1"
          style={{ width: `calc(${docPanelWidth}% - 4px)` }}
        >
          <DocumentTabs
            tabs={getReviewDocuments(entity?.name || 'Unknown')}
            document={doc}
            activeSubCheck={activeSubCheck}
            activeTab={activeDocTab}
            onTabChange={setActiveDocTab}
            ct600Content={ct600Content}
            taxCompContent={taxCompContent}
            workingPapersWorkbook={workingPapersWorkbook}
          />
        </div>
      </div>

      {/* Legislation panel */}
      <LegislationPanel
        isOpen={!!legislationPanel}
        onClose={() => setLegislationPanel(null)}
        legislation={legislationPanel}
      />
    </div>
  )
}

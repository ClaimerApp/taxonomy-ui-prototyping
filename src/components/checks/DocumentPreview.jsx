import { useEffect, useRef } from 'react'
import { cn } from '../../lib/cn'

const highlightStyles = {
  pass: 'bg-gold/20 ring-2 ring-gold/40 rounded-lg p-2 -m-2 transition-all',
  warning: 'bg-orange-50 ring-2 ring-orange-300 rounded-lg p-2 -m-2 transition-all',
  critical: 'bg-red-50 ring-2 ring-red-300 rounded-lg p-2 -m-2 transition-all',
}

export function DocumentPreview({ document, activeSubCheck, className }) {
  const containerRef = useRef(null)

  const highlightedFieldId =
    activeSubCheck?.evidenceType === 'document_field'
      ? activeSubCheck.evidence?.fieldId
      : null

  useEffect(() => {
    if (!highlightedFieldId || !containerRef.current) return
    const el = containerRef.current.querySelector(`[data-field-id="${highlightedFieldId}"]`)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [highlightedFieldId])

  // Group sections by page
  const pages = {}
  for (const section of document.sections) {
    const p = section.page ?? 1
    if (!pages[p]) pages[p] = []
    pages[p].push(section)
  }
  const sortedPages = Object.keys(pages).sort((a, b) => a - b)

  return (
    <div className={cn('space-y-6', className)} ref={containerRef}>
      {/* Pages */}
      {sortedPages.map((pageNum) => (
        <div
          key={pageNum}
          className="bg-white rounded-xl shadow-sm border border-warmgrey/20 p-8 relative"
        >
          {pages[pageNum].map((section) => (
            <div key={section.id} className="mb-6 last:mb-0">
              <h4 className="font-serif text-base font-semibold text-nearblack mb-4 pb-2 border-b border-warmgrey/15">
                {section.heading}
              </h4>
              <div className="space-y-3">
                {section.fields.map((field) => {
                  const isHighlighted = highlightedFieldId === field.id
                  const result = isHighlighted ? activeSubCheck?.result : null
                  return (
                    <div
                      key={field.id}
                      id={field.id}
                      data-field-id={field.id}
                      className={isHighlighted && result ? highlightStyles[result] : undefined}
                    >
                      <div className="text-xs font-medium text-charcoal/50 mb-0.5">{field.label}</div>
                      <div className="text-sm text-charcoal/80 whitespace-pre-wrap">{field.value}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
          <span className="absolute bottom-3 right-4 text-xs text-warmgrey">Page {pageNum}</span>
        </div>
      ))}
    </div>
  )
}

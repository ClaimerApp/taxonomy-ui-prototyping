import { useState, useRef, useEffect, useCallback } from 'react'
import { cn } from '../../lib/cn'
import { DocumentPreview } from './DocumentPreview'
import { CT600Preview } from './CT600Preview'
import { DocumentViewport } from './DocumentViewport'
import { A4Page } from './A4Page'
import { SpreadsheetWorkbook } from './SpreadsheetWorkbook'
import { highlightStyles } from './highlightStyles'

// Plain A4-styled report pages (used for Tax Computations)
function TaxCompPages({ content, activeSubCheck }) {
  const containerRef = useRef(null)
  const highlightedFieldId =
    activeSubCheck?.evidenceType === 'document_field' && activeSubCheck.evidence?.documentId === 'tax-comp'
      ? activeSubCheck.evidence?.fieldId
      : null

  useEffect(() => {
    if (!highlightedFieldId || !containerRef.current) return
    const el = containerRef.current.querySelector(`[data-field-id="${highlightedFieldId}"]`)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [highlightedFieldId])

  if (!content?.sections?.length) {
    return <p className="text-sm text-charcoal/50 py-8 text-center">No content available.</p>
  }

  const pages = {}
  for (const section of content.sections) {
    const p = section.page ?? 1
    if (!pages[p]) pages[p] = []
    pages[p].push(section)
  }
  const sortedPages = Object.keys(pages).sort((a, b) => a - b)
  const totalPages = sortedPages.length
  const highlightResult = highlightedFieldId ? activeSubCheck?.result : null

  return (
    <div ref={containerRef} className="space-y-6">
      {sortedPages.map((pageNum) => (
        <A4Page
          key={pageNum}
          pageNum={pageNum}
          totalPages={totalPages}
          headerLeft={<span className="font-serif text-[11px] font-semibold text-charcoal/60">{content.title}</span>}
          headerRight={<span className="text-[10px] text-charcoal/40">DRAFT — Subject to review</span>}
          footerLeft={<span>{content.title}</span>}
          footerRight={<span>Prepared by Sophie Clark, Tax Manager</span>}
        >
          {pages[pageNum].map((section) => (
            <section key={section.id} className="mb-7 last:mb-0">
              <h4 className="font-serif text-[15px] font-semibold text-nearblack mb-4 pb-1.5 border-b border-warmgrey/30">
                {section.heading}
              </h4>
              <div className="space-y-3">
                {section.fields.map((field) => {
                  const isHit = field.id === highlightedFieldId
                  return (
                    <div
                      key={field.id}
                      data-field-id={field.id}
                      className={cn(
                        'grid grid-cols-12 items-baseline gap-3',
                        isHit && highlightResult && highlightStyles[highlightResult],
                      )}
                    >
                      <div className="col-span-7 font-sans text-[11px] text-charcoal/70">{field.label}</div>
                      <div className="col-span-5 font-serif text-[13px] text-nearblack text-right tabular-nums">{field.value}</div>
                    </div>
                  )
                })}
              </div>
            </section>
          ))}
        </A4Page>
      ))}
    </div>
  )
}

function TabBar({ tabs, activeTab, onTabChange }) {
  const scrollRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const checkOverflow = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 1)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 1)
  }, [])

  useEffect(() => {
    checkOverflow()
    const el = scrollRef.current
    if (!el) return
    const observer = new ResizeObserver(checkOverflow)
    observer.observe(el)
    return () => observer.disconnect()
  }, [checkOverflow])

  const scroll = (dir) => {
    const el = scrollRef.current
    if (!el) return
    el.scrollBy({ left: dir * 150, behavior: 'smooth' })
  }

  return (
    <div className="relative shrink-0 border-b border-warmgrey/20">
      {/* Left arrow */}
      {canScrollLeft && (
        <button
          onClick={() => scroll(-1)}
          className="absolute left-0 top-0 bottom-0 z-10 w-7 flex items-center justify-center bg-gradient-to-r from-cream via-cream/90 to-transparent"
        >
          <svg className="w-4 h-4 text-charcoal/60" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
      )}

      {/* Scrollable tabs */}
      <div
        ref={scrollRef}
        onScroll={checkOverflow}
        className="flex overflow-x-auto scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              'shrink-0 px-3 py-2.5 text-left transition-colors',
              activeTab === tab.id
                ? 'border-b-2 border-gold bg-gold/5'
                : 'hover:bg-warmgrey/10 cursor-pointer'
            )}
          >
            <div className="flex items-center gap-1.5 mb-0.5 whitespace-nowrap">
              <span className="px-1.5 py-0.5 text-[10px] font-bold tracking-wide rounded bg-warmgrey/15 text-charcoal/60 shrink-0">
                {tab.typeLabel}
              </span>
              <span
                className={cn(
                  'text-sm font-medium',
                  activeTab === tab.id ? 'text-nearblack' : 'text-charcoal/50'
                )}
              >
                {tab.title}
              </span>
            </div>
            <div className="text-xs text-warmgrey truncate max-w-[140px]">
              {tab.filename}
            </div>
          </button>
        ))}
      </div>

      {/* Right arrow */}
      {canScrollRight && (
        <button
          onClick={() => scroll(1)}
          className="absolute right-0 top-0 bottom-0 z-10 w-7 flex items-center justify-center bg-gradient-to-l from-cream via-cream/90 to-transparent"
        >
          <svg className="w-4 h-4 text-charcoal/60" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      )}
    </div>
  )
}

export function DocumentTabs({
  tabs,
  document,
  activeSubCheck,
  activeTab,
  onTabChange,
  ct600Content,
  taxCompContent,
  workingPapersData,
  workingPapersWorkbook,
}) {
  const workbook = workingPapersWorkbook || workingPapersData

  // Auto-switch tab when an active sub-check targets a specific document
  const targetDocId =
    activeSubCheck?.evidenceType === 'document_field' ? activeSubCheck.evidence?.documentId : null
  useEffect(() => {
    if (targetDocId && targetDocId !== activeTab) onTabChange(targetDocId)

  }, [targetDocId])

  return (
    <div className="flex flex-col h-full min-w-0">
      <TabBar tabs={tabs} activeTab={activeTab} onTabChange={onTabChange} />

      {/* Tab content */}
      <div className="flex-1 min-h-0">
        {activeTab === 'rnd-report' && document && (
          <DocumentViewport>
            <DocumentPreview document={document} activeSubCheck={activeSubCheck} />
          </DocumentViewport>
        )}
        {activeTab === 'ct600' && (
          <DocumentViewport>
            <CT600Preview content={ct600Content} activeSubCheck={activeSubCheck} />
          </DocumentViewport>
        )}
        {activeTab === 'tax-comp' && (
          <DocumentViewport>
            <TaxCompPages content={taxCompContent} activeSubCheck={activeSubCheck} />
          </DocumentViewport>
        )}
        {activeTab === 'working-papers' && (
          <SpreadsheetWorkbook workbook={workbook} activeSubCheck={activeSubCheck} />
        )}
      </div>
    </div>
  )
}

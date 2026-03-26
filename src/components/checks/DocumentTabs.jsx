import { useState, useRef, useEffect, useCallback } from 'react'
import { cn } from '../../lib/cn'
import { DocumentPreview } from './DocumentPreview'

function PdfPages({ content }) {
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

  return (
    <div className="space-y-6">
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
                {section.fields.map((field) => (
                  <div key={field.id}>
                    <div className="text-xs font-medium text-charcoal/50 mb-0.5">{field.label}</div>
                    <div className="text-sm text-charcoal/80 whitespace-pre-wrap">{field.value}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <span className="absolute bottom-3 right-4 text-xs text-warmgrey">Page {pageNum}</span>
        </div>
      ))}
    </div>
  )
}

function SpreadsheetTable({ data }) {
  if (!data?.columns?.length) {
    return <p className="text-sm text-charcoal/50 py-8 text-center">No data available.</p>
  }

  return (
    <div className="bg-white rounded-xl border border-warmgrey/20 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-[1200px] w-full border-collapse">
          <thead>
            <tr className="bg-warmgrey/10 border-b border-warmgrey/20">
              <th className="px-2 py-2 w-8 text-xs text-warmgrey text-center border-r border-warmgrey/10">#</th>
              {data.columns.map((col, i) => (
                <th
                  key={i}
                  className="px-3 py-2 text-left text-xs font-medium text-charcoal/70 uppercase tracking-wide border-r border-warmgrey/10 last:border-r-0 whitespace-nowrap"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.rows.map((row, ri) => {
              const isLast = ri === data.rows.length - 1
              const rowBg = isLast
                ? 'bg-warmgrey/10'
                : ri % 2 === 0
                  ? 'bg-white'
                  : 'bg-cream/50'

              return (
                <tr key={ri} className={cn(rowBg, 'border-b border-warmgrey/10')}>
                  <td className="px-2 py-1.5 w-8 text-xs text-warmgrey text-center bg-warmgrey/5 border-r border-warmgrey/10">
                    {ri + 1}
                  </td>
                  {row.map((cell, ci) => (
                    <td
                      key={ci}
                      className={cn(
                        'px-3 py-1.5 text-sm border-r border-warmgrey/10 last:border-r-0 whitespace-nowrap',
                        isLast ? 'font-semibold text-nearblack' : 'text-charcoal/80'
                      )}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
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
}) {
  return (
    <div className="flex flex-col h-full min-w-0">
      <TabBar tabs={tabs} activeTab={activeTab} onTabChange={onTabChange} />

      {/* Tab content */}
      <div className="flex-1 min-h-0 overflow-y-auto pt-4">
        {activeTab === 'rnd-report' && document && (
          <DocumentPreview document={document} activeSubCheck={activeSubCheck} />
        )}
        {activeTab === 'ct600' && <PdfPages content={ct600Content} />}
        {activeTab === 'tax-comp' && <PdfPages content={taxCompContent} />}
        {activeTab === 'working-papers' && <SpreadsheetTable data={workingPapersData} />}
      </div>
    </div>
  )
}

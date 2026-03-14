import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../../lib/cn'

const SCALE_PATH = 'M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.97zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.97z'
const DOCUMENT_PATH = 'M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z'

export function LegislationPanel({ isOpen, onClose, legislation }) {
  const [width, setWidth] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const [query, setQuery] = useState('')
  const [response, setResponse] = useState(null)
  const contentRef = useRef(null)

  const handleMouseDown = useCallback((e) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  useEffect(() => {
    if (!isDragging) return

    const handleMouseMove = (e) => {
      const vw = window.innerWidth
      const pct = ((vw - e.clientX) / vw) * 100
      setWidth(Math.min(75, Math.max(30, pct)))
    }

    const handleMouseUp = () => setIsDragging(false)

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging])

  useEffect(() => {
    if (!isOpen) setWidth(50)
  }, [isOpen])

  // Reset query/response and scroll to highlight when legislation changes
  useEffect(() => {
    setQuery('')
    setResponse(null)
    if (!contentRef.current || !legislation?.highlightParagraphs?.length) return
    const timer = setTimeout(() => {
      const firstHighlight = legislation.highlightParagraphs[0]
      const el = contentRef.current?.querySelector(`[data-paragraph="${firstHighlight}"]`)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 400) // after slide-in animation
    return () => clearTimeout(timer)
  }, [legislation?.id])

  const isLegislation = legislation?.type === 'legislation'
  const iconPath = isLegislation ? SCALE_PATH : DOCUMENT_PATH
  const headerLabel = isLegislation ? 'Legislation' : 'HMRC Guidance'
  const linkText = isLegislation ? 'View on legislation.gov.uk' : 'View on GOV.UK'

  const submitQuery = useCallback((q) => {
    const trimmed = q.trim().toLowerCase()
    if (!trimmed || !legislation) return

    const match = legislation.cannedResponses?.find(
      (cr) => cr.query.toLowerCase() === trimmed
    )
    setResponse(
      match
        ? match.response
        : 'I can help with questions about this legislation. Try one of the example queries above.'
    )
  }, [legislation])

  const handleChipClick = (exampleQuery) => {
    setQuery(exampleQuery)
    submitQuery(exampleQuery)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') submitQuery(query)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-nearblack/30 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            className="fixed top-0 right-0 bottom-0 z-50 flex"
            style={{ width: `${width}vw` }}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          >
            {/* Resize handle */}
            <div
              className="w-1.5 shrink-0 cursor-col-resize bg-warmgrey/20 hover:bg-gold/40 transition-colors"
              onMouseDown={handleMouseDown}
            />

            {/* Panel body */}
            <div className="flex-1 bg-white shadow-2xl overflow-hidden flex flex-col min-w-0">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-warmgrey/20 shrink-0">
                <div className="flex items-center gap-2 text-charcoal">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d={iconPath} />
                  </svg>
                  <span className="text-sm font-medium">{headerLabel}</span>
                </div>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg text-charcoal hover:bg-warmgrey/20 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto px-6 py-5" ref={contentRef}>
                {legislation && (
                  <>
                    {/* Title section */}
                    <h3 className="font-serif text-lg font-semibold text-nearblack mb-1">
                      {legislation.title}
                    </h3>
                    {legislation.sourceUrl && (
                      <a
                        href={legislation.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block text-sm text-darkgold hover:underline mb-4"
                      >
                        {linkText} &rarr;
                      </a>
                    )}

                    {/* Document body — styled per source type */}
                    {legislation.text && (() => {
                      const paragraphs = legislation.text.split('\n\n')
                      const highlights = new Set(legislation.highlightParagraphs || [])
                      return (
                        <div className={cn(
                          'rounded-xl border p-5',
                          isLegislation
                            ? 'bg-[#FFFEF8] border-warmgrey/20'
                            : 'bg-white border-warmgrey/15',
                        )}>
                          {/* Source badge */}
                          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-warmgrey/15">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-charcoal/40">
                              <path strokeLinecap="round" strokeLinejoin="round" d={iconPath} />
                            </svg>
                            <span className="text-xs font-medium text-charcoal/50 uppercase tracking-wide">
                              {isLegislation ? 'UK Primary Legislation' : 'HMRC Internal Manual'}
                            </span>
                          </div>

                          <div className="space-y-4">
                            {paragraphs.map((para, i) => {
                              const isHighlighted = highlights.has(i)
                              return (
                                <p
                                  key={i}
                                  data-paragraph={i}
                                  className={cn(
                                    'text-sm leading-relaxed transition-colors',
                                    isHighlighted
                                      ? 'bg-gold/15 border-l-[3px] border-gold pl-3 -ml-3 py-1 text-nearblack'
                                      : 'text-charcoal/70',
                                    isLegislation && 'font-serif',
                                  )}
                                >
                                  {para}
                                </p>
                              )
                            })}
                          </div>
                        </div>
                      )
                    })()}

                    {/* Query section */}
                    <h4 className="font-serif text-base font-semibold text-nearblack mt-6 mb-3">
                      Ask about this {isLegislation ? 'legislation' : 'guidance'}
                    </h4>

                    {/* Example query chips */}
                    {legislation.exampleQueries?.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {legislation.exampleQueries.map((eq, i) => (
                          <button
                            key={i}
                            onClick={() => handleChipClick(eq)}
                            className="px-3 py-1.5 text-xs rounded-full bg-gold/15 text-darkgold hover:bg-gold/25 cursor-pointer transition-colors"
                          >
                            {eq}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Text input */}
                    <input
                      type="text"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder={`Ask about this ${isLegislation ? 'legislation' : 'guidance'}...`}
                      className="w-full px-4 py-2.5 rounded-lg border border-warmgrey/40 text-sm focus:ring-2 focus:ring-gold/50 focus:border-gold outline-none transition-colors"
                    />

                    {/* Response area */}
                    {response && (
                      <div className="mt-3 bg-white rounded-xl border border-warmgrey/20 p-4">
                        <div className="flex items-center gap-1.5 text-xs font-medium text-charcoal/50 mb-2">
                          <svg viewBox="0 0 48 48" className="w-3.5 h-3.5">
                            <path d="M24 4 L42 44 H34 L30 34 H18 L14 44 H6 Z" fill="#FFC832" />
                            <rect x="16" y="26" width="16" height="5" rx="1" fill="#FFFBF5" />
                          </svg>
                          Atlas
                        </div>
                        <p className="text-sm text-charcoal/80 leading-relaxed">{response}</p>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

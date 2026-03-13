import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const SOURCE_META = {
  email:              { label: 'Email',              icon: 'envelope' },
  legislation:        { label: 'Legislation',        icon: 'scale',    linkText: 'View on legislation.gov.uk' },
  hmrc_guidance:      { label: 'HMRC Guidance',      icon: 'document',  linkText: 'View on GOV.UK' },
  companies_house:    { label: 'Companies House',    icon: 'building',  linkText: 'View on Companies House' },
  innovate_uk:        { label: 'Innovate UK',        icon: 'sparkle',   linkText: 'View on Innovate UK' },
  internal_report:    { label: 'Internal Report',    icon: 'clipboard' },
  hmrc_filing:        { label: 'HMRC Filing',        icon: 'document',  linkText: 'View filing' },
  gazette:            { label: 'The Gazette',        icon: 'newspaper', linkText: 'View on The Gazette' },
  accounting_software:{ label: 'Accounting Software', icon: 'calculator' },
}

function SourceIcon({ type, className = 'w-5 h-5' }) {
  const iconType = SOURCE_META[type]?.icon || 'document'
  const paths = {
    envelope: 'M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75',
    scale: 'M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.97zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.97z',
    document: 'M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z',
    building: 'M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21',
    sparkle: 'M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z',
    clipboard: 'M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z',
    newspaper: 'M12 7.5h1.5m-1.5 3h1.5m-1.5 3h1.5m3-9H21a.75.75 0 01.75.75v9a3 3 0 01-3 3H5.25a3 3 0 01-3-3v-9A.75.75 0 013 4.5h3.75m0 0v12m0-12h7.5',
    calculator: 'M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V13.5zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V18zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V18zm2.498-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zM8.25 6h7.5v2.25h-7.5V6zM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0012 2.25z',
  }
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d={paths[iconType]} />
    </svg>
  )
}

function sourceLabel(type) {
  return SOURCE_META[type]?.label || type
}

function sourceLinkText(type) {
  return SOURCE_META[type]?.linkText || 'View source'
}

function EmailContent({ evidence }) {
  return (
    <>
      <div className="border-b border-warmgrey/20 pb-4 mb-4 space-y-1">
        {evidence.from && <p className="text-sm text-charcoal/80"><span className="font-medium text-charcoal">From:</span> {evidence.from}</p>}
        {evidence.to && <p className="text-sm text-charcoal/80"><span className="font-medium text-charcoal">To:</span> {evidence.to}</p>}
        {evidence.date && <p className="text-sm text-charcoal/80"><span className="font-medium text-charcoal">Date:</span> {evidence.date}</p>}
        {evidence.subject && <p className="text-sm text-charcoal/80"><span className="font-medium text-charcoal">Subject:</span> {evidence.subject}</p>}
      </div>
      {evidence.emailBody && (
        <div
          className="text-sm text-charcoal/80 prose prose-sm max-w-none [&_mark]:bg-gold/30 [&_mark]:rounded-sm [&_mark]:px-0.5"
          dangerouslySetInnerHTML={{ __html: evidence.emailBody }}
        />
      )}
    </>
  )
}

function DocumentContent({ evidence }) {
  const linkText = sourceLinkText(evidence.type)
  return (
    <>
      {evidence.docTitle && (
        <h3 className="font-serif text-lg font-semibold text-nearblack mb-3">{evidence.docTitle}</h3>
      )}
      {evidence.sourceUrl && (
        <a
          href={evidence.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-sm text-darkgold hover:underline mb-4"
        >
          {linkText} &rarr;
        </a>
      )}
      {evidence.fullText && (
        <div
          className="text-sm text-charcoal/80 whitespace-pre-wrap [&_mark]:bg-gold/30 [&_mark]:rounded-sm [&_mark]:px-0.5"
          dangerouslySetInnerHTML={{ __html: evidence.fullText }}
        />
      )}
    </>
  )
}

function PanelContent({ evidence }) {
  if (!evidence) return null
  if (evidence.type === 'email') return <EmailContent evidence={evidence} />
  return <DocumentContent evidence={evidence} />
}

export function EvidencePanel({ isOpen, onClose, evidence }) {
  const [width, setWidth] = useState(50)
  const [isDragging, setIsDragging] = useState(false)

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

  // Reset width when panel closes
  useEffect(() => {
    if (!isOpen) setWidth(50)
  }, [isOpen])

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
                  {evidence && <SourceIcon type={evidence.type} className="w-5 h-5" />}
                  <span className="text-sm font-medium">{evidence ? sourceLabel(evidence.type) : ''}</span>
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
              <div className="flex-1 overflow-y-auto px-6 py-5">
                <PanelContent evidence={evidence} />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

import { useEffect, useRef } from 'react'
import { A4Page } from './A4Page'
import { highlightStyles } from './highlightStyles'
import { ReportCoverPage } from './report/ReportCoverPage'
import { ReportTOCPage } from './report/ReportTOCPage'
import { ReportNarrativeSection } from './report/ReportNarrativeSection'
import { ReportCostsTable } from './report/ReportCostsTable'
import { ReportSummaryBlock } from './report/ReportSummaryBlock'
import { ReportPageHeader } from './report/ReportPageHeader'

export function DocumentPreview({ document, activeSubCheck }) {
  const containerRef = useRef(null)

  const highlightedFieldId =
    activeSubCheck?.evidenceType === 'document_field' &&
    (activeSubCheck.evidence?.documentId ?? 'rnd-report') === 'rnd-report'
      ? activeSubCheck.evidence?.fieldId
      : null

  useEffect(() => {
    if (!highlightedFieldId || !containerRef.current) return
    const el = containerRef.current.querySelector(`[data-field-id="${highlightedFieldId}"]`)
    if (!el) return
    el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    const result = activeSubCheck?.result
    const classes = (result && highlightStyles[result]) ? highlightStyles[result].split(/\s+/) : []
    if (classes.length) {
      el.classList.add(...classes)
      const t = setTimeout(() => el.classList.remove(...classes), 3500)
      return () => {
        clearTimeout(t)
        el.classList.remove(...classes)
      }
    }
  }, [highlightedFieldId, activeSubCheck?.result])

  // Group sections by page
  const pages = {}
  for (const section of document.sections) {
    const p = section.page ?? 1
    if (!pages[p]) pages[p] = []
    pages[p].push(section)
  }
  const sortedPages = Object.keys(pages)
    .map((n) => parseInt(n, 10))
    .sort((a, b) => a - b)
  const totalPages = sortedPages.length
  const highlightResult = highlightedFieldId ? activeSubCheck?.result : null
  const footerLeft = <span>{document.title}</span>

  return (
    <div ref={containerRef} className="space-y-6">
      {sortedPages.map((pageNum) => {
        const sections = pages[pageNum]
        // Whole-page cover
        if (sections.length === 1 && sections[0].type === 'cover') {
          return <ReportCoverPage key={pageNum} {...sections[0]} />
        }
        // Whole-page TOC
        if (sections.length === 1 && sections[0].type === 'toc') {
          return (
            <ReportTOCPage
              key={pageNum}
              entries={sections[0].entries}
              pageNum={pageNum}
              totalPages={totalPages}
              footerLeft={footerLeft}
            />
          )
        }
        return (
          <A4Page
            key={pageNum}
            pageNum={pageNum}
            totalPages={totalPages}
            headerLeft={<ReportPageHeader />}
            footerLeft={footerLeft}
          >
            <div className="space-y-7">
              {sections.map((section) => (
                <SectionDispatcher
                  key={section.id}
                  section={section}
                  highlightedFieldId={highlightedFieldId}
                  highlightResult={highlightResult}
                />
              ))}
            </div>
          </A4Page>
        )
      })}
    </div>
  )
}

function SectionDispatcher({ section, highlightedFieldId, highlightResult }) {
  const type = section.type || 'fields'

  if (type === 'narrative') {
    return (
      <ReportNarrativeSection
        fieldId={section.fieldId}
        heading={section.heading}
        questions={section.questions}
      />
    )
  }

  if (type === 'details-panel') {
    return (
      <div className="mb-8 border-l-4 border-reportAccent pl-4 py-2 bg-reportAccentSoft/40">
        {section.title && (
          <h4 className="font-sans font-bold text-[11px] text-reportAccent uppercase tracking-wider mb-2">
            {section.title}
          </h4>
        )}
        <div className="grid grid-cols-2 gap-x-6 gap-y-2">
          {section.lines.map((line) => (
            <div key={line.id} data-field-id={line.id} className="flex flex-col">
              <span className="font-sans text-[9.5px] uppercase tracking-wider text-charcoal/55">
                {line.label}
              </span>
              <span className="font-sans text-[12px] font-semibold text-nearblack mt-0.5">
                {line.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (type === 'narrative-intro') {
    return (
      <div>
        {section.heading && (
          <h3 className="font-sans font-black text-[22px] text-nearblack mb-4">{section.heading}</h3>
        )}
        <div className="space-y-3">
          {section.paragraphs.map((p, i) => (
            <p
              key={i}
              className="font-serif text-[11.5px] leading-[1.55] text-charcoal/90 text-justify"
            >
              {p}
            </p>
          ))}
        </div>
      </div>
    )
  }

  if (type === 'costs-table') {
    return (
      <ReportCostsTable
        fieldId={section.fieldId}
        title={section.title}
        columns={section.columns}
        rows={section.rows}
        totalRow={section.totalRow}
      />
    )
  }

  if (type === 'summary-block') {
    return <ReportSummaryBlock title={section.title} lines={section.lines} />
  }

  if (type === 'appendix-table') {
    return (
      <div data-field-id={section.fieldId}>
        <h3 className="font-sans font-black text-[22px] text-nearblack mb-6 text-center uppercase tracking-wide">
          {section.heading}
        </h3>
        <table className="w-full border-collapse text-[10.5px]">
          <thead>
            <tr className="bg-reportAccent text-white">
              {section.columns.map((c) => (
                <th
                  key={c.key}
                  className={`px-2.5 py-2 font-sans font-semibold uppercase tracking-wider ${
                    c.align === 'right' ? 'text-right' : 'text-left'
                  }`}
                >
                  {c.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {section.rows.map((row) => (
              <tr
                key={row.id}
                data-field-id={row.id}
                className="border-b border-dotted border-warmgrey/40 font-sans"
              >
                {section.columns.map((c) => (
                  <td
                    key={c.key}
                    className={`px-2.5 py-1.5 ${
                      c.align === 'right' ? 'text-right tabular-nums' : 'text-left'
                    } ${row.bold ? 'font-bold text-nearblack' : 'text-charcoal/85'}`}
                  >
                    {row.cells[c.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  // Legacy fields rendering (rev-2..rev-5)
  return (
    <section>
      <h4 className="font-serif text-[15px] font-semibold text-nearblack mb-4 pb-1.5 border-b border-warmgrey/30">
        {section.heading}
      </h4>
      <div className="space-y-4">
        {section.fields.map((field) => {
          const isHighlighted = highlightedFieldId === field.id
          return (
            <div
              key={field.id}
              id={field.id}
              data-field-id={field.id}
              className={isHighlighted && highlightResult ? highlightStyles[highlightResult] : undefined}
            >
              <div className="font-sans text-[10px] uppercase tracking-wider font-medium text-charcoal/45 mb-0.5">
                {field.label}
              </div>
              <div className="font-serif text-[13px] text-charcoal/90 leading-[1.55] whitespace-pre-wrap">
                {field.value}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

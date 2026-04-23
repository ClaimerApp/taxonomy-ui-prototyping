import { useEffect, useRef } from 'react'
import { A4Page } from './A4Page'
import { highlightStyles } from './highlightStyles'
import { cn } from '../../lib/cn'

// HMRC-style box number chip
function BoxNumber({ n }) {
  return (
    <span
      className="inline-flex items-center justify-center shrink-0 rounded-[2px] bg-hmrc text-white font-bold text-[11px] leading-none"
      style={{ width: 28, height: 22 }}
    >
      {n}
    </span>
  )
}

// A tinted "input visual" — looks like a form field with a value typed in
function TextInput({ value, wide = true }) {
  return (
    <div
      className={cn(
        'border border-hmrcBorder bg-hmrcField text-[12px] text-nearblack flex items-center px-2',
        wide ? 'min-w-0 flex-1' : '',
      )}
      style={{ height: 22 }}
    >
      <span className="truncate">{value}</span>
    </div>
  )
}

// Digit-grid for money (£ X X X X . Y Y)
// value is a string/number; we render a fixed grid of pence + pounds
function MoneyInput({ value, digits = 11 }) {
  const asStr = typeof value === 'number' ? value.toFixed(2) : String(value ?? '')
  const num = parseFloat(asStr.replace(/[£,\s]/g, '')) || 0
  const fixed = num.toFixed(2)
  const [whole, pence] = fixed.split('.')
  const wholeDigits = whole.split('').reverse() // right-aligned
  const cells = []
  for (let i = digits - 1; i >= 0; i--) {
    cells.push(wholeDigits[i] || '')
  }
  return (
    <div className="flex items-center gap-0">
      <span className="text-[12px] text-charcoal/60 mr-1">£</span>
      <div className="flex">
        {cells.map((d, i) => (
          <div
            key={i}
            className="border-r border-hmrcBorder bg-hmrcField text-[12px] text-nearblack flex items-center justify-center first:border-l tabular-nums"
            style={{ width: 18, height: 22 }}
          >
            {d}
          </div>
        ))}
      </div>
      <span className="text-[12px] text-charcoal/60 mx-1">·</span>
      <div className="flex">
        {pence.split('').map((d, i) => (
          <div
            key={i}
            className="border-r border-hmrcBorder bg-hmrcField text-[12px] text-charcoal/50 flex items-center justify-center first:border-l tabular-nums"
            style={{ width: 18, height: 22 }}
          >
            {d}
          </div>
        ))}
      </div>
    </div>
  )
}

// Date cells DD MM YYYY — 8 cells
function DateInput({ value }) {
  // value like "01/04/2024" or "1 April 2024"
  let dd = '', mm = '', yyyy = ''
  const m1 = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(value || '')
  if (m1) { dd = m1[1]; mm = m1[2]; yyyy = m1[3] }
  else {
    const parsed = new Date(value)
    if (!isNaN(parsed)) {
      dd = String(parsed.getDate()).padStart(2, '0')
      mm = String(parsed.getMonth() + 1).padStart(2, '0')
      yyyy = String(parsed.getFullYear())
    }
  }
  const row = [dd[0], dd[1], mm[0], mm[1], yyyy[0], yyyy[1], yyyy[2], yyyy[3]]
  return (
    <div className="flex items-center">
      {row.map((ch, i) => (
        <div
          key={i}
          className={cn(
            'border-r border-hmrcBorder bg-hmrcField text-[12px] text-nearblack flex items-center justify-center first:border-l tabular-nums',
            (i === 1 || i === 3) && 'mr-1.5',
          )}
          style={{ width: 18, height: 22 }}
        >
          {ch || ''}
        </div>
      ))}
    </div>
  )
}

// Single check box (tick or empty)
function CheckBox({ checked }) {
  return (
    <div
      className="border border-hmrcBorder bg-hmrcField flex items-center justify-center"
      style={{ width: 22, height: 22 }}
    >
      {checked ? <span className="text-nearblack text-[14px] leading-none font-bold">X</span> : null}
    </div>
  )
}

function FieldRow({ field, isHighlighted, result }) {
  const { id, box, label, type = 'text', value, checked, note } = field
  const Input = {
    money: <MoneyInput value={value} />,
    date: <DateInput value={value} />,
    checkbox: <CheckBox checked={checked} />,
    percent: <TextInput value={value} />,
    text: <TextInput value={value} />,
  }[type]

  return (
    <div
      id={id}
      data-field-id={id}
      className={cn(
        'flex items-start gap-3 py-2',
        isHighlighted && result ? highlightStyles[result] : undefined,
      )}
    >
      <BoxNumber n={box} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3">
          <div className={cn('text-[12px] text-nearblack font-semibold', type === 'checkbox' || type === 'money' || type === 'date' ? 'flex-1 pr-2' : 'min-w-[220px]')}>
            {label}
          </div>
          {type === 'money' || type === 'date' || type === 'checkbox'
            ? <div className="shrink-0">{Input}</div>
            : <div className="flex-1 max-w-[360px]">{Input}</div>}
        </div>
        {note && <div className="text-[10.5px] text-charcoal/60 mt-1 pl-0">{note}</div>}
      </div>
    </div>
  )
}

function SectionGroup({ heading, groupStyle = 'boxed', children }) {
  return (
    <section className="mb-5">
      {heading && (
        <h3 className="text-[15px] text-hmrc font-semibold mb-1.5">{heading}</h3>
      )}
      <div
        className={cn(
          groupStyle === 'boxed' ? 'bg-hmrcTint border-t-[3px] border-hmrc px-3 py-3' : '',
        )}
      >
        {children}
      </div>
    </section>
  )
}

function HMRCLogo() {
  return (
    <img
      src={`${import.meta.env.BASE_URL}hmrc-logo.png.webp`}
      alt="HM Revenue & Customs"
      className="h-10 w-auto shrink-0"
    />
  )
}

export function CT600Preview({ content, activeSubCheck }) {
  const containerRef = useRef(null)
  const highlightedFieldId =
    activeSubCheck?.evidenceType === 'document_field' &&
    activeSubCheck.evidence?.documentId === 'ct600'
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

  if (!content?.sections?.length) {
    return <p className="text-sm text-charcoal/50 py-8 text-center">No content available.</p>
  }

  // Group sections by page
  const pages = {}
  for (const section of content.sections) {
    const p = section.page ?? 1
    if (!pages[p]) pages[p] = []
    pages[p].push(section)
  }
  const sortedPages = Object.keys(pages).sort((a, b) => a - b)
  const totalPages = sortedPages.length

  return (
    <div ref={containerRef} className="space-y-6">
      {sortedPages.map((pageNum, pageIdx) => (
        <A4Page
          key={pageNum}
          variant="ct600"
          pageNum={pageNum}
          totalPages={totalPages}
          headerLeft={pageIdx === 0 ? <HMRCLogo /> : <div style={{ height: 0 }} />}
          headerRight={pageIdx === 0 ? (
            <div className="text-right">
              <div className="text-hmrc text-[22px] font-semibold leading-[1.1]">Company Tax Return</div>
              <div className="text-hmrc text-[13px] font-semibold mt-0.5">CT600 (2026) Version 3</div>
              <div className="text-charcoal/70 text-[11px] mt-0.5">for accounting periods starting on or after 1 April 2015</div>
            </div>
          ) : null}
          footerLeft={<span className="font-hmrc">CT600(2026) Version 3</span>}
          footerRight={<span className="font-hmrc">HMRC 04/26</span>}
        >
          {pageIdx === 0 && (
            <div className="mb-5">
              <h2 className="text-hmrc text-[20px] font-semibold mb-2">Your Company Tax Return</h2>
              <p className="text-[11.5px] text-nearblack leading-[1.45] mb-1.5">
                If we send the company a 'Notice' to deliver a Company Tax Return it has to comply by the filing date or we charge a penalty, even if there is no tax to pay.
              </p>
              <p className="text-[11.5px] text-nearblack leading-[1.45] mb-1.5">
                A return includes a Company Tax Return form, any supplementary pages, accounts, computations and any relevant information. The CT600 Guide tells you how the return must be formatted and delivered.
              </p>
              <p className="text-[11.5px] text-nearblack leading-[1.45]">
                The forms in the CT600 series set out the information we need and provide a standard format for calculations.
              </p>
            </div>
          )}

          {pages[pageNum].map((section) => (
            <SectionGroup
              key={section.id}
              heading={section.heading}
              groupStyle={section.groupStyle}
            >
              {section.intro && (
                <div className="text-[11.5px] text-nearblack mb-2">{section.intro}</div>
              )}
              {section.fields.map((field) => {
                const isHighlighted = highlightedFieldId === field.id
                const result = isHighlighted ? activeSubCheck?.result : null
                return (
                  <FieldRow
                    key={field.id}
                    field={field}
                    isHighlighted={isHighlighted}
                    result={result}
                  />
                )
              })}
            </SectionGroup>
          ))}
        </A4Page>
      ))}
    </div>
  )
}

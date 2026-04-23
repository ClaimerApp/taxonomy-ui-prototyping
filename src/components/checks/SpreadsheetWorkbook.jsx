import { useEffect, useMemo, useRef, useState } from 'react'
import { cn } from '../../lib/cn'
import { colLetter, cellRef, formatCell, isNumericFormat, parseCellRef } from '../../lib/spreadsheet'
import { highlightStyles } from './highlightStyles'

// Backwards-compat shim: if an old flat `{ columns: [...], rows: [...] }` is passed, wrap it.
function normaliseWorkbook(wb) {
  if (!wb) return null
  if (wb.sheets) return wb
  if (wb.columns && wb.rows) {
    return {
      filename: 'Working Papers.xlsx',
      activeSheetId: 'sheet1',
      sheets: [
        {
          id: 'sheet1',
          name: 'Sheet 1',
          frozenRows: 1,
          frozenCols: 1,
          columns: wb.columns.map((label, i) => ({
            key: `c${i}`,
            label: typeof label === 'string' ? label : String(label),
            width: 130,
            format: 'text',
          })),
          rows: wb.rows.map((cells, ri) => ({
            style: ri === wb.rows.length - 1 ? 'total' : undefined,
            cells: cells.reduce((acc, v, ci) => ({ ...acc, [`c${ci}`]: v }), {}),
          })),
        },
      ],
    }
  }
  return null
}

function cellValue(c) {
  if (c && typeof c === 'object' && 'value' in c) return c.value
  return c
}
function cellFormula(c) {
  if (c && typeof c === 'object') return c.formula
  return undefined
}
function cellOverrideFormat(c) {
  if (c && typeof c === 'object') return c.format
  return undefined
}

export function SpreadsheetWorkbook({ workbook, activeSubCheck }) {
  const wb = useMemo(() => normaliseWorkbook(workbook), [workbook])
  const [activeSheetId, setActiveSheetId] = useState(wb?.activeSheetId || wb?.sheets?.[0]?.id)
  const [activeCell, setActiveCell] = useState({ sheetId: activeSheetId, r: 0, c: 0 })
  const [pulseCell, setPulseCell] = useState(null) // { sheetId, r, c, result }
  const gridWrapRef = useRef(null)

  // React to a sub-check targeting this document
  const evidence = activeSubCheck?.evidenceType === 'document_field' ? activeSubCheck.evidence : null
  const evidenceDoc = evidence?.documentId
  const evidenceSheet = evidence?.sheetId
  const evidenceRef = evidence?.cellRef
  useEffect(() => {
    if (evidenceDoc !== 'working-papers' || !evidenceSheet || !evidenceRef) return
    const parsed = parseCellRef(evidenceRef)
    if (!parsed) return
    setActiveSheetId(evidenceSheet)
    setActiveCell({ sheetId: evidenceSheet, r: parsed.r, c: parsed.c })
    setPulseCell({ sheetId: evidenceSheet, r: parsed.r, c: parsed.c, result: activeSubCheck?.result })
  }, [evidenceDoc, evidenceSheet, evidenceRef, activeSubCheck?.result])

  // Scroll the pulsed cell into view once it's rendered (after sheet switch has mounted it)
  useEffect(() => {
    if (!pulseCell || !gridWrapRef.current) return
    const sel = `[data-cell-ref='${pulseCell.sheetId}:${cellRef(pulseCell.r, pulseCell.c)}']`
    const el = gridWrapRef.current.querySelector(sel)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' })
    const t = setTimeout(() => setPulseCell(null), 2400)
    return () => clearTimeout(t)
  }, [pulseCell])

  if (!wb) {
    return <p className="text-sm text-charcoal/50 py-8 text-center">No workbook data.</p>
  }

  const sheet = wb.sheets.find((s) => s.id === activeSheetId) || wb.sheets[0]

  function handleCellClick(r, c) {
    setActiveCell({ sheetId: sheet.id, r, c })
  }

  const activeCellObj =
    activeCell.sheetId === sheet.id ? sheet.rows[activeCell.r]?.cells[sheet.columns[activeCell.c]?.key] : null
  const activeFormula = cellFormula(activeCellObj)
  const activeDisplay = activeFormula || formatCell(cellValue(activeCellObj), sheet.columns[activeCell.c]?.format)
  const activeRef = activeCell.sheetId === sheet.id ? cellRef(activeCell.r + 1, activeCell.c + 1) : ''

  return (
    <div className="flex flex-col h-full min-h-0 bg-white">
      {/* Name box + formula bar */}
      <div className="flex items-stretch border-b border-warmgrey/30 bg-warmgrey/5 shrink-0">
        <div className="px-3 py-1.5 flex items-center text-[11px] font-mono text-charcoal/70 border-r border-warmgrey/30 bg-white min-w-[80px] tabular-nums">
          {activeRef}
        </div>
        <div className="px-2 py-1.5 flex items-center gap-2 flex-1 min-w-0">
          <span className="text-[11px] italic text-charcoal/50 font-serif">fx</span>
          <span className="text-[12px] font-mono text-charcoal/80 truncate">{activeDisplay}</span>
        </div>
      </div>

      {/* Grid */}
      <div ref={gridWrapRef} className="flex-1 min-h-0 overflow-auto">
        <SheetGrid
          sheet={sheet}
          activeCell={activeCell}
          onCellClick={handleCellClick}
          pulseCell={pulseCell && pulseCell.sheetId === sheet.id ? pulseCell : null}
        />
      </div>

      {/* Bottom tab strip */}
      <div className="shrink-0 flex items-center gap-0 border-t border-warmgrey/30 bg-warmgrey/5 overflow-x-auto">
        <button
          type="button"
          className="shrink-0 px-2.5 py-1 text-[11px] text-charcoal/50 hover:bg-warmgrey/10 border-r border-warmgrey/20"
          title="Previous sheet"
        >
          ‹
        </button>
        {wb.sheets.map((s) => (
          <button
            key={s.id}
            onClick={() => setActiveSheetId(s.id)}
            className={cn(
              'shrink-0 px-3 py-1.5 text-[12px] border-r border-warmgrey/20 transition-colors',
              s.id === sheet.id
                ? 'bg-white text-nearblack font-semibold border-t-2 border-t-emerald-600 -mt-px relative'
                : 'text-charcoal/60 hover:bg-warmgrey/10'
            )}
          >
            {s.name}
          </button>
        ))}
        <div className="ml-auto pr-3 py-1 text-[10.5px] text-charcoal/45 truncate shrink-0">
          {wb.filename}
        </div>
      </div>
    </div>
  )
}

function SheetGrid({ sheet, activeCell, onCellClick, pulseCell }) {
  const { columns, rows, frozenCols = 0 } = sheet
  const firstColSticky = frozenCols >= 1
  const pulseResult = pulseCell?.result || null

  return (
    <table
      className="border-separate border-spacing-0 font-sans text-[12px]"
      style={{ tableLayout: 'fixed', minWidth: 'max-content' }}
    >
      <colgroup>
        <col style={{ width: 36 }} />
        {columns.map((c, i) => (
          <col key={i} style={{ width: c.width || 120 }} />
        ))}
      </colgroup>
      <thead>
        {/* Column letters row */}
        <tr className="text-center">
          <th
            className="sticky top-0 left-0 z-30 bg-warmgrey/20 border-r border-b border-warmgrey/30 text-[10px] text-charcoal/50"
            style={{ height: 18 }}
          />
          {columns.map((c, i) => (
            <th
              key={i}
              className={cn(
                'sticky top-0 z-20 bg-warmgrey/15 border-r border-b border-warmgrey/30 text-[10px] text-charcoal/50 font-mono font-normal',
                activeCell.c === i && 'bg-emerald-100 text-emerald-900 font-semibold',
              )}
              style={{ height: 18 }}
            >
              {colLetter(i)}
            </th>
          ))}
        </tr>
        {/* Labels row */}
        <tr>
          <th
            className="sticky left-0 z-20 bg-warmgrey/10 border-r border-b border-warmgrey/30 text-[10px] text-charcoal/45"
            style={{ top: 18, height: 26 }}
          />
          {columns.map((c, i) => (
            <th
              key={i}
              className={cn(
                'sticky z-10 bg-warmgrey/5 border-r border-b border-warmgrey/30 text-left px-2 text-[11px] font-semibold text-charcoal/80',
                firstColSticky && i === 0 && 'left-9 sticky z-20 bg-warmgrey/10',
              )}
              style={{ top: 18, height: 26 }}
            >
              {c.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, ri) => {
          const isStyled = row.style
          const isBlank = isStyled === 'blank'
          const isHeaderRow = isStyled === 'header'
          const isSubtotal = isStyled === 'subtotal'
          const isTotal = isStyled === 'total'
          const rowBg =
            isTotal ? 'bg-warmgrey/15'
            : isSubtotal ? 'bg-warmgrey/5'
            : isHeaderRow ? 'bg-gold/10'
            : ri % 2 === 0 ? 'bg-white' : 'bg-cream/40'

          return (
            <tr key={ri} className={cn(rowBg, 'border-b border-warmgrey/15')}>
              <td
                className={cn(
                  'sticky left-0 z-10 text-center text-[10px] text-charcoal/50 font-mono border-r border-b border-warmgrey/25 bg-warmgrey/10',
                  activeCell.r === ri && 'bg-emerald-100 text-emerald-900 font-semibold',
                )}
                style={{ height: 22 }}
              >
                {ri + 1}
              </td>
              {columns.map((col, ci) => {
                const cell = row.cells?.[col.key]
                if (cell === undefined && isBlank) {
                  return <td key={ci} className="border-r border-b border-warmgrey/15" style={{ height: 22 }} />
                }
                const val = cellValue(cell)
                const formula = cellFormula(cell)
                const fmtOverride = cellOverrideFormat(cell)
                const format = fmtOverride || col.format || 'text'
                const display = formatCell(val, format)
                const isActive = activeCell.r === ri && activeCell.c === ci
                const isPulse = pulseCell && pulseCell.r === ri && pulseCell.c === ci
                const isNumeric = isNumericFormat(format)
                const pulseRing =
                  isPulse && pulseResult === 'pass' ? 'outline outline-[3px] outline-gold -outline-offset-1 z-[6] bg-gold/20' :
                  isPulse && pulseResult === 'warning' ? 'outline outline-[3px] outline-orange-400 -outline-offset-1 z-[6] bg-orange-50' :
                  isPulse && pulseResult === 'critical' ? 'outline outline-[3px] outline-red-400 -outline-offset-1 z-[6] bg-red-50' :
                  null
                return (
                  <td
                    key={ci}
                    data-cell-ref={`${sheet.id}:${cellRef(ri, ci)}`}
                    onClick={() => onCellClick(ri, ci)}
                    className={cn(
                      'relative border-r border-b border-warmgrey/15 px-2 cursor-cell whitespace-nowrap overflow-hidden',
                      firstColSticky && ci === 0 && 'sticky left-9 z-10',
                      firstColSticky && ci === 0 && (
                        isTotal ? 'bg-warmgrey/20'
                        : isSubtotal ? 'bg-warmgrey/10'
                        : isHeaderRow ? 'bg-gold/15'
                        : ri % 2 === 0 ? 'bg-white' : 'bg-cream/60'
                      ),
                      isNumeric && 'text-right tabular-nums',
                      isHeaderRow && 'font-semibold text-nearblack',
                      isSubtotal && 'font-semibold border-t border-warmgrey/40',
                      isTotal && 'font-bold border-t-2 border-warmgrey/50 text-nearblack',
                      !isTotal && !isSubtotal && !isHeaderRow && 'text-charcoal/85',
                      isActive && !isPulse && 'outline outline-2 outline-emerald-600 -outline-offset-1 z-[5]',
                      pulseRing,
                      formula && 'pr-5',
                    )}
                    style={{ height: 22 }}
                    title={formula || undefined}
                  >
                    {display}
                    {formula && (
                      <span
                        className="absolute top-0 right-0.5 text-[8px] text-darkgold/80 font-serif italic leading-tight"
                        aria-hidden="true"
                      >fx</span>
                    )}
                  </td>
                )
              })}
            </tr>
          )
        })}
        {/* Pad with blank rows for Excel feel */}
        {Array.from({ length: Math.max(0, 20 - rows.length) }).map((_, i) => (
          <tr key={`pad-${i}`} className={i % 2 === 0 ? 'bg-white' : 'bg-cream/30'}>
            <td
              className="sticky left-0 z-10 text-center text-[10px] text-charcoal/40 font-mono border-r border-b border-warmgrey/15 bg-warmgrey/5"
              style={{ height: 22 }}
            >
              {rows.length + i + 1}
            </td>
            {columns.map((col, ci) => (
              <td
                key={ci}
                className={cn(
                  'border-r border-b border-warmgrey/10 px-2',
                  firstColSticky && ci === 0 && 'sticky left-9 z-10',
                  firstColSticky && ci === 0 && (i % 2 === 0 ? 'bg-white' : 'bg-cream/30'),
                )}
                style={{ height: 22 }}
              />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

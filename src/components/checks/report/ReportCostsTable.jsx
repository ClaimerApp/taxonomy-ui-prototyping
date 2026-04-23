import { cn } from '../../../lib/cn'

export function ReportCostsTable({ title, columns, rows, totalRow, fieldId }) {
  return (
    <div className="mb-6" data-field-id={fieldId}>
      {title && (
        <h4 className="font-sans font-bold text-[14px] text-reportAccent mb-2">
          {title}
        </h4>
      )}
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-reportAccent text-white">
            {columns.map((c) => (
              <th
                key={c.key}
                className={cn(
                  'font-sans font-semibold text-[10px] uppercase tracking-wider px-2.5 py-2',
                  c.align === 'right' ? 'text-right' : c.align === 'center' ? 'text-center' : 'text-left',
                )}
                style={c.width ? { width: c.width } : undefined}
              >
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.id}
              data-field-id={row.id}
              className="border-b border-dotted border-warmgrey/40"
            >
              {columns.map((c) => (
                <td
                  key={c.key}
                  className={cn(
                    'px-2.5 py-1.5 font-sans text-[11px] text-charcoal/85',
                    c.align === 'right' ? 'text-right tabular-nums' : c.align === 'center' ? 'text-center' : 'text-left',
                  )}
                >
                  {row.cells[c.key]}
                </td>
              ))}
            </tr>
          ))}
          {totalRow && (
            <tr data-field-id={totalRow.id} className="bg-reportAccentSoft">
              {columns.map((c, i) => (
                <td
                  key={c.key}
                  className={cn(
                    'px-2.5 py-1.5 font-sans font-bold text-[11px] text-nearblack',
                    c.align === 'right' ? 'text-right tabular-nums' : c.align === 'center' ? 'text-center' : 'text-left',
                  )}
                >
                  {i === 0 && !totalRow.cells[c.key] ? '' : totalRow.cells[c.key] ?? (i === columns.length - 2 ? 'Total' : '')}
                </td>
              ))}
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

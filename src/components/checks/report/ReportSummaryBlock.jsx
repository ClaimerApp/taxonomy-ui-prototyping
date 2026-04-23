import { cn } from '../../../lib/cn'

export function ReportSummaryBlock({ title, lines }) {
  return (
    <div className="mt-8 max-w-[480px] ml-auto">
      {title && (
        <h4 className="font-sans font-bold text-[12.5px] text-nearblack mb-2 text-right">
          {title}
        </h4>
      )}
      <div className="space-y-0">
        {lines.map((line) => (
          <div
            key={line.id}
            data-field-id={line.id}
            className={cn(
              'flex items-baseline justify-between px-3 py-1 border-b border-dotted border-warmgrey/40 font-sans text-[11px]',
              line.highlight && 'bg-reportAccent text-white font-semibold border-b-0 my-0.5',
              !line.highlight && line.bold && 'font-bold text-nearblack',
              !line.highlight && !line.bold && 'text-charcoal/85',
            )}
          >
            <span>{line.label}</span>
            <span className="tabular-nums">{line.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

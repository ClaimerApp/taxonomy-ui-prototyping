import { A4Page } from '../A4Page'
import { NexagenWordmark } from './NexagenWordmark'

export function ReportCoverPage({ clientName, title, subtitle, preparedBy, financialYear }) {
  return (
    <A4Page>
      <div className="flex flex-col h-full relative" style={{ minHeight: 980 }}>
        <div className="absolute top-0 left-0">
          <NexagenWordmark size="lg" />
        </div>

        <div className="mt-auto mb-auto pr-4">
          <div
            data-field-id="f-company-name"
            className="font-sans font-black text-[34px] leading-[1.05] text-nearblack tracking-tight uppercase"
          >
            {clientName}
          </div>
          <div className="mt-3 font-sans font-bold text-[17px] text-reportAccent tracking-wide uppercase">
            {title}
          </div>

          <div className="mt-12 space-y-2">
            {subtitle && (
              <p className="font-sans text-[12px] text-charcoal/70 max-w-[480px] leading-relaxed">
                {subtitle}
              </p>
            )}
            <p className="font-sans text-[11px] text-charcoal/80 pt-3">Report prepared by: {preparedBy}</p>
            <p data-field-id="f-accounting-period" className="font-sans text-[11px] text-charcoal/80">
              Financial year: {financialYear}
            </p>
          </div>
        </div>
      </div>
    </A4Page>
  )
}

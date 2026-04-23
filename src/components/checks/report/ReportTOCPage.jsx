import { A4Page } from '../A4Page'
import { ReportPageHeader } from './ReportPageHeader'

export function ReportTOCPage({ entries, pageNum, totalPages, footerLeft }) {
  return (
    <A4Page
      pageNum={pageNum}
      totalPages={totalPages}
      headerLeft={<ReportPageHeader />}
      footerLeft={footerLeft}
    >
      <h2 className="font-sans font-black text-[28px] text-nearblack mb-10">Table of Contents</h2>
      <ul className="space-y-4">
        {entries.map((e) => (
          <li
            key={e.label}
            className="flex items-baseline justify-between border-b border-dotted border-warmgrey/40 pb-2"
          >
            <span className="font-sans font-semibold text-[13px] text-charcoal">{e.label}</span>
            <span className="font-sans font-semibold text-[13px] text-charcoal tabular-nums">{e.page}</span>
          </li>
        ))}
      </ul>
    </A4Page>
  )
}

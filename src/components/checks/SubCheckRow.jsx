import { cn } from '../../lib/cn'
import { SubCheckEvidence } from './SubCheckEvidence'

const BORDER_COLOR = {
  document_field: 'border-gold',
  declaration: 'border-gold',
  external: 'border-blue-400',
  cross_reference: 'border-warmgrey',
}

const STATUS_ICON = {
  pass: <span className="text-emerald-600 text-sm">✓</span>,
  warning: <span className="text-orange-500 text-sm">⚠</span>,
  critical: <span className="text-red-600 text-sm">✖</span>,
}

const EVIDENCE_LABEL = {
  document_field: 'Document',
  external: 'External',
  cross_reference: 'Cross-ref',
  declaration: 'Declaration',
}

const BADGE_STYLE = {
  document_field: 'bg-gold/15 text-darkgold',
  declaration: 'bg-gold/15 text-darkgold',
  external: 'bg-blue-50 text-blue-700',
  cross_reference: 'bg-warmgrey/15 text-charcoal/60',
}

export function SubCheckRow({ subCheck, isActive, onClick }) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick() }}
      className={cn(
        'border-l-4',
        BORDER_COLOR[subCheck.evidenceType],
        isActive
          ? 'bg-gold/10 rounded-lg ring-1 ring-gold/30'
          : 'bg-warmgrey/5 rounded-lg cursor-pointer hover:bg-warmgrey/10 transition-colors'
      )}
    >
      <div className="flex items-center gap-3 px-3 py-2.5">
        {STATUS_ICON[subCheck.result]}

        <span className={cn(
          'flex-1 text-sm',
          isActive ? 'text-nearblack font-medium' : 'text-charcoal/80'
        )}>
          {subCheck.assertion}
        </span>

        <span className={cn(
          'text-[11px] px-2 py-0.5 rounded-full',
          BADGE_STYLE[subCheck.evidenceType]
        )}>
          {EVIDENCE_LABEL[subCheck.evidenceType]}
        </span>
      </div>

      {isActive && (
        <div className="px-3 pb-2">
          <p className="text-xs text-charcoal/60 mt-2">{subCheck.reasoning}</p>
          <SubCheckEvidence subCheck={subCheck} />
        </div>
      )}
    </div>
  )
}

import { ExternalRecord } from './ExternalRecord'

export function SubCheckEvidence({ subCheck }) {
  const { evidenceType, evidence, result } = subCheck

  if (evidenceType === 'document_field') {
    return (
      <div className="border-l-4 border-gold bg-gold/5 rounded-r-lg p-3">
        <div className="text-[11px] font-medium text-charcoal/50 mb-1">Extracted from document</div>
        <span className="text-sm font-medium text-nearblack">{evidence.value}</span>
        {evidence.page && <span className="text-[11px] text-warmgrey ml-2">p.{evidence.page}</span>}
      </div>
    )
  }

  if (evidenceType === 'external') {
    return (
      <ExternalRecord
        source={evidence.source}
        sourceUrl={evidence.sourceUrl}
        records={evidence.records}
      />
    )
  }

  if (evidenceType === 'cross_reference') {
    return (
      <div className="rounded-lg border border-warmgrey/20 overflow-hidden">
        <div className="grid grid-cols-2">
          <div className="p-3 bg-warmgrey/5">
            <div className="text-[11px] font-medium text-charcoal/50 mb-1">{evidence.sourceA.label}</div>
            <div className="text-sm text-nearblack">{evidence.sourceA.value}</div>
          </div>
          <div className="p-3 bg-warmgrey/5 border-l border-warmgrey/20">
            <div className="text-[11px] font-medium text-charcoal/50 mb-1">{evidence.sourceB.label}</div>
            <div className="text-sm text-nearblack">{evidence.sourceB.value}</div>
          </div>
        </div>

        {evidence.match ? (
          <div className="px-3 py-2 border-t border-warmgrey/20 bg-emerald-50/50">
            <span className="text-emerald-600 text-xs">✓ Match</span>
          </div>
        ) : (
          <div className="px-3 py-2 border-t border-warmgrey/20">
            <span className="text-red-600 text-xs font-medium">✖ Mismatch</span>
            {evidence.discrepancy && (
              <div className="text-xs text-charcoal/60 mt-0.5">{evidence.discrepancy}</div>
            )}
          </div>
        )}
      </div>
    )
  }

  if (evidenceType === 'declaration') {
    return (
      <div className="rounded-lg border border-warmgrey/20 p-3 space-y-2">
        <div>
          <div className="text-xs text-charcoal/50 mb-1">Expected</div>
          <div className="text-sm text-charcoal/60 italic">{evidence.expected}</div>
        </div>

        {evidence.extractedText ? (
          <div className="border-l-4 border-gold bg-gold/5 rounded-r-lg p-2">
            <div className="text-sm text-nearblack">{evidence.extractedText}</div>
          </div>
        ) : evidence.found === false && result === 'pass' ? (
          <div className="text-sm text-charcoal/50 italic">No explicit declaration found — absence noted</div>
        ) : (
          <div className="bg-red-50 border border-red-200 rounded-lg p-2 text-sm text-red-700">
            Declaration not found
          </div>
        )}
      </div>
    )
  }

  return null
}

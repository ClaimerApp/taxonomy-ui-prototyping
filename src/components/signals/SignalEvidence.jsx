import { useState } from 'react'
import { EvidenceSourceIcon, evidenceSourceLabel } from './EvidenceSourceIcon'
import { EvidencePanel } from './EvidencePanel'

export function SignalEvidence({ evidence }) {
  const [selectedEvidence, setSelectedEvidence] = useState(null)

  if (!evidence?.length) return null

  return (
    <div className="space-y-3">
      <h2 className="font-serif text-lg font-semibold text-nearblack">Evidence & reasoning</h2>

      <div className="space-y-3">
        {evidence.map((item, i) => {
          const clickable = item.type !== 'no_source'
          return (
            <div
              key={i}
              className={`border-l-2 border-gold/30 pl-4 ${
                clickable
                  ? 'hover:bg-gold/5 hover:border-gold/50 cursor-pointer transition-colors rounded-r-lg -ml-0.5 pl-[1.125rem]'
                  : 'opacity-70'
              }`}
              {...(clickable && { onClick: () => setSelectedEvidence(item) })}
            >
              <div className="flex items-start gap-2">
                <EvidenceSourceIcon type={item.type} className="w-4 h-4 text-warmgrey mt-0.5 shrink-0" />
                <p className="text-sm text-charcoal/80">{item.text}</p>
              </div>
              <div className="flex items-center gap-2 mt-0.5 ml-6">
                <p className="text-xs text-warmgrey">{item.source}</p>
                <span className="text-xs text-warmgrey bg-warmgrey/10 px-1.5 py-0.5 rounded">
                  {evidenceSourceLabel(item.type)}
                </span>
              </div>
            </div>
          )
        })}
      </div>

      <EvidencePanel
        isOpen={!!selectedEvidence}
        onClose={() => setSelectedEvidence(null)}
        evidence={selectedEvidence}
      />
    </div>
  )
}

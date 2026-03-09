export function SignalEvidence({ evidence }) {
  if (!evidence?.length) return null

  return (
    <div className="space-y-3">
      <h2 className="font-serif text-lg font-semibold text-nearblack">Evidence & reasoning</h2>

      <div className="space-y-3">
        {evidence.map((item, i) => (
          <div key={i} className="border-l-2 border-gold/30 pl-4">
            <p className="text-sm text-charcoal">{item.text}</p>
            <p className="text-xs text-warmgrey mt-0.5">{item.source}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

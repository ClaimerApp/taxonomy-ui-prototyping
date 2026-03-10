import { Card } from '../ui/Card'

const FLAG_MAP = {
  GB: '🇬🇧', IE: '🇮🇪', DE: '🇩🇪', US: '🇺🇸', FR: '🇫🇷',
}

export function EntityDetailsTab({ entity }) {
  const isCompany = entity.type === 'company'

  const fields = [
    { label: 'Entity Type', value: entity.entityType },
    { label: 'Country', value: `${FLAG_MAP[entity.country] || ''} ${entity.country}` },
    isCompany && { label: 'Company Number', value: entity.companyNumber },
    !isCompany && entity.utr && { label: 'UTR', value: entity.utr },
    { label: 'Sector', value: entity.sector },
    { label: 'Relationship', value: entity.relationship.charAt(0).toUpperCase() + entity.relationship.slice(1) },
  ].filter(Boolean)

  return (
    <Card className="p-6">
      <h3 className="font-serif font-semibold text-nearblack mb-4">Entity Details</h3>
      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
        {fields.map((f) => (
          <div key={f.label}>
            <dt className="text-xs font-medium text-warmgrey uppercase tracking-wide">{f.label}</dt>
            <dd className="text-sm text-charcoal mt-0.5">{f.value}</dd>
          </div>
        ))}
      </dl>

      {entity.contacts?.length > 0 && (
        <div className="mt-6 pt-4 border-t border-warmgrey/20">
          <h4 className="text-xs font-medium text-warmgrey uppercase tracking-wide mb-3">Contacts</h4>
          <div className="space-y-3">
            {entity.contacts.map((c, i) => (
              <div key={i}>
                <p className="text-sm font-medium text-charcoal">{c.name}</p>
                <p className="text-xs text-warmgrey">{c.role} · {c.email}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  )
}

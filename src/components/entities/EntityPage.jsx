import { useParams, Link } from 'react-router-dom'
import { entities } from '../../data/entities'
import { signals } from '../../data/signals'
import { Card } from '../ui/Card'
import { Badge } from '../ui/Badge'
import { EntityTimeline } from './EntityTimeline'

export default function EntityPage() {
  const { id } = useParams()
  const entity = entities.find((e) => e.id === id)

  if (!entity) {
    return (
      <div className="p-8 text-center text-warmgrey">
        <p className="text-lg">Entity not found</p>
        <Link to="/app" className="text-darkgold hover:underline mt-2 inline-block">
          ← Back
        </Link>
      </div>
    )
  }

  const entitySignals = signals.filter((s) => s.entityId === entity.id)
  const primary = entity.contacts?.[0]

  return (
    <div className="space-y-6">
      <Link to="/app" className="text-sm text-warmgrey hover:text-charcoal transition-colors">
        ← Back
      </Link>

      <div>
        <h1 className="font-serif text-3xl font-bold text-nearblack">{entity.name}</h1>
        <p className="text-sm text-warmgrey mt-1">
          {entity.companyNumber} · {entity.sector}
        </p>
        {primary && (
          <p className="text-sm text-charcoal/70 mt-2">
            {primary.name} · {primary.role} · {primary.email}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="font-serif text-xl font-semibold text-nearblack">Active Signals</h2>
          {entitySignals.length === 0 && (
            <p className="text-sm text-warmgrey">No active signals</p>
          )}
          {entitySignals.map((signal) => (
            <Link key={signal.id} to={`/app/signals/${signal.id}`} className="block">
              <Card hover className="p-4">
                <div className="flex items-start gap-3">
                  <Badge variant={signal.category}>{signal.category}</Badge>
                  <div className="min-w-0">
                    <p className="font-semibold text-nearblack">{signal.title}</p>
                    <p className="text-sm text-charcoal/70 mt-1 line-clamp-2">{signal.summary}</p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* Right column */}
        <div className="space-y-6">
          <Card className="p-4 space-y-3">
            <h3 className="font-semibold text-nearblack">Company Details</h3>
            <div className="text-sm space-y-1">
              <p><span className="text-warmgrey">Company No:</span> {entity.companyNumber}</p>
              <p><span className="text-warmgrey">Sector:</span> {entity.sector}</p>
            </div>
            {entity.contacts?.length > 0 && (
              <div className="border-t border-warmgrey/20 pt-3 space-y-2">
                <p className="text-xs font-medium text-warmgrey uppercase tracking-wide">Contacts</p>
                {entity.contacts.map((c, i) => (
                  <div key={i} className="text-sm">
                    <p className="font-medium text-charcoal">{c.name}</p>
                    <p className="text-warmgrey">{c.role} · {c.email}</p>
                  </div>
                ))}
              </div>
            )}
          </Card>

          <div>
            <h3 className="font-semibold text-nearblack mb-3">Timeline</h3>
            <EntityTimeline timeline={entity.timeline} />
          </div>
        </div>
      </div>
    </div>
  )
}

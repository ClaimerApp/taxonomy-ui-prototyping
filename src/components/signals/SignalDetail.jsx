import { Link, useParams } from 'react-router-dom'
import { signals } from '../../data/signals'
import { entities } from '../../data/entities'
import { sensors } from '../../data/sensors'
import { interceptors } from '../../data/interceptors'
import { Badge } from '../ui/Badge'
import { Card } from '../ui/Card'
import { SignalEvidence } from './SignalEvidence'
import { SignalActions } from './SignalActions'

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const hours = Math.floor(diff / 3600000)
  if (hours < 1) return 'just now'
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  return `${days}d ago`
}

export default function SignalDetail() {
  const { id } = useParams()
  const signal = signals.find((s) => s.id === id)
  const entity = entities.find((e) => e.id === signal?.entityId)

  if (!signal) {
    return (
      <div className="text-center py-12">
        <p className="text-warmgrey">Signal not found.</p>
        <Link to="/app" className="text-darkgold hover:underline text-sm mt-2 inline-block">
          Back to signals
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Link to="/app" className="text-sm text-charcoal/60 hover:text-charcoal transition-colors">
        &larr; Signals
      </Link>

      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Badge variant={signal.category}>{signal.category}</Badge>
        </div>

        <h1 className="font-serif text-2xl font-bold text-nearblack">{signal.title}</h1>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
          <Link
            to={`/app/entities/${signal.entityId}`}
            className="text-darkgold hover:underline font-medium"
          >
            {entity?.name || signal.entityId}
          </Link>
          <span className="text-charcoal/50">Detected {timeAgo(signal.detectedAt)}</span>
          <span className="text-charcoal/50">
            {signal.confidence === 'high' ? 'High' : 'Medium'} confidence
            <span
              className={
                signal.confidence === 'high'
                  ? 'inline-block w-2 h-2 rounded-full bg-emerald-500 ml-1.5 align-middle'
                  : 'inline-block w-2 h-2 rounded-full bg-amber-400 ml-1.5 align-middle'
              }
            />
          </span>
          {(signal.sensorId || signal.interceptorId) && (
            <span className="text-charcoal/50">
              Detected by{' '}
              <span className="text-charcoal/70 font-medium">
                {signal.sensorId
                  ? sensors.find(s => s.id === signal.sensorId)?.name
                  : interceptors.find(i => i.id === signal.interceptorId)?.name}
              </span>
            </span>
          )}
        </div>
      </div>

      {signal.impact && (
        <Card className="bg-gold/10 border-gold/30 p-4">
          <p className="text-sm font-medium text-nearblack">{signal.impact}</p>
        </Card>
      )}

      <SignalEvidence evidence={signal.evidence} />
      <SignalActions signal={signal} />
    </div>
  )
}

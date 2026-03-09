import { useState } from 'react'
import { Card } from '../ui/Card'
import { Toggle } from '../ui/Toggle'
import { Badge } from '../ui/Badge'

export function SensorCard({ sensor }) {
  const [enabled, setEnabled] = useState(sensor.enabled)

  return (
    <Card className="p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-nearblack">{sensor.name}</h3>
        <Toggle enabled={enabled} onToggle={() => setEnabled(!enabled)} />
      </div>
      <p className="text-sm text-charcoal/70">{sensor.description}</p>
      <div className="flex items-center justify-between text-xs text-warmgrey">
        <span>{sensor.signalCount} signals generated</span>
        <span>Last triggered: {sensor.lastTriggered}</span>
      </div>
      {sensor.entities?.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {sensor.entities.map((name) => (
            <Badge key={name} className="text-[10px]">{name}</Badge>
          ))}
        </div>
      )}
    </Card>
  )
}

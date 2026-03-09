import { useState } from 'react'
import { Card } from '../ui/Card'
import { Toggle } from '../ui/Toggle'

export function InterceptorCard({ interceptor }) {
  const [enabled, setEnabled] = useState(interceptor.enabled)

  return (
    <Card className="p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-nearblack">{interceptor.name}</h3>
        <Toggle enabled={enabled} onToggle={() => setEnabled(!enabled)} />
      </div>
      <p className="text-sm text-charcoal/70">{interceptor.description}</p>
      <div className="flex items-center justify-between text-xs text-warmgrey">
        <span>{interceptor.checksPerformed} checks performed · {interceptor.issuesDetected} issues detected</span>
        <span>Last triggered: {interceptor.lastTriggered}</span>
      </div>
    </Card>
  )
}

import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { entities } from '../../data/entities'
import { Badge } from '../ui/Badge'
import { EntityTabs } from './EntityTabs'
import { EntitySignalsTab } from './EntitySignalsTab'
import { EntityTimelineTab } from './EntityTimelineTab'
import { EntityFilesTab } from './EntityFilesTab'
import { EntityCommsTab } from './EntityCommsTab'
import { EntityDetailsTab } from './EntityDetailsTab'

const FLAG_MAP = {
  GB: '🇬🇧', IE: '🇮🇪', DE: '🇩🇪', US: '🇺🇸', FR: '🇫🇷',
}

const tabs = [
  { key: 'signals', label: 'Signals & Checks' },
  { key: 'timeline', label: 'Timeline' },
  { key: 'files', label: 'Files' },
  { key: 'communications', label: 'Communications' },
  { key: 'details', label: 'Details' },
]

const relationshipVariant = {
  client: 'opportunity',
  prospect: 'default',
  former: 'default',
}

export default function EntityPage() {
  const { id } = useParams()
  const entity = entities.find((e) => e.id === id)
  const [activeTab, setActiveTab] = useState('signals')

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

  const primary = entity.contacts?.[0]
  const flag = FLAG_MAP[entity.country] || ''
  const isCompany = entity.type === 'company'

  return (
    <div className="space-y-6">
      <Link to="/app" className="text-sm text-warmgrey hover:text-charcoal transition-colors">
        ← Back to entities
      </Link>

      <div>
        <div className="flex items-center gap-3 flex-wrap">
          {flag && <span className="text-2xl">{flag}</span>}
          <h1 className="font-serif text-3xl font-bold text-nearblack">{entity.name}</h1>
          <Badge>{entity.entityType}</Badge>
          <Badge variant={relationshipVariant[entity.relationship]}>
            {entity.relationship.charAt(0).toUpperCase() + entity.relationship.slice(1)}
          </Badge>
        </div>
        <p className="text-sm text-warmgrey mt-1">
          {isCompany ? entity.companyNumber : entity.utr} · {entity.sector}
        </p>
        {primary && (
          <p className="text-sm text-charcoal/70 mt-1">
            {primary.name} · {primary.role}
          </p>
        )}
      </div>

      <EntityTabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      <div>
        {activeTab === 'signals' && <EntitySignalsTab entityId={entity.id} />}
        {activeTab === 'timeline' && <EntityTimelineTab entity={entity} />}
        {activeTab === 'files' && <EntityFilesTab />}
        {activeTab === 'communications' && <EntityCommsTab />}
        {activeTab === 'details' && <EntityDetailsTab entity={entity} />}
      </div>
    </div>
  )
}

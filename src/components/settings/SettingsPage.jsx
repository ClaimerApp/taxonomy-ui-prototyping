import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { NavLink, useLocation } from 'react-router-dom'
import { Card } from '../ui/Card'
import { Toggle } from '../ui/Toggle'
import { sensors, sources } from '../../data/sensors'
import { SensorCard } from '../config/SensorCard'
import { interceptors } from '../../data/interceptors'
import { InterceptorCard } from '../config/InterceptorCard'
import { checkers, checkCategories, checkDefinitions } from '../../data/checks'

const settingsNav = [
  {
    label: 'Checkers',
    to: '/app/settings/checkers',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.745 3.745 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
      </svg>
    ),
  },
  {
    label: 'Sensors',
    to: '/app/settings/sensors',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
      </svg>
    ),
  },
  {
    label: 'Interceptors',
    to: '/app/settings/interceptors',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
      </svg>
    ),
  },
  {
    label: 'Data Sources',
    to: '/app/settings/data-sources',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
      </svg>
    ),
  },
  {
    label: 'Alert Delivery',
    to: '/app/settings/alerts',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
      </svg>
    ),
  },
]

// --- Sub-pages ---

function SensorsSection() {
  const [search, setSearch] = useState('')
  const filtered = useMemo(() => {
    if (!search.trim()) return sensors
    const q = search.toLowerCase()
    return sensors.filter(
      (s) => s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q),
    )
  }, [search])

  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-serif text-xl font-bold text-nearblack">Sensors</h2>
        <p className="text-sm text-warmgrey mt-1">
          Sensors continuously monitor your data sources and detect meaningful changes
        </p>
      </div>
      <div className="relative">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-warmgrey"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          placeholder="Search sensors..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-3 py-2 rounded-lg border border-warmgrey/40 bg-white text-sm text-charcoal placeholder:text-warmgrey/60 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
        />
      </div>
      {filtered.length === 0 ? (
        <p className="text-sm text-warmgrey py-8 text-center">
          No sensors match &ldquo;{search}&rdquo;
        </p>
      ) : (
        <div className="grid grid-cols-1 2xl:grid-cols-2 gap-4">
          {filtered.map((sensor, i) => (
            <motion.div
              key={sensor.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 + i * 0.04, duration: 0.3 }}
            >
              <SensorCard sensor={sensor} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

function InterceptorsSection() {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-serif text-xl font-bold text-nearblack">Interceptors</h2>
        <p className="text-sm text-warmgrey mt-1">
          Interceptors perform real-time checks within your workflows before actions are completed
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {interceptors.map((interceptor, i) => (
          <motion.div
            key={interceptor.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 + i * 0.04, duration: 0.3 }}
          >
            <InterceptorCard interceptor={interceptor} />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

const statusConfig = {
  connected: { label: 'Connected', classes: 'bg-emerald-100 text-emerald-800' },
  not_connected: { label: 'Not Connected', classes: 'bg-warmgrey/20 text-charcoal/60' },
}

/** Derive connection status per source from which sensors reference it */
function getSourceStats() {
  return sources.map((source) => {
    const usedBy = sensors.filter((s) => s.sourceIds.includes(source.id))
    const connectedBy = sensors.filter((s) => s.connectedSourceIds.includes(source.id))
    return {
      ...source,
      sensorCount: usedBy.length,
      connectedSensorCount: connectedBy.length,
      status: connectedBy.length > 0 ? 'connected' : 'not_connected',
    }
  })
}

function DataSourcesSection() {
  const enrichedSources = getSourceStats()

  return (
    <div className="max-w-2xl space-y-4">
      <div>
        <h2 className="font-serif text-xl font-bold text-nearblack">Data Sources</h2>
        <p className="text-sm text-warmgrey mt-1">
          External integrations that sensors draw from to detect signals
        </p>
      </div>
      <div className="space-y-3">
        {enrichedSources.map((source, i) => {
          const status = statusConfig[source.status]
          return (
            <motion.div
              key={source.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 + i * 0.04, duration: 0.3 }}
            >
              <Card className="p-4 flex items-center gap-4">
                <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-warmgrey/10 text-xs font-bold text-charcoal/70">
                  {source.abbr}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-nearblack">{source.name}</div>
                  <div className="text-xs text-charcoal/50 mt-0.5">
                    Used by {source.sensorCount} sensor{source.sensorCount !== 1 ? 's' : ''}
                    {source.connectedSensorCount > 0 && ` · ${source.connectedSensorCount} connected`}
                  </div>
                </div>
                <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full whitespace-nowrap ${status.classes}`}>
                  {status.label}
                </span>
              </Card>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

const initialAlerts = [
  { id: 'email', name: 'Email', detail: 'Critical and warning alerts — immediate delivery', enabled: true },
  { id: 'teams', name: 'Microsoft Teams', detail: 'All alert types — #taxonomy-alerts channel', enabled: true },
  { id: 'push', name: 'Push Notifications', detail: 'Critical and warning alerts — immediate delivery', enabled: false },
  { id: 'slack', name: 'Slack', detail: 'Not configured', enabled: false },
]

function AlertDeliverySection() {
  const [alerts, setAlerts] = useState(initialAlerts)
  const toggleAlert = (id) => {
    setAlerts((prev) => prev.map((a) => (a.id === id ? { ...a, enabled: !a.enabled } : a)))
  }

  return (
    <div className="max-w-2xl space-y-4">
      <div>
        <h2 className="font-serif text-xl font-bold text-nearblack">Alert Delivery</h2>
        <p className="text-sm text-warmgrey mt-1">
          Configure how and where you receive alert notifications
        </p>
      </div>
      <div className="space-y-3">
        {alerts.map((channel, i) => (
          <motion.div
            key={channel.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 + i * 0.04, duration: 0.3 }}
          >
            <Card className="p-4 flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-nearblack">{channel.name}</div>
                <div className="text-xs text-charcoal/50 mt-0.5">{channel.detail}</div>
              </div>
              <Toggle enabled={channel.enabled} onToggle={() => toggleAlert(channel.id)} />
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function CheckersSection() {
  const checker = checkers[0]
  const [disabledChecks, setDisabledChecks] = useState([])

  const toggleCheck = (id) => {
    setDisabledChecks((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id],
    )
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h2 className="font-serif text-xl font-bold text-nearblack">{checker.name}</h2>
        <p className="text-sm text-warmgrey mt-1">{checker.description}</p>
      </div>

      {checkCategories.map((cat) => {
        const checks = checkDefinitions.filter((c) => c.category === cat.id)
        return (
          <div key={cat.id} className="space-y-3">
            <h3 className="text-xs font-semibold text-charcoal/50 uppercase tracking-wider">
              {cat.label}
            </h3>
            {checks.map((check, i) => {
              const enabled = !disabledChecks.includes(check.id)
              return (
                <motion.div
                  key={check.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.04, duration: 0.3 }}
                >
                  <Card className="p-4 flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <div className="text-sm font-medium text-nearblack">{check.name}</div>
                      <div className="text-xs text-charcoal/50 mt-0.5">{check.description}</div>
                    </div>
                    <Toggle enabled={enabled} onToggle={() => toggleCheck(check.id)} />
                  </Card>
                </motion.div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}

// --- Main settings layout ---

const sectionMap = {
  sensors: SensorsSection,
  interceptors: InterceptorsSection,
  'data-sources': DataSourcesSection,
  alerts: AlertDeliverySection,
  checkers: CheckersSection,
}

export function SettingsPage({ section }) {
  const { pathname } = useLocation()
  const activeSection = section || 'checkers'
  const SectionComponent = sectionMap[activeSection] || CheckersSection

  return (
    <div className="-m-8 flex min-h-screen">
      {/* Settings sidebar */}
      <div className="w-56 border-r border-warmgrey/20 bg-cream pt-6 px-3 space-y-1 shrink-0">
        <h2 className="text-xs font-semibold text-charcoal/50 uppercase tracking-wider px-3 mb-3">
          Settings
        </h2>
        {settingsNav.map((item) => (
          <NavLink
            key={item.label}
            to={item.to}
            className={() => {
              const isActive = pathname === item.to
              return `flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${
                isActive
                  ? 'text-nearblack bg-warmgrey/15 font-medium'
                  : 'text-charcoal/60 hover:text-nearblack hover:bg-warmgrey/10'
              }`
            }}
          >
            {item.icon}
            {item.label}
          </NavLink>
        ))}
      </div>

      {/* Settings content */}
      <div className="flex-1 p-8">
        <SectionComponent />
      </div>
    </div>
  )
}

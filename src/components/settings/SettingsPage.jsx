import { useState } from 'react'
import { motion } from 'framer-motion'
import { NavLink, useLocation } from 'react-router-dom'
import { Card } from '../ui/Card'
import { Toggle } from '../ui/Toggle'
import { sensors } from '../../data/sensors'
import { SensorCard } from '../config/SensorCard'
import { interceptors } from '../../data/interceptors'
import { InterceptorCard } from '../config/InterceptorCard'

const settingsNav = [
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
  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-serif text-xl font-bold text-nearblack">Sensors</h2>
        <p className="text-sm text-warmgrey mt-1">
          Sensors continuously monitor your data sources and detect meaningful changes
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sensors.map((sensor, i) => (
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

const dataSources = [
  {
    name: 'Microsoft 365 Email',
    detail: 'j.harrison@firm.co.uk, s.patel@firm.co.uk — 12,847 emails indexed',
    status: 'connected',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
      </svg>
    ),
  },
  {
    name: 'Companies House API',
    detail: 'Monitoring 9 companies — Last poll: 2 min ago',
    status: 'connected',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5M3.75 21V6.75A2.25 2.25 0 0 1 6 4.5h3a2.25 2.25 0 0 1 2.25 2.25V21m-7.5 0h7.5m3-10.5h3.75a2.25 2.25 0 0 1 2.25 2.25V21m-6 0h6" />
      </svg>
    ),
  },
  {
    name: 'Xero',
    detail: 'Awaiting OAuth authorisation',
    status: 'pending',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
      </svg>
    ),
  },
  {
    name: 'HMRC Gateway',
    detail: 'Connect to pull filing confirmations',
    status: 'not_connected',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
      </svg>
    ),
  },
]

const statusConfig = {
  connected: { label: 'Connected', classes: 'bg-emerald-100 text-emerald-800' },
  pending: { label: 'Pending', classes: 'bg-orange-100 text-orange-800' },
  not_connected: { label: 'Connect', classes: 'bg-warmgrey/20 text-charcoal/60' },
}

function DataSourcesSection() {
  return (
    <div className="max-w-2xl space-y-4">
      <div>
        <h2 className="font-serif text-xl font-bold text-nearblack">Data Sources</h2>
        <p className="text-sm text-warmgrey mt-1">
          Connect and manage your external data integrations
        </p>
      </div>
      <div className="space-y-3">
        {dataSources.map((source, i) => {
          const status = statusConfig[source.status]
          return (
            <motion.div
              key={source.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 + i * 0.04, duration: 0.3 }}
            >
              <Card className="p-4 flex items-center gap-4">
                <div className="text-charcoal/60">{source.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-nearblack">{source.name}</div>
                  <div className="text-xs text-charcoal/50 mt-0.5">{source.detail}</div>
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

// --- Main settings layout ---

const sectionMap = {
  sensors: SensorsSection,
  interceptors: InterceptorsSection,
  'data-sources': DataSourcesSection,
  alerts: AlertDeliverySection,
}

export function SettingsPage({ section }) {
  const { pathname } = useLocation()
  const activeSection = section || 'sensors'
  const SectionComponent = sectionMap[activeSection] || SensorsSection

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

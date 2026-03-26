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
import { initialUsers } from '../../data/users'
import { useDemoSettings } from '../../contexts/DemoSettingsContext'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'

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
    label: 'Users',
    to: '/app/settings/users',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
      </svg>
    ),
  },
  {
    label: 'Authentication',
    to: '/app/settings/auth',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
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

function DemoSettingsSection({ isAdvanced, setAdvanced }) {
  return (
    <div className="max-w-md space-y-4">
      <div>
        <h2 className="font-serif text-xl font-bold text-nearblack">Demo Settings</h2>
        <p className="text-sm text-warmgrey mt-1">
          Control which features are visible during demos
        </p>
      </div>
      <Card className="p-4 flex items-center justify-between gap-4">
        <div className="min-w-0">
          <div className="text-sm font-medium text-nearblack">Advanced mode</div>
          <div className="text-xs text-charcoal/50 mt-0.5">
            Show Signals, Sensors, Interceptors and other advanced features
          </div>
        </div>
        <Toggle enabled={isAdvanced} onToggle={() => setAdvanced(!isAdvanced)} />
      </Card>
    </div>
  )
}

function UsersSection() {
  const [users, setUsers] = useState(initialUsers)
  const [inviteEmail, setInviteEmail] = useState('')

  const addInvite = () => {
    if (!inviteEmail.trim() || users.some(u => u.email === inviteEmail.trim())) return
    setUsers(prev => [...prev, {
      id: `user-${Date.now()}`,
      name: inviteEmail.split('@')[0].replace(/[._]/g, ' '),
      email: inviteEmail.trim(),
      role: 'user',
      status: 'pending',
      joinedAt: null,
    }])
    setInviteEmail('')
  }

  const removeUser = (id) => setUsers(prev => prev.filter(u => u.id !== id))

  const toggleAdmin = (id) => {
    setUsers(prev => prev.map(u =>
      u.id === id ? { ...u, role: u.role === 'admin' ? 'user' : 'admin' } : u
    ))
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h2 className="font-serif text-xl font-bold text-nearblack">Users</h2>
        <p className="text-sm text-warmgrey mt-1">Manage who has access to Atlas for your firm</p>
      </div>

      {/* Invite form */}
      <Card className="p-4">
        <p className="text-sm font-medium text-nearblack mb-3">Invite a colleague</p>
        <div className="flex gap-2">
          <Input
            placeholder="colleague@firm.co.uk"
            type="email"
            value={inviteEmail}
            onChange={e => setInviteEmail(e.target.value)}
            className="flex-1"
          />
          <Button onClick={addInvite} size="sm" disabled={!inviteEmail.trim()}>
            Send invite
          </Button>
        </div>
      </Card>

      {/* User list */}
      <div className="space-y-2">
        {users.map((user, i) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 + i * 0.04, duration: 0.3 }}
          >
            <Card className="p-4 flex items-center gap-4">
              <div className="w-9 h-9 rounded-full bg-gold/15 flex items-center justify-center text-sm font-medium text-darkgold shrink-0">
                {user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-nearblack">{user.name}</span>
                  {user.role === 'admin' && (
                    <span className="px-1.5 py-0.5 text-[10px] font-medium rounded bg-gold/15 text-darkgold">Admin</span>
                  )}
                  {user.status === 'pending' && (
                    <span className="px-1.5 py-0.5 text-[10px] font-medium rounded bg-warmgrey/15 text-charcoal/50">Pending</span>
                  )}
                </div>
                <div className="text-xs text-charcoal/50 mt-0.5">{user.email}</div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {user.status === 'active' && user.id !== 'user-1' && (
                  <button
                    onClick={() => toggleAdmin(user.id)}
                    className="text-xs text-charcoal/50 hover:text-nearblack transition-colors"
                  >
                    {user.role === 'admin' ? 'Remove admin' : 'Make admin'}
                  </button>
                )}
                {user.id !== 'user-1' && (
                  <button
                    onClick={() => removeUser(user.id)}
                    className="text-xs text-red-500 hover:text-red-700 transition-colors"
                  >
                    {user.status === 'pending' ? 'Cancel' : 'Remove'}
                  </button>
                )}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function AuthenticationSection() {
  const [mssoEnabled, setMssoEnabled] = useState(false)

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h2 className="font-serif text-xl font-bold text-nearblack">Authentication</h2>
        <p className="text-sm text-warmgrey mt-1">Configure how users sign in to Atlas</p>
      </div>

      <Card className="p-4 flex items-center justify-between gap-4">
        <div className="min-w-0">
          <div className="text-sm font-medium text-nearblack">Magic link (email)</div>
          <div className="text-xs text-charcoal/50 mt-0.5">Users receive a sign-in link via email. Enabled by default.</div>
        </div>
        <Toggle enabled={true} onToggle={() => {}} />
      </Card>

      <Card className="p-4 space-y-3">
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0">
            <div className="text-sm font-medium text-nearblack">Microsoft Single Sign-On</div>
            <div className="text-xs text-charcoal/50 mt-0.5">Allow users to sign in with their Microsoft 365 account</div>
          </div>
          <Toggle enabled={mssoEnabled} onToggle={() => setMssoEnabled(!mssoEnabled)} />
        </div>
        <div className="flex items-start gap-2 bg-blue-50 border border-blue-200 rounded-lg p-3">
          <svg className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-xs text-blue-700">Enabling Microsoft SSO may require approval from your organisation's IT administrator.</p>
        </div>
      </Card>

      <Card className="p-4">
        <div className="text-sm font-medium text-nearblack">Session duration</div>
        <div className="text-xs text-charcoal/50 mt-1">User sessions expire after <strong>24 hours</strong> for security. Users will be redirected to the login page after expiry.</div>
      </Card>
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
  users: UsersSection,
  auth: AuthenticationSection,
  demo: DemoSettingsSection,
}

const advancedOnlyLabels = ['Sensors', 'Interceptors', 'Data Sources', 'Alert Delivery']

export function SettingsPage({ section }) {
  const { pathname } = useLocation()
  const { isAdvanced, setAdvanced } = useDemoSettings()
  const activeSection = section || 'checkers'
  const SectionComponent = sectionMap[activeSection] || CheckersSection

  const visibleNav = isAdvanced
    ? settingsNav
    : settingsNav.filter((item) => !advancedOnlyLabels.includes(item.label))

  return (
    <div className="-m-8 flex min-h-screen">
      {/* Settings sidebar */}
      <div className="w-56 border-r border-warmgrey/20 bg-cream pt-6 px-3 shrink-0 flex flex-col">
        <h2 className="text-xs font-semibold text-charcoal/50 uppercase tracking-wider px-3 mb-3">
          Settings
        </h2>
        <div className="space-y-1">
          {visibleNav.map((item) => (
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
        <div className="mt-auto pb-6">
          <NavLink
            to="/app/settings/demo"
            className={() => {
              const isActive = pathname === '/app/settings/demo'
              return `block px-3 py-2 text-xs transition-colors ${
                isActive ? 'text-charcoal/60' : 'text-warmgrey/50 hover:text-warmgrey'
              }`
            }}
          >
            Demo Settings
          </NavLink>
        </div>
      </div>

      {/* Settings content */}
      <div className="flex-1 p-8">
        <SectionComponent isAdvanced={isAdvanced} setAdvanced={setAdvanced} />
      </div>
    </div>
  )
}

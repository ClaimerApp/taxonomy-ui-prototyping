import { useState, useRef, useEffect, useMemo } from 'react'
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom'
import Logo from '../ui/Logo'
import { entities } from '../../data/entities'
import { signals } from '../../data/signals'

const navItems = [
  {
    label: 'Checks',
    to: '/app/checks',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15a2.25 2.25 0 0 1 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75" />
      </svg>
    ),
  },
  {
    label: 'Signals',
    to: '/app',
    end: true,
    badge: '12 new',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
      </svg>
    ),
  },
]

function ActiveClients() {
  const navigate = useNavigate()
  const location = useLocation()
  const [search, setSearch] = useState('')
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const searchRef = useRef(null)

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setDropdownOpen(false)
      }
    }
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [dropdownOpen])

  // Compute active clients: non-former entities assigned to current user
  const activeClients = useMemo(() => {
    const openSignals = signals.filter(s => s.status === 'new' || s.status === 'in_progress')
    const entityStats = {}
    for (const sig of openSignals) {
      if (!entityStats[sig.entityId]) entityStats[sig.entityId] = { critical: 0, total: 0 }
      entityStats[sig.entityId].total++
      if (sig.urgency === 'critical') entityStats[sig.entityId].critical++
    }
    return entities
      .filter(e => e.relationship !== 'former' && e.assignedTo === 'sarah-thompson')
      .map(e => ({ ...e, critical: entityStats[e.id]?.critical || 0, total: entityStats[e.id]?.total || 0 }))
      .sort((a, b) => b.critical - a.critical || b.total - a.total || a.name.localeCompare(b.name))
  }, [])

  const displayed = activeClients

  // Search results: filter all entities by name
  const searchResults = useMemo(() => {
    if (!search.trim()) return []
    const q = search.toLowerCase()
    return entities.filter(e => e.name.toLowerCase().includes(q))
  }, [search])

  // Current entity route for highlighting
  const currentEntityId = location.pathname.match(/\/app\/entities\/(ent-\d+)/)?.[1] || null

  return (
    <div className="flex-1 border-t border-white/10 py-4 overflow-hidden flex flex-col">
      <div className="px-4 mb-3 flex items-center justify-between">
        <span className="text-xs font-medium text-warmgrey uppercase tracking-wider">Active Clients</span>
        <button
          onClick={() => navigate('/app/entities')}
          className="text-xs text-gold hover:text-amber transition-colors"
        >
          See all
        </button>
      </div>

      {/* Search */}
      <div className="px-3 mb-3 relative" ref={searchRef}>
        <input
          type="text"
          placeholder="Search clients…"
          value={search}
          onChange={e => { setSearch(e.target.value); setDropdownOpen(true) }}
          onFocus={() => search.trim() && setDropdownOpen(true)}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-cream placeholder-warmgrey/60 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors"
        />
        {dropdownOpen && searchResults.length > 0 && (
          <div className="absolute left-3 right-3 top-full mt-1 bg-charcoal rounded-lg border border-white/10 shadow-xl z-50 max-h-48 overflow-y-auto">
            {searchResults.map(e => (
              <button
                key={e.id}
                onClick={() => { navigate(`/app/entities/${e.id}`); setSearch(''); setDropdownOpen(false) }}
                className="w-full text-left px-3 py-2 text-sm text-warmgrey hover:text-cream hover:bg-white/5 transition-colors truncate"
              >
                {e.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Client list */}
      <div className="space-y-0.5 flex-1 overflow-y-auto">
        {displayed.map(client => {
          const isActive = currentEntityId === client.id
          return (
            <button
              key={client.id}
              onClick={() => navigate(`/app/entities/${client.id}`)}
              className={`w-full flex items-center gap-2.5 px-4 py-2 mx-0 text-left transition-colors ${
                isActive ? 'text-cream bg-white/10' : 'text-warmgrey hover:text-cream hover:bg-white/5'
              }`}
            >
              <span
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: client.critical > 0 ? '#FFC832' : client.total > 0 ? '#C4B8A8' : '#6B6360' }}
              />
              <span className="text-sm truncate flex-1">{client.name}</span>
              {client.total > 0 && (
                <span className="text-xs bg-white/10 px-1.5 py-0.5 rounded-full flex-shrink-0">
                  {client.total}
                </span>
              )}
            </button>
          )
        })}
      </div>

    </div>
  )
}

export default function AppShell({ children }) {
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const menuRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setUserMenuOpen(false)
      }
    }
    if (userMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [userMenuOpen])

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-64 bg-nearblack h-screen fixed left-0 flex flex-col">
        {/* Logo */}
        <Link to="/" className="block p-5 border-b border-white/10 cursor-pointer">
          <Logo size="md" />
        </Link>

        {/* Nav */}
        <nav className="py-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-lg mx-3 transition-colors ${
                  isActive
                    ? 'text-cream bg-white/10'
                    : 'text-warmgrey hover:text-cream hover:bg-white/5'
                }`
              }
            >
              {item.icon}
              <span>{item.label}</span>
              {item.badge && (
                <span className="ml-auto text-xs bg-gold/20 text-gold px-2 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Active Clients */}
        <ActiveClients />

        {/* User */}
        <div className="relative" ref={menuRef}>
          {userMenuOpen && (
            <div className="absolute bottom-full left-3 right-3 mb-1 bg-charcoal rounded-lg border border-white/10 shadow-xl overflow-hidden">
              <button
                onClick={() => { setUserMenuOpen(false); navigate('/app/settings') }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-warmgrey hover:text-cream hover:bg-white/5 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
                Settings
              </button>
              <button
                onClick={() => setUserMenuOpen(false)}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-warmgrey hover:text-cream hover:bg-white/5 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
                </svg>
                Help
              </button>
              <div className="mx-3 border-t border-white/[0.08]" />
              <button
                onClick={() => { setUserMenuOpen(false); navigate('/') }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-warmgrey hover:text-cream hover:bg-white/5 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                </svg>
                Log out
              </button>
            </div>
          )}
          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="w-full p-4 border-t border-white/10 flex items-center gap-3 hover:bg-white/5 transition-colors cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold text-sm font-medium">
              ST
            </div>
            <div className="text-left flex-1 min-w-0">
              <div className="text-sm text-cream">Sarah Thompson</div>
              <div className="text-xs text-warmgrey">Tax Advisor</div>
            </div>
            <svg className={`w-4 h-4 text-warmgrey transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
            </svg>
          </button>
        </div>
      </aside>

      {/* Content */}
      <main className="ml-64 min-h-screen bg-cream flex-1">
        <div className="p-8">{children}</div>
      </main>
    </div>
  )
}

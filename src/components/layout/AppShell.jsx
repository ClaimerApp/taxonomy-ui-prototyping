import { Link, NavLink } from 'react-router-dom'
import Logo from '../ui/Logo'

const navItems = [
  {
    label: 'Signals',
    to: '/app',
    end: true,
    badge: '7 new',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
      </svg>
    ),
  },
  {
    label: 'Entities',
    to: '/app/entities',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5M3.75 21V6.75A2.25 2.25 0 0 1 6 4.5h3a2.25 2.25 0 0 1 2.25 2.25V21m-7.5 0h7.5m3-10.5h3.75a2.25 2.25 0 0 1 2.25 2.25V21m-6 0h6M9 7.5h.008v.008H9V7.5Zm0 3h.008v.008H9v-.008Zm0 3h.008v.008H9v-.008Zm3-6h.008v.008H12V7.5Z" />
      </svg>
    ),
  },
  {
    label: 'Sensors',
    to: '/app/sensors',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
      </svg>
    ),
  },
  {
    label: 'Interceptors',
    to: '/app/interceptors',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
      </svg>
    ),
  },
]

export default function AppShell({ children }) {
  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-64 bg-nearblack h-screen fixed left-0 flex flex-col">
        {/* Logo */}
        <Link to="/" className="block p-5 border-b border-white/10 cursor-pointer">
          <Logo size="md" />
        </Link>

        {/* Nav */}
        <nav className="flex-1 py-4 space-y-1">
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

        {/* User */}
        <div className="p-4 border-t border-white/10 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold text-sm font-medium">
            ST
          </div>
          <div>
            <div className="text-sm text-cream">Sarah Thompson</div>
            <div className="text-xs text-warmgrey">Tax Advisor</div>
          </div>
        </div>
      </aside>

      {/* Content */}
      <main className="ml-64 min-h-screen bg-cream flex-1">
        <div className="p-8">{children}</div>
      </main>
    </div>
  )
}

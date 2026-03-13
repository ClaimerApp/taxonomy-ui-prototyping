import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { sensors } from '../../data/sensors'
import { SensorCard } from './SensorCard'

export default function SensorList() {
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    if (!search.trim()) return sensors
    const q = search.toLowerCase()
    return sensors.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q),
    )
  }, [search])

  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-serif text-2xl font-bold text-nearblack">Sensors</h2>
        <p className="text-sm text-warmgrey mt-1">
          Sensors continuously monitor your data sources and detect meaningful changes
        </p>
      </div>

      {/* Search */}
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

      {/* Grid */}
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
              transition={{ delay: i * 0.04, duration: 0.3 }}
            >
              <SensorCard sensor={sensor} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

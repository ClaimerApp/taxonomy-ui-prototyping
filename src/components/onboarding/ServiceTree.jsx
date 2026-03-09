import { useState } from 'react'
import { cn } from '../../lib/cn'
import { motion, AnimatePresence } from 'framer-motion'

function getAllCodes(area) {
  const codes = [area.code]
  if (area.subcategories) {
    for (const sub of area.subcategories) {
      codes.push(...getAllCodes(sub))
    }
  }
  return codes
}

function hasDescendantInSet(area, set) {
  if (set.has(area.code)) return true
  return area.subcategories?.some(sub => hasDescendantInSet(sub, set)) ?? false
}

function getCheckState(area, selected) {
  const all = getAllCodes(area)
  const checkedCount = all.filter(c => selected.has(c)).length
  if (checkedCount === 0) return 'none'
  if (checkedCount === all.length) return 'all'
  return 'some'
}

function ServiceRow({ area, selected, onToggle, level, filterTo }) {
  const [expanded, setExpanded] = useState(false)
  const hasSubs = area.subcategories?.length > 0
  const checkState = getCheckState(area, selected)

  const filteredSubs = hasSubs
    ? filterTo
      ? area.subcategories.filter(sub => hasDescendantInSet(sub, filterTo))
      : area.subcategories
    : []
  const hasVisibleSubs = filteredSubs.length > 0

  const handleToggle = () => {
    const codes = getAllCodes(area)
    // if all selected, deselect all; otherwise select all
    const allSelected = codes.every(c => selected.has(c))
    for (const code of codes) {
      if (allSelected && selected.has(code)) onToggle(code)
      else if (!allSelected && !selected.has(code)) onToggle(code)
    }
  }

  return (
    <div>
      <div
        className={cn(
          'flex items-center gap-2 py-2 border-b border-warmgrey/10 last:border-0 hover:bg-cream/50 cursor-pointer',
        )}
        style={{ paddingLeft: `${level * 24}px` }}
      >
        <button
          type="button"
          onClick={handleToggle}
          className={cn(
            'w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors',
            checkState !== 'none'
              ? 'bg-gold border-gold'
              : 'border-warmgrey/40',
          )}
        >
          {checkState === 'all' && (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 6l3 3L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
          {checkState === 'some' && (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M3 6h6" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
          )}
        </button>

        <span
          className="flex-1 font-medium text-sm text-charcoal select-none"
          onClick={() => hasVisibleSubs && setExpanded(!expanded)}
        >
          {area.label}
          {area.description && (
            <span className="block text-xs text-charcoal/60">{area.description}</span>
          )}
        </span>

        {hasVisibleSubs && (
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="w-4 h-4 flex items-center justify-center text-warmgrey shrink-0"
          >
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              className={cn('transition-transform', expanded && 'rotate-90')}
            >
              <path d="M3 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            </svg>
          </button>
        )}
      </div>

      <AnimatePresence initial={false}>
        {hasVisibleSubs && expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ overflow: 'hidden' }}
          >
            {filteredSubs.map(sub => (
              <ServiceRow
                key={sub.code}
                area={sub}
                selected={selected}
                onToggle={onToggle}
                level={level + 1}
                filterTo={filterTo}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function ServiceTree({ areas, selected, onToggle, filterTo }) {
  const visibleAreas = filterTo
    ? areas.filter(area => hasDescendantInSet(area, filterTo))
    : areas

  return (
    <div>
      {visibleAreas.map(area => (
        <ServiceRow
          key={area.code}
          area={area}
          selected={selected}
          onToggle={onToggle}
          level={0}
          filterTo={filterTo}
        />
      ))}
    </div>
  )
}

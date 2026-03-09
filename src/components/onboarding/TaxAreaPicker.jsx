import { useState } from 'react'
import { cn } from '../../lib/cn'

// filterTo: optional Set of codes — only show areas whose code is in this set (or has descendants in it)
export function TaxAreaPicker({ areas, selected, onToggle, level = 0, filterTo }) {
  const filtered = filterTo ? filterAreas(areas, filterTo) : areas
  return (
    <div className="space-y-1">
      {filtered.map(area => (
        <TaxAreaRow
          key={area.code}
          area={area}
          selected={selected}
          onToggle={onToggle}
          level={level}
          filterTo={filterTo}
        />
      ))}
    </div>
  )
}

// Recursively filter tree to only include nodes whose code is in filterTo or who have descendants in filterTo
function filterAreas(areas, filterTo) {
  const result = []
  for (const area of areas) {
    if (filterTo.has(area.code)) {
      result.push(area)
    } else if (area.subcategories) {
      const filteredSubs = filterAreas(area.subcategories, filterTo)
      if (filteredSubs.length > 0) {
        result.push({ ...area, subcategories: filteredSubs })
      }
    }
  }
  return result
}

function TaxAreaRow({ area, selected, onToggle, level, filterTo }) {
  const [expanded, setExpanded] = useState(false)
  const hasSubs = area.subcategories?.length > 0
  const indent = level * 4 + 2

  return (
    <div>
      <div
        className={cn('flex items-center gap-2 rounded-lg py-1.5 px-2 hover:bg-warmgrey/5')}
        style={{ paddingLeft: `${indent * 4}px` }}
      >
        {hasSubs ? (
          <button
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
        ) : (
          <span className="w-4 shrink-0" />
        )}

        <label className="flex items-center gap-2 cursor-pointer flex-1 text-sm text-charcoal">
          <span
            className={cn(
              'w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors',
              selected.has(area.code)
                ? 'bg-gold border-gold'
                : 'border-warmgrey/40',
            )}
          >
            {selected.has(area.code) && (
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M2 5l2.5 2.5L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </span>
          <input
            type="checkbox"
            checked={selected.has(area.code)}
            onChange={() => onToggle(area.code)}
            className="sr-only"
          />
          {area.label}
        </label>
      </div>

      {hasSubs && expanded && (
        <TaxAreaPicker
          areas={area.subcategories}
          selected={selected}
          onToggle={onToggle}
          level={level + 1}
          filterTo={filterTo}
        />
      )}
    </div>
  )
}

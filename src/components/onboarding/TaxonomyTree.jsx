import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../../lib/cn'

// Only collect codes for a node and its direct children (2 levels max)
export function collectCodes(node) {
  const codes = [node.code]
  if (node.subcategories) {
    for (const child of node.subcategories) {
      codes.push(child.code)
    }
  }
  return codes
}

function getChildStatus(node, selected) {
  if (!node.subcategories?.length) return selected.has(node.code) ? 'all' : 'none'
  const childCodes = node.subcategories.map(c => c.code)
  const checkedCount = childCodes.filter(c => selected.has(c)).length
  if (checkedCount === 0) return 'none'
  if (checkedCount === childCodes.length) return 'all'
  return 'some'
}

function TriCheckbox({ checked, indeterminate, onChange, className }) {
  const ref = useRef(null)
  useEffect(() => {
    if (ref.current) ref.current.indeterminate = indeterminate
  }, [indeterminate])
  return (
    <input
      ref={ref}
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className={cn('accent-gold w-4 h-4 cursor-pointer', className)}
    />
  )
}

function TaxonomyNode({ node, depth, selected, onToggle, defaultExpanded = false }) {
  const [expanded, setExpanded] = useState(defaultExpanded)
  const hasChildren = depth === 0 && node.subcategories?.length > 0
  const status = getChildStatus(node, selected)
  const isChecked = hasChildren ? status === 'all' : selected.has(node.code)
  const isIndeterminate = hasChildren && status === 'some'

  const handleCheck = useCallback(() => {
    if (hasChildren) {
      const codes = collectCodes(node)
      if (isChecked || isIndeterminate) {
        onToggle(codes, false)
      } else {
        onToggle(codes, true)
        setExpanded(true)
      }
    } else {
      onToggle([node.code], !selected.has(node.code))
    }
  }, [node, isChecked, isIndeterminate, onToggle, hasChildren, selected])

  return (
    <div>
      <div
        className={cn(
          'flex items-center gap-2 py-1.5 cursor-pointer select-none',
          depth === 0 && 'font-medium text-nearblack',
          depth === 1 && 'text-charcoal text-sm',
        )}
        style={{ paddingLeft: depth * 20 }}
      >
        {hasChildren ? (
          <button
            type="button"
            onClick={() => setExpanded(e => !e)}
            className="w-5 h-5 flex items-center justify-center text-warmgrey hover:text-charcoal transition-colors"
          >
            <motion.svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              animate={{ rotate: expanded ? 90 : 0 }}
              transition={{ duration: 0.15 }}
            >
              <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </motion.svg>
          </button>
        ) : (
          <span className="w-5" />
        )}
        <TriCheckbox
          checked={isChecked}
          indeterminate={isIndeterminate}
          onChange={handleCheck}
        />
        <span onClick={hasChildren ? () => setExpanded(e => !e) : handleCheck}>
          {node.label}
        </span>
      </div>
      <AnimatePresence>
        {hasChildren && expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            {node.subcategories.map(child => (
              <TaxonomyNode
                key={child.code}
                node={child}
                depth={1}
                selected={selected}
                onToggle={onToggle}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/**
 * Renders a 2-level taxonomy tree with tri-state checkboxes.
 * @param {Object[]} areas - taxonomy area nodes
 * @param {Set} selected - set of selected codes
 * @param {function} onToggle - (codes[], add) callback
 * @param {Set} [filterTo] - optional set of codes to restrict visible areas
 */
export function TaxonomyTree({ areas, selected, onToggle, filterTo }) {
  // Filter areas to only those with codes in filterTo (or their parents)
  const visibleAreas = filterTo
    ? areas
        .map(area => {
          const hasArea = filterTo.has(area.code)
          const filteredSubs = area.subcategories?.filter(s => filterTo.has(s.code))
          if (hasArea || filteredSubs?.length) {
            return { ...area, subcategories: filteredSubs?.length ? filteredSubs : area.subcategories }
          }
          return null
        })
        .filter(Boolean)
    : areas

  return (
    <div className="bg-white rounded-xl border border-warmgrey/20 p-4">
      {visibleAreas.map(area => (
        <TaxonomyNode
          key={area.code}
          node={area}
          depth={0}
          selected={selected}
          onToggle={onToggle}
          defaultExpanded={visibleAreas.length === 1}
        />
      ))}
    </div>
  )
}

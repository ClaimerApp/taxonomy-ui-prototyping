import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../../lib/cn'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { taxAreas } from '../../data/taxonomy'

const TAX_SPECIALIST_SERVICES = [
  'R&D Tax Relief',
  'Patent Box',
  'Capital Allowances',
  'Creative Industry Reliefs',
  'Grants and Innovation Funding',
]

const FIRM_TYPES = [
  {
    id: 'tax_specialist',
    label: 'Tax Specialist',
    subtitle: 'R&D Tax, Patent Box, Capital Allowances\u2026',
  },
  {
    id: 'accountancy_firm',
    label: 'Accountancy Firm',
    subtitle: 'Accounts and audit, Personal tax, VAT\u2026',
  },
]

const fadeSlide = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.25 },
}

// --- Taxonomy tree helpers ---

function collectAllCodes(node) {
  const codes = [node.code]
  if (node.subcategories) {
    for (const child of node.subcategories) {
      codes.push(...collectAllCodes(child))
    }
  }
  return codes
}

function allCodesInTree(areas) {
  const codes = []
  for (const area of areas) codes.push(...collectAllCodes(area))
  return codes
}

function getChildStatus(node, selected) {
  if (!node.subcategories?.length) return selected.has(node.code) ? 'all' : 'none'
  const childCodes = collectAllCodes(node).slice(1) // exclude self
  const checkedCount = childCodes.filter(c => selected.has(c)).length
  if (checkedCount === 0) return 'none'
  if (checkedCount === childCodes.length) return 'all'
  return 'some'
}

// --- Checkbox with indeterminate support ---

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

// --- Taxonomy tree node ---

function TaxonomyNode({ node, depth, selected, onToggle }) {
  const [expanded, setExpanded] = useState(false)
  const hasChildren = node.subcategories?.length > 0
  const status = getChildStatus(node, selected)
  const isChecked = hasChildren ? status === 'all' : selected.has(node.code)
  const isIndeterminate = hasChildren && status === 'some'

  const handleCheck = useCallback(() => {
    const codes = collectAllCodes(node)
    if (isChecked || isIndeterminate) {
      onToggle(codes, false)
    } else {
      onToggle(codes, true)
      if (hasChildren) setExpanded(true)
    }
  }, [node, isChecked, isIndeterminate, onToggle, hasChildren])

  return (
    <div>
      <div
        className={cn(
          'flex items-center gap-2 py-1.5 cursor-pointer select-none',
          depth === 0 && 'font-medium text-nearblack',
          depth === 1 && 'text-charcoal text-sm',
          depth === 2 && 'text-charcoal/80 text-sm',
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
                depth={depth + 1}
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

// --- Main component ---

export default function FirmDetails({ onNext }) {
  const [domain, setDomain] = useState('smithandco.tax')
  const [firmType, setFirmType] = useState(null)
  const [specialistServices, setSpecialistServices] = useState(new Set())
  const [taxonomySelected, setTaxonomySelected] = useState(new Set())

  function toggleSpecialist(s) {
    setSpecialistServices(prev => {
      const next = new Set(prev)
      next.has(s) ? next.delete(s) : next.add(s)
      return next
    })
  }

  const handleTaxonomyToggle = useCallback((codes, add) => {
    setTaxonomySelected(prev => {
      const next = new Set(prev)
      for (const c of codes) {
        add ? next.add(c) : next.delete(c)
      }
      return next
    })
  }, [])

  const hasServices = firmType === 'tax_specialist'
    ? specialistServices.size > 0
    : taxonomySelected.size > 0
  const isValid = domain.trim() && firmType && hasServices

  function handleContinue() {
    const services =
      firmType === 'tax_specialist'
        ? [...specialistServices]
        : [...taxonomySelected]
    sessionStorage.setItem('firmType', firmType)
    sessionStorage.setItem('firmServices', JSON.stringify(services))
    onNext?.({ firmType, services })
  }

  return (
    <div className="space-y-6">
      <h1 className="font-serif text-2xl text-nearblack">Tell us about your firm</h1>

      <Input
        label="Firm website or domain"
        placeholder="e.g. smithandco.tax"
        value={domain}
        onChange={e => setDomain(e.target.value)}
      />

      {/* Firm type selection */}
      <fieldset>
        <legend className="block text-sm font-medium text-charcoal mb-3">
          What type of firm are you?
        </legend>
        <div className="grid grid-cols-2 gap-3">
          {FIRM_TYPES.map(ft => (
            <button
              key={ft.id}
              type="button"
              onClick={() => setFirmType(ft.id)}
              className={cn(
                'text-left rounded-xl border-2 px-4 py-3 transition-all cursor-pointer',
                firmType === ft.id
                  ? 'border-gold bg-gold/5 shadow-sm'
                  : 'border-warmgrey/30 bg-cream hover:border-warmgrey/60',
              )}
            >
              <span className="block font-medium text-nearblack">{ft.label}</span>
              <span className="block text-xs text-charcoal/70 mt-0.5">{ft.subtitle}</span>
            </button>
          ))}
        </div>
      </fieldset>

      {/* Services — shown only after firm type selected */}
      <AnimatePresence mode="wait">
        {firmType === 'tax_specialist' && (
          <motion.fieldset key="specialist" {...fadeSlide}>
            <legend className="block text-sm font-medium text-charcoal mb-3">
              Services offered
            </legend>
            <div className="grid grid-cols-2 gap-2">
              {TAX_SPECIALIST_SERVICES.map(s => (
                <label
                  key={s}
                  className={cn(
                    'flex items-center gap-2 rounded-lg border px-3 py-2 cursor-pointer transition-colors text-sm',
                    specialistServices.has(s)
                      ? 'border-gold bg-gold/5 text-nearblack'
                      : 'border-warmgrey/30 text-charcoal hover:bg-warmgrey/5',
                  )}
                >
                  <input
                    type="checkbox"
                    checked={specialistServices.has(s)}
                    onChange={() => toggleSpecialist(s)}
                    className="accent-gold"
                  />
                  {s}
                </label>
              ))}
            </div>
          </motion.fieldset>
        )}

        {firmType === 'accountancy_firm' && (
          <motion.fieldset key="accountancy" {...fadeSlide}>
            <legend className="block text-sm font-medium text-charcoal mb-3">
              Services offered
            </legend>
            <div className="bg-white rounded-xl border border-warmgrey/20 p-4">
              {taxAreas.areas.map(area => (
                <TaxonomyNode
                  key={area.code}
                  node={area}
                  depth={0}
                  selected={taxonomySelected}
                  onToggle={handleTaxonomyToggle}
                />
              ))}
            </div>
          </motion.fieldset>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isValid && (
          <motion.div {...fadeSlide}>
            <Button onClick={handleContinue} className="w-full">Continue</Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

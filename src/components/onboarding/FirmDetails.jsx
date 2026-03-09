import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../../lib/cn'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { taxAreas } from '../../data/taxonomy'
import { TaxonomyTree } from './TaxonomyTree'

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
  const isDomainValid = /^([a-z0-9-]+\.)+[a-z]{2,}$/i.test(domain.trim())
  const isValid = isDomainValid && firmType && hasServices

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
            <TaxonomyTree
              areas={taxAreas.areas}
              selected={taxonomySelected}
              onToggle={handleTaxonomyToggle}
            />
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

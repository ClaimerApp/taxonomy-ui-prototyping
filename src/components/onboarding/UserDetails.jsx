import { useState, useMemo, useCallback } from 'react'
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

export default function UserDetails({ onNext }) {
  const [firstName, setFirstName] = useState('Sarah')
  const [lastName, setLastName] = useState('Thompson')
  const [jobTitle, setJobTitle] = useState('')

  const firmType = sessionStorage.getItem('firmType') || ''
  const firmServices = useMemo(
    () => JSON.parse(sessionStorage.getItem('firmServices') || '[]'),
    [],
  )

  // Tax specialist: simple checkbox list from firm's selected services
  const [specialistSelected, setSpecialistSelected] = useState(new Set())

  // Accountancy: tree scoped to firm's selected codes
  const [taxonomySelected, setTaxonomySelected] = useState(new Set())
  const filterTo = useMemo(
    () => (firmType === 'accountancy_firm' ? new Set(firmServices) : null),
    [firmType, firmServices],
  )
  const handleTaxonomyToggle = useCallback((codes, add) => {
    setTaxonomySelected(prev => {
      const next = new Set(prev)
      for (const c of codes) {
        add ? next.add(c) : next.delete(c)
      }
      return next
    })
  }, [])

  const availableSpecialist = TAX_SPECIALIST_SERVICES.filter(s =>
    firmServices.includes(s),
  )

  function toggleSpecialist(s) {
    setSpecialistSelected(prev => {
      const next = new Set(prev)
      next.has(s) ? next.delete(s) : next.add(s)
      return next
    })
  }

  // Skip service selection if firm only offers one service
  const singleService = firmServices.length === 1
  const showServicePicker = !singleService && firmServices.length > 1
  const hasServiceSelection = singleService
    || !showServicePicker
    || (firmType === 'tax_specialist' ? specialistSelected.size > 0 : taxonomySelected.size > 0)
  const isValid = firstName.trim() && lastName.trim() && jobTitle.trim() && hasServiceSelection

  return (
    <div className="space-y-6">
      <h1 className="font-serif text-2xl text-nearblack">Your details</h1>

      <div className="grid grid-cols-2 gap-4">
        <Input label="First name" value={firstName} onChange={e => setFirstName(e.target.value)} />
        <Input label="Last name" value={lastName} onChange={e => setLastName(e.target.value)} />
      </div>

      <Input
        label="Job title"
        placeholder="e.g. Tax Manager"
        value={jobTitle}
        onChange={e => setJobTitle(e.target.value)}
      />

      {/* Services you personally handle — skip if firm only has one service */}
      {singleService && (
        <div className="text-sm text-charcoal/70">
          Service: <span className="font-medium text-charcoal">{firmServices[0]}</span>
        </div>
      )}

      {showServicePicker && firmType === 'tax_specialist' && availableSpecialist.length > 0 && (
        <fieldset>
          <legend className="block text-sm font-medium text-charcoal mb-3">
            Services you personally handle <span className="text-red-500">*</span>
          </legend>
          <div className="grid grid-cols-2 gap-2">
            {availableSpecialist.map(s => (
              <label
                key={s}
                className={cn(
                  'flex items-center gap-2 rounded-lg border px-3 py-2 cursor-pointer transition-colors text-sm',
                  specialistSelected.has(s)
                    ? 'border-gold bg-gold/5 text-nearblack'
                    : 'border-warmgrey/30 text-charcoal hover:bg-warmgrey/5',
                )}
              >
                <input
                  type="checkbox"
                  checked={specialistSelected.has(s)}
                  onChange={() => toggleSpecialist(s)}
                  className="accent-gold"
                />
                {s}
              </label>
            ))}
          </div>
        </fieldset>
      )}

      {showServicePicker && firmType === 'accountancy_firm' && (
        <fieldset>
          <legend className="block text-sm font-medium text-charcoal mb-3">
            Services you personally handle <span className="text-red-500">*</span>
          </legend>
          <TaxonomyTree
            areas={taxAreas.areas}
            selected={taxonomySelected}
            onToggle={handleTaxonomyToggle}
            filterTo={filterTo}
          />
        </fieldset>
      )}

      <AnimatePresence>
        {isValid && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            <Button onClick={onNext} className="w-full">Continue</Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

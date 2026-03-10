import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'

export default function UserDetails({ onNext }) {
  const [firstName, setFirstName] = useState('Sarah')
  const [lastName, setLastName] = useState('Thompson')
  const [jobTitle, setJobTitle] = useState('')

  const isValid = firstName.trim() && lastName.trim() && jobTitle.trim()

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

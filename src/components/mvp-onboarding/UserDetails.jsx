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

      <div className="flex items-start gap-2.5 bg-blue-50 border border-blue-200 rounded-lg p-3">
        <svg className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="text-xs text-blue-700">You'll be the admin for your firm. You can invite colleagues and manage settings once you're in.</p>
      </div>

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

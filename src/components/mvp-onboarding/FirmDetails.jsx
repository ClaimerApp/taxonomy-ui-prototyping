import { useState } from 'react'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'

export default function FirmDetails({ onNext }) {
  const [domain, setDomain] = useState('smithandco.tax')

  const isDomainValid = /^([a-z0-9-]+\.)+[a-z]{2,}$/i.test(domain.trim())

  return (
    <div className="space-y-6">
      <h1 className="font-serif text-2xl text-nearblack">Tell us about your firm</h1>

      <Input
        label="Firm website or domain"
        placeholder="e.g. smithandco.tax"
        value={domain}
        onChange={e => setDomain(e.target.value)}
      />

      {isDomainValid && (
        <Button onClick={() => onNext?.()} className="w-full">Continue</Button>
      )}
    </div>
  )
}

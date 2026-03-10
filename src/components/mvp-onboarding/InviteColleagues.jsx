import { useState } from 'react'
import { cn } from '../../lib/cn'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'

export default function InviteColleagues({ onNext }) {
  const [emails, setEmails] = useState(['j.reynolds@smithandco.tax'])
  const [input, setInput] = useState('')

  function addEmail() {
    const trimmed = input.trim()
    if (trimmed && !emails.includes(trimmed)) {
      setEmails([...emails, trimmed])
      setInput('')
    }
  }

  function removeEmail(email) {
    setEmails(emails.filter(e => e !== email))
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      e.preventDefault()
      addEmail()
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl text-nearblack">Invite your team</h1>
        <p className="text-warmgrey mt-1">
          The more colleagues using Atlas, the more powerful it becomes
        </p>
      </div>

      <div className="flex gap-2">
        <div className="flex-1">
          <input
            type="email"
            placeholder="colleague@smithandco.tax"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full px-3 py-2 rounded-lg border border-warmgrey/40 bg-white text-charcoal focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
          />
        </div>
        <Button onClick={addEmail} size="md">Add</Button>
      </div>

      {emails.length > 0 && (
        <div className="space-y-2">
          {emails.map(email => (
            <div
              key={email}
              className="flex items-center justify-between bg-warmgrey/5 rounded-lg px-3 py-2"
            >
              <span className="text-sm text-charcoal">{email}</span>
              <button
                onClick={() => removeEmail(email)}
                className="text-warmgrey hover:text-red-500 transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="flex gap-3">
        <Button variant="ghost" onClick={onNext} className="flex-1">Skip</Button>
        <Button onClick={onNext} className="flex-1">Send invites &amp; continue</Button>
      </div>
    </div>
  )
}

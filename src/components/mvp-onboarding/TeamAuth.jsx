import { useState } from 'react'
import { cn } from '../../lib/cn'
import { Button } from '../ui/Button'

const OPTIONS = [
  {
    id: 'open',
    title: 'Open access',
    description: 'Anyone with a @smithandco.tax email can join automatically',
  },
  {
    id: 'invite',
    title: 'Invitation only',
    description: 'Team members must be invited to join',
  },
]

export default function TeamAuth({ onNext }) {
  const [mode, setMode] = useState('open')

  return (
    <div className="space-y-6">
      <h1 className="font-serif text-2xl text-nearblack">Team access</h1>

      <div className="space-y-3">
        {OPTIONS.map(opt => (
          <button
            key={opt.id}
            onClick={() => setMode(opt.id)}
            className={cn(
              'w-full text-left rounded-xl border p-4 transition-colors',
              mode === opt.id
                ? 'border-gold bg-gold/5'
                : 'border-warmgrey/30 hover:bg-warmgrey/5',
            )}
          >
            <div className="flex items-center gap-3">
              <span
                className={cn(
                  'w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0',
                  mode === opt.id ? 'border-gold' : 'border-warmgrey/40',
                )}
              >
                {mode === opt.id && <span className="w-2 h-2 rounded-full bg-gold" />}
              </span>
              <div>
                <p className="font-medium text-nearblack">{opt.title}</p>
                <p className="text-sm text-warmgrey">{opt.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      <p className="text-sm text-warmgrey italic">
        SSO (SAML/OIDC) will be available soon
      </p>

      <Button onClick={onNext} className="w-full">Continue</Button>
    </div>
  )
}

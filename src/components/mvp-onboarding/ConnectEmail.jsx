import { useState } from 'react'
import { Button } from '../ui/Button'

export default function ConnectEmail({ onNext }) {
  const [connected, setConnected] = useState(false)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl text-nearblack">Connect your email</h1>
        <p className="text-warmgrey mt-1">
          Atlas analyses your email to surface signals and protect your advisory work
        </p>
      </div>

      {!connected ? (
        <button
          onClick={() => setConnected(true)}
          className="w-full flex items-center justify-center gap-3 bg-white border-2 border-warmgrey/30 hover:border-warmgrey/50 rounded-lg px-4 py-4 text-charcoal font-medium transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <rect x="1" y="1" width="8" height="8" fill="#F25022" />
            <rect x="11" y="1" width="8" height="8" fill="#7FBA00" />
            <rect x="1" y="11" width="8" height="8" fill="#00A4EF" />
            <rect x="11" y="11" width="8" height="8" fill="#FFB900" />
          </svg>
          Connect Office 365
        </button>
      ) : (
        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-lg px-4 py-3 text-emerald-800">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M6 10l3 3 5-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="2" />
          </svg>
          <span className="font-medium">Office 365 connected</span>
          <span className="text-sm">&mdash; sarah.thompson@smithandco.tax</span>
        </div>
      )}

      <div className="bg-warmgrey/5 rounded-xl p-5 space-y-3">
        <div className="flex items-center gap-2 text-charcoal font-medium">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-gold">
            <path
              d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </svg>
          Your data is secure
        </div>
        <ul className="space-y-1 text-sm text-warmgrey ml-7">
          <li>GDPR compliant</li>
          <li>ISO 27001 certified</li>
          <li>Email access is used solely for signal detection</li>
        </ul>
        <a href="#" className="inline-block text-sm text-darkgold hover:underline ml-7">
          Read our security policy &rarr;
        </a>
      </div>

      {connected && (
        <Button onClick={onNext} className="w-full">Continue</Button>
      )}
    </div>
  )
}

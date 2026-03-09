import { useState } from 'react'
import { Button } from '../ui/Button'

export default function ImportData({ onNext }) {
  const [uploaded, setUploaded] = useState(false)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl text-nearblack">Upload a spreadsheet of your clients</h1>
        <p className="text-warmgrey mt-1">
          This will help to speed up onboarding. Please make this a single column of registered company numbers. You can skip this for later.
        </p>
      </div>

      {!uploaded ? (
        <button
          onClick={() => setUploaded(true)}
          className="w-full border-2 border-dashed border-warmgrey/40 rounded-xl p-8 text-center hover:border-gold/60 transition-colors cursor-pointer"
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            className="mx-auto mb-3 text-warmgrey"
          >
            <path
              d="M12 16V4m0 0l-4 4m4-4l4 4M4 20h16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p className="font-medium text-charcoal">Drag &amp; drop your CSV here</p>
          <p className="text-sm text-warmgrey mt-1">or click to browse</p>
          <p className="text-xs text-warmgrey mt-2">Accepted: .csv files</p>
        </button>
      ) : (
        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-lg px-4 py-3 text-emerald-800">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M6 10l3 3 5-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="2" />
          </svg>
          <span className="font-medium">clients.csv</span>
          <span className="text-sm">&mdash; 47 companies</span>
        </div>
      )}

      <div className="flex gap-3">
        <Button variant="ghost" onClick={onNext} className="flex-1">Skip</Button>
        <Button onClick={onNext} className="flex-1">Continue</Button>
      </div>
    </div>
  )
}

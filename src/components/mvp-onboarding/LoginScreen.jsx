import { Card } from '../ui/Card'

export default function LoginScreen({ onNext }) {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center p-4">
      <Card className="max-w-md w-full p-8">
        <h1 className="font-serif text-3xl text-nearblack text-center mb-2">
          Sign in to Atlas
        </h1>
        <p className="text-warmgrey text-center mb-8">
          Connect your work account to get started
        </p>

        <div className="space-y-3">
          <button
            onClick={onNext}
            className="w-full flex items-center justify-center gap-3 bg-white border border-warmgrey/30 hover:bg-slate-50 rounded-lg px-4 py-3 text-charcoal font-medium transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <rect x="1" y="1" width="8" height="8" fill="#F25022" />
              <rect x="11" y="1" width="8" height="8" fill="#7FBA00" />
              <rect x="1" y="11" width="8" height="8" fill="#00A4EF" />
              <rect x="11" y="11" width="8" height="8" fill="#FFB900" />
            </svg>
            Continue with Microsoft
          </button>
        </div>

        <p className="text-xs text-warmgrey text-center mt-8">
          By signing in, you agree to our{' '}
          <a href="#" className="underline">Terms of Service</a> and{' '}
          <a href="#" className="underline">Privacy Policy</a>
        </p>
      </Card>
    </div>
  )
}

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

          <button
            onClick={onNext}
            className="w-full flex items-center justify-center gap-3 bg-white border border-warmgrey/30 hover:bg-slate-50 rounded-lg px-4 py-3 text-charcoal font-medium transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 20 20">
              <path
                d="M17.64 10.2c0-.63-.06-1.25-.16-1.84H10v3.49h4.29a3.66 3.66 0 01-1.59 2.4v2h2.58c1.5-1.39 2.36-3.43 2.36-6.05z"
                fill="#4285F4"
              />
              <path
                d="M10 18c2.16 0 3.97-.72 5.29-1.93l-2.58-2a5.28 5.28 0 01-7.88-2.77H2.18v2.06A8 8 0 0010 18z"
                fill="#34A853"
              />
              <path
                d="M4.83 11.3a4.8 4.8 0 010-3.06V6.18H2.18a8 8 0 000 7.18l2.65-2.06z"
                fill="#FBBC05"
              />
              <path
                d="M10 4.58a4.33 4.33 0 013.06 1.2l2.3-2.3A7.72 7.72 0 0010 1.54a8 8 0 00-7.82 4.64l2.65 2.06A4.76 4.76 0 0110 4.58z"
                fill="#EA4335"
              />
            </svg>
            Continue with Google
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

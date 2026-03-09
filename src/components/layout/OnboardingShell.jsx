import { Link, useLocation, useNavigate } from 'react-router-dom'
import Logo from '../ui/Logo'
import { Stepper } from '../ui/Stepper'

export default function OnboardingShell({ steps, currentStep, children }) {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const flow = pathname.includes('/onboarding/admin') ? 'admin' : 'user'

  const handleStepClick = (stepIndex) => {
    navigate(`/onboarding/${flow}/${stepIndex + 1}`)
  }

  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-xl mx-auto">
        {/* Logo */}
        <div className="py-8 flex justify-center">
          <Link to="/" className="cursor-pointer">
            <Logo size="md" />
          </Link>
        </div>

        {/* Stepper */}
        {steps && (
          <div className="mb-8">
            <Stepper steps={steps} currentStep={currentStep} onStepClick={handleStepClick} />
          </div>
        )}

        {/* Content */}
        <div>{children}</div>
      </div>
    </div>
  )
}

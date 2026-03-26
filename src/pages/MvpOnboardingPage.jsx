import { useNavigate, useLocation } from 'react-router-dom'
import MvpOnboardingShell from '../components/layout/MvpOnboardingShell'
import ValueProposition from '../components/mvp-onboarding/ValueProposition'
import UserDetails from '../components/mvp-onboarding/UserDetails'
import Processing from '../components/mvp-onboarding/Processing'

export default function MvpOnboardingPage() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  // Value proposition (entry point)
  if (pathname === '/mvp-onboarding/login') {
    return <ValueProposition onNext={() => navigate('/mvp-onboarding/user/1')} />
  }

  // Processing
  if (pathname === '/mvp-onboarding/processing') {
    return <Processing />
  }

  // Single signup step — shell with logo only, no stepper
  if (pathname === '/mvp-onboarding/user/1') {
    return (
      <MvpOnboardingShell>
        <UserDetails onNext={() => navigate('/mvp-onboarding/processing')} />
      </MvpOnboardingShell>
    )
  }

  return null
}

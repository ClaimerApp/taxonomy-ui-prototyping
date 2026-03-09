import { useParams, useNavigate, useLocation } from 'react-router-dom';
import OnboardingShell from '../components/layout/OnboardingShell';
import LoginScreen from '../components/onboarding/LoginScreen';
import FirmDetails from '../components/onboarding/FirmDetails';
import TeamAuth from '../components/onboarding/TeamAuth';
import ImportData from '../components/onboarding/ImportData';
import UserDetails from '../components/onboarding/UserDetails';
import ConnectEmail from '../components/onboarding/ConnectEmail';
import InviteColleagues from '../components/onboarding/InviteColleagues';
import Processing from '../components/onboarding/Processing';

const adminSteps = ['Firm details', 'Team access', 'Import clients'];
const userSteps = ['Your details', 'Connect email', 'Invite team'];

export default function OnboardingPage() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // Login
  if (pathname === '/onboarding/login') {
    return <LoginScreen onNext={() => navigate('/onboarding/admin/1')} />;
  }

  // Processing
  if (pathname === '/onboarding/processing') {
    return <Processing />;
  }

  // Admin flow
  if (pathname === '/onboarding/admin/1') {
    return (
      <OnboardingShell steps={adminSteps} currentStep={0}>
        <FirmDetails onNext={() => navigate('/onboarding/admin/2')} />
      </OnboardingShell>
    );
  }
  if (pathname === '/onboarding/admin/2') {
    return (
      <OnboardingShell steps={adminSteps} currentStep={1}>
        <TeamAuth onNext={() => navigate('/onboarding/admin/3')} />
      </OnboardingShell>
    );
  }
  if (pathname === '/onboarding/admin/3') {
    return (
      <OnboardingShell steps={adminSteps} currentStep={2}>
        <ImportData onNext={() => navigate('/onboarding/user/1')} />
      </OnboardingShell>
    );
  }

  // User flow
  if (pathname === '/onboarding/user/1') {
    return (
      <OnboardingShell steps={userSteps} currentStep={0}>
        <UserDetails onNext={() => navigate('/onboarding/user/2')} />
      </OnboardingShell>
    );
  }
  if (pathname === '/onboarding/user/2') {
    return (
      <OnboardingShell steps={userSteps} currentStep={1}>
        <ConnectEmail onNext={() => navigate('/onboarding/user/3')} />
      </OnboardingShell>
    );
  }
  if (pathname === '/onboarding/user/3') {
    return (
      <OnboardingShell steps={userSteps} currentStep={2}>
        <InviteColleagues onNext={() => navigate('/onboarding/processing')} />
      </OnboardingShell>
    );
  }

  return null;
}

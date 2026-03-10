import { useNavigate, useLocation } from 'react-router-dom';
import MvpOnboardingShell from '../components/layout/MvpOnboardingShell';
import LoginScreen from '../components/mvp-onboarding/LoginScreen';
import FirmDetails from '../components/mvp-onboarding/FirmDetails';
import TeamAuth from '../components/mvp-onboarding/TeamAuth';
import ImportData from '../components/mvp-onboarding/ImportData';
import UserDetails from '../components/mvp-onboarding/UserDetails';
import ConnectEmail from '../components/mvp-onboarding/ConnectEmail';
import InviteColleagues from '../components/mvp-onboarding/InviteColleagues';
import Processing from '../components/mvp-onboarding/Processing';

const adminSteps = ['Firm details', 'Team access', 'Import clients'];
const userSteps = ['Your details', 'Connect email', 'Invite team'];

export default function MvpOnboardingPage() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // Login
  if (pathname === '/mvp-onboarding/login') {
    return <LoginScreen onNext={() => navigate('/mvp-onboarding/admin/1')} />;
  }

  // Processing
  if (pathname === '/mvp-onboarding/processing') {
    return <Processing />;
  }

  // Admin flow
  if (pathname === '/mvp-onboarding/admin/1') {
    return (
      <MvpOnboardingShell steps={adminSteps} currentStep={0}>
        <FirmDetails onNext={() => navigate('/mvp-onboarding/admin/2')} />
      </MvpOnboardingShell>
    );
  }
  if (pathname === '/mvp-onboarding/admin/2') {
    return (
      <MvpOnboardingShell steps={adminSteps} currentStep={1}>
        <TeamAuth onNext={() => navigate('/mvp-onboarding/admin/3')} />
      </MvpOnboardingShell>
    );
  }
  if (pathname === '/mvp-onboarding/admin/3') {
    return (
      <MvpOnboardingShell steps={adminSteps} currentStep={2}>
        <ImportData onNext={() => navigate('/mvp-onboarding/user/1')} />
      </MvpOnboardingShell>
    );
  }

  // User flow
  if (pathname === '/mvp-onboarding/user/1') {
    return (
      <MvpOnboardingShell steps={userSteps} currentStep={0}>
        <UserDetails onNext={() => navigate('/mvp-onboarding/user/2')} />
      </MvpOnboardingShell>
    );
  }
  if (pathname === '/mvp-onboarding/user/2') {
    return (
      <MvpOnboardingShell steps={userSteps} currentStep={1}>
        <ConnectEmail onNext={() => navigate('/mvp-onboarding/user/3')} />
      </MvpOnboardingShell>
    );
  }
  if (pathname === '/mvp-onboarding/user/3') {
    return (
      <MvpOnboardingShell steps={userSteps} currentStep={2}>
        <InviteColleagues onNext={() => navigate('/mvp-onboarding/processing')} />
      </MvpOnboardingShell>
    );
  }

  return null;
}

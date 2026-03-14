import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import OnboardingPage from './pages/OnboardingPage'
import MvpOnboardingPage from './pages/MvpOnboardingPage'
import EmailPage from './pages/EmailPage'
import AppPage from './pages/AppPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/onboarding/login" element={<OnboardingPage />} />
      <Route path="/onboarding/admin/:step" element={<OnboardingPage />} />
      <Route path="/onboarding/user/:step" element={<OnboardingPage />} />
      <Route path="/onboarding/processing" element={<OnboardingPage />} />
      <Route path="/mvp-onboarding/login" element={<MvpOnboardingPage />} />
      <Route path="/mvp-onboarding/admin/:step" element={<MvpOnboardingPage />} />
      <Route path="/mvp-onboarding/user/:step" element={<MvpOnboardingPage />} />
      <Route path="/mvp-onboarding/processing" element={<MvpOnboardingPage />} />
      <Route path="/email" element={<EmailPage />} />
      <Route path="/email/:id" element={<EmailPage />} />
      <Route path="/app" element={<AppPage />} />
      <Route path="/app/entities" element={<AppPage />} />
      <Route path="/app/signals/:id" element={<AppPage />} />
      <Route path="/app/entities/:id" element={<AppPage />} />
      <Route path="/app/checks" element={<AppPage />} />
      <Route path="/app/checks/checker/:checkerId" element={<AppPage />} />
      <Route path="/app/checks/:id" element={<AppPage />} />
      <Route path="/app/settings" element={<AppPage />} />
      <Route path="/app/settings/sensors" element={<AppPage />} />
      <Route path="/app/settings/interceptors" element={<AppPage />} />
      <Route path="/app/settings/data-sources" element={<AppPage />} />
      <Route path="/app/settings/alerts" element={<AppPage />} />
      <Route path="/app/settings/checkers" element={<AppPage />} />
    </Routes>
  )
}

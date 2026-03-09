import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import OnboardingPage from './pages/OnboardingPage'
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
      <Route path="/email" element={<EmailPage />} />
      <Route path="/email/:id" element={<EmailPage />} />
      <Route path="/app" element={<AppPage />} />
      <Route path="/app/entities" element={<AppPage />} />
      <Route path="/app/signals/:id" element={<AppPage />} />
      <Route path="/app/entities/:id" element={<AppPage />} />
      <Route path="/app/sensors" element={<AppPage />} />
      <Route path="/app/interceptors" element={<AppPage />} />
    </Routes>
  )
}

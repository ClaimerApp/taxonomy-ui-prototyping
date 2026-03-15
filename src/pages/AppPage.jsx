import { useParams, useLocation } from 'react-router-dom';
import AppShell from '../components/layout/AppShell';
import SignalFeed from '../components/signals/SignalFeed';
import SignalDetail from '../components/signals/SignalDetail';
import EntityPage from '../components/entities/EntityPage';
import { EntityList } from '../components/entities/EntityList';
import { SettingsPage } from '../components/settings/SettingsPage';
import ChecksFeed from '../components/checks/ChecksFeed';
import CheckDetail from '../components/checks/CheckDetail';

export default function AppPage() {
  const { id, checkerId } = useParams();
  const { pathname } = useLocation();

  let content;

  if (pathname.startsWith('/app/signals/') && id) {
    content = <SignalDetail id={id} />;
  } else if (pathname.startsWith('/app/entities/') && id) {
    content = <EntityPage id={id} />;
  } else if (pathname === '/app/entities') {
    content = <EntityList />;
  } else if (pathname.startsWith('/app/checks/checker/') && checkerId) {
    content = <ChecksFeed checkerId={checkerId} />;
  } else if (pathname.startsWith('/app/checks/') && id) {
    content = <CheckDetail />;
  } else if (pathname === '/app/checks') {
    content = <ChecksFeed />;
  } else if (pathname.startsWith('/app/settings')) {
    const section = pathname.split('/app/settings/')[1] || 'checkers';
    content = <SettingsPage section={section} />;
  } else {
    content = <SignalFeed />;
  }

  return <AppShell>{content}</AppShell>;
}

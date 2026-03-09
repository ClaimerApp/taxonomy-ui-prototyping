import { useParams, useLocation } from 'react-router-dom';
import AppShell from '../components/layout/AppShell';
import SignalFeed from '../components/signals/SignalFeed';
import SignalDetail from '../components/signals/SignalDetail';
import EntityPage from '../components/entities/EntityPage';
import SensorList from '../components/config/SensorList';
import InterceptorList from '../components/config/InterceptorList';
import { EntityList } from '../components/entities/EntityList';

export default function AppPage() {
  const { id } = useParams();
  const { pathname } = useLocation();

  let content;

  if (pathname.startsWith('/app/signals/') && id) {
    content = <SignalDetail id={id} />;
  } else if (pathname.startsWith('/app/entities/') && id) {
    content = <EntityPage id={id} />;
  } else if (pathname === '/app/entities') {
    content = <EntityList />;
  } else if (pathname === '/app/sensors') {
    content = <SensorList />;
  } else if (pathname === '/app/interceptors') {
    content = <InterceptorList />;
  } else {
    content = <SignalFeed />;
  }

  return <AppShell>{content}</AppShell>;
}

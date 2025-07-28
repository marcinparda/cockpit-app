import { AppLayout, NavLink, TopNavBar } from '@cockpit-app/cockpit-ui';
import AppsPage from './apps/apps';
import { LayoutDashboard } from 'lucide-react';

const navLinks: NavLink[] = [
  { name: 'Apps', href: '/' },
  { name: 'Dashboard', href: '/dashboard' },
];

export function App() {
  return (
    <AppLayout
      header={
        <TopNavBar
          navLinks={navLinks}
          brandName="Cockpit"
          BrandIcon={LayoutDashboard}
        />
      }
    >
      <AppsPage />
    </AppLayout>
  );
}

export default App;

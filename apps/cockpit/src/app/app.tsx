import { AppLayout, NavLink, TopNavBar } from '@cockpit-app/cockpit-ui';
import AppsPage from './apps/apps';
import { LayoutDashboard } from 'lucide-react';
import { LogoutButton } from './components/LogoutButton';
import { useUser } from '@cockpit-app/cockpit-data-access';
import { AppSkeleton } from './skeleton';

const navLinks: NavLink[] = [
  { name: 'Apps', href: '/' },
  { name: 'Dashboard', href: '/dashboard' },
];

export default function App() {
  const { isLoading } = useUser();
  if (isLoading) {
    return <AppSkeleton />;
  }

  return (
    <AppLayout
      header={
        <TopNavBar
          navLinks={navLinks}
          brandName="Cockpit"
          BrandIcon={LayoutDashboard}
          rightContent={<LogoutButton />}
        />
      }
    >
      <AppsPage />
    </AppLayout>
  );
}

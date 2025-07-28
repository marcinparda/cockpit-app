import { AppLayout, NavLink, TopNavBar } from '@cockpit-app/cockpit-ui';
import AppsPage from './apps/apps';
import { LayoutDashboard } from 'lucide-react';
import { TopNavBarRighContent } from './components/TopNavBarRighContent';
import { useUser } from '@cockpit-app/cockpit-data-access';
import { AppSkeleton } from './skeleton';
import { logout } from '@cockpit-app/shared/auth';

const navLinks: NavLink[] = [
  { name: 'Apps', href: '/' },
  { name: 'Dashboard', href: '/dashboard' },
];

export default function App() {
  const { isLoading, data: userInfo } = useUser();
  if (isLoading) {
    return <AppSkeleton />;
  }

  if (!userInfo) {
    logout();
    return <AppSkeleton />;
  }

  return (
    <AppLayout
      header={
        <TopNavBar
          navLinks={navLinks}
          brandName="Cockpit"
          BrandIcon={LayoutDashboard}
          rightContent={<TopNavBarRighContent userInfo={userInfo} />}
        />
      }
    >
      <AppsPage />
    </AppLayout>
  );
}

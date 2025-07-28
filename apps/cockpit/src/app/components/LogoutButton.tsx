import { Button } from '@cockpit-app/shared/react-ui';
import { logout } from '@cockpit-app/shared/auth';
import { environment } from '../../environments/environments';

export function LogoutButton() {
  const handleLogout = async () => {
    await logout();
    const redirectUrl = new URL(environment.loginUrl);
    redirectUrl.searchParams.set('redirect_uri', window.location.href);
    window.location.href = redirectUrl.toString();
  };

  return (
    <Button variant="ghost" onClick={handleLogout}>
      Logout
    </Button>
  );
}

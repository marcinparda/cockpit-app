import { Button, TypographySmall } from '@cockpit-app/shared/react-ui';
import { logout } from '@cockpit-app/shared/auth';
import { environment } from '../../environments/environments';
import { UserInfoResponse } from '@cockpit-app/types-shared-auth';

interface TopNavBarRighContentProps {
  userInfo: UserInfoResponse;
}

export function TopNavBarRighContent({ userInfo }: TopNavBarRighContentProps) {
  const handleLogout = async () => {
    await logout();
    const redirectUrl = new URL(environment.loginUrl);
    redirectUrl.searchParams.set('redirect_uri', window.location.href);
    window.location.href = redirectUrl.toString();
  };

  return (
    <div className="flex items-center gap-4">
      <TypographySmall>Logged in as: {userInfo.email}</TypographySmall>
      <Button variant="ghost" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
}

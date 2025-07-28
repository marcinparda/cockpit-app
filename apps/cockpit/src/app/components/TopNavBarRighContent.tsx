import { Button, TypographySmall } from '@cockpit-app/shared/react-ui';
import { logout } from '@cockpit-app/common-shared-data-access';
import { environments } from '../../environments/environments';
import { UserInfoResponse } from '@cockpit-app/types-shared-auth';

interface TopNavBarRighContentProps {
  userInfo: UserInfoResponse;
}

export function TopNavBarRighContent({ userInfo }: TopNavBarRighContentProps) {
  const handleLogout = async () => {
    await logout();
    const redirectUrl = new URL(environments.loginUrl);
    redirectUrl.searchParams.set('redirect_uri', window.location.href);
    console.log(redirectUrl.toString());

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

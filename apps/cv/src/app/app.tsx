import { useUser } from '@cockpit-app/shared-react-data-access';
import { AppSkeleton } from './skeleton';
import { CV } from '../components/cv/cv';

export default function App() {
  const {
    isLoading,
    data: userInfo,
    isError,
  } = useUser({
    withRedirect: false,
    options: {
      retry: false,
    },
  });
  if (isError) {
    const redirectUrl = new URL('https://parda.me/cv.pdf');
    window.location.href = redirectUrl.toString();
    return <AppSkeleton />;
  }

  if (isLoading) {
    return <AppSkeleton />;
  }

  if (!userInfo) {
    const redirectUrl = new URL('https://parda.me/cv.pdf');
    window.location.href = redirectUrl.toString();
    return <AppSkeleton />;
  }

  return <CV />;
}

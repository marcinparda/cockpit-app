import { useEffect, useState } from 'react';
import LoginPage from './login/page';

/**
 * Main App component for Login app. Handles manual routing and authentication redirect.
 */
export function App() {
  const [shouldRenderLogin, setShouldRenderLogin] = useState(false);

  useEffect(function handleManualRouting() {
    // Check for authentication cookies
    function getCookie(name: string): string | undefined {
      const match = document.cookie.match(
        new RegExp('(^| )' + name + '=([^;]+)')
      );
      return match ? decodeURIComponent(match[2]) : undefined;
    }
    const accessToken = getCookie('access_token');
    const refreshToken = getCookie('refresh_token');
    if (accessToken || refreshToken) {
      window.location.replace('https://cockpit.parda.me');
      return;
    }
    // Only render login page for /login or root
    if (
      window.location.pathname === '/login' ||
      window.location.pathname === '/'
    ) {
      setShouldRenderLogin(true);
    } else {
      // Redirect to /login for any other path
      window.location.replace('/login');
    }
  }, []);

  if (!shouldRenderLogin) return null;
  return <LoginPage />;
}

export default App;

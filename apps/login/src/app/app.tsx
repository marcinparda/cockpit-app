import { useEffect, useState } from 'react';
import { isLoggedIn } from '@cockpit-app/shared/auth';
import LoginPage from './login/page';

/**
 * Main App component for Login app. Handles manual routing and authentication redirect.
 */
export function App() {
  const [shouldRenderLogin, setShouldRenderLogin] = useState(false);

  useEffect(() => {
    isLoggedIn().then((loggedIn) => {
      if (loggedIn) {
        window.location.replace('https://cockpit.parda.me');
        return;
      }
    }).catch((error) => {
      console.error('Error checking login status:', error);
      setShouldRenderLogin(true);
    });

    if (window.location.pathname !== '/') {
      window.location.replace('/');
    }
  }, []);

  if (!shouldRenderLogin) return null;
  return <LoginPage />;
}

export default App;

import { useEffect, useState } from 'react';
import { isLoggedIn } from '@cockpit-app/shared/auth';
import LoginPage from './login/page';
import { REDIRECT_URL } from '../consts/environments';

/**
 * Main App component for Login app. Handles manual routing and authentication redirect.
 */
export function App() {
  const [shouldRenderLogin, setShouldRenderLogin] = useState(false);

  useEffect(() => {
    isLoggedIn().then((loggedIn) => {
      if (loggedIn) {
        window.location.replace(REDIRECT_URL);
        return;
      }
    });
    setShouldRenderLogin(true);
  }, []);

  if (!shouldRenderLogin) return null;
  return <LoginPage />;
}

export default App;

import { useEffect, useState } from 'react';
import { isLoggedIn } from '@cockpit-app/shared/auth';
import LoginPage from './login/page';
import { environment } from '../environments/environments';

/**
 * Main App component for Login app. Handles manual routing and authentication redirect.
 */
export function App() {
  const [shouldRenderLogin, setShouldRenderLogin] = useState(false);

  useEffect(() => {
    isLoggedIn()
      .then((loggedIn) => {
        if (loggedIn) {
          window.location.replace(environment.cockpitUrl);
          return;
        }
      })
      .catch(() => {
        setShouldRenderLogin(true);
      });
  }, []);

  if (!shouldRenderLogin) return null;
  return <LoginPage />;
}

export default App;

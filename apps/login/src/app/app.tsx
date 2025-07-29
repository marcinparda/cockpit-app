import { useEffect, useState } from 'react';
import { isLoggedIn } from '@cockpit-app/common-shared-data-access';
import LoginPage from './login/page';
import { environments } from '@cockpit-app/shared-utils';

/**
 * Main App component for Login app. Handles manual routing and authentication redirect.
 */
export function App() {
  const [shouldRenderLogin, setShouldRenderLogin] = useState(false);

  useEffect(() => {
    isLoggedIn(false)
      .then((loggedIn) => {
        if (loggedIn) {
          window.location.replace(environments.cockpitUrl);
          return;
        } else {
          setShouldRenderLogin(true);
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

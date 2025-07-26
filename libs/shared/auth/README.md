# @cockpit-app/shared/auth

Framework-agnostic authentication utilities for the Cockpit ecosystem.

## Installation

```
npm install @cockpit-app/shared/auth
```

## Quick Start

```ts
import { isLoggedIn, getCurrentUser, logout } from '@cockpit-app/shared/auth';

const loggedIn = await isLoggedIn();
const user = await getCurrentUser();
await logout();
```

## API

- Service classes: `AuthService`, `PermissionsService`
- Types: `UserInfo`, `AuthState`, `AuthError`
- Convenience functions: `isLoggedIn`, `getCurrentUser`, `refreshAccessToken`, `logout`, `isAdmin`, `hasPermission`, `getUserRole`, `hasRole`, `makeAuthenticatedRequest`, `makeAuthenticatedRequestWithRetry`

## Usage Examples

### Next.js (React hooks)

```ts
import { useEffect, useState } from 'react';
import { isLoggedIn, getCurrentUser } from '@cockpit-app/shared/auth';

export function useAuth() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    isLoggedIn().then(async (ok) => {
      if (ok) setUser(await getCurrentUser());
    });
  }, []);
  return user;
}
```

### Vue.js (Composables)

```ts
import { ref, onMounted } from 'vue';
import { isLoggedIn, getCurrentUser } from '@cockpit-app/shared/auth';

export function useAuth() {
  const user = ref(null);
  onMounted(async () => {
    if (await isLoggedIn()) user.value = await getCurrentUser();
  });
  return { user };
}
```

### Angular (Service injection)

```ts
import { AuthService } from '@cockpit-app/shared/auth';

@Injectable({ providedIn: 'root' })
export class MyAuthFacade {
  constructor(private auth: AuthService) {}
  async getUser() {
    return this.auth.getCurrentUser();
  }
}
```

## Error Handling

All methods return `null` or `false` on error. Use try/catch for advanced error handling.

## Best Practices

- Use convenience functions for most use cases
- Use service classes for advanced scenarios
- Always handle network/API errors gracefully

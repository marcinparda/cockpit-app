import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { map, tap } from 'rxjs';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);

  return authService.checkSession().pipe(
    tap((isAuthenticated) => {
      if (!isAuthenticated) {
        authService.redirectToLogin();
      }
    }),
    map((isAuthenticated) => isAuthenticated),
  );
};

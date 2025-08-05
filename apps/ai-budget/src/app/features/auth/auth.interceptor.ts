import { inject } from '@angular/core';
import {
  HttpErrorResponse,
  HttpInterceptorFn,
} from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const apiKey = authService.getStoredApiKey();

  if (apiKey) {
    const clonedReq = req.clone({
      setHeaders: {
        'X-API-KEY': apiKey,
      },
    });

    return next(clonedReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 || error.status === 403) {
          authService.clearApiKey();
          router.navigate(['/login'], {
            queryParams: { returnUrl: router.url },
          });
        }
        return throwError(() => error);
      })
    );
  }

  return next(req);
};

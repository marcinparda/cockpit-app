import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpInterceptorFn,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

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

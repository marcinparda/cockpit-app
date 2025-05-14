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

// Keep the class for backward compatibility if needed elsewhere
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {
    console.log('Constructor'); // Debugging line
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const apiKey = this.authService.getStoredApiKey();

    if (apiKey) {
      request = request.clone({
        setHeaders: {
          'X-API-KEY': apiKey,
        },
      });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 || error.status === 403) {
          this.authService.clearApiKey();
          this.router.navigate(['/login'], {
            queryParams: { returnUrl: this.router.url },
          });
        }
        return throwError(() => error);
      })
    );
  }
}

// Modern functional interceptor pattern
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

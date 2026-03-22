import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, of } from 'rxjs';
import { environments } from '@cockpit-app/shared-utils';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  checkSession(): Observable<boolean> {
    return this.http
      .get(`${environments.apiUrl}/api/v1/authentication/sessions/me`, {
        withCredentials: true,
      })
      .pipe(
        map(() => true),
        catchError(() => of(false)),
      );
  }

  redirectToLogin(): void {
    const redirectUri = encodeURIComponent(window.location.href);
    window.location.href = `${environments.loginUrl}?redirect_uri=${redirectUri}`;
  }
}

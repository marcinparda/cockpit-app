import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private API_KEY_STORAGE_KEY = 'x-api-key';
  private apiKeySubject = new BehaviorSubject<string | null>(
    this.getStoredApiKey()
  );
  public apiKey$ = this.apiKeySubject.asObservable();
  private isBrowser: boolean;

  constructor(private router: Router, @Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  public getStoredApiKey(): string | null {
    if (this.isBrowser) {
      return localStorage.getItem(this.API_KEY_STORAGE_KEY);
    }
    return null;
  }

  public saveApiKey(key: string): void {
    if (this.isBrowser) {
      localStorage.setItem(this.API_KEY_STORAGE_KEY, key);
    }
    this.apiKeySubject.next(key);
  }

  public clearApiKey(): void {
    if (this.isBrowser) {
      localStorage.removeItem(this.API_KEY_STORAGE_KEY);
    }
    this.apiKeySubject.next(null);
  }

  public isAuthenticated(): boolean {
    return !!this.getStoredApiKey();
  }

  public logout(): void {
    this.clearApiKey();
    this.router.navigate(['/login']);
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private API_KEY_STORAGE_KEY = 'x-api-key';
  private apiKeySubject = new BehaviorSubject<string | null>(
    this.getStoredApiKey()
  );
  public apiKey$ = this.apiKeySubject.asObservable();

  constructor(private router: Router) {}

  public getStoredApiKey(): string | null {
    return localStorage.getItem(this.API_KEY_STORAGE_KEY);
  }

  public saveApiKey(key: string): void {
    localStorage.setItem(this.API_KEY_STORAGE_KEY, key);
    this.apiKeySubject.next(key);
  }

  public clearApiKey(): void {
    localStorage.removeItem(this.API_KEY_STORAGE_KEY);
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

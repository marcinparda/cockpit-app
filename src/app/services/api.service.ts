import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const apiKey = this.authService.getStoredApiKey();
    return new HttpHeaders({
      'X-API-KEY': apiKey || '',
    });
  }

  getCockpitData(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/v1/payment_methods`, {
      headers: this.getHeaders(),
    });
  }

  // Expense endpoints
  getExpenses(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/v1/expenses/`, {
      headers: this.getHeaders(),
    });
  }

  createExpense(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/v1/expenses/`, data, {
      headers: this.getHeaders(),
    });
  }

  // Category endpoints
  getCategories(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/v1/categories/`, {
      headers: this.getHeaders(),
    });
  }

  createCategory(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/v1/categories/`, data, {
      headers: this.getHeaders(),
    });
  }

  // Payment method endpoints
  getPaymentMethods(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/v1/payment_methods/`, {
      headers: this.getHeaders(),
    });
  }

  createPaymentMethod(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/v1/payment_methods/`, data, {
      headers: this.getHeaders(),
    });
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { environment } from '../../../environments/environment';

// Import generated types
import type {
  Expense,
  ExpenseCreate,
  ExpenseUpdate,
} from '@cockpit-app/types-ai-budget-expenses';
import type {
  Category,
  CategoryCreate,
  CategoryUpdate,
} from '@cockpit-app/types-ai-budget-categories';
import type {
  PaymentMethod,
  PaymentMethodCreate,
  PaymentMethodUpdate,
} from '@cockpit-app/types-ai-budget-payment-methods';

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

  getCockpitData(): Observable<PaymentMethod[]> {
    return this.http.get<PaymentMethod[]>(
      `${this.apiUrl}/api/v1/payment_methods`,
      {
        headers: this.getHeaders(),
      }
    );
  }

  // Expense endpoints
  getExpenses(): Observable<Expense[]> {
    return this.http.get<Expense[]>(`${this.apiUrl}/api/v1/expenses`, {
      headers: this.getHeaders(),
    });
  }

  createExpense(data: ExpenseCreate): Observable<Expense> {
    return this.http.post<Expense>(`${this.apiUrl}/api/v1/expenses`, data, {
      headers: this.getHeaders(),
    });
  }

  // Category endpoints
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/api/v1/categories`, {
      headers: this.getHeaders(),
    });
  }

  createCategory(data: CategoryCreate): Observable<Category> {
    return this.http.post<Category>(`${this.apiUrl}/api/v1/categories`, data, {
      headers: this.getHeaders(),
    });
  }

  // Payment method endpoints
  getPaymentMethods(): Observable<PaymentMethod[]> {
    return this.http.get<PaymentMethod[]>(
      `${this.apiUrl}/api/v1/payment_methods`,
      {
        headers: this.getHeaders(),
      }
    );
  }

  createPaymentMethod(data: PaymentMethodCreate): Observable<PaymentMethod> {
    return this.http.post<PaymentMethod>(
      `${this.apiUrl}/api/v1/payment_methods`,
      data,
      {
        headers: this.getHeaders(),
      }
    );
  }
}

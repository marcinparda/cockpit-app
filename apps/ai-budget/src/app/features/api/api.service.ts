import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environments } from '@cockpit-app/shared-utils';

// Import generated types
import type {
  Expense,
  ExpenseCreate,
  Category,
  CategoryCreate,
  PaymentMethod,
  PaymentMethodCreate,
} from '@cockpit-app/api-types';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = environments.apiUrl;

  constructor(private http: HttpClient) {}

  // Expense endpoints
  getExpenses(): Observable<Expense[]> {
    return this.http.get<Expense[]>(`${this.apiUrl}/api/v1/expenses`);
  }

  createExpense(data: ExpenseCreate): Observable<Expense> {
    return this.http.post<Expense>(`${this.apiUrl}/api/v1/expenses`, data);
  }

  // Category endpoints
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/api/v1/categories`);
  }

  createCategory(data: CategoryCreate): Observable<Category> {
    return this.http.post<Category>(`${this.apiUrl}/api/v1/categories`, data);
  }

  // Payment method endpoints
  getPaymentMethods(): Observable<PaymentMethod[]> {
    return this.http.get<PaymentMethod[]>(
      `${this.apiUrl}/api/v1/payment_methods`
    );
  }

  createPaymentMethod(data: PaymentMethodCreate): Observable<PaymentMethod> {
    return this.http.post<PaymentMethod>(
      `${this.apiUrl}/api/v1/payment_methods`,
      data
    );
  }
}

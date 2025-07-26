import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environments';

// Import generated types
import type {
  Expense,
  ExpenseCreate,
} from '@cockpit-app/types-ai-budget-expenses';
import type {
  Category,
  CategoryCreate,
} from '@cockpit-app/types-ai-budget-categories';
import type {
  PaymentMethod,
  PaymentMethodCreate,
} from '@cockpit-app/types-ai-budget-payment-methods';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = environment.apiUrl;

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

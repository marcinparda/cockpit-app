import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    loadComponent: () =>
      import('./components/main-layout/main-layout.component').then(
        (m) => m.MainLayoutComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'expenses',
    loadComponent: () =>
      import('./components/expenses/expenses.component').then(
        (m) => m.ExpensesComponent
      ),
  },
  {
    path: 'expenses/create',
    loadComponent: () =>
      import(
        './components/expenses/expense-create/expense-create.component'
      ).then((m) => m.ExpenseCreateComponent),
  },
  {
    path: 'categories',
    loadComponent: () =>
      import('./components/categories/categories.component').then(
        (m) => m.CategoriesComponent
      ),
  },
  {
    path: 'categories/create',
    loadComponent: () =>
      import(
        './components/categories/category-create/category-create.component'
      ).then((m) => m.CategoryCreateComponent),
  },
  {
    path: 'payment-methods',
    loadComponent: () =>
      import('./components/payment-methods/payment-methods.component').then(
        (m) => m.PaymentMethodsComponent
      ),
  },
  {
    path: 'payment-methods/create',
    loadComponent: () =>
      import(
        './components/payment-methods/payment-method-create/payment-method-create.component'
      ).then((c) => c.PaymentMethodCreateComponent),
  },
  {
    path: '**',
    redirectTo: 'expenses',
  },
];

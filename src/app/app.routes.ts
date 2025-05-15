import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./features/auth/auth.routes').then((m) => m.AUTH_ROUTES),
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
    loadChildren: () =>
      import('./features/categories/categories.routes').then(
        (m) => m.CATEGORIES_ROUTES
      ),
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

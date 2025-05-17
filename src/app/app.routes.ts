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
    loadChildren: () =>
      import('./features/expenses/expenses.routes').then(
        (m) => m.EXPENSES_ROUTES
      ),
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

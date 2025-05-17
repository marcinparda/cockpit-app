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
    loadChildren: () =>
      import('./features/payment-methods/payment-methods.routes').then(
        (m) => m.PAYMENT_METHODS_ROUTES
      ),
  },
  {
    path: '**',
    redirectTo: 'expenses',
  },
];

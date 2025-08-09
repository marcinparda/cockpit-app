import { Routes } from '@angular/router';
import { AuthGuard } from './features/auth/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./features/auth/auth.routes').then((m) => m.AUTH_ROUTES),
  },
  {
    path: '',
    loadComponent: () =>
      import(
        './shared/components/navigation-header/navigation-header.component'
      ).then((m) => m.NavigationHeaderComponent),
    canActivate: [AuthGuard],
  },
  {
    path: 'expenses',
    loadChildren: () =>
      import('./features/expenses/expenses.routes').then(
        (m) => m.EXPENSES_ROUTES,
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'categories',
    loadChildren: () =>
      import('./features/categories/categories.routes').then(
        (m) => m.CATEGORIES_ROUTES,
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'payment-methods',
    loadChildren: () =>
      import('./features/payment-methods/payment-methods.routes').then(
        (m) => m.PAYMENT_METHODS_ROUTES,
      ),
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: 'expenses',
  },
];

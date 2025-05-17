import { Routes } from '@angular/router';

export const PAYMENT_METHODS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import(
        './pages/payment-methods-list-page/payment-methods-list-page.component'
      ).then((m) => m.PaymentMethodsListPageComponent),
  },
  {
    path: 'create',
    loadComponent: () =>
      import(
        './pages/payment-method-create-page/payment-method-create-page.component'
      ).then((m) => m.PaymentMethodCreatePageComponent),
  },
];

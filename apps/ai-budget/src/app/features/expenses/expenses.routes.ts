import { Routes } from '@angular/router';

export const EXPENSES_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/expenses-list-page/expenses-list-page.component').then(
        (m) => m.ExpensesListPageComponent,
      ),
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./pages/expense-create-page/expense-create-page.component').then(
        (m) => m.ExpenseCreatePageComponent,
      ),
  },
];

import { Routes } from '@angular/router';
import { authGuard } from './features/auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./features/store/store.routes').then((m) => m.STORE_ROUTES),
  },
  {
    path: '**',
    redirectTo: '',
  },
];

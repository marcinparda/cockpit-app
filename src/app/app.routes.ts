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
    path: '**',
    redirectTo: '',
  },
];

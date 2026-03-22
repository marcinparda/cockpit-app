import { Routes } from '@angular/router';

export const STORE_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/store-browser-page/store-browser-page.component').then(
        (m) => m.StoreBrowserPageComponent,
      ),
  },
];

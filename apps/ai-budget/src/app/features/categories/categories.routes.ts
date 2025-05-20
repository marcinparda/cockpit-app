import { Routes } from '@angular/router';

export const CATEGORIES_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import(
        './pages/categories-list-page/categories-list-page.component'
      ).then((m) => m.CategoriesListPageComponent),
  },
  {
    path: 'create',
    loadComponent: () =>
      import(
        './pages/category-create-page/category-create-page.component'
      ).then((m) => m.CategoryCreatePageComponent),
  },
];

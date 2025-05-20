import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/shopping-list',
      name: 'shoppingList',
      component: () => import('../views/ShoppingListView.vue'),
    },
  ],
});

export default router;

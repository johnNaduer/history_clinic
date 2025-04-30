import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/table',
      name: 'table',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ShowTable.vue'),
    },
    {
      path: '/tableView',
      name: 'tableView',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/BaseTableView.vue'),
    },
    {
      path: '/calendarView',
      name: 'calendarView',
      component: () => import('../views/CalendatView.vue'),
    },
    {
      path: '/ath/inventory-item-type-detail/:id?',
      name: 'inventory-item-type-detail',
      component: () => import('../views/InventoryItemTypeDetailView.vue'), // Ensure this file exists at the specified path
    },
  ],
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import InventoryView from '../views/InventoryView.vue'
import Inventory from '../views/Inventory.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/inventory/:inventoryId',
      name: 'itempage',
      component: InventoryView
    },
    {
      path: '/inventory',
      name: 'Inventory',
      component: Inventory
    },

  ]
})

export default router

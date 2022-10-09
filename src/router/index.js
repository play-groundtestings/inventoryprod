import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import InventoryView from '../views/InventoryView.vue'
import Inventory from '../views/Inventory.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'inventory',
      component: Inventory
    },
    {
      path: '/inventory/:invenId',
      name: 'itempage',
      component: InventoryView
    },
    {
      path: '/addcard',
      name: 'addCard',
      component: HomeView
    },
  ]
})

export default router

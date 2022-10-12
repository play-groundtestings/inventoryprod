import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import InventoryView from '../views/InventoryView.vue'
import SearchView from '../views/SearchView.vue'
import Inventory from '../views/Inventory.vue'
import EditView from '../views/EditView.vue'

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
    {
      path: '/search',
      name: 'search',
      component: SearchView
    },
    {
      path: '/inventory/:invenId/edit',
      name: 'itemedit',
      component: EditView
    },
  ]
})

export default router

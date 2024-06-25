import { Catalog } from '@/modules/catalog'
import { Favorites } from '@/modules/favorites'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '', name: 'catalog', component: Catalog },
    { path: '/favorites', name: 'favorites', component: Favorites },
  ],
})

export default router

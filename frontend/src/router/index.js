import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/reviews',
      name: 'movies',
      component: () => import('../views/ReviewsView.vue')
    },
    {
      path: '/users',
      name: 'users',
      component: () => import('../views/UsersView.vue')
    },
    {
      path: '/directors',
      name: 'directors',
      component: () => import('../views/DirectorsView.vue')
    },
    {
      path: '/movies/:id',
      name: 'movie',
      component: () => import('../views/MovieView.vue')
    }
  ]
})

export default router

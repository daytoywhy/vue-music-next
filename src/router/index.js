import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/recommend'
  },
  {
    path: '/recommend',
    component: () => import('@/views/recommend.vue')
  },
  {
    path: '/singer',
    component: () => import('@/views/singer.vue')
  },
  {
    path: '/top-list',
    component: () => import('@/views/top-list.vue')
  },
  {
    path: '/search',
    component: () => import('@/views/search.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes
})

export default router

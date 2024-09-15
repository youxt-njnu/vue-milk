import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    meta: { title: '主页', icon: 'Home' },
  },
  {
    path: '/spatial-distribution',
    name: 'SpatialDistribution',
    component: () => import('@/views/SpatialDistribution/index.vue'),
    meta: { title: '空间分布', icon: 'Home' },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || false
  },
})
export default router

import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/big-screen'
    },
    {
      path: '/big-screen',
      name: 'big-screen',
      component: () => import('@/views/bigScreen/big-screen.vue')
    }
  ]
})

export default router

import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '../pages/HomePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomePage
    },
    {
      path: '/projects',
      name: 'projects',
      component: () => import ('../pages/ProjectsList.vue')
    },
    {
      path: '/tasks',
      name: 'tasks',
      component: () => import ('../pages/TasksList.vue')
    },
    {
      path: '/persons',
      name: 'persons',
      component: () => import ('../pages/PersonsList.vue')
    },
  ]
})

export default router



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
    {
      path: '/form-project',
      name: 'form-project',
      component: () => import ('../pages/FormPage.vue')
    },
    {
      path: '/form-task',
      name: 'form-task',
      component: () => import ('../pages/FormPage.vue')
    },
    {
      path: '/form-person',
      name: 'form-person',
      component: () => import ('../pages/FormPage.vue')
    }
  ]
})

export default router



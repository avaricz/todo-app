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
      path: '/error',
      name: 'error',
      componetn: () => import ('../pages/ErrorPage.vue')
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
      component: () => import ('../pages/FormPageProject.vue')
    },
    {
      path: '/form-project/:id',
      name: 'project-edit',
      component: () => import ('../pages/FormPageProject.vue')
    },
    {
      path: '/form-task',
      name: 'form-task',
      component: () => import ('../pages/FormPageTask.vue')
    },
    {
      path: '/form-task/:id',
      name: 'task-edit',
      component: () => import ('../pages/FormPageTask.vue')
    },
    {
      path: '/form-person',
      name: 'form-person',
      component: () => import ('../pages/FormPagePerson.vue')
    },
    {
      path: '/form-person/:id',
      name: 'person-edit',
      component: () => import ('../pages/FormPagePerson.vue')
    },
    {
      path: '/edit-positions',
      name: 'edit-positions',
      component: () => import ('../pages/SettingsPagePositions.vue')
    }
  ]
})

export default router



import Dashboard from '@/domains/Dashboard/views/Dashboard.vue'

export default [
  {
    path: '/',
    name: 'dashboard',
    meta: {
      requireLogin: true
    },
    component: Dashboard
  },
  {
    path: '/auth/login',
    name: 'auth-login',
    // route level code-splitting
    // this generates a separate chunk (gratitude-diary.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "gratitude-diary" */ '../domains/Auth/views/Login.vue')
  },
  {
    path: '/auth/register',
    name: 'auth-register',
    // route level code-splitting
    // this generates a separate chunk (gratitude-diary.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "gratitude-diary" */ '../domains/Auth/views/Register.vue')
  },
  {
    path: '/auth/password',
    name: 'auth-password',
    // route level code-splitting
    // this generates a separate chunk (gratitude-diary.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "gratitude-diary" */ '../domains/Auth/views/Password.vue')
  },
  {
    path: '/gratitude-diaries',
    name: 'gratitude-diaries',
    meta: {
      requireLogin: true
    },
    // route level code-splitting
    // this generates a separate chunk (gratitude-diary.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "gratitude-diary" */ '../domains/GratitudeDiaries/views/GratitudeDiaries.vue')
  },
  {
    path: '/notes',
    name: 'notes',
    meta: {
      requireLogin: true
    },
    // route level code-splitting
    // this generates a separate chunk (notes.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "notes" */ '../domains/Notes/views/Notes.vue')
  },
  {
    path: '/goals',
    name: 'goals',
    meta: {
      requireLogin: true
    },
    // route level code-splitting
    // this generates a separate chunk (goals.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "goals" */ '../domains/Goals/views/Goals.vue')
  },
  {
    path: '/tasks',
    name: 'tasks',
    meta: {
      requireLogin: true
    },
    // route level code-splitting
    // this generates a separate chunk (tasks.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "tasks" */ '../domains/Tasks/views/Tasks.vue')
  },
  {
    path: '/streaks',
    name: 'streaks',
    meta: {
      requireLogin: true
    },
    // route level code-splitting
    // this generates a separate chunk (streaks.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "streaks" */ '../domains/Streaks/views/Streaks.vue')
  }
]

import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
    meta: {
      title: 'Login',
      requiresAuth: false
    }
  },
  {
    path: '/admin/login',
    name: 'AdminLogin',
    component: () => import('@/views/AdminLogin.vue'),
    meta: {
      title: 'Admin Login',
      requiresAuth: false
    }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/Dashboard.vue'),
    meta: {
      title: 'Dashboard',
      requiresAuth: true
    }
  },
  {
    path: '/products',
    name: 'Products',
    component: () => import('@/views/Products.vue'),
    meta: {
      title: 'Products',
      requiresAuth: true
    }
  },
  {
    path: '/users',
    name: 'Users',
    component: () => import('@/views/Users.vue'),
    meta: {
      title: 'Users',
      requiresAuth: true
    }
  },
  {
    path: '/licenses',
    name: 'Licenses',
    component: () => import('@/views/Licenses.vue'),
    meta: {
      title: 'Licenses',
      requiresAuth: true
    }
  },
  {
    path: '/orders',
    name: 'Orders',
    component: () => import('@/views/Orders.vue'),
    meta: {
      title: 'Orders',
      requiresAuth: true
    }
  },
  {
    path: '/products/:productId',
    name: 'ProductDetail',
    component: () => import('@/views/ProductDetail.vue'),
    meta: {
      title: 'Product Detail',
      requiresAuth: true
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue')
  }
]

export default routes 
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(),
  routes: [
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
        requiresAuth: false,
        layout: 'blank'
      }
    },
    {
      path: '/admin/login',
      name: 'AdminLogin',
      component: () => import('@/views/AdminLogin.vue'),
      meta: {
        title: 'Admin Login',
        requiresAuth: false,
        layout: 'blank'
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
})

// Create auth store outside of navigation guard
let authStore: ReturnType<typeof useAuthStore>

router.beforeEach(async (to, from, next) => {
  // Initialize auth store if not already initialized
  if (!authStore) {
    authStore = useAuthStore()
    await authStore.initializeFromStorage()
  }

  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth && !authStore.isAuthenticated) {
    next('/login')
  } else if ((to.path === '/login' || to.path === '/admin/login') && authStore.isAuthenticated) {
    next('/dashboard')
  } else {
    next()
  }
})

export default router 
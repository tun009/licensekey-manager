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
      path: '/landing',
      name: 'LandingPage',
      component: () => import('@/views/LandingPage.vue'),
      meta: {
        title: 'Landing Page',
        requiresAuth: false,
        layout: 'blank'
      }
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
      path: '/register',
      name: 'Register',
      component: () => import('@/views/Register.vue'),
      meta: {
        title: 'Register',
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
      path: '/admin/dashboard',
      name: 'AdminDashboard',
      component: () => import('@/views/Dashboard.vue'),
      meta: {
        title: 'Admin Dashboard',
        requiresAuth: true,
        requiresAdmin: true
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

// Navigation guard
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  
  // Initialize auth store if not already done
  if (!authStore.isAuthenticated) {
    await authStore.initializeFromStorage()
  }

  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const requiresAdmin = to.matched.some(record => record.meta.requiresAdmin)

  if (requiresAuth && !authStore.isAuthenticated) {
    // Redirect to login with return path
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } else if (requiresAdmin && !authStore.user?.isAdmin) {
    // Redirect non-admin users
    next('/dashboard')
  } else if (to.path === '/login' && authStore.isAuthenticated) {
    // Redirect logged in users trying to access login page
    next('/dashboard')
  } else if (to.path === '/admin/login' && authStore.isAuthenticated) {
    // Redirect logged in admins trying to access admin login page
    next('/admin/dashboard')
  } else {
    next()
  }
})

export default router 
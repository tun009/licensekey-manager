<template>
  <div class="relative min-h-screen">
    <!-- Sidebar -->
    <aside
      :class="[
        'fixed top-0 left-0 z-40 h-screen transition-all duration-300',
        'border-r',
        isSidebarOpen ? 'w-64' : 'w-20'
      ]"
    >
      <div class="h-16 flex items-center px-4 border-b">
        <h1 class="text-xl font-bold truncate text-gray-700" :class="{ 'opacity-0': !isSidebarOpen }">
          License Manager
        </h1>
      </div>
      <nav class="p-4 space-y-2">
        <router-link
          to="/dashboard"
          class="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 text-gray-700"
          :class="{ 'justify-center': !isSidebarOpen }"
        >
          <LayoutDashboard class="h-5 w-5" />
          <span :class="{ 'hidden': !isSidebarOpen }">Bảng điều khiển</span>
        </router-link>
        <router-link
          to="/products"
          class="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 text-gray-700"
          :class="[
            { 'justify-center': !isSidebarOpen },
            $route.path.startsWith('/products') ? 'bg-gray-200 font-medium' : ''
          ]"
        >
          <Package class="h-5 w-5" />
          <span :class="{ 'hidden': !isSidebarOpen }">Sản phẩm</span>
        </router-link>
        <router-link
          to="/licenses"
          class="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 text-gray-700"
          :class="{ 'justify-center': !isSidebarOpen }"
        >
          <Key class="h-5 w-5" />
          <span :class="{ 'hidden': !isSidebarOpen }">Licenses</span>
        </router-link>
        <router-link
          to="/users"
          class="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 text-gray-700"
          :class="{ 'justify-center': !isSidebarOpen }"
        >
          <Users class="h-5 w-5" />
          <span :class="{ 'hidden': !isSidebarOpen }">Người dùng</span>
        </router-link>
        <router-link
          to="/orders"
          class="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 text-gray-700"
          :class="{ 'justify-center': !isSidebarOpen }"
        >
          <ShoppingCart class="h-5 w-5" />
          <span :class="{ 'hidden': !isSidebarOpen }">Đơn hàng</span>
        </router-link>
        <router-link
          to="/settings"
          class="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 text-gray-700"
          :class="{ 'justify-center': !isSidebarOpen }"
        >
          <Settings class="h-5 w-5" />
          <span :class="{ 'hidden': !isSidebarOpen }">Cài đặt</span>
        </router-link>
      </nav>

      <!-- Toggle button at bottom of sidebar -->
      <div 
        class="absolute bottom-5 left-0 w-full flex justify-center"
      >
        <Button 
          variant="ghost" 
          size="icon" 
          @click="toggleSidebar"
          class="rounded-full border border-gray-200 bg-white shadow-sm hover:bg-gray-100"
        >
          <ChevronLeft 
            class="h-5 w-5 text-gray-700 transition-transform" 
            :class="{ 'rotate-180': !isSidebarOpen }" 
          />
        </Button>
      </div>
    </aside>

    <!-- Header -->
    <div 
      class="fixed top-0 right-0 z-30 transition-all duration-300"
      :class="[isSidebarOpen ? 'left-64' : 'left-20']"
    >
      <Header />
    </div>

    <!-- Main Content -->
    <main
      class="transition-all duration-300 min-h-screen pt-16"
      :class="[isSidebarOpen ? 'ml-64' : 'ml-20']"
    >
      <div class="container py-6 mx-auto max-w-9xl">
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  LayoutDashboard,
  Package,
  Users,
  Key,
  ShoppingCart,
  Settings,
  ChevronLeft
} from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import Header from '@/components/layout/Header.vue'

// Sidebar state
const isSidebarOpen = ref(true)

// Dark mode state
const isDarkMode = ref(false)

// Current language
const currentLanguage = ref('vi')

// Route information
const route = useRoute()
const router = useRouter()

// Generate breadcrumbs based on current route
const breadcrumbs = computed(() => {
  const paths = route.path.split('/').filter(Boolean)
  const result = []
  
  // Add home
  result.push({
    title: 'home',
    path: '/'
  })
  
  // Add intermediate paths
  let currentPath = ''
  for (let i = 0; i < paths.length; i++) {
    currentPath += `/${paths[i]}`
    
    // Get route matched by path
    const matchedRoute = router.getRoutes().find(r => r.path === currentPath)
    
    if (matchedRoute) {
      result.push({
        title: matchedRoute.meta.title || paths[i],
        path: currentPath
      })
    } else {
      // If no matched route, use path segment as title
      result.push({
        title: paths[i],
        path: currentPath
      })
    }
  }
  
  return result
})

// Toggle sidebar
const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

// Toggle dark mode
const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
  document.documentElement.classList.toggle('dark', isDarkMode.value)
}

// Change language
const changeLanguage = (lang: string) => {
  currentLanguage.value = lang
  // In a real app, you would use i18n library to change language
  console.log(`Language changed to ${lang}`)
}

// Mock translation function
const $t = (key: string) => {
  const translations = {
    en: {
      home: 'Home',
      dashboard: 'Dashboard',
      products: 'Products',
      licenses: 'Licenses',
      users: 'Users',
      orders: 'Orders',
      settings: 'Settings',
      myAccount: 'My Account',
      profile: 'Profile',
      logout: 'Log out'
    },
    vi: {
      home: 'Trang chủ',
      dashboard: 'Bảng điều khiển',
      products: 'Sản phẩm',
      licenses: 'Licenses',
      users: 'Người dùng',
      orders: 'Đơn hàng',
      settings: 'Cài đặt',
      myAccount: 'Tài khoản của tôi',
      profile: 'Hồ sơ',
      logout: 'Đăng xuất'
    }
  }
  
  return translations[currentLanguage.value][key] || key
}

// Apply dark mode on mount if needed
watch(isDarkMode, (newValue) => {
  document.documentElement.classList.toggle('dark', newValue)
}, { immediate: true })
</script>

<style scoped>
.router-link-active {
  @apply bg-gray-200 dark:bg-gray-700 font-medium;
}
</style> 
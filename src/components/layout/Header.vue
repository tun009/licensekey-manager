<template>
  <header class="h-16 bg-white border-b border-gray-200 px-4 flex items-center justify-between dark:bg-gray-900 dark:border-gray-800 dark:text-white">
    <!-- Breadcrumb -->
    <nav class="flex" aria-label="Breadcrumb">
      <ol class="flex items-center space-x-2">
        <template v-if="breadcrumbs.length > 0">
          <li v-for="(crumb, index) in breadcrumbs" :key="index">
            <div class="flex items-center">
              <template v-if="index > 0">
                <ChevronRight class="h-4 w-4 text-gray-400 mx-2" />
              </template>
              <router-link 
                v-if="crumb.path && index < breadcrumbs.length - 1" 
                :to="crumb.path" 
                class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              >
                {{ $t(crumb.title) }}
              </router-link>
              <span 
                v-else 
                class="text-gray-700 dark:text-gray-300 font-medium"
              >
                {{ $t(crumb.title) }}
              </span>
            </div>
          </li>
        </template>
      </ol>
    </nav>

    <!-- Right side controls -->
    <div class="flex items-center gap-4">
      <LanguageSwitcher />
      <ThemeToggle />
      
      <div class="relative">
        <button @click="toggleNotifications" class="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
          <Bell :size="20" />
          <span class="absolute top-1 right-1 flex h-2 w-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span>
        </button>
        
        <div v-if="showNotifications" class="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-900 rounded-md shadow-lg overflow-hidden z-10">
          <div class="p-2 border-b dark:border-gray-700">
            <h3 class="font-medium">Notifications</h3>
          </div>
          <div>
            <div v-for="notification in notifications" :key="notification.id" class="p-3 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
              <div class="flex flex-col gap-1">
                <span>{{ notification.message }}</span>
                <span class="text-xs text-gray-500 dark:text-gray-400">{{ notification.time }}</span>
              </div>
            </div>
            <div class="p-2 text-center border-t dark:border-gray-700">
              <button class="text-primary text-sm">View All Notifications</button>
            </div>
          </div>
        </div>
      </div>
      
      <div class="relative">
        <button @click="toggleUserMenu" class="rounded-full overflow-hidden">
          <img src="https://github.com/shadcn.png" alt="User" class="h-8 w-8 rounded-full" />
        </button>
        
        <div v-if="showUserMenu" class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 rounded-md shadow-lg overflow-hidden z-10">
          <div class="p-2 border-b dark:border-gray-700">
            <h3 class="font-medium">My Account</h3>
          </div>
          <div>
            <button class="w-full text-left p-2 hover:bg-gray-50 dark:hover:bg-gray-800">Profile</button>
            <button class="w-full text-left p-2 hover:bg-gray-50 dark:hover:bg-gray-800">Settings</button>
            <div class="border-t dark:border-gray-700"></div>
            <button class="w-full text-left p-2 hover:bg-gray-50 dark:hover:bg-gray-800">Log Out</button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Bell, ChevronRight } from 'lucide-vue-next'
import ThemeToggle from '@/components/theme/ThemeToggle.vue'
import LanguageSwitcher from '@/components/language/LanguageSwitcher.vue'

const showNotifications = ref(false)
const showUserMenu = ref(false)

const toggleNotifications = () => {
  showNotifications.value = !showNotifications.value
  if (showNotifications.value) {
    showUserMenu.value = false
  }
}

const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value
  if (showUserMenu.value) {
    showNotifications.value = false
  }
}

const notifications = ref([
  { id: 1, message: "New license key generated", time: "1 hour ago" },
  { id: 2, message: "User John Doe registered", time: "3 hours ago" },
  { id: 3, message: "New order #12345 received", time: "5 hours ago" },
])

// Route information for breadcrumbs
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
      settings: 'Settings'
    },
    vi: {
      home: 'Trang chủ',
      dashboard: 'Bảng điều khiển',
      products: 'Sản phẩm',
      licenses: 'Giấy phép',
      users: 'Người dùng',
      orders: 'Đơn hàng',
      settings: 'Cài đặt'
    }
  }
  
  // Get current language from localStorage or default to 'vi'
  const lang = localStorage.getItem('language') || 'vi'
  
  return translations[lang][key] || key
}
</script> 
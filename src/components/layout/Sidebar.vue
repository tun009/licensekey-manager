<template>
  <aside class="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 h-screen sticky top-0 overflow-y-auto">
    <div class="p-4">
      <div class="flex items-center gap-2 mb-6 p-2">
        <FileEdit class="h-6 w-6 text-gray-800 dark:text-gray-200" />
        <h2 class="text-xl font-bold text-gray-800 dark:text-gray-200">License Manager</h2>
      </div>
      
      <nav class="space-y-1">
        <router-link 
          v-for="item in navItems" 
          :key="item.path" 
          :to="item.path"
          class="flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors"
          :class="{ 
            'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 font-medium': isActive(item.path),
            'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-800 dark:hover:text-gray-200': !isActive(item.path)
          }"
        >
          <component :is="item.icon" class="h-5 w-5" />
          <span>{{ item.label }}</span>
        </router-link>
      </nav>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { 
  FileEdit,
  Home as LayoutDashboard, 
  Package, 
  Key, 
  ShoppingCart, 
  Users, 
  Settings 
} from 'lucide-vue-next'

// Khởi tạo route với giá trị mặc định
const currentPath = ref('/')
const route = ref({ path: '/' })

// Cập nhật route khi component được mount
onMounted(() => {
  try {
    const routeInstance = useRoute()
    if (routeInstance && routeInstance.path) {
      route.value = routeInstance
      currentPath.value = routeInstance.path
    }
  } catch (error) {
    console.error('Error accessing route:', error)
  }
})

const navItems = [
  { 
    label: 'Dashboard', 
    path: '/', 
    icon: LayoutDashboard 
  },
  { 
    label: 'Licenses', 
    path: '/licenses', 
    icon: Key 
  },
  { 
    label: 'Products', 
    path: '/products', 
    icon: Package 
  },
  { 
    label: 'Users', 
    path: '/users', 
    icon: Users 
  },
  { 
    label: 'Orders', 
    path: '/orders', 
    icon: ShoppingCart 
  },
  { 
    label: 'Settings', 
    path: '/settings', 
    icon: Settings 
  }
]

const isActive = (path: string) => {
  // Kiểm tra route có tồn tại không
  if (!route.value || !route.value.path) {
    return path === '/'
  }
  
  if (path === '/') {
    return route.value.path === '/'
  }
  return route.value.path.startsWith(path)
}
</script> 
<template>
  <header class="h-16 bg-white border-b border-gray-200 px-4 flex items-center justify-end gap-4 dark:bg-gray-900 dark:border-gray-800 dark:text-white">
    <LanguageSwitcher />
    <ThemeToggle />
    
    <div class="relative">
      <button @click="toggleNotifications" class="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
        <Bell size="20" />
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
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Bell } from 'lucide-vue-next'
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
</script> 
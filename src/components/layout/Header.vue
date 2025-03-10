<template>
  <header class="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b bg-white px-4 dark:bg-gray-800">
    <div class="flex items-center space-x-4">
      <Button variant="ghost" size="icon" @click="$emit('toggle-sidebar')">
        <Menu class="h-5 w-5" />
      </Button>
    </div>

    <div class="flex items-center space-x-4">
      <!-- Theme Toggle -->
      <Button variant="ghost" size="icon" @click="toggleTheme">
        <Sun v-if="isDark" class="h-5 w-5" />
        <Moon v-else class="h-5 w-5" />
      </Button>

      <!-- Language Toggle -->
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button variant="ghost" size="icon">
            <Globe class="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" class="w-48">
          <DropdownMenuLabel>Ngôn ngữ</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem @click="changeLanguage('vi')">
            <span class="mr-2">🇻🇳</span> Tiếng Việt
          </DropdownMenuItem>
          <DropdownMenuItem @click="changeLanguage('en')">
            <span class="mr-2">🇺🇸</span> English
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <!-- Notifications -->
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button variant="ghost" size="icon">
            <Bell class="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" class="w-80">
          <DropdownMenuLabel>Thông báo</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <div class="max-h-80 overflow-y-auto">
            <DropdownMenuItem>
              Không có thông báo mới
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      <!-- User Menu -->
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button variant="ghost" class="relative h-8 w-8 rounded-full">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" class="w-56">
          <div class="flex items-center justify-start gap-2 p-2">
            <div class="flex flex-col space-y-1">
              <p class="text-sm font-medium leading-none">Admin</p>
              <p class="text-xs leading-none text-muted-foreground">
                admin@example.com
              </p>
            </div>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem as="router-link" to="/profile">
            <User class="mr-2 h-4 w-4" />
            <span>Hồ sơ</span>
          </DropdownMenuItem>
          <DropdownMenuItem as="router-link" to="/settings">
            <Settings class="mr-2 h-4 w-4" />
            <span>Cài đặt</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem @click="handleLogout">
            <LogOut class="mr-2 h-4 w-4" />
            <span>Đăng xuất</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import {
  Bell,
  Globe,
  Settings,
  LogOut,
  Sun,
  Moon,
  Menu,
  User
} from 'lucide-vue-next'

const router = useRouter()
const authStore = useAuthStore()
const isDark = ref(false)

const toggleTheme = () => {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark')
}

const changeLanguage = (lang: string) => {
  console.log('Change language to:', lang)
  // Implement language change logic here
}

const handleLogout = async () => {
  await authStore.logout()
  router.push('/login')
}

defineEmits(['toggle-sidebar'])
</script> 
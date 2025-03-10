<template>
  <div class="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 py-12 sm:px-6 lg:px-8">
    <div class="w-full max-w-md space-y-8">
      <div class="text-center">
        <h2 class="mt-6 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          Đăng nhập Admin
        </h2>
        <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Đăng nhập với tư cách quản trị viên
        </p>
      </div>

      <Card class="p-6">
        <form @submit.prevent="handleAdminLogin" class="space-y-6">
          <div class="space-y-4">
            <div class="space-y-2">
              <Label for="email">Email</Label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Mail class="h-5 w-5 text-gray-400" />
                </div>
                <Input 
                  id="email" 
                  v-model="loginForm.email" 
                  type="email" 
                  class="pl-10"
                  placeholder="admin@example.com" 
                  required 
                  autocomplete="email"
                />
              </div>
            </div>
            <div class="space-y-2">
              <Label for="password">Mật khẩu</Label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Lock class="h-5 w-5 text-gray-400" />
                </div>
                <Input 
                  id="password" 
                  v-model="loginForm.password" 
                  type="password" 
                  class="pl-10"
                  placeholder="••••••••" 
                  required 
                  autocomplete="current-password"
                />
              </div>
            </div>
            <div class="flex items-center space-x-2">
              <Checkbox 
                id="remember" 
                v-model="loginForm.remember"
                class="rounded border-gray-300"
              />
              <Label 
                for="remember" 
                class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Ghi nhớ đăng nhập
              </Label>
            </div>
          </div>
          <Button type="submit" class="w-full">Đăng nhập</Button>
        </form>

        <div class="mt-6">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <span class="w-full border-t border-gray-300 dark:border-gray-700"></span>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="bg-white dark:bg-gray-800 px-2 text-gray-500 dark:text-gray-400">Hoặc</span>
            </div>
          </div>

          <div class="mt-6">
            <Button variant="outline" class="w-full" @click="goToUserLogin">
              Đăng nhập với tư cách người dùng
            </Button>
          </div>
        </div>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Mail, Lock } from 'lucide-vue-next'

const router = useRouter()
const authStore = useAuthStore()

// Login form
const loginForm = ref({
  email: '',
  password: '',
  remember: false
})

// Handle admin login
const handleAdminLogin = async () => {
  try {
    const success = await authStore.login(loginForm.value.email, loginForm.value.password, true)
    if (success) {
      router.push('/admin/dashboard')
    }
  } catch (error) {
    console.error('Admin login failed:', error)
  }
}

// Go to user login
const goToUserLogin = () => {
  router.push('/login')
}
</script> 
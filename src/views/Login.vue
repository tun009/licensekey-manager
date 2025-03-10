<template>
  <div class="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 py-12 sm:px-6 lg:px-8">
    <div class="w-full max-w-md space-y-8">
      <div class="text-center">
        <h2 class="mt-6 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          {{ isLoginMode ? 'Đăng nhập vào tài khoản' : 'Đăng ký tài khoản mới' }}
        </h2>
        <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
          {{ isLoginMode ? 'Hoặc ' : 'Đã có tài khoản? ' }}
          <Button variant="link" class="font-medium text-primary" @click="toggleMode">
            {{ isLoginMode ? 'đăng ký tài khoản mới' : 'đăng nhập ngay' }}
          </Button>
        </p>
      </div>

      <!-- Login Form -->
      <Card v-if="isLoginMode" class="p-6">
        <form @submit.prevent="handleLogin" class="space-y-6">
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
                  placeholder="your@email.com" 
                  required 
                  autocomplete="email"
                />
              </div>
            </div>
            <div class="space-y-2">
              <div class="flex items-center justify-between">
                <Label for="password">Mật khẩu</Label>
                <Button 
                  variant="link" 
                  class="text-xs text-primary" 
                  @click="showForgotPassword = true"
                >
                  Quên mật khẩu?
                </Button>
              </div>
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
            <Button variant="outline" class="w-full" @click="handleAdminLogin">
              Đăng nhập với tư cách Admin
            </Button>
          </div>
        </div>
      </Card>

      <!-- Register Form -->
      <Card v-else class="p-6">
        <form @submit.prevent="handleRegister" class="space-y-6">
          <div class="space-y-4">
            <div class="space-y-2">
              <Label for="register-name">Họ tên</Label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <User class="h-5 w-5 text-gray-400" />
                </div>
                <Input 
                  id="register-name" 
                  v-model="registerForm.name" 
                  type="text" 
                  class="pl-10"
                  placeholder="Nguyễn Văn A" 
                  required 
                  autocomplete="name"
                />
              </div>
            </div>
            <div class="space-y-2">
              <Label for="register-email">Email</Label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Mail class="h-5 w-5 text-gray-400" />
                </div>
                <Input 
                  id="register-email" 
                  v-model="registerForm.email" 
                  type="email" 
                  class="pl-10"
                  placeholder="your@email.com" 
                  required 
                  autocomplete="email"
                />
              </div>
            </div>
            <div class="space-y-2">
              <Label for="register-password">Mật khẩu</Label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Lock class="h-5 w-5 text-gray-400" />
                </div>
                <Input 
                  id="register-password" 
                  v-model="registerForm.password" 
                  type="password" 
                  class="pl-10"
                  placeholder="••••••••" 
                  required 
                  autocomplete="new-password"
                />
              </div>
            </div>
            <div class="space-y-2">
              <Label for="register-confirm-password">Xác nhận mật khẩu</Label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Lock class="h-5 w-5 text-gray-400" />
                </div>
                <Input 
                  id="register-confirm-password" 
                  v-model="registerForm.confirmPassword" 
                  type="password" 
                  class="pl-10"
                  placeholder="••••••••" 
                  required 
                  autocomplete="new-password"
                />
              </div>
              <p v-if="passwordError" class="text-sm text-red-500">{{ passwordError }}</p>
            </div>
          </div>
          <Button type="submit" class="w-full">Đăng ký</Button>
        </form>
      </Card>
    </div>

    <!-- Forgot Password Dialog -->
    <Dialog :open="showForgotPassword" @update:open="showForgotPassword = $event">
      <DialogContent class="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Quên mật khẩu</DialogTitle>
          <DialogDescription>
            Nhập email của bạn để nhận liên kết đặt lại mật khẩu.
          </DialogDescription>
        </DialogHeader>
        <form @submit.prevent="handleForgotPassword" class="space-y-4">
          <div class="space-y-2">
            <Label for="reset-email">Email</Label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Mail class="h-5 w-5 text-gray-400" />
              </div>
              <Input 
                id="reset-email" 
                v-model="forgotPasswordEmail" 
                type="email" 
                class="pl-10"
                placeholder="your@email.com" 
                required 
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" @click="showForgotPassword = false">
              Hủy
            </Button>
            <Button type="submit">Gửi liên kết</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Mail, Lock, User } from 'lucide-vue-next'

const router = useRouter()
const authStore = useAuthStore()
const isLoginMode = ref(true)
const showForgotPassword = ref(false)
const forgotPasswordEmail = ref('')

// Login form
const loginForm = ref({
  email: '',
  password: '',
  remember: false
})

// Register form
const registerForm = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
})

// Password validation error
const passwordError = computed(() => {
  if (registerForm.value.password && registerForm.value.confirmPassword &&
      registerForm.value.password !== registerForm.value.confirmPassword) {
    return 'Mật khẩu xác nhận không khớp'
  }
  return ''
})

// Toggle between login and register modes
const toggleMode = () => {
  isLoginMode.value = !isLoginMode.value
}

// Handle login
const handleLogin = async () => {
  try {
    const success = await authStore.login(loginForm.value.email, loginForm.value.password)
    if (success) {
      router.push('/dashboard')
    }
  } catch (error) {
    console.error('Login failed:', error)
  }
}

// Handle admin login
const handleAdminLogin = async () => {
  router.push('/admin/login')
}

// Handle register
const handleRegister = async () => {
  try {
    if (registerForm.value.password !== registerForm.value.confirmPassword) {
      return
    }
    
    // In a real app, this would be an API call
    console.log('Registering with:', registerForm.value)
    
    // Switch to login mode after successful registration
    isLoginMode.value = true
  } catch (error) {
    console.error('Registration failed:', error)
  }
}

// Handle forgot password
const handleForgotPassword = async () => {
  try {
    // In a real app, this would be an API call
    console.log('Sending password reset link to:', forgotPasswordEmail.value)
    showForgotPassword.value = false
    forgotPasswordEmail.value = ''
  } catch (error) {
    console.error('Password reset failed:', error)
  }
}
</script> 
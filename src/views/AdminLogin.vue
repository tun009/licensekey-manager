<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-secondary/20 p-4">
    <Card class="w-full max-w-md shadow-lg">
      <CardHeader class="space-y-1 text-center">
        <CardTitle class="text-2xl font-bold">{{ t('adminLogin') }}</CardTitle>
        <CardDescription>
          {{ t('enterAdminCredentials') }}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form @submit.prevent="handleLogin" class="space-y-4">
          <div class="space-y-2">
            <Label for="email">{{ t('email') }}</Label>
            <div class="relative">
              <Mail class="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                id="email" 
                type="email" 
                placeholder="admin@example.com" 
                class="pl-10"
                v-model="email"
                required
              />
            </div>
          </div>
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <Label for="password">{{ t('password') }}</Label>
            </div>
            <div class="relative">
              <Lock class="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                id="password" 
                :type="showPassword ? 'text' : 'password'" 
                class="pl-10"
                v-model="password"
                required
              />
              <Button 
                type="button" 
                variant="ghost" 
                size="icon"
                class="absolute right-1 top-1 text-muted-foreground"
                @click="showPassword = !showPassword"
              >
                <component :is="showPassword ? EyeOff : Eye" class="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-2">
              <Checkbox 
                id="remember-me" 
                v-model="rememberMe"
              />
              <Label for="remember-me" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer">
                {{ t('rememberMe') }}
              </Label>
            </div>
            <Dialog v-model:open="isForgotDialogOpen">
              <DialogTrigger as-child>
                <Button variant="link" class="px-0">{{ t('forgotPassword') }}</Button>
              </DialogTrigger>
              <DialogContent>
                <form @submit.prevent="handleForgotPassword">
                  <DialogHeader>
                    <DialogTitle>{{ t('resetAdminPassword') }}</DialogTitle>
                    <DialogDescription>
                      {{ t('enterEmailForReset') }}
                    </DialogDescription>
                  </DialogHeader>
                  <div class="space-y-4 py-4">
                    <div class="space-y-2">
                      <Label for="forgot-email">{{ t('email') }}</Label>
                      <div class="relative">
                        <Mail class="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input 
                          id="forgot-email" 
                          type="email" 
                          placeholder="admin@example.com" 
                          class="pl-10"
                          v-model="forgotEmail"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" :disabled="isLoading">
                      {{ isLoading ? t('sending') : t('sendResetLink') }}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
          <Button type="submit" class="w-full" :disabled="isLoading">
            {{ isLoading ? t('loggingIn') : t('login') }}
            <ArrowRight class="ml-2 h-4 w-4" />
          </Button>
        </form>
      </CardContent>
      <CardFooter class="flex flex-col space-y-2">
        <div class="text-center w-full">
          <span class="text-sm text-muted-foreground">
            {{ t('notAdmin') }}{" "}
            <router-link to="/login" class="underline text-primary">
              {{ t('userLogin') }}
            </router-link>
          </span>
        </div>
      </CardFooter>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Eye, EyeOff, Lock, Mail, ArrowRight } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

const router = useRouter()

// Form state
const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const showPassword = ref(false)
const forgotEmail = ref('')
const isForgotDialogOpen = ref(false)
const isLoading = ref(false)

// Mock auth functions
const login = async (email: string, password: string) => {
  isLoading.value = true
  await new Promise(resolve => setTimeout(resolve, 1000))
  isLoading.value = false
  return true
}

const forgotPassword = async (email: string) => {
  isLoading.value = true
  await new Promise(resolve => setTimeout(resolve, 1000))
  isLoading.value = false
  return true
}

const handleLogin = async (e: Event) => {
  e.preventDefault()
  if (await login(email.value, password.value)) {
    router.push('/admin')
  }
}

const handleForgotPassword = async (e: Event) => {
  e.preventDefault()
  if (await forgotPassword(forgotEmail.value)) {
    isForgotDialogOpen.value = false
  }
}

// Mock translation function
const t = (key: string) => {
  const translations: Record<string, string> = {
    adminLogin: 'Admin Login',
    enterAdminCredentials: 'Enter your admin credentials to access the dashboard',
    email: 'Email',
    password: 'Password',
    rememberMe: 'Remember me',
    forgotPassword: 'Forgot password?',
    resetAdminPassword: 'Reset Admin Password',
    enterEmailForReset: 'Enter your admin email address and we will send you a link to reset your password.',
    sending: 'Sending...',
    sendResetLink: 'Send Reset Link',
    loggingIn: 'Logging in...',
    login: 'Login',
    notAdmin: 'Not an admin?',
    userLogin: 'User Login'
  }
  return translations[key] || key
}
</script> 
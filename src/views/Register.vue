<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-secondary/20 p-4">
    <Card class="w-full max-w-md shadow-lg">
      <CardHeader class="space-y-1 text-center">
        <CardTitle class="text-2xl font-bold">{{ t('register') }}</CardTitle>
        <CardDescription>
          {{ t('createAccount') }}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form @submit.prevent="handleRegister" class="space-y-4">
          <div class="space-y-2">
            <Label for="name">{{ t('name') }}</Label>
            <div class="relative">
              <User class="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                id="name" 
                type="text" 
                placeholder="John Doe" 
                class="pl-10"
                v-model="name"
                required
              />
            </div>
          </div>
          <div class="space-y-2">
            <Label for="email">{{ t('email') }}</Label>
            <div class="relative">
              <Mail class="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                id="email" 
                type="email" 
                placeholder="name@example.com" 
                class="pl-10"
                v-model="email"
                required
              />
            </div>
          </div>
          <div class="space-y-2">
            <Label for="password">{{ t('password') }}</Label>
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
          <div class="space-y-2">
            <Label for="confirm-password">{{ t('confirmPassword') }}</Label>
            <div class="relative">
              <Lock class="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                id="confirm-password" 
                :type="showConfirmPassword ? 'text' : 'password'" 
                class="pl-10"
                v-model="confirmPassword"
                required
              />
              <Button 
                type="button" 
                variant="ghost" 
                size="icon"
                class="absolute right-1 top-1 text-muted-foreground"
                @click="showConfirmPassword = !showConfirmPassword"
              >
                <component :is="showConfirmPassword ? EyeOff : Eye" class="h-4 w-4" />
              </Button>
            </div>
            <p v-if="passwordError" class="text-sm text-destructive">{{ passwordError }}</p>
          </div>
          <Button type="submit" class="w-full" :disabled="isLoading || !!passwordError">
            {{ isLoading ? t('registering') : t('register') }}
            <ArrowRight class="ml-2 h-4 w-4" />
          </Button>
        </form>
      </CardContent>
      <CardFooter class="flex flex-col space-y-2">
        <div class="text-center w-full">
          <span class="text-sm text-muted-foreground">
            {{ t('alreadyHaveAccount') }}{" "}
            <router-link to="/login" class="underline text-primary">
              {{ t('login') }}
            </router-link>
          </span>
        </div>
      </CardFooter>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Eye, EyeOff, Lock, Mail, User, ArrowRight } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card'

const router = useRouter()

// Form state
const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const isLoading = ref(false)

// Password validation
const passwordError = computed(() => {
  if (password.value && confirmPassword.value && password.value !== confirmPassword.value) {
    return t('passwordsDontMatch')
  }
  return ''
})

// Mock register function
const register = async (name: string, email: string, password: string) => {
  isLoading.value = true
  await new Promise(resolve => setTimeout(resolve, 1000))
  isLoading.value = false
  return true
}

const handleRegister = async (e: Event) => {
  e.preventDefault()
  if (passwordError.value) return
  
  if (await register(name.value, email.value, password.value)) {
    router.push('/login')
  }
}

// Mock translation function
const t = (key: string) => {
  const translations: Record<string, string> = {
    register: 'Register',
    createAccount: 'Create an account to get started',
    name: 'Name',
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    passwordsDontMatch: 'Passwords do not match',
    registering: 'Registering...',
    alreadyHaveAccount: 'Already have an account?',
    login: 'Login'
  }
  return translations[key] || key
}
</script> 
import { defineStore } from 'pinia'
import { ref } from 'vue'

interface User {
  id: number
  email: string
  name: string
  isAdmin: boolean
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const isAuthenticated = ref(false)
  const token = ref<string | null>(null)

  // Initialize auth state from storage
  const initializeFromStorage = async () => {
    const storedToken = localStorage.getItem('token')
    const storedUser = localStorage.getItem('user')
    
    if (storedToken && storedUser) {
      token.value = storedToken
      user.value = JSON.parse(storedUser)
      isAuthenticated.value = true
    }
  }

  // Login function
  const login = async (email: string, password: string, isAdmin = false) => {
    try {
      // Mock API call - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock successful login
      const mockUser = {
        id: 1,
        email,
        name: 'John Doe',
        isAdmin
      }
      const mockToken = 'mock_jwt_token'

      // Update state
      user.value = mockUser
      token.value = mockToken
      isAuthenticated.value = true

      // Save to localStorage
      localStorage.setItem('token', mockToken)
      localStorage.setItem('user', JSON.stringify(mockUser))

      return true
    } catch (error) {
      console.error('Login failed:', error)
      return false
    }
  }

  // Logout function
  const logout = () => {
    user.value = null
    token.value = null
    isAuthenticated.value = false
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  // Forgot password function
  const forgotPassword = async (email: string) => {
    try {
      // Mock API call - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      return true
    } catch (error) {
      console.error('Password reset failed:', error)
      return false
    }
  }

  return {
    user,
    isAuthenticated,
    token,
    login,
    logout,
    forgotPassword,
    initializeFromStorage
  }
}) 
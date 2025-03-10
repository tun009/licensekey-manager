import { defineStore } from 'pinia'

interface User {
  id: string
  name: string
  email: string
  role: 'user' | 'admin'
}

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    token: null,
    isAuthenticated: false
  }),

  getters: {
    isAdmin: (state) => state.user?.role === 'admin',
  },

  actions: {
    setUser(user: User | null) {
      this.user = user
      this.isAuthenticated = !!user
    },

    setToken(token: string | null) {
      this.token = token
    },

    async login(email: string, password: string, isAdmin: boolean = false) {
      try {
        // Simulate API call
        // In real app, make API request here
        const user = {
          id: '1',
          name: 'John Doe',
          email,
          role: isAdmin ? 'admin' : 'user'
        }
        const token = 'fake-jwt-token'

        this.setUser(user)
        this.setToken(token)

        // Store in localStorage
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('token', token)

        return true
      } catch (error) {
        console.error('Login failed:', error)
        return false
      }
    },

    async logout() {
      // Clear store
      this.setUser(null)
      this.setToken(null)

      // Clear localStorage
      localStorage.removeItem('user')
      localStorage.removeItem('token')
    },

    initializeFromStorage() {
      const user = localStorage.getItem('user')
      const token = localStorage.getItem('token')

      if (user && token) {
        this.setUser(JSON.parse(user))
        this.setToken(token)
      }
    }
  }
}) 
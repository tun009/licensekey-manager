<template>
  <div class="relative">
    <button 
      @click="toggleLanguageMenu" 
      class="flex items-center gap-1 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
    >
      <Globe class="h-5 w-5" />
      <span class="text-sm">{{ currentLanguage.toUpperCase() }}</span>
    </button>
    
    <div v-if="showLanguageMenu" class="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-900 rounded-md shadow-lg overflow-hidden z-10">
      <div class="p-1">
        <button 
          v-for="lang in languages" 
          :key="lang.code"
          @click="changeLanguage(lang.code)"
          class="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-2"
          :class="{ 'bg-primary/10 text-primary': currentLanguage === lang.code }"
        >
          <span>{{ lang.name }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Globe } from 'lucide-vue-next'

const showLanguageMenu = ref(false)
const currentLanguage = ref('en')

const languages = [
  { code: 'en', name: 'English' },
  { code: 'vi', name: 'Tiếng Việt' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' }
]

const toggleLanguageMenu = () => {
  showLanguageMenu.value = !showLanguageMenu.value
}

const changeLanguage = (langCode: string) => {
  currentLanguage.value = langCode
  showLanguageMenu.value = false
  // In a real app, you would use i18n library to change the language
  localStorage.setItem('language', langCode)
}

// Initialize language from localStorage
const initLanguage = () => {
  const savedLanguage = localStorage.getItem('language')
  if (savedLanguage) {
    currentLanguage.value = savedLanguage
  }
}

initLanguage()
</script> 
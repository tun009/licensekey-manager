<template>
  <div v-if="product" class="space-y-6">
    <div class="flex items-center gap-2">
      <router-link to="/products" class="text-primary hover:underline flex items-center gap-1">
        <ArrowLeft class="h-4 w-4" />
        Back to Products
      </router-link>
    </div>
    
    <div class="bg-white dark:bg-gray-900 rounded-lg shadow p-6">
      <div class="flex flex-col md:flex-row gap-8">
        <div class="w-full md:w-1/3">
          <div class="aspect-square bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center">
            <Package class="h-24 w-24 text-gray-400" />
          </div>
        </div>
        
        <div class="w-full md:w-2/3 space-y-4">
          <h1 class="text-3xl font-bold">{{ product.name }}</h1>
          <p class="text-lg text-muted-foreground">{{ product.description }}</p>
          
          <div class="flex items-center gap-2">
            <span class="text-2xl font-bold">${{ product.price }}</span>
            <span class="text-sm text-muted-foreground">per license</span>
          </div>
          
          <div class="pt-4">
            <button class="bg-primary text-primary-foreground px-6 py-2 rounded-md">Purchase License</button>
          </div>
          
          <div class="border-t pt-4 mt-6">
            <h3 class="text-lg font-medium mb-2">Features</h3>
            <ul class="space-y-2">
              <li v-for="(feature, index) in features" :key="index" class="flex items-start gap-2">
                <Check class="h-5 w-5 text-green-500 mt-0.5" />
                <span>{{ feature }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="flex items-center justify-center h-64">
    <p>Product not found</p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { Package, ArrowLeft, Check } from 'lucide-vue-next'

const route = useRoute()
const productId = computed(() => Number(route.params.productId))

// Mock data - in a real app, this would come from an API
const products = ref([
  {
    id: 1,
    name: 'Basic License',
    description: 'Single user license for personal use with basic features and support.',
    price: '49.99'
  },
  {
    id: 2,
    name: 'Pro License',
    description: 'Multiple user license for small teams with advanced features and priority support.',
    price: '99.99'
  },
  {
    id: 3,
    name: 'Enterprise License',
    description: 'Unlimited users for large organizations with all features and dedicated support.',
    price: '199.99'
  }
])

const product = computed(() => products.value.find(p => p.id === productId.value))

const features = ref([
  'Access to all basic features',
  '1 year of updates',
  'Standard support',
  'Up to 3 devices',
  'Export functionality',
  'API access'
])
</script> 
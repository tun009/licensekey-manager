<template>
  <div class="space-y-6">
    <h2 class="text-2xl font-bold">Dashboard Overview</h2>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div v-for="(stat, index) in stats" :key="index" class="bg-white dark:bg-gray-900 rounded-lg shadow p-4">
        <div class="flex flex-row items-center justify-between pb-2">
          <h3 class="text-sm font-medium">{{ stat.title }}</h3>
          <component :is="stat.icon" class="h-5 w-5 text-primary" />
        </div>
        <div>
          <div class="text-2xl font-bold">{{ stat.value }}</div>
          <div class="flex items-center justify-between">
            <p class="text-xs text-muted-foreground">{{ stat.description }}</p>
            <div :class="`flex items-center text-xs ${stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`">
              <component :is="stat.changeType === 'positive' ? 'ArrowUpRight' : 'ArrowDownRight'" class="h-3 w-3 mr-1" />
              <span>{{ stat.change }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Placeholder for charts -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="bg-white dark:bg-gray-900 rounded-lg shadow p-4">
        <h3 class="text-lg font-medium">License Growth</h3>
        <p class="text-sm text-muted-foreground">Monthly license creation trends</p>
        <div class="h-80 flex items-center justify-center">
          <p>Chart will be implemented here</p>
        </div>
      </div>
      
      <div class="bg-white dark:bg-gray-900 rounded-lg shadow p-4">
        <h3 class="text-lg font-medium">Revenue Overview</h3>
        <p class="text-sm text-muted-foreground">Monthly revenue trends</p>
        <div class="h-80 flex items-center justify-center">
          <p>Chart will be implemented here</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Key, Users, Package, ShoppingCart, ArrowUpRight, ArrowDownRight } from 'lucide-vue-next'

const stats = ref([
  { 
    title: "Total Licenses", 
    value: "246", 
    description: "Active licenses", 
    change: "+12%",
    changeType: "positive",
    icon: Key
  },
  { 
    title: "Active Users", 
    value: "187", 
    description: "Registered accounts", 
    change: "+5%",
    changeType: "positive",
    icon: Users
  },
  { 
    title: "Products", 
    value: "8", 
    description: "Available products", 
    change: "+1",
    changeType: "positive",
    icon: Package
  },
  { 
    title: "Recent Orders", 
    value: "32", 
    description: "Last 30 days", 
    change: "-3%",
    changeType: "negative",
    icon: ShoppingCart
  },
])
</script> 
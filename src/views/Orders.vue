<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h2 class="text-2xl font-bold">Orders</h2>
    </div>
    
    <div class="flex gap-2">
      <div class="relative flex-1">
        <Search class="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search orders..."
          v-model="searchQuery"
          class="pl-8 bg-white dark:bg-gray-800"
        />
      </div>
    </div>
    <DataTable 
      :columns="columns" 
      :data="filteredOrders" 
      emptyMessage="No orders found."
    />
    
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { 
  Search,
} from 'lucide-vue-next'
import { Input } from '@/components/ui/input'
import DataTable from '@/components/ui/data-table/data-table.vue'
import { columns, type Order } from '@/components/orders/columns'

const searchQuery = ref('')
const showAddOrderModal = ref(false)

// Mock data for initial UI development
const orders = ref<Order[]>(Array.from({ length: 15 }).map((_, i) => ({
  id: i + 1,
  orderCode: `ORD-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
  user: `user${Math.floor(Math.random() * 10) + 1}@example.com`,
  productPackage: `Package ${Math.floor(Math.random() * 5) + 1}`,
  price: (Math.random() * 100).toFixed(2),
  status: ['pending', 'completed', 'failed'][Math.floor(Math.random() * 3)] as 'pending' | 'completed' | 'failed',
  created: new Date(Date.now() - Math.random() * 10000000000).toLocaleDateString(),
})))

const filteredOrders = computed(() => {
  if (!searchQuery.value) return orders.value
  
  return orders.value.filter(order => 
    order.orderCode.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    order.user.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    order.productPackage.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

// New order form data
const newOrder = ref({
  user: '',
  productPackage: '',
  price: '',
  status: 'pending' as 'pending' | 'completed' | 'failed'
})
</script> 
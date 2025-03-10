<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h2 class="text-2xl font-bold">Products</h2>
      <Button 
        @click="showAddProductModal = true" 
        class="gap-2"
      >
        <Plus class="h-4 w-4" />
        New Product
      </Button>
    </div>
    
    <div class="flex gap-2">
      <div class="relative flex-1">
        <Search class="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search products..."
          v-model="searchQuery"
          class="pl-8"
        />
      </div>
    </div>
    <DataTable :columns="columns" :data="filteredProducts" />
    
    <!-- Add Product Modal -->
    <AddProductModal 
      v-model="showAddProductModal"
      @product-created="handleProductCreated"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { 
  Plus, 
  Search
} from 'lucide-vue-next'
import AddProductModal from '@/components/products/AddProductModal.vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import DataTable from '@/components/products/data-table.vue'
import { columns, type Product } from '@/components/products/columns'

const searchQuery = ref('')
const showAddProductModal = ref(false)

const products = ref<Product[]>([
  {
    id: 1,
    name: 'Product 1',
    slug: 'product-1',
    version: '5.6.9',
    packages: 2,
    licenses: 7,
    isActive: true,
    created: '21/12/2024',
  },
  {
    id: 2,
    name: 'Product 2',
    slug: 'product-2',
    version: '9.6.4',
    packages: 3,
    licenses: 96,
    isActive: true,
    created: '14/2/2025',
  },
  {
    id: 3,
    name: 'Product 3',
    slug: 'product-3',
    version: '4.8.0',
    packages: 1,
    licenses: 16,
    isActive: true,
    created: '1/2/2025',
  },
  {
    id: 4,
    name: 'Product 4',
    slug: 'product-4',
    version: '2.6.7',
    packages: 2,
    licenses: 15,
    isActive: true,
    created: '20/12/2024',
  },
  {
    id: 5,
    name: 'Product 5',
    slug: 'product-5',
    version: '9.5.8',
    packages: 1,
    licenses: 37,
    isActive: true,
    created: '15/1/2025',
  },
  {
    id: 6,
    name: 'Product 6',
    slug: 'product-6',
    version: '5.8.4',
    packages: 1,
    licenses: 21,
    isActive: true,
    created: '7/1/2025',
  }
])

const filteredProducts = computed(() => {
  if (!searchQuery.value) return products.value
  
  return products.value.filter(product => 
    product.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    product.slug.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    product.version.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const handleProductCreated = (productData: any) => {
  // Tạo ID mới cho sản phẩm
  const newId = Math.max(...products.value.map(p => p.id)) + 1
  
  // Thêm sản phẩm mới vào danh sách
  products.value.push({
    id: newId,
    name: productData.name,
    slug: productData.slug || `product-${newId}`,
    version: productData.version || '1.0.0',
    packages: 0,
    licenses: 0,
    isActive: productData.status === 'active',
    created: new Date().toLocaleDateString()
  })
  
  // Hiển thị thông báo thành công (trong ứng dụng thực tế)
  console.log('Product created successfully:', productData)
}
</script> 
<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h2 class="text-2xl font-bold">Products</h2>
      <button class="bg-primary text-primary-foreground px-4 py-2 rounded-md flex items-center">
        <Plus class="mr-2 h-4 w-4" />
        New Product
      </button>
    </div>
    
    <div class="flex gap-2">
      <div class="relative flex-1">
        <Search class="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <input
          placeholder="Search products..."
          v-model="searchQuery"
          class="w-full pl-8 py-2 border rounded-md"
        />
      </div>
    </div>
    
    <div class="rounded-md border">
      <table class="w-full">
        <thead>
          <tr class="border-b">
            <th class="text-left p-3">Name</th>
            <th class="text-left p-3">Version</th>
            <th class="text-left p-3">Packages</th>
            <th class="text-left p-3">Licenses</th>
            <th class="text-left p-3">Status</th>
            <th class="text-left p-3">Created</th>
            <th class="text-left p-3 w-[80px]">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in filteredProducts" :key="product.id" class="border-b hover:bg-muted/50">
            <td class="p-3">
              <div class="flex items-center gap-2">
                <Package class="h-4 w-4 text-primary" />
                <div>
                  <div class="font-medium">{{ product.name }}</div>
                  <div class="text-xs text-muted-foreground">product-{{ product.id }}</div>
                </div>
              </div>
            </td>
            <td class="p-3">{{ product.version }}</td>
            <td class="p-3">{{ product.packages }}</td>
            <td class="p-3">{{ product.licenses }}</td>
            <td class="p-3">
              <span class="px-2 py-1 rounded-full text-xs font-medium" 
                :class="product.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'">
                {{ product.isActive ? 'Active' : 'Inactive' }}
              </span>
            </td>
            <td class="p-3">{{ product.created }}</td>
            <td class="p-3">
              <div class="relative">
                <button @click="toggleDropdown(product.id)" class="p-1 rounded-md hover:bg-muted">
                  <MoreVertical class="h-4 w-4" />
                </button>
                <div v-if="activeDropdown === product.id" class="absolute right-0 mt-1 w-48 bg-white dark:bg-gray-900 rounded-md shadow-lg overflow-hidden z-10 border">
                  <div class="p-1">
                    <button @click="viewProductDetails(product.id)" class="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-2">
                      <Eye class="h-4 w-4" />
                      <span>View Details</span>
                    </button>
                    <button class="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-2">
                      <Edit class="h-4 w-4" />
                      <span>Edit</span>
                    </button>
                    <button class="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-2">
                      <Key class="h-4 w-4" />
                      <span>Licenses</span>
                    </button>
                    <button class="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-2">
                      <PackagePlus class="h-4 w-4" />
                      <span>Packages</span>
                    </button>
                    <button class="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-2 text-red-600">
                      <Trash class="h-4 w-4" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { 
  Plus, 
  MoreVertical, 
  Search, 
  Edit, 
  Trash, 
  Package, 
  PackagePlus,
  Key,
  Eye
} from 'lucide-vue-next'

const router = useRouter()
const searchQuery = ref('')
const activeDropdown = ref<number | null>(null)

interface Product {
  id: number;
  name: string;
  slug: string;
  version: string;
  packages: number;
  licenses: number;
  isActive: boolean;
  created: string;
}

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

const toggleDropdown = (productId: number) => {
  if (activeDropdown.value === productId) {
    activeDropdown.value = null
  } else {
    activeDropdown.value = productId
  }
}

const viewProductDetails = (productId: number) => {
  router.push(`/products/${productId}`)
  activeDropdown.value = null
}
</script> 
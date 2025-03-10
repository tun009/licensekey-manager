<template>
  <div v-if="product" class="space-y-6">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-2">
        <Button variant="outline" size="sm" as-child>
          <router-link to="/products" class="flex items-center gap-1">
            <ChevronLeft class="h-4 w-4" />
            Products
          </router-link>
        </Button>
        <h1 class="text-2xl font-bold">
          {{ product.name }}
          <Badge v-if="product.isActive" variant="default">Active</Badge>
          <Badge v-else variant="secondary">Inactive</Badge>
        </h1>
      </div>
      <Button @click="showAddPackageModal = true">
        <Plus class="h-4 w-4 mr-2" />
        Add Package
      </Button>
    </div>

    <Tabs default-value="product-info" class="w-full">
      <TabsList>
        <TabsTrigger value="product-info">Product Info</TabsTrigger>
        <TabsTrigger value="packages">Packages ({{ packages.length }})</TabsTrigger>
      </TabsList>
      <TabsContent value="product-info" class="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Product Details</CardTitle>
            <CardDescription>View and manage product information</CardDescription>
          </CardHeader>
          <CardContent class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-4">
              <div>
                <h3 class="text-sm font-medium mb-1">Name</h3>
                <p>{{ product.name }}</p>
              </div>
              <div>
                <h3 class="text-sm font-medium mb-1">Slug</h3>
                <p>{{ product.slug }}</p>
              </div>
              <div>
                <h3 class="text-sm font-medium mb-1">Version</h3>
                <p>{{ product.version }}</p>
              </div>
              <div>
                <h3 class="text-sm font-medium mb-1">Created</h3>
                <p>{{ product.created }}</p>
              </div>
            </div>
            <div class="space-y-4">
              <div>
                <h3 class="text-sm font-medium mb-1">Update URL</h3>
                <p>{{ product.updateUrl || 'https://example.com/update' }}</p>
              </div>
              <div>
                <h3 class="text-sm font-medium mb-1">Download URL</h3>
                <p>{{ product.downloadUrl || 'https://example.com/download' }}</p>
              </div>
              <div>
                <h3 class="text-sm font-medium mb-1">Encryption Key</h3>
                <p>{{ product.encryptionKey || '*************' }}</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" @click="handleEditProduct">
              <Edit class="h-4 w-4 mr-2" />
              Edit Product
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Post Content</CardTitle>
            <CardDescription>Product information for marketing</CardDescription>
          </CardHeader>
          <CardContent class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-4">
              <div>
                <h3 class="text-sm font-medium mb-1">Title</h3>
                <p>{{ product.postTitle || 'Product Introduction' }}</p>
              </div>
              <div>
                <h3 class="text-sm font-medium mb-1">Keywords</h3>
                <p>{{ product.keywords || 'keyword1, keyword2' }}</p>
              </div>
            </div>
            <div class="space-y-4">
              <div>
                <h3 class="text-sm font-medium mb-1">Description</h3>
                <p>{{ product.description || 'Detailed product description' }}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="packages" class="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Packages</CardTitle>
            <CardDescription>Manage product packages</CardDescription>
          </CardHeader>
          <CardContent>
            <div v-if="packages.length === 0" class="text-center py-6">
              <Package class="h-12 w-12 mx-auto text-muted-foreground" />
              <h3 class="mt-2 text-lg font-medium">No packages</h3>
              <p class="text-sm text-muted-foreground">Add a package to get started</p>
              <Button class="mt-4" @click="showAddPackageModal = true">
                <Plus class="h-4 w-4 mr-2" />
                Add Package
              </Button>
            </div>
            <div v-else class="space-y-4">
              <div v-for="pkg in packages" :key="pkg.id" class="border rounded-md p-4">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <Package class="h-5 w-5 text-primary" />
                    <h3 class="font-medium">{{ pkg.name }}</h3>
                    <Badge>{{ pkg.version }}</Badge>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger as-child>
                      <Button variant="ghost" size="icon">
                        <MoreVertical class="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem @click="handleEditPackage(pkg)">
                        <Edit class="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem class="text-destructive" @click="handleDeletePackage(pkg.id)">
                        <Trash class="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div class="mt-2 text-sm text-muted-foreground">
                  {{ pkg.description }}
                </div>
                <div class="mt-2 grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span class="font-medium">Release Date:</span> {{ pkg.releaseDate }}
                  </div>
                  <div>
                    <span class="font-medium">Downloads:</span> {{ pkg.downloads }}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>

    <!-- Package Form Modal -->
    <PackageForm 
      :open="showAddPackageModal" 
      :onOpenChange="(open) => showAddPackageModal = open"
      :onSubmit="handleCreatePackage"
    />

    <!-- Edit Package Modal -->
    <Dialog :open="showEditPackageModal" @update:open="showEditPackageModal = $event">
      <DialogContent class="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Package</DialogTitle>
          <DialogDescription>
            Update package information
          </DialogDescription>
        </DialogHeader>
        <form @submit.prevent="handleUpdatePackage">
          <div class="grid gap-4 py-4">
            <div class="grid gap-2">
              <Label for="edit-name">Name</Label>
              <Input id="edit-name" v-model="editingPackage.name" placeholder="Package name" />
            </div>
            <div class="grid gap-2">
              <Label for="edit-version">Version</Label>
              <Input id="edit-version" v-model="editingPackage.version" placeholder="1.0.0" />
            </div>
            <div class="grid gap-2">
              <Label for="edit-description">Description</Label>
              <Textarea id="edit-description" v-model="editingPackage.description" placeholder="Package description" />
            </div>
            <div class="grid gap-2">
              <Label for="edit-releaseDate">Release Date</Label>
              <Input id="edit-releaseDate" type="date" v-model="editingPackage.releaseDate" />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" @click="showEditPackageModal = false">Cancel</Button>
            <Button type="submit">Update</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  </div>
  <div v-else class="flex items-center justify-center h-64">
    <p>Loading product...</p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { 
  Package, 
  ChevronLeft, 
  Plus, 
  Edit, 
  Trash, 
  MoreVertical 
} from 'lucide-vue-next'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from '@/components/ui/card'
import { 
  Tabs, 
  TabsList, 
  TabsTrigger, 
  TabsContent 
} from '@/components/ui/tabs'
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription, 
  DialogFooter 
} from '@/components/ui/dialog'
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator 
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import PackageForm, { PackageItem } from '@/components/products/packages/PackageForm.vue'

const route = useRoute()
const router = useRouter()
const productId = computed(() => Number(route.params.id))

// Product data
const product = ref<any>(null)

// Packages data
const packages = ref<any[]>([])

// Modal states
const showAddPackageModal = ref(false)
const showEditPackageModal = ref(false)

// New package form
const newPackage = ref({
  name: '',
  version: '',
  description: '',
  releaseDate: new Date().toISOString().split('T')[0]
})

// Editing package
const editingPackage = ref<any>({})

// Fetch product data
onMounted(async () => {
  // In a real app, this would be an API call
  // For now, we'll use mock data
  setTimeout(() => {
    product.value = {
      id: productId.value,
      name: `Product ${productId.value}`,
      slug: `product-${productId.value}`,
      version: '1.0.0',
      isActive: true,
      created: '10/3/2025',
      updateUrl: 'https://example.com/update',
      downloadUrl: 'https://example.com/download',
      encryptionKey: 'sk_test_123456789',
      postTitle: 'Product Introduction',
      keywords: 'keyword1, keyword2',
      description: 'Detailed product description'
    }

    // Mock packages
    packages.value = [
      {
        id: 1,
        name: 'Core Package',
        version: '1.0.0',
        description: 'The main package for this product',
        releaseDate: '2023-10-15',
        downloads: 1250
      },
      {
        id: 2,
        name: 'Extension Pack',
        version: '0.9.5',
        description: 'Additional features for power users',
        releaseDate: '2023-09-20',
        downloads: 850
      }
    ]
  }, 500)
})

// Handle edit product
const handleEditProduct = () => {
  router.push(`/products/${productId.value}/edit`)
}

// Handle create package
const handleCreatePackage = (packageData: PackageItem) => {
  // In a real app, this would be an API call
  const newId = packages.value.length > 0 
    ? Math.max(...packages.value.map(p => p.id as number)) + 1 
    : 1

  const newPackage = {
    id: newId,
    ...packageData,
    downloads: 0,
    releaseDate: new Date().toISOString().split('T')[0]
  }

  packages.value.push(newPackage)
}

// Handle edit package
const handleEditPackage = (pkg: any) => {
  editingPackage.value = { ...pkg }
  showEditPackageModal.value = true
}

// Handle update package
const handleUpdatePackage = () => {
  const index = packages.value.findIndex(p => p.id === editingPackage.value.id)
  if (index !== -1) {
    packages.value[index] = { ...editingPackage.value }
  }
  showEditPackageModal.value = false
}

// Handle delete package
const handleDeletePackage = (packageId: number) => {
  if (confirm('Are you sure you want to delete this package?')) {
    packages.value = packages.value.filter(p => p.id !== packageId)
  }
}
</script> 
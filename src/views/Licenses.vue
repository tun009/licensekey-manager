<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h2 class="text-2xl font-bold">License Keys</h2>
      <Button 
        @click="showAddLicenseModal = true" 
        class="gap-2"
      >
        <Plus class="h-4 w-4" />
        Create License
      </Button>
    </div>
    
    <div class="flex gap-2">
      <div class="relative flex-1">
        <Search class="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search licenses..."
          v-model="searchQuery"
          class="pl-8 bg-white dark:bg-gray-800"
        />
      </div>
    </div>
    <DataTable 
      :columns="columns" 
      :data="filteredLicenses" 
      emptyMessage="No licenses found."
    />
    
    <!-- Add License Modal -->
    <Dialog :open="showAddLicenseModal" @update:open="showAddLicenseModal = $event">
      <DialogContent class="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New License</DialogTitle>
          <DialogDescription>
            Generate a new license key for a user.
          </DialogDescription>
        </DialogHeader>
        
        <div class="grid gap-4 py-4">
          <div class="grid grid-cols-4 items-center gap-4">
            <Label for="product" class="text-right text-sm">Product</Label>
            <Input id="product" class="col-span-3" placeholder="Select product" v-model="newLicense.product" />
          </div>
          <div class="grid grid-cols-4 items-center gap-4">
            <Label for="user" class="text-right text-sm">User</Label>
            <Input id="user" class="col-span-3" placeholder="User email" v-model="newLicense.owner" />
          </div>
          <div class="grid grid-cols-4 items-center gap-4">
            <Label for="devices" class="text-right text-sm">Devices</Label>
            <Input id="devices" class="col-span-3" placeholder="Max devices" type="number" v-model="newLicense.limitDevices" />
          </div>
          <div class="grid grid-cols-4 items-center gap-4">
            <Label for="expires" class="text-right text-sm">Expires</Label>
            <Input id="expires" class="col-span-3" type="date" v-model="newLicense.expired" />
          </div>
        </div>
        
        <DialogFooter>
          <Button type="submit" @click="handleAddLicense">
            <CheckCircle class="mr-2 h-4 w-4" />
            Create License
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { 
  Plus, 
  Search,
  CheckCircle
} from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import DataTable from '@/components/ui/data-table/data-table.vue'
import { columns, type License } from '@/components/licenses/columns'

const searchQuery = ref('')
const showAddLicenseModal = ref(false)

// Mock data for initial UI development
const licenses = ref<License[]>(Array.from({ length: 10 }).map((_, i) => ({
  id: i + 1,
  licenseCode: `LICENSE-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
  product: `Product ${(i % 3) + 1}`,
  owner: `user${i + 1}@example.com`,
  devices: Math.floor(Math.random() * 5) + 1,
  limitDevices: 5,
  expired: new Date(Date.now() + Math.random() * 10000000000).toLocaleDateString(),
  created: new Date(Date.now() - Math.random() * 10000000000).toLocaleDateString(),
})))

const filteredLicenses = computed(() => {
  if (!searchQuery.value) return licenses.value
  
  return licenses.value.filter(license => 
    license.licenseCode.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    license.owner.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    license.product.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

// New license form data
const newLicense = ref({
  product: '',
  owner: '',
  limitDevices: 5,
  expired: ''
})

const handleAddLicense = () => {
  // Create a new license
  const newId = Math.max(...licenses.value.map(l => l.id)) + 1
  
  licenses.value.push({
    id: newId,
    licenseCode: `LICENSE-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
    product: newLicense.value.product,
    owner: newLicense.value.owner,
    devices: 0,
    limitDevices: Number(newLicense.value.limitDevices),
    expired: newLicense.value.expired || new Date(Date.now() + 31536000000).toLocaleDateString(), // Default to 1 year
    created: new Date().toLocaleDateString()
  })
  
  // Reset form and close modal
  newLicense.value = {
    product: '',
    owner: '',
    limitDevices: 5,
    expired: ''
  }
  showAddLicenseModal.value = false
  
  // Show success message (in a real app, use a toast)
  console.log('License created successfully')
}
</script> 
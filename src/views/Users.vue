<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h2 class="text-2xl font-bold">Users</h2>
      <Button 
        @click="showAddUserModal = true" 
        class="gap-2"
      >
        <Plus class="h-4 w-4" />
        Add User
      </Button>
    </div>
    
    <div class="flex gap-2">
      <div class="relative flex-1">
        <Search class="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search users..."
          v-model="searchQuery"
          class="pl-8 bg-white dark:bg-gray-800"
        />
      </div>
    </div>
    <DataTable 
      :columns="columns" 
      :data="filteredUsers" 
      emptyMessage="No users found."
    />
    
    <!-- Add User Modal -->
    <Dialog :open="showAddUserModal" @update:open="showAddUserModal = $event">
      <DialogContent class="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
          <DialogDescription>
            Create a new user account.
          </DialogDescription>
        </DialogHeader>
        
        <div class="grid gap-4 py-4">
          <div class="grid grid-cols-4 items-center gap-4">
            <Label for="name" class="text-right text-sm">Name</Label>
            <Input id="name" class="col-span-3" placeholder="Full name" v-model="newUser.name" />
          </div>
          <div class="grid grid-cols-4 items-center gap-4">
            <Label for="email" class="text-right text-sm">Email</Label>
            <Input id="email" class="col-span-3" placeholder="user@example.com" type="email" v-model="newUser.email" />
          </div>
        </div>
        
        <DialogFooter>
          <Button type="submit" @click="handleAddUser">
            <CheckCircle class="mr-2 h-4 w-4" />
            Add User
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
import { columns, type UserData } from '@/components/users/columns'

const searchQuery = ref('')
const showAddUserModal = ref(false)

// Mock data for initial UI development
const users = ref<UserData[]>(Array.from({ length: 10 }).map((_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  licenses: Math.floor(Math.random() * 5),
  orders: Math.floor(Math.random() * 10),
  created: new Date(Date.now() - Math.random() * 10000000000).toLocaleDateString(),
})))

const filteredUsers = computed(() => {
  if (!searchQuery.value) return users.value
  
  return users.value.filter(user => 
    user.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

// New user form data
const newUser = ref({
  name: '',
  email: ''
})

const handleAddUser = () => {
  // Create a new user
  const newId = Math.max(...users.value.map(u => u.id)) + 1
  
  users.value.push({
    id: newId,
    name: newUser.value.name,
    email: newUser.value.email,
    licenses: 0,
    orders: 0,
    created: new Date().toLocaleDateString()
  })
  
  // Reset form and close modal
  newUser.value = {
    name: '',
    email: ''
  }
  showAddUserModal.value = false
  
  // Show success message (in a real app, use a toast)
  console.log('User created successfully')
}
</script> 
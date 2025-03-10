<template>
  <Dialog :open="open" @update:open="onOpenChange">
    <DialogContent class="sm:max-w-[500px]">
      <DialogHeader>
        <DialogTitle>Add New Package</DialogTitle>
        <DialogDescription>
          Create a new package for this product.
        </DialogDescription>
      </DialogHeader>
      <div class="grid gap-4 py-4">
        <div>
          <Label for="name">Name</Label>
          <Input 
            id="name" 
            v-model="packageData.name" 
            placeholder="Basic Plan" 
            class="mt-1.5"
          />
        </div>
        
        <div class="grid grid-cols-4 gap-4">
          <div class="col-span-3">
            <Label for="price">Price</Label>
            <Input 
              id="price" 
              v-model="packageData.price" 
              placeholder="99.99" 
              type="number"
              step="0.01"
              class="mt-1.5"
            />
          </div>
          <div>
            <Label for="currency">Currency</Label>
            <select 
              id="currency"
              v-model="packageData.currency"
              class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm mt-1.5"
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
            </select>
          </div>
        </div>
        
        <div>
          <Label for="deviceLimit">Device Limit</Label>
          <Input 
            id="deviceLimit" 
            v-model="packageData.deviceLimit" 
            placeholder="5" 
            type="number"
            class="mt-1.5"
          />
        </div>
        
        <div>
          <Label for="months">Months</Label>
          <Input 
            id="months" 
            v-model="packageData.months" 
            placeholder="12" 
            type="number"
            class="mt-1.5"
          />
        </div>
        
        <div>
          <Label>Status</Label>
          <div class="flex items-center space-x-4 mt-1.5">
            <div class="flex items-center space-x-2">
              <input 
                type="radio" 
                id="status-active" 
                v-model="packageData.status" 
                value="active" 
                class="h-4 w-4 rounded-full border-primary text-primary"
              />
              <Label for="status-active" class="cursor-pointer">Active</Label>
            </div>
            <div class="flex items-center space-x-2">
              <input 
                type="radio" 
                id="status-inactive" 
                v-model="packageData.status" 
                value="inactive" 
                class="h-4 w-4 rounded-full border-primary text-primary"
              />
              <Label for="status-inactive" class="cursor-pointer">Inactive</Label>
            </div>
          </div>
        </div>
        
        <div class="flex items-center justify-between">
          <Label for="isActive">Is Active</Label>
          <div class="flex items-center space-x-2">
            <div class="relative inline-flex h-[24px] w-[44px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent bg-gray-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background data-[state=checked]:bg-primary"
              :data-state="packageData.isActive ? 'checked' : 'unchecked'"
              @click="packageData.isActive = !packageData.isActive"
            >
              <span 
                class="pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
                :data-state="packageData.isActive ? 'checked' : 'unchecked'"
              ></span>
            </div>
            <span class="text-sm text-muted-foreground">{{ packageData.isActive ? 'Yes' : 'No' }}</span>
          </div>
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" type="button" @click="onCancel">
          Cancel
        </Button>
        <Button type="button" @click="handleSubmit" class="bg-black text-white hover:bg-black/90">
          Create Package
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, withDefaults } from 'vue'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export interface PackageItem {
  id?: number;
  name: string;
  price: string | number;
  currency: string;
  deviceLimit: string | number;
  months: string | number;
  status: string;
  isActive: boolean;
}

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (packageData: PackageItem) => void;
}

const props = withDefaults(defineProps<Props>(), {
  open: false,
  onOpenChange: () => {},
  onSubmit: () => {},
})

const emit = defineEmits(['update:open', 'submit'])

// Init package data
const packageData = ref<PackageItem>({
  name: '',
  price: '',
  currency: 'USD',
  deviceLimit: '',
  months: '',
  status: 'active',
  isActive: true
})

const onCancel = () => {
  props.onOpenChange(false)
}

const handleSubmit = () => {
  // Convert string values to numbers where appropriate
  const formattedData = {
    ...packageData.value,
    price: parseFloat(packageData.value.price as string),
    deviceLimit: parseInt(packageData.value.deviceLimit as string),
    months: parseInt(packageData.value.months as string)
  }
  
  props.onSubmit(formattedData)
  props.onOpenChange(false)
  
  // Reset form
  packageData.value = {
    name: '',
    price: '',
    currency: 'USD',
    deviceLimit: '',
    months: '',
    status: 'active',
    isActive: true
  }
}
</script> 
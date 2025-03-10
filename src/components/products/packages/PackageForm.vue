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
        <div class="grid gap-2">
          <Label for="name">Name</Label>
          <Input 
            id="name" 
            v-model="packageData.name" 
            placeholder="Basic Plan" 
          />
        </div>
        
        <div class="grid grid-cols-4 gap-4">
          <div class="col-span-3 grid gap-2">
            <Label for="price">Price</Label>
            <Input 
              id="price" 
              v-model="packageData.price" 
              placeholder="99.99" 
              type="number"
              step="0.01"
            />
          </div>
          <div class="grid gap-2">
            <Label for="currency">Currency</Label>
            <Select v-model="packageData.currency">
              <SelectTrigger id="currency">
                <SelectValue placeholder="USD" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USD">USD</SelectItem>
                <SelectItem value="EUR">EUR</SelectItem>
                <SelectItem value="GBP">GBP</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div class="grid gap-2">
          <Label for="deviceLimit">Device Limit</Label>
          <Input 
            id="deviceLimit" 
            v-model="packageData.deviceLimit" 
            placeholder="5" 
            type="number"
          />
        </div>
        
        <div class="grid gap-2">
          <Label for="months">Months</Label>
          <Input 
            id="months" 
            v-model="packageData.months" 
            placeholder="12" 
            type="number"
          />
        </div>
        
        <div class="grid gap-2">
          <Label>Status</Label>
          <div class="flex items-center space-x-4">
            <div class="flex items-center space-x-2">
              <RadioGroup v-model="packageData.status">
                <div class="flex items-center space-x-2">
                  <RadioGroupItem id="active" value="active" />
                  <Label for="active">Active</Label>
                </div>
                <div class="flex items-center space-x-2">
                  <RadioGroupItem id="inactive" value="inactive" />
                  <Label for="inactive">Inactive</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>
        
        <div class="flex items-center space-x-2">
          <Label for="isActive">Is Active</Label>
          <div class="flex-1"></div>
          <Switch 
            id="isActive" 
            v-model="packageData.isActive"
          />
          <span class="text-sm text-gray-500">{{ packageData.isActive ? 'Yes' : 'No' }}</span>
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" type="button" @click="onCancel">
          Cancel
        </Button>
        <Button type="button" @click="handleSubmit">
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'

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
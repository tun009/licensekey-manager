<template>
  <Dialog :open="modelValue" @update:open="$emit('update:modelValue', $event)">
    <DialogContent class="sm:max-w-[700px]">
      <DialogHeader class="space-y-1.5 text-left">
        <DialogTitle>Add New Product</DialogTitle>
        <DialogDescription>
          Create a new product for license management.
        </DialogDescription>
      </DialogHeader>
      
      <Tabs v-model="activeTab" class="w-full mt-6">
        <TabsList class="grid w-full grid-cols-2">
          <TabsTrigger value="general">General Info</TabsTrigger>
          <TabsTrigger value="post">Post Content</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" class="space-y-6 py-6">
          <div class="grid gap-6">
            <div class="grid grid-cols-4 items-center gap-4">
              <Label for="name" class="text-right text-sm">Name</Label>
              <Input 
                id="name"
                v-model="productForm.name" 
                placeholder="Product name"
                class="col-span-3"
              />
            </div>
            
            <div class="grid grid-cols-4 items-center gap-4">
              <Label for="slug" class="text-right text-sm">Slug</Label>
              <Input 
                id="slug"
                v-model="productForm.slug" 
                placeholder="product-slug"
                class="col-span-3"
              />
            </div>
            
            <div class="grid grid-cols-4 items-start gap-4">
              <Label for="thumbnail" class="text-right text-sm pt-2">Thumbnail</Label>
              <div class="col-span-3">
                <div class="flex items-center gap-6">
                  <div class="flex-shrink-0">
                    <div v-if="thumbnailPreview" class="relative w-24 h-24 overflow-hidden rounded-md border">
                      <img :src="thumbnailPreview" alt="Thumbnail preview" class="object-cover w-full h-full" />
                      <Button 
                        @click="clearThumbnail" 
                        variant="destructive"
                        size="icon"
                        class="absolute top-1 right-1 h-6 w-6"
                      >
                        <X class="h-3 w-3" />
                      </Button>
                    </div>
                    <div v-else class="w-24 h-24 flex items-center justify-center rounded-md border bg-muted">
                      <Image class="h-8 w-8 text-muted-foreground" />
                    </div>
                  </div>
                  <div class="flex-grow">
                    <label for="thumbnailUpload" class="cursor-pointer">
                      <div class="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-muted">
                        <Upload class="h-4 w-4" />
                        <span>Upload Image</span>
                      </div>
                      <input 
                        type="file" 
                        id="thumbnailUpload" 
                        class="hidden" 
                        ref="fileInputRef" 
                        @change="handleFileUpload"
                        accept="image/*"
                      />
                    </label>
                    <p class="text-xs text-muted-foreground mt-2">
                      Recommended size: 512x512px. Max size: 2MB
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="grid grid-cols-4 items-center gap-4">
              <Label for="version" class="text-right text-sm">Version</Label>
              <Input 
                id="version"
                v-model="productForm.version" 
                placeholder="1.0.0"
                class="col-span-3"
              />
            </div>
            
            <div class="grid grid-cols-4 items-center gap-4">
              <Label for="update_url" class="text-right text-sm">Update URL</Label>
              <div class="col-span-3 flex items-center">
                <Globe class="h-4 w-4 mr-2 text-muted-foreground" />
                <Input 
                  id="update_url"
                  v-model="productForm.update_url" 
                  placeholder="https://example.com/update"
                  class="flex-1"
                />
              </div>
            </div>
            
            <div class="grid grid-cols-4 items-center gap-4">
              <Label for="download_url" class="text-right text-sm">Download URL</Label>
              <div class="col-span-3 flex items-center">
                <Download class="h-4 w-4 mr-2 text-muted-foreground" />
                <Input 
                  id="download_url"
                  v-model="productForm.download_url" 
                  placeholder="https://example.com/download"
                  class="flex-1"
                />
              </div>
            </div>
            
            <div class="grid grid-cols-4 items-center gap-4">
              <Label for="public_key" class="text-right text-sm">Public Key</Label>
              <div class="col-span-3 flex items-center">
                <Key class="h-4 w-4 mr-2 text-muted-foreground" />
                <Input 
                  id="public_key"
                  v-model="productForm.encrypt_public_key" 
                  placeholder="Public key for encryption"
                  class="flex-1"
                />
              </div>
            </div>
            
            <div class="grid grid-cols-4 items-center gap-4">
              <Label for="private_key" class="text-right text-sm">Private Key</Label>
              <div class="col-span-3 flex items-center">
                <Key class="h-4 w-4 mr-2 text-muted-foreground" />
                <Input 
                  id="private_key"
                  v-model="productForm.encrypt_private_key" 
                  placeholder="Private key for encryption"
                  class="flex-1"
                />
              </div>
            </div>
            
            <div class="grid grid-cols-4 items-center gap-4">
              <Label class="text-right text-sm">Status</Label>
              <div class="flex gap-6 col-span-3">
                <div class="flex items-center gap-2">
                  <input
                    type="radio"
                    id="status-active"
                    name="status"
                    :checked="productForm.status === 'active'"
                    @change="productForm.status = 'active'"
                  />
                  <Label for="status-active">Active</Label>
                </div>
                <div class="flex items-center gap-2">
                  <input
                    type="radio"
                    id="status-inactive"
                    name="status"
                    :checked="productForm.status === 'inactive'"
                    @change="productForm.status = 'inactive'"
                  />
                  <Label for="status-inactive">Inactive</Label>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="post" class="space-y-6 py-6">
          <div class="space-y-6">
            <div>
              <Label for="post_title" class="text-sm font-medium">Title</Label>
              <Input 
                id="post_title"
                v-model="productForm.post.title" 
                placeholder="Post title"
                class="mt-1.5"
              />
            </div>
            
            <div>
              <Label for="post_description" class="text-sm font-medium">Description</Label>
              <Textarea 
                id="post_description"
                v-model="productForm.post.description" 
                placeholder="Product description"
                class="mt-1.5 min-h-[100px]"
              />
            </div>
            
            <div>
              <Label for="post_html" class="text-sm font-medium">HTML Content</Label>
              <div class="relative mt-1.5">
                <FileCode class="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Textarea 
                  id="post_html"
                  v-model="productForm.post.html" 
                  placeholder="<h1>Product content</h1>"
                  class="pl-10 font-mono text-sm min-h-[150px]"
                />
              </div>
            </div>
            
            <div>
              <Label for="post_keywords" class="text-sm font-medium">Keywords</Label>
              <Input 
                id="post_keywords"
                v-model="productForm.post.keywords" 
                placeholder="keyword1, keyword2, keyword3"
                class="mt-1.5"
              />
            </div>
            
            <div class="flex items-center gap-4">
              <Label for="show_full_page" class="text-sm font-medium">Show Full Page</Label>
              <div class="flex items-center gap-2">
                <Switch 
                  id="show_full_page"
                  v-model="productForm.post.show_full_page" 
                />
                <span class="text-sm text-muted-foreground">{{ productForm.post.show_full_page ? 'Yes' : 'No' }}</span>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      <DialogFooter class="gap-2">
        <Button 
          @click="closeModal" 
          variant="outline"
        >
          Cancel
        </Button>
        <Button 
          @click="createProduct" 
          class="gap-2"
        >
          <CheckCircle class="h-4 w-4" />
          Create Product
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, defineEmits, defineProps } from 'vue'
import { 
  Upload, 
  FileCode,
  CheckCircle, 
  Globe, 
  Download, 
  Key, 
  Image,
  X
} from 'lucide-vue-next'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'

defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'product-created'])

const activeTab = ref('general')
const thumbnailPreview = ref<string | null>(null)
const fileInputRef = ref<HTMLInputElement | null>(null)

const productForm = ref({
  name: '',
  slug: '',
  version: '',
  update_url: '',
  download_url: '',
  encrypt_public_key: '',
  encrypt_private_key: '',
  status: 'active',
  thumbnail: null as File | null,
  post: {
    title: '',
    description: '',
    html: '',
    keywords: '',
    show_full_page: true
  }
})

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0] || null
  
  if (file) {
    productForm.value.thumbnail = file
    
    const reader = new FileReader()
    reader.onloadend = () => {
      thumbnailPreview.value = reader.result as string
    }
    reader.readAsDataURL(file)
  }
}

const clearThumbnail = () => {
  productForm.value.thumbnail = null
  thumbnailPreview.value = null
  if (fileInputRef.value) {
    fileInputRef.value.value = ''
  }
}

const createProduct = () => {
  // Here you would typically send the data to your API
  console.log('Product data to submit:', productForm.value)
  
  // Emit an event with the product data
  emit('product-created', productForm.value)
  
  // Reset the form
  resetForm()
  
  // Close the modal
  closeModal()
}

const closeModal = () => {
  emit('update:modelValue', false)
}

const resetForm = () => {
  productForm.value = {
    name: '',
    slug: '',
    version: '',
    update_url: '',
    download_url: '',
    encrypt_public_key: '',
    encrypt_private_key: '',
    status: 'active',
    thumbnail: null,
    post: {
      title: '',
      description: '',
      html: '',
      keywords: '',
      show_full_page: true
    }
  }
  thumbnailPreview.value = null
  activeTab.value = 'general'
}
</script> 
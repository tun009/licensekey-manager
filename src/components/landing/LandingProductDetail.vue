<template>
  <div class="space-y-12">
    <!-- Header Card -->
    <div :class="`rounded-xl overflow-hidden ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg`">
      <div 
        class="h-64 bg-center bg-cover"
        :style="{ backgroundImage: `url(${getProductImage()})` }"
      />
      <div class="p-6">
        <div class="flex flex-col md:flex-row justify-between items-start gap-4">
          <div>
            <div class="flex items-center mb-4">
              <Button 
                variant="ghost" 
                class="mr-2" 
                @click="onBack"
              >
                <ArrowLeft class="h-5 w-5 mr-1" />
                {{ t('backToProducts') }}
              </Button>
            </div>
            <h1 class="text-3xl font-bold">{{ product.name }}</h1>
            <div class="flex items-center mt-2 text-sm">
              <div class="flex items-center mr-4">
                <Star class="h-5 w-5 text-yellow-500 fill-yellow-500 mr-1" />
                <span>{{ getAverageRating() }}</span>
                <span class="ml-1 text-muted-foreground">({{ reviews.length }} {{ t('reviews') }})</span>
              </div>
              <div class="flex items-center mr-4">
                <Package class="h-5 w-5 mr-1" />
                <span>{{ packages.length }} {{ t('packages') }}</span>
              </div>
              <div class="flex items-center">
                <ShoppingCart class="h-5 w-5 mr-1" />
                <span>{{ product.licenses }} {{ t('licenses') }}</span>
              </div>
            </div>
          </div>
          <div class="flex flex-col items-end gap-3">
            <Badge 
              variant="default"
              :class="`text-sm px-3 py-1 mb-2 ${product.isActive ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'}`"
            >
              {{ product.isActive ? t('active') : t('inactive') }}
            </Badge>
            <Button 
              size="lg" 
              class="px-8 py-6 text-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              @click="handleBuyNow"
            >
              <ShoppingCart class="mr-2 h-5 w-5" />
              {{ t('buyNow') }}
            </Button>
          </div>
        </div>
      </div>
    </div>

    <!-- Overview Section -->
    <section id="overview" class="space-y-6">
      <h2 class="text-3xl font-semibold mb-8">{{ t('overview') }}</h2>
      <div :class="`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow`">
        <h3 class="text-2xl font-semibold mb-4">{{ t('productDescription') }}</h3>
        <p class="mb-8 text-lg">{{ product.post?.description || 'No description available.' }}</p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div :class="`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`">
            <div class="flex items-start">
              <Shield class="h-8 w-8 text-primary mr-4 mt-1" />
              <div>
                <h4 class="text-xl font-medium mb-2">{{ t('secureProtection') }}</h4>
                <p>{{ t('secureProtectionDesc') }}</p>
              </div>
            </div>
          </div>
          
          <div :class="`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`">
            <div class="flex items-start">
              <Zap class="h-8 w-8 text-yellow-500 mr-4 mt-1" />
              <div>
                <h4 class="text-xl font-medium mb-2">{{ t('easyIntegration') }}</h4>
                <p>{{ t('easyIntegrationDesc') }}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div class="mt-8">
          <h3 class="text-xl font-medium mb-4">{{ t('productDetails') }}</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="flex items-center">
              <Calendar class="h-5 w-5 mr-3 text-primary" />
              <span>{{ t('released') }}: {{ product.created }}</span>
            </div>
            <div class="flex items-center">
              <CheckCircle class="h-5 w-5 mr-3 text-green-500" />
              <span>{{ t('version') }}: {{ product.version }}</span>
            </div>
            <div class="flex items-center">
              <Clock class="h-5 w-5 mr-3 text-blue-500" />
              <span>{{ t('lastUpdated') }}: {{ new Date(Date.now() - Math.random() * 5000000000).toLocaleDateString() }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Packages Section -->
    <section id="packages" class="space-y-6">
      <h2 class="text-3xl font-semibold mb-8">{{ t('packages') }}</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card 
          v-for="pkg in packages" 
          :key="pkg.id" 
          :class="`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'} transition-all duration-300 hover:shadow-xl hover:translate-y-[-4px] flex flex-col`"
        >
          <CardHeader :class="`${pkg.name === 'Premium' ? 'bg-gradient-to-r from-amber-400 to-yellow-500' : pkg.name === 'Enterprise' ? 'bg-gradient-to-r from-purple-600 to-indigo-600' : 'bg-gray-100 dark:bg-gray-700'} text-center py-6`">
            <CardTitle :class="`${pkg.name === 'Premium' || pkg.name === 'Enterprise' ? 'text-white' : ''}`">
              {{ pkg.name }}
            </CardTitle>
            <div :class="`text-3xl font-bold mt-2 ${pkg.name === 'Premium' || pkg.name === 'Enterprise' ? 'text-white' : ''}`">
              ${{ pkg.price }}
            </div>
            <div :class="`text-sm ${pkg.name === 'Premium' || pkg.name === 'Enterprise' ? 'text-white/80' : 'text-muted-foreground'}`">
              {{ pkg.time_of_use }} {{ t('months') }}
            </div>
          </CardHeader>
          <CardContent class="pt-6 flex-grow">
            <ul class="space-y-3">
              <li class="flex items-center">
                <CheckCircle class="h-5 w-5 text-green-500 mr-2" />
                <span>{{ pkg.limit_devices }} {{ t('devices') }}</span>
              </li>
              <li class="flex items-center">
                <CheckCircle class="h-5 w-5 text-green-500 mr-2" />
                <span>{{ t('technicalSupport') }}</span>
              </li>
              <li class="flex items-center">
                <CheckCircle class="h-5 w-5 text-green-500 mr-2" />
                <span>{{ t('updates') }}</span>
              </li>
              <li v-if="pkg.name !== 'Basic'" class="flex items-center">
                <CheckCircle class="h-5 w-5 text-green-500 mr-2" />
                <span>{{ t('prioritySupport') }}</span>
              </li>
              <li v-if="pkg.name === 'Enterprise'" class="flex items-center">
                <CheckCircle class="h-5 w-5 text-green-500 mr-2" />
                <span>{{ t('customBranding') }}</span>
              </li>
            </ul>
            <div class="mt-6 pt-4">
              <Button class="w-full" @click="handleBuyNow">
                {{ t('buyNow') }}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>

    <!-- Reviews Section -->
    <section id="reviews" class="space-y-6">
      <h2 class="text-3xl font-semibold mb-8">{{ t('customerReviews') }}</h2>
      <div :class="`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow mb-6`">
        <div class="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
          <div class="flex items-center mb-4 md:mb-0">
            <div class="text-4xl font-bold mr-4">{{ getAverageRating() }}</div>
            <div class="flex">
              <Star 
                v-for="star in 5" 
                :key="star" 
                :class="`h-5 w-5 ${
                  star <= Math.ceil(parseFloat(getAverageRating())) 
                    ? 'text-yellow-500 fill-yellow-500' 
                    : 'text-gray-300'
                }`" 
              />
              <span class="ml-2 text-sm text-muted-foreground">
                ({{ reviews.length }} {{ t('reviews') }})
              </span>
            </div>
          </div>
          <Button variant="outline">
            {{ t('writeReview') }}
          </Button>
        </div>
      </div>
      
      <div class="space-y-4">
        <div 
          v-for="review in reviews" 
          :key="review.id" 
          :class="`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow transition-all duration-300 hover:shadow-md`"
        >
          <div class="flex justify-between items-start">
            <div>
              <div class="font-medium">{{ review.name }}</div>
              <div class="text-sm text-muted-foreground">{{ review.date }}</div>
            </div>
            <div class="flex">
              <Star 
                v-for="star in 5" 
                :key="star" 
                :class="`h-4 w-4 ${star <= review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`" 
              />
            </div>
          </div>
          <p class="mt-4">{{ review.comment }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { 
  ArrowLeft, 
  Star, 
  ShoppingCart, 
  Calendar, 
  Package, 
  CheckCircle, 
  Shield, 
  Zap, 
  Clock 
} from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface PackageItem {
  id: number
  name: string
  price: number
  price_unit: string
  limit_devices: number
  time_of_use: number
  is_active: boolean
  status: string
}

interface Review {
  id: number
  name: string
  rating: number
  date: string
  comment: string
}

interface Props {
  product: {
    id: number
    name: string
    version: string
    packages: number
    licenses: number
    isActive: boolean
    created: string
    post?: {
      description: string
    }
  }
  onBack: () => void
}

const props = defineProps<Props>()
const router = useRouter()
const theme = ref('light') // Mock theme context
const packages = ref<PackageItem[]>([])
const reviews = ref<Review[]>([])
const loading = ref(true)

onMounted(() => {
  fetchData()
})

const fetchData = () => {
  loading.value = true
  
  // Generate mock packages
  const mockPackages: PackageItem[] = Array(props.product.packages || 3).fill(null).map((_, index) => ({
    id: index + 1,
    name: index === 0 ? "Basic" : index === 1 ? "Premium" : "Enterprise",
    price: index === 0 ? 29.99 : index === 1 ? 99.99 : 199.99,
    price_unit: "USD",
    limit_devices: index === 0 ? 2 : index === 1 ? 5 : 10,
    time_of_use: index === 0 ? 6 : index === 1 ? 12 : 24,
    is_active: true,
    status: "active"
  }))
  
  // Generate mock reviews
  const reviewCount = Math.floor(Math.random() * 10) + 5
  const mockReviews: Review[] = Array(reviewCount).fill(null).map((_, index) => ({
    id: index + 1,
    name: `User ${index + 1}`,
    rating: Math.floor(Math.random() * 5) + 1,
    date: new Date(Date.now() - Math.random() * 10000000000).toLocaleDateString(),
    comment: index % 3 === 0 
      ? "Great product, works exactly as described and saved me a lot of time."
      : index % 3 === 1
      ? "Good value for money. The customer support is responsive and helpful."
      : "This product has been essential for my business. Highly recommended!"
  }))
  
  packages.value = mockPackages
  reviews.value = mockReviews
  loading.value = false
}

const getAverageRating = (): string => {
  if (!reviews.value.length) return "0"
  const total = reviews.value.reduce((sum, review) => sum + review.rating, 0)
  return (total / reviews.value.length).toFixed(1)
}

const getProductImage = () => {
  const images = [
    "photo-1488590528505-98d2b5aba04b",
    "photo-1518770660439-4636190af475", 
    "photo-1461749280684-dccba630e2f6",
    "photo-1486312338219-ce68d2c6f44d",
    "photo-1649972904349-6e44c42644a7"
  ]
  
  const imageIndex = (props.product.id - 1) % images.length
  return `https://images.unsplash.com/${images[imageIndex]}?auto=format&fit=crop&w=800&q=80`
}

const handleBuyNow = () => {
  router.push('/login')
}

// Mock translation function
const t = (key: string) => {
  const translations: Record<string, string> = {
    backToProducts: 'Back to Products',
    active: 'Active',
    inactive: 'Inactive',
    packages: 'Packages',
    licenses: 'Licenses',
    reviews: 'Reviews',
    buyNow: 'Buy Now',
    overview: 'Overview',
    productDescription: 'Product Description',
    secureProtection: 'Secure Protection',
    secureProtectionDesc: 'Advanced encryption and security measures to protect your licenses',
    easyIntegration: 'Easy Integration',
    easyIntegrationDesc: 'Simple API and SDK for quick integration with your existing software',
    productDetails: 'Product Details',
    released: 'Released',
    version: 'Version',
    lastUpdated: 'Last Updated',
    months: 'Months',
    devices: 'Devices',
    technicalSupport: 'Technical Support',
    updates: 'Free Updates',
    prioritySupport: 'Priority Support',
    customBranding: 'Custom Branding',
    customerReviews: 'Customer Reviews',
    writeReview: 'Write a Review'
  }
  return translations[key] || key
}
</script> 
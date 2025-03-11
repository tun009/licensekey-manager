<template>
  <div :class="`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`">
    <!-- Header -->
    <header :class="`w-full ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-md`">
      <div class="container mx-auto px-4 py-4">
        <div class="flex justify-between items-center">
          <div class="flex items-center space-x-2">
            <Package class="h-8 w-8 text-primary" />
            <h1 class="text-2xl font-bold">{{ t('licenseManager') }}</h1>
          </div>
          <div class="flex items-center space-x-4">
            <LanguageSwitcher />
            <Button
              variant="ghost"
              size="icon"
              @click="toggleTheme"
              aria-label="Toggle theme"
            >
              <Moon v-if="theme === 'light'" class="h-5 w-5" />
              <Sun v-else class="h-5 w-5" />
            </Button>
            <Button variant="outline" size="sm">
              <router-link to="/login">{{ t('login') }}</router-link>
            </Button>
          </div>
        </div>
      </div>
    </header>

    <!-- Hero Section (only when not showing product detail) -->
    <section 
      v-if="!showProductDetail"
      :class="`py-20 px-4 ${theme === 'dark' ? 'bg-gradient-to-b from-gray-800 to-gray-900' : 'bg-gradient-to-b from-blue-50 to-blue-100'}`"
    >
      <div class="container mx-auto text-center">
        <h1 class="text-4xl md:text-6xl font-bold mb-6">
          {{ language === 'en' ? 'Secure Your Software with Powerful License Management' : 'Bảo vệ phần mềm của bạn với quản lý giấy phép mạnh mẽ' }}
        </h1>
        <p class="text-xl md:text-2xl mb-10 max-w-3xl mx-auto">
          {{ language === 'en' 
            ? 'Protect your intellectual property and manage customer licenses with our robust solution' 
            : 'Bảo vệ tài sản trí tuệ và quản lý giấy phép khách hàng với giải pháp mạnh mẽ của chúng tôi' }}
        </p>
        <div class="flex flex-col sm:flex-row justify-center gap-4">
          <Button size="lg" class="text-lg px-8 py-6">
            {{ t('getStarted') }}
          </Button>
          <Button size="lg" variant="outline" class="text-lg px-8 py-6">
            {{ t('learnMore') }}
          </Button>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <main class="container mx-auto px-4 py-12">
      <!-- Product Detail View -->
      <LandingProductDetail 
        v-if="showProductDetail && selectedProduct" 
        :product="selectedProduct" 
        :onBack="handleBackToProducts" 
      />
      
      <!-- Products List View -->
      <template v-else>
        <h2 class="text-3xl font-bold mb-8 text-center">{{ t('featuredProducts') }}</h2>
        
        <!-- Loading Skeleton -->
        <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card v-for="index in 6" :key="index" class="h-96 animate-pulse">
            <CardHeader class="h-24 bg-gray-200 dark:bg-gray-700 rounded-t-lg" />
            <CardContent class="space-y-4 pt-4">
              <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
              <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
              <div class="h-20 bg-gray-200 dark:bg-gray-700 rounded" />
            </CardContent>
          </Card>
        </div>
        
        <!-- Products Grid -->
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card 
            v-for="product in products" 
            :key="product.id" 
            :class="`overflow-hidden transition-all duration-300 hover:shadow-xl cursor-pointer transform hover:-translate-y-1 ${
              theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'
            }`"
            @click="handleProductClick(product)"
          >
            <div 
              class="h-48 bg-center bg-cover" 
              :style="{ backgroundImage: `url(${getProductImage(product.id)})` }"
            />
            <CardHeader>
              <div class="flex justify-between items-start">
                <div>
                  <CardTitle>{{ product.name }}</CardTitle>
                  <CardDescription>
                    v{{ product.version }}
                  </CardDescription>
                </div>
                <Badge 
                  variant="default" 
                  :class="`${product.isActive ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'}`"
                >
                  {{ product.isActive ? t('active') : t('inactive') }}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p class="text-sm mb-4">
                {{ product.post?.description.substring(0, 120) }}...
              </p>
              <div class="flex items-center gap-4 text-sm">
                <div class="flex items-center">
                  <Package class="mr-1 h-4 w-4" />
                  <span>{{ product.packages }} {{ t('packages') }}</span>
                </div>
                <div class="flex items-center">
                  <ShoppingCart class="mr-1 h-4 w-4" />
                  <span>{{ product.licenses }} {{ t('licenses') }}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter class="border-t flex justify-between items-center pt-4">
              <div class="flex items-center">
                <div class="flex">
                  <Star 
                    v-for="star in 5" 
                    :key="star" 
                    :class="`h-4 w-4 ${star <= Math.floor(Math.random() * 5) + 1 ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`" 
                  />
                </div>
                <span class="text-sm ml-2">({{ Math.floor(Math.random() * 100) + 5 }})</span>
              </div>
              <Button size="sm" variant="secondary" class="mt-3">
                {{ t('viewDetails') }}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </template>
    </main>

    <!-- Key Features Section (only when not showing product detail) -->
    <section 
      v-if="!showProductDetail"
      :class="`py-16 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`"
    >
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold mb-4 text-center">{{ t('keyFeatures') }}</h2>
        <p class="text-xl text-center mb-12 max-w-2xl mx-auto text-muted-foreground">
          {{ t('keyFeaturesSubtitle') }}
        </p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div 
            v-for="(feature, index) in keyFeatures" 
            :key="index" 
            :class="`p-6 rounded-xl ${feature.bgClass} border transition-all duration-300 hover:shadow-lg hover:scale-105 text-center ${
              theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
            }`"
          >
            <div class="flex justify-center">
              <component :is="feature.icon" />
            </div>
            <h3 class="text-xl font-semibold mb-3">{{ feature.title }}</h3>
            <p class="text-muted-foreground">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Form Section (only when not showing product detail) -->
    <section v-if="!showProductDetail" class="py-16">
      <div class="container mx-auto px-4">
        <ContactForm />
      </div>
    </section>

    <!-- Footer -->
    <footer :class="`py-12 ${theme === 'dark' ? 'bg-gray-900 text-gray-300 border-t border-gray-800' : 'bg-gray-200 text-gray-700 border-t border-gray-300'}`">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div class="flex items-center space-x-2 mb-4">
              <Package class="h-8 w-8 text-primary" />
              <h3 class="text-xl font-bold">{{ t('licenseManager') }}</h3>
            </div>
            <p class="mb-4 text-muted-foreground">
              {{ t('footerDescription') }}
            </p>
            <div class="flex space-x-4">
              <a href="#" class="hover:text-primary transition-colors">
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd"></path>
                </svg>
              </a>
              <a href="#" class="hover:text-primary transition-colors">
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </a>
              <a href="#" class="hover:text-primary transition-colors">
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd"></path>
                </svg>
              </a>
            </div>
          </div>
          
          <div v-for="(column, idx) in footerLinks" :key="idx">
            <h3 class="font-semibold text-lg mb-4">{{ column.title }}</h3>
            <ul class="space-y-2">
              <li v-for="(link, linkIdx) in column.links" :key="linkIdx">
                <router-link :to="link.url" class="hover:text-primary transition-colors">
                  {{ link.name }}
                </router-link>
              </li>
            </ul>
          </div>
        </div>
        
        <div class="pt-8 mt-8 border-t flex flex-col md:flex-row justify-between items-center border-gray-700">
          <div class="mb-4 md:mb-0">
            <p>&copy; 2024 {{ t('licenseManager') }}. {{ t('allRightsReserved') }}</p>
          </div>
          <div class="flex space-x-6">
            <router-link to="#" class="hover:text-primary transition-colors">{{ t('terms') }}</router-link>
            <router-link to="#" class="hover:text-primary transition-colors">{{ t('privacy') }}</router-link>
            <router-link to="#" class="hover:text-primary transition-colors">{{ t('contact') }}</router-link>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { 
  Sun, 
  Moon, 
  ChevronDown, 
  Star, 
  ShoppingCart, 
  Package, 
  Shield, 
  Zap, 
  Lightbulb, 
  Database 
} from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import LandingProductDetail from '@/components/landing/LandingProductDetail.vue'
import ContactForm from '@/components/landing/ContactForm.vue'
import LanguageSwitcher from '@/components/language/LanguageSwitcher.vue'

// Mock language and theme contexts
const language = ref('en')
const theme = ref('light')

const toggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}

// Mock translation function
const t = (key: string) => {
  const translations: Record<string, Record<string, string>> = {
    en: {
      licenseManager: 'License Manager',
      login: 'Login',
      getStarted: 'Get Started',
      learnMore: 'Learn More',
      featuredProducts: 'Featured Products',
      packages: 'Packages',
      licenses: 'Licenses',
      active: 'Active',
      inactive: 'Inactive',
      viewDetails: 'View Details',
      keyFeatures: 'Key Features',
      keyFeaturesSubtitle: 'Discover the powerful features that make our license management solution stand out',
      secureProtection: 'Secure Protection',
      secureProtectionDesc: 'Advanced encryption and security measures to protect your licenses',
      easyIntegration: 'Easy Integration',
      easyIntegrationDesc: 'Simple API and SDK for quick integration with your existing software',
      detailedAnalytics: 'Detailed Analytics',
      detailedAnalyticsDesc: 'Comprehensive insights into license usage and customer behavior',
      smartAutomation: 'Smart Automation',
      smartAutomationDesc: 'Automate license generation, distribution, and management',
      company: 'Company',
      about: 'About Us',
      careers: 'Careers',
      contact: 'Contact',
      blog: 'Blog',
      resources: 'Resources',
      documentation: 'Documentation',
      api: 'API',
      community: 'Community',
      tutorials: 'Tutorials',
      legal: 'Legal',
      terms: 'Terms',
      privacy: 'Privacy',
      cookies: 'Cookies',
      license: 'License',
      footerDescription: 'Comprehensive license management solution for software developers and businesses',
      allRightsReserved: 'All rights reserved'
    },
    vi: {
      licenseManager: 'Quản lý Giấy phép',
      login: 'Đăng nhập',
      getStarted: 'Bắt đầu',
      learnMore: 'Tìm hiểu thêm',
      featuredProducts: 'Sản phẩm nổi bật',
      packages: 'Gói',
      licenses: 'Giấy phép',
      active: 'Hoạt động',
      inactive: 'Không hoạt động',
      viewDetails: 'Xem chi tiết',
      keyFeatures: 'Tính năng chính',
      keyFeaturesSubtitle: 'Khám phá các tính năng mạnh mẽ làm nổi bật giải pháp quản lý giấy phép của chúng tôi',
      secureProtection: 'Bảo vệ an toàn',
      secureProtectionDesc: 'Mã hóa nâng cao và các biện pháp bảo mật để bảo vệ giấy phép của bạn',
      easyIntegration: 'Tích hợp dễ dàng',
      easyIntegrationDesc: 'API và SDK đơn giản để tích hợp nhanh chóng với phần mềm hiện có của bạn',
      detailedAnalytics: 'Phân tích chi tiết',
      detailedAnalyticsDesc: 'Thông tin chi tiết về việc sử dụng giấy phép và hành vi của khách hàng',
      smartAutomation: 'Tự động hóa thông minh',
      smartAutomationDesc: 'Tự động hóa việc tạo, phân phối và quản lý giấy phép',
      company: 'Công ty',
      about: 'Về chúng tôi',
      careers: 'Tuyển dụng',
      contact: 'Liên hệ',
      blog: 'Blog',
      resources: 'Tài nguyên',
      documentation: 'Tài liệu',
      api: 'API',
      community: 'Cộng đồng',
      tutorials: 'Hướng dẫn',
      legal: 'Pháp lý',
      terms: 'Điều khoản',
      privacy: 'Quyền riêng tư',
      cookies: 'Cookie',
      license: 'Giấy phép',
      footerDescription: 'Giải pháp quản lý giấy phép toàn diện cho nhà phát triển phần mềm và doanh nghiệp',
      allRightsReserved: 'Đã đăng ký bản quyền'
    }
  }
  
  return translations[language.value][key] || key
}

interface Product {
  id: number
  name: string
  slug: string
  version: string
  packages: number
  licenses: number
  isActive: boolean
  created: string
  update_url: string
  download_url: string
  status: string
  post?: {
    title: string
    description: string
    html: string
    keywords: string
    show_full_page: boolean
  }
}

const products = ref<Product[]>([])
const selectedProduct = ref<Product | null>(null)
const showProductDetail = ref(false)
const loading = ref(true)

onMounted(() => {
  fetchProducts()
})

const fetchProducts = () => {
  loading.value = true
  setTimeout(() => {
    const mockProducts = Array(6).fill(null).map((_, index) => ({
      id: index + 1,
      name: `Product ${index + 1}`,
      slug: `product-${index + 1}`,
      version: `${Math.floor(Math.random() * 5)}.${Math.floor(Math.random() * 10)}.${Math.floor(Math.random() * 10)}`,
      packages: Math.floor(Math.random() * 5) + 1,
      licenses: Math.floor(Math.random() * 100) + 10,
      isActive: Math.random() > 0.2,
      created: new Date(Date.now() - Math.random() * 10000000000).toLocaleDateString(),
      update_url: "https://example.com/update",
      download_url: "https://example.com/download",
      status: Math.random() > 0.2 ? "active" : "inactive",
      post: {
        title: `Great Product ${index + 1}`,
        description: `This is a detailed description of Product ${index + 1}. It includes all the features and benefits.`,
        html: `<h1>Product ${index + 1}</h1><p>Detailed content here</p>`,
        keywords: "license, software, protection",
        show_full_page: true
      }
    }))
    products.value = mockProducts
    loading.value = false
  }, 800)
}

const handleProductClick = (product: Product) => {
  selectedProduct.value = product
  showProductDetail.value = true
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const handleBackToProducts = () => {
  showProductDetail.value = false
  selectedProduct.value = null
}

const keyFeatures = computed(() => [
  {
    title: t('secureProtection'),
    description: t('secureProtectionDesc'),
    icon: Shield,
    bgClass: theme.value === 'dark' ? 'bg-blue-950/40' : 'bg-blue-50',
  },
  {
    title: t('easyIntegration'),
    description: t('easyIntegrationDesc'),
    icon: Zap,
    bgClass: theme.value === 'dark' ? 'bg-yellow-950/40' : 'bg-yellow-50',
  },
  {
    title: t('detailedAnalytics'),
    description: t('detailedAnalyticsDesc'),
    icon: Database,
    bgClass: theme.value === 'dark' ? 'bg-green-950/40' : 'bg-green-50',
  },
  {
    title: t('smartAutomation'),
    description: t('smartAutomationDesc'),
    icon: Lightbulb,
    bgClass: theme.value === 'dark' ? 'bg-purple-950/40' : 'bg-purple-50',
  }
])

const footerLinks = computed(() => [
  {
    title: t('company'),
    links: [
      { name: t('about'), url: '#' },
      { name: t('careers'), url: '#' },
      { name: t('contact'), url: '#' },
      { name: t('blog'), url: '#' }
    ]
  },
  {
    title: t('resources'),
    links: [
      { name: t('documentation'), url: '#' },
      { name: t('api'), url: '#' },
      { name: t('community'), url: '#' },
      { name: t('tutorials'), url: '#' }
    ]
  },
  {
    title: t('legal'),
    links: [
      { name: t('terms'), url: '#' },
      { name: t('privacy'), url: '#' },
      { name: t('cookies'), url: '#' },
      { name: t('license'), url: '#' }
    ]
  }
])

const getProductImage = (id: number) => {
  const images = [
    "photo-1488590528505-98d2b5aba04b",
    "photo-1518770660439-4636190af475", 
    "photo-1461749280684-dccba630e2f6",
    "photo-1486312338219-ce68d2c6f44d",
    "photo-1649972904349-6e44c42644a7"
  ]
  
  const imageIndex = (id - 1) % images.length
  return `https://images.unsplash.com/${images[imageIndex]}?auto=format&fit=crop&w=800&q=80`
}
</script> 